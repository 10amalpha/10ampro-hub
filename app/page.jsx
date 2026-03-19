// ============================================================
// 10AMPRO HUB v5p — Bloomberg Terminal Aesthetic
// Server Component: fetches all data, passes to HubClient
// ============================================================

import HubClient from './HubClient';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

// ─── Yahoo Finance ──────────────────────────────────────────
async function fetchYahoo(symbols) {
  const joined = symbols.join(',');
  for (const host of ['query2.finance.yahoo.com', 'query1.finance.yahoo.com']) {
    try {
      const res = await fetch(`https://${host}/v7/finance/quote?symbols=${joined}`, {
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
    const ids = 'bitcoin,solana,sui,ethereum,jupiter-exchange-solana,nosana';
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
      { next: { revalidate: 120 } }
    );
    if (!res.ok) return {};
    return await res.json();
  } catch { return {}; }
}

// ─── FRED ───────────────────────────────────────────────────
async function fetchFRED(seriesId) {
  const key = process.env.FRED_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&sort_order=desc&limit=2&api_key=${key}&file_type=json`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const obs = data.observations || [];
    const latest = parseFloat(obs[0]?.value);
    const prev = obs[1] ? parseFloat(obs[1]?.value) : null;
    return { value: latest, prev };
  } catch { return null; }
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
  DNA: { n: 'Ginkgo Bio', e: '🧬' },
};

async function fetchEarnings() {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return [];
  const today = new Date();
  const from = today.toISOString().split('T')[0];
  const toDate = new Date(today.getTime() + 90 * 86400000);
  const to = toDate.toISOString().split('T')[0];
  const results = [];
  const earningsTickers = ['PLTR','HOOD','TSLA','HIMS','QSI','DUOL','STKE','MP','OKLO','AMD','NVDA','MSTR','BE','DNA'];
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

const DIET = [
  { title: 'Why the Fed Can\'t Cut Yet', src: 'Financial Times', abbr: 'FT', color: '#f5c6aa', who: 'Hernán', ago: '2h', url: '#', tag: 'Macro' },
  { title: 'NVIDIA\'s Next Moat: Custom Chips for Hyperscalers', src: 'SemiAnalysis', abbr: 'SA', color: '#60a5fa', who: 'Darío', ago: '4h', url: '#', tag: 'Tech' },
  { title: 'China M2 Hits Record — What It Means for Global Liquidity', src: 'Reuters', abbr: 'R', color: '#ff6b35', who: 'Hernán', ago: '6h', url: '#', tag: 'Liquidez' },
  { title: 'The Robotaxi Economics Nobody Is Talking About', src: 'ARK Invest', abbr: 'ARK', color: '#ffffff', who: 'Andrés', ago: '8h', url: '#', tag: 'TSLA' },
  { title: 'Colombia\'s Nearshoring Bet Is Starting to Pay Off', src: 'Bloomberg', abbr: 'BG', color: '#5c33f6', who: 'Guillermo', ago: '1d', url: '#', tag: 'LATAM' },
];

const COMMENTS = {
  PLTR: { tx: 'Consolidando >$100. Tesis gobierno + comercial sigue intacta. AI play puro.', w: 'Hernán', a: '2h' },
  TSLA: { tx: 'Earnings próximos definen dirección. Robotaxi timeline es el catalizador.', w: 'Darío', a: '5h' },
  STKE: { tx: 'Bajo presión. Tesis SOL staking intacta, vehículo con volatilidad alta.', w: 'Andrés', a: '1h' },
  BE: { tx: 'Data center contracts + hydrogen. La sorpresa del watchlist.', w: 'Hernán', a: '30m' },
};

// ─── MAIN PAGE ──────────────────────────────────────────────
export default async function HubPage() {
  // Fetch macro + LIQ quotes and stock watchlist in parallel
  const [macroQuotes, crypto, fredWALCL, fredTGA, fredRRP, fredM2, fredCNM2, calendarRaw, earnings, stockQuotes] = await Promise.all([
    fetchYahoo(['^GSPC', '^VIX', 'DX-Y.NYB', 'CL=F', 'JPY=X', 'COP=X', '^TNX', '^IRX']),
    fetchCrypto(),
    fetchFRED('WALCL'),
    fetchFRED('WDTGAL'),
    fetchFRED('RRPONTSYD'),
    fetchFRED('M2SL'),
    fetchFRED('MYAGM2CNM189N'),
    fetchCalendar(),
    fetchEarnings(),
    fetchYahoo(['PLTR','HOOD','TSLA','HIMS','QSI','DUOL','STKE','MP','OKLO','AMD','NVDA','MSTR','BE','IBIT','DNA']),
  ]);

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

  // ─── LIQ row ───
  const walcl = fredWALCL?.value || 0;
  const tga = fredTGA?.value || 0;
  const rrp = fredRRP?.value || 0;
  // WALCL in millions, WDTGAL in millions, RRPONTSYD in billions
  const netLiqT = (walcl - tga) / 1e6 - rrp / 1e3;
  const netLiqDisplay = netLiqT > 0 ? '$' + netLiqT.toFixed(2) + 'T' : '—';

  const m2Val = fredM2?.value;
  const m2Prev = fredM2?.prev;
  const m2Chg = (m2Val && m2Prev) ? ((m2Val - m2Prev) / m2Prev * 100) : null;
  const m2Display = m2Val ? '$' + (m2Val / 1000).toFixed(1) + 'T' : '—';

  const cnm2Val = fredCNM2?.value;
  const cnm2Prev = fredCNM2?.prev;
  const cnm2Chg = (cnm2Val && cnm2Prev) ? ((cnm2Val - cnm2Prev) / cnm2Prev * 100) : null;
  const cnm2Display = cnm2Val ? '¥' + Math.round(cnm2Val) + 'T' : '—';

  const liqRow = [
    { l: 'NET LIQ', v: netLiqDisplay, c: null, cl: '#22d3ee' },
    { l: 'US M2', v: m2Display, c: m2Chg, cl: '#34d399' },
    { l: 'CN M2', v: cnm2Display, c: cnm2Chg, cl: '#ef4444' },
    { l: 'US 10Y', v: q('^TNX')?.regularMarketPrice != null ? q('^TNX').regularMarketPrice.toFixed(2) + '%' : '—', c: null, cl: '#e879f9' },
    { l: 'US 2Y', v: q('^IRX')?.regularMarketPrice != null ? q('^IRX').regularMarketPrice.toFixed(2) + '%' : '—', c: null, cl: '#c084fc' },
  ];

  // ─── Signals ───
  const signal = calcSignals(macroQuotes);

  // ─── Calendar ───
  const todayStr = new Date().toISOString().split('T')[0];
  const tmrwDate = new Date(); tmrwDate.setDate(tmrwDate.getDate() + 1);
  const tmrwStr = tmrwDate.toISOString().split('T')[0];

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    try {
      if (timeStr.includes('T')) {
        const d = new Date(timeStr);
        const h = d.getUTCHours().toString().padStart(2, '0');
        const m = d.getUTCMinutes().toString().padStart(2, '0');
        return h + ':' + m;
      }
      return timeStr;
    } catch { return timeStr; }
  };

  const formatCalEvent = (ev) => ({
    t: formatTime(ev.time || ''),
    e: ev.event || '',
    es: ev.estimate != null ? String(ev.estimate) : null,
    p: ev.prev != null ? String(ev.prev) : null,
    impact: ev.impact,
  });

  const todayEvents = calendarRaw.filter(ev => {
    const evDate = (ev.time || '').split('T')[0] || '';
    return evDate === todayStr;
  });
  const tmrwEvents = calendarRaw.filter(ev => {
    const evDate = (ev.time || '').split('T')[0] || '';
    return evDate === tmrwStr;
  });

  const calToday = {
    high: todayEvents.filter(ev => ev.impact === 3).map(formatCalEvent),
    low: todayEvents.filter(ev => ev.impact < 3).map(formatCalEvent),
  };
  const calTomorrow = tmrwEvents.map(formatCalEvent);

  // ─── Watchlist ───
  const STOCK_TICKERS = ['PLTR','HOOD','TSLA','HIMS','QSI','DUOL','STKE','MP','OKLO','AMD','NVDA','MSTR','BE','IBIT','DNA'];
  const CRYPTO_MAP = { BTC: 'bitcoin', SOL: 'solana', SUI: 'sui', ETH: 'ethereum', JUP: 'jupiter-exchange-solana', NOS: 'nosana' };

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
      diet={DIET}
    />
  );
}
