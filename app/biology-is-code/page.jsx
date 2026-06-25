'use client';
import { useState, useEffect } from 'react';

// ============================================================
// BIOLOGY IS CODE — The Biological Operating System
// mercados.10am.pro/biology-is-code
// Point-in-time snapshot (see AS_OF). Read · Orchestrate · Write.
// ============================================================

const AS_OF = 'Jun 25, 2026';

const C_REV = '#85B7EB';
const C_GP = '#185FA5';
const C_OP = '#f59e0b';

const LAYER_COLOR = { READ: '#378ADD', ORCHESTRATE: '#D4A843', WRITE: '#22c55e' };

// Market caps / prices: June 2026 snapshot. Moves daily.
const TICKERS = [
  { sym: 'TEM', name: 'Tempus AI', layer: 'READ', mcap: '$9.3B', price: '$52', note: 'Deep oncology data, integrated with hospitals.' },
  { sym: 'HIMS', name: 'Hims & Hers Health', layer: 'ORCHESTRATE', mcap: '$7.8B', price: '$33', note: 'D2C rails, longitudinal biomarkers, the incentive provider.' },
  { sym: 'IBRX', name: 'ImmunityBio', layer: 'WRITE', mcap: '$7.4B', price: '$7.10', note: 'Immune system reboot (IL-15 superagonist).' },
  { sym: 'CAI', name: 'Caris Life Sciences', layer: 'READ', mcap: '$4.9B', price: '$17', note: 'Molecular profiling, blood + tissue. IPO Jun 2025.' },
  { sym: 'PBLS', name: 'Parabilis Medicines', layer: 'WRITE', mcap: '$3.3B', price: '$27', note: 'Helicon peptides for flat / undruggable proteins. IPO Jun 2026.' },
  { sym: 'RXRX', name: 'Recursion Pharmaceuticals', layer: 'READ', mcap: '$1.4B', price: '$3.04', note: 'Wetlab simulation; physics→chemistry→biology, lower toxicity.' },
  { sym: 'NAUT', name: 'Nautilus Biotechnology', layer: 'READ', mcap: '$286M', price: '$2.17', note: '10B-protein mapping. Focus: Tau proteoforms / neuro.' },
  { sym: 'NGEN', name: 'NervGen Pharma', layer: 'WRITE', mcap: '$210M', price: '$2.10', note: 'Nervous-system regeneration (NVG-291). Nasdaq Jan 2026.' },
  { sym: 'INKT', name: 'MiNK Therapeutics', layer: 'WRITE', mcap: '$60M', price: '$11.87', note: 'Immune bypass — iNKT cells target stable lipids, not peptides.' },
];

