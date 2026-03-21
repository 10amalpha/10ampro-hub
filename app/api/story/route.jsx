import { ImageResponse } from 'next/og';

export const dynamic = 'force-dynamic';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

async function getData() {
  let sp = {}, vix = {}, dxy = {}, cop = {}, wti = {}, move = {};
  let btc = {}, sol = {};

  try {
    const res = await fetch(
      `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent('^GSPC,^VIX,DX-Y.NYB,COP=X,CL=F,^MOVE')}`,
      { headers: { 'User-Agent': UA } }
    );
    if (res.ok) {
      const data = await res.json();
      const quotes = data.quoteResponse?.result || [];
      const q = (s) => quotes.find(x => x.symbol === s) || {};
      sp = q('^GSPC'); vix = q('^VIX'); dxy = q('DX-Y.NYB');
      cop = q('COP=X'); wti = q('CL=F'); move = q('^MOVE');
    }
  } catch (e) { console.error('Story Yahoo:', e.message); }

  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana,ethereum&vs_currencies=usd&include_24hr_change=true');
    if (res.ok) {
      const cg = await res.json();
      btc = cg.bitcoin || {};
      sol = cg.solana || {};
    }
  } catch (e) { console.error('Story CoinGecko:', e.message); }

  return { sp, vix, dxy, cop, wti, move, btc, sol };
}

export async function GET() {
  const d = await getData();

  const f = (v, dec) => v != null ? Number(v).toFixed(dec) : '—';
  const pct = (v) => v != null ? `${v > 0 ? '+' : ''}${Number(v).toFixed(2)}%` : '';
  const cc = (v) => v > 0 ? '#4ade80' : v < 0 ? '#f87171' : '#9ca3af';

  const vixVal = d.vix.regularMarketPrice || 0;
  const moveVal = d.move.regularMarketPrice || 0;
  const signal = vixVal > 25 ? 'RISK OFF' : vixVal > 20 ? 'MIXED' : 'RISK ON';
  const sigColor = signal === 'RISK ON' ? '#4ade80' : signal === 'RISK OFF' ? '#f87171' : '#facc15';

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Bogota' });
  const timeStr = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' });

  const spC = d.sp.regularMarketChangePercent || 0;
  const vixC = d.vix.regularMarketChangePercent || 0;
  const btcC = d.btc.usd_24h_change || 0;
  const solC = d.sol.usd_24h_change || 0;
  const dxyC = d.dxy.regularMarketChangePercent || 0;
  const copC = d.cop.regularMarketChangePercent || 0;
  const wtiC = d.wti.regularMarketChangePercent || 0;
  const moveC = d.move.regularMarketChangePercent || 0;

  // Ticker row helper
  const Ticker = (label, value, change, color) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', background: '#111113', border: '1px solid #1e1e22', borderRadius: 12, marginBottom: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 16, color: '#71717a', letterSpacing: '0.5px' }}>{label}</span>
        <span style={{ fontSize: 36, fontWeight: 700, color: color || '#e4e4e7' }}>{value}</span>
      </div>
      <span style={{ fontSize: 22, fontWeight: 700, color: cc(change) }}>{pct(change)}</span>
    </div>
  );

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#0c0c0e', padding: '60px 40px 40px', fontFamily: 'sans-serif' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 52, fontWeight: 800, color: '#D4A843' }}>10</span>
            <span style={{ fontSize: 52, fontWeight: 800, color: '#22C55E' }}>AM</span>
            <span style={{ fontSize: 52, fontWeight: 800, color: '#52525b' }}>PRO</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 16, color: '#9ca3af' }}>{dateStr}</span>
            <span style={{ fontSize: 14, color: '#71717a' }}>{timeStr} COT</span>
          </div>
        </div>

        {/* Signal Banner */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
          padding: '20px 32px', marginBottom: 28,
          background: sigColor + '12', border: '2px solid ' + sigColor + '40',
          borderRadius: 14,
        }}>
          <span style={{ fontSize: 18, color: '#9ca3af', letterSpacing: 2, fontWeight: 600 }}>SEÑAL</span>
          <span style={{ fontSize: 42, fontWeight: 800, color: sigColor }}>{signal}</span>
        </div>

        {/* Market Tickers */}
        {Ticker('S&P 500', f(d.sp.regularMarketPrice, 0), spC, '#60a5fa')}
        {Ticker('VIX', f(d.vix.regularMarketPrice, 1), vixC, vixVal > 25 ? '#f87171' : '#fbbf24')}
        {Ticker('MOVE', f(d.move.regularMarketPrice, 1), moveC, moveVal > 100 ? '#f87171' : '#fbbf24')}
        {Ticker('BTC', d.btc.usd ? '$' + Math.round(d.btc.usd).toLocaleString() : '—', btcC, '#f59e0b')}
        {Ticker('SOL', d.sol.usd ? '$' + f(d.sol.usd, 2) : '—', solC, '#9333ea')}
        {Ticker('WTI', '$' + f(d.wti.regularMarketPrice, 1), wtiC, '#f97316')}
        {Ticker('DXY', f(d.dxy.regularMarketPrice, 1), dxyC, '#fbbf24')}
        {Ticker('USD/COP', f(d.cop.regularMarketPrice, 0), copC, '#a78bfa')}

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 20, borderTop: '1px solid #27272a' }}>
          <span style={{ fontSize: 18, color: '#71717a' }}>10ampro-hub.vercel.app</span>
          <span style={{ fontSize: 18, color: '#22C55E', fontWeight: 600 }}>@holdmybirra</span>
        </div>
      </div>
    ),
    { width: 1080, height: 1920 },
  );
}
