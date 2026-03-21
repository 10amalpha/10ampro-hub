// ============================================================
// /api/prices — Lightweight endpoint for client-side price refresh
// Returns only mkt row, liq row, watchlist prices, and signals
// No insights, no calendar, no earnings — those stay cached via ISR
// ============================================================

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// ─── Yahoo crumb auth ───
let _yahooCrumb = null;
let _yahooCrumbAt = 0;
const CRUMB_TTL = 30 * 60 * 1000;

async function getYahooCrumb() {
  const now = Date.now();
  if (_yahooCrumb && (now - _yahooCrumbAt) < CRUMB_TTL) return _yahooCrumb;
  try {
    const cookieRes = await fetch('https://fc.yahoo.com', { headers: { 'User-Agent': UA }, redirect: 'manual' });
    const setCookies = cookieRes.headers.getSetCookie?.() || [];
    const cookieStr = setCookies.map(c => c.split(';')[0]).join('; ');
    if (!cookieStr) return null;
    const crumbRes = await fetch('https://query2.finance.yahoo.com/v1/test/getcrumb', {
      headers: { 'User-Agent': UA, 'Cookie': cookieStr },
    });
    if (!crumbRes.ok) return null;
    const crumb = await crumbRes.text();
    if (!crumb || crumb.includes('<')) return null;
    _yahooCrumb = { cookie: cookieStr, crumb };
    _yahooCrumbAt = Date.now();
    return _yahooCrumb;
  } catch { return null; }
}

async function fetchYahoo(symbols) {
  const joined = symbols.join(',');
  const auth = await getYahooCrumb();
  if (auth) {
    try {
      const url = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(joined)}&crumb=${encodeURIComponent(auth.crumb)}`;
      const res = await fetch(url, { headers: { 'User-Agent': UA, 'Cookie': auth.cookie } });
      if (res.ok) {
        const data = await res.json();
        if (data?.quoteResponse?.result?.length) return data.quoteResponse.result;
      }
    } catch {}
  }
  for (const host of ['query2.finance.yahoo.com', 'query1.finance.yahoo.com']) {
    try {
      const res = await fetch(`https://${host}/v7/finance/quote?symbols=${encodeURIComponent(joined)}`, { headers: { 'User-Agent': UA } });
      if (!res.ok) continue;
      const data = await res.json();
      if (data?.quoteResponse?.result?.length) return data.quoteResponse.result;
    } catch { continue; }
  }
  return [];
}

