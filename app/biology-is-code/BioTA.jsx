'use client';
import { useEffect, useMemo, useState } from 'react';
import { computeTrend, autoStructure, buildForecast } from '../lib/thesis/ta';
import { TAStructure, TAFan } from '../lib/thesis/TACharts';
import { EDITOR_TA } from './ta.editor';

// Live TA for the Biology is Code dossier — same engine as the Solana hubs (lib/thesis/ta.js).
// useBioData(): fetches /api/equity/[sym] for every ticker once, returns { sym: { d, trend, st, fc } }.
// TAModule: the technical block inside a ticker dossier (editor read + live regime + structure/forecast chart + plan).

const GRN = '#22c55e', AMB = '#f59e0b', RED = '#ef4444';
const MONO = "'JetBrains Mono',monospace", SANS = "'Plus Jakarta Sans',sans-serif";
export const fmtPx = (n) => (n == null || isNaN(n) ? '—' : '$' + (n >= 1 ? n.toFixed(2) : Number(n).toPrecision(3)));
export const pc = (x, d = 1) => (x == null || isNaN(x) ? '—' : `${x >= 0 ? '+' : ''}${(x * 100).toFixed(d)}%`);

const HOW = (dir, x) => (dir === 'BEAR'
  ? [`Rechazo en ${fmtPx(Math.max(x.e200 || 0, x.res || 0))} → pierde el clúster de EMAs → ${fmtPx(x.t1)}.`, `Cede el riel inferior de la estructura → ${fmtPx(x.t3)}.`, `Retest de mínimos del ciclo → ${fmtPx(x.t12)}.`]
  : [`Aguanta el clúster de EMAs → recupera ${fmtPx(x.t1)}.`, `Rompe el riel superior con volumen → ${fmtPx(x.t3)}.`, `Zona de oferta del ciclo anterior → ${fmtPx(x.t12)}.`]);

function analyze(series, ed) {
  if (!series || series.c.length < 60) return { trend: null, st: null, fc: null };
  const trend = computeTrend(series.c, series.v);
  const st = autoStructure(series);
  const auto = buildForecast(trend, st, series, { ath: Math.max(...series.c), how: HOW });
  const fc = ed && trend ? { dir: ed.bias === 'BEAR' ? 'BEAR' : 'BULL', path: ed.path.map((q) => ({ ...q })), invalidation: ed.invalidation.level, editorial: true } : auto;
  return { trend, st, fc };
}

export const isInvalidated = (x) => !!(x?.fc && x.d?.price != null && (x.fc.dir === 'BEAR' ? x.d.price > x.fc.invalidation : x.d.price < x.fc.invalidation));

