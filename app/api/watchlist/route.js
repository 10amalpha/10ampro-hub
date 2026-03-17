import { NextResponse } from 'next/server';

const STOCK_TICKERS = ['PLTR','HOOD','TSLA','HIMS','QSI','DUOL','STKE','MP','OKLO','AMD','NVDA','MSTR','BE','IBIT','DNA'];

const CRYPTO_MAP = {
  BTC: 'bitcoin', SOL: 'solana', ETH: 'ethereum', SUI: 'sui',
  JUP: 'jupiter-exchange-solana', JTO: 'jito-governance-token',
  NOSANA: 'nosana', SHDW: 'genesysgo-shadow', HNT: 'helium',
  ZEC: 'zcash', JITOSOL: 'jito-staked-sol', BONK: 'bonk',
  PUMP: 'pump-fun', XRP: 'ripple',
};

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';

async function fetchStocks() {
  const symbols = STOCK_TICKERS.join(',');
  for (const host of ['query2.finance.yahoo.com', 'query1.finance.yahoo.com']) {
    try {
      const res = await fetch(`https://${host}/v7/finance/quote?symbols=${symbols}`, {
        headers: { 'User-Agent': UA }, next: { revalidate: 120 },
      });
      if (!res.ok) continue;
      const data = await res.json();
      const results = data.quoteResponse?.result || [];
      if (!results.length) continue;
      return results.map(q => ({
        ticker: q.symbol, name: q.shortName || q.symbol,
        price: q.regularMarketPrice ?? null,
        change: q.regularMarketChangePercent ?? null,
        marketCap: q.marketCap ?? null, type: 'stock',
      }));
    } catch (e) { console.error(`Yahoo ${host}:`, e.message); }
  }
  return STOCK_TICKERS.map(t => ({ ticker: t, name: t, price: null, change: null, marketCap: null, type: 'stock' }));
}

async function fetchCrypto() {
  try {
    const ids = Object.values(CRYPTO_MAP).join(',');
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`, { next: { revalidate: 120 } });
    if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
    const data = await res.json();
    return Object.entries(CRYPTO_MAP).map(([ticker, id]) => {
      const d = data[id];
      return {
        ticker, name: ticker,
        price: d?.usd ?? null, change: d?.usd_24h_change ?? null,
        marketCap: d?.usd_market_cap ?? null, type: 'crypto',
      };
    });
  } catch (e) {
    console.error('CoinGecko error:', e);
    return Object.keys(CRYPTO_MAP).map(t => ({ ticker: t, name: t, price: null, change: null, marketCap: null, type: 'crypto' }));
  }
}

async function fetchUSDCOP() {
  try {
    const res = await fetch('https://query2.finance.yahoo.com/v7/finance/quote?symbols=COP=X', {
      headers: { 'User-Agent': UA }, next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const q = (await res.json()).quoteResponse?.result?.[0];
    if (!q) return null;
    return { ticker: 'USDCOP', name: 'USD/COP', price: q.regularMarketPrice ?? null, change: q.regularMarketChangePercent ?? null, marketCap: null, type: 'fx' };
  } catch { return null; }
}

export async function GET() {
  try {
    const [stocks, crypto, usdcop] = await Promise.all([fetchStocks(), fetchCrypto(), fetchUSDCOP()]);
    const assets = [...stocks, ...crypto];
    if (usdcop) assets.push(usdcop);
    return NextResponse.json({ assets, fetchedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