async function fetchCrypto() {
  try {
    const ids = [
      'bitcoin','solana','sui','ethereum','jupiter-exchange-solana','nosana',
      'jito-governance-token','genesysgo-shadow','helium','zcash',
      'jito-staked-sol','ripple','metaplex','jupiter-perpetuals-liquidity-provider-token'
    ].join(',');
    const [mainRes, tzRes] = await Promise.all([
      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`),
      fetch(`https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd&vs_currencies=usd&include_24hr_change=true`),
    ]);
    const data = mainRes.ok ? await mainRes.json() : {};
    if (tzRes.ok) {
      const tzData = await tzRes.json();
      const tzToken = tzData['J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd'.toLowerCase()] || tzData['J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd'];
      if (tzToken) data['2z-protocol'] = tzToken;
    }
    return data;
  } catch { return {}; }
}

// ─── Signal calc (same logic as page.jsx) ───
function calcSignals(quotes) {
  const find = (sym) => quotes.find(q => q.symbol === sym);
  const vix = find('^VIX');
  const dxy = find('DX-Y.NYB');
  const sp = find('^GSPC');
  const us10 = find('^TNX');

  let riskScore = 0;
  const vixVal = vix?.regularMarketPrice;
  if (vixVal != null) {
    if (vixVal < 18) riskScore += 2;
    else if (vixVal < 22) riskScore += 1;
    else if (vixVal > 28) riskScore -= 2;
    else if (vixVal > 22) riskScore -= 1;
  }
  const dxyChg = dxy?.regularMarketChangePercent;
  if (dxyChg != null) {
    if (dxyChg < -0.3) riskScore += 1;
    if (dxyChg > 0.5) riskScore -= 1;
  }
  const spChg = sp?.regularMarketChangePercent;
  if (spChg != null) {
    if (spChg > 0.5) riskScore += 1;
    if (spChg < -0.5) riskScore -= 1;
  }

  let risk = 'MIXED';
  if (riskScore >= 2) risk = 'RISK ON';
  if (riskScore <= -2) risk = 'RISK OFF';

  const yieldVal = us10?.regularMarketPrice;
  let liq = 'NEUTRAL';
  if (yieldVal != null) {
    if (yieldVal < 4.0) liq = 'EXPANDING';
    if (yieldVal > 4.5) liq = 'TIGHTENING';
  }

  return { risk, liq };
}

function fmt(n, dec = 2) {
  if (n == null || isNaN(n)) return '—';
  if (Math.abs(n) >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (Math.abs(n) >= 1e4) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

const STOCK_TICKERS = ['PLTR','HOOD','TSLA','HIMS','QSI','DUOL','STKE','MP','OKLO','AMD','NVDA','MSTR','BE','IBIT','STRC'];
const CRYPTO_MAP = {
  BTC: 'bitcoin', SOL: 'solana', SUI: 'sui', ETH: 'ethereum',
  JUP: 'jupiter-exchange-solana', NOS: 'nosana',
  JTO: 'jito-governance-token', SHDW: 'genesysgo-shadow',
  '2Z': '2z-protocol', MET: 'metaplex', HNT: 'helium', ZEC: 'zcash',
  JITOSOL: 'jito-staked-sol', XRP: 'ripple', JLP: 'jupiter-perpetuals-liquidity-provider-token',
};

export async function GET() {
  try {
    const [macroQuotes, stockQuotes, crypto] = await Promise.all([
      fetchYahoo(['^GSPC', '^VIX', 'DX-Y.NYB', 'CL=F', 'JPY=X', 'COP=X', '^TNX', '^IRX', '^MOVE']),
      fetchYahoo(STOCK_TICKERS),
      fetchCrypto(),
    ]);

    const q = (sym) => macroQuotes.find(x => x.symbol === sym);

    const mkt = [
      { l: 'S&P 500', v: fmt(q('^GSPC')?.regularMarketPrice), c: q('^GSPC')?.regularMarketChangePercent ?? null, cl: '#60a5fa' },
      { l: 'VIX', v: fmt(q('^VIX')?.regularMarketPrice, 1), c: q('^VIX')?.regularMarketChangePercent ?? null, cl: (q('^VIX')?.regularMarketPrice || 0) > 25 ? '#f87171' : '#fbbf24' },
      { l: 'DXY', v: fmt(q('DX-Y.NYB')?.regularMarketPrice, 1), c: q('DX-Y.NYB')?.regularMarketChangePercent ?? null, cl: '#fbbf24' },
      { l: 'WTI', v: '$' + fmt(q('CL=F')?.regularMarketPrice, 1), c: q('CL=F')?.regularMarketChangePercent ?? null, cl: '#f97316' },
      { l: 'USD/JPY', v: fmt(q('JPY=X')?.regularMarketPrice, 1), c: q('JPY=X')?.regularMarketChangePercent ?? null, cl: '#fb923c' },
      { l: 'USD/COP', v: fmt(q('COP=X')?.regularMarketPrice, 0), c: q('COP=X')?.regularMarketChangePercent ?? null, cl: '#a78bfa' },
    ];

    const liqRow = [
      { l: 'NET LIQ', v: '—', c: null, cl: '#22d3ee' }, // FRED data not fetched here — stays from ISR
      { l: 'US M2', v: '—', c: null, cl: '#34d399' },
      { l: 'CN M2', v: '—', c: null, cl: '#ef4444' },
      { l: 'US 10Y', v: q('^TNX')?.regularMarketPrice != null ? q('^TNX').regularMarketPrice.toFixed(2) + '%' : '—', c: null, cl: '#e879f9' },
      { l: 'US 2Y', v: q('^IRX')?.regularMarketPrice != null ? q('^IRX').regularMarketPrice.toFixed(2) + '%' : '—', c: null, cl: '#c084fc' },
      { l: 'MOVE', v: q('^MOVE')?.regularMarketPrice != null ? fmt(q('^MOVE').regularMarketPrice, 1) : '—', c: q('^MOVE')?.regularMarketChangePercent ?? null, cl: (q('^MOVE')?.regularMarketPrice || 0) > 100 ? '#f87171' : '#fbbf24' },
    ];

    const signal = calcSignals(macroQuotes);

    const watchlist = [
      ...STOCK_TICKERS.map(t => {
        const sq = stockQuotes.find(x => x.symbol === t);
        return { t, p: sq?.regularMarketPrice ?? null, c: sq?.regularMarketChangePercent ?? null, k: 'S' };
      }),
      ...Object.entries(CRYPTO_MAP).map(([ticker, id]) => {
        const d = crypto[id];
        return { t: ticker, p: d?.usd ?? null, c: d?.usd_24h_change ?? null, k: 'C' };
      }),
    ];

    return Response.json({ mkt, liq: liqRow, signal, watchlist, ts: Date.now() }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
