import { ImageResponse } from 'next/og';

// ============================================================
// /api/og/nosana — social share image for mercados.10am.pro/nosana
// Renders the LIVE "GPU Compute Hours" chart (monthly, all-time)
// straight from the Nosana API, so the link preview always shows
// the thesis' headline signal: network throughput vs the Oct-25 peak.
// Bars are plain divs (no inline SVG / no base64) so Satori renders
// them reliably at 1200x630.
// ============================================================

export const dynamic = 'force-dynamic';

const NOS = 'https://dashboard.k8s.prd.nos.ci';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const GRN = '#22c55e';
const AMB = '#f59e0b';
const RED = '#ef4444';

// last-resort fallback so the preview never renders empty
const SEED = [
  [1714521600000, 166546], [1717200000000, 182301], [1719792000000, 175821],
  [1722470400000, 112108], [1725148800000, 95194], [1727740800000, 61577],
  [1730419200000, 94821], [1733011200000, 77049], [1735689600000, 98709],
  [1738368000000, 107067], [1740787200000, 131786], [1743465600000, 134887],
  [1746057600000, 165293], [1748736000000, 153267], [1751328000000, 170601],
  [1754006400000, 190771], [1756684800000, 191788], [1759276800000, 219656],
  [1761955200000, 208693], [1764547200000, 186312], [1767225600000, 175666],
  [1769904000000, 154627], [1772323200000, 161664], [1775001600000, 146177],
  [1777593600000, 152621], [1780272000000, 132038], [1782864000000, 135683],
].map(([t, y]) => ({ t, y }));

const MONTHS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
const mLabel = (t) => {
  const d = new Date(t);
  return `${MONTHS[d.getUTCMonth()]} ${String(d.getUTCFullYear()).slice(2)}`;
};
const k = (v) => (v >= 1000 ? (v / 1000).toFixed(1) + 'k' : String(Math.round(v)));

async function loadSeries() {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 8000);
  try {
    const r = await fetch(`${NOS}/api/jobs/stats/timestamps-hours?period=0`, {
      headers: { Accept: 'application/json', 'User-Agent': UA },
      cache: 'no-store',
      signal: c.signal,
    });
    if (!r.ok) throw new Error(String(r.status));
    const j = await r.json();
    const raw = Array.isArray(j?.data) ? j.data.slice() : [];
    if (raw.length < 4) throw new Error('short series');
    // API returns newest-first → sort ascending, then drop the newest
    // partial bucket (same rule the /nosana page uses)
    raw.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());
    const pts = raw
      .slice(0, -1)
      .map((p) => ({ t: new Date(p.x).getTime(), y: Math.round(p.y) }))
      .filter((p) => Number.isFinite(p.y));
    return pts.length >= 4 ? pts : SEED;
  } catch {
    return SEED;
  } finally {
    clearTimeout(t);
  }
}

export async function GET() {
  const all = await loadSeries();
  const pts = all.slice(-27); // ~last 27 months, reads well at 1200px
  const ys = pts.map((p) => p.y);
  const max = Math.max(...ys, 1);

  const latest = pts[pts.length - 1];
  const peakAll = all.reduce((a, b) => (b.y > a.y ? b : a), all[0]);
  const peakIdx = pts.reduce((bi, p, i) => (p.y > pts[bi].y ? i : bi), 0);
  const rec = Math.round((latest.y / peakAll.y) * 100);
  const recColor = rec >= 90 ? GRN : rec >= 60 ? AMB : RED;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0c0c0e',
          padding: '38px 48px 30px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: 30, fontWeight: 800, color: '#D4A843' }}>10</span>
              <span style={{ fontSize: 30, fontWeight: 800, color: '#22C55E' }}>AM</span>
              <span style={{ fontSize: 30, fontWeight: 800, color: '#52525b' }}>PRO</span>
            </div>
            <span style={{ fontSize: 22, color: '#3f3f46' }}>/</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#e4e4e7', letterSpacing: 2 }}>
              NOSANA
            </span>
            <span style={{ fontSize: 15, color: '#71717a', letterSpacing: 2 }}>
              NETWORK TELEMETRY
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '9px 20px',
              background: recColor + '1c',
              border: '2px solid ' + recColor + '55',
              borderRadius: 10,
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 800, color: recColor }}>
              {rec}% DEL PICO
            </span>
          </div>
        </div>

        {/* TITLE + KPIs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: 26,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 50, fontWeight: 800, color: '#f4f4f5', letterSpacing: -1 }}>
              GPU Compute Hours
            </span>
            <span style={{ fontSize: 19, color: '#71717a', marginTop: 8 }}>
              Horas de cómputo mensuales · indicador líder de demanda real
            </span>
          </div>
          <div style={{ display: 'flex', gap: 34, alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: 13, color: '#71717a', letterSpacing: 1 }}>PICO</span>
              <span style={{ fontSize: 30, fontWeight: 700, color: AMB }}>{k(peakAll.y)}</span>
              <span style={{ fontSize: 13, color: '#52525b' }}>{mLabel(peakAll.t)}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: 13, color: '#71717a', letterSpacing: 1 }}>ÚLTIMO</span>
              <span style={{ fontSize: 30, fontWeight: 700, color: GRN }}>{k(latest.y)}</span>
              <span style={{ fontSize: 13, color: '#52525b' }}>{mLabel(latest.t)}</span>
            </div>
          </div>
        </div>

        {/* CHART */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'flex-end',
            gap: 7,
            marginTop: 22,
            paddingBottom: 10,
            borderBottom: '2px solid #27272a',
          }}
        >
          {pts.map((p, i) => {
            const isPeak = i === peakIdx;
            const isLast = i === pts.length - 1;
            const h = Math.max(2, Math.round((p.y / max) * 100));
            const col = isPeak ? AMB : isLast ? '#4ade80' : GRN;
            return (
              <div
                key={p.t}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  flex: 1,
                  height: '100%',
                }}
              >
                {(isPeak || isLast) && (
                  <span style={{ fontSize: 15, fontWeight: 700, color: col, marginBottom: 6 }}>
                    {k(p.y)}
                  </span>
                )}
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: `${h}%`,
                    borderRadius: 3,
                    background: `linear-gradient(180deg, ${col} 0%, ${col}44 100%)`,
                    border: isPeak || isLast ? `1px solid ${col}` : '0px solid transparent',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* X LABELS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 14, color: '#52525b' }}>{mLabel(pts[0].t)}</span>
          <span style={{ fontSize: 14, color: AMB }}>{`PICO ${mLabel(peakAll.t)}`}</span>
          <span style={{ fontSize: 14, color: '#52525b' }}>{mLabel(latest.t)}</span>
        </div>

        {/* FOOTER */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 16,
          }}
        >
          <span style={{ fontSize: 19, fontWeight: 700, color: '#a1a1aa' }}>
            mercados.10am.pro/nosana
          </span>
          <span style={{ fontSize: 16, color: '#52525b' }}>
            Datos en vivo · Nosana Network · 10am.pro
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=7200',
      },
    }
  );
}
