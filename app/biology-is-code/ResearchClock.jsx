'use client';
import { useState } from 'react';
import { GOAL, CATS, LOG } from './research.log';

// Research-hours counter: sums research.log.js against the GOAL gate. Top of /biology-is-code.
const MONO = "'JetBrains Mono',monospace", SANS = "'Plus Jakarta Sans',sans-serif";
const GRN = '#22c55e', AMB = '#f59e0b';
const f1 = (n) => (Math.round(n * 10) / 10).toLocaleString('es', { minimumFractionDigits: n % 1 ? 1 : 0, maximumFractionDigits: 1 });
const dLabel = (s) => new Date(s + 'T12:00:00Z').toLocaleDateString('es', { day: '2-digit', month: 'short' });

export default function ResearchClock({ mb }) {
  const [open, setOpen] = useState(false);
  const total = LOG.reduce((a, e) => a + e.h, 0);
  const left = Math.max(0, GOAL - total);
  const done = total >= GOAL;
  const col = done ? GRN : AMB;
  const pctDone = Math.min(1, total / GOAL);
  const byCat = Object.keys(CATS).map((k) => [k, LOG.filter((e) => e.cat === k).reduce((a, e) => a + e.h, 0)]).filter(([, h]) => h > 0);
  const last = LOG.reduce((a, e) => (e.d > a ? e.d : a), LOG[0].d);
  const since = new Date(new Date(last + 'T12:00:00Z').getTime() - 30 * 86400000).toISOString().slice(0, 10);
  const pace30 = LOG.filter((e) => e.d > since).reduce((a, e) => a + e.h, 0);
  const etaWeeks = !done && pace30 > 0 ? Math.ceil(left / (pace30 / 30) / 7) : null;
  const estH = LOG.filter((e) => e.est).reduce((a, e) => a + e.h, 0);

  return (
    <div style={{ border: `1px solid ${col}55`, borderRadius: 8, background: 'var(--surface)', padding: mb ? '10px 12px' : '10px 14px', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: mb ? 8 : 14, flexWrap: mb ? 'wrap' : 'nowrap', fontFamily: MONO }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Research</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-bright)', whiteSpace: 'nowrap' }}>{f1(total)}<span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}> / {GOAL} h</span></span>
        <div style={{ flex: 1, minWidth: mb ? '100%' : 120, order: mb ? 5 : 0, height: 8, borderRadius: 3, background: 'rgba(128,128,128,.15)', overflow: 'hidden', display: 'flex' }}>
          {byCat.map(([k, h]) => <div key={k} title={`${CATS[k].label}: ${f1(h)} h`} style={{ width: `${(h / Math.max(GOAL, total)) * 100}%`, background: CATS[k].color }} />)}
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: col, whiteSpace: 'nowrap' }}>{done ? 'Compra habilitada' : `Compra bloqueada · faltan ${f1(left)} h`}</span>
        <button onClick={() => setOpen(!open)} aria-expanded={open} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text-secondary)', fontFamily: MONO, fontSize: 11, padding: '3px 8px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{open ? 'Cerrar' : 'Detalle'}</button>
      </div>
      {open && <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontFamily: SANS, lineHeight: 1.6 }}>
          <b style={{ color: 'var(--text-primary)' }}>Regla:</b> ni una acción de esta canasta antes de {GOAL} horas documentadas de research. Últimos 30 días: <b style={{ color: 'var(--text-primary)' }}>{f1(pace30)} h</b>{etaWeeks ? <>; a este ritmo el umbral llega en ~{etaWeeks} semanas</> : null}.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', marginTop: 8, fontSize: 11.5, fontFamily: MONO, color: 'var(--text-secondary)' }}>
          {byCat.map(([k, h]) => <span key={k}><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: CATS[k].color, marginRight: 5 }} />{CATS[k].label} <b style={{ color: 'var(--text-primary)' }}>{f1(h)} h</b></span>)}
        </div>
        <div style={{ marginTop: 8, border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
          {LOG.slice().reverse().map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: mb ? '50px 38px 1fr' : '58px 150px 44px 1fr', gap: 10, alignItems: 'baseline', padding: '6px 12px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', fontSize: 11.5 }}>
              <span style={{ fontFamily: MONO, color: 'var(--text-muted)' }}>{dLabel(e.d)}</span>
              {!mb && <span style={{ fontFamily: MONO, color: CATS[e.cat].color }}>{CATS[e.cat].label}</span>}
              <span style={{ fontFamily: MONO, fontWeight: 700, color: 'var(--text-primary)' }}>{f1(e.h)} h</span>
              <span style={{ fontFamily: SANS, color: 'var(--text-secondary)' }}>{e.note}{e.est ? <span style={{ color: 'var(--text-muted)' }}> (est.)</span> : null}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontFamily: SANS, marginTop: 6 }}>{f1(estH)} h son estimación retroactiva (reconstruida el 23 Sep 2026); lo nuevo se registra por sesión.</div>
      </div>}
    </div>
  );
}
