'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

const PortfolioEmbed = dynamic(() => import('./PortfolioEmbed'), { ssr: false });

// ─── Share section as image ─────────────────────────────────
async function shareSection(element, sectionName) {
  if (!element) return;
  const html2canvas = (await import('html2canvas')).default;

  // Create a wrapper with padding and branded footer
  const wrapper = document.createElement('div');
  const isDark = !document.documentElement.classList.contains('light');
  const shareBg = isDark ? '#0c0c0e' : '#ffffff';
  const shareBorder = isDark ? '#27272a' : '#dee2e6';
  const shareText = isDark ? '#9ca3af' : '#495057';
  wrapper.style.cssText = `position:fixed;left:-9999px;top:0;background:${shareBg};padding:16px 16px 0`;
  
  // Clone the section
  const clone = element.cloneNode(true);
  clone.style.width = element.offsetWidth + 'px';
  wrapper.appendChild(clone);

  // Add branded footer
  const footer = document.createElement('div');
  footer.style.cssText = `display:flex;justify-content:space-between;align-items:center;padding:12px 4px 14px;border-top:1px solid ${shareBorder};margin-top:10px`;
  footer.innerHTML = `<span style="font-family:monospace;font-size:12px;color:${shareText}">10am.pro</span><span style="font-family:monospace;font-size:12px;color:#22C55E;font-weight:600">@10ampro</span>`;
  wrapper.appendChild(footer);

  document.body.appendChild(wrapper);

  try {
    const canvas = await html2canvas(wrapper, {
      backgroundColor: shareBg,
      scale: 2,
      useCORS: true,
      logging: false,
    });

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `10ampro-${sectionName}.png`, { type: 'image/png' });

      // Try native share (mobile)
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: '10AMPRO Briefing',
            text: '📡 Mi briefing de hoy — 10am.pro | @10ampro',
          });
        } catch (e) { if (e.name !== 'AbortError') downloadBlob(blob, sectionName); }
      } else {
        downloadBlob(blob, sectionName);
      }
    }, 'image/png');
  } finally {
    document.body.removeChild(wrapper);
  }
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `10ampro-${name}.png`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Share button component ─────────────────────────────────
function ShareBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      title="Compartir sección"
      style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '2px 7px', border: '1px solid var(--border)', borderRadius: 3,
        background: 'transparent', color: 'var(--text-muted)', fontSize: 8, fontWeight: 600,
        fontFamily: 'inherit', cursor: 'pointer', letterSpacing: '0.3px',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = '#D4A843'; e.currentTarget.style.borderColor = '#D4A84340'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
    >
      📤 SHARE
    </button>
  );
}

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
  if (c == null) return 'var(--cell-neutral-bg)';
  if (c > 3) return 'var(--green-dim)'; if (c > 1.5) return 'var(--green-dim)'; if (c > 0) return 'var(--cell-pos-bg)';
  if (c < -3) return 'var(--red-dim)'; if (c < -1.5) return 'var(--red-dim)'; if (c < 0) return 'var(--cell-neg-bg)';
  return 'var(--cell-neutral-bg)';
};
const cBd = (c) => c > 1.5 ? 'var(--cell-pos-border)' : c < -1.5 ? 'var(--cell-neg-border)' : 'var(--cell-neutral-border)';
const cC = (c) => c > 0 ? 'var(--green)' : c < 0 ? 'var(--red)' : 'var(--text-muted)';
const sigCl = (s) => s === 'RISK ON' || s === 'EXPANDING' ? 'var(--green)' : s === 'RISK OFF' || s === 'TIGHTENING' ? 'var(--red)' : '#facc15';

