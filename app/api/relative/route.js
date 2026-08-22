// /api/relative?cg=<coingeckoId>&sym=<SYMBOL>
// Capa "relativo + posicionamiento": TOKEN/SOL, TOKEN/BTC, correlación, beta, BTC dominance, funding & open interest.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const CG = 'https://api.coingecko.com/api/v3';
const json = (b, ttl = 600) => new Response(JSON.stringify(b), { status: 200, headers: { 'content-type': 'application/json', 'cache-control': `public, s-maxage=${ttl}, stale-while-revalidate=${ttl * 3}` } });
async function cg(path) { const r = await fetch(`${CG}${path}`, { next: { revalidate: 600 } }); if (!r.ok) throw new Error(`cg ${path} ${r.status}`); return r.json(); }
const dayKey = (ts) => Math.floor(ts / 86400000);
const toMap = (prices) => { const m = new Map(); (prices || []).forEach(([t, p]) => m.set(dayKey(t), p)); return m; };
const rets = (a) => a.slice(1).map((v, i) => Math.log(v / a[i]));
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
function corrBeta(x, y) { // x = token returns, y = bench returns
  const n = Math.min(x.length, y.length); x = x.slice(-n); y = y.slice(-n);
  const mx = mean(x), my = mean(y); let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; syy += (y[i] - my) ** 2; }
  return { corr: sxy / Math.sqrt(sxx * syy || 1), beta: sxy / (syy || 1) };
}
async function withTimeout(p, ms) { return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]); }
async function derivatives(sym) {
  const out = { venue: null, funding: null, oi: null, oiUsd: null, note: null };
  const tries = [
    async () => { const r = await fetch(`https://api.bybit.com/v5/market/tickers?category=linear&symbol=${sym}USDT`); const j = await r.json(); const t = j?.result?.list?.[0]; if (!t) throw 0; return { venue: 'Bybit', funding: +t.fundingRate, oi: +t.openInterest, oiUsd: +t.openInterestValue || +t.openInterest * +t.lastPrice }; },
    async () => { const r = await fetch(`https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${sym}USDT`); const j = await r.json(); if (!j.lastFundingRate) throw 0; const o = await (await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${sym}USDT`)).json(); return { venue: 'Binance', funding: +j.lastFundingRate, oi: +o.openInterest, oiUsd: +o.openInterest * +j.markPrice }; },
    async () => { const r = await fetch(`https://contract.mexc.com/api/v1/contract/ticker?symbol=${sym}_USDT`); const j = await r.json(); const t = j?.data; if (!t) throw 0; return { venue: 'MEXC', funding: +t.fundingRate, oi: +t.holdVol, oiUsd: +t.holdVol * +t.lastPrice }; },
    async () => { const r = await fetch(`https://api.gateio.ws/api/v4/futures/usdt/contracts/${sym}_USDT`); const j = await r.json(); if (!j.funding_rate) throw 0; return { venue: 'Gate.io', funding: +j.funding_rate, oi: +j.position_size * +j.quanto_multiplier, oiUsd: +j.position_size * +j.quanto_multiplier * +j.last_price }; },
  ];
  for (const t of tries) { try { const r = await withTimeout(t(), 6000); if (r) return { ...out, ...r }; } catch {} }
  return { ...out, note: 'sin perps listados en Bybit/Binance/MEXC/Gate (o bloqueado)' };
}
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cgId = searchParams.get('cg'); const sym = (searchParams.get('sym') || '').toUpperCase();
  if (!cgId) return json({ ok: false, error: 'cg required' }, 0);
  const out = { ok: true, ts: Date.now(), errors: [] };
  try {
    const [tok, sol, btc, glob] = await Promise.all([
      cg(`/coins/${cgId}/market_chart?vs_currency=usd&days=365&interval=daily`),
      cg(`/coins/solana/market_chart?vs_currency=usd&days=365&interval=daily`),
      cg(`/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily`),
      cg(`/global`).catch(() => null),
    ]);
    const T = toMap(tok.prices), S = toMap(sol.prices), B = toMap(btc.prices);
    const keys = [...T.keys()].filter((k) => S.has(k) && B.has(k)).sort((a, b) => a - b);
    const t = keys.map((k) => k * 86400000), pt = keys.map((k) => T.get(k)), ps = keys.map((k) => S.get(k)), pb = keys.map((k) => B.get(k));
    const vsSol = pt.map((v, i) => v / ps[i]), vsBtc = pt.map((v, i) => v / pb[i]);
    const norm = (a) => a.map((v) => v / a[0]);
    const rt = rets(pt), rs = rets(ps), rb = rets(pb);
    const win = (a, n) => a.slice(-n);
    const cs30 = corrBeta(win(rt, 30), win(rs, 30)), cs90 = corrBeta(win(rt, 90), win(rs, 90)), cb90 = corrBeta(win(rt, 90), win(rb, 90));
    const perf = (a, n) => a.length > n ? a[a.length - 1] / a[a.length - 1 - n] - 1 : null;
    out.series = { t, vsSol: norm(vsSol), vsBtc: norm(vsBtc), tok: norm(pt), sol: norm(ps) };
    out.stats = {
      corrSol30: cs30.corr, betaSol30: cs30.beta, corrSol90: cs90.corr, betaSol90: cs90.beta, corrBtc90: cb90.corr, betaBtc90: cb90.beta,
      relSol30: perf(vsSol, 30), relSol90: perf(vsSol, 90), relSol365: vsSol.length > 1 ? vsSol[vsSol.length - 1] / vsSol[0] - 1 : null,
      relBtc90: perf(vsBtc, 90),
      tok30: perf(pt, 30), sol30: perf(ps, 30), btc30: perf(pb, 30),
      // structure of the ratio: is TOKEN/SOL making new lows?
      vsSolLow365: Math.min(...vsSol), vsSolNow: vsSol[vsSol.length - 1], vsSolHigh365: Math.max(...vsSol),
    };
    if (glob?.data) out.macro = { btcDominance: glob.data.market_cap_percentage?.btc ?? null, ethDominance: glob.data.market_cap_percentage?.eth ?? null, solDominance: glob.data.market_cap_percentage?.sol ?? null, totalMcap: glob.data.total_market_cap?.usd ?? null, totalChg24: glob.data.market_cap_change_percentage_24h_usd ?? null };
  } catch (e) { out.errors.push('relative: ' + e.message); }
  if (sym) out.derivs = await derivatives(sym);
  return json(out, 600);
}
