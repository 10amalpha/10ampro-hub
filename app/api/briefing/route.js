import { NextResponse } from 'next/server';

// ============================================================
// MARKET DATA — Yahoo Finance
// ============================================================
async function getMarketData() {
  try {
    const symbols = ['^VIX', 'DX-Y.NYB', 'CL=F', '^TNX', 'JPY=X', 'GC=F', '^GSPC', '^IXIC'];
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error('Yahoo Finance unavailable');
    const data = await res.json();
    const quotes = data.quoteResponse?.result || [];
    const find = (s) => {
      const q = quotes.find((q) => q.symbol === s);
      return { price: q?.regularMarketPrice || null, change: q?.regularMarketChangePercent || null };
    };
    const usdjpyRaw = find('JPY=X');
    const us10yRaw = find('^TNX');
    return {
      vix: find('^VIX').price || 16.4,
      vixChange: find('^VIX').change || 0,
      dxy: find('DX-Y.NYB').price || 99.25,
      dxyChange: find('DX-Y.NYB').change || 0,
      wti: find('CL=F').price || 72.53,
      wtiChange: find('CL=F').change || 0,
      usdjpy: usdjpyRaw.price ? (1 / usdjpyRaw.price) * 10000 : 155.2,
      us10y: us10yRaw.price ? us10yRaw.price / 100 : 4.54,
      gold: find('GC=F').price || 2800,
      goldChange: find('GC=F').change || 0,
      sp500: find('^GSPC').price || 5800,
      sp500Change: find('^GSPC').change || 0,
      nasdaq: find('^IXIC').price || 18200,
      nasdaqChange: find('^IXIC').change || 0,
    };
  } catch {
    return {
      vix: 16.4, vixChange: 0, dxy: 99.25, dxyChange: 0,
      wti: 72.53, wtiChange: 0, usdjpy: 155.2, us10y: 4.54,
      gold: 2800, goldChange: 0, sp500: 5800, sp500Change: 0,
      nasdaq: 18200, nasdaqChange: 0,
    };
  }
}

// ============================================================
// FED DATA — FRED API
// ============================================================
async function getFedData() {
  const apiKey = process.env.FRED_API_KEY;
  if (!apiKey) return { fedBalance: 6.58, tga: 0.968, rrp: 0.006, bankReserves: 2.99, m2: null, cnm2: null };
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
    // WALCL, WDTGAL, RRPONTSYD are all in millions USD
    return {
      fedBalance: val('WALCL') / 1000000,       // millions → trillions
      tga: val('WDTGAL') / 1000000,             // millions → trillions
      rrp: val('RRPONTSYD') / 1000000,           // millions → trillions
      bankReserves: val('WRESBAL') / 1000000,    // millions → trillions
      m2: val('M2SL'),                            // billions USD
      m2prev: prev('M2SL'),                       // previous month billions
      cnm2: val('MYAGM2CNM189N'),                 // YoY growth rate %
    };
  } catch {
    return { fedBalance: 6.58, tga: 0.968, rrp: 0.006, bankReserves: 2.99, m2: null, m2prev: null, cnm2: null };
  }
}

// ============================================================
// BTC — CoinGecko
// ============================================================
async function getBtcData() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 60 } }
    );
    const json = await res.json();
    return {
      btcPrice: json.bitcoin?.usd || null,
      btcChange: json.bitcoin?.usd_24h_change || null,
      solPrice: json.solana?.usd || null,
      solChange: json.solana?.usd_24h_change || null,
    };
  } catch {
    return { btcPrice: null, btcChange: null, solPrice: null, solChange: null };
  }
}

