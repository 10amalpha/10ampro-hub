// /api/nosana/onchain — NOS supply-overhang telemetry straight from Solana.
//   1. Staking program accounts (nosScmHY2uR24Zh751PmGj9ww9QRNHewh9H59AfrTJE)
//      -> total staked, stake count, unstaking queue, linear release schedule
//   2. Largest NOS token accounts -> owner wallets -> labeled (exchange / staking vault / unlabeled)
// Public RPC fallbacks; cached 10 min at the edge.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MINT = 'nosXBVoaCTtYdLvKY6Csb4AC8JCdQKKAaWYtx2ZMoo7';
const STAKING = 'nosScmHY2uR24Zh751PmGj9ww9QRNHewh9H59AfrTJE';
const DISC_B58 = 'EV6feDfKSVt'; // sha256("account:StakeAccount")[0..8]
const DECIMALS = 6;
const SUPPLY = 100_000_000;

const RPCS = [
  process.env.SOLANA_RPC,
  'https://api.mainnet-beta.solana.com',
  'https://solana-rpc.publicnode.com',
  'https://solana.drpc.org',
  'https://rpc.ankr.com/solana',
].filter(Boolean);

// Community-labeled exchange deposit/hot wallets (Solscan public labels). Unverified — treat as best-effort.
const LABELS = {
  '5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9': 'Binance',
  '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM': 'Binance',
  '2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S': 'Binance',
  'AC5RDfQFmDS1deWZos921JfqscXdByf8BKHs5ACWjtW2': 'Bybit',
  '5VCwKtCXgCJ6kit5FybXjvriW3xELsFxY5XoJ7tCPEH4': 'OKX',
  'H8sMJSCQxfKiFTCfDR3DUMLPwcRbM61LGFJ8N4dK3WjS': 'Coinbase',
  'FWznbcNXWQuHTawe9RxvQ2LdCENssh12dsznf4RiouN5': 'Kraken',
  'u6PJ8DtQuPFnfmwHbGFULQ4u4EgjDiyYKjVEsynXq2w': 'Gate.io',
  'ASTyfSima4LLAdDgoFGkgqoKowG1LZFDr9fAQrg7iaJZ': 'MEXC',
  'A77HErqtfN1hLLpvZ9pCtu66FEtM8BveoaKbbMoZ4RiR': 'Bitget',
  'BmFdpraQhkiDQE6SnfG5omcA1VwzqfXrwtNYBwWTymy6': 'KuCoin',
  '5PAhQiYdLBd6SVdjzBQDxUAEFyDdF5ExNPQfcscnPRj5': 'Bitvavo',
};

async function rpc(method, params, { timeout = 25000 } = {}) {
  let lastErr;
  for (const url of RPCS) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), timeout);
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
        signal: ctrl.signal,
      });
      clearTimeout(t);
      const j = await r.json();
      if (j.error) throw new Error(`${url}: ${j.error.message}`);
      return { result: j.result, rpc: url };
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error('all RPCs failed');
}

const u64 = (b, o) => Number(b.readBigUInt64LE(o));
const i64 = (b, o) => Number(b.readBigInt64LE(o));

function json(body, ttl = 600) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': `public, s-maxage=${ttl}, stale-while-revalidate=${ttl * 3}`,
    },
  });
}

