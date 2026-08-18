import { ImageResponse } from 'next/og';

// ============================================================
// /api/og/biology-is-code — social share image for
// mercados.10am.pro/biology-is-code
// Static snapshot of the Bio-OS thesis: Read · Orchestrate ·
// Write value chain + the 9-ticker basket. Plain divs only
// (no inline SVG / no base64) so Satori renders reliably.
// ============================================================

export const dynamic = 'force-static';

const BLUE = '#378ADD';
const GOLD = '#D4A843';
const GRN = '#22c55e';

const LAYERS = [
  { tag: 'READ', sub: 'Leer el código', color: BLUE, ticks: 'NAUT · TEM · CAI · RXRX' },
  { tag: 'ORCHESTRATE', sub: 'Orquestar la data', color: GOLD, ticks: 'HIMS' },
  { tag: 'WRITE', sub: 'Escribir la biología', color: GRN, ticks: 'IBRX · INKT · NGEN · PBLS' },
];

export async function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#0c0c0e', padding: '44px 54px', fontFamily: 'sans-serif' }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: GOLD }}>10</span>
            <span style={{ fontSize: 36, fontWeight: 800, color: GRN }}>AM</span>
            <span style={{ fontSize: 36, fontWeight: 800, color: '#52525b' }}>PRO</span>
          </div>
          <div style={{ display: 'flex', padding: '8px 22px', background: GRN + '14', border: '2px solid ' + GRN + '45', borderRadius: 10 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: GRN, letterSpacing: 2 }}>BIO-OS · 9 TICKERS</span>
          </div>
        </div>

        {/* title */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 34 }}>
          <span style={{ fontSize: 74, fontWeight: 800, color: '#f4f4f5', letterSpacing: -2, lineHeight: 1.02 }}>Biology is Code</span>
          <span style={{ fontSize: 27, color: '#a1a1aa', marginTop: 12 }}>
            El próximo superciclo de cómputo corre sobre biología humana.
          </span>
        </div>

        {/* value chain */}
        <div style={{ display: 'flex', gap: '16px', marginTop: 36, flex: 1 }}>
          {LAYERS.map((l) => (
            <div key={l.tag} style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#111113', border: '1px solid ' + l.color + '55', borderTop: '4px solid ' + l.color, borderRadius: 12, padding: '22px 24px', justifyContent: 'center' }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: l.color, letterSpacing: 3 }}>{l.tag}</span>
              <span style={{ fontSize: 18, color: '#71717a', marginTop: 6 }}>{l.sub}</span>
              <span style={{ fontSize: 19, fontWeight: 700, color: '#d4d4d8', marginTop: 16, fontFamily: 'monospace' }}>{l.ticks}</span>
            </div>
          ))}
        </div>

        {/* footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
          <span style={{ fontSize: 21, color: '#71717a' }}>La nueva scaling law es <span style={{ color: GRN, fontWeight: 700, marginLeft: 7 }}>Healthspan per Token</span></span>
          <span style={{ fontSize: 21, color: '#52525b' }}>mercados.10am.pro/biology-is-code</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
