// ============================================================
// lib/briefing.js — Shared briefing data (FRED + FMP)
// Called directly by page.jsx (no self-fetch)
// Only contains data NOT already fetched by page.jsx:
//   - FRED (Fed Balance, TGA, RRP, M2, CN M2)
//   - FMP Economic Calendar
//   - FMP Earnings per-ticker
// Yahoo + CoinGecko are NOT here — page.jsx handles those directly.
// ============================================================

// ─── FRED API ───────────────────────────────────────────────
export async function getFedData() {
  const apiKey = process.env.FRED_API_KEY;
  if (!apiKey) return { fedBalance: 6.58, tga: 0.968, rrp: 0.006, bankReserves: 2.99, m2: null, m2prev: null, cnm2: null, cnm2prev: null };
  try {
    const series = ['WALCL', 'WDTGAL', 'RRPONTSYD', 'WRESBAL', 'M2SL', 'MYAGM2CNM189N'];
    const results = await Promise.all(
      series.map(async (id) => {
        const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${id}&sort_order=desc&limit=2&api_key=${apiKey}&file_type=json`;
        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        const data = await res.json();
        const obs = data.observations || [];
        return {
          id,
          value: parseFloat(obs[0]?.value || '0'),
          prev: obs[1] ? parseFloat(obs[1]?.value || '0') : null,
        };
      })
    );
    const val = (id) => results.find((r) => r?.id === id)?.value || 0;
    const prev = (id) => results.find((r) => r?.id === id)?.prev || null;
    const fedBalance = val('WALCL') / 1000000;
    const tga = val('WDTGAL') / 1000000;
    const rrp = val('RRPONTSYD') / 1000000;
    return {
      fedBalance,
      tga,
      rrp,
      bankReserves: val('WRESBAL') / 1000000,
      netLiquidity: fedBalance - tga - rrp,
      m2: val('M2SL'),
      m2prev: prev('M2SL'),
      cnm2: val('MYAGM2CNM189N'),
      cnm2prev: prev('MYAGM2CNM189N'),
    };
  } catch (e) {
    console.error('FRED error:', e.message);
    return { fedBalance: 6.58, tga: 0.968, rrp: 0.006, bankReserves: 2.99, netLiquidity: 5.6, m2: null, m2prev: null, cnm2: null, cnm2prev: null };
  }
}

// ─── FMP Economic Calendar ──────────────────────────────────
export async function getEconomicCalendar() {
  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) { console.error('Calendar: no FMP_API_KEY'); return []; }
  try {
    const today = new Date();
    const from = today.toISOString().split('T')[0];
    const toDate = new Date(today.getTime() + 3 * 86400000);
    const to = toDate.toISOString().split('T')[0];
    const url = `https://financialmodelingprep.com/stable/economic-calendar?from=${from}&to=${to}&apikey=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) { console.error('FMP calendar HTTP:', res.status); return []; }
    const data = await res.json();
    if (!Array.isArray(data)) { console.error('FMP calendar: unexpected response'); return []; }
    return data
      .filter((e) => (e.country === 'US' || e.currency === 'USD'))
      .map((e) => ({
        event: e.event || e.name || '',
        date: e.date || e.datetime || '',
        actual: e.actual,
        estimate: e.estimate ?? e.consensus ?? null,
        previous: e.previous,
        impact: e.impact === 'High' ? 3 : e.impact === 'Medium' ? 2 : 1,
        unit: e.unit || '',
      }));
  } catch (err) {
    console.error('FMP calendar error:', err.message);
    return [];
  }
}

// ─── FMP Earnings per-ticker ────────────────────────────────
const WATCHLIST = [
  { ticker: 'PLTR', name: 'Palantir', emoji: '🚀' },
  { ticker: 'HOOD', name: 'Robinhood', emoji: '⚡' },
  { ticker: 'TSLA', name: 'Tesla', emoji: '🎯' },
  { ticker: 'STKE', name: 'Sol Strategies', emoji: '☀️' },
  { ticker: 'QSI', name: 'Quantum-Si', emoji: '🔬' },
  { ticker: 'MP', name: 'MP Materials', emoji: '⛏️' },
  { ticker: 'HIMS', name: 'Hims & Hers', emoji: '💊' },
  { ticker: 'OKLO', name: 'Oklo', emoji: '⚛️' },
  { ticker: 'AMD', name: 'AMD', emoji: '🔺' },
  { ticker: 'NVDA', name: 'NVIDIA', emoji: '💚' },
  { ticker: 'DUOL', name: 'Duolingo', emoji: '🦉' },
  { ticker: 'MSTR', name: 'Strategy', emoji: '₿' },
  { ticker: 'BE', name: 'Bloom Energy', emoji: '🔋' },
];

export async function getEarnings() {
  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) { console.error('Earnings: no FMP_API_KEY'); return []; }
  try {
    const today = new Date();
    const results = await Promise.all(WATCHLIST.map(async (item) => {
      try {
        const url = `https://financialmodelingprep.com/stable/earnings?symbol=${item.ticker}&apikey=${apiKey}`;
        const res = await fetch(url, { next: { revalidate: 21600 } });
        if (!res.ok) return { ...item, date: null, time: null, epsEstimate: null, quarter: null };
        const data = await res.json();
        if (!Array.isArray(data)) return { ...item, date: null, time: null, epsEstimate: null, quarter: null };
        const next = data
          .filter(e => e.date && new Date(e.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
        return {
          ...item,
          date: next?.date || null,
          time: next?.time || null,
          epsEstimate: next?.epsEstimated ?? next?.epsEstimate ?? null,
          quarter: next?.fiscalDateEnding
            ? `Q${Math.ceil((new Date(next.fiscalDateEnding).getMonth() + 1) / 3)} ${new Date(next.fiscalDateEnding).getFullYear()}`
            : null,
        };
      } catch {
        return { ...item, date: null, time: null, epsEstimate: null, quarter: null };
      }
    }));
    return results.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });
  } catch (err) {
    console.error('Earnings FMP error:', err.message);
    return [];
  }
}

// ─── Combined briefing fetch (replaces self-fetch to /api/briefing) ─
export async function getBriefingData() {
  const [fed, calendar, earnings] = await Promise.all([
    getFedData(),
    getEconomicCalendar(),
    getEarnings(),
  ]);
  return { fed, calendar, earnings };
}
