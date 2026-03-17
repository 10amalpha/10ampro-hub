import { NextResponse } from 'next/server';

// ============================================================
// STOCK TICKERS (Yahoo Finance)
// ============================================================
const STOCK_TICKERS = ['PLTR','HOOD','TSLA','HIMS','QSI','DUOL','STKE','MP','OKLO','AMD','NVDA','MSTR','BE','IBIT','DNA'];

// ============================================================
// CRYPTO MAP (CoinGecko IDs)
// ============================================================
const CRYPTO_MAP = {
  BTC: 'bitcoin',
  SOL: 'solana',
  ETH: 'ethereum',
  SUI: 'sui',
  JUP: 'jupiter-exchange-solana',
  JTO: 'jito-governance-token',
  NOSANA: 'nosana',
  SHDW: 'genesysgo-shadow',
  HNT: 'helium',
  ZEC: 'zcash',
  JITOSOL: 'jito-staked-sol',
  BONK: 'bonk',
  PUMP: 'pump-fun',
  XRP: 'ripple',
};

// ============================================================
// FETCH STOCKS (Yahoo Finance v7)
// ============================================================
async function fetchStocks() {
  try {
    const symbols = STOCK_TICKERS.join(',');
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
      next: { revalidate: 120 },
    });
    if (!res.ok) throw new Error(`Yahoo ${res.status}`);
    const data = await res.json();
    const results = data.quoteResponse?.result || [];
    return results.map(q => ({
      ticker: q.symbol,
      name: q.shortName || q.symbol,
      price: q.regularMarketPrice ?? null,
      change: q.regularMarketChangePercent ?? null,
      prevClose: q.regularMarketPreviousClose ?? null,
      marketCap: q.marketCap ?? null,
      volume: q.regularMarketVolume ?? null,
      type: 'stock',
    }));
  } catch (e) {
    console.error('Yahoo error:', e);
    return STOCK_TICKERS.map(t => ({ ticker: t, name: t, price: null, change: null, prevClose: null, marketCap: null, volume: null, type: 'stock' }));
  }
}

// ============================================================
// FETCH CRYPTO (CoinGecko)
// ============================================================
async function fetchCrypto() {
  try {
    const ids = Object.values(CRYPTO_MAP).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`;
    const res = await fetch(url, { next: { revalidate: 120 } });
    if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
    const data = await res.json();
    return Object.entries(CRYPTO_MAP).map(([ticker, id]) => {
      const d = data[id];
      return {
        ticker,
        name: id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        price: d?.usd ?? null,
        change: d?.usd_24h_change ?? null,
        prevClose: null,
        marketCap: d?.usd_market_cap ?? null,
        volume: d?.usd_24h_vol ?? null,
        type: 'crypto',
      };
    });
  } catch (e) {
    console.error('CoinGecko error:', e);
    return Object.keys(CRYPTO_MAP).map(t => ({ ticker: t, name: t, price: null, change: null, prevClose: null, marketCap: null, volume: null, type: 'crypto' }));
  }
}

// ============================================================
// FETCH USDCOP (Yahoo Finance)
// ============================================================
async function fetchUSDCOP() {
  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=COP=X`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const q = data.quoteResponse?.result?.[0];
    if (!q) return null;
    return {
      ticker: 'USDCOP',
      name: 'USD/COP',
      price: q.regularMarketPrice ?? null,
      change: q.regularMarketChangePercent ?? null,
      prevClose: q.regularMarketPreviousClose ?? null,
      marketCap: null,
      volume: null,
      type: 'fx',
    };
  } catch {
    return { ticker: 'USDCOP', name: 'USD/COP', price: null, change: null, prevClose: null, marketCap: null, volume: null, type: 'fx' };
  }
}

// ============================================================
// GET handler
// ============================================================
export async function GET() {
  try {
    const [stocks, crypto, usdcop] = await Promise.all([
      fetchStocks(),
      fetchCrypto(),
      fetchUSDCOP(),
    ]);
    const assets = [...stocks, ...crypto];
    if (usdcop) assets.push(usdcop);
    return NextResponse.json({ assets, fetchedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Watchlist API error:', error);
    return NextResponse.json({ error: 'Failed to fetch watchlist' }, { status: 500 });
  }
}
