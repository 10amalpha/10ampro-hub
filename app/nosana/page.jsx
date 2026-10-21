'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { taStamps } from '../lib/thesis/stamp';
import RelativeLayer from '../lib/thesis/RelativeLayer';

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
  hostsBaseline: 965, reviewed: '21 Oct 2026',
};


// ---- Technical analysis (manual read, refreshed on each review) ----
// Chart basis: NOS/USD 1D (CoinGecko) · 21 Oct 2026 · C 0.5271 (21 Oct, −4.0% — devolvió la EMA20 por 0.4% tras el rebote a 0.5493) / 0.5268 hoy (plano, día rojo propio con SOL +2.8%) · EMA20 0.5294 · EMA50 0.4635 · EMA100 0.3975 · EMA200 0.3517 (+16.1%/20d) · RSI 41 · MACD histo −0.015 (achicándose, 3ª sesión) · vol 20d/90d 199%, hoy $0.49M vs $2.5M máx-30d
const TA = {
  reviewed: '21 Oct 2026',
  bias: 'BEARISH',
  read: 'El rebote devolvió la EMA20 al día siguiente. El 20 Oct había cerrado 0.5493 — +13.8%, 2% debajo de 0.5607 — y el 21 Oct cerró 0.5271, −4.0%: 0.4% debajo de la EMA20 (0.5294), que era el primer escalón de la secuencia que anula el sesgo ("sostener la EMA20 al cierre") y el primero de la que lo confirma ("la EMA20 perdida al cierre"). Por 0.4% es un empate, y el cierre de hoy lo resuelve; hoy 0.5268, plano, en un día en que SOL sube 2.8% — el primer día rojo propio después del único verde propio del mes. El volumen bajó a $0.49M, 45% del promedio de 20 días ($1.09M): el +14% del 20 Oct vino con $0.85M y la devolución con la mitad, que es lo que hace un rebote de libro vacío cuando el libro se vuelve a llenar de nada — ni compradores arriba ni vendedores abajo. Cuatro de siete, desde cinco: el precio perdió la EMA20; quedan la 50 (0.4635) y la 200 (0.3517, +16% en 20 días), la 50 sobre la 200 y la 200 subiendo; el RSI en 41 (desde 31) todavía bajo 50 y el MACD negativo, con el histograma achicándose por tercera sesión — el único dato que sigue mejorando, y mejora porque la caída se frenó, no porque alguien compre. Relativo: −3.8% en siete días con SOL −0.2%: la semana en que NOS le ganaba al mercado duró un día; hoy NOS plano con SOL +2.8% es la beta de vuelta en contra. Red: nada nuevo — compute hours bajo 150k, revenue pagado sin publicar. La foto es la de un rebote de +14% con tres cuartos del volumen que se frenó a 2% del nivel que importa y devolvió la media en una sesión: la secuencia bajista — EMA20 perdida → 0.49 de vuelta → EMA50 (0.4635) — dio el primer paso por un pelo. Lo que lo deshace es lo mismo de ayer: un cierre sobre 0.5607 con $2.3M; lo que lo confirma es un cierre bajo 0.49, 7% abajo. En el medio, 0.5294–0.5607 es la zona de reducir y nadie tiene que comprar ahí.',
  // Chart structure (anchor points are [timestamp, price]) — drawn on the live series
  structure: {
    resistance: { a: [1791158400000, 0.7365], b: [1791331200000, 0.7365], label: 'Techo 0.7365 · máximo 5 Oct · bandera 0.56–0.68 rota por abajo el 13 Oct · EMA20 perdida el 16 Oct · 0.49 cerrado el 19 Oct · rebote del 20 Oct frenado en 0.5493, bajo 0.5607 · EMA20 devuelta el 21 Oct' },
    support: { a: [1770768000000, 0.1784], b: [1785369600000, 0.2431], label: 'Rail 2026 · Feb-11 → Jul-28 → Sep-16 · debajo termina la tesis' },
    touches: [[1791158400000, 0.7365, 'H1'], [1791331200000, 0.6836, 'H2'], [1791763200000, 0.6016, 'H3'], [1770768000000, 0.1784, 'L1'], [1775347200000, 0.1996, 'L2'], [1785369600000, 0.2431, 'L3'], [1789516800000, 0.2675, 'L4'], [1791504000000, 0.5607, 'L5'], [1791849600000, 0.5554, 'L6'], [1792108800000, 0.5084, 'L7'], [1792368000000, 0.4826, 'L8'], [1792454400000, 0.5493, 'H4']],
    pattern: 'Impulso vertical + bandera rota por abajo (13 Oct) + EMA20 perdida (16 Oct) + 0.49 cerrado (19 Oct) + rebote a 0.5493 (20 Oct) bajo el piso de la bandera + EMA20 devuelta por 0.4% (21 Oct)',
    height: 0.469,
    measured: { up: 0.85, down: 0.4466 },
  },
  invalidation: { level: 0.5607, text: 'Cierre diario sobre 0.5607 (mínimo del 9 Oct, el piso de la bandera perdido el 13 Oct; el rebote del 20 Oct se frenó en 0.5493 y el 21 Oct devolvió la EMA20, 0.5294) con 2× volumen anula el path bajista: el cierre del 19 Oct bajo 0.49 queda como un barrido y la bandera se reconstruye → 0.6836 (cierre del 7 Oct) y 0.7365 (máximo del 5 Oct).' },
  path: [
    { d: 30, h: '+1M', target: 0.4635, how: 'El rebote llegó a 0.5493 (20 Oct) con el 74% del volumen, se frenó bajo 0.5607 y devolvió la EMA20 al cierre siguiente (0.5271, 21 Oct) → cierre bajo 0.49 de vuelta → EMA50, con el 61.8% del impulso (0.4466) pegado debajo. Si cierra sobre 0.5607 con 2× volumen, el +1M es lateral 0.5607–0.6836 con el sesgo de vuelta alcista.' },
    { d: 90, h: '+3M', target: 0.3947, how: 'Máximo del 2 Jun, el breakout viejo, con la EMA100 (0.3975) ya encima: el impulso devuelto al 73%. Es el escenario de la red sin revenue publicado y el sector AI de Solana rotando afuera; con compute hours de vuelta sobre 150k antes, el +3M vuelve a la EMA20.' },
    { d: 365, h: '+1Y', target: 0.5607, how: 'Retest del piso de la bandera desde abajo, con la EMA200 todavía subiendo. A un año el cierre bajo 0.49 es un impulso de sector devuelto, no el fin de la tendencia de 2026; para 0.6836 y 0.7365 hacen falta la bandera reconstruida y revenue pagado publicado, y hoy no está ninguna de las dos. La medida completa (1.03) no es un objetivo honesto.' },
  ],
  levels: {
    resistance: [[0.5294, 'EMA20 — recuperada el 20 Oct, devuelta por 0.4% el 21 Oct'], [0.5493, 'Cierre 20 Oct · techo del rebote · 2% bajo 0.5607'], [0.5607, 'INVALIDACIÓN bajista · mínimo 9 Oct · piso de la bandera · +1Y'], [0.6016, 'Cierre 12 Oct'], [0.6836, 'Cierre 7 Oct · techo del pullback'], [0.7365, 'Máximo 5 Oct'], [0.85, 'Medida de la bandera (61.8%) · solo con la bandera reconstruida'], [1.01, 'Blow-off Sep-25 · requiere revenue publicado']],
    support: [[0.5271, 'Cierre 21 Oct · el precio está acá'], [0.502, 'Mitad del impulso 0.2675 → 0.7365'], [0.49, 'Invalidación vieja · cierre 1 Oct — cerrada el 19 Oct, recuperada el 20 Oct'], [0.4826, 'Cierre 19 Oct · el día de la invalidación · mínimo del pullback'], [0.4635, 'EMA50 · +1M'], [0.4466, '61.8% del impulso'], [0.3975, 'EMA100'], [0.3947, 'Máximo 2 Jun · el breakout viejo · +3M'], [0.3679, '78.6% del impulso'], [0.3517, 'EMA200 — subiendo 16%/20d'], [0.3125, 'Nivel del breakout del 21 Sep']],
  },
};

