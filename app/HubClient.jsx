'use client';
import { useState, useEffect } from 'react';

// ─── Formatting helpers ─────────────────────────────────────
const fp = (p) => {
  if (p == null || isNaN(p)) return '—';
  if (p >= 10000) return (p / 1000).toFixed(1) + 'K';
  if (p >= 1000) return p.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (p >= 100) return p.toFixed(1);
  if (p >= 1) return p.toFixed(2);
  return p.toFixed(3);
};
const fv = (v) => {
  if (v == null || isNaN(v)) return '—';
  return `${v > 0 ? '+' : ''}${v.toFixed(2)}%`;
};
const cBg = (c) => {
  if (c == null) return '#18181b';
  if (c > 3) return '#166534'; if (c > 1.5) return '#14532d'; if (c > 0) return '#052e16';
  if (c < -3) return '#7f1d1d'; if (c < -1.5) return '#450a0a'; if (c < 0) return '#1c0a0a';
  return '#18181b';
};
const cBd = (c) => c > 1.5 ? '#22c55e40' : c < -1.5 ? '#ef444440' : '#27272a';
const cC = (c) => c > 0 ? '#4ade80' : c < 0 ? '#fca5a5' : '#71717a';
const sigCl = (s) => s === 'RISK ON' || s === 'EXPANDING' ? '#4ade80' : s === 'RISK OFF' || s === 'TIGHTENING' ? '#f87171' : '#facc15';

// ─── Macro cell subcomponent ────────────────────────────────
function MC({ m, bd = true, mb, span = 1 }) {
  return (
    <div style={{
      padding: '5px 6px', borderRight: bd ? '1px solid #1e1e22' : 'none',
      textAlign: 'center', background: '#111113', minWidth: 0,
      gridColumn: span > 1 ? `span ${span}` : undefined,
    }}>
      <div style={{ fontSize: 6, color: '#71717a', letterSpacing: '0.6px', textTransform: 'uppercase', lineHeight: 1 }}>{m.l}</div>
      <div style={{ fontSize: mb ? 11 : 14, fontWeight: 700, color: m.cl || '#e4e4e7', lineHeight: 1.2, marginTop: 2 }}>{m.v}</div>
      {m.c != null && <div style={{ fontSize: 8, fontWeight: 600, color: cC(m.c), lineHeight: 1 }}>{fv(m.c)}</div>}
    </div>
  );
}

