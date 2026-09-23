// ---- shared TA charts (structure + forecast fan) — used by crypto hubs and /biology-is-code ----
import { ema } from './ta';

const GRN = '#22c55e', AMB = '#f59e0b', RED = '#ef4444';
const MONO = "'JetBrains Mono',monospace";
const GRID = [0.01, 0.02, 0.05, 0.1, 0.2, 0.3, 0.5, 0.7, 1, 1.5, 2, 3, 5, 7, 10, 15, 20, 30, 50, 70, 100, 150, 200, 300, 500];
const fmtPx = (n) => (n == null || isNaN(n) ? '—' : '$' + (n >= 100 ? n.toFixed(2) : n >= 1 ? n.toFixed(3) : Number(n).toPrecision(4)));
const pc = (x, d = 1) => (x == null || isNaN(x) ? '—' : `${x >= 0 ? '+' : ''}${(x * 100).toFixed(d)}%`);
const lab = (x, y, txt, col, anchor = 'start', size = 9.5) => <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight="700" fill={col} fontFamily={MONO}>{txt}</text>;

// ---------- TA structure chart ----------
export function TAStructure({ series, st, fc, mb, minBars = 90 }) {
  if (!series || series.c.length < minBars) return <div style={{ color: 'var(--text-muted)', fontSize: 11, padding: 20 }}>loading structure…</div>;
  const W = 680, H = mb ? 320 : 380, L = 50, R = 60, T = 16, B = 30, DAY = 86400000, keep = 320;
  const sl = (a) => a.slice(-keep); const t = sl(series.t), c = sl(series.c), v = sl(series.v);
  const t0 = t[0], tEnd = t[t.length - 1] + 120 * DAY;
  const xs = (ts) => L + ((ts - t0) / (tEnd - t0)) * (W - L - R);
  const all = c.concat(fc ? fc.path.slice(0, 2).map((p) => p.target) : [], fc ? [fc.invalidation] : []);
  const yMin = Math.min(...all) * 0.88, yMax = Math.max(...all) * 1.1;
  const ys = (p) => T + (1 - (Math.log(p) - Math.log(yMin)) / (Math.log(yMax) - Math.log(yMin))) * (H - T - B);
  const line = (arr) => 'M' + arr.map((p, i) => `${xs(t[i]).toFixed(1)},${ys(p).toFixed(1)}`).join(' L');
  const e20 = sl(ema(series.c, 20)), e50 = sl(ema(series.c, 50)), e200 = sl(ema(series.c, 200));
  const last = c[c.length - 1], lastT = t[t.length - 1]; const vmax = Math.max(1, ...v); const vh = 34;
  const proj = fc ? [[lastT, last]].concat(fc.path.map((p) => [lastT + p.d * DAY, p.target])).filter((p) => p[0] <= tEnd) : [];
  const projD = proj.length > 1 ? 'M' + proj.map((p) => `${xs(p[0]).toFixed(1)},${ys(p[1]).toFixed(1)}`).join(' L') : '';
  const grid = GRID.filter((g) => g > yMin && g < yMax);
  const extendTo = st?.apexT ? Math.min(st.apexT + 30 * DAY, tEnd) : tEnd;
  const dirCol = fc?.dir === 'BEAR' ? RED : GRN;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', height: 'auto' }}>
      <defs><clipPath id="taClip"><rect x={L} y={T} width={W - L - R} height={H - T - B} /></clipPath></defs>
      {grid.map((g) => <g key={g}><line x1={L} x2={W - R} y1={ys(g)} y2={ys(g)} stroke="rgba(255,255,255,.05)" /><text x={L - 5} y={ys(g) + 3} textAnchor="end" fontSize="9.5" fill="var(--text-muted)" fontFamily={MONO}>${g}</text></g>)}
      {t.filter((ts, i) => i === 0 || new Date(ts).getUTCMonth() !== new Date(t[i - 1]).getUTCMonth()).map((ts) => <text key={ts} x={xs(ts)} y={H - B + 13} fontSize="9" fill="var(--text-muted)" fontFamily={MONO}>{['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'][new Date(ts).getUTCMonth()]}</text>)}
      <rect x={xs(lastT)} y={T} width={W - R - xs(lastT)} height={H - T - B} fill="rgba(255,255,255,.02)" />
      {lab(xs(lastT) + 4, T + 10, 'PROJECTION →', 'var(--text-muted)')}
      {st?.res && st?.sup && st.apexT && <path d={`M${xs(st.res.a[0])},${ys(st.res.a[1])} L${xs(st.res.a[0])},${ys(st.sup.yAt(st.res.a[0]))} L${xs(st.apexT)},${ys(st.res.yAt(st.apexT))} Z`} fill={AMB} opacity="0.07" clipPath="url(#taClip)" />}
      <g clipPath="url(#taClip)">{v.map((vol, i) => <rect key={i} x={xs(t[i]) - 0.6} y={H - B - (vol / vmax) * vh} width="1.2" height={(vol / vmax) * vh} fill={i > 0 && c[i] >= c[i - 1] ? GRN : RED} opacity="0.35" />)}</g>
      <path d={line(e200)} fill="none" stroke="#3b5bdb" strokeWidth="1.4" clipPath="url(#taClip)" />
      <path d={line(e50)} fill="none" stroke={AMB} strokeWidth="1" opacity=".8" clipPath="url(#taClip)" />
      <path d={line(e20)} fill="none" stroke={RED} strokeWidth="1" opacity=".7" clipPath="url(#taClip)" />
      <path d={line(c)} fill="none" stroke="var(--text-primary)" strokeWidth="1.5" clipPath="url(#taClip)" />
      {st?.res && <line x1={xs(st.res.a[0])} y1={ys(st.res.a[1])} x2={xs(extendTo)} y2={ys(Math.max(yMin * 1.01, st.res.yAt(extendTo)))} stroke={RED} strokeWidth="1.6" strokeDasharray="5 3" />}
      {st?.sup && <line x1={xs(st.sup.a[0])} y1={ys(st.sup.a[1])} x2={xs(extendTo)} y2={ys(Math.max(yMin * 1.01, st.sup.yAt(extendTo)))} stroke={GRN} strokeWidth="1.6" strokeDasharray="5 3" />}
      {st?.res && lab(xs(st.res.a[0]) - 4, ys(st.res.a[1]) - 14, `Lower highs · ${st.res.touches} touches`, RED, 'end')}
      {st?.sup && lab(xs(st.sup.a[0]) + 14, ys(st.sup.a[1]) + 4, `Higher lows · ${st.sup.touches} touches`, GRN)}
      {(st?.highs || []).map((p, i) => <g key={'h' + i}><circle cx={xs(p[0])} cy={ys(p[1])} r="3.5" fill="#0c0c0e" stroke={RED} strokeWidth="1.5" />{lab(xs(p[0]), ys(p[1]) - 8, `H${i + 1}`, RED, 'middle', 8.5)}</g>)}
      {(st?.lows || []).map((p, i) => <g key={'l' + i}><circle cx={xs(p[0])} cy={ys(p[1])} r="3.5" fill="#0c0c0e" stroke={GRN} strokeWidth="1.5" />{lab(xs(p[0]), ys(p[1]) + 15, `L${i + 1}`, GRN, 'middle', 8.5)}</g>)}
      {st?.apexT && st.apexT < tEnd && <g><line x1={xs(st.apexT)} x2={xs(st.apexT)} y1={T} y2={H - B} stroke={AMB} strokeDasharray="2 4" />{lab(xs(st.apexT) + 4, T + 24, `APEX ~${new Date(st.apexT).toLocaleDateString('es', { day: '2-digit', month: 'short' })}`, AMB)}</g>}
      {fc && <g><line x1={xs(lastT - 30 * DAY)} x2={W - R} y1={ys(fc.invalidation)} y2={ys(fc.invalidation)} stroke={fc.dir === 'BEAR' ? GRN : RED} strokeWidth="1.2" strokeDasharray="6 3" />{lab(W - R - 4, ys(fc.invalidation) - 4, `INVALIDATION ${fc.invalidation}`, fc.dir === 'BEAR' ? GRN : RED, 'end')}</g>}
      {projD && <path d={projD} fill="none" stroke={dirCol} strokeWidth="2" opacity=".9" />}
      {proj.slice(1).map((p, i) => <g key={i}><circle cx={xs(p[0])} cy={ys(p[1])} r="4" fill="#0c0c0e" stroke={dirCol} strokeWidth="2" />{lab(xs(p[0]) + 8, ys(p[1]) + (i === 0 ? -8 : 14), `${fc.path[i].h} $${p[1]}`, dirCol)}</g>)}
      <circle cx={xs(lastT)} cy={ys(last)} r="3.5" fill="#fff" />
      <rect x={W - R + 2} y={ys(last) - 8} width={R - 4} height="16" rx="2" fill="#fff" />
      <text x={W - R + R / 2} y={ys(last) + 3.5} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#000" fontFamily={MONO}>{fmtPx(last).replace('$', '')}</text>
      <g transform={`translate(${L + 6},${H - B - 6})`}>{[['#3b5bdb', 'EMA200'], [AMB, 'EMA50'], [RED, 'EMA20']].map(([col, n], i) => <g key={n} transform={`translate(${i * 62},0)`}><line x1="0" x2="14" y1="-3" y2="-3" stroke={col} strokeWidth="2" /><text x="18" y="0" fontSize="9" fill="var(--text-muted)" fontFamily={MONO}>{n}</text></g>)}</g>
    </svg>
  );
}

