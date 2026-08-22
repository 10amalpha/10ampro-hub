'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// ============================================================
// NOSANA // NETWORK TELEMETRY
// mercados.10am.pro/nosana
// Live tracker for Nosana's main data points + NOS market data.
// Green = network fundamentals (Nosana API). Blue = market (CoinGecko).
// Data flows through same-origin /api/nosana (server-side proxy, no CORS).
// Point-in-time KPIs are snapshotted to localStorage to build evolution.
// ============================================================

const GRN = '#22c55e';
const BLU = '#5b8cff';
const AMB = '#f59e0b';
const RED = '#ef4444';

// Seed fallbacks (Aug 22 2026 telemetry) if the live feed is unreachable.
// Review log: Aug 1 → hosts 965 · price $0.2537 · Jun hrs ~136k (62% of peak)
//             Aug 22 → hosts 826 · price $0.2823 · Jul hrs ~114k (~52% of peak) — network weaker, price firmer = divergence widening
const SEED = {
  completed: 4115790, jobHours: 4125332, hosts: 826, running: 826, queued: 34,
  price: 0.2823, mcap: 28233000, ath: 7.83, peakHours: 220000,
  hostsBaseline: 965, reviewed: '22 Ago 2026',
};


// ---- Technical analysis (manual read, refreshed on each review) ----
// Chart basis: NOS/USDT 1D (Gate) · 22 Ago 2026 · C 0.2819 · EMA20 0.2667 · EMA50 0.2687 · EMA100 0.2733 · EMA200 0.2946 · MACD histo +0.0041
const TA = {
  reviewed: '22 Ago 2026',
  bias: 'BEARISH',
  read: 'Rejected at the EMA200 (0.2946) today — wick to 0.312, close −4.6%. EMA200 falling for 10 months; lower highs 0.49 → 0.40 → 0.31 on shrinking volume = distribution. Higher lows since Feb (0.143 → 0.20 → 0.21) are the only bull argument and they are weak: the Aug rally reached the EMA200 on 166K volume. Off-chart: hosts −14% in 3 weeks, compute hours −50% vs peak. Triangle compressing while the network empties — that rarely resolves up.',
  // Chart structure (anchor points are [timestamp, price]) — drawn on the live series
  structure: {
    resistance: { a: [1780358400000, 0.3947], b: [1787356800000, 0.2959], label: 'Lower highs · Jun-1 → Jul-7 → Aug-21' },
    support: { a: [1770768000000, 0.1784], b: [1785369600000, 0.2431], label: 'Higher lows · Feb-11 → Apr-4 → Jul-28' },
    touches: [[1780358400000, 0.3947, 'H1'], [1783382400000, 0.3139, 'H2'], [1787356800000, 0.2959, 'H3'], [1770768000000, 0.1784, 'L1'], [1775347200000, 0.1996, 'L2'], [1785369600000, 0.2431, 'L3']],
    pattern: 'Symmetrical triangle (contracting)',
    height: 0.19,
    measured: { up: 0.50, down: 0.143 },
  },
  invalidation: { level: 0.3125, text: 'Daily close > 0.3125 (above today\'s wick and the EMA200) on >2× avg volume kills this path → next target 0.35–0.40.' },
  path: [
    { d: 30, h: '+1M', target: 0.25, how: 'EMA200 rejection → back to the 0.267 cluster → loses it as MACD crosses negative → 0.24–0.25.' },
    { d: 90, h: '+3M', target: 0.19, how: 'Breaks the triangle lower rail (0.22) → Apr base 0.20 gives → 0.18–0.19. Window: post-Solana Summit with no revenue news.' },
    { d: 365, h: '+1Y', target: 0.14, how: 'Retest of the 0.143 cycle low. No paid demand = likely undercut to 0.11–0.12.' },
  ],
  levels: {
    resistance: [[0.2946, 'EMA200 — the line that turns the trend'], [0.3125, 'INVALIDATION — Aug-22 wick'], [0.35, 'Jun range floor / May-Jun supply'], [0.40, 'Jun distribution top'], [0.49, 'Jun spike high']],
    support: [[0.267, 'EMA 20/50 cluster'], [0.22, 'Aug low · triangle lower rail'], [0.20, 'Apr base'], [0.143, 'Feb-26 cycle low'], [0.11, 'undercut zone']],
  },
};

