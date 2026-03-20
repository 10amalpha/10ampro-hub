// ============================================================
// 10AMPRO HUB v5p — Bloomberg Terminal Aesthetic
// Server Component: fetches all data, passes to HubClient
// ============================================================

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 300; // ISR: regenerate every 5 minutes

import { headers } from 'next/headers';
import HubClient from './HubClient';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// ─── Yahoo Finance (crumb auth) ─────────────────────────────
async function getYahooCrumb() {
  try {
    // Step 1: hit fc.yahoo.com to get A3 cookie
    const cookieRes = await fetch('https://fc.yahoo.com', {
      headers: { 'User-Agent': UA },
      redirect: 'manual',
    });
    const setCookies = cookieRes.headers.getSetCookie?.() || [];
    const cookieStr = setCookies.map(c => c.split(';')[0]).join('; ');
    if (!cookieStr) return null;

    // Step 2: get crumb using cookie
    const crumbRes = await fetch('https://query2.finance.yahoo.com/v1/test/getcrumb', {
      headers: { 'User-Agent': UA, 'Cookie': cookieStr },
    });
    if (!crumbRes.ok) return null;
    const crumb = await crumbRes.text();
    if (!crumb || crumb.includes('<')) return null; // HTML error page
    return { cookie: cookieStr, crumb };
  } catch (e) {
    console.error('Yahoo crumb error:', e.message);
    return null;
  }
}

async function fetchYahoo(symbols) {
  const joined = symbols.join(',');
  const auth = await getYahooCrumb();

  // Try with crumb auth first
  if (auth) {
    try {
      const url = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(joined)}&crumb=${encodeURIComponent(auth.crumb)}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, 'Cookie': auth.cookie },
        next: { revalidate: 300 },
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.quoteResponse?.result?.length) return data.quoteResponse.result;
      }
    } catch (e) { console.error('Yahoo crumb fetch error:', e.message); }
  }

  // Fallback: try without crumb on both hosts
  for (const host of ['query2.finance.yahoo.com', 'query1.finance.yahoo.com']) {
    try {
      const res = await fetch(`https://${host}/v7/finance/quote?symbols=${encodeURIComponent(joined)}`, {
        headers: { 'User-Agent': UA },
        next: { revalidate: 300 },
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (data?.quoteResponse?.result?.length) return data.quoteResponse.result;
    } catch { continue; }
  }
  return [];
}

// ─── CoinGecko ──────────────────────────────────────────────
async function fetchCrypto() {
  try {
    const ids = [
      'bitcoin','solana','sui','ethereum','jupiter-exchange-solana','nosana',
      'jito-governance-token','genesysgo-shadow','helium','zcash',
      'jito-staked-sol','ripple',
      'metaplex','jupiter-perpetuals-liquidity-provider-token'
    ].join(',');

    // Fetch listed tokens + 2Z by contract address in parallel
    const [mainRes, tzRes] = await Promise.all([
      fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
        { next: { revalidate: 120 } }
      ),
      fetch(
        `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd&vs_currencies=usd&include_24hr_change=true`,
        { next: { revalidate: 120 } }
      ),
    ]);

    const data = mainRes.ok ? await mainRes.json() : {};

    // Merge 2Z data under a synthetic key
    if (tzRes.ok) {
      const tzData = await tzRes.json();
      const tzToken = tzData['J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd'.toLowerCase()] || tzData['J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd'];
      if (tzToken) data['2z-protocol'] = tzToken;
    }

    return data;
  } catch { return {}; }
}

// ─── Internal Briefing API (has FRED_API_KEY + FINNHUB_API_KEY) ──
async function fetchBriefing() {
  try {
    const h = headers();
    const host = h.get('host') || '10ampro-hub.vercel.app';
    const proto = host.includes('localhost') ? 'http' : 'https';
    const res = await fetch(`${proto}://${host}/api/briefing`, { next: { revalidate: 300 } });
    if (!res.ok) { console.error('Briefing API:', res.status); return null; }
    return await res.json();
  } catch (e) { console.error('Briefing fetch error:', e.message); return null; }
}

