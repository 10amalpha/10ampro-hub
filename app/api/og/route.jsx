import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

async function getData() {
  try {
    const [yRes, cRes] = await Promise.all([
      fetch(`https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent('^GSPC,^VIX,DX-Y.NYB,COP=X')}`, {
        headers: { 'User-Agent': UA },
      }),
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=usd&include_24hr_change=true'),
    ]);
    const yData = yRes.ok ? await yRes.json() : {};
    const cData = cRes.ok ? await cRes.json() : {};
    const quotes = yData.quoteResponse?.result || [];
    const q = (s) => quotes.find(x => x.symbol === s);
    return {
      sp: q('^GSPC'), vix: q('^VIX'), dxy: q('DX-Y.NYB'), cop: q('COP=X'),
      btc: cData.bitcoin, sol: cData.solana,
    };
  } catch { return {}; }
}

export async function GET() {
  const d = await getData();
  const f = (v, dec) => v != null ? Number(v).toFixed(dec) : '—';
  const pct = (v) => v != null ? `${v > 0 ? '+' : ''}${Number(v).toFixed(2)}%` : '';
  const cl = (v) => v > 0 ? '#4ade80' : v < 0 ? '#f87171' : '#9ca3af';

  const vixVal = d.vix?.regularMarketPrice || 0;
  const signal = vixVal > 25 ? 'RISK OFF' : vixVal > 20 ? 'MIXED' : 'RISK ON';
  const sigColor = signal === 'RISK ON' ? '#4ade80' : signal === 'RISK OFF' ? '#f87171' : '#facc15';

  const spP = f(d.sp?.regularMarketPrice, 0);
  const spC = d.sp?.regularMarketChangePercent;
  const vixP = f(d.vix?.regularMarketPrice, 1);
  const vixC = d.vix?.regularMarketChangePercent;
  const btcP = d.btc ? `$${Math.round(d.btc.usd).toLocaleString()}` : '—';
  const btcC = d.btc?.usd_24h_change;
  const solP = d.sol ? `$${f(d.sol.usd, 2)}` : '—';
  const solC = d.sol?.usd_24h_change;
  const dxyP = f(d.dxy?.regularMarketPrice, 1);
  const dxyC = d.dxy?.regularMarketChangePercent;
  const copP = f(d.cop?.regularMarketPrice, 0);
  const copC = d.cop?.regularMarketChangePercent;

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        background: '#0c0c0e', color: '#d4d4d8', padding: '40px 50px',
        fontFamily: 'monospace',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '44px', fontWeight: 800, color: '#D4A843' }}>10</span>
            <span style={{ fontSize: '44px', fontWeight: 800, color: '#22C55E' }}>AM</span>
            <span style={{ fontSize: '44px', fontWeight: 800, color: '#52525b' }}>PRO</span>
          </div>
          <div style={{ display: 'flex', padding: '10px 24px', background: `${sigColor}15`, border: `2px solid ${sigColor}40`, borderRadius: '12px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: sigColor }}>{signal}</span>
          </div>
        </div>

        {/* Tickers - 2 rows of 3 */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: '10px', padding: '18px 22px' }}>
            <span style={{ fontSize: '14px', color: '#71717a', marginBottom: '6px' }}>S&P 500</span>
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#e4e4e7' }}>{spP}</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: cl(spC) }}>{pct(spC)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: '10px', padding: '18px 22px' }}>
            <span style={{ fontSize: '14px', color: '#71717a', marginBottom: '6px' }}>VIX</span>
            <span style={{ fontSize: '32px', fontWeight: 700, color: vixVal > 25 ? '#f87171' : '#fbbf24' }}>{vixP}</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: cl(vixC) }}>{pct(vixC)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: '10px', padding: '18px 22px' }}>
            <span style={{ fontSize: '14px', color: '#71717a', marginBottom: '6px' }}>BTC</span>
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#f59e0b' }}>{btcP}</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: cl(btcC) }}>{pct(btcC)}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: '10px', padding: '18px 22px' }}>
            <span style={{ fontSize: '14px', color: '#71717a', marginBottom: '6px' }}>SOL</span>
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#9333ea' }}>{solP}</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: cl(solC) }}>{pct(solC)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: '10px', padding: '18px 22px' }}>
            <span style={{ fontSize: '14px', color: '#71717a', marginBottom: '6px' }}>DXY</span>
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#fbbf24' }}>{dxyP}</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: cl(dxyC) }}>{pct(dxyC)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: '10px', padding: '18px 22px' }}>
            <span style={{ fontSize: '14px', color: '#71717a', marginBottom: '6px' }}>USD/COP</span>
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#a78bfa' }}>{copP}</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: cl(copC) }}>{pct(copC)}</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #1e1e22' }}>
          <span style={{ fontSize: '16px', color: '#71717a' }}>10ampro-hub.vercel.app</span>
          <span style={{ fontSize: '16px', color: '#22C55E' }}>@holdmybirra</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