// ---- TA scenario fan chart (SVG, log-y) ----
function TAFan({ price, ta, mb }) {
  const W = 680, H = mb ? 300 : 340, L = 50, R = 64, T = 18, B = 34;
  const px = price || 0.28;
  const xs = (days) => L + Math.sqrt(days / 365) * (W - L - R);
  const yMin = 0.08, yMax = 0.55;
  const ys = (v) => T + (1 - (Math.log(v) - Math.log(yMin)) / (Math.log(yMax) - Math.log(yMin))) * (H - T - B);
  const P = [{ d: 0, target: px }].concat(ta.path);
  // smooth path through targets
  const pts = P.map((p) => [xs(p.d), ys(p.target)]);
  let dPath = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], cx = (x0 + x1) / 2;
    dPath += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  // uncertainty cone: ±6% / ±12% / ±22%
  const tol = [0, 0.06, 0.12, 0.22];
  const up = P.map((p, i) => [xs(p.d), ys(p.target * (1 + tol[i]))]);
  const dn = P.map((p, i) => [xs(p.d), ys(p.target * (1 - tol[i]))]).reverse();
  const cone = 'M' + up.concat(dn).map((q) => q.join(',')).join(' L') + ' Z';
  const gridV = [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5];
  const lv = [...ta.levels.resistance, ...ta.levels.support].filter(([v]) => v >= yMin && v <= yMax && Math.abs(v - px) / px > 0.08 && v !== ta.invalidation.level);
  const inv = ta.invalidation.level;
  const pct = (v) => `${v / px - 1 >= 0 ? '+' : ''}${Math.round((v / px - 1) * 100)}%`;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', height: 'auto' }}>
      <defs>
        <linearGradient id="taCone" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={RED} stopOpacity="0.05" /><stop offset="100%" stopColor={RED} stopOpacity="0.22" />
        </linearGradient>
      </defs>
      {gridV.map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={ys(v)} y2={ys(v)} stroke="rgba(255,255,255,.05)" />
          <text x={L - 6} y={ys(v) + 3} textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">${v.toFixed(2)}</text>
        </g>
      ))}
      {P.map((p, i) => (
        <g key={i}>
          <line x1={xs(p.d)} x2={xs(p.d)} y1={T} y2={H - B} stroke="rgba(255,255,255,.07)" strokeDasharray="2 3" />
          <text x={xs(p.d)} y={H - B + 14} textAnchor={i === 0 ? 'start' : 'middle'} fontSize="10.5" fontWeight="700" fill="var(--text-secondary)" fontFamily="'JetBrains Mono',monospace">{i === 0 ? 'HOY' : p.h}</text>
        </g>
      ))}
      {/* invalidation zone */}
      <rect x={L} y={T} width={W - L - R} height={Math.max(0, ys(inv) - T)} fill={GRN} opacity="0.05" />
      <line x1={L} x2={W - R} y1={ys(inv)} y2={ys(inv)} stroke={GRN} strokeWidth="1.5" strokeDasharray="6 3" />
      <text x={L + 6} y={ys(inv) - 5} fontSize="9.5" fontWeight="700" fill={GRN} fontFamily="'JetBrains Mono',monospace">INVALIDATION › ${inv} · path flips to 0.35–0.40</text>
      {lv.map(([v]) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={ys(v)} y2={ys(v)} stroke="rgba(255,255,255,.18)" strokeWidth="1" strokeDasharray="1 3" />
          <text x={W - R + 4} y={ys(v) + 3} fontSize="9.5" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">{v.toFixed(3)}</text>
        </g>
      ))}
      <path d={cone} fill="url(#taCone)" />
      <path d={dPath} fill="none" stroke={RED} strokeWidth="2.4" />
      <line x1={L} x2={W - R} y1={ys(px)} y2={ys(px)} stroke="var(--text-primary)" strokeOpacity=".4" strokeWidth="1" />
      <circle cx={xs(0)} cy={ys(px)} r="4.5" fill="#fff" />
      <rect x={W - R + 2} y={ys(px) - 8} width={R - 4} height="16" rx="2" fill="#fff" />
      <text x={W - R + R / 2} y={ys(px) + 3.5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#000" fontFamily="'JetBrains Mono',monospace">${px.toFixed(3)}</text>
      {ta.path.map((p, i) => {
        const x = xs(p.d), y = ys(p.target);
        const last = i === ta.path.length - 1;
        return (
          <g key={p.h}>
            <circle cx={x} cy={y} r="5" fill="#0c0c0e" stroke={RED} strokeWidth="2" />
            <rect x={x - (last ? 64 : 32)} y={y + 10} width="64" height="28" rx="3" fill="rgba(239,68,68,.14)" stroke={RED} strokeOpacity=".5" />
            <text x={x - (last ? 32 : 0)} y={y + 22} textAnchor="middle" fontSize="11" fontWeight="800" fill={RED} fontFamily="'JetBrains Mono',monospace">${p.target.toFixed(2)}</text>
            <text x={x - (last ? 32 : 0)} y={y + 33} textAnchor="middle" fontSize="9" fill={RED} fontFamily="'JetBrains Mono',monospace">{pct(p.target)}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ---- live trend engine (computed client-side from CoinGecko daily closes) ----
const ema = (arr, n) => { const k = 2 / (n + 1); let e = arr[0]; const out = [e]; for (let i = 1; i < arr.length; i++) { e = arr[i] * k + e * (1 - k); out.push(e); } return out; };
function computeTrend(closes, vols) {
  if (!closes || closes.length < 60) return null;
  const c = closes, last = c[c.length - 1];
  const e20 = ema(c, 20), e50 = ema(c, 50), e100 = ema(c, 100), e200 = ema(c, 200);
  const m12 = ema(c, 12), m26 = ema(c, 26);
  const macd = m12.map((v, i) => v - m26[i]); const sig = ema(macd, 9);
  const hist = macd[macd.length - 1] - sig[sig.length - 1];
  const histPrev = macd[macd.length - 4] - sig[sig.length - 4];
  let g = 0, l = 0; for (let i = c.length - 14; i < c.length; i++) { const d = c[i] - c[i - 1]; if (d > 0) g += d; else l -= d; }
  const rsi = l === 0 ? 100 : 100 - 100 / (1 + (g / 14) / (l / 14));
  const at = (a) => a[a.length - 1];
  const slope200 = e200.length > 21 ? at(e200) / e200[e200.length - 21] - 1 : 0;
  const chg30 = c.length > 30 ? last / c[c.length - 31] - 1 : 0;
  const chg7 = c.length > 7 ? last / c[c.length - 8] - 1 : 0;
  const checks = [
    ['Price > EMA20', last > at(e20)], ['Price > EMA50', last > at(e50)], ['Price > EMA200', last > at(e200)],
    ['EMA50 > EMA200', at(e50) > at(e200)], ['EMA200 rising', slope200 > 0], ['MACD histo > 0', hist > 0], ['RSI > 50', rsi > 50],
  ];
  const score = checks.filter((x) => x[1]).length;
  let volRatio = null;
  if (vols && vols.length > 90) { const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length; volRatio = avg(vols.slice(-20)) / avg(vols.slice(-90)); }
  const regime = score <= 1 ? 'STRONG BEAR' : score <= 3 ? 'BEAR' : score === 4 ? 'NEUTRAL' : score <= 5 ? 'BULL' : 'STRONG BULL';
  return { last, e20: at(e20), e50: at(e50), e100: at(e100), e200: at(e200), hist, histUp: hist > histPrev, rsi, slope200, chg30, chg7, checks, score, regime, volRatio };
}

// ---- TA structure chart: price + EMAs + trendlines + levels + projection ----
function TAStructure({ series, ta, mb }) {
  if (!series || series.c.length < 60) return <div style={{ color: 'var(--text-muted)', fontSize: 11, padding: 20 }}>loading structure…</div>;
  const W = 680, H = mb ? 320 : 380, L = 46, R = 58, T = 16, B = 30;
  const DAY = 86400000;
  const keep = 320;
  const sl = (a) => a.slice(-keep);
  const t = sl(series.t), c = sl(series.c), v = sl(series.v);
  const t0 = t[0], tEnd = t[t.length - 1] + 120 * DAY;
  const xs = (ts) => L + ((ts - t0) / (tEnd - t0)) * (W - L - R);
  const all = c.concat([ta.structure.measured.up, 0.11]);
  const yMin = Math.min(...all) * 0.9, yMax = Math.max(...all) * 1.08;
  const ys = (p) => T + (1 - (Math.log(p) - Math.log(yMin)) / (Math.log(yMax) - Math.log(yMin))) * (H - T - B);
  const line = (arr) => 'M' + arr.map((p, i) => `${xs(t[i]).toFixed(1)},${ys(p).toFixed(1)}`).join(' L');
  const e20 = sl(ema(series.c, 20)), e50 = sl(ema(series.c, 50)), e200 = sl(ema(series.c, 200));
  // trendline helper: through a,b; extended to x2
  const tl = ({ a, b }, extendTo) => {
    const m = (b[1] - a[1]) / (b[0] - a[0]);
    const yAt = (ts) => a[1] + m * (ts - a[0]);
    return { m, yAt, x1: a[0], x2: extendTo, y1: a[1], y2: yAt(extendTo) };
  };
  const res = tl(ta.structure.resistance, tEnd), sup = tl(ta.structure.support, tEnd);
  // apex
  const apexT = ta.structure.resistance.a[0] + (sup.yAt(ta.structure.resistance.a[0]) - res.yAt(ta.structure.resistance.a[0])) / (res.m - sup.m);
  const apexY = res.yAt(apexT);
  const last = c[c.length - 1], lastT = t[t.length - 1];
  // volume bars
  const vmax = Math.max(...v);
  const vh = 34;
  // projection path from forecast
  const proj = [[lastT, last]].concat(ta.path.map((p) => [lastT + p.d * DAY, p.target])).filter((p) => p[0] <= tEnd);
  const projD = 'M' + proj.map((p) => `${xs(p[0]).toFixed(1)},${ys(p[1]).toFixed(1)}`).join(' L');
  const grid = [0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.7, 1.0].filter((g) => g > yMin && g < yMax);
  const mono = "'JetBrains Mono',monospace";
  const lab = (x, y, txt, col, anchor = 'start', size = 9.5) => <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight="700" fill={col} fontFamily={mono}>{txt}</text>;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', height: 'auto' }}>
      <defs><clipPath id="taClip"><rect x={L} y={T} width={W - L - R} height={H - T - B} /></clipPath></defs>
      {grid.map((g) => (
        <g key={g}>
          <line x1={L} x2={W - R} y1={ys(g)} y2={ys(g)} stroke="rgba(255,255,255,.05)" />
          <text x={L - 5} y={ys(g) + 3} textAnchor="end" fontSize="9.5" fill="var(--text-muted)" fontFamily={mono}>${g.toFixed(2)}</text>
        </g>
      ))}
      {/* month ticks */}
      {t.filter((ts, i) => i === 0 || new Date(ts).getUTCMonth() !== new Date(t[i - 1]).getUTCMonth()).map((ts) => (
        <text key={ts} x={xs(ts)} y={H - B + 13} fontSize="9" fill="var(--text-muted)" fontFamily={mono}>{['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'][new Date(ts).getUTCMonth()]}</text>
      ))}
      {/* future shade */}
      <rect x={xs(lastT)} y={T} width={W - R - xs(lastT)} height={H - T - B} fill="rgba(255,255,255,.02)" />
      {lab(xs(lastT) + 4, T + 10, 'PROJECTION →', 'var(--text-muted)')}
      {/* triangle fill */}
      <path d={`M${xs(res.x1)},${ys(res.y1)} L${xs(res.x1)},${ys(sup.yAt(res.x1))} L${xs(apexT)},${ys(apexY)} Z`} fill={AMB} opacity="0.07" clipPath="url(#taClip)" />
      {/* volume */}
      <g clipPath="url(#taClip)">
        {v.map((vol, i) => i % 1 === 0 && (
          <rect key={i} x={xs(t[i]) - 0.6} y={H - B - (vol / vmax) * vh} width="1.2" height={(vol / vmax) * vh} fill={i > 0 && c[i] >= c[i - 1] ? GRN : RED} opacity="0.35" />
        ))}
      </g>
      {/* EMAs */}
      <path d={line(e200)} fill="none" stroke="#3b5bdb" strokeWidth="1.4" clipPath="url(#taClip)" />
      <path d={line(e50)} fill="none" stroke={AMB} strokeWidth="1" opacity=".8" clipPath="url(#taClip)" />
      <path d={line(e20)} fill="none" stroke={RED} strokeWidth="1" opacity=".7" clipPath="url(#taClip)" />
      {/* price */}
      <path d={line(c)} fill="none" stroke="var(--text-primary)" strokeWidth="1.5" clipPath="url(#taClip)" />
      {/* trendlines */}
      <line x1={xs(res.x1)} y1={ys(res.y1)} x2={xs(Math.min(apexT + 30 * DAY, tEnd))} y2={ys(res.yAt(Math.min(apexT + 30 * DAY, tEnd)))} stroke={RED} strokeWidth="1.6" strokeDasharray="5 3" />
      <line x1={xs(sup.x1)} y1={ys(sup.y1)} x2={xs(Math.min(apexT + 30 * DAY, tEnd))} y2={ys(sup.yAt(Math.min(apexT + 30 * DAY, tEnd)))} stroke={GRN} strokeWidth="1.6" strokeDasharray="5 3" />
      {lab(xs(res.x1) - 4, ys(res.y1) - 14, ta.structure.resistance.label, RED, 'end')}
      {lab(xs(sup.x1) + 14, ys(sup.y1) + 4, ta.structure.support.label, GRN)}
      {/* touches */}
      {ta.structure.touches.map(([ts, p, k]) => (
        <g key={k}>
          <circle cx={xs(ts)} cy={ys(p)} r="3.5" fill="#0c0c0e" stroke={k[0] === 'H' ? RED : GRN} strokeWidth="1.5" />
          {lab(xs(ts), ys(p) + (k[0] === 'H' ? -8 : 15), k, k[0] === 'H' ? RED : GRN, 'middle', 8.5)}
        </g>
      ))}
      {/* apex */}
      <line x1={xs(apexT)} x2={xs(apexT)} y1={T} y2={H - B} stroke={AMB} strokeWidth="1" strokeDasharray="2 4" />
      {lab(xs(apexT) + 4, T + 24, `APEX ~${new Date(apexT).toLocaleDateString('es', { day: '2-digit', month: 'short' })}`, AMB)}
      {/* measured moves */}
      <line x1={xs(lastT)} x2={W - R} y1={ys(ta.structure.measured.up)} y2={ys(ta.structure.measured.up)} stroke={GRN} strokeWidth="1" strokeDasharray="3 3" opacity=".7" />
      {lab(W - R - 4, ys(ta.structure.measured.up) - 4, `MEASURED ↑ ${ta.structure.measured.up}`, GRN, 'end')}
      <line x1={xs(lastT)} x2={W - R} y1={ys(ta.structure.measured.down)} y2={ys(ta.structure.measured.down)} stroke={RED} strokeWidth="1" strokeDasharray="3 3" opacity=".7" />
      {lab(W - R - 4, ys(ta.structure.measured.down) - 4, `MEASURED ↓ ${ta.structure.measured.down}`, RED, 'end')}
      {/* invalidation */}
      <line x1={xs(lastT - 30 * DAY)} x2={W - R} y1={ys(ta.invalidation.level)} y2={ys(ta.invalidation.level)} stroke={GRN} strokeWidth="1.2" strokeDasharray="6 3" />
      {lab(W - R - 4, ys(ta.invalidation.level) - 4, `INVALIDATION ${ta.invalidation.level}`, GRN, 'end')}
      {/* projection */}
      <path d={projD} fill="none" stroke={RED} strokeWidth="2" strokeDasharray="1 0" opacity=".9" />
      {proj.slice(1).map((p, i) => (
        <g key={i}>
          <circle cx={xs(p[0])} cy={ys(p[1])} r="4" fill="#0c0c0e" stroke={RED} strokeWidth="2" />
          {lab(xs(p[0]) + 8, ys(p[1]) + (i === 0 ? -8 : 14), `${ta.path[i].h} $${p[1].toFixed(2)}`, RED)}
        </g>
      ))}
      {/* last price badge */}
      <circle cx={xs(lastT)} cy={ys(last)} r="3.5" fill="#fff" />
      <rect x={W - R + 2} y={ys(last) - 8} width={R - 4} height="16" rx="2" fill="#fff" />
      <text x={W - R + R / 2} y={ys(last) + 3.5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#000" fontFamily={mono}>${last.toFixed(3)}</text>
      {/* legend */}
      <g transform={`translate(${L + 6},${H - B - 6})`}>
        {[['#3b5bdb', 'EMA200'], [AMB, 'EMA50'], [RED, 'EMA20']].map(([col, n], i) => (
          <g key={n} transform={`translate(${i * 62},0)`}><line x1="0" x2="14" y1="-3" y2="-3" stroke={col} strokeWidth="2" /><text x="18" y="0" fontSize="9" fill="var(--text-muted)" fontFamily={mono}>{n}</text></g>
        ))}
      </g>
    </svg>
  );
}

const PERIODS = [
  { k: '2592000', label: '30D' },
  { k: '7776000', label: '90D' },
  { k: '31536000', label: '1Y' },
  { k: '0', label: 'ALL' },
];

// ---------- formatters ----------
const fmtInt = (n) => (n == null || isNaN(n) ? '—' : Math.round(n).toLocaleString('en-US'));
const fmtM = (n) => (n == null || isNaN(n) ? '—' : '$' + (n / 1e6).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'M');
const fmtPx = (n) => (n == null || isNaN(n) ? '—' : '$' + Number(n).toFixed(4));
const monthLabel = (ms) => new Date(ms).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
const dayLabel = (ms) => new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

// ---------- SVG area chart with hover ----------
function AreaChart({ points, color, fmtY, height = 260, monthly = false }) {
  const wrapRef = useRef(null);
  const [w, setW] = useState(680);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((es) => setW(Math.max(280, es[0].contentRect.width)));
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const pad = { l: 52, r: 12, t: 14, b: 26 };
  const iw = w - pad.l - pad.r;
  const ih = height - pad.t - pad.b;

  const data = points || [];
  const ready = data.length > 1;
  const ys = data.map((p) => p.y);
  const yMin = ready ? Math.min(...ys) : 0;
  const yMax = ready ? Math.max(...ys) : 1;
  const span = yMax - yMin || 1;
  const lo = yMin - span * 0.08;
  const hi = yMax + span * 0.08;

  const X = (i) => pad.l + (data.length <= 1 ? 0 : (i / (data.length - 1)) * iw);
  const Y = (v) => pad.t + ih - ((v - lo) / (hi - lo || 1)) * ih;

  const line = ready ? data.map((p, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(p.y).toFixed(1)}`).join(' ') : '';
  const area = ready ? `${line} L${X(data.length - 1).toFixed(1)},${(pad.t + ih).toFixed(1)} L${X(0).toFixed(1)},${(pad.t + ih).toFixed(1)} Z` : '';

  const yticks = 4;
  const gridY = Array.from({ length: yticks + 1 }, (_, i) => lo + ((hi - lo) * i) / yticks);
  const gid = useMemo(() => 'g' + Math.random().toString(36).slice(2, 8), []);

  const onMove = (e) => {
    if (!ready) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * w;
    let idx = Math.round(((px - pad.l) / (iw || 1)) * (data.length - 1));
    idx = Math.max(0, Math.min(data.length - 1, idx));
    setHover(idx);
  };

  return (
    <div ref={wrapRef} style={{ width: '100%', position: 'relative' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none"
        onMouseMove={onMove} onMouseLeave={() => setHover(null)} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {gridY.map((v, i) => (
          <g key={i}>
            <line x1={pad.l} x2={w - pad.r} y1={Y(v)} y2={Y(v)} stroke="rgba(255,255,255,.05)" strokeWidth="1" />
            <text x={pad.l - 8} y={Y(v) + 3} textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">
              {fmtY ? fmtY(v) : Math.round(v)}
            </text>
          </g>
        ))}
        {ready && <path d={area} fill={`url(#${gid})`} />}
        {ready && <path d={line} fill="none" stroke={color} strokeWidth="2" />}
        {/* x labels: first, middle, last */}
        {ready && [0, Math.floor((data.length - 1) / 2), data.length - 1].map((i, k) => (
          <text key={k} x={X(i)} y={height - 8} textAnchor={k === 0 ? 'start' : k === 2 ? 'end' : 'middle'}
            fontSize="10" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">
            {monthly ? monthLabel(data[i].t) : dayLabel(data[i].t)}
          </text>
        ))}
        {hover != null && ready && (
          <g>
            <line x1={X(hover)} x2={X(hover)} y1={pad.t} y2={pad.t + ih} stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx={X(hover)} cy={Y(data[hover].y)} r="3.5" fill={color} />
          </g>
        )}
        {!ready && (
          <text x={w / 2} y={height / 2} textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">
            loading series…
          </text>
        )}
      </svg>
      {hover != null && ready && (
        <div style={{
          position: 'absolute', top: 6,
          left: Math.min(Math.max(8, (X(hover) / w) * 100 + '%' ? (X(hover) / w) * (wrapRef.current?.clientWidth || w) - 60 : 8), (wrapRef.current?.clientWidth || w) - 130),
          background: 'var(--bg)', border: `1px solid ${color}`, borderRadius: 4, padding: '5px 8px',
          fontSize: 11, pointerEvents: 'none', whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono',monospace",
        }}>
          <div style={{ color: 'var(--text-muted)' }}>{monthly ? monthLabel(data[hover].t) : dayLabel(data[hover].t)}</div>
          <div style={{ color, fontWeight: 700 }}>{fmtY ? fmtY(data[hover].y) : fmtInt(data[hover].y)}</div>
        </div>
      )}
    </div>
  );
}

// ---------- small pieces ----------
function Delta({ cur, prev, pct = true }) {
  if (prev == null || cur == null || isNaN(prev) || isNaN(cur))
    return <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>— no prior</span>;
  const d = cur - prev;
  if (Math.abs(d) < 1e-9) return <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>± 0</span>;
  const up = d > 0;
  const clr = up ? GRN : RED;
  const val = pct ? (prev !== 0 ? ((d / prev) * 100).toFixed(2) + '%' : 'n/a') : fmtInt(Math.abs(d));
  return <span style={pill(clr, up ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)')}>{up ? '▲' : '▼'} {val}</span>;
}
const pill = (color, bg) => ({ color, background: bg, fontSize: 11, fontWeight: 600, padding: '1px 5px', borderRadius: 3, letterSpacing: '.02em' });

function Eyebrow({ children, dot = GRN }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, margin: '26px 2px 12px', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot }} />
      {children}
    </div>
  );
}
const panel = { border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: 16 };

// ============================================================
export default function NosanaTelemetry() {
  const [d, setD] = useState(null);          // summary
  const [prev, setPrev] = useState(null);     // previous snapshot
  const [net, setNet] = useState([]);         // network series points
  const [pxHist, setPxHist] = useState({ price: [], mcap: [] });
  const [trend, setTrend] = useState(null);
  const [series, setSeries] = useState(null);
  const [chain, setChain] = useState(null);
  useEffect(() => { (async () => { try { const r = await fetch('/api/nosana/onchain', { cache: 'no-store' }); setChain(await r.json()); } catch {} })(); }, []);
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/nosana?history=365', { cache: 'no-store' });
        const j = await r.json();
        const raw = (j.prices || []).filter((q) => q[1] > 0);
        const pts = raw.map((q) => q[1]);
        const vols = (j.volumes || []).map((q) => q[1]);
        setSeries({ t: raw.map((q) => q[0]), c: pts, v: vols });
        setTrend(computeTrend(pts, vols));
      } catch {}
    })();
  }, []);
  const [metric, setMetric] = useState('hours');
  const [period, setPeriod] = useState('31536000');
  const [days, setDays] = useState('365');
  const [snaps, setSnaps] = useState([]);
  const [updated, setUpdated] = useState('—');
  const [clock, setClock] = useState('—');
  const [status, setStatus] = useState('booting');
  const [mb, setMb] = useState(false);

  useEffect(() => {
    const f = () => setMb(window.innerWidth < 760);
    f(); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setClock(new Date().toLocaleTimeString('en-GB', { hour12: false })), 1000);
    return () => clearInterval(t);
  }, []);

  const loadSnaps = () => { try { return JSON.parse(localStorage.getItem('nosana:snapshots') || '[]'); } catch { return []; } };
  const saveSnaps = (a) => { try { localStorage.setItem('nosana:snapshots', JSON.stringify(a.slice(-400))); } catch {} };

  // ---- summary + snapshot ----
  const refresh = useCallback(async (manual) => {
    setStatus('fetching…');
    const prevSnaps = loadSnaps();
    setPrev(prevSnaps.length ? prevSnaps[prevSnaps.length - 1] : null);
    let s = {};
    try {
      const r = await fetch('/api/nosana', { cache: 'no-store' });
      s = await r.json();
    } catch { s = { ok: false }; }

    const merged = {
      completed: s.completed ?? SEED.completed,
      jobHours: s.jobHours ?? SEED.jobHours,
      running: s.running ?? SEED.running,
      queued: s.queued ?? SEED.queued,
      hosts: s.hosts ?? SEED.hosts,
      price: s.price ?? SEED.price,
      mcap: s.mcap ?? SEED.mcap,
      chg: s.chg ?? null,
    };
    setD(merged);
    const live = s.ok && (s.completed != null || s.price != null);
    setStatus(live ? 'ok · live feed' : 'ok · seeded (live feed unreachable)');
    setUpdated(new Date().toLocaleTimeString('en-GB', { hour12: false }));

    // snapshot throttle: 1 per 6h (manual allows >5min)
    const snap = { t: new Date().toISOString(), price: merged.price, mcap: merged.mcap, completed: merged.completed, jobHours: merged.jobHours, hosts: merged.hosts, running: merged.running, queued: merged.queued };
    const arr = prevSnaps.slice();
    const last = arr[arr.length - 1];
    const gapH = last ? (Date.now() - new Date(last.t)) / 3600000 : 999;
    if (!last || gapH >= 6 || (manual && gapH > 0.08)) { arr.push(snap); saveSnaps(arr); }
    setSnaps(arr);
  }, []);

  // ---- network series ----
  const loadNet = useCallback(async () => {
    setNet([]);
    try {
      const r = await fetch(`/api/nosana?series=${metric}&period=${period}`, { cache: 'no-store' });
      const j = await r.json();
      let data = Array.isArray(j.data) ? j.data.slice() : [];
      // API returns newest-first — sort ascending so the chart reads old → new
      data.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());
      if (data.length > 2) data = data.slice(1, -1); // drop oldest sliver + newest partial bucket (matches explorer)
      setNet(data.map((p) => ({ t: new Date(p.x).getTime(), y: Math.round(p.y) })));
    } catch { setNet([]); }
  }, [metric, period]);

  // ---- price history ----
  const loadHist = useCallback(async () => {
    try {
      const r = await fetch(`/api/nosana?history=${days}`, { cache: 'no-store' });
      const j = await r.json();
      const step = Math.max(1, Math.floor((j.prices || []).length / 180));
      const price = [], mcap = [];
      for (let i = 0; i < (j.prices || []).length; i += step) {
        price.push({ t: j.prices[i][0], y: +j.prices[i][1].toFixed(4) });
        if (j.market_caps && j.market_caps[i]) mcap.push({ t: j.market_caps[i][0], y: Math.round(j.market_caps[i][1]) });
      }
      setPxHist({ price, mcap });
    } catch { setPxHist({ price: [], mcap: [] }); }
  }, [days]);

  useEffect(() => { refresh(false); }, [refresh]);
  useEffect(() => { loadNet(); }, [loadNet]);
  useEffect(() => { loadHist(); }, [loadHist]);

  // ---- derived thesis metrics ----
  const monthlyNet = period === '0' || Number(period) > 10512000;
  const netHours = useMemo(() => {
    if (metric !== 'hours' || !net.length) return null;
    const ys = net.map((p) => p.y);
    const peak = Math.max(...ys, SEED.peakHours);
    const latest = ys[ys.length - 1];
    return { latest, peak, rec: peak ? Math.round((latest / peak) * 100) : 0 };
  }, [net, metric]);

  const drawdown = useMemo(() => {
    const p = pxHist.price;
    if (!p.length) return null;
    return Math.round((p[p.length - 1].y / SEED.ath - 1) * 100);
  }, [pxHist]);

  // recovery for tripwires (independent of chart metric) — reuse netHours if on hours+ALL-ish, else estimate from seed
  const recPct = netHours ? netHours.rec : null;

  const netColor = netHours ? (netHours.rec >= 90 ? GRN : netHours.rec >= 60 ? AMB : RED) : 'var(--text-primary)';
  const divergence = (() => {
    if (recPct != null && recPct < 70 && drawdown != null)
      return { txt: `Network at ${recPct}% of peak while price ${drawdown}% below ATH — both soft; no confirmation yet.`, c: AMB };
    if (recPct != null && recPct >= 90)
      return { txt: `Network re-accelerating (${recPct}% of peak) — watch for market to follow.`, c: GRN };
    return { txt: `Network ${recPct != null ? recPct + '% of peak' : '—'} · price ${drawdown != null ? drawdown + '% below ATH' : '—'}.`, c: 'var(--text-secondary)' };
  })();

  const seg = (on) => ({
    fontFamily: "'JetBrains Mono',monospace", fontSize: 11, padding: '5px 10px', cursor: 'pointer',
    border: 0, background: on ? 'rgba(34,197,94,.13)' : 'transparent', color: on ? GRN : 'var(--text-muted)', letterSpacing: '.03em',
  });
  const segBlue = (on) => ({ ...seg(on), background: on ? 'rgba(91,140,255,.14)' : 'transparent', color: on ? BLU : 'var(--text-muted)' });
  const segWrap = { display: 'flex', border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' };

  const kpi = (label, value, sub, valColor) => (
    <div style={{ ...panel, padding: '13px 13px 12px', minHeight: 104, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
      <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: '-.01em', lineHeight: 1.05, marginTop: 8, color: valColor || 'var(--text-bright)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 5, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>{sub}</div>
    </div>
  );

  const trips = useMemo(() => {
    const T = [];
    if (recPct != null) {
      T.push(recPct >= 90
        ? ['pass', '✓', 'Compute hours recovering toward peak', `Latest ≈ ${recPct}% of the Oct-25 peak. Sustained recovery = demand not purely incentive-driven.`]
        : ['fail', '!', 'Compute hours below peak', `Latest ≈ ${recPct}% of Oct-25 peak (~220k/mo). The #1 warning sign until it re-trends up.`]);
    } else {
      T.push(['watch', '◦', 'Compute hours vs peak', 'Switch the chart to COMPUTE HRS · ALL to read recovery vs the ~220k Oct-25 peak.']);
    }
    const hosts = d?.hosts;
    const hb = SEED.hostsBaseline;
    T.push(hosts && hosts > hb
      ? ['pass', '✓', 'Host count above baseline', `${fmtInt(hosts)} online GPU hosts (>${hb} Aug-1 baseline). Growth toward ~2,000 = supply-side conviction.`]
      : hosts && hosts < hb * 0.9
        ? ['fail', '!', 'Host count bleeding', `${fmtInt(hosts)} online hosts — ${Math.round((hosts / hb - 1) * 100)}% vs the ${hb} Aug-1 baseline. Supply leaving after the APR cut; watch for a floor.`]
        : ['watch', '◦', 'Host count', `${fmtInt(hosts)} online hosts. Track durable growth above the ~${hb} Aug-1 baseline.`]);
    T.push(['watch', '◦', 'Paid revenue disclosure', 'No published USDC/USD paid-compute revenue yet. THE decisive signal — watch for a paid-vs-incentivized split.']);
    if (chain?.staking) {
      const st = chain.staking; const left = st.unstaking.nosRemaining / st.unstaking.nosTotal;
      T.push(left < 0.2
        ? ['pass', '✓', 'Staked NOS — bleed exhausted', `${(st.active.nos / 1e6).toFixed(1)}M active (from ~29.7M pre-NNP-0001). Unstake queue ${(left * 100).toFixed(0)}% left → floor forming. Flip to fail if active stake drops below ${(st.active.nos * 0.9 / 1e6).toFixed(1)}M.`]
        : ['fail', '!', 'Staked NOS still bleeding', `${(st.active.nos / 1e6).toFixed(1)}M active; ${(st.unstaking.nosRemaining / 1e6).toFixed(1)}M still in cooldown.`]);
    } else {
      T.push(['watch', '◦', 'Staked NOS stabilizing', 'Staking fell ~29.7M → ~14M NOS; APR cut ~20%→~4% (NNP-0001). Watch for it to stop bleeding.']);
    }
    T.push(['watch', '◦', 'Roadmap ships (SSH · confidential compute · Sombrero billing)', 'Q3/Q4 2026 promises + Sombrero fiat ramps/billing (H2-26) + AMD/Intel/Apple hardware. Confirm they ship, not slip — the $SHDW failure mode is perpetual "upcoming".']);
    T.push(['watch', '◦', 'Newsflow silence', 'No protocol updates or disclosures in the last 30d (Messari, mid-Aug). Next public touchpoint: Solana Summit Belgrade, 26 Ago. Silence + falling throughput = the pattern not to rationalize.']);
    return T;
  }, [recPct, d, chain]);

  const tripStyle = { pass: [GRN, 'rgba(34,197,94,.12)'], fail: [RED, 'rgba(239,68,68,.12)'], watch: [AMB, 'rgba(245,158,11,.13)'] };

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: mb ? '16px 12px 50px' : '22px 20px 60px', fontFamily: "'JetBrains Mono',ui-monospace,monospace", minHeight: '100vh' }}>

      {/* BACK TO 10AM.PRO */}
      <a href="https://10am.pro?utm_source=nosana&utm_medium=header&utm_campaign=hub" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 12 }}>
        <img src="/logo.jpg" alt="10AMPRO" style={{ width: 34, height: 34, borderRadius: 6 }} />
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>← 10am.pro</span>
      </a>

      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', border: '1px solid var(--border)', background: 'var(--surface)', padding: '12px 16px', borderRadius: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, letterSpacing: '.02em' }}>
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><path d="M6 24V8l10 12V8m4 0v16" stroke={GRN} strokeWidth="3.2" strokeLinecap="square" /></svg>
          NOSANA
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: GRN, boxShadow: `0 0 8px ${GRN}` }} />
          <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase' }}>Network Telemetry</span>
        </div>
        <div style={{ flex: 1 }} />
        {!mb && <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>SYS.TIME <b style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{clock}</b> · UPD <b style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{updated}</b></div>}
        <button onClick={() => refresh(true)} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text-primary)', background: 'transparent', border: '1px solid var(--border)', borderRadius: 3, padding: '6px 11px', cursor: 'pointer' }}>↻ REFRESH</button>
      </div>
      <div style={{ margin: '10px 2px 0', color: 'var(--text-muted)', fontSize: 12 }}>
        &gt; executing telemetry.sh … <span style={{ color: status.includes('seeded') ? AMB : GRN }}>{status}</span>
      </div>

      {/* THESIS STRIP */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
        {[
          ['Network signal · fundamentals', netHours ? `${netHours.rec}% of peak` : '—', netHours ? `Latest ${fmtInt(netHours.latest)} vs Oct-25 peak ${fmtInt(netHours.peak)} compute hrs` : 'GPU compute hours, latest vs Oct-25 peak', GRN, netColor],
          ['Market signal · price', drawdown != null ? `${drawdown}%` : '—', pxHist.price.length ? `NOS ${fmtPx(pxHist.price[pxHist.price.length - 1].y)} vs ATH $${SEED.ath}` : 'NOS vs all-time high', BLU, RED],
          ['Divergence watch', null, null, AMB, null],
        ].map((c, i) => (
          <div key={i} style={{ flex: 1, minWidth: 210, border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: '12px 14px', position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: c[3] }} />
            <div style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{c[0]}</div>
            {i < 2 ? (
              <>
                <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6, color: c[4] }}>{c[1]}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{c[2]}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 6, lineHeight: 1.35, color: divergence.c }}>{divergence.txt}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>Thesis confirms when network re-accelerates & market follows</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* KPIs */}
      <Eyebrow>Core data points</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(2,1fr)' : 'repeat(6,1fr)', gap: 10 }}>
        {kpi('NOS Price', fmtPx(d?.price), <>
          {d?.chg != null && <span style={pill(d.chg >= 0 ? GRN : RED, d.chg >= 0 ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)')}>{d.chg >= 0 ? '▲' : '▼'} {Math.abs(d.chg).toFixed(2)}% 24h</span>}
          {prev && <Delta cur={d?.price} prev={prev.price} />}
        </>, BLU)}
        {kpi('Market Cap', fmtM(d?.mcap), prev ? <Delta cur={d?.mcap} prev={prev.mcap} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>)}
        {kpi('Completed Jobs', fmtInt(d?.completed), prev ? <Delta cur={d?.completed} prev={prev.completed} pct={false} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>, GRN)}
        {kpi('Total Job Hours', fmtInt(d?.jobHours), prev ? <Delta cur={d?.jobHours} prev={prev.jobHours} pct={false} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>, GRN)}
        {kpi('Online GPU Hosts', fmtInt(d?.hosts), prev ? <Delta cur={d?.hosts} prev={prev.hosts} pct={false} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>, GRN)}
        {kpi('Running / Queued', fmtInt(d?.running), <span style={{ color: 'var(--text-muted)' }}>{fmtInt(d?.queued)} queued</span>)}
      </div>

      {/* NETWORK EVOLUTION */}
      <Eyebrow>Network evolution — is real usage growing?</Eyebrow>
      <div style={panel}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{metric === 'hours' ? 'GPU Compute Hours' : 'Completed Jobs'}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{metric === 'hours' ? 'Monthly throughput — leading indicator of paid demand vs incentives' : 'Jobs processed per bucket'}</div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginLeft: 'auto', flexWrap: 'wrap' }}>
            <div style={segWrap}>
              <button style={seg(metric === 'hours')} onClick={() => setMetric('hours')}>COMPUTE HRS</button>
              <button style={seg(metric === 'count')} onClick={() => setMetric('count')}>JOBS</button>
            </div>
            <div style={segWrap}>
              {PERIODS.map((p) => <button key={p.k} style={seg(period === p.k)} onClick={() => setPeriod(p.k)}>{p.label}</button>)}
            </div>
          </div>
        </div>
        <AreaChart points={net} color={GRN} monthly={monthlyNet} fmtY={(v) => (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : Math.round(v))} height={mb ? 220 : 300} />
        {netHours && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
            Latest bucket ≈ <b style={{ color: GRN }}>{fmtInt(netHours.latest)}</b> compute hrs · peak ≈ {fmtInt(netHours.peak)} · <b>{netHours.rec}%</b> of peak.
          </div>
        )}
      </div>

      {/* MARKET */}
      <Eyebrow dot={BLU}>Market context — price & market cap (CoinGecko)</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 14 }}>
        <div style={panel}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
            <div><div style={{ fontSize: 13, fontWeight: 700, color: BLU }}>NOS Price</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>USD</div></div>
            <div style={{ ...segWrap, marginLeft: 'auto' }}>
              {['90', '365', 'max'].map((k) => <button key={k} style={segBlue(days === k)} onClick={() => setDays(k)}>{k === 'max' ? 'MAX' : k === '90' ? '90D' : '1Y'}</button>)}
            </div>
          </div>
          <AreaChart points={pxHist.price} color={BLU} monthly={days !== '90'} fmtY={(v) => '$' + v.toFixed(2)} height={mb ? 200 : 240} />
        </div>
        <div style={panel}>
          <div style={{ marginBottom: 6 }}><div style={{ fontSize: 13, fontWeight: 700, color: BLU }}>Market Cap</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>USD · fully circulating (~100M NOS)</div></div>
          <AreaChart points={pxHist.mcap} color={BLU} monthly={days !== '90'} fmtY={(v) => '$' + (v / 1e6).toFixed(0) + 'M'} height={mb ? 200 : 240} />
        </div>
      </div>

      {/* SNAPSHOT LOG */}
      {/* ON-CHAIN SUPPLY OVERHANG */}
      <Eyebrow dot={AMB}>Supply overhang — who has to sell · on-chain (Solana) · live</Eyebrow>
      <div style={{ border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: 16 }}>
        {!chain ? <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>scanning staking program + top holders…</div> : (() => {
          const st = chain.staking, ho = chain.holders, S = chain.supply || 100e6;
          const M = (n) => (n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(0) + 'k' : String(n));
          const pc = (n) => (n / S * 100).toFixed(1) + '%';
          const dailyNos = d?.price && trend?.volRatio != null && series?.v?.length ? (series.v.slice(-20).reduce((a, b) => a + b, 0) / 20) / d.price : null;
          const segs = st && ho ? [
            ['Treasury-shaped ≥5%', ho.treasuryLikeNos, '#8b5cf6'],
            ['Staked (active)', st.active.nos, GRN],
            ['Unstake cooldown', st.unstaking.nosRemaining, AMB],
            ['On exchanges', ho.exchangeNos, RED],
            ['DEX pools', ho.dexNos, BLU],
            ['Vesting-like', ho.programNos, '#a78bfa'],
          ] : [];
          const known = segs.reduce((a, b) => a + b[1], 0);
          const seriesRow = (label, val, sub, col) => (
            <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginTop: 3, color: col || 'var(--text-primary)' }}>{val}</div>
              {sub && <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>}
            </div>
          );
          return (
            <>
              {/* supply map */}
              {segs.length > 0 && (
                <>
                  <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Supply map · 100M NOS · where the tokens sit</div>
                  <div style={{ display: 'flex', height: 22, borderRadius: 3, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    {segs.map(([l, v, c]) => <div key={l} title={`${l}: ${M(v)} (${pc(v)})`} style={{ width: `${v / S * 100}%`, background: c, opacity: .85 }} />)}
                    <div style={{ flex: 1, background: 'rgba(255,255,255,.05)' }} title={`Float / unlabeled: ${M(S - known)}`} />
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6, fontSize: 10.5, color: 'var(--text-muted)' }}>
                    {segs.map(([l, v, c]) => <span key={l}><span style={{ color: c }}>■</span> {l} <b style={{ color: 'var(--text-primary)' }}>{pc(v)}</b></span>)}
                    <span><span style={{ color: 'rgba(255,255,255,.25)' }}>■</span> Float/unlabeled <b style={{ color: 'var(--text-primary)' }}>{pc(S - known)}</b></span>
                  </div>
                </>
              )}
              {st && (
                <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(2,1fr)' : 'repeat(6,1fr)', gap: 8, marginTop: 14 }}>
                  {seriesRow('Staked · active', M(st.active.nos), `${st.active.count.toLocaleString()} stakes · avg lock ${st.avgDurationDays}d`, GRN)}
                  {seriesRow('Unstake queue left', M(st.unstaking.nosRemaining), `of ${M(st.unstaking.nosTotal)} unstaked · ${M(st.unstaking.nosReleased)} already out`, AMB)}
                  {seriesRow('Drip next 30d', M(st.unstaking.release[1].nos), dailyNos ? `≈ ${(st.unstaking.release[1].nos / 30 / dailyNos * 100).toFixed(1)}% of daily volume` : 'linear vesting', AMB)}
                  {seriesRow('Locked 181–365d', M(st.durationMix[3].nos), `${(st.durationMix[3].nos / st.active.nos * 100).toFixed(0)}% of stake · conviction`, GRN)}
                  {seriesRow('Flight-ready ≤14d', M(st.durationMix[0].nos), `${st.durationMix[0].count.toLocaleString()} stakes · can exit fast`, RED)}
                  {seriesRow('Whale stakes ≥100k', `${st.whales.count} · ${M(st.whales.nos)}`, `${(st.whales.nos / st.active.nos * 100).toFixed(0)}% of active stake`, 'var(--text-primary)')}
                </div>
              )}
              {st && (
                <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 10, marginTop: 12 }}>
                  <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
                    <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, marginBottom: 8 }}>Unstake release schedule · forced supply</div>
                    {st.unstaking.release.map((r, i) => {
                      const prev = i ? st.unstaking.release[i - 1].nos : 0; const inc = r.nos - prev; const max = st.unstaking.release[3].nos || 1;
                      return (
                        <div key={r.days} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, marginBottom: 5 }}>
                          <span style={{ width: 52, color: 'var(--text-muted)' }}>+{r.days}d</span>
                          <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,.05)', borderRadius: 2 }}><div style={{ width: `${r.nos / max * 100}%`, height: '100%', background: AMB, borderRadius: 2 }} /></div>
                          <span style={{ width: 120, textAlign: 'right', fontWeight: 700 }}>{M(r.nos)} <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>(+{M(inc)})</span></span>
                        </div>
                      );
                    })}
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 6, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Cumulative NOS becoming withdrawable from cooldown. Each unstake vests linearly over its original lock.</div>
                  </div>
                  <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
                    <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: GRN, marginBottom: 8 }}>Active stake by lock duration</div>
                    {st.durationMix.map((b) => (
                      <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, marginBottom: 5 }}>
                        <span style={{ width: 66, color: 'var(--text-muted)' }}>{b.label}</span>
                        <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,.05)', borderRadius: 2 }}><div style={{ width: `${b.nos / st.active.nos * 100}%`, height: '100%', background: b.label === '≤14d' ? RED : GRN, borderRadius: 2 }} /></div>
                        <span style={{ width: 120, textAlign: 'right', fontWeight: 700 }}>{M(b.nos)} <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>· {b.count.toLocaleString()}</span></span>
                      </div>
                    ))}
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 6, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Long locks = holders who accepted the APR cut and stayed. ≤14d = yield tourists one click from the exit.</div>
                  </div>
                </div>
              )}
              {ho && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', gap: 14, fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6, flexWrap: 'wrap' }}>
                    <span>Top 20 token accounts</span><span>top10 = <b style={{ color: 'var(--text-primary)' }}>{ho.top10pct}%</b></span><span>top20 = <b style={{ color: 'var(--text-primary)' }}>{ho.top20pct}%</b></span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: '2px 14px', fontSize: 11 }}>
                    {ho.top.map((h, i) => {
                      const col = { exchange: RED, treasury_like: '#8b5cf6', dex: BLU, program: '#a78bfa', staking_vault: GRN, unlabeled: 'var(--text-muted)' }[h.kind];
                      return (
                        <div key={h.tokenAccount} style={{ display: 'flex', gap: 8, alignItems: 'baseline', padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                          <span style={{ width: 18, color: 'var(--text-muted)' }}>{i + 1}</span>
                          <a href={`https://solscan.io/account/${h.owner || h.tokenAccount}`} target="_blank" rel="noopener" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: "'JetBrains Mono',monospace" }}>{(h.owner || h.tokenAccount).slice(0, 4)}…{(h.owner || h.tokenAccount).slice(-4)}</a>
                          <span style={{ color: col, fontSize: 10.5, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.label || '—'}</span>
                          <span style={{ fontWeight: 700 }}>{M(h.nos)}</span>
                          <span style={{ width: 44, textAlign: 'right', color: 'var(--text-muted)' }}>{h.pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {st && ho && (
                <div style={{ marginTop: 12, padding: '10px 12px', border: `1px solid ${AMB}`, borderRadius: 4, background: 'rgba(245,158,11,.05)', fontSize: 11.5, lineHeight: 1.55, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
                  <b style={{ color: AMB, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.08em' }}>READ ·</b> <b>The unstake bleed is {st.unstaking.nosRemaining / st.unstaking.nosTotal < 0.2 ? 'mostly spent' : 'still running'}.</b> {M(st.unstaking.nosReleased)} of the {M(st.unstaking.nosTotal)} that left staking is already withdrawable; only {M(st.unstaking.nosRemaining)} is still in cooldown, dripping ~{M(st.unstaking.release[1].nos)} over the next 30 days{dailyNos ? ` (≈${(st.unstaking.release[1].nos / 30 / dailyNos * 100).toFixed(1)}% of daily volume — absorbable)` : ''}. The forced seller from NNP-0001 is not the overhang anymore.
                  <div style={{ marginTop: 6 }}><b>The overhang is {pc(ho.treasuryLikeNos)} of supply in {ho.top.filter((h) => h.kind === 'treasury_like').length} unlabeled wallets</b> — allocation-shaped (company / team / mining reserve per the tokenomics). No vesting program holds them; they are signer-controlled and can move any day. Plus {pc(ho.exchangeNos)} already sitting on Gate and MEXC — the two venues that print the price. That exchange float is the ammunition for any breakdown.</div>
                  <div style={{ marginTop: 6 }}><b>Conviction is real but small:</b> {M(st.durationMix[3].nos)} NOS locked 181–365d by holders who took the APR cut and stayed. {st.whales.count} whale stakes hold {(st.whales.nos / st.active.nos * 100).toFixed(0)}% of active stake — the floor is a dozen wallets. If those start unstaking, the queue refills and the TA path accelerates. Watch this number, not the chart.</div>
                  {ho.roundLots > 0 && <div style={{ marginTop: 6 }}><b>{ho.roundLots} wallets hold exact 250k multiples</b> (e.g. 750,000) — allocation tranches, not market buys. Treat as latent supply.</div>}
                </div>
              )}
              {chain.errors?.length > 0 && <div style={{ fontSize: 10.5, color: RED, marginTop: 8 }}>partial: {chain.errors.join(' · ')}</div>}
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Source: Solana RPC, read on every load — staking program <code>nosS…rTJE</code> (all StakeAccounts decoded) + largest token accounts of <code>nosX…oo7</code>. Exchange labels are community labels (Solscan), unverified. Cached 10 min.</div>
            </>
          );
        })()}
      </div>

      {/* TECHNICAL ANALYSIS */}
      <Eyebrow dot={RED}>Technical analysis — NOS/USDT 1D · forecast 1M / 3M / 1Y · read {TA.reviewed}</Eyebrow>
      <div style={{ border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: 16 }}>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{TA.read}</div>
        {/* LIVE TREND */}
        {(() => {
          const t = trend;
          const col = !t ? 'var(--text-muted)' : t.score >= 5 ? GRN : t.score === 4 ? AMB : RED;
          const inv = d?.price != null && d.price > TA.invalidation.level;
          const tile = (k, v, sub, c) => (
            <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '8px 10px', minWidth: 0 }}>
              <div style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{k}</div>
              <div style={{ fontSize: 15, fontWeight: 800, marginTop: 3, color: c || 'var(--text-primary)' }}>{v}</div>
              {sub ? <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div> : null}
            </div>
          );
          const pc = (x) => `${x >= 0 ? '+' : ''}${(x * 100).toFixed(1)}%`;
          return (
            <div style={{ marginTop: 14, border: `1px solid ${col}`, borderRadius: 4, padding: 12, background: 'rgba(255,255,255,.015)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Trend now · live</div>
                <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '.06em', color: col }}>{t ? t.regime : 'computing…'}</div>
                {t && <div style={{ display: 'flex', gap: 3 }}>{t.checks.map((x, i) => <span key={i} title={x[0]} style={{ width: 14, height: 6, borderRadius: 2, background: x[1] ? col : 'rgba(255,255,255,.08)' }} />)}</div>}
                {t && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.score}/7 bullish checks</span>}
                <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: inv ? GRN : RED }}>
                  FORECAST {inv ? 'INVALIDATED ›' : 'INTACT ‹'} ${TA.invalidation.level}
                </div>
              </div>
              {t && (
                <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(2,1fr)' : 'repeat(6,1fr)', gap: 8, marginTop: 10 }}>
                  {tile('EMA stack', `${t.last > t.e20 ? '▲' : '▼'}20 ${t.last > t.e50 ? '▲' : '▼'}50 ${t.last > t.e200 ? '▲' : '▼'}200`, `${t.e20.toFixed(3)} · ${t.e50.toFixed(3)} · ${t.e200.toFixed(3)}`, t.last > t.e200 ? GRN : RED)}
                  {tile('EMA200 slope', pc(t.slope200), '20d change', t.slope200 > 0 ? GRN : RED)}
                  {tile('MACD histo', (t.hist >= 0 ? '+' : '') + t.hist.toFixed(4), t.histUp ? 'rising' : 'falling', t.hist > 0 ? GRN : RED)}
                  {tile('RSI 14', t.rsi.toFixed(0), t.rsi > 70 ? 'overbought' : t.rsi < 30 ? 'oversold' : 'neutral zone', t.rsi > 50 ? GRN : RED)}
                  {tile('7d / 30d', `${pc(t.chg7)} / ${pc(t.chg30)}`, 'momentum', t.chg30 > 0 ? GRN : RED)}
                  {tile('vs path', d?.price ? pc(d.price / TA.path[0].target - 1) : '—', 'above +1M target', 'var(--text-primary)')}
                </div>
              )}
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
                Regime is recomputed on every load from 365 daily closes (CoinGecko): EMA 20/50/200, MACD (12,26,9), RSI 14. The forecast below is the {TA.reviewed} read; this strip tells you whether the market is still agreeing with it.
              </div>
            </div>
          );
        })()}
        {/* STRUCTURE CHART */}
        <div style={{ marginTop: 14, border: '1px solid var(--border)', borderRadius: 4, padding: '8px 4px 4px' }}>
          <div style={{ display: 'flex', gap: 14, fontSize: 10.5, padding: '0 10px 4px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span style={{ color: AMB, fontWeight: 800, letterSpacing: '.1em' }}>STRUCTURE · {TA.structure.pattern.toUpperCase()}</span>
            <span><span style={{ color: RED }}>╌</span> lower highs</span>
            <span><span style={{ color: GRN }}>╌</span> higher lows</span>
            <span><span style={{ color: AMB }}>┆</span> apex</span>
            <span style={{ marginLeft: 'auto' }}>365d daily closes · log scale · volume at base</span>
          </div>
          <TAStructure series={series} ta={TA} mb={mb} />
        </div>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 10, fontSize: 11.5, lineHeight: 1.55, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
          <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
            <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>Pattern read</div>
            <b>Symmetrical triangle, 6 months old, 3 touches each side.</b> Lower highs H1→H3 (0.395 → 0.314 → 0.296) against higher lows L1→L3 (0.178 → 0.200 → 0.243). Price is now in the final third of the pattern — the zone where breakouts are statistically valid; past the apex the pattern decays. Height at the widest point ≈ 0.19, so the measured move is 0.50 on a breakout and the 0.143 cycle low on a breakdown (the literal 0.19 projection overshoots where liquidity exists).
            <div style={{ marginTop: 6 }}><b>Context is the tell.</b> The triangle formed <i>after</i> an 85% decline from the Sep-25 blow-off (1.01). Continuation patterns resolve in the direction of the prior trend ~2:1. The EMA200 is above price and falling; the 50 sits below the 200. That is a bear-market consolidation, not a base.</div>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
            <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>What to watch this week</div>
            <b>Volume.</b> {trend?.volRatio != null ? `20d avg volume is ${Math.round(trend.volRatio * 100)}% of the 90d avg — ${trend.volRatio < 0.85 ? 'drying up into the apex, classic pre-break compression' : trend.volRatio > 1.2 ? 'expanding, a break is close' : 'flat'}.` : 'Loading…'} A valid break needs ≥2× average volume on the break day; anything less is a fake-out and gets sold.
            <div style={{ marginTop: 6 }}><b>Sequence that confirms the bear path:</b> close below EMA20 (0.267) → lose the rising support line (currently ~{(() => { const a = TA.structure.support.a, b = TA.structure.support.b; const m = (b[1] - a[1]) / (b[0] - a[0]); return (a[1] + m * (Date.now() - a[0])).toFixed(3); })()}) → retest from below fails → 0.22 Aug low goes. Each step is a reduce point.</div>
            <div style={{ marginTop: 6 }}><b>Sequence that flips it:</b> daily close &gt; 0.3125 on volume → EMA200 becomes support on the retest → 0.35. Only then does 0.40–0.50 open. Until that prints, rallies into 0.29–0.31 are for selling, not buying.</div>
          </div>
        </div>
        <div style={{ marginTop: 14, border: '1px solid var(--border)', borderRadius: 4, padding: '8px 4px 4px' }}>
          <div style={{ display: 'flex', gap: 14, fontSize: 10.5, padding: '0 10px 4px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span style={{ color: RED, fontWeight: 800, letterSpacing: '.1em' }}>BIAS: {TA.bias}</span>
            <span><span style={{ color: RED }}>▬</span> forecast path</span>
            <span><span style={{ color: GRN }}>╌</span> invalidation</span>
            <span style={{ marginLeft: 'auto' }}>log scale · x = √time · shade = tolerance</span>
          </div>
          <TAFan price={d?.price} ta={TA} mb={mb} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : 'repeat(3,1fr)', gap: 10, marginTop: 14 }}>
          {TA.path.map((p) => {
            const px = d?.price;
            return (
              <div key={p.h} style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.08em', color: 'var(--text-secondary)' }}>{p.h}</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: RED }}>${p.target.toFixed(2)} <span style={{ fontSize: 10.5, fontWeight: 500, color: 'var(--text-muted)' }}>{px ? `${p.target / px - 1 >= 0 ? '+' : ''}${Math.round((p.target / px - 1) * 100)}%` : ''}</span></span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{p.how}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 10, padding: '9px 12px', border: `1px solid ${GRN}`, borderRadius: 4, background: 'rgba(34,197,94,.06)', fontSize: 11.5, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
          <b style={{ color: GRN, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.08em' }}>INVALIDATION ·</b> {TA.invalidation.text}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 10, marginTop: 12 }}>
          {[['Resistance', TA.levels.resistance, RED], ['Support', TA.levels.support, GRN]].map(([t, L, col]) => (
            <div key={t}>
              <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: col, marginBottom: 4 }}>{t}</div>
              {L.map(([lv, why]) => (
                <div key={lv} style={{ display: 'flex', gap: 10, fontSize: 11.5, padding: '3px 0', color: 'var(--text-muted)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', minWidth: 58 }}>${lv.toFixed(lv < 0.3 ? 4 : 2)}</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{why}</span>
                  {d?.price ? <span style={{ marginLeft: 'auto', fontSize: 10.5 }}>{lv / d.price - 1 >= 0 ? '+' : ''}{Math.round((lv / d.price - 1) * 100)}%</span> : null}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 12, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Directional TA forecast with an explicit invalidation level. % shown is distance from live price. Refreshed manually on each thesis review. Not investment advice.</div>
      </div>

      <Eyebrow>Tracked snapshots — accumulates every visit → your own history</Eyebrow>
      <div style={panel}>
        <div style={{ marginBottom: 8 }}><span style={{ fontSize: 13, fontWeight: 700 }}>Data-point log</span> <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>· auto-saved in this browser (max 1 per 6h). Deltas above are vs the previous row.</span></div>
        {snaps.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: 12, padding: '10px 2px' }}>No snapshots yet — this is your first read. Revisit to build the trend.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead><tr>{['Timestamp', 'NOS $', 'Mkt Cap', 'Completed', 'Job hrs', 'Hosts', 'Running'].map((h, i) => (
                <th key={h} style={{ textAlign: i ? 'right' : 'left', padding: '7px 8px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontWeight: 500, fontSize: 10, letterSpacing: '.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {snaps.slice(-12).reverse().map((s, i) => (
                  <tr key={i}>
                    <td style={td(1)}>{new Date(s.t).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                    <td style={td()}>{fmtPx(s.price)}</td>
                    <td style={td()}>{fmtM(s.mcap)}</td>
                    <td style={td()}>{fmtInt(s.completed)}</td>
                    <td style={td()}>{fmtInt(s.jobHours)}</td>
                    <td style={td()}>{fmtInt(s.hosts)}</td>
                    <td style={td()}>{fmtInt(s.running)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* TRIPWIRES */}
      <Eyebrow>Thesis tripwires — materialization checklist (from due-diligence) · last review {SEED.reviewed} · stance: hold-to-reduce</Eyebrow>
      <div>
        {trips.map(([cls, ic, t, desc], i) => (
          <div key={i} style={{ display: 'flex', gap: 11, padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, marginTop: 1, color: tripStyle[cls][0], background: tripStyle[cls][1] }}>{ic}</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{t}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: 26, borderTop: '1px solid var(--border)', paddingTop: 14, color: 'var(--text-muted)', fontSize: 11, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", lineHeight: 1.6 }}>
        <b style={{ color: 'var(--text-secondary)' }}>Sources.</b> Network data via server-side proxy to the Nosana API (dashboard.k8s.prd.nos.ci — same backend as <a href="https://explore.nosana.com/" target="_blank" rel="noopener" style={{ color: GRN }}>explore.nosana.com</a>). Market data: CoinGecko.<br />
        <b style={{ color: 'var(--text-secondary)' }}>Green</b> = network fundamentals · <b style={{ color: 'var(--text-secondary)' }}>blue</b> = market. The dashboard's job is to show whether the two converge. The network-evolution chart is native historical series; point-in-time KPIs are snapshotted per visit.<br />
        <b style={{ color: 'var(--text-secondary)' }}>Note.</b> Completed jobs / compute hours include incentivized, grant and charity (Folding@Home) activity — not a clean paid-revenue signal. Watch the tripwires for real materialization. Data & research context, not investment advice.
        <div style={{ marginTop: 12 }}>
          <a href="https://10am.pro?utm_source=nosana&utm_medium=footer&utm_campaign=hub" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>← 10am.pro</a>
        </div>
      </div>
    </div>
  );
}
const td = (first) => ({ textAlign: first ? 'left' : 'right', padding: '7px 8px', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' });