// ============================================================
// ECONOMIC CALENDAR — Finnhub
// ============================================================
async function getEconomicCalendar() {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) return [];
  try {
    const today = new Date();
    const from = today.toISOString().split('T')[0];
    const to = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const url = `https://finnhub.io/api/v1/calendar/economic?from=${from}&to=${to}&token=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    const events = data.economicCalendar || [];
    // Filter only high-impact US events
    const important = events.filter(
      (e) =>
        e.country === 'US' &&
        e.impact === 3
    );
    return important.slice(0, 10).map((e) => ({
      event: e.event,
      date: e.time,
      actual: e.actual,
      estimate: e.estimate,
      previous: e.prev,
      impact: e.impact,
      unit: e.unit,
    }));
  } catch {
    return [];
  }
}

// ============================================================
// EARNINGS — Finnhub (our watchlist)
// ============================================================
const WATCHLIST = [
  { ticker: 'PLTR', name: 'Palantir', emoji: '🚀', ir: 'https://investors.palantir.com' },
  { ticker: 'HOOD', name: 'Robinhood', emoji: '⚡', ir: 'https://investors.robinhood.com' },
  { ticker: 'TSLA', name: 'Tesla', emoji: '🎯', ir: 'https://ir.tesla.com' },
  { ticker: 'STKE', name: 'Sol Strategies', emoji: '☀️', ir: 'https://solstrategies.io/investors' },
  { ticker: 'QSI', name: 'Quantum-Si', emoji: '🔬', ir: 'https://investors.quantum-si.com' },
  { ticker: 'MP', name: 'MP Materials', emoji: '⛏️', ir: 'https://investors.mpmaterials.com' },
  { ticker: 'HIMS', name: 'Hims & Hers', emoji: '💊', ir: 'https://investors.forhims.com' },
  { ticker: 'OKLO', name: 'Oklo', emoji: '⚛️', ir: 'https://investors.oklo.com' },
  { ticker: 'AMD', name: 'AMD', emoji: '🔺', ir: 'https://ir.amd.com' },
  { ticker: 'NVDA', name: 'NVIDIA', emoji: '💚', ir: 'https://investor.nvidia.com' },
  { ticker: 'DUOL', name: 'Duolingo', emoji: '🦉', ir: 'https://investors.duolingo.com' },
  { ticker: 'MSTR', name: 'Strategy', emoji: '₿', ir: 'https://www.strategy.com/investor-relations' },
  { ticker: 'BE', name: 'Bloom Energy', emoji: '🔋', ir: 'https://investor.bloomenergy.com' },
];

async function getEarnings() {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) return [];
  try {
    const today = new Date();
    const from = today.toISOString().split('T')[0];
    const to = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const results = [];
    for (const item of WATCHLIST) {
      try {
        const url = `https://finnhub.io/api/v1/calendar/earnings?symbol=${item.ticker}&from=${from}&to=${to}&token=${apiKey}`;
        const res = await fetch(url, { next: { revalidate: 21600 } });
        if (!res.ok) continue;
        const data = await res.json();
        const next = (data.earningsCalendar || [])
          .filter((e) => new Date(e.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
        results.push({
          ...item,
          date: next?.date || null,
          time: next?.hour || null,
          epsEstimate: next?.epsEstimate || null,
          quarter: next ? `Q${next.quarter} ${next.year}` : null,
        });
      } catch {
        results.push({ ...item, date: null, time: null, epsEstimate: null, quarter: null });
      }
    }
    return results.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });
  } catch {
    return [];
  }
}

// ============================================================
// HANDLER
// ============================================================
export async function GET() {
  try {
    const [market, fed, crypto, calendar, earnings] = await Promise.all([
      getMarketData(),
      getFedData(),
      getBtcData(),
      getEconomicCalendar(),
      getEarnings(),
    ]);

    const netLiquidity = fed.fedBalance - fed.tga - fed.rrp;

    // Signal calculation
    const tgaStatus = fed.tga > 0.65 ? 'caution' : 'bullish';
    const rrpStatus = fed.rrp < 0.1 ? 'bullish' : 'caution';
    const vixStatus = market.vix < 15 ? 'caution' : market.vix > 40 ? 'bullish' : market.vix <= 25 ? 'bullish' : 'caution';
    const dxyStatus = market.dxy < 105 ? 'bullish' : 'bearish';
    const wtiStatus = market.wti < 80 ? 'bullish' : 'bearish';

    const statuses = [tgaStatus, rrpStatus, vixStatus, dxyStatus, wtiStatus];
    const bullish = statuses.filter((s) => s === 'bullish').length;
    const bearish = statuses.filter((s) => s === 'bearish').length;

    let signal = 'NEUTRAL';
    if (bearish >= 2) signal = 'RISK OFF';
    else if (bullish >= 4) signal = 'RISK ON';
    else if (statuses.filter((s) => s === 'caution').length >= 3) signal = 'CAUTION';

    return NextResponse.json({
      signal,
      bullish,
      bearish,
      caution: statuses.filter((s) => s === 'caution').length,
      market,
      fed: { ...fed, netLiquidity },
      crypto,
      calendar,
      earnings,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch briefing data' }, { status: 500 });
  }
}