const BEAR = TA.bias === 'BEARISH';

// ---- TA scenario fan chart (SVG, log-y) ----
function TAFan({ price, ta, mb }) {
  const W = 680, H = mb ? 300 : 340, L = 50, R = 64, T = 18, B = 34;
  const px = price || 0.28;
  const xs = (days) => L + Math.sqrt(days / 365) * (W - L - R);
  const yMin = 0.12, yMax = 0.80;
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
  const gridV = [0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75];
  const lv = [...ta.levels.resistance, ...ta.levels.support].filter(([v]) => v >= yMin && v <= yMax && Math.abs(v - px) / px > 0.08 && v !== ta.invalidation.level);
  const inv = ta.invalidation.level;
  const bear = ta.bias === 'BEARISH';
  const pct = (v) => `${v / px - 1 >= 0 ? '+' : ''}${Math.round((v / px - 1) * 100)}%`;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', height: 'auto' }}>
      <defs>
        <linearGradient id="taCone" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={GRN} stopOpacity="0.05" /><stop offset="100%" stopColor={GRN} stopOpacity="0.22" />
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
      <rect x={L} y={bear ? T : ys(inv)} width={W - L - R} height={bear ? Math.max(0, ys(inv) - T) : Math.max(0, H - B - ys(inv))} fill={RED} opacity="0.05" />
      <line x1={L} x2={W - R} y1={ys(inv)} y2={ys(inv)} stroke={RED} strokeWidth="1.5" strokeDasharray="6 3" />
      <text x={L + 6} y={bear ? ys(inv) - 5 : ys(inv) + 12} fontSize="9.5" fontWeight="700" fill={RED} fontFamily="'JetBrains Mono',monospace">{bear ? `INVALIDATION › $${inv} · bear path cancelled, flag rebuilt` : `INVALIDATION ‹ $${inv} · path flips back to 0.2675`}</text>
      {lv.map(([v]) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={ys(v)} y2={ys(v)} stroke="rgba(255,255,255,.18)" strokeWidth="1" strokeDasharray="1 3" />
          <text x={W - R + 4} y={ys(v) + 3} fontSize="9.5" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">{v.toFixed(3)}</text>
        </g>
      ))}
      <path d={cone} fill="url(#taCone)" />
      <path d={dPath} fill="none" stroke={bear ? RED : GRN} strokeWidth="2.4" />
      <line x1={L} x2={W - R} y1={ys(px)} y2={ys(px)} stroke="var(--text-primary)" strokeOpacity=".4" strokeWidth="1" />
      <circle cx={xs(0)} cy={ys(px)} r="4.5" fill="#fff" />
      <rect x={W - R + 2} y={ys(px) - 8} width={R - 4} height="16" rx="2" fill="#fff" />
      <text x={W - R + R / 2} y={ys(px) + 3.5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#000" fontFamily="'JetBrains Mono',monospace">${px.toFixed(3)}</text>
      {ta.path.map((p, i) => {
        const x = xs(p.d), y = ys(p.target);
        const last = i === ta.path.length - 1;
        return (
          <g key={p.h}>
            <circle cx={x} cy={y} r="5" fill="#0c0c0e" stroke={GRN} strokeWidth="2" />
            <rect x={x - (last ? 64 : 32)} y={y + 10} width="64" height="28" rx="3" fill="rgba(34,197,94,.14)" stroke={GRN} strokeOpacity=".5" />
            <text x={x - (last ? 32 : 0)} y={y + 22} textAnchor="middle" fontSize="11" fontWeight="800" fill={GRN} fontFamily="'JetBrains Mono',monospace">${p.target.toFixed(2)}</text>
            <text x={x - (last ? 32 : 0)} y={y + 33} textAnchor="middle" fontSize="9" fill={GRN} fontFamily="'JetBrains Mono',monospace">{pct(p.target)}</text>
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
      <line x1={xs(lastT - 30 * DAY)} x2={W - R} y1={ys(ta.invalidation.level)} y2={ys(ta.invalidation.level)} stroke={RED} strokeWidth="1.2" strokeDasharray="6 3" />
      {lab(W - R - 4, ys(ta.invalidation.level) + 11, `INVALIDATION ${ta.invalidation.level}`, RED, 'end')}
      {/* projection */}
      <path d={projD} fill="none" stroke={GRN} strokeWidth="2" strokeDasharray="1 0" opacity=".9" />
      {proj.slice(1).map((p, i) => (
        <g key={i}>
          <circle cx={xs(p[0])} cy={ys(p[1])} r="4" fill="#0c0c0e" stroke={GRN} strokeWidth="2" />
          {lab(xs(p[0]) + 8, ys(p[1]) + (i === 0 ? -8 : 14), `${ta.path[i].h} $${p[1].toFixed(2)}`, GRN)}
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
  const stamps = useMemo(() => taStamps(series, TA.reviewed, d?.price), [series, d]);
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
      <div style={{ margin: '4px 2px 0', color: 'var(--text-muted)', fontSize: 11, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Última actualización: <b style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{SEED.reviewed}</b> · datos de mercado en vivo</div>

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
      {/* DECISION CARD — qué hacer con esto */}
      {(() => {
        const px = d?.price; const st = chain?.staking; const ho = chain?.holders;
        const inv = px != null && (BEAR ? px > TA.invalidation.level : px < TA.invalidation.level);
        const supLine = (() => { const a = TA.structure.support.a, b = TA.structure.support.b; const m = (b[1] - a[1]) / (b[0] - a[0]); return a[1] + m * (Date.now() - a[0]); })();
        const zone = px == null ? null : px >= 0.85 ? 'target' : px > 0.7365 ? 'extended' : px >= TA.invalidation.level ? 'breakout' : px > 0.3947 ? 'failed' : 'broken';
        const Z = {
          target: ['EN LA MEDIDA DE LA BANDERA — zona de tomar parcial', GRN, 'Sobre 0.85. La medida al 61.8% del impulso está acá. Sin revenue pagado publicado, este es el lugar de vender otra parte, no de sumar.'],
          extended: ['NUEVOS MÁXIMOS — bandera resuelta arriba', GRN, 'Sobre 0.7365 (máximo del 5 Oct). El path alcista está intacto y acelerando; no es zona de entrar: el próximo nivel para sumar es el retest de 0.68–0.74 que aguante.'],
          breakout: ['SOBRE 0.5607 — bandera reconstruida, sesgo bajista anulado', GRN, 'Entre 0.5607 y 0.7365. El cierre bajo 0.49 del 19 Oct quedó como un barrido: el piso de la bandera se recuperó al cierre y el path alcista vuelve — 0.6836 (cierre del 7 Oct) y el retest de 0.7365. Sumar solo con 2× volumen y NOS subiendo más que SOL; sin eso, es un rebote largo.'],
          failed: ['0.49 CERRADO — sesgo bajista; el rebote es para reducir', RED, `Bajo 0.5607 y sobre 0.3947. La invalidación se cumplió al cierre del 19 Oct (0.4826): el impulso devolvió más de la mitad y el tramo fue rotación de sector. El rebote del 20 Oct (0.5493, +13.8% con el 74% del volumen) se frenó a 2% de 0.5607 y el 21 Oct devolvió la EMA20 (0.5271, −4%): las alzas a 0.5294–0.5607 (EMA20 y piso de la bandera) son para reducir; la EMA50 (0.4635) es el +1M y el máximo de junio (0.3947) el +3M; el rail del año está en ~${supLine.toFixed(3)}. Reabre el caso solo un cierre sobre 0.5607.`],
          broken: ['MÁXIMO DE JUNIO PERDIDO — de vuelta al triángulo', RED, 'Bajo 0.3947. Un impulso que se devuelve entero suele llegar al nivel del breakout: 0.3517 (EMA200) → 0.3125 → 0.2675. No promediar a la baja sin volumen de capitulación.'],
        };
        const z = zone ? Z[zone] : ['CARGANDO', 'var(--text-muted)', ''];
        const B = ({ c, children }) => <div style={{ display: 'flex', gap: 8, fontSize: 11.5, lineHeight: 1.5, marginTop: 4 }}><span style={{ color: c, fontWeight: 800 }}>›</span><span>{children}</span></div>;
        const H = ({ c, children }) => <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: c, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>{children}</div>;
        const bleed = st ? st.unstaking.nosRemaining / st.unstaking.nosTotal : null;
        return (
          <div style={{ marginTop: 14, border: `1px solid ${z[1]}`, borderRadius: 4, background: 'var(--surface)', padding: 14, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', fontFamily: "'JetBrains Mono',monospace" }}>
              <span style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Qué hacer con esto · hoy</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: z[1], letterSpacing: '.04em' }}>{z[0]}</span>
              {px != null && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>NOS {fmtPx(px)} · stance <b style={{ color: 'var(--text-primary)' }}>HOLD · TRIM-INTO-STRENGTH</b></span>}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 6 }}>{z[2]}</div>
            <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : 'repeat(3,1fr)', gap: 12, marginTop: 12, color: 'var(--text-secondary)' }}>
              <div>
                <H c={RED}>Si ya tenés NOS</H>
                <B c={RED}>El cierre bajo <b>0.49</b> se imprimió el 19 Oct (0.4826): el stop mental del plan se cumplió y el sesgo es bajista. El parcial de 0.47–0.49 del plan del 22 Sep ya se dio; lo que sigue es <b>reducir en el rebote a 0.5294–0.5607</b> (EMA20 y piso de la bandera) lo que no querés tener en 0.4635 — el rebote llegó: 0.5493 al cierre del 20 Oct (+13.8%, con el 74% del volumen) y ya devolvió: 0.5271 el 21 Oct, 0.4% bajo la EMA20. Fue exactamente ese lugar; si vuelve, es para lo mismo.</B>
                <B c={RED}><b>No se suma.</b> Un +14% en un día no deshace el cierre bajo 0.49: lo deshace un cierre sobre <b>0.5607</b> con 2× volumen ($2.3M), que es donde la bandera se reconstruye — el 20 Oct se quedó a 2% con $0.85M y el 21 Oct devolvió la EMA20 con $0.49M. Un rebote con tres cuartos del volumen desde el nivel que anuló la tesis fue cobertura de cortos con algo de demanda, no la rotación de vuelta.</B>
                <B c={RED}>Lo que quede después de reducir, con stop en el cierre bajo <b>0.4635</b> (EMA50, que coincide con el 61.8% del impulso, 0.4466): ahí el siguiente nivel es el máximo de junio (0.3947) y el rail del año en {supLine.toFixed(3)}.</B>
                <B c={RED}>Si estás staked 181–365d: ya pagaste el costo. No rompas el lock por el chart, ni para arriba ni para abajo.</B>
              </div>
              <div>
                <H c={GRN}>Si querés entrar</H>
                <B c={GRN}>No persigas el rebote: después de +175% en tres semanas la bandera se rompió por abajo, la EMA20 cedió, el 0.49 se cerró y la red está igual — comprás el sector, no el activo. El 20 Oct (+13.8% con SOL +1%) fue el primer día de demanda propia desde el 10 Oct — y el 21 Oct (−4% con SOL +1.3%) lo devolvió: NOS −3.8% en la semana con SOL −0.2%, la beta en contra de vuelta.</B>
                <B c={GRN}>Las entradas del plan (0.54–0.56 y 0.49–0.502) se cancelaron las dos. La próxima sigue siendo el retest de la <b>EMA50 (0.4635)</b> que aguante al cierre con vela de rechazo, volumen sobre $1.2M y NOS subiendo más que SOL: 25% de la posición objetivo, stop en el cierre bajo 0.4466 (61.8% del impulso). El rebote del 20 Oct no la tocó (mínimo 0.4826): no se adelanta.</B>
                <B c={GRN}>Entrada por fuerza: cierre diario &gt; <b>0.5607</b> (piso de la bandera recuperado) con 2× volumen, después &gt; 0.6836. Entrás más caro, pero con la bandera reconstruida y el sesgo de vuelta alcista.</B>
                <B c={GRN}>Nunca full size en un alt de $53M con $0.5M de volumen diario: tu orden es el libro.</B>
              </div>
              <div>
                <H c={AMB}>Lo que cambia la tesis</H>
                <B c={AMB}><b>Revenue pagado publicado</b> — el único dato que convierte esto en inversión y no en trade. Hoy: no existe.</B>
                <B c={AMB}>Compute hours volviendo sobre <b>150k/mes</b> (hoy ~{netHours ? fmtInt(netHours.latest) : '114k'}). Mientras cae, la red no valida el precio.</B>
                <B c={AMB}>{st ? <>Stake activo bajo <b>{(st.active.nos * 0.9 / 1e6).toFixed(1)}M</b> o las 12 ballenas empezando a deshacer → acelerar salida.</> : 'Stake activo cayendo o ballenas deshaciendo → acelerar salida.'}</B>
                <B c={AMB}>{ho ? <>Movimiento de las 3 wallets treasury-shaped ({(ho.treasuryLikeNos / 1e6).toFixed(0)}M NOS) hacia Gate/MEXC = salir sin esperar el chart.</> : 'Tesorería moviéndose a exchanges = salir.'}</B>
              </div>
            </div>
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text-muted)', display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'baseline' }}>
              <span>Niveles y triggers se recalculan con el precio vivo. Marco y sizing son del research de 10AMPRO, no consejo de inversión.</span>
              <a href="https://10am.pro?utm_source=nosana&utm_medium=decision&utm_campaign=hub" style={{ color: GRN, textDecoration: 'none', marginLeft: 'auto', fontFamily: "'JetBrains Mono',monospace" }}>más tesis en 10am.pro →</a>
            </div>
          </div>
        );
      })()}

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
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(245,158,11,.25)' }}>
                    <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, fontFamily: "'JetBrains Mono',monospace", marginBottom: 3 }}>Decisión</div>
                    <div>› El unstake ya no es argumento para vender: <b>no uses "el staking sangra" como razón</b>.</div>
                    <div>› Alerta real = las 3 wallets grandes moviéndose o el stake activo perforando {(st.active.nos * 0.9 / 1e6).toFixed(1)}M. <b>Eso sí es salir.</b></div>
                    <div>› {(ho.exchangeNos / 1e6).toFixed(1)}M en exchanges = ~{d?.price && series?.v?.length ? (ho.exchangeNos / ((series.v.slice(-20).reduce((a, b) => a + b, 0) / 20) / d.price)).toFixed(1) : '2'} días de volumen. Un breakdown tiene munición; <b>no compres el primer rebote bajo 0.22</b>.</div>
                  </div>
                </div>
              )}
              {chain.errors?.length > 0 && <div style={{ fontSize: 10.5, color: RED, marginTop: 8 }}>partial: {chain.errors.join(' · ')}</div>}
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Source: Solana RPC, read on every load — staking program <code>nosS…rTJE</code> (all StakeAccounts decoded) + largest token accounts of <code>nosX…oo7</code>. Exchange labels are community labels (Solscan), unverified. Cached 10 min.</div>
            </>
          );
        })()}
      </div>

      {/* RELATIVE + POSITIONING */}
      <Eyebrow dot="#8b5cf6">Relativo y posicionamiento — ¿se mueve solo o sigue a SOL? · beta · dominancia · funding</Eyebrow>
      <RelativeLayer cgId="nosana" symbol="NOS" mb={mb} />

      {/* TECHNICAL ANALYSIS */}
      <Eyebrow dot={GRN}>Technical analysis — NOS/USD 1D · forecast 1M / 3M / 1Y · read {TA.reviewed}</Eyebrow>
      <div style={{ border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: 16 }}>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{TA.read}</div>
        {/* LIVE TREND */}
        {(() => {
          const t = trend;
          const col = !t ? 'var(--text-muted)' : t.score >= 5 ? GRN : t.score === 4 ? AMB : RED;
          const inv = d?.price != null && (BEAR ? d.price > TA.invalidation.level : d.price < TA.invalidation.level);
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
                <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: inv ? RED : GRN }}>
                  FORECAST {BEAR ? 'BEAR' : 'BULL'} · {inv ? (BEAR ? 'INVALIDATED ›' : 'INVALIDATED ‹') : (BEAR ? 'INTACT ‹' : 'INTACT ›')} ${TA.invalidation.level}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 10.5, color: 'var(--text-muted)', marginTop: 8 }}>
                <span>Data through <b style={{ color: 'var(--text-primary)' }}>{stamps.dataThrough}</b> close</span>
                <span>Chart built <b style={{ color: 'var(--text-primary)' }}>{stamps.builtOn}</b></span>
                <span>Editor read <b style={{ color: 'var(--text-primary)' }}>{TA.reviewed}</b>{stamps.daysAgo != null ? ` (${stamps.daysAgo}d ago)` : ''}</span>
                {stamps.atRead != null && <span>Price at read <b style={{ color: 'var(--text-primary)' }}>${stamps.atRead.toFixed(4)}</b>{stamps.sinceRead != null ? <> · since read <b style={{ color: stamps.sinceRead >= 0 ? GRN : RED }}>{pc(stamps.sinceRead)}</b></> : null}</span>}
              </div>
              {t && (
                <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(2,1fr)' : 'repeat(6,1fr)', gap: 8, marginTop: 10 }}>
                  {tile('EMA stack', `${t.last > t.e20 ? '▲' : '▼'}20 ${t.last > t.e50 ? '▲' : '▼'}50 ${t.last > t.e200 ? '▲' : '▼'}200`, `${t.e20.toFixed(3)} · ${t.e50.toFixed(3)} · ${t.e200.toFixed(3)}`, t.last > t.e200 ? GRN : RED)}
                  {tile('EMA200 slope', pc(t.slope200), '20d change', t.slope200 > 0 ? GRN : RED)}
                  {tile('MACD histo', (t.hist >= 0 ? '+' : '') + t.hist.toFixed(4), t.histUp ? 'rising' : 'falling', t.hist > 0 ? GRN : RED)}
                  {tile('RSI 14', t.rsi.toFixed(0), t.rsi > 70 ? 'overbought' : t.rsi < 30 ? 'oversold' : 'neutral zone', t.rsi > 50 ? GRN : RED)}
                  {tile('7d / 30d', `${pc(t.chg7)} / ${pc(t.chg30)}`, 'momentum', t.chg30 > 0 ? GRN : RED)}
                  {tile('vs path', d?.price ? pc(d.price / TA.path[0].target - 1) : '—', 'vs +1M target', 'var(--text-primary)')}
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
            <span style={{ marginLeft: 'auto' }}>365d daily closes · log scale · volume at base · as of {stamps.dataThrough}</span>
          </div>
          <TAStructure series={series} ta={TA} mb={mb} />
        </div>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 10, fontSize: 11.5, lineHeight: 1.55, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
          <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
            <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>Pattern read</div>
            <b>Impulso vertical, bandera rota por abajo, el 0.49 cerrado y un rebote que se frenó bajo el piso de la bandera.</b> Breakout del triángulo el 21 Sep (0.3125) → 0.49 el 1 Oct → 0.7365 el 5 Oct, sin un solo cierre debajo de la EMA20 en el camino: la medida del triángulo (0.47) se pasó en un 57%. Desde el 5 Oct: máximos decrecientes 0.7365 → 0.6836 → 0.6016, el piso de la bandera (0.5607) perdido el 13 Oct, la EMA20 perdida el 16 Oct (0.5084), dos cierres planos debajo de ella (0.5174, 0.5087) y el 19 Oct el cierre bajo 0.49 (0.4826), con el 54% del impulso devuelto. El 20 Oct +13.8% a 0.5493: de vuelta sobre 0.49, la mitad del impulso (0.502) y la EMA20 (entonces 0.53) en una sola vela, con el 74% del volumen, y frenado 2% debajo de 0.5607 — el retest del piso de la bandera desde abajo, no la vuelta; el 21 Oct 0.5271 (−4%), devolviendo la EMA20 (0.5294) por 0.4% con la mitad del volumen. Lo que sigue si el rebote falla es la EMA50 (0.4635), que coincide con el 61.8% del impulso (0.4466), y después el máximo de junio (0.3947). La medida al 61.8% (0.85) vuelve a valer solo si el precio reconstruye la bandera sobre 0.5607 — la completa (1.03) no se usa para un alt de $53M.
            <div style={{ marginTop: 6 }}><b>El 0.49 se cerró; la regla se cumplió.</b> La lectura del 18 Oct ya se había escrito como si hubiera pasado — y pasó: 0.4826 al cierre, la cuarta vez en el mes que un nivel tocado así en esta página se cierra en la siguiente sesión (SOL 105, JUP 0.31, 2Z 0.0315, NOS 0.49). El rebote del 20 Oct a 0.5493 no lo deshace: la regla es simétrica, y lo que deshace un cierre bajo 0.49 es un cierre sobre 0.5607 — se quedó a 2%, que en esta página no se escribe como cumplido (eso es menos de 1%). A favor: EMA50 (0.4635) sobre EMA200 (0.3517), la 200 subiendo 16% en 20 días, el precio sobre la 50 y la 200, el MACD achicándose tres sesiones y el RSI en 41. En contra: la bandera resolvió abajo, la invalidación se cerró, el rebote llegó con $0.85M (74% del promedio) cuando la secuencia pedía $1.2M+, se frenó bajo 0.5607 y devolvió la EMA20 al cierre siguiente con $0.49M — mientras la red no cambió: compute hours bajo 150k, revenue pagado sin publicar.</div>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
            <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>What to watch this week</div>
            <b>Volumen.</b> {trend?.volRatio != null ? `El promedio de 20 días está en ${Math.round(trend.volRatio * 100)}% del de 90 días — ${trend.volRatio < 0.85 ? 'se está secando: el breakout se queda sin combustible' : trend.volRatio > 1.2 ? 'expandido: el movimiento tiene combustible' : 'plano'}.` : 'Cargando…'} El retest sano viene con volumen cayendo; un retest con volumen creciente es distribución.
            <div style={{ marginTop: 6 }}><b>Secuencia que anula el sesgo bajista:</b> 0.49, 0.502 y la EMA20 (<b>0.5294</b>) recuperados al cierre del 20 Oct — sin el volumen que pedía ($0.85M contra $1.2M) — y la EMA20 devuelta el 21 Oct por 0.4% → recuperarla al cierre con $1.2M+ → cierre sobre <b>0.5607</b> (piso de la bandera) con 2× volumen = invalidación bajista cumplida y bandera reconstruida → <b>0.6836</b> (techo del pullback) → retest de 0.7365. Hasta 0.5607 cada escalón es un lugar para reducir, no para sumar; desde 0.5607 cada escalón es un punto para sumar el 25% de la posición objetivo. El 0.85 vuelve al mapa solo con la bandera reconstruida.</div>
            <div style={{ marginTop: 6 }}><b>Secuencia que lo confirma:</b> el rebote a 0.5493 falló bajo 0.5607 con el 74% del volumen → la EMA20 (0.5294) perdida al cierre del 21 Oct por 0.4% (0.5271) → cierre bajo <b>0.49</b> de vuelta → <b>0.4635</b> (EMA50 = 61.8% del impulso, el +1M) → 0.3947 (máximo de junio, el +3M). Un impulso parabólico que devolvió el 54% suele devolverlo entero; con $1.5M+ de volumen bajo 0.4635, 0.3947 llega rápido. <b>Relativo:</b> NOS −3.8% vs SOL −0.2% en la semana: el +13.8% del 20 Oct (SOL +1% ese día) fue el único día verde propio desde el 10 Oct, y el 21 Oct (−4% con SOL +1.3%) lo devolvió. La rotación de sector no volvió; el rebote fue cobertura.</div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(245,158,11,.25)' }}>
              <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, fontFamily: "'JetBrains Mono',monospace", marginBottom: 3 }}>Decisión</div>
              <div>› Con posición: <b>reducir en el rebote a 0.5294–0.5607; no sumar</b>. El cierre bajo 0.49 se imprimió (0.4826): el impulso devolvió la mitad y fue rotación de sector. El rebote llegó (0.5493 el 20 Oct), se frenó 2% bajo 0.5607 con el 74% del volumen y el 21 Oct (0.5271) devolvió la EMA20: era el lugar de reducir, no la vuelta; lo que quede, con stop en el cierre bajo 0.4635.</div>
              <div>› Sin posición: <b>nada</b>. Las dos entradas del plan se cancelaron. La próxima es el retest de la EMA50 (0.4635) que aguante al cierre con vela de rechazo y volumen sobre $1.2M, 25% del tamaño objetivo; o el cierre sobre 0.5607 con 2× volumen ($2.3M). Perseguir un +14% con tres cuartos del volumen que al día siguiente devolvió la media es pagar el libro vacío, no el sector de vuelta.</div>
              <div>› Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.5607</b> (piso de la bandera) con 2× volumen. Ahí el 19 Oct fue un barrido, la bandera se reconstruye y el path alcista vuelve: 0.6836 → 0.7365.</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14, border: '1px solid var(--border)', borderRadius: 4, padding: '8px 4px 4px' }}>
          <div style={{ display: 'flex', gap: 14, fontSize: 10.5, padding: '0 10px 4px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span style={{ color: BEAR ? RED : GRN, fontWeight: 800, letterSpacing: '.1em' }}>BIAS: {TA.bias}</span>
            <span><span style={{ color: BEAR ? RED : GRN }}>▬</span> forecast path</span>
            <span><span style={{ color: RED }}>╌</span> invalidation</span>
            <span style={{ marginLeft: 'auto' }}>path set <b style={{ color: 'var(--text-primary)' }}>{TA.reviewed}</b>{stamps.atRead != null ? ` at $${stamps.atRead.toFixed(4)}` : ''} · log scale · x = √time · shade = tolerance</span>
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
                  <span style={{ fontSize: 18, fontWeight: 800, color: BEAR ? RED : GRN }}>${p.target.toFixed(2)} <span style={{ fontSize: 10.5, fontWeight: 500, color: 'var(--text-muted)' }}>{px ? `${p.target / px - 1 >= 0 ? '+' : ''}${Math.round((p.target / px - 1) * 100)}%` : ''}</span></span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{p.how}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 10, padding: '9px 12px', border: `1px solid ${RED}`, borderRadius: 4, background: 'rgba(239,68,68,.06)', fontSize: 11.5, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
          <b style={{ color: RED, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.08em' }}>INVALIDATION ·</b> {TA.invalidation.text}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 10, marginTop: 12 }}>
          {[['Resistance', TA.levels.resistance, RED], ['Support', TA.levels.support, GRN]].map(([t, L, col]) => (
            <div key={t}>
              <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: col, marginBottom: 4 }}>{t}</div>
              {L.map(([lv, why]) => (
                <div key={lv} style={{ display: 'flex', gap: 10, fontSize: 11.5, padding: '3px 0', color: 'var(--text-muted)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', minWidth: 58 }}>${lv.toFixed(lv < 0.5 ? 4 : 2)}</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{why}</span>
                  {d?.price ? <span style={{ marginLeft: 'auto', fontSize: 10.5 }}>{lv / d.price - 1 >= 0 ? '+' : ''}{Math.round((lv / d.price - 1) * 100)}%</span> : null}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 12, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Editor read: {TA.reviewed}{stamps.atRead != null ? ` at $${stamps.atRead.toFixed(4)}` : ''}. Regime and structure are recalculated live. % shown is distance from the live price, not from the price on the read date. Daily series through {stamps.dataThrough}; chart built {stamps.builtOn}. Refreshed manually on each thesis review. Not investment advice.</div>
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
      <Eyebrow>Thesis tripwires — materialization checklist (from due-diligence) · last review {SEED.reviewed} · stance: hold · trim-into-strength</Eyebrow>
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
        <b style={{ color: 'var(--text-secondary)' }}>Cómo leer los tripwires.</b> ✓ = la tesis se confirma en ese eje · ! = se rompe · ◦ = sin datos concluyentes. Regla de 10AMPRO: <b>dos "!" simultáneos en compute hours y hosts = reducir sin esperar el chart</b>; revenue pagado publicado = subir la posición aunque el chart esté feo.<br/>
        <b style={{ color: 'var(--text-secondary)' }}>Note.</b> Completed jobs / compute hours include incentivized, grant and charity (Folding@Home) activity — not a clean paid-revenue signal. La campana RTX 4090/5090 (17 Sep 2026) paga el equivalente a 20% de utilizacion diaria: demanda incentivada por Nosana, no organica — descontala del growth que veas arriba. Watch the tripwires for real materialization. Data & research context, not investment advice.
        <div style={{ marginTop: 12 }}>
          <a href="https://10am.pro?utm_source=nosana&utm_medium=footer&utm_campaign=hub" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>← 10am.pro</a>
        </div>
      </div>
    </div>
  );
}
const td = (first) => ({ textAlign: first ? 'left' : 'right', padding: '7px 8px', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' });
