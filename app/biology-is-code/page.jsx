'use client';
import { useState, useEffect } from 'react';

// ============================================================
// BIOLOGY IS CODE — findings page (mercados.10am.pro/biology-is-code)
// Self-contained. Data is a point-in-time snapshot (see AS_OF).
// ============================================================

const AS_OF = 'Jun 17, 2026';

const C_REV = '#85B7EB';
const C_GP = '#185FA5';
const C_OP = '#f59e0b';

// Market caps / prices: mid-June 2026 snapshot.
const TICKERS = [
  { sym: 'TEM', name: 'Tempus AI', mcap: '$9.3B', price: '$52', node: 'Data / AI precision-medicine layer' },
  { sym: 'IBRX', name: 'ImmunityBio', mcap: '$7.4B', price: '$7.10', node: 'REBOOT — restart the immune OS' },
  { sym: 'RXRX', name: 'Recursion Pharmaceuticals', mcap: '$1.4B', price: '$3.04', node: 'MODEL — AI simulation & optimization' },
  { sym: 'NAUT', name: 'Nautilus Biotechnology', mcap: '$286M', price: '$2.17', node: 'READ — digitize the proteome' },
  { sym: 'INKT', name: 'MiNK Therapeutics', mcap: '$60M', price: '$11.87', node: 'EXECUTE — precision lipid targeting' },
];

// Income statements ($M). Op-income flagged approx where noted.
const FIN = {
  TEM: { name: 'Tempus AI', sub: 'TEM · ≈ $52/sh', mcap: '$9.3B', years: [2022, 2023, 2024, 2025],
    revenue: [320.7, 531.8, 693.4, 1271.8], gross: [130.2, 286.2, 381.1, 797.9], op: [-265.4, -196.1, -691.1, -252.9],
    note: 'FY2022–FY2025. Revenue crossed $1.27B in 2025 (+83% YoY); gross profit scaled with it. The operating loss spiked in 2024 on heavy opex, then narrowed sharply in 2025.' },
  IBRX: { name: 'ImmunityBio', sub: 'IBRX · ≈ $7.10/sh', mcap: '$7.4B', years: [2022, 2023, 2024, 2025],
    revenue: [0.24, 0.62, 14.7, 113], gross: [0.24, 0.61, 14.6, 112], op: [-405, -361, -344, -250],
    note: 'FY2022–FY2025. Revenue is ANKTIVA product sales: ~$113M in 2025 (+700% YoY) after FDA approval in Apr 2024. Operating-income figures for 2022 and 2025 are approximate (derived from R&D + SG&A).' },
  RXRX: { name: 'Recursion Pharmaceuticals', sub: 'RXRX · ≈ $3.04/sh', mcap: '$1.4B', years: [2022, 2023, 2024, 2025],
    revenue: [39.7, 43.9, 58.5, 74.3], gross: [-8.6, 1.3, 13.3, 3.3], op: [-245.7, -350.1, -479.0, -648.1],
    note: 'FY2022–FY2025. Revenue is mostly partnership/collaboration income. Gross profit is thin and volatile; the operating loss widened sharply as R&D scaled.' },
  NAUT: { name: 'Nautilus Biotechnology', sub: 'NAUT · ≈ $2.17/sh', mcap: '$286M', years: [2022, 2023, 2024, 2025],
    revenue: [0, 0, 0, 0], gross: [0, 0, 0, 0], op: [-63.6, -76.2, -81.5, -71.4],
    note: 'FY2022–FY2025. Pre-revenue (proteomics platform not yet commercial). The chart shows operating loss only; it peaked in 2024 and eased in 2025.' },
  INKT: { name: 'MiNK Therapeutics', sub: 'INKT · ≈ $11.87/sh', mcap: '$60M', years: [2021, 2022, 2023, 2024, 2025],
    revenue: [0, 0, 0, 0, 0], gross: [0, 0, 0, 0, 0], op: [-18.6, -30.9, -22.9, -10.7, -11.4],
    note: 'FY2021–FY2025. Clinical-stage, no product revenue. The operating loss shrank ~63% from its 2022 peak after aggressive cost cuts.' },
};

const VALUE_CHAIN = [
  { node: 'NODE 1 · READ', sym: '$NAUT', name: 'Nautilus Biotechnology', desc: 'Digitize the proteome — map up to 10B intact proteins per run, turning unreadable biology into precision data.' },
  { node: 'NODE 2 · MODEL', sym: '$RXRX', name: 'Recursion Pharmaceuticals', desc: 'Compress 50 petabytes of proprietary cellular data into an AI search problem; map interaction → chemistry → outcome.' },
  { node: 'NODE 3 · REBOOT', sym: '$IBRX', name: 'ImmunityBio', desc: 'A horizontal IL-15 super-agonist platform (ANKTIVA) that restarts the immune OS — a system-wide reboot.' },
  { node: 'NODE 4 · EXECUTE', sym: '$INKT', name: 'MiNK Therapeutics', desc: 'Precision strikes with iNKT cells that target lipids (not peptides) — off-the-shelf, durable, low-cost manufacturing.' },
];