// ─── Finnhub Calendar ───────────────────────────────────────
async function fetchCalendar() {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return [];
  try {
    const today = new Date();
    const from = today.toISOString().split('T')[0];
    const toDate = new Date(today.getTime() + 3 * 86400000);
    const to = toDate.toISOString().split('T')[0];
    const res = await fetch(
      `https://finnhub.io/api/v1/calendar/economic?from=${from}&to=${to}&token=${key}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.economicCalendar || []).filter(e => e.country === 'US');
  } catch { return []; }
}

// ─── Finnhub Earnings ───────────────────────────────────────
const WATCHLIST_META = {
  PLTR: { n: 'Palantir', e: '🚀' }, HOOD: { n: 'Robinhood', e: '⚡' },
  TSLA: { n: 'Tesla', e: '🎯' }, HIMS: { n: 'Hims & Hers', e: '💊' },
  QSI: { n: 'Quantum-Si', e: '🔬' }, DUOL: { n: 'Duolingo', e: '🦉' },
  STKE: { n: 'Sol Strategies', e: '☀️' }, MP: { n: 'MP Materials', e: '⛏️' },
  OKLO: { n: 'Oklo', e: '⚛️' }, AMD: { n: 'AMD', e: '🔺' },
  NVDA: { n: 'NVIDIA', e: '💚' }, MSTR: { n: 'Strategy', e: '₿' },
  BE: { n: 'Bloom Energy', e: '🔋' }, IBIT: { n: 'iShares BTC', e: '🪙' },
};

async function fetchEarnings() {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return [];
  const today = new Date();
  const from = today.toISOString().split('T')[0];
  const toDate = new Date(today.getTime() + 90 * 86400000);
  const to = toDate.toISOString().split('T')[0];
  const results = [];
  const earningsTickers = ['PLTR','HOOD','TSLA','HIMS','QSI','DUOL','STKE','MP','OKLO','AMD','NVDA','MSTR','BE'];
  for (const ticker of earningsTickers) {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/calendar/earnings?symbol=${ticker}&from=${from}&to=${to}&token=${key}`,
        { next: { revalidate: 21600 } }
      );
      if (!res.ok) continue;
      const data = await res.json();
      const next = (data.earningsCalendar || [])
        .filter(e => new Date(e.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
      if (next) {
        const meta = WATCHLIST_META[ticker] || { n: ticker, e: '📊' };
        const daysUntil = Math.ceil((new Date(next.date) - today) / 86400000);
        results.push({
          t: ticker, n: meta.n, e: meta.e,
          d: new Date(next.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          days: daysUntil, next: false,
        });
      }
    } catch { continue; }
  }
  results.sort((a, b) => a.days - b.days);
  if (results.length > 0) results[0].next = true;
  return results;
}

// ─── Signal Calculation ─────────────────────────────────────
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

// ─── Formatting ─────────────────────────────────────────────
function fmt(n, dec = 2) {
  if (n == null || isNaN(n)) return '—';
  if (Math.abs(n) >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (Math.abs(n) >= 1e4) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

// ─── Editorial data (hardcoded — will move to CMS later) ────
const INSIGHTS = [
  { tag: 'MACRO', color: '#60a5fa', text: 'Mercados en modo wait-and-see. La atención está en datos de empleo y las minutas de la Fed. Si el mercado laboral muestra debilidad, la tesis de recortes cobra fuerza. Si no, el escenario de "higher for longer" se consolida.', link: { label: 'El framework macro de 10AMPRO →', url: 'https://10am.substack.com' } },
  { tag: 'TSLA', color: '#f87171', text: 'Tesla en zona de definición. El mercado está pricing in un Q1 complejo por caída en entregas China/Europa. La pregunta no es revenue — es si Musk confirma timeline de robotaxi. El stock se mueve por narrativa, no por fundamentales.', link: null },
  { tag: 'RISK', color: '#facc15', text: 'VIX es el termómetro. Debajo de 20 es complacencia, arriba de 30 es miedo. Entre 20-25 es indecisión. DXY debilitándose es la buena noticia para LATAM — dólar débil ayuda a emergentes y a COP.', link: null },
  { tag: 'LIQ', color: '#22d3ee', text: 'Net Liquidity (FED BAL − TGA − RRP) es el indicador clave. Cuando sube, risk assets suben. M2 global expandiendo es históricamente positivo para BTC y growth stocks en horizontes de 3-6 meses.', link: { label: 'El framework de liquidez de 10AMPRO →', url: 'https://10am.substack.com/p/el-hombre-que-esta-reprogramando' } },
  { tag: 'BE', color: '#4ade80', text: 'Bloom Energy sigue acumulando contratos con data centers para backup power. La apuesta de hydrogen está dando frutos. Uno de los nombres menos mencionados con más upside en el watchlist.', link: null },
  { tag: 'COP', color: '#a78bfa', text: 'El peso colombiano se mueve con DXY y riesgo político local. Para los que cobran en USD y gastan en COP, monitorear el nivel de $4,200 como soporte clave. Si DXY sigue cayendo, COP podría fortalecerse.', link: null },
];

// ─── Info Diet: live from Supabase feed_items ───
const SUPABASE_URL = 'https://bzpraigsuwgjgpnclcpd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cHJhaWdzdXdnamdwbmNsY3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1Mzk2NDEsImV4cCI6MjA4NTExNTY0MX0.tBtsac6Mq65BiG93MhYtn1KV8iOGpEpVdlD3tqShrzE';

// Color palette for source badges (rotates)
const SRC_COLORS = ['#f5c6aa', '#60a5fa', '#ff6b35', '#a78bfa', '#22c55e', '#fbbf24', '#ef4444', '#06b6d4'];

function extractSource(url) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    const parts = host.split('.');
    const name = parts.length > 2 ? parts.slice(-3, -1).join('.') : parts[0];
    // Capitalize first letter
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch { return 'Web'; }
}

function makeAbbr(src) {
  if (src.length <= 3) return src.toUpperCase();
  const words = src.split(/[\s.-]+/);
  if (words.length >= 2) return words.map(w => w[0]).join('').toUpperCase().slice(0, 3);
  return src.slice(0, 2).toUpperCase();
}

function timeAgo(tsMs) {
  const diff = Date.now() - tsMs;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

async function fetchInfoDiet() {
  try {
    const url = `${SUPABASE_URL}/rest/v1/feed_items?select=id,take,content,category,type&order=id.desc&limit=5`;
    console.log('Info Diet: fetching from Supabase...');
    const res = await fetch(url, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) { console.error('Info Diet HTTP:', res.status, await res.text()); return []; }
    const data = await res.json();
    console.log(`Info Diet: ${data.length} items fetched`);
    if (data.length > 0) console.log('Info Diet first:', JSON.stringify(data[0]).substring(0, 200));
// Category → badge icon + color
const CAT_BADGES = {
  Macro:       { icon: '📊', color: '#22c55e' },
  Crypto:      { icon: '₿',  color: '#f59e0b' },
  AI:          { icon: '🤖', color: '#a78bfa' },
  Tech:        { icon: '⚡', color: '#60a5fa' },
  Markets:     { icon: '📈', color: '#4ade80' },
  Geopolitics: { icon: '🌍', color: '#ef4444' },
};
const DEFAULT_BADGE = { icon: '📡', color: '#71717a' };

    return data.map((it, i) => {
      const src = extractSource(it.content || '');
      const badge = CAT_BADGES[it.category] || DEFAULT_BADGE;
      return {
        title: it.take || '',
        src,
        abbr: badge.icon,
        color: badge.color,
        who: null,
        ago: timeAgo(parseInt(it.id) || Date.now()),
        url: it.content || '#',
        tag: it.category || '',
      };
    });
  } catch (err) {
    console.error('Info Diet fetch error:', err.message);
    return [];
  }
}

const COMMENTS = {
  PLTR: { tx: 'Consolidando >$100. Tesis gobierno + comercial sigue intacta. AI play puro.', w: 'Hernán', a: '2h' },
  TSLA: { tx: 'Earnings próximos definen dirección. Robotaxi timeline es el catalizador.', w: 'Darío', a: '5h' },
  STKE: { tx: 'Bajo presión. Tesis SOL staking intacta, vehículo con volatilidad alta.', w: 'Andrés', a: '1h' },
  BE: { tx: 'Data center contracts + hydrogen. La sorpresa del watchlist.', w: 'Hernán', a: '30m' },
};

// ─── MAIN PAGE ──────────────────────────────────────────────
export default async function HubPage() {
  // Fetch all data in parallel — briefing API handles FRED + Finnhub internally
  const [macroQuotes, crypto, briefing, stockQuotes, dietData] = await Promise.all([
    fetchYahoo(['^GSPC', '^VIX', 'DX-Y.NYB', 'CL=F', 'JPY=X', 'COP=X', '^TNX', '^IRX']),
    fetchCrypto(),
    fetchBriefing(),
    fetchYahoo(['PLTR','HOOD','TSLA','HIMS','QSI','DUOL','STKE','MP','OKLO','AMD','NVDA','MSTR','BE','IBIT','STRC']),
    fetchInfoDiet(),
  ]);

  // ─── Parse earnings from briefing ───
  const today = new Date();
  const earnings = (briefing?.earnings || [])
    .filter(e => e.date)
    .map(e => {
      const daysUntil = Math.ceil((new Date(e.date) - today) / 86400000);
      return {
        t: e.ticker, n: e.name, e: e.emoji,
        d: new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        days: daysUntil, next: false,
      };
    })
    .sort((a, b) => a.days - b.days);
  if (earnings.length > 0) earnings[0].next = true;

  // ─── Parse macro quotes ───
  const q = (sym) => macroQuotes.find(x => x.symbol === sym);

  // ─── MKT row ───
  const mktRow = [
    { l: 'S&P 500', v: fmt(q('^GSPC')?.regularMarketPrice), c: q('^GSPC')?.regularMarketChangePercent ?? null, cl: '#60a5fa' },
    { l: 'VIX', v: fmt(q('^VIX')?.regularMarketPrice, 1), c: q('^VIX')?.regularMarketChangePercent ?? null, cl: (q('^VIX')?.regularMarketPrice || 0) > 25 ? '#f87171' : '#fbbf24' },
    { l: 'DXY', v: fmt(q('DX-Y.NYB')?.regularMarketPrice, 1), c: q('DX-Y.NYB')?.regularMarketChangePercent ?? null, cl: '#fbbf24' },
    { l: 'WTI', v: '$' + fmt(q('CL=F')?.regularMarketPrice, 1), c: q('CL=F')?.regularMarketChangePercent ?? null, cl: '#f97316' },
    { l: 'USD/JPY', v: fmt(q('JPY=X')?.regularMarketPrice, 1), c: q('JPY=X')?.regularMarketChangePercent ?? null, cl: '#fb923c' },
    { l: 'USD/COP', v: fmt(q('COP=X')?.regularMarketPrice, 0), c: q('COP=X')?.regularMarketChangePercent ?? null, cl: '#a78bfa' },
  ];

  // ─── LIQ row (from briefing API which has FRED access) ───
  const fed = briefing?.fed || {};
  const netLiqT = fed.netLiquidity || 0;
  const netLiqDisplay = netLiqT > 0 ? '$' + netLiqT.toFixed(2) + 'T' : '—';

  // US M2 from FRED (billions) → display as trillions
  const m2Val = fed.m2;
  const m2Prev = fed.m2prev;
  const m2Chg = (m2Val && m2Prev) ? ((m2Val - m2Prev) / m2Prev * 100) : null;
  const m2Display = m2Val ? '$' + (m2Val / 1000).toFixed(1) + 'T' : '—';

  // CN M2 from FRED — raw yuan value, divide by 1 trillion
  const cnm2Val = fed.cnm2;
  const cnm2Prev = fed.cnm2prev;
  const cnm2Chg = (cnm2Val && cnm2Prev) ? ((cnm2Val - cnm2Prev) / cnm2Prev * 100) : null;
  const cnm2Display = cnm2Val ? '¥' + (cnm2Val / 1e12).toFixed(0) + 'T' : '—';

  const liqRow = [
    { l: 'NET LIQ', v: netLiqDisplay, c: null, cl: '#22d3ee' },
    { l: 'US M2', v: m2Display, c: m2Chg, cl: '#34d399' },
    { l: 'CN M2', v: cnm2Display, c: cnm2Chg, cl: '#ef4444' },
    { l: 'US 10Y', v: q('^TNX')?.regularMarketPrice != null ? q('^TNX').regularMarketPrice.toFixed(2) + '%' : '—', c: null, cl: '#e879f9' },
    { l: 'US 2Y', v: q('^IRX')?.regularMarketPrice != null ? q('^IRX').regularMarketPrice.toFixed(2) + '%' : '—', c: null, cl: '#c084fc' },
  ];

  // ─── Signals ───
  const signal = calcSignals(macroQuotes);

  // ─── Calendar (from briefing API) ───
  // Briefing returns: { event, date, actual, estimate, previous, impact, unit }
  const calendarRaw = (briefing?.calendar || []).map(ev => {
    // Extract date from various formats: "2026-03-19T12:30:00Z", "2026-03-19", etc
    const rawDate = ev.date || '';
    const dateOnly = rawDate.includes('T') ? rawDate.split('T')[0] : rawDate.split(' ')[0];
    return {
      time: rawDate,
      dateOnly,
      event: ev.event || '',
      estimate: ev.estimate,
      prev: ev.previous,
      impact: ev.impact ?? 1,
      unit: ev.unit || '',
    };
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const tmrwDate = new Date(); tmrwDate.setDate(tmrwDate.getDate() + 1);
  const tmrwStr = tmrwDate.toISOString().split('T')[0];

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    try {
      if (timeStr.includes('T')) {
        // Convert UTC to ET (approximate: UTC-4 or UTC-5)
        const d = new Date(timeStr);
        // Use ET timezone formatting
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' });
      }
      return timeStr;
    } catch { return timeStr; }
  };

  const fmtEstimate = (val, unit) => {
    if (val == null) return null;
    const s = String(val);
    if (unit === '%') return s + '%';
    return s;
  };

  const formatCalEvent = (ev) => ({
    t: formatTime(ev.time || ''),
    e: ev.event || '',
    es: fmtEstimate(ev.estimate, ev.unit),
    p: fmtEstimate(ev.prev, ev.unit),
    impact: ev.impact,
  });

  // ─── Calendar filtering: remove noise, keep market-moving data ───
  const BLOCK_KEYWORDS = ['CFTC', 'Speculative net positions', 'Speculative Net Positions',
    'Bill Auction', 'Bond Auction', 'Note Auction', 'TIPS Auction', 'FRN Auction'];
  const isBlocked = (name) => BLOCK_KEYWORDS.some(kw => name.includes(kw));

  // Tier 1: always show (market-moving)
  const TIER1_KEYWORDS = ['Fed ', 'FOMC', 'Nonfarm', 'NFP', 'Jobless Claims', 'Unemployment',
    'CPI', 'PPI', 'PCE', 'GDP', 'Retail Sales', 'ISM ', 'Consumer Confidence', 'Michigan',
    'Home Sales', 'Balance of Trade', 'Interest Rate', 'Powell'];
  const isTier1 = (name) => TIER1_KEYWORDS.some(kw => name.includes(kw));

  // Tier 2: useful context (shown in HOY only, or as filler)
  const TIER2_KEYWORDS = ['Mortgage Rate', 'Wholesale', 'EIA ', 'Housing Starts',
    'Building Permits', 'Durable Goods', 'Industrial Production', 'Capacity Utilization',
    'Fed Balance Sheet', 'Crude Oil', 'Natural Gas Stocks'];
  const isTier2 = (name) => TIER2_KEYWORDS.some(kw => name.includes(kw));

  const filterCalendarEvents = (events, minCount = 0) => {
    const tier1 = events.filter(ev => !isBlocked(ev.event) && isTier1(ev.event));
    const tier2 = events.filter(ev => !isBlocked(ev.event) && isTier2(ev.event));
    const rest = events.filter(ev => !isBlocked(ev.event) && !isTier1(ev.event) && !isTier2(ev.event));
    let result = [...tier1, ...tier2];
    // If below minimum, pull from remaining non-blocked events
    if (result.length < minCount) {
      result = [...result, ...rest.slice(0, minCount - result.length)];
    }
    return result;
  };

  const todayEventsRaw = calendarRaw.filter(ev => ev.dateOnly === todayStr);
  const tmrwEventsRaw = calendarRaw.filter(ev => ev.dateOnly === tmrwStr);

  // HOY: min 5 events guaranteed
  const todayFiltered = filterCalendarEvents(todayEventsRaw, 5);
  const calToday = {
    high: todayFiltered.filter(ev => ev.impact >= 3).map(formatCalEvent),
    low: todayFiltered.filter(ev => ev.impact < 3).map(formatCalEvent),
  };
  // MAÑANA: no minimum, just filter noise
  const calTomorrow = filterCalendarEvents(tmrwEventsRaw, 0).map(formatCalEvent);

  // ─── Watchlist ───
  const STOCK_TICKERS = ['PLTR','HOOD','TSLA','HIMS','QSI','DUOL','STKE','MP','OKLO','AMD','NVDA','MSTR','BE','IBIT','STRC'];
  const CRYPTO_MAP = {
    BTC: 'bitcoin', SOL: 'solana', SUI: 'sui', ETH: 'ethereum',
    JUP: 'jupiter-exchange-solana', NOS: 'nosana',
    JTO: 'jito-governance-token', SHDW: 'genesysgo-shadow',
    '2Z': '2z-protocol', MET: 'metaplex', HNT: 'helium', ZEC: 'zcash',
    JITOSOL: 'jito-staked-sol',
    XRP: 'ripple', JLP: 'jupiter-perpetuals-liquidity-provider-token',
  };

  const wl = [
    ...STOCK_TICKERS.map(t => {
      const sq = stockQuotes.find(x => x.symbol === t);
      return { t, p: sq?.regularMarketPrice ?? null, c: sq?.regularMarketChangePercent ?? null, k: 'S', cm: COMMENTS[t] || null };
    }),
    ...Object.entries(CRYPTO_MAP).map(([ticker, id]) => {
      const d = crypto[id];
      return { t: ticker, p: d?.usd ?? null, c: d?.usd_24h_change ?? null, k: 'C', cm: null };
    }),
  ];

  return (
    <HubClient
      mkt={mktRow}
      liq={liqRow}
      signal={signal}
      calToday={calToday}
      calTomorrow={calTomorrow}
      watchlist={wl}
      earnings={earnings}
      insights={INSIGHTS}
      diet={dietData}
    />
  );
}