// ---------- forecast path chart ----------
export function TAFan({ price, fc, mb }) {
  if (!fc) return null;
  const W = 680, H = mb ? 300 : 340, L = 50, R = 64, T = 18, B = 34, px = price || fc.path[0].target;
  const xs = (d) => L + Math.sqrt(d / 365) * (W - L - R);
  const vals = [px, fc.invalidation, ...fc.path.map((p) => p.target)];
  const yMin = Math.min(...vals) * 0.8, yMax = Math.max(...vals) * 1.25;
  const ys = (v) => T + (1 - (Math.log(v) - Math.log(yMin)) / (Math.log(yMax) - Math.log(yMin))) * (H - T - B);
  const P = [{ d: 0, target: px }].concat(fc.path); const pts = P.map((p) => [xs(p.d), ys(p.target)]);
  let dPath = `M${pts[0][0]},${pts[0][1]}`; for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], cx = (x0 + x1) / 2; dPath += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`; }
  const tol = [0, 0.06, 0.12, 0.22];
  const up = P.map((p, i) => [xs(p.d), ys(p.target * (1 + tol[i]))]), dn = P.map((p, i) => [xs(p.d), ys(p.target * (1 - tol[i]))]).reverse();
  const cone = 'M' + up.concat(dn).map((q) => q.join(',')).join(' L') + ' Z';
  const col = fc.dir === 'BEAR' ? RED : GRN, icol = fc.dir === 'BEAR' ? GRN : RED;
  const grid = GRID.filter((g) => g > yMin && g < yMax);
  const inv = fc.invalidation;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', height: 'auto' }}>
      <defs><linearGradient id="fanCone" x1="0" x2="1"><stop offset="0%" stopColor={col} stopOpacity="0.05" /><stop offset="100%" stopColor={col} stopOpacity="0.22" /></linearGradient></defs>
      {grid.map((v) => <g key={v}><line x1={L} x2={W - R} y1={ys(v)} y2={ys(v)} stroke="rgba(255,255,255,.05)" /><text x={L - 6} y={ys(v) + 3} textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily={MONO}>${v}</text></g>)}
      {P.map((p, i) => <g key={i}><line x1={xs(p.d)} x2={xs(p.d)} y1={T} y2={H - B} stroke="rgba(255,255,255,.07)" strokeDasharray="2 3" /><text x={xs(p.d)} y={H - B + 14} textAnchor={i === 0 ? 'start' : 'middle'} fontSize="10.5" fontWeight="700" fill="var(--text-secondary)" fontFamily={MONO}>{i === 0 ? 'HOY' : p.h}</text></g>)}
      {fc.dir === 'BEAR' ? <rect x={L} y={T} width={W - L - R} height={Math.max(0, ys(inv) - T)} fill={GRN} opacity="0.05" /> : <rect x={L} y={ys(inv)} width={W - L - R} height={Math.max(0, H - B - ys(inv))} fill={RED} opacity="0.05" />}
      <line x1={L} x2={W - R} y1={ys(inv)} y2={ys(inv)} stroke={icol} strokeWidth="1.5" strokeDasharray="6 3" />
      {lab(L + 6, ys(inv) + (fc.dir === 'BEAR' ? -5 : 12), `INVALIDATION ${fc.dir === 'BEAR' ? '›' : '‹'} $${inv}`, icol)}
      <path d={cone} fill="url(#fanCone)" /><path d={dPath} fill="none" stroke={col} strokeWidth="2.4" />
      <line x1={L} x2={W - R} y1={ys(px)} y2={ys(px)} stroke="var(--text-primary)" strokeOpacity=".4" />
      <circle cx={xs(0)} cy={ys(px)} r="4.5" fill="#fff" /><rect x={W - R + 2} y={ys(px) - 8} width={R - 4} height="16" rx="2" fill="#fff" /><text x={W - R + R / 2} y={ys(px) + 3.5} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#000" fontFamily={MONO}>{fmtPx(px).replace('$', '')}</text>
      {fc.path.map((p, i) => { const x = xs(p.d), y = ys(p.target), last = i === fc.path.length - 1; return <g key={p.h}><circle cx={x} cy={y} r="5" fill="#0c0c0e" stroke={col} strokeWidth="2" /><rect x={x - (last ? 64 : 32)} y={y + 10} width="64" height="28" rx="3" fill={col + '24'} stroke={col} strokeOpacity=".5" /><text x={x - (last ? 32 : 0)} y={y + 22} textAnchor="middle" fontSize="11" fontWeight="800" fill={col} fontFamily={MONO}>${p.target}</text><text x={x - (last ? 32 : 0)} y={y + 33} textAnchor="middle" fontSize="9" fill={col} fontFamily={MONO}>{pc(p.target / px - 1, 0)}</text></g>; })}
    </svg>
  );
}