function fmtM(v) {
  const s = v < 0 ? '-' : '';
  const a = Math.abs(v);
  if (a >= 1000) return s + '$' + (a / 1000).toFixed(2) + 'B';
  return s + '$' + Math.round(a) + 'M';
}
function pct(v) { return (v > 0 ? '+' : '') + Math.round(v) + '%'; }

function stats(arr, years) {
  const start = arr[0], end = arr[arr.length - 1], n = years.length - 1;
  if (start === 0 && end === 0) return { na: true };
  if (start > 0 && end > 0) {
    return { cagr: pct((Math.pow(end / start, 1 / n) - 1) * 100), tot: pct((end / start - 1) * 100), na: false };
  }
  const tot = ((end - start) / Math.abs(start)) * 100;
  const cagr = Math.sign(Math.abs(end) - Math.abs(start)) * (Math.pow(Math.abs(end) / Math.abs(start), 1 / n) - 1) * 100;
  return { cagr: pct(-cagr), tot: pct(tot), na: false };
}

function Chip({ color, label, s }) {
  return (
    <div style={{ flex: 1, minWidth: 150, border: '1px solid var(--border)', borderRadius: 6, padding: '7px 11px', background: 'var(--surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
        <span style={{ width: 9, height: 9, borderRadius: 2, background: color }} />{label}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>
        {s.na ? <span style={{ color: 'var(--text-muted)' }}>no revenue</span>
          : <>CAGR <b style={{ fontWeight: 700 }}>{s.cagr}</b> · Total <b style={{ fontWeight: 700 }}>{s.tot}</b></>}
      </div>
    </div>
  );
}

function IncomeChart({ d, mb }) {
  const W = 640, H = mb ? 280 : 340, padR = 56, padL = 8, padT = 22, padB = 26;
  const all = [...d.revenue, ...d.gross, ...d.op, 0];
  let max = Math.max(...all), min = Math.min(...all);
  const span = (max - min) || 1; max += span * 0.06; min -= span * 0.04;
  const y = (v) => padT + (max - v) / (max - min) * (H - padT - padB);
  const plotW = W - padR - padL, n = d.years.length, groupW = plotW / n, barGap = 4;
  const bw = Math.min(16, (groupW - barGap * 2 - 12) / 3);
  const y0 = y(0);
  const series = [{ k: 'revenue', c: C_REV }, { k: 'gross', c: C_GP }, { k: 'op', c: C_OP }];
  const ticks = 5;
  const gridLines = [], yLabels = [];
  for (let i = 0; i <= ticks; i++) {
    const v = max - (max - min) * i / ticks, yy = y(v);
    gridLines.push(<line key={'g' + i} x1={padL} y1={yy} x2={W - padR} y2={yy} stroke="var(--border-subtle)" strokeWidth="1" />);
    yLabels.push(<text key={'l' + i} x={W - padR + 6} y={yy + 3.5} fontSize="10.5" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">{fmtM(v)}</text>);
  }
  const bars = [];
  d.years.forEach((yr, i) => {
    const gx = padL + i * groupW + (groupW - (bw * 3 + barGap * 2)) / 2;
    series.forEach((s, j) => {
      const v = d[s.k][i], bx = gx + j * (bw + barGap);
      if (v === 0) {
        bars.push(<rect key={i + s.k} x={bx} y={y0 - 1} width={bw} height={2} rx={1} fill={s.c} opacity={0.45} />);
      } else {
        const yy = y(v), h = Math.abs(yy - y0), top = v >= 0 ? yy : y0;
        bars.push(<rect key={i + s.k} x={bx} y={top} width={bw} height={Math.max(h, 1.5)} rx={2} fill={s.c} />);
      }
    });
    bars.push(<text key={'yr' + i} x={padL + i * groupW + groupW / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="'JetBrains Mono',monospace">{yr}</text>);
  });
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Income statement bars for ${d.name}`}>
        <desc>Revenue, gross profit and operating income by fiscal year.</desc>
        {gridLines}
        <line x1={padL} y1={y0} x2={W - padR} y2={y0} stroke="var(--border)" strokeWidth="1.5" />
        {bars}
        {yLabels}
      </svg>
    </div>
  );
}

export default function BiologyIsCode() {
  const [active, setActive] = useState('TEM');
  const [theme, setTheme] = useState('dark');
  const [mb, setMb] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('10am-theme') || 'dark';
    setTheme(saved);
    document.documentElement.classList.toggle('light', saved === 'light');
    const onR = () => setMb(window.innerWidth <= 768);
    onR();
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('10am-theme', next);
    document.documentElement.classList.toggle('light', next === 'light');
  };

  const d = FIN[active];

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: mb ? '6px 8px' : '10px 20px' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)', marginBottom: 18 }}>
        <a href="https://mercados.10am.pro" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logo.jpg" alt="10AMPRO" style={{ width: 34, height: 34, borderRadius: 6 }} />
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>← Volver al hub</span>
        </a>
        <button onClick={toggleTheme} title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 16, width: 36, height: 32, cursor: 'pointer' }}>
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </header>

      {/* HERO */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', letterSpacing: '1px', marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>● BIOLOGY IS CODE</div>
        <h1 style={{ fontSize: mb ? 26 : 38, fontWeight: 800, color: 'var(--text-bright)', lineHeight: 1.1, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 12 }}>
          The next computing supercycle runs on human biology
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.6, maxWidth: 680 }}>
          Biology is shifting from a discovery lottery to a computable search problem. As AI abstracts away material scarcity, capital concentrates on the ultimate constraint — human lifespan. These five names are our read on the horizontal bio-platform stack.
        </p>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12, fontFamily: "'JetBrains Mono',monospace" }}>Snapshot · {AS_OF}</div>
      </div>

      {/* MARKET CAP TABLE */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.5px', marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>MARKET CAP · {AS_OF}</div>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {TICKERS.map((t, i) => (
            <div key={t.sym} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: mb ? '10px 12px' : '12px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
              <div style={{ width: mb ? 52 : 60 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'JetBrains Mono',monospace" }}>{t.sym}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.price}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600 }}>{t.name}</div>
                {!mb && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.node}</div>}
              </div>
              <div style={{ fontSize: mb ? 16 : 18, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'JetBrains Mono',monospace" }}>{t.mcap}</div>
            </div>
          ))}
        </div>
      </div>

      {/* INCOME STATEMENTS */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.5px', marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>INCOME STATEMENTS · annual · USD millions</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {TICKERS.map((t) => {
            const on = t.sym === active;
            return (
              <button key={t.sym} onClick={() => setActive(t.sym)}
                style={{ padding: '6px 13px', fontSize: 13, fontWeight: on ? 700 : 400, fontFamily: "'JetBrains Mono',monospace",
                  border: '1px solid ' + (on ? 'var(--gold)' : 'var(--border)'), borderRadius: 6, cursor: 'pointer',
                  background: on ? 'var(--surface-2)' : 'transparent', color: on ? 'var(--text-bright)' : 'var(--text-secondary)' }}>
                {t.sym}
              </button>
            );
          })}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: mb ? '14px' : '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif" }}>{d.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>{d.sub}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Market cap</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'JetBrains Mono',monospace" }}>{d.mcap}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            <Chip color={C_REV} label="Revenue" s={stats(d.revenue, d.years)} />
            <Chip color={C_GP} label="Gross profit" s={stats(d.gross, d.years)} />
            <Chip color={C_OP} label="Operating income" s={stats(d.op, d.years)} />
          </div>
          <IncomeChart d={d} mb={mb} />
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{d.note}</div>
        </div>
      </div>

      {/* VALUE CHAIN */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.5px', marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>THE API VALUE CHAIN OF PROGRAMMABLE BIOLOGY</div>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 8 }}>
          {VALUE_CHAIN.map((v) => (
            <div key={v.sym} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', letterSpacing: '0.5px', fontFamily: "'JetBrains Mono',monospace" }}>{v.node}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', fontFamily: "'JetBrains Mono',monospace" }}>{v.sym}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif", marginBottom: 5 }}>{v.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* METHODOLOGY */}
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '14px 16px', marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.5px', marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>METODOLOGÍA & NOTAS</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <li>Market caps and prices are a point-in-time snapshot ({AS_OF}) and move daily.</li>
          <li>Income-statement figures are annual GAAP from company filings and Yahoo Finance. NAUT and INKT are pre-revenue, so only operating income is plotted.</li>
          <li>IBRX operating income for 2022 and 2025 is approximate (derived from R&D + SG&A) where a clean GAAP line was not directly available.</li>
          <li>This is data and research context, not investment advice.</li>
        </ul>
      </div>

      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--border)', fontFamily: "'JetBrains Mono',monospace" }}>
        <a href="https://10am.pro" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>10am.pro</a>
        <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>Biology is Code</span>
      </footer>
    </div>
  );
}