export function useBioData(syms) {
  const [data, setData] = useState({});
  useEffect(() => {
    syms.forEach(async (s) => {
      try {
        const j = await (await fetch(`/api/equity/${s}`)).json();
        setData((p) => ({ ...p, [s]: j.ok ? { ...j, series: { t: j.t, c: j.c, v: j.v } } : { ok: false, error: j.error } }));
      } catch (e) { setData((p) => ({ ...p, [s]: { ok: false, error: 'fetch failed' } })); }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return useMemo(() => {
    const o = {};
    syms.forEach((s) => { const d = data[s]; o[s] = d?.ok ? { ...analyze(d.series, EDITOR_TA[s]), d } : { d }; });
    return o;
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
}

const H = ({ children, c = 'var(--text-muted)' }) => <div style={{ fontSize: 11, fontWeight: 700, color: c, marginBottom: 5, fontFamily: MONO }}>{children}</div>;

export function TAModule({ sym, A, mb }) {
  const { trend, st, fc, d } = A || {}; const ed = EDITOR_TA[sym] || null;
  const price = d?.price;
  if (!d) return <div style={{ color: 'var(--text-muted)', fontSize: 12, padding: 16, fontFamily: MONO }}>Cargando serie diaria…</div>;
  if (!d.ok) return <div style={{ color: AMB, fontSize: 12, padding: 16, fontFamily: SANS }}>El feed de precios no responde ahora ({d.error}). Reintentá en unos minutos.</div>;
  if (!trend) return <div style={{ color: 'var(--text-muted)', fontSize: 12.5, padding: 16, fontFamily: SANS }}>{sym} tiene {d.bars} sesiones de historia pública; el motor necesita al menos 60.</div>;
  const col = trend.score >= 5 ? GRN : trend.score === 4 ? AMB : RED;
  const fcCol = fc?.dir === 'BEAR' ? RED : GRN, invCol = fc?.dir === 'BEAR' ? GRN : RED;
  const bad = isInvalidated(A);
  const stat = (k, v, c) => <div style={{ minWidth: 0 }}><div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontFamily: MONO }}>{k}</div><div style={{ fontSize: 13, fontWeight: 700, color: c || 'var(--text-primary)', fontFamily: MONO, whiteSpace: 'nowrap' }}>{v}</div></div>;

  return (
    <div>
      {/* regime strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontFamily: MONO, marginBottom: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: col }}>{trend.regime}</span>
        <span style={{ display: 'flex', gap: 3 }}>{trend.checks.map((x, i) => <span key={i} title={x[0]} style={{ width: 12, height: 6, borderRadius: 2, background: x[1] ? col : 'rgba(128,128,128,.2)' }} />)}</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{trend.score}/7 checks alcistas</span>
        {fc && <span style={{ marginLeft: mb ? 0 : 'auto', fontSize: 11.5, fontWeight: 800, color: bad ? invCol : fcCol }}>{fc.dir} {bad ? '· INVALIDADO' : '· intacto'} · invalida {fc.dir === 'BEAR' ? '>' : '<'} {fmtPx(fc.invalidation)}</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(3,1fr)' : 'repeat(6,1fr)', gap: 10, padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 6, marginBottom: 12 }}>
        {stat('EMA 20 / 50', `${fmtPx(trend.e20)} / ${fmtPx(trend.e50)}`)}
        {stat('EMA 200', `${fmtPx(trend.e200)} ${trend.slope200 > 0 ? '↗' : '↘'}`, trend.last > trend.e200 ? GRN : RED)}
        {stat('RSI 14', trend.rsi.toFixed(0), trend.rsi > 70 || trend.rsi < 30 ? AMB : 'var(--text-primary)')}
        {stat('MACD', trend.hist > 0 ? (trend.histUp ? '+ subiendo' : '+ bajando') : (trend.histUp ? '− subiendo' : '− bajando'), trend.hist > 0 ? GRN : RED)}
        {stat('7d / 30d', `${pc(trend.chg7, 0)} / ${pc(trend.chg30, 0)}`, trend.chg30 > 0 ? GRN : RED)}
        {stat('Vol 20d vs 90d', trend.volRatio != null ? `${Math.round(trend.volRatio * 100)}%` : '—')}
      </div>

      {ed && <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: SANS, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: ed.read }} />}

      {/* structure + projected path on one chart */}
      <div style={{ border: '1px solid var(--border)', borderRadius: 6, padding: '6px 2px 2px' }}>
        <div style={{ display: 'flex', gap: 12, fontSize: 10.5, padding: '0 10px 4px', color: 'var(--text-muted)', flexWrap: 'wrap', fontFamily: MONO }}>
          <span style={{ color: AMB, fontWeight: 700 }}>{st?.pattern || (d.bars < 90 ? 'Historia corta' : 'Sin estructura clara')}</span>
          <span><span style={{ color: RED }}>╌</span> máximos</span><span><span style={{ color: GRN }}>╌</span> mínimos</span><span><span style={{ color: fcCol }}>●</span> path 1M / 3M / 1Y</span>
        </div>
        <TAStructure key={sym} series={d.series} st={st} fc={fc} mb={mb} minBars={60} />
      </div>

      {/* forecast chart: live price → 1M / 3M / 1Y with invalidation zone */}
      {fc && <div style={{ marginTop: 12, border: '1px solid var(--border)', borderRadius: 6, padding: '6px 2px 2px' }}>
        <div style={{ display: 'flex', gap: 12, fontSize: 10.5, padding: '0 10px 4px', color: 'var(--text-muted)', flexWrap: 'wrap', fontFamily: MONO }}>
          <span style={{ color: fcCol, fontWeight: 800 }}>Forecast de precio · {fc.dir === 'BEAR' ? 'bajista' : 'alcista'}</span>
          <span><span style={{ color: fcCol }}>▬</span> path</span><span><span style={{ color: invCol }}>╌</span> invalidación</span>
          {!mb && <span style={{ marginLeft: 'auto' }}>escala log · sombra = tolerancia</span>}
        </div>
        <TAFan key={sym} price={price} fc={fc} mb={mb} />
      </div>}

      {/* forecast path */}
      {fc && <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : 'repeat(3,1fr)', gap: 8, marginTop: 10 }}>
        {fc.path.map((p) => <div key={p.h} style={{ borderLeft: `3px solid ${fcCol}`, background: 'var(--surface-2)', borderRadius: 4, padding: '8px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: MONO }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-secondary)' }}>{p.h}</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: fcCol }}>{fmtPx(p.target)} <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>{price ? pc(p.target / price - 1, 0) : ''}</span></span>
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.45, fontFamily: SANS }} dangerouslySetInnerHTML={{ __html: p.how }} />
        </div>)}
      </div>}

      {ed && <>
        <div style={{ marginTop: 10, padding: '8px 12px', borderLeft: `3px solid ${invCol}`, background: 'var(--surface-2)', borderRadius: 4, fontSize: 12, color: 'var(--text-secondary)', fontFamily: SANS, lineHeight: 1.5 }}>
          <b style={{ color: invCol }}>Invalidación.</b> {ed.invalidation.text}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 14, marginTop: 14, fontSize: 12.5, lineHeight: 1.55, color: 'var(--text-secondary)', fontFamily: SANS }}>
          <div><H>Patrón</H><div dangerouslySetInnerHTML={{ __html: ed.pattern }} /><div style={{ marginTop: 10 }}><H>Qué mirar</H><div dangerouslySetInnerHTML={{ __html: ed.watch }} /></div></div>
          <div>
            <H c="var(--gold)">Decisión</H>
            {ed.decision.map((x, i) => <div key={i} style={{ marginBottom: 5 }} dangerouslySetInnerHTML={{ __html: '› ' + x }} />)}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
              {[['Resistencias', ed.levels.resistance, RED], ['Soportes', ed.levels.support, GRN]].map(([t, L, c]) => <div key={t}>
                <H c={c}>{t}</H>
                {L.map(([lv, why]) => <div key={lv} title={why} style={{ display: 'flex', justifyContent: 'space-between', gap: 6, fontSize: 11.5, padding: '2px 0', fontFamily: MONO }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{fmtPx(lv)}</span><span style={{ color: 'var(--text-muted)' }}>{price ? pc(lv / price - 1, 0) : ''}</span>
                </div>)}
              </div>)}
            </div>
          </div>
        </div>
      </>}
      <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 10, fontFamily: SANS }}>{ed ? `Lectura del editor: ${ed.updated}. El régimen y la estructura se recalculan en vivo.` : 'Forecast automático del motor.'} Precios diarios ajustados (Yahoo). No es consejo de inversión.</div>
    </div>
  );
}