export async function GET() {
  const out = { ok: true, ts: Date.now(), mint: MINT, staking: STAKING, supply: SUPPLY, errors: [] };
  const now = Math.floor(Date.now() / 1000);

  // ---------- 1. staking program: every StakeAccount ----------
  try {
    const { result, rpc: used } = await rpc('getProgramAccounts', [STAKING, {
      encoding: 'base64',
      commitment: 'confirmed',
      filters: [{ memcmp: { offset: 0, bytes: DISC_B58 } }],
      dataSlice: { offset: 8, length: 56 }, // amount(8) authority(32) duration(8) time_unstake(8)
    }]);
    out.rpcUsed = used;
    const stakes = result.map((a) => {
      const b = Buffer.from(a.account.data[0], 'base64');
      return {
        amount: u64(b, 0) / 10 ** DECIMALS,
        authority: a.pubkey, // we keep the stake account pubkey; owner wallet is in bytes 8..40 but not needed here
        duration: u64(b, 40),
        timeUnstake: i64(b, 48),
      };
    }).filter((s) => s.amount > 0);

    const active = stakes.filter((s) => s.timeUnstake === 0);
    const unstaking = stakes.filter((s) => s.timeUnstake !== 0);
    const sum = (a) => a.reduce((x, y) => x + y.amount, 0);

    // linear release: each unstake drips over `duration` seconds from timeUnstake
    const remainingAt = (s, t) => {
      const frac = Math.min(1, Math.max(0, (t - s.timeUnstake) / s.duration));
      return s.amount * (1 - frac);
    };
    const horizons = [7, 30, 90, 180];
    const remNow = unstaking.reduce((x, s) => x + remainingAt(s, now), 0);
    const release = horizons.map((d) => {
      const t = now + d * 86400;
      const remThen = unstaking.reduce((x, s) => x + remainingAt(s, t), 0);
      return { days: d, nos: Math.round(remNow - remThen) };
    });
    const alreadyReleased = sum(unstaking) - remNow;

    // duration mix of active stakes (conviction proxy)
    const buckets = [[14, '≤14d'], [90, '15–90d'], [180, '91–180d'], [365, '181–365d']];
    const durMix = buckets.map(([max, label], i) => {
      const min = i === 0 ? 0 : buckets[i - 1][0];
      const set = active.filter((s) => s.duration / 86400 > min && s.duration / 86400 <= max);
      return { label, count: set.length, nos: Math.round(sum(set)) };
    });

    // size distribution of active stakes
    const whales = active.filter((s) => s.amount >= 100_000);
    out.staking = {
      accounts: stakes.length,
      active: { count: active.length, nos: Math.round(sum(active)) },
      unstaking: {
        count: unstaking.length,
        nosTotal: Math.round(sum(unstaking)),
        nosRemaining: Math.round(remNow),
        nosReleased: Math.round(alreadyReleased),
        release,
      },
      durationMix: durMix,
      whales: { count: whales.length, nos: Math.round(sum(whales)) },
      avgDurationDays: active.length ? Math.round(active.reduce((x, s) => x + s.duration, 0) / active.length / 86400) : null,
    };
  } catch (e) { out.errors.push('staking: ' + (e.message || String(e))); }

  // ---------- 2. largest token accounts -> owners -> labels ----------
  try {
    const { result } = await rpc('getTokenLargestAccounts', [MINT, { commitment: 'confirmed' }]);
    const accts = result.value.slice(0, 20);
    const { result: infos } = await rpc('getMultipleAccounts', [accts.map((a) => a.address), { encoding: 'jsonParsed', commitment: 'confirmed' }]);
    const holders = accts.map((a, i) => {
      const info = infos.value[i]?.data?.parsed?.info || {};
      const owner = info.owner || null;
      const nos = Number(a.uiAmount || 0);
      let label = owner && LABELS[owner] ? LABELS[owner] : null;
      let kind = label ? 'exchange' : 'unlabeled';
      // staking vaults are token accounts whose owner is the stake PDA (owned by the staking program)
      return { tokenAccount: a.address, owner, nos: Math.round(nos), pct: +(nos / SUPPLY * 100).toFixed(2), label, kind };
    });
    // resolve which owners are PDAs of the staking program (vaults)
    const owners = [...new Set(holders.map((h) => h.owner).filter(Boolean))];
    const { result: ownerInfos } = await rpc('getMultipleAccounts', [owners, { encoding: 'base64', commitment: 'confirmed' }]);
    const ownerProgram = {};
    owners.forEach((o, i) => { ownerProgram[o] = ownerInfos.value[i]?.owner || null; });
    holders.forEach((h) => {
      if (h.owner && ownerProgram[h.owner] === STAKING) { h.kind = 'staking_vault'; h.label = 'Staking vault'; }
      else if (h.owner && ownerProgram[h.owner] && ownerProgram[h.owner] !== '11111111111111111111111111111111') { h.kind = 'program'; h.label = h.label || 'Program/DEX'; h.program = ownerProgram[h.owner]; }
    });
    const by = (k) => holders.filter((h) => h.kind === k).reduce((x, h) => x + h.nos, 0);
    out.holders = {
      top: holders,
      top10pct: +holders.slice(0, 10).reduce((x, h) => x + h.pct, 0).toFixed(2),
      top20pct: +holders.reduce((x, h) => x + h.pct, 0).toFixed(2),
      exchangeNos: by('exchange'),
      stakingVaultNos: by('staking_vault'),
      programNos: by('program'),
      unlabeledNos: by('unlabeled'),
    };
  } catch (e) { out.errors.push('holders: ' + (e.message || String(e))); }

  // ---------- 3. supply sanity ----------
  try {
    const { result } = await rpc('getTokenSupply', [MINT]);
    out.onchainSupply = Number(result.value.uiAmount);
  } catch (e) { out.errors.push('supply: ' + (e.message || String(e))); }

  out.ok = out.errors.length < 3;
  return json(out, 600);
}