// Income statements ($M). type:'chart' renders bars; type:'card' is pre-revenue / newly public.
const FIN = {
  HIMS: { type: 'chart', name: 'Hims & Hers Health', sub: 'HIMS · ≈ $33/sh · ORCHESTRATE', mcap: '$7.8B', years: [2022, 2023, 2024, 2025],
    revenue: [526.9, 872.0, 1476.5, 2347.6], gross: [408.7, 714.9, 1173.1, 1733.4], op: [-68.7, -29.5, 61.9, 105.6],
    note: 'FY2022–FY2025. The orchestrator: revenue compounded to $2.35B (+59% in 2025) and operating income turned positive in 2024–2025. Real gross margins (~74%) fund the D2C flywheel.' },
  TEM: { type: 'chart', name: 'Tempus AI', sub: 'TEM · ≈ $52/sh · READ', mcap: '$9.3B', years: [2022, 2023, 2024, 2025],
    revenue: [320.7, 531.8, 693.4, 1271.8], gross: [130.2, 286.2, 381.1, 797.9], op: [-265.4, -196.1, -691.1, -252.9],
    note: 'FY2022–FY2025. Revenue crossed $1.27B in 2025 (+83% YoY); gross profit scaled with it. The operating loss spiked in 2024 on heavy opex, then narrowed in 2025.' },
  CAI: { type: 'chart', name: 'Caris Life Sciences', sub: 'CAI · ≈ $17/sh · READ', mcap: '$4.9B', years: [2024, 2025],
    revenue: [412.3, 812.0], gross: [227, 528], op: [-378, -538],
    note: 'IPO Jun 2025, so only FY2024–FY2025 are public. Revenue nearly doubled to $812M (+97%). Gross profit is estimated (~55% / 65% margin); operating income is approximate and the 2025 figure is inflated by IPO-related stock comp.' },
  IBRX: { type: 'chart', name: 'ImmunityBio', sub: 'IBRX · ≈ $7.10/sh · WRITE', mcap: '$7.4B', years: [2022, 2023, 2024, 2025],
    revenue: [0.24, 0.62, 14.7, 113], gross: [0.24, 0.61, 14.6, 112], op: [-405, -361, -344, -250],
    note: 'FY2022–FY2025. Revenue is ANKTIVA product sales: ~$113M in 2025 (+700% YoY) after FDA approval in Apr 2024. Operating income for 2022 and 2025 is approximate (derived from R&D + SG&A).' },
  RXRX: { type: 'chart', name: 'Recursion Pharmaceuticals', sub: 'RXRX · ≈ $3.04/sh · READ', mcap: '$1.4B', years: [2022, 2023, 2024, 2025],
    revenue: [39.7, 43.9, 58.5, 74.3], gross: [-8.6, 1.3, 13.3, 3.3], op: [-245.7, -350.1, -479.0, -648.1],
    note: 'FY2022–FY2025. Revenue is mostly partnership / collaboration income. Gross profit is thin and volatile; the operating loss widened sharply as R&D scaled.' },
  NAUT: { type: 'chart', name: 'Nautilus Biotechnology', sub: 'NAUT · ≈ $2.17/sh · READ', mcap: '$286M', years: [2022, 2023, 2024, 2025],
    revenue: [0, 0, 0, 0], gross: [0, 0, 0, 0], op: [-63.6, -76.2, -81.5, -71.4],
    note: 'FY2022–FY2025. Pre-revenue (proteomics platform not yet commercial). The chart shows operating loss only; it peaked in 2024 and eased in 2025.' },
  INKT: { type: 'chart', name: 'MiNK Therapeutics', sub: 'INKT · ≈ $11.87/sh · WRITE', mcap: '$60M', years: [2021, 2022, 2023, 2024, 2025],
    revenue: [0, 0, 0, 0, 0], gross: [0, 0, 0, 0, 0], op: [-18.6, -30.9, -22.9, -10.7, -11.4],
    note: 'FY2021–FY2025. Clinical-stage, no product revenue. The operating loss shrank ~63% from its 2022 peak after aggressive cost cuts.' },
  PBLS: { type: 'card', name: 'Parabilis Medicines', sub: 'PBLS · ≈ $27/sh · WRITE', mcap: '$3.3B',
    stats: [['Stage', 'Clinical-stage · pre-revenue'], ['Net loss (TTM)', '≈ -$153M (12 mo to Mar 2026)'], ['IPO', 'Jun 2026 · raised ~$670M (record biotech IPO)'], ['Platform', 'Helicon peptides — the ~80% "undruggable" flat proteome']],
    note: 'Just IPO\u2019d (Jun 10, 2026), so no multi-year public income statement yet. Lead asset zolucatetide targets the Wnt/\u03b2-catenin node; Regeneron partnership worth up to ~$2.3B.' },
  NGEN: { type: 'card', name: 'NervGen Pharma', sub: 'NGEN · ≈ $2.10/sh · WRITE', mcap: '$210M',
    stats: [['Stage', 'Clinical-stage · pre-revenue'], ['EPS (TTM)', '≈ -$0.56'], ['Listing', 'Nasdaq Jan 2026 (also TSXV)'], ['Lead asset', 'NVG-291 — neuroreparative peptide for spinal cord injury']],
    note: 'Limited public financial history. The "GLP-1 of the nervous system" thesis: a 35-amino-acid peptide that removes the chemical brake on axon repair. Pre-revenue, so no income-statement chart yet.' },
};

const TABS = ['HIMS', 'TEM', 'CAI', 'IBRX', 'RXRX', 'NAUT', 'INKT', 'PBLS', 'NGEN'];

const STACK = [
  { lvl: 'Level 5', label: 'Clinical outcomes', desc: 'Human health, lifespan, systemic performance.', c: '#22c55e' },
  { lvl: 'Level 4', label: 'Proteins & proteoforms', desc: '3D Lego-like structures that execute function. Disfunction here is the root of all disease.', c: '#378ADD' },
  { lvl: 'Level 3', label: 'Peptides', desc: 'Short chains — the body\u2019s biological instruction set.', c: '#888780' },
  { lvl: 'Level 2', label: 'Amino acids & chemistry', desc: 'Raw dietary inputs and chemical compilers.', c: '#7F77DD' },
  { lvl: 'Level 1', label: 'Atoms', desc: 'The lowest level of abstraction — the physical hardware.', c: '#993556' },
];

