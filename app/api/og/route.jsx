import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

async function getMarketData() {
  try {
    const symbols = '^GSPC,^VIX,DX-Y.NYB,COP=X';
    const res = await fetch(
      `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`,
      { headers: { 'User-Agent': UA }, next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const quotes = data.quoteResponse?.result || [];
    const q = (s) => quotes.find(x => x.symbol === s);
    return {
      sp: q('^GSPC'),
      vix: q('^VIX'),
      dxy: q('DX-Y.NYB'),
      cop: q('COP=X'),
    };
  } catch { return null; }
}

async function getCrypto() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

export async function GET() {
  const [mkt, crypto] = await Promise.all([getMarketData(), getCrypto()]);

  const f = (v, d = 2) => v != null ? Number(v).toFixed(d) : '—';
  const pct = (v) => v != null ? `${v > 0 ? '+' : ''}${Number(v).toFixed(2)}%` : '';
  const cl = (v) => v > 0 ? '#4ade80' : v < 0 ? '#f87171' : '#9ca3af';

  const sp = mkt?.sp;
  const vix = mkt?.vix;
  const dxy = mkt?.dxy;
  const cop = mkt?.cop;
  const btc = crypto?.bitcoin;
  const sol = crypto?.solana;

  const vixVal = vix?.regularMarketPrice || 0;
  const signal = vixVal > 25 ? 'RISK OFF' : vixVal > 20 ? 'MIXED' : 'RISK ON';
  const sigColor = signal === 'RISK ON' ? '#4ade80' : signal === 'RISK OFF' ? '#f87171' : '#facc15';

  const tickers = [
    { label: 'S&P 500', value: f(sp?.regularMarketPrice, 0), change: sp?.regularMarketChangePercent },
    { label: 'VIX', value: f(vix?.regularMarketPrice, 1), change: vix?.regularMarketChangePercent },
    { label: 'BTC', value: btc ? `$${Math.round(btc.usd).toLocaleString()}` : '—', change: btc?.usd_24h_change },
    { label: 'SOL', value: sol ? `$${f(sol.usd)}` : '—', change: sol?.usd_24h_change },
    { label: 'DXY', value: f(dxy?.regularMarketPrice, 1), change: dxy?.regularMarketChangePercent },
    { label: 'USD/COP', value: f(cop?.regularMarketPrice, 0), change: cop?.regularMarketChangePercent },
  ];

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'America/Bogota' });
  const timeStr = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' });

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        background: '#0c0c0e', color: '#d4d4d8', fontFamily: 'monospace',
        padding: '40px 50px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', fontSize: '42px', fontWeight: 800 }}>
              <span style={{ color: '#D4A843' }}>10</span>
              <span style={{ color: '#22C55E' }}>AM</span>
              <span style={{ color: '#52525b' }}>PRO</span>
            </div>
            <div style={{ display: 'flex', fontSize: '14px', color: '#71717a', letterSpacing: '0.15em' }}>BRIEFING DIARIO</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontSize: '16px', color: '#9ca3af' }}>{dateStr}</div>
            <div style={{ fontSize: '14px', color: '#71717a' }}>{timeStr} COT</div>
          </div>
        </div>

        {/* Signal */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          padding: '16px 24px', marginBottom: '28px',
          background: `${sigColor}08`, border: `1px solid ${sigColor}30`, borderRadius: '8px',
        }}>
          <div style={{ display: 'flex', fontSize: '14px', color: '#9ca3af', letterSpacing: '1px' }}>RISK</div>
          <div style={{ display: 'flex', fontSize: '36px', fontWeight: 800, color: sigColor }}>{signal}</div>
        </div>

        {/* Ticker Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', flex: 1 }}>
          {tickers.map((t) => (
            <div key={t.label} style={{
              display: 'flex', flexDirection: 'column',
              background: '#111113', border: '1px solid #27272a', borderRadius: '8px',
              padding: '16px 20px', width: '180px', flex: '1 1 170px',
            }}>
              <div style={{ display: 'flex', fontSize: '13px', color: '#71717a', letterSpacing: '0.5px', marginBottom: '6px' }}>{t.label}</div>
              <div style={{ display: 'flex', fontSize: '28px', fontWeight: 700, color: '#e4e4e7' }}>{t.value}</div>
              <div style={{ display: 'flex', fontSize: '16px', fontWeight: 600, color: cl(t.change), marginTop: '4px' }}>{pct(t.change)}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #1e1e22' }}>
          <div style={{ display: 'flex', fontSize: '14px', color: '#71717a' }}>10ampro-hub.vercel.app</div>
          <div style={{ display: 'flex', fontSize: '14px', color: '#22C55E' }}>@holdmybirra</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