// ─── Macro cell subcomponent ────────────────────────────────
function MC({ m, bd = true, mb, span = 1 }) {
  return (
    <div style={{
      padding: '5px 6px', borderRight: bd ? '1px solid var(--border-subtle)' : 'none',
      textAlign: 'center', background: 'var(--surface)', minWidth: 0,
      gridColumn: span > 1 ? `span ${span}` : undefined,
    }}>
      <div style={{ fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.6px', textTransform: 'uppercase', lineHeight: 1 }}>{m.l}</div>
      <div style={{ fontSize: mb ? 11 : 14, fontWeight: 700, color: m.cl || 'var(--text-primary)', lineHeight: 1.2, marginTop: 2 }}>{m.v}</div>
      {m.c != null && <div style={{ fontSize: 8, fontWeight: 600, color: cC(m.c), lineHeight: 1 }}>{fv(m.c)}</div>}
    </div>
  );
}

export default function HubClient({ mkt: mktInit, liq: liqInit, signal: signalInit, calToday, calTomorrow, watchlist: wlInit, earnings, insights, diet }) {
  const [fl, sF] = useState('A');
  const [exp, sE] = useState(null);
  const [mb, sM] = useState(false);
  const [mkt, setMkt] = useState(mktInit);
  const [liq, setLiq] = useState(liqInit);
  const [signal, setSignal] = useState(signalInit);
  const [watchlist, setWatchlist] = useState(wlInit);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [theme, setTheme] = useState('dark');
  const refSignal = useRef(null);
  const refWatch = useRef(null);
  const refDiet = useRef(null);
  const refInsights = useRef(null);

  // Theme: load from localStorage and apply to <html>
  useEffect(() => {
    const saved = localStorage.getItem('10am-theme') || 'dark';
    setTheme(saved);
    document.documentElement.classList.toggle('light', saved === 'light');
  }, []);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('10am-theme', next);
    document.documentElement.classList.toggle('light', next === 'light');
  };

  // Client-side price refresh on mount + every 5 min
  const refreshPrices = useCallback(async () => {
    try {
      const res = await fetch('/api/prices');
      if (!res.ok) return;
      const data = await res.json();
      if (data.mkt) setMkt(data.mkt);
      // Only update liq fields that have real values (yields, MOVE) — keep FRED data from ISR
      if (data.liq) {
        setLiq(prev => prev.map((item, i) => {
          const fresh = data.liq[i];
          // Keep ISR value for NET LIQ, US M2, CN M2 (first 3 items) since /api/prices doesn't fetch FRED
          if (i < 3 && fresh.v === '—') return item;
          return fresh;
        }));
      }
      if (data.signal) setSignal(data.signal);
      if (data.watchlist) {
        // Merge: keep comments from initial data, update prices
        setWatchlist(prev => data.watchlist.map(w => {
          const orig = prev.find(o => o.t === w.t);
          return { ...w, cm: orig?.cm || null };
        }));
      }
      setLastRefresh(new Date());
    } catch {}
  }, []);

  useEffect(() => {
    // Refresh immediately on mount (gets fresh prices over ISR cache)
    refreshPrices();
    const interval = setInterval(refreshPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshPrices]);

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
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-primary)', fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: 11, transition: 'background 0.3s, color 0.3s' }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: mb ? '6px 8px' : '10px 20px' }}>

        {/* ═══ HEADER ═══ */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 0', marginBottom: 12,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <a href="https://10am.pro?utm_source=hub&utm_medium=header&utm_campaign=logo" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
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
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: '50%',
                border: '1px solid var(--border)', background: 'var(--surface)',
                cursor: 'pointer', fontSize: 14, transition: 'all 0.2s',
              }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: lastRefresh ? 'var(--green)' : 'var(--text-muted)' }}>
                {lastRefresh
                  ? `● ${lastRefresh.toLocaleString('es-CO', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })} COT`
                  : `${now.toLocaleString('es-CO', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })} COT`
                }
              </div>
            </div>
          </div>
        </header>

        {/* ═══ SIGNAL + MACRO BAR ═══ */}
        <div ref={refSignal} style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 6, overflow: 'hidden' }}>
          {/* MKT Row */}
          <div style={{ display: 'flex', alignItems: 'stretch', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{
              padding: mb ? '8px 10px' : '8px 14px', background: `${mktC}08`, borderRight: `1px solid ${mktC}20`,
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              width: mb ? 90 : 120, flexShrink: 0,
            }}>
              <div style={{ fontSize: 8, color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom: 1 }}>RISK</div>
              <div style={{ fontSize: mb ? 14 : 18, fontWeight: 800, color: mktC, letterSpacing: '-1px', lineHeight: 1 }}>{signal.risk}</div>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px', borderRight: '1px solid var(--border-subtle)', flexShrink: 0, width: 20 }}>
                <span style={{ fontSize: 8, color: 'var(--text-muted)', writingMode: mb ? 'horizontal-tb' : 'vertical-rl', transform: mb ? 'none' : 'rotate(180deg)', letterSpacing: '0.5px' }}>MKT</span>
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
              <div style={{ fontSize: 8, color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom: 1 }}>LIQUIDITY</div>
              <div style={{ fontSize: mb ? 14 : 18, fontWeight: 800, color: liqC, letterSpacing: '-0.5px', lineHeight: 1 }}>{signal.liq}</div>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px', borderRight: '1px solid var(--border-subtle)', flexShrink: 0, width: 20 }}>
                <span style={{ fontSize: 8, color: 'var(--text-muted)', writingMode: mb ? 'horizontal-tb' : 'vertical-rl', transform: mb ? 'none' : 'rotate(180deg)', letterSpacing: '0.5px' }}>LIQ</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', flex: 1 }}>
                {liq.map((m, i) => <MC key={i} m={m} bd={i < liq.length - 1} mb={mb} />)}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MI PORTAFOLIO ═══ */}
        <PortfolioEmbed mb={mb} />

        {/* ═══ CALENDAR ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 0, marginBottom: 6, border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
          {/* HOY */}
          <div style={{ borderRight: mb ? 'none' : '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '3px 8px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', gap: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#60a5fa' }}>HOY</span>
              <span style={{ fontSize: 9, color: 'var(--text-secondary)', flex: 1 }}>{now.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
              <span style={{ fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>ET</span>
            </div>
            {calToday.high.length === 0 && calToday.low.length === 0 && (
              <div style={{ padding: '8px', fontSize: 9, color: 'var(--text-muted)', textAlign: 'center' }}>Sin eventos de alto impacto hoy</div>
            )}
            {calToday.high.map((ev, i) => {
              const isPast = ev.raw && new Date(ev.raw) < now;
              const hasActual = !!ev.a;
              const beatColor = ev.es != null && parseFloat(ev.a) > parseFloat(ev.es) ? '#22c55e' : ev.es != null && parseFloat(ev.a) < parseFloat(ev.es) ? '#ef4444' : '#fbbf24';
              return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderBottom: i < calToday.high.length - 1 ? '1px solid var(--border-subtle)' : 'none', background: isPast ? 'transparent' : '#60a5fa0d' }}>
                <span style={{ fontSize: 10, color: isPast ? 'var(--text-secondary)' : '#60a5fa', fontWeight: 700, width: 38, flexShrink: 0 }}>{ev.t}</span>
                <span style={{ fontSize: 11, color: isPast ? 'var(--text-secondary)' : 'var(--text-primary)', fontWeight: 600, flex: 1 }}>{ev.e}</span>
                {hasActual && <span style={{ fontSize: 11, fontWeight: 800, color: beatColor }}>{ev.a}</span>}
                {ev.es && <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>est: {ev.es}</span>}
                {ev.p && <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>prev: {ev.p}</span>}
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: hasActual ? '#22c55e' : isPast ? '#fbbf24' : '#ef4444', flexShrink: 0 }} />
              </div>
              );
            })}
            {calToday.low.length > 0 && calToday.low.map((ev, i) => {
              const isPast = ev.raw && new Date(ev.raw) < now;
              const hasActual = !!ev.a;
              const beatColor = ev.es != null && parseFloat(ev.a) > parseFloat(ev.es) ? '#22c55e' : ev.es != null && parseFloat(ev.a) < parseFloat(ev.es) ? '#ef4444' : '#fbbf24';
              return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 8px', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: i < calToday.low.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ fontSize: 9, color: isPast ? 'var(--text-secondary)' : '#60a5fa80', width: 38, flexShrink: 0 }}>{ev.t}</span>
                <span style={{ fontSize: 10, color: isPast ? 'var(--text-secondary)' : 'var(--text-primary)', fontWeight: 500, flex: 1 }}>{ev.e}</span>
                {hasActual && <span style={{ fontSize: 9, fontWeight: 700, color: beatColor }}>{ev.a}</span>}
                {ev.es && <span style={{ fontSize: 8, color: 'var(--text-muted)' }}>est: {ev.es}</span>}
              </div>
              );
            })}
          </div>
          {/* MAÑANA */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '3px 8px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', gap: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#fbbf24' }}>MAÑANA</span>
              <span style={{ fontSize: 9, color: 'var(--text-secondary)' }}>{tmrw.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
            </div>
            {calTomorrow.length === 0 && (
              <div style={{ padding: '8px', fontSize: 9, color: 'var(--text-muted)', textAlign: 'center' }}>Sin eventos programados</div>
            )}
            {calTomorrow.map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderBottom: i < calTomorrow.length - 1 ? '1px solid var(--border-subtle)' : 'none', opacity: 0.65 }}>
                <span style={{ fontSize: 10, color: '#fbbf2480', fontWeight: 600, width: 38, flexShrink: 0 }}>{ev.t}</span>
                <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 500, flex: 1 }}>{ev.e}</span>
                {ev.a && <span style={{ fontSize: 9, fontWeight: 700, color: ev.es != null && parseFloat(ev.a) > parseFloat(ev.es) ? '#22c55e' : ev.es != null && parseFloat(ev.a) < parseFloat(ev.es) ? '#ef4444' : '#fbbf24' }}>{ev.a}</span>}
                {ev.es && <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>est: {ev.es}</span>}
                {ev.p && <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>prev: {ev.p}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ═══ WATCHLIST ═══ */}
        <div ref={refWatch} style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>WATCHLIST</span>
              {watchlist.filter(w => Math.abs(w.c || 0) > 2).slice(0, 3).map((w, i) => (
                <span key={i} style={{ fontSize: 9, color: cC(w.c), fontWeight: 600 }}>{w.t} {fv(w.c)}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShareBtn onClick={() => shareSection(refWatch.current, 'watchlist')} />
              <div style={{ display: 'flex', gap: 2 }}>
              {[['A', 'ALL'], ['S', 'STK'], ['C', 'CRY']].map(([k, l]) => (
                <button key={k} onClick={() => sF(k)} style={{
                  padding: '2px 5px', border: 'none', borderRadius: 2, cursor: 'pointer',
                  fontSize: 8, fontFamily: 'inherit', fontWeight: 600,
                  background: fl === k ? '#22C55E20' : 'transparent', color: fl === k ? 'var(--green)' : 'var(--text-muted)',
                }}>{l}</button>
              ))}
              </div>
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
                  <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-primary)' }}>{w.t}</span>
                  {w.cm && <span style={{ fontSize: 6, color: '#D4A843' }}>💬</span>}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-bright)', lineHeight: 1.2, marginTop: 1 }}>{fp(w.p)}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: cC(w.c), marginTop: 1 }}>{fv(w.c)}</div>
              </div>
            ))}
          </div>
          {exp && watchlist.find(w => w.t === exp)?.cm && (() => {
            const w = watchlist.find(w => w.t === exp);
            return (
              <div style={{
                marginTop: 3, padding: '6px 10px', background: 'var(--surface)',
                border: '1px solid #D4A84330', borderLeft: '3px solid #D4A843',
                borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10,
              }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-primary)', marginRight: 6 }}>{exp}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{w.cm.tx}</span>
                  <span style={{ fontSize: 8, color: 'var(--text-secondary)' }}> — {w.cm.w}, {w.cm.a}</span>
                </div>
                <button onClick={() => sE(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit', flexShrink: 0 }}>✕</button>
              </div>
            );
          })()}
        </div>

        {/* ═══ INFO DIET + EARNINGS ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 6, marginBottom: 6 }}>
          {/* INFO DIET */}
          <div ref={refDiet} style={{ border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 8px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#22C55E', letterSpacing: '0.3px' }}>📡 INFO DIET</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 8, color: 'var(--text-muted)' }}>Lo que estamos compartiendo en el chat de 10am.pro</span>
                <ShareBtn onClick={() => shareSection(refDiet.current, 'info-diet')} />
              </div>
            </div>
            {diet.map((d, i) => (
              <a key={i} href={d.url} target="_blank" rel="noopener" style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', textDecoration: 'none',
                borderBottom: i < diet.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--hover-bg)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{
                  width: 42, height: 42, borderRadius: 3, background: `${d.color}15`,
                  border: `1px solid ${d.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{d.abbr}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 12, color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.3,
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>{d.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{d.src}</span>
                    <span style={{ fontSize: 8, color: 'var(--text-muted)' }}>·</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{d.ago}</span>
                  </div>
                </div>
                <span style={{ fontSize: 9, color: 'var(--text-muted)', background: 'var(--surface-2)', padding: '1px 4px', borderRadius: 2, flexShrink: 0 }}>{d.tag}</span>
              </a>
            ))}
          </div>

          {/* EARNINGS RADAR */}
          <div style={{ border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ padding: '3px 8px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#a78bfa' }}>📊 EARNINGS RADAR</span>
            </div>
            {nextUp && (
              <div style={{
                padding: '7px 10px', background: '#a78bfa08', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{nextUp.e}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{nextUp.t}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{nextUp.n}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {nextUp.eps != null && <span style={{ fontSize: 10, color: '#a78bfa', fontWeight: 600 }}>EPS est: ${nextUp.eps}</span>}
                  {nextUp.time && <span style={{ fontSize: 8, color: 'var(--text-muted)', background: 'var(--surface-2)', padding: '0px 4px', borderRadius: 2 }}>{nextUp.time}</span>}
                  <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{nextUp.d} · <span style={{ color: '#a78bfa', fontWeight: 700 }}>{nextUp.days}d</span></span>
                  <span style={{ fontSize: 8, fontWeight: 700, color: '#a78bfa', background: '#a78bfa18', padding: '1px 5px', borderRadius: 2, border: '1px solid #a78bfa30' }}>NEXT UP</span>
                </div>
              </div>
            )}
            {restEarn.map((e, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '5px 10px', borderBottom: i < restEarn.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
                onMouseEnter={ev => ev.currentTarget.style.background = 'var(--hover-bg)'}
                onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12 }}>{e.e}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>{e.t}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{e.n}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {e.eps != null && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>EPS est: ${e.eps}</span>}
                  {e.time && <span style={{ fontSize: 8, color: 'var(--text-muted)', background: 'var(--surface-2)', padding: '0px 4px', borderRadius: 2 }}>{e.time}</span>}
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{e.d} · {e.days}d</span>
                </div>
              </div>
            ))}
            {earnings.length === 0 && (
              <div style={{ padding: '8px', fontSize: 9, color: 'var(--text-muted)', textAlign: 'center' }}>Sin earnings próximos</div>
            )}
          </div>
        </div>

        {/* ═══ EDITORIAL INSIGHTS ═══ */}
        <div ref={refInsights} style={{ border: '1px solid #D4A84325', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
          <div style={{
            padding: '5px 10px', background: 'linear-gradient(90deg, #D4A84310, transparent)',
            borderBottom: '1px solid #D4A84320', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#D4A843', letterSpacing: '0.5px' }}>💡 CONTEXTO 10AMPRO</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>Actualizado hoy</span>
              <ShareBtn onClick={() => shareSection(refInsights.current, 'insights')} />
            </div>
          </div>
          {insights.map((ins, i) => (
            <div key={i} style={{
              padding: '8px 10px', borderBottom: i < insights.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              borderLeft: `3px solid ${ins.color}30`,
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--hover-bg)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: ins.color, background: `${ins.color}15`, padding: '1px 6px', borderRadius: 2, letterSpacing: '0.3px' }}>{ins.tag}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{ins.text}</div>
              {ins.link && (
                <a href={`${ins.link.url}${ins.link.url.includes('?') ? '&' : '?'}utm_source=hub&utm_medium=insights&utm_campaign=article-link`} target="_blank" rel="noopener" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5,
                  fontSize: 10, color: '#D4A843', textDecoration: 'none', fontWeight: 600,
                }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                  📎 {ins.link.label}
                </a>
              )}
            </div>
          ))}
          <a href="https://10am.substack.com?utm_source=hub&utm_medium=insights&utm_campaign=deep-dive-cta" target="_blank" rel="noopener" style={{
            display: 'block', padding: '5px 10px', fontSize: 10, color: '#D4A843',
            textDecoration: 'none', borderTop: '1px solid #D4A84320', textAlign: 'center',
            background: '#D4A84306', fontWeight: 600,
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#D4A84310'}
            onMouseLeave={e => e.currentTarget.style.background = '#D4A84306'}>
            Más análisis y deep dives en 10am.pro →
          </a>
        </div>

        {/* ═══ SUBSCRIBE CTA ═══ */}
        <a href="https://10am.pro/subscribe?utm_source=hub&utm_medium=cta&utm_campaign=subscribe" target="_blank" rel="noopener" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '10px 16px', marginBottom: 6,
          background: 'linear-gradient(90deg, #22C55E08, #22C55E12, #22C55E08)',
          border: '1px solid #22C55E25', borderRadius: 6,
          textDecoration: 'none', cursor: 'pointer',
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Este briefing se construye con nuestros deep dives semanales.</span>
          <span style={{ fontSize: 11, color: '#22C55E', fontWeight: 700, whiteSpace: 'nowrap' }}>Suscríbete gratis →</span>
        </a>

        {/* ═══ QUICK ACCESS CARDS ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 6 }}>
          <a href="https://forecast2026.vercel.app/?utm_source=hub&utm_medium=card&utm_campaign=forecast" target="_blank" rel="noopener" style={{
            display: 'flex', flexDirection: 'column', padding: '10px 14px',
            background: 'linear-gradient(135deg, #D4A84308, #D4A84315)',
            border: '1px solid #D4A84330', borderRadius: 6, textDecoration: 'none',
            transition: 'border-color 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>📊</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#D4A843', letterSpacing: '0.3px' }}>FORECAST 2026</span>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.4, fontWeight: 600 }}>Tracker del portafolio</span>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 4 }}>Tesis de inversión en tiempo real →</span>
          </a>
          <a href="https://luma.com/calendar/cal-yWCOIiS6eA71eGD?utm_source=hub&utm_medium=card&utm_campaign=eventos" target="_blank" rel="noopener" style={{
            display: 'flex', flexDirection: 'column', padding: '10px 14px',
            background: 'linear-gradient(135deg, #22C55E08, #22C55E15)',
            border: '1px solid #22C55E30', borderRadius: 6, textDecoration: 'none',
            transition: 'border-color 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>🗓️</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#22C55E', letterSpacing: '0.3px' }}>EVENTOS 10AMPRO</span>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.4, fontWeight: 600 }}>Calendario de eventos</span>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 4 }}>Episodio 200 en vivo, meetups y más →</span>
          </a>
        </div>

        {/* ═══ SHARE BAR ═══ */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '8px 0', margin: '4px 0' }}>
          <button
            onClick={() => {
              const url = window.location.origin + '/api/story';
              const link = document.createElement('a');
              link.href = url;
              link.download = '10ampro-briefing.png';
              link.click();
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '6px 14px', border: '1px solid #D4A84340', borderRadius: 6,
              background: '#D4A84310', color: '#D4A843', fontSize: 10, fontWeight: 600,
              fontFamily: 'inherit', cursor: 'pointer', letterSpacing: '0.3px',
            }}
          >
            📸 Compartir mi briefing
          </button>
          <button
            onClick={() => {
              const text = '📡 Mi briefing de hoy — 10AMPRO\n\n' + window.location.href;
              if (navigator.share) {
                navigator.share({ title: '10AMPRO Briefing', text, url: window.location.href }).catch(() => {});
              } else {
                navigator.clipboard.writeText(text).then(() => alert('Link copiado!')).catch(() => {});
              }
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '6px 14px', border: '1px solid #22C55E40', borderRadius: 6,
              background: '#22C55E10', color: '#22C55E', fontSize: 10, fontWeight: 600,
              fontFamily: 'inherit', cursor: 'pointer', letterSpacing: '0.3px',
            }}
          >
            🔗 Compartir link
          </button>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '4px 0', borderTop: '1px solid var(--border)' }}>
          <a href="https://10am.pro?utm_source=hub&utm_medium=footer&utm_campaign=nav" target="_blank" rel="noopener" style={{ fontSize: 9, color: 'var(--text-muted)', textDecoration: 'none' }}>Substack</a>
          <a href="https://x.com/holdmybirra" target="_blank" rel="noopener" style={{ fontSize: 9, color: '#22C55E', textDecoration: 'none' }}>@holdmybirra</a>
        </div>

      </div>
      <style>{`@keyframes p{0%,100%{opacity:1}50%{opacity:.3}}*{box-sizing:border-box;margin:0;padding:0}body{-webkit-font-smoothing:antialiased}::-webkit-scrollbar{width:2px}::-webkit-scrollbar-thumb{background:#ffffff10;border-radius:1px}`}</style>
    </div>
  );
}
