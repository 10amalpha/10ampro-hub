'use client';
import { useEffect, useMemo, useState } from 'react';
import { computeTrend, autoStructure, buildForecast } from '../lib/thesis/ta';
import { TAStructure, TAFan } from '../lib/thesis/TACharts';
import { EDITOR_TA } from './ta.editor';

// ============================================================
// ANÁLISIS TÉCNICO — same engine as the Solana hubs (lib/thesis/ta.js):
// live regime (EMA stack · MACD · RSI · volume) + auto-structure (pivot trendlines,
// measured moves) + directional forecast 1M / 3M / 1Y with explicit invalidation.
// Optional editor read per ticker lives in ./ta.editor.js and overrides bias/path/invalidation.
// Series: /api/equity/[sym] (Yahoo daily, 2y).
// ============================================================

const GRN = '#22c55e', AMB = '#f59e0b', RED = '#ef4444';
const MONO = "'JetBrains Mono',monospace", SANS = "'Plus Jakarta Sans',sans-serif";
const fmtPx = (n) => (n == null || isNaN(n) ? '—' : '$' + (n >= 1 ? n.toFixed(2) : Number(n).toPrecision(3)));
const pc = (x, d = 1) => (x == null || isNaN(x) ? '—' : `${x >= 0 ? '+' : ''}${(x * 100).toFixed(d)}%`);
const dayLabel = (ms) => new Date(ms).toLocaleDateString('es', { day: '2-digit', month: 'short' });

// equity wording for the auto forecast (crypto hubs keep their own)
const HOW = (dir, x) => (dir === 'BEAR'
  ? [`Rechazo en ${fmtPx(Math.max(x.e200 || 0, x.res || 0))} → pierde el clúster de EMAs → ${fmtPx(x.t1)}.`, `Cede el riel inferior de la estructura → ${fmtPx(x.t3)}. Ventana de catalizador: próximo earnings / lectura clínica o regulatoria.`, `Retest de mínimos del ciclo. Sin aceleración de ingresos o dato clínico, perfora a ${fmtPx(x.t12)}.`]
  : [`Aguanta el clúster de EMAs → recupera ${fmtPx(x.t1)}.`, `Rompe el riel superior → ${fmtPx(x.t3)}. Necesita volumen ≥2× el promedio en la ruptura.`, `Zona de oferta del ciclo anterior. Requiere que los fundamentales (ingresos, FCF, datos clínicos) confirmen el precio.`]);

function analyze(series, ed) {
  if (!series || series.c.length < 60) return { trend: null, st: null, fc: null };
  const trend = computeTrend(series.c, series.v);
  const st = autoStructure(series);
  const auto = buildForecast(trend, st, series, { ath: Math.max(...series.c), how: HOW });
  const fc = ed && trend ? { dir: ed.bias === 'BEAR' ? 'BEAR' : 'BULL', path: ed.path.map((q) => ({ ...q })), invalidation: ed.invalidation.level, generated: ed.updated, editorial: true } : auto;
  return { trend, st, fc };
}

