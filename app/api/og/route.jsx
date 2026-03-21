import { ImageResponse } from 'next/og';

export const dynamic = 'force-dynamic';

export async function GET() {
  let spP = '—', spC = 0, vixP = '—', vixV = 0, vixC = 0;
  let btcP = '—', btcC = 0, solP = '—', solC = 0;
  let dxyP = '—', dxyC = 0, copP = '—', copC = 0;

  // Try Yahoo
  try {
    const res = await fetch(
      `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent('^GSPC,^VIX,DX-Y.NYB,COP=X')}`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }
    );
    if (res.ok) {
      const data = await res.json();
      const q = (s) => (data.quoteResponse?.result || []).find(x => x.symbol === s);
      const sp = q('^GSPC'); const vix = q('^VIX'); const dxy = q('DX-Y.NYB'); const cop = q('COP=X');
      if (sp) { spP = Math.round(sp.regularMarketPrice).toLocaleString(); spC = sp.regularMarketChangePercent || 0; }
      if (vix) { vixP = vix.regularMarketPrice?.toFixed(1); vixV = vix.regularMarketPrice || 0; vixC = vix.regularMarketChangePercent || 0; }
      if (dxy) { dxyP = dxy.regularMarketPrice?.toFixed(1); dxyC = dxy.regularMarketChangePercent || 0; }
      if (cop) { copP = Math.round(cop.regularMarketPrice).toLocaleString(); copC = cop.regularMarketChangePercent || 0; }
    }
  } catch (e) { console.error('OG Yahoo error:', e.message); }

  // Try CoinGecko
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=usd&include_24hr_change=true');
    if (res.ok) {
      const cg = await res.json();
      if (cg.bitcoin) { btcP = '$' + Math.round(cg.bitcoin.usd).toLocaleString(); btcC = cg.bitcoin.usd_24h_change || 0; }
      if (cg.solana) { solP = '$' + cg.solana.usd?.toFixed(2); solC = cg.solana.usd_24h_change || 0; }
    }
  } catch (e) { console.error('OG CoinGecko error:', e.message); }

  const signal = vixV > 25 ? 'RISK OFF' : vixV > 20 ? 'MIXED' : 'RISK ON';
  const sigColor = signal === 'RISK ON' ? '#4ade80' : signal === 'RISK OFF' ? '#f87171' : '#facc15';
  const pc = (v) => `${v > 0 ? '+' : ''}${v.toFixed(2)}%`;
  const cc = (v) => v > 0 ? '#4ade80' : v < 0 ? '#f87171' : '#9ca3af';

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#0c0c0e', padding: '40px 50px', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: 48, fontWeight: 800, color: '#D4A843' }}>10</span>
            <span style={{ fontSize: 48, fontWeight: 800, color: '#22C55E' }}>AM</span>
            <span style={{ fontSize: 48, fontWeight: 800, color: '#52525b' }}>PRO</span>
          </div>
          <div style={{ display: 'flex', padding: '10px 28px', background: sigColor + '18', border: '2px solid ' + sigColor + '50', borderRadius: 12 }}>
            <span style={{ fontSize: 34, fontWeight: 800, color: sigColor }}>{signal}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '14px', marginBottom: '14px', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: 10, padding: '20px 24px', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, color: '#71717a', marginBottom: 6 }}>S&P 500</span>
            <span style={{ fontSize: 34, fontWeight: 700, color: '#e4e4e7' }}>{spP}</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: cc(spC) }}>{pc(spC)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: 10, padding: '20px 24px', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, color: '#71717a', marginBottom: 6 }}>VIX</span>
            <span style={{ fontSize: 34, fontWeight: 700, color: vixV > 25 ? '#f87171' : '#fbbf24' }}>{vixP}</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: cc(vixC) }}>{pc(vixC)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: 10, padding: '20px 24px', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, color: '#71717a', marginBottom: 6 }}>BTC</span>
            <span style={{ fontSize: 34, fontWeight: 700, color: '#f59e0b' }}>{btcP}</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: cc(btcC) }}>{pc(btcC)}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '14px', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: 10, padding: '20px 24px', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, color: '#71717a', marginBottom: 6 }}>SOL</span>
            <span style={{ fontSize: 34, fontWeight: 700, color: '#9333ea' }}>{solP}</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: cc(solC) }}>{pc(solC)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: 10, padding: '20px 24px', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, color: '#71717a', marginBottom: 6 }}>DXY</span>
            <span style={{ fontSize: 34, fontWeight: 700, color: '#fbbf24' }}>{dxyP}</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: cc(dxyC) }}>{pc(dxyC)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid #27272a', borderRadius: 10, padding: '20px 24px', justifyContent: 'center' }}>
            <span style={{ fontSize: 15, color: '#71717a', marginBottom: 6 }}>USD/COP</span>
            <span style={{ fontSize: 34, fontWeight: 700, color: '#a78bfa' }}>{copP}</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: cc(copC) }}>{pc(copC)}</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #27272a' }}>
          <span style={{ fontSize: 16, color: '#71717a' }}>10ampro-hub.vercel.app</span>
          <span style={{ fontSize: 16, color: '#22C55E' }}>@holdmybirra</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