const CHAIN = {
  READ: { tag: 'READ', sub: 'Data extraction', items: [
    ['Nautilus ($NAUT)', '10B-protein mapping; Tau proteoforms / neuro.'],
    ['Tempus & Caris ($TEM / $CAI)', 'Deep oncology data integrated with hospitals.'],
    ['Recursion ($RXRX)', 'Wetlab simulation lowering chemical toxicity.'],
  ] },
  ORCHESTRATE: { tag: 'ORCHESTRATE', sub: 'Distribution & inference', items: [
    ['Hims ($HIMS)', 'D2C infrastructure, longitudinal biomarker aggregation — the incentive provider that owns the consumer.'],
  ] },
  WRITE: { tag: 'WRITE', sub: 'Biological intervention', items: [
    ['ImmunityBio ($IBRX)', 'Immune-system reboot (IL-15 superagonist).'],
    ['MiNK ($INKT)', 'Immune bypass — iNKT cells / stable lipids.'],
    ['NervGen ($NGEN)', 'Nervous-system regeneration (NVG-291).'],
    ['Parabilis ($PBLS)', 'Solving flat-protein errors (Helicon peptides).'],
  ] },
};

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
  const [active, setActive] = useState('HIMS');
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
  const sectionLabel = { fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.5px', marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" };

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
        <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', letterSpacing: '1px', marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>● BIOLOGY IS CODE — THE BIOLOGICAL OPERATING SYSTEM</div>
        <h1 style={{ fontSize: mb ? 25 : 38, fontWeight: 800, color: 'var(--text-bright)', lineHeight: 1.1, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 12 }}>
          We are moving from reactive chemistry to a predictive Biological OS
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.6, maxWidth: 700 }}>
          Companies bridging the gap between molecular reality and AI computation are generating the largest asymmetric wealth-creation event of the decade. The thesis reduces to three verbs: <b style={{ color: 'var(--text-primary)' }}>Read the code, orchestrate the data, write the biology.</b>
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
          {['Read the Code', 'Orchestrate the Data', 'Write the Biology'].map((t, i) => (
            <span key={t} style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, padding: '5px 11px', borderRadius: 6,
              border: '1px solid ' + [LAYER_COLOR.READ, LAYER_COLOR.ORCHESTRATE, LAYER_COLOR.WRITE][i] + '55',
              color: [LAYER_COLOR.READ, LAYER_COLOR.ORCHESTRATE, LAYER_COLOR.WRITE][i] }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 14, fontFamily: "'JetBrains Mono',monospace" }}>Snapshot · {AS_OF} · 9 tickers</div>
      </div>

      {/* SCALING LAW */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: mb ? '14px' : '16px 20px', marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif", marginBottom: 6 }}>The new scaling law is <span style={{ color: '#22c55e' }}>Healthspan per Token</span></div>
        <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.6, margin: 0 }}>
          Old scaling laws governed software: more parameters → more intelligence. The next massive consumer reallocation of capital is biological. Consumers exhibit near-full price elasticity for platforms that demonstrably add years of healthy life — bending the curve from traditional aging (1 year lived = 1 year lost) toward <b style={{ color: 'var(--text-primary)' }}>longevity escape velocity</b>, where predictive ontologies return more than a year of healthspan per year lived.
        </p>
      </div>

      {/* PROTEOMIC STACK */}
      <div style={{ marginBottom: 24 }}>
        <div style={sectionLabel}>"SICKNESS IS SIMPLY A BUG IN THE PROTEOMIC NETWORK"</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {STACK.map((s) => (
            <div key={s.lvl} style={{ display: 'flex', alignItems: 'stretch', gap: 10, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ width: 5, background: s.c }} />
              <div style={{ padding: '9px 4px 9px 0', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10.5, fontFamily: "'JetBrains Mono',monospace", color: 'var(--text-muted)' }}>{s.lvl}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif" }}>{s.label}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.45, marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.5 }}>
          To fix a bug at Level 5, AI must compute the physics of Level 1 and write code via Level 3. Read the proteome, then write back with precision.
        </div>
      </div>

      {/* VALUE CHAIN */}
      <div style={{ marginBottom: 24 }}>
        <div style={sectionLabel}>MAPPING THE BIO-OS VALUE CHAIN</div>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr 1fr', gap: 8 }}>
          {['READ', 'ORCHESTRATE', 'WRITE'].map((key) => {
            const col = CHAIN[key];
            return (
              <div key={key} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: LAYER_COLOR[key], letterSpacing: '0.5px', fontFamily: "'JetBrains Mono',monospace" }}>{col.tag}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>{col.sub}</div>
                {col.items.map((it) => (
                  <div key={it[0]} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif" }}>{it[0]}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.45, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{it[1]}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.5 }}>
          Read and Write are brilliant tools, but they lack the end-consumer relationship. The platform that owns distribution and provides incentives (the D2C ontological flywheel) captures the majority of the economic value — an insurmountable "singularity scaler."
        </div>
      </div>

      {/* MARKET CAP TABLE */}
      <div style={{ marginBottom: 24 }}>
        <div style={sectionLabel}>MARKET CAP · {AS_OF}</div>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {TICKERS.map((t, i) => (
            <div key={t.sym} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: mb ? '10px 12px' : '11px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
              <div style={{ width: mb ? 52 : 60 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'JetBrains Mono',monospace" }}>{t.sym}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.price}</div>
              </div>
              <div style={{ width: mb ? 16 : 96 }}>
                <span style={{ fontSize: 9.5, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.5px',
                  color: LAYER_COLOR[t.layer] }}>{mb ? t.layer[0] : t.layer}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600 }}>{t.name}</div>
                {!mb && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.note}</div>}
              </div>
              <div style={{ fontSize: mb ? 15 : 18, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'JetBrains Mono',monospace" }}>{t.mcap}</div>
            </div>
          ))}
        </div>
      </div>

      {/* INCOME STATEMENTS */}
      <div style={{ marginBottom: 24 }}>
        <div style={sectionLabel}>INCOME STATEMENTS · annual · USD millions</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {TABS.map((sym) => {
            const on = sym === active;
            return (
              <button key={sym} onClick={() => setActive(sym)}
                style={{ padding: '6px 12px', fontSize: 13, fontWeight: on ? 700 : 400, fontFamily: "'JetBrains Mono',monospace",
                  border: '1px solid ' + (on ? 'var(--gold)' : 'var(--border)'), borderRadius: 6, cursor: 'pointer',
                  background: on ? 'var(--surface-2)' : 'transparent', color: on ? 'var(--text-bright)' : 'var(--text-secondary)' }}>
                {sym}
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

          {d.type === 'chart' ? (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                <Chip color={C_REV} label="Revenue" s={stats(d.revenue, d.years)} />
                <Chip color={C_GP} label="Gross profit" s={stats(d.gross, d.years)} />
                <Chip color={C_OP} label="Operating income" s={stats(d.op, d.years)} />
              </div>
              <IncomeChart d={d} mb={mb} />
            </>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 8, marginBottom: 4 }}>
              {d.stats.map((s) => (
                <div key={s[0]} style={{ background: 'var(--surface-2)', borderRadius: 6, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace", marginBottom: 3 }}>{s[0]}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, lineHeight: 1.4 }}>{s[1]}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{d.note}</div>
        </div>
      </div>

      {/* COMPUTE BOTTLENECK */}
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '14px 16px', marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-bright)', fontFamily: "'Space Grotesk',sans-serif", marginBottom: 5 }}>The compute required for biology dwarfs today\u2019s AI infrastructure</div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.6, margin: 0 }}>
          Every H100 GPU installed on Earth would provide only <b style={{ color: '#22c55e' }}>~0.02%</b> of the compute needed to build an exhaustive proteomic map of a single human for a single year. We are at the absolute infancy of biological computation — the singularity scalers that solve this bottleneck can eclipse the scale of today\u2019s tech giants.
        </p>
      </div>

      {/* METHODOLOGY */}
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '14px 16px', marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.5px', marginBottom: 8, fontFamily: "'JetBrains Mono',monospace" }}>METODOLOGÍA & NOTAS</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <li>Market caps and prices are a point-in-time snapshot ({AS_OF}) and move daily.</li>
          <li>Income-statement figures are annual GAAP from company filings and Yahoo Finance. NAUT and INKT are pre-revenue, so only operating income is plotted.</li>
          <li>CAI (IPO Jun 2025) shows only FY2024–FY2025; its gross profit is estimated from margin and its operating income is approximate (2025 distorted by IPO stock comp).</li>
          <li>IBRX operating income for 2022 and 2025 is approximate (derived from R&D + SG&A).</li>
          <li>PBLS (IPO Jun 2026) and NGEN (Nasdaq Jan 2026) are pre-revenue with limited public history — shown as info cards, not charts.</li>
          <li>This is data and research context, not investment advice.</li>
        </ul>
      </div>

      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--border)', fontFamily: "'JetBrains Mono',monospace" }}>
        <a href="https://10am.pro" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>10am.pro</a>
        <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>Hasta la muerte, toda derrota es psicológica.</span>
      </footer>
    </div>
  );
}