export default function BioTA({ tickers, mb, sectionLabel }) {
  const syms = tickers.map((t) => t.sym);
  const [data, setData] = useState({});
  const [active, setActive] = useState(syms[0]);

  useEffect(() => {
    syms.forEach(async (s) => {
      try {
        const j = await (await fetch(`/api/equity/${s}`)).json();
        setData((p) => ({ ...p, [s]: j.ok ? { ...j, series: { t: j.t, c: j.c, v: j.v } } : { ok: false, error: j.error } }));
      } catch (e) { setData((p) => ({ ...p, [s]: { ok: false, error: 'fetch failed' } })); }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const all = useMemo(() => {
    const o = {};
    syms.forEach((s) => { const d = data[s]; o[s] = d?.ok ? { ...analyze(d.series, EDITOR_TA[s]), d } : { d }; });
    return o;
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const A = all[active] || {}; const { trend, st, fc, d } = A; const ed = EDITOR_TA[active] || null;
  const price = d?.price;
  const invd = (x) => x.fc && x.d?.price != null && (x.fc.dir === 'BEAR' ? x.d.price > x.fc.invalidation : x.d.price < x.fc.invalidation);
  const fcCol = fc?.dir === 'BEAR' ? RED : GRN;
  const panel = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: mb ? '12px 10px' : '14px 16px' };
  const tile = (k, v, sub, c) => <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '8px 10px', minWidth: 0 }}><div style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: MONO }}>{k}</div><div style={{ fontSize: 15, fontWeight: 800, marginTop: 3, color: c || 'var(--text-primary)', fontFamily: MONO }}>{v}</div>{sub ? <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2, fontFamily: MONO }}>{sub}</div> : null}</div>;
  const box = { border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' };
  const hdr = (txt, c = AMB) => <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: c, marginBottom: 6, fontFamily: MONO }}>{txt}</div>;
  const layerOf = (s) => tickers.find((t) => t.sym === s);

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={sectionLabel}>ANÁLISIS TÉCNICO · forecast 1M / 3M / 1Y · 9 tickers · datos en vivo</div>
      <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontFamily: SANS, lineHeight: 1.6, marginBottom: 12 }}>
        El mismo motor que usamos en los hubs de Solana: régimen de tendencia (7 checks), estructura detectada por pivots, y un path direccional con invalidación explícita. Se recalcula con cada carga. Tocá un ticker para ver el chart completo.
      </div>

      {/* BOARD */}
      <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '58px 1fr 64px 70px' : '64px 76px 1fr 72px 78px 78px 78px 86px', gap: 8, padding: '8px 12px', background: 'var(--surface-2)', fontSize: 9.5, letterSpacing: '.1em', color: 'var(--text-muted)', fontFamily: MONO }}>
          <span>TICKER</span>{!mb && <span>PRECIO</span>}<span>RÉGIMEN</span>{!mb && <span>BIAS</span>}<span style={{ textAlign: 'right' }}>1M</span>{!mb && <span style={{ textAlign: 'right' }}>3M</span>}{!mb && <span style={{ textAlign: 'right' }}>1Y</span>}<span style={{ textAlign: 'right' }}>INVALID.</span>
        </div>
        {syms.map((s) => {
          const x = all[s] || {}; const on = s === active; const col = !x.trend ? 'var(--text-muted)' : x.trend.score >= 5 ? GRN : x.trend.score === 4 ? AMB : RED; const fcc = x.fc?.dir === 'BEAR' ? RED : GRN; const bad = invd(x);
          const tgt = (i) => (x.fc && x.d?.price ? <span style={{ color: fcc }}>{pc(x.fc.path[i].target / x.d.price - 1, 0)}</span> : <span style={{ color: 'var(--text-muted)' }}>—</span>);
          return (
            <button key={s} onClick={() => setActive(s)} style={{ display: 'grid', width: '100%', textAlign: 'left', gridTemplateColumns: mb ? '58px 1fr 64px 70px' : '64px 76px 1fr 72px 78px 78px 78px 86px', gap: 8, alignItems: 'center', padding: '9px 12px', border: 0, borderTop: '1px solid var(--border-subtle)', background: on ? 'rgba(34,197,94,.07)' : 'var(--surface)', cursor: 'pointer', fontFamily: MONO, fontSize: 12, color: 'var(--text-primary)', boxShadow: on ? `inset 3px 0 0 ${GRN}` : 'none' }}>
              <span><b style={{ color: 'var(--text-bright)' }}>{s}</b>{mb && <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{fmtPx(x.d?.price)}</div>}</span>
              {!mb && <span>{fmtPx(x.d?.price)}</span>}
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                {x.trend ? <><span style={{ display: 'flex', gap: 2 }}>{x.trend.checks.map((c, i) => <span key={i} style={{ width: mb ? 5 : 8, height: 6, borderRadius: 1, background: c[1] ? col : 'rgba(128,128,128,.2)' }} />)}</span><span style={{ fontSize: 10, color: col, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mb ? `${x.trend.score}/7` : x.trend.regime}</span></> : <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{x.d && !x.d.ok ? 'sin datos' : x.d?.ok ? 'historia corta' : 'cargando…'}</span>}
              </span>
              {!mb && <span style={{ fontSize: 10.5, fontWeight: 800, color: x.fc ? fcc : 'var(--text-muted)' }}>{x.fc ? x.fc.dir : '—'}{EDITOR_TA[s] ? <span title="lectura del editor" style={{ color: AMB }}> ✎</span> : null}</span>}
              <span style={{ textAlign: 'right' }}>{tgt(0)}</span>
              {!mb && <span style={{ textAlign: 'right' }}>{tgt(1)}</span>}
              {!mb && <span style={{ textAlign: 'right' }}>{tgt(2)}</span>}
              <span style={{ textAlign: 'right', fontSize: 11, color: bad ? (x.fc.dir === 'BEAR' ? GRN : RED) : 'var(--text-secondary)' }}>{x.fc ? fmtPx(x.fc.invalidation) : '—'}{bad ? ' ✕' : ''}</span>
            </button>
          );
        })}
      </div>

      {/* DETAIL */}
      <div style={panel}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 10, fontFamily: MONO }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-bright)' }}>{active}</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{layerOf(active)?.name} · {layerOf(active)?.layer} · /USD 1D</span>
          {price != null && <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>{fmtPx(price)} <span style={{ fontSize: 11, color: d.chg >= 0 ? GRN : RED }}>{d.chg != null ? `${d.chg >= 0 ? '+' : ''}${d.chg.toFixed(2)}%` : ''}</span></span>}
          <span style={{ marginLeft: 'auto', fontSize: 10.5, color: 'var(--text-muted)' }}>{ed ? <>lectura del editor <b style={{ color: 'var(--text-primary)' }}>{ed.updated}</b> · régimen y estructura en vivo</> : <>auto-structure · generado {fc?.generated || '…'}</>}</span>
        </div>

        {!d && <div style={{ color: 'var(--text-muted)', fontSize: 12, padding: 20, fontFamily: MONO }}>cargando serie diaria…</div>}
        {d && !d.ok && <div style={{ color: AMB, fontSize: 12, padding: 20, fontFamily: MONO }}>Feed de precios no disponible ahora ({d.error}). Reintentá en unos minutos.</div>}
        {d?.ok && !trend && <div style={{ color: 'var(--text-muted)', fontSize: 12, padding: 20, fontFamily: SANS }}>{active} tiene {d.bars} sesiones de historia pública — el motor necesita al menos 60 para calcular EMAs, MACD y RSI con sentido. El forecast aparece solo cuando la serie lo permite.</div>}

        {ed && trend && <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: SANS, marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: ed.read }} />}

        {trend && (() => { const t = trend; const col = t.score >= 5 ? GRN : t.score === 4 ? AMB : RED; const bad = invd(A); return (
          <div style={{ border: `1px solid ${col}`, borderRadius: 4, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', fontFamily: MONO }}>
              <div style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Tendencia · en vivo</div>
              <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '.06em', color: col }}>{t.regime}</div>
              <div style={{ display: 'flex', gap: 3 }}>{t.checks.map((x, i) => <span key={i} title={x[0]} style={{ width: 14, height: 6, borderRadius: 2, background: x[1] ? col : 'rgba(128,128,128,.2)' }} />)}</div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.score}/7 checks alcistas</span>
              {fc && <div style={{ marginLeft: mb ? 0 : 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: bad ? (fc.dir === 'BEAR' ? GRN : RED) : fcCol }}>FORECAST {fc.dir} · {bad ? 'INVALIDADO' : 'INTACTO'} {fc.dir === 'BEAR' ? '‹' : '›'} {fmtPx(fc.invalidation)}</div>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(2,1fr)' : 'repeat(6,1fr)', gap: 8, marginTop: 10 }}>
              {tile('EMA stack', `${t.last > t.e20 ? '▲' : '▼'}20 ${t.last > t.e50 ? '▲' : '▼'}50 ${t.last > t.e200 ? '▲' : '▼'}200`, `${fmtPx(t.e20)} · ${fmtPx(t.e50)} · ${fmtPx(t.e200)}`, t.last > t.e200 ? GRN : RED)}
              {tile('EMA200 slope', pc(t.slope200), 'cambio 20d', t.slope200 > 0 ? GRN : RED)}
              {tile('MACD histo', (t.hist >= 0 ? '+' : '') + t.hist.toPrecision(2), t.histUp ? 'subiendo' : 'bajando', t.hist > 0 ? GRN : RED)}
              {tile('RSI 14', t.rsi.toFixed(0), t.rsi > 70 ? 'sobrecomprado' : t.rsi < 30 ? 'sobrevendido' : 'zona neutral', t.rsi > 50 ? GRN : RED)}
              {tile('7d / 30d', `${pc(t.chg7, 0)} / ${pc(t.chg30, 0)}`, 'momentum', t.chg30 > 0 ? GRN : RED)}
              {tile('Volumen 20d/90d', t.volRatio != null ? `${Math.round(t.volRatio * 100)}%` : '—', t.volRatio == null ? '' : t.volRatio < 0.85 ? 'secándose' : t.volRatio > 1.2 ? 'expandiendo' : 'plano', t.volRatio > 1.2 ? GRN : 'var(--text-primary)')}
            </div>
          </div>); })()}

        {trend && <div style={{ marginTop: 14, border: '1px solid var(--border)', borderRadius: 4, padding: '8px 4px 4px' }}>
          <div style={{ display: 'flex', gap: 14, fontSize: 10.5, padding: '0 10px 4px', color: 'var(--text-muted)', flexWrap: 'wrap', fontFamily: MONO }}>
            <span style={{ color: AMB, fontWeight: 800, letterSpacing: '.1em' }}>ESTRUCTURA · {(st?.pattern || (d.bars < 90 ? 'historia corta' : 'detectando…')).toUpperCase()}</span>
            <span><span style={{ color: RED }}>╌</span> máximos</span><span><span style={{ color: GRN }}>╌</span> mínimos</span>
            {!mb && <span style={{ marginLeft: 'auto' }}>cierres diarios · log · volumen en la base</span>}
          </div>
          <TAStructure key={active} series={d.series} st={st} fc={fc} mb={mb} minBars={60} />
        </div>}

        {ed && trend && <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 10, fontSize: 12, lineHeight: 1.55, color: 'var(--text-secondary)', fontFamily: SANS }}>
          <div style={box}>{hdr('Lectura del patrón · editor')}<div dangerouslySetInnerHTML={{ __html: ed.pattern }} />
            {st && <div style={{ marginTop: 6, color: 'var(--text-muted)', fontSize: 11 }}>Auto-structure en vivo: {st.pattern.toLowerCase()}{st.resNow ? ` · techo ${fmtPx(st.resNow)}` : ''}{st.supNow ? ` · piso ${fmtPx(st.supNow)}` : ''} · EMA20 {fmtPx(trend.e20)} · EMA50 {fmtPx(trend.e50)} · EMA200 {fmtPx(trend.e200)}.</div>}</div>
          <div style={box}>{hdr('Qué mirar')}<div dangerouslySetInnerHTML={{ __html: ed.watch }} />
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(245,158,11,.25)' }}>{hdr('Decisión')}{ed.decision.map((x, i) => <div key={i} dangerouslySetInnerHTML={{ __html: '› ' + x }} />)}</div></div>
        </div>}

        {!ed && trend && fc && <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 10, fontSize: 12, lineHeight: 1.55, color: 'var(--text-secondary)', fontFamily: SANS }}>
          <div style={box}>{hdr('Lectura del patrón')}
            {st ? <><b>{st.pattern}.</b> {st.res ? `Techo desde ${fmtPx(st.res.a[1])} (${dayLabel(st.res.a[0])}), ${st.res.touches} toques, hoy en ${fmtPx(st.resNow)}.` : 'Sin línea de resistencia válida en la ventana.'} {st.sup ? `Piso desde ${fmtPx(st.sup.a[1])} (${dayLabel(st.sup.a[0])}), ${st.sup.touches} toques, hoy en ${fmtPx(st.supNow)}.` : 'Sin línea de soporte válida.'} {st.apexT ? `Ápex ~${dayLabel(st.apexT)} — las rupturas antes del ápex valen; después el patrón se degrada.` : ''} Medida: {fmtPx(st.measured.up)} arriba / {fmtPx(st.measured.down)} abajo.</> : <>Historia insuficiente para trazar estructura con pivots (necesita ~90 sesiones). El forecast usa solo régimen y niveles de la serie disponible.</>}
            <div style={{ marginTop: 6 }}><b>Contexto.</b> La EMA200 está {trend.last > trend.e200 ? 'debajo' : 'encima'} del precio y {trend.slope200 > 0 ? 'subiendo' : 'bajando'}; EMA50 {trend.e50 > trend.e200 ? 'sobre' : 'bajo'} la EMA200. {trend.last < trend.e200 && trend.slope200 < 0 ? 'Eso es consolidación en mercado bajista, no una base — los patrones de continuación resuelven con la tendencia previa ~2:1.' : trend.last > trend.e200 && trend.slope200 > 0 ? 'Estructura de tendencia constructiva; los pullbacks al clúster de EMAs se compran mientras aguante la secuencia de mínimos crecientes.' : 'Régimen mixto — dejá que la estructura resuelva antes de poner tamaño.'}</div>
          </div>
          <div style={box}>{hdr('Qué mirar')}
            <b>Volumen.</b> {trend.volRatio != null ? `El promedio de 20d está en ${Math.round(trend.volRatio * 100)}% del de 90d — ${trend.volRatio < 0.85 ? 'secándose, compresión clásica antes de una ruptura' : trend.volRatio > 1.2 ? 'expandiendo, hay un movimiento en curso' : 'plano'}.` : ''} Una ruptura válida necesita ≥2× volumen promedio ese día.
            <div style={{ marginTop: 6 }}><b>{fc.dir === 'BEAR' ? 'Secuencia que confirma el path bajista' : 'Secuencia que confirma el path alcista'}:</b> {fc.dir === 'BEAR' ? `cierre bajo EMA20 (${fmtPx(trend.e20)}) → pierde el piso (${fmtPx(st?.supNow || trend.e50)}) → falla el retest → ${fmtPx(fc.path[0].target)}.` : `aguanta EMA20 (${fmtPx(trend.e20)}) → rompe el techo (${fmtPx(st?.resNow || fc.path[0].target)}) con volumen → aguanta el retest → ${fmtPx(fc.path[0].target)}.`}</div>
            <div style={{ marginTop: 6 }}><b>Qué lo da vuelta:</b> cierre diario {fc.dir === 'BEAR' ? 'sobre' : 'bajo'} <b>{fmtPx(fc.invalidation)}</b> con volumen.</div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(245,158,11,.25)' }}>{hdr('Decisión')}
              <div>› Con posición: {fc.dir === 'BEAR' ? <><b>reducir en rebotes a {fmtPx(st?.resNow || trend.e200)}</b>.</> : <><b>mantener mientras aguante {fmtPx(st?.supNow || trend.e50)}</b>; sumar solo en retest.</>}</div>
              <div>› Sin posición: <b>esperar la resolución</b>. Comprar dentro del patrón es pagar por incertidumbre.</div>
              <div>› Trigger único: <b>cierre diario {fc.dir === 'BEAR' ? '>' : '<'} {fmtPx(fc.invalidation)} con 2× volumen</b> anula el sesgo.</div>
            </div>
          </div>
        </div>}

        {fc && trend && <>
          <div style={{ marginTop: 14, border: '1px solid var(--border)', borderRadius: 4, padding: '8px 4px 4px' }}>
            <div style={{ display: 'flex', gap: 14, fontSize: 10.5, padding: '0 10px 4px', color: 'var(--text-muted)', flexWrap: 'wrap', fontFamily: MONO }}>
              <span style={{ color: fcCol, fontWeight: 800, letterSpacing: '.1em' }}>BIAS: {fc.dir}ISH</span><span><span style={{ color: fcCol }}>▬</span> path</span><span><span style={{ color: fc.dir === 'BEAR' ? GRN : RED }}>╌</span> invalidación</span>
              {!mb && <span style={{ marginLeft: 'auto' }}>log · x = √tiempo · sombra = tolerancia</span>}
            </div>
            <TAFan key={active} price={price} fc={fc} mb={mb} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : 'repeat(3,1fr)', gap: 10, marginTop: 14 }}>
            {fc.path.map((p) => <div key={p.h} style={box}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: MONO }}><span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.08em', color: 'var(--text-secondary)' }}>{p.h}</span><span style={{ fontSize: 18, fontWeight: 800, color: fcCol }}>{fmtPx(p.target)} <span style={{ fontSize: 10.5, fontWeight: 500, color: 'var(--text-muted)' }}>{price ? pc(p.target / price - 1, 0) : ''}</span></span></div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5, fontFamily: SANS }}>{p.how}</div>
            </div>)}
          </div>
          {ed && <>
            <div style={{ marginTop: 10, padding: '9px 12px', border: `1px solid ${fc.dir === 'BEAR' ? GRN : RED}`, borderRadius: 4, fontSize: 12, color: 'var(--text-secondary)', fontFamily: SANS }}>
              <b style={{ color: fc.dir === 'BEAR' ? GRN : RED, fontFamily: MONO, letterSpacing: '.08em' }}>INVALIDACIÓN ·</b> {ed.invalidation.text}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 10, marginTop: 12 }}>
              {[['Resistencia', ed.levels.resistance, RED], ['Soporte', ed.levels.support, GRN]].map(([t, L, col]) => <div key={t}>
                <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: col, marginBottom: 4, fontFamily: MONO }}>{t}</div>
                {L.map(([lv, why]) => <div key={lv} style={{ display: 'flex', gap: 10, fontSize: 11.5, padding: '3px 0', color: 'var(--text-muted)' }}><span style={{ fontWeight: 700, color: 'var(--text-primary)', minWidth: 64, fontFamily: MONO }}>{fmtPx(lv)}</span><span style={{ fontFamily: SANS }}>{why}</span>{price ? <span style={{ marginLeft: 'auto', fontSize: 10.5, fontFamily: MONO }}>{pc(lv / price - 1, 0)}</span> : null}</div>)}
              </div>)}
            </div>
          </>}
        </>}
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12, fontFamily: SANS, lineHeight: 1.5 }}>{ed ? `Lectura manual del editor (${ed.updated}) con invalidación explícita; régimen y estructura se recalculan en vivo en cada carga.` : 'Forecast generado en vivo desde el régimen + estructura auto-detectada (EMA stack, MACD, RSI, trendlines por pivots, medidas). Los targets se anclan a niveles reales.'} % = distancia al precio en vivo. Precios diarios ajustados (Yahoo). No es consejo de inversión.</div>
      </div>
    </div>
  );
}