export default function HubClient({ mkt, liq, signal, calToday, calTomorrow, watchlist, earnings, insights, diet }) {
  const [fl, sF] = useState('A');
  const [exp, sE] = useState(null);
  const [mb, sM] = useState(false);

  useEffect(() => {
    const c = () => sM(window.innerWidth < 700);
    c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c);
  }, []);

  const now = new Date();
  const tmrw = new Date(now); tmrw.setDate(tmrw.getDate() + 1);
  const items = fl === 'A' ? watchlist : watchlist.filter(w => w.k === (fl === 'S' ? 'S' : 'C'));
  const mktC = sigCl(signal.risk);
  const liqC = sigCl(signal.liq);
  const nextUp = earnings.find(e => e.next);
  const restEarn = earnings.filter(e => !e.next);

  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0e', color: '#d4d4d8', fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 11 }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: mb ? '6px 8px' : '10px 20px' }}>

        {/* ═══ HEADER ═══ */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 0', marginBottom: 12,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src="/logo.jpg" alt="10AMPRO"
              style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(212,168,67,0.2)' }}
            />
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, lineHeight: 1 }}>
                <span style={{ color: '#D4A843' }}>10</span>
                <span style={{ color: '#22C55E' }}>AM</span>
                <span style={{ color: '#3F3F46' }}>PRO</span>
              </div>
              <div style={{ fontSize: 8, letterSpacing: '0.2em', color: 'rgba(212,168,67,0.4)', textTransform: 'uppercase' }}>
                BRIEFING DIARIO
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: '#71717a' }}>
              {now.toLocaleString('es-CO', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })} COT
            </div>
            <div style={{ fontSize: 9, color: '#71717a' }}>ISR 5min</div>
          </div>
        </header>

        {/* ═══ SIGNAL + MACRO BAR ═══ */}
        <div style={{ borderLeft: '1px solid #27272a', borderRight: '1px solid #27272a', borderBottom: '1px solid #27272a', marginBottom: 6, overflow: 'hidden' }}>
          {/* MKT Row */}
          <div style={{ display: 'flex', alignItems: 'stretch', borderBottom: '1px solid #1e1e22' }}>
            <div style={{
              padding: mb ? '8px 10px' : '8px 14px', background: `${mktC}08`, borderRight: `1px solid ${mktC}20`,
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              width: mb ? 90 : 120, flexShrink: 0,
            }}>
              <div style={{ fontSize: 7, color: '#a1a1aa', letterSpacing: '1px', marginBottom: 1 }}>RISK</div>
              <div style={{ fontSize: mb ? 14 : 18, fontWeight: 800, color: mktC, letterSpacing: '-1px', lineHeight: 1 }}>{signal.risk}</div>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px', borderRight: '1px solid #1e1e22', flexShrink: 0, width: 20 }}>
                <span style={{ fontSize: 7, color: '#71717a', writingMode: mb ? 'horizontal-tb' : 'vertical-rl', transform: mb ? 'none' : 'rotate(180deg)', letterSpacing: '0.5px' }}>MKT</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', flex: 1 }}>
                {mkt.map((m, i) => <MC key={i} m={m} bd={i < mkt.length - 1} mb={mb} />)}
              </div>
            </div>
          </div>
          {/* LIQ Row */}
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <div style={{
              padding: mb ? '8px 10px' : '8px 14px', background: `${liqC}08`, borderRight: `1px solid ${liqC}20`,
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              width: mb ? 90 : 120, flexShrink: 0,
            }}>
              <div style={{ fontSize: 7, color: '#a1a1aa', letterSpacing: '1px', marginBottom: 1 }}>LIQUIDITY</div>
              <div style={{ fontSize: mb ? 14 : 18, fontWeight: 800, color: liqC, letterSpacing: '-0.5px', lineHeight: 1 }}>{signal.liq}</div>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px', borderRight: '1px solid #1e1e22', flexShrink: 0, width: 20 }}>
                <span style={{ fontSize: 7, color: '#71717a', writingMode: mb ? 'horizontal-tb' : 'vertical-rl', transform: mb ? 'none' : 'rotate(180deg)', letterSpacing: '0.5px' }}>LIQ</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', flex: 1 }}>
                {liq.map((m, i) => <MC key={i} m={m} bd={i < liq.length - 1} mb={mb} />)}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ CALENDAR ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 0, marginBottom: 6, border: '1px solid #27272a', borderRadius: 3, overflow: 'hidden' }}>
          {/* HOY */}
          <div style={{ borderRight: mb ? 'none' : '1px solid #27272a' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '3px 8px', background: '#0f0f12', borderBottom: '1px solid #27272a', gap: 6 }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: '#60a5fa' }}>HOY</span>
              <span style={{ fontSize: 8, color: '#a1a1aa' }}>{now.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
            </div>
            {calToday.high.length === 0 && calToday.low.length === 0 && (
              <div style={{ padding: '8px', fontSize: 9, color: '#71717a', textAlign: 'center' }}>Sin eventos de alto impacto hoy</div>
            )}
            {calToday.high.map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderBottom: i < calToday.high.length - 1 ? '1px solid #ffffff06' : 'none', background: '#60a5fa06' }}>
                <span style={{ fontSize: 10, color: '#60a5fa', fontWeight: 700, width: 38, flexShrink: 0 }}>{ev.t}</span>
                <span style={{ fontSize: 10, color: '#e4e4e7', fontWeight: 600, flex: 1 }}>{ev.e}</span>
                {ev.es && <span style={{ fontSize: 9, color: '#a1a1aa' }}>est: {ev.es}</span>}
                {ev.p && <span style={{ fontSize: 9, color: '#71717a' }}>prev: {ev.p}</span>}
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
              </div>
            ))}
            {calToday.low.length > 0 && calToday.low.map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 8px', borderTop: i === 0 ? '1px solid #27272a' : 'none', borderBottom: i < calToday.low.length - 1 ? '1px solid #ffffff04' : 'none' }}>
                <span style={{ fontSize: 9, color: '#71717a', width: 38, flexShrink: 0 }}>{ev.t}</span>
                <span style={{ fontSize: 9, color: '#a1a1aa', flex: 1 }}>{ev.e}</span>
                {ev.es && <span style={{ fontSize: 8, color: '#71717a' }}>est: {ev.es}</span>}
              </div>
            ))}
          </div>
          {/* MAÑANA */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '3px 8px', background: '#0f0f12', borderBottom: '1px solid #27272a', gap: 6 }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: '#fbbf24' }}>MAÑANA</span>
              <span style={{ fontSize: 8, color: '#a1a1aa' }}>{tmrw.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
            </div>
            {calTomorrow.length === 0 && (
              <div style={{ padding: '8px', fontSize: 9, color: '#71717a', textAlign: 'center' }}>Sin eventos programados</div>
            )}
            {calTomorrow.map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderBottom: i < calTomorrow.length - 1 ? '1px solid #ffffff06' : 'none' }}>
                <span style={{ fontSize: 10, color: '#fbbf24', fontWeight: 600, width: 38, flexShrink: 0 }}>{ev.t}</span>
                <span style={{ fontSize: 10, color: '#d4d4d8', fontWeight: 500, flex: 1 }}>{ev.e}</span>
                {ev.es && <span style={{ fontSize: 9, color: '#a1a1aa' }}>est: {ev.es}</span>}
                {ev.p && <span style={{ fontSize: 9, color: '#71717a' }}>prev: {ev.p}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ═══ WATCHLIST ═══ */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#a1a1aa', letterSpacing: '0.5px' }}>WATCHLIST</span>
              {watchlist.filter(w => Math.abs(w.c || 0) > 2).slice(0, 3).map((w, i) => (
                <span key={i} style={{ fontSize: 8, color: cC(w.c), fontWeight: 600 }}>{w.t} {fv(w.c)}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 2 }}>
              {[['A', 'ALL'], ['S', 'STK'], ['C', 'CRY']].map(([k, l]) => (
                <button key={k} onClick={() => sF(k)} style={{
                  padding: '2px 5px', border: 'none', borderRadius: 2, cursor: 'pointer',
                  fontSize: 7, fontFamily: 'inherit', fontWeight: 600,
                  background: fl === k ? '#22C55E20' : 'transparent', color: fl === k ? '#4ade80' : '#71717a',
                }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(3,1fr)' : 'repeat(7,1fr)', gap: 2 }}>
            {items.map((w, i) => (
              <div key={i} onClick={() => w.cm && sE(exp === w.t ? null : w.t)} style={{
                background: cBg(w.c), border: `1px solid ${cBd(w.c)}`, borderRadius: 2,
                padding: '5px 7px', cursor: w.cm ? 'pointer' : 'default', transition: 'filter 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.25)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#e4e4e7' }}>{w.t}</span>
                  {w.cm && <span style={{ fontSize: 6, color: '#D4A843' }}>💬</span>}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f4f4f5', lineHeight: 1.2, marginTop: 1 }}>{fp(w.p)}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: cC(w.c), marginTop: 1 }}>{fv(w.c)}</div>
              </div>
            ))}
          </div>
          {exp && watchlist.find(w => w.t === exp)?.cm && (() => {
            const w = watchlist.find(w => w.t === exp);
            return (
              <div style={{
                marginTop: 3, padding: '6px 10px', background: '#111113',
                border: '1px solid #D4A84330', borderLeft: '3px solid #D4A843',
                borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10,
              }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#e4e4e7', marginRight: 6 }}>{exp}</span>
                  <span style={{ fontSize: 10, color: '#d4d4d8', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{w.cm.tx}</span>
                  <span style={{ fontSize: 8, color: '#a1a1aa' }}> — {w.cm.w}, {w.cm.a}</span>
                </div>
                <button onClick={() => sE(null)} style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit', flexShrink: 0 }}>✕</button>
              </div>
            );
          })()}
        </div>

        {/* ═══ INFO DIET + EARNINGS ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 6, marginBottom: 6 }}>
          {/* INFO DIET */}
          <div style={{ border: '1px solid #27272a', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 8px', background: '#0f0f12', borderBottom: '1px solid #27272a' }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: '#22C55E', letterSpacing: '0.3px' }}>📡 INFO DIET</span>
              <span style={{ fontSize: 7, color: '#71717a' }}>Lo que estamos compartiendo en el chat de 10am.pro</span>
            </div>
            {diet.map((d, i) => (
              <a key={i} href={d.url} target="_blank" rel="noopener" style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', textDecoration: 'none',
                borderBottom: i < diet.length - 1 ? '1px solid #ffffff05' : 'none',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#ffffff04'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{
                  width: 36, height: 36, borderRadius: 3, background: `${d.color}15`,
                  border: `1px solid ${d.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>{d.abbr}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 10, color: '#e4e4e7', fontWeight: 600, lineHeight: 1.3,
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>{d.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <span style={{ fontSize: 8, color: '#71717a' }}>{d.src}</span>
                    <span style={{ fontSize: 7, color: '#71717a' }}>·</span>
                    <span style={{ fontSize: 8, color: '#71717a' }}>{d.ago}</span>
                  </div>
                </div>
                <span style={{ fontSize: 7, color: '#71717a', background: '#ffffff06', padding: '1px 4px', borderRadius: 2, flexShrink: 0 }}>{d.tag}</span>
              </a>
            ))}
          </div>

          {/* EARNINGS RADAR */}
          <div style={{ border: '1px solid #27272a', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ padding: '3px 8px', background: '#0f0f12', borderBottom: '1px solid #27272a' }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: '#a78bfa' }}>📊 EARNINGS RADAR</span>
            </div>
            {nextUp && (
              <div style={{
                padding: '5px 8px', background: '#a78bfa08', borderBottom: '1px solid #27272a',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12 }}>{nextUp.e}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#e4e4e7' }}>{nextUp.t}</span>
                  <span style={{ fontSize: 9, color: '#a1a1aa' }}>{nextUp.n}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 9, color: '#a1a1aa' }}>{nextUp.d} · <span style={{ color: '#a78bfa', fontWeight: 700 }}>{nextUp.days}d</span></span>
                  <span style={{ fontSize: 6, fontWeight: 700, color: '#a78bfa', background: '#a78bfa18', padding: '1px 5px', borderRadius: 2, border: '1px solid #a78bfa30' }}>NEXT UP</span>
                </div>
              </div>
            )}
            {restEarn.map((e, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '3px 8px', borderBottom: i < restEarn.length - 1 ? '1px solid #ffffff05' : 'none',
              }}
                onMouseEnter={ev => ev.currentTarget.style.background = '#ffffff04'}
                onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 10 }}>{e.e}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#d4d4d8' }}>{e.t}</span>
                  <span style={{ fontSize: 9, color: '#a1a1aa' }}>{e.n}</span>
                </div>
                <span style={{ fontSize: 8, color: '#71717a' }}>{e.d} · {e.days}d</span>
              </div>
            ))}
            {earnings.length === 0 && (
              <div style={{ padding: '8px', fontSize: 9, color: '#71717a', textAlign: 'center' }}>Sin earnings próximos</div>
            )}
          </div>
        </div>

        {/* ═══ EDITORIAL INSIGHTS ═══ */}
        <div style={{ border: '1px solid #D4A84325', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
          <div style={{
            padding: '5px 10px', background: 'linear-gradient(90deg, #D4A84310, transparent)',
            borderBottom: '1px solid #D4A84320', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#D4A843', letterSpacing: '0.5px' }}>💡 CONTEXTO 10AMPRO</span>
            <span style={{ fontSize: 7, color: '#71717a' }}>Actualizado hoy</span>
          </div>
          {insights.map((ins, i) => (
            <div key={i} style={{
              padding: '8px 10px', borderBottom: i < insights.length - 1 ? '1px solid #ffffff06' : 'none',
              borderLeft: `3px solid ${ins.color}30`,
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#ffffff03'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: ins.color, background: `${ins.color}15`, padding: '1px 6px', borderRadius: 2, letterSpacing: '0.3px' }}>{ins.tag}</span>
              </div>
              <div style={{ fontSize: 11, color: '#d4d4d8', lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{ins.text}</div>
              {ins.link && (
                <a href={ins.link.url} target="_blank" rel="noopener" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5,
                  fontSize: 9, color: '#D4A843', textDecoration: 'none', fontWeight: 600,
                }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                  📎 {ins.link.label}
                </a>
              )}
            </div>
          ))}
          <a href="https://10am.substack.com" target="_blank" rel="noopener" style={{
            display: 'block', padding: '5px 10px', fontSize: 9, color: '#D4A843',
            textDecoration: 'none', borderTop: '1px solid #D4A84320', textAlign: 'center',
            background: '#D4A84306', fontWeight: 600,
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#D4A84310'}
            onMouseLeave={e => e.currentTarget.style.background = '#D4A84306'}>
            Más análisis y deep dives en 10am.pro →
          </a>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '4px 0', borderTop: '1px solid #18181b' }}>
          <a href="https://10am.pro" target="_blank" rel="noopener" style={{ fontSize: 8, color: '#71717a', textDecoration: 'none' }}>Substack</a>
          <a href="https://x.com/holdmybirra" target="_blank" rel="noopener" style={{ fontSize: 8, color: '#22C55E', textDecoration: 'none' }}>@holdmybirra</a>
          <a href="https://cerebro.10am.pro" target="_blank" rel="noopener" style={{ fontSize: 8, color: '#D4A843', textDecoration: 'none' }}>Cerebro</a>
        </div>

      </div>
      <style>{`@keyframes p{0%,100%{opacity:1}50%{opacity:.3}}*{box-sizing:border-box;margin:0;padding:0}body{-webkit-font-smoothing:antialiased}::-webkit-scrollbar{width:2px}::-webkit-scrollbar-thumb{background:#ffffff10;border-radius:1px}`}</style>
    </div>
  );
}
