'use client';
import { useState, useEffect } from 'react';

// ============================================================
// EL 10X MÁS RÁPIDO — 24 meses (mercados.10am.pro/el-10x-mas-rapido)
// Acompaña el artículo "La Violación de la Narrativa".
// Datos = snapshot puntual (ver AS_OF). Se mueven a diario.
// ============================================================

const AS_OF = '23 jun 2026';

// Acentos fijos (legibles en claro y oscuro):
const VEL = '#f2641e';   // calor = velocidad / urgencia (eje Y)
const PROB = '#2aa3d4';  // frío  = probabilidad (eje X)

// Seis convicciones, en orden de ranking por VELOCIDAD de 10x.
// cap/tgt en $B. prob/vel = lectura cualitativa 0–100.
const A = [
  { tk: 'HIMS', nm: 'Hims & Hers', rank: 1, price: '$33.64', cap: 7.8, tgt: 78, capL: '$7.8B', tgtL: '$78B',
    prob: 34, vel: 92, cmp: '≈ farmacéutica mediana',
    onto: 'Alta — modelo del cuerpo a escala de consumo',
    sc: 'Inflexionando — GLP-1 / telesalud',
    cat: 'Sí — péptidos, comité FDA 23–24 jul',
    fuel: '~40% del flotante en corto · FCF positivo',
    desc: 'Base mínima, curva-S de salud al consumidor inflexionando.',
    verdict: 'El 10x más rápido, si llega. Base mínima, curva-S empinada y un resorte de cortos listo para dispararse.' },
  { tk: 'HOOD', nm: 'Robinhood', rank: 2, price: '$104.76', cap: 95.3, tgt: 953, capL: '$95B', tgtL: '$950B',
    prob: 48, vel: 78, cmp: '≈ club del billón',
    onto: 'La más alta — predicción, tokenización, banca, agentes',
    sc: 'Inflexionando — finanzas on-chain',
    cat: 'Sí — CLARITY Act en el Senado',
    fuel: 'Ganancias reales (~$1.9B utilidad 2025)',
    desc: 'La máquina que más rápido expande qué vende. Techo de $950B la frena.',
    verdict: 'Máquina posiblemente superior a todas. El techo de $950B es lo único que la deja segunda en velocidad.' },
  { tk: 'SOL', nm: 'Solana', rank: 3, price: '$73', cap: 43, tgt: 430, capL: '$43B', tgtL: '$430B',
    prob: 44, vel: 64, cmp: 'ya estuvo sobre $120B',
    onto: 'Alta — donde el dato on-chain se compone más rápido',
    sc: 'Inflexionando — rieles no-fiat',
    cat: 'Sí — ETF vivos + CLARITY',
    fuel: 'Beta cripto — arma de doble filo',
    desc: 'Mejor historia de rieles no-fiat: ~$650B/mes en stablecoins.',
    verdict: 'La mejor historia de rieles no-fiat. Su velocidad está atada a que la marea de Warsh deje de bajar.' },
  { tk: 'PLTR', nm: 'Palantir', rank: 4, price: '$119.50', cap: 286, tgt: 2860, capL: '$286B', tgtL: '$2.9T',
    prob: 62, vel: 42, cmp: '> cualquier empresa de hoy',
    onto: 'De clase mundial — la que enseñó la palabra',
    sc: 'Madura en gobierno, acelerando en comercial',
    cat: 'Mixto — backlash europeo de soberanía',
    fuel: 'Múltiplo comprimiéndose (40x ventas)',
    desc: 'Velocidad de ontología de clase mundial, pero múltiplo comprimiéndose.',
    verdict: 'Gran empresa, pregunta equivocada. Alta probabilidad de 10x algún día; baja velocidad para hacerlo a 24 meses.' },
  { tk: 'TSLA', nm: 'Tesla', rank: 5, price: '$404', cap: 1500, tgt: 15000, capL: '$1.5T', tgtL: '$15T',
    prob: 78, vel: 24, cmp: '> cualquier empresa de la historia',
    onto: 'Altísima a escala — robotaxi + Optimus + energía',
    sc: 'Robotaxi temprano, motor multi-año',
    cat: 'Lento — capex $25B, FCF a negativo',
    fuel: '—',
    desc: '10x imposible a 24m ($15T), pero alta probabilidad a la Laffont.',
    verdict: 'El 10x a 24m es aritméticamente imposible. Pero por probabilidad a la Laffont, de las más altas de la lista.' },
  { tk: 'BTC', nm: 'Bitcoin', rank: 6, price: '$66K', cap: 1300, tgt: 13000, capL: '$1.3T', tgtL: '$13T',
    prob: 84, vel: 14, cmp: '≈ todo el oro del mundo',
    onto: 'Cero, por diseño — la anti-máquina',
    sc: 'N/A — monolito que se niega a moverse',
    cat: 'Debasement estructural, lento',
    fuel: 'Salidas de ETF en risk-off',
    desc: 'Máxima convicción de largo plazo, velocidad de ontología cero. La pista, no el caballo.',
    verdict: 'Máxima convicción de largo plazo y el 10x más lento. La pista contra la que mido a todos, no el caballo más rápido.' },
];

const VIOL = [
  { lvl: 'Unicornio', rng: '$1B – $10B', pct: 8, w: 26 },
  { lvl: 'Decacornio', rng: '$10B – $100B', pct: 13, w: 42 },
  { lvl: 'Centacornio', rng: '$100B – $1T', pct: 31, w: 100 },
];

const MACRO = [
  { k: 'Fed · Warsh', v: '3.50–3.75%', n: 'Cuarto hold seguido. El dot plot ya muestra alzas, no recortes.' },
  { k: 'Inflación', v: 'CPI 4.2%', n: 'PCE ~3.6%. La guerra con Irán la volvió a picar; el petróleo enfría al margen.' },
  { k: 'Bonos', v: '10Y 4.5%', n: '2Y en 4.2%, máximos desde feb-25. Tasa real positiva castiga la opcionalidad.' },
  { k: 'Pólvora seca', v: '$7.9T', n: 'Récord en money markets. No se mueve: el efectivo todavía paga ~4%.' },
  { k: 'Petróleo · WTI', v: '~$76', n: 'Mínimos de 3 meses tras el marco de desescalada con Irán. Riesgo: re-escalada.' },
  { k: 'Capex IA', v: '~$750B', n: 'Hyperscalers en 2026. Ya no cabe en el FCF: se financia con deuda (~$1.5T por venir).' },
];

// ---------- helpers ----------
function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
function velColor(v) {
  const t = Math.max(0, Math.min(1, (v - 14) / (92 - 14)));
  // cool(PROB) -> warm(VEL)
  const r = lerp(0x2a, 0xf2, t), g = lerp(0xa3, 0x64, t), b = lerp(0xd4, 0x1e, t);
  return `rgb(${r},${g},${b})`;
}
function capDiameter(cap, mb) {
  const lg = Math.log10(cap), lo = Math.log10(7.8), hi = Math.log10(1500);
  const base = mb ? 13 : 16, range = mb ? 22 : 28;
  return Math.round(base + (lg - lo) / (hi - lo) * range);
}
const px = (p) => 9 + p * 0.80;   // % desde la izquierda (eje X = probabilidad)
const py = (v) => 11 + v * 0.80;  // % desde abajo (eje Y = velocidad)

// log ladder: $1B -> $20T
const LOmin = Math.log10(1), LOmax = Math.log10(20000);
const lpos = (capB) => (Math.log10(capB) - LOmin) / (LOmax - LOmin) * 100;

const MONO = "'JetBrains Mono',monospace";
const DISP = "'Space Grotesk',sans-serif";
const BODY = "'Plus Jakarta Sans',sans-serif";

function SectionHead({ n, title, sub }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
        <span style={{ fontFamily: MONO, fontSize: 12, color: VEL, letterSpacing: '0.06em' }}>{n}</span>
        <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-bright)' }}>{title}</span>
      </div>
      {sub && <p style={{ fontFamily: BODY, fontSize: 13, color: 'var(--text-muted)', margin: '0 0 22px', maxWidth: 640 }}>{sub}</p>}
    </>
  );
}

export default function ElDiezXMasRapido() {
  const [sel, setSel] = useState(0);
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

  const a = A[sel];
  const selCol = velColor(a.vel);

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: mb ? '6px 8px' : '10px 20px' }}>
      {/* HEADER */}
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
      <div style={{ marginBottom: 26 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: VEL, letterSpacing: '1.5px', marginBottom: 14, fontFamily: MONO }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: VEL, boxShadow: `0 0 10px ${VEL}` }} />
          EL 10X MÁS RÁPIDO · 24 MESES
        </div>
        <h1 style={{ fontSize: mb ? 28 : 46, fontWeight: 800, color: 'var(--text-bright)', lineHeight: 1.06, letterSpacing: '-0.02em', fontFamily: DISP, margin: '0 0 16px', maxWidth: '15ch' }}>
          El 10x más <span style={{ color: VEL }}>rápido</span> no es el más <span style={{ color: PROB }}>probable</span>.
        </h1>
        <p style={{ fontSize: mb ? 14 : 16, color: 'var(--text-secondary)', fontFamily: BODY, lineHeight: 1.6, maxWidth: 660, margin: 0 }}>
          Seis convicciones del portafolio, rankeadas por una sola pregunta: ¿cuál multiplica por diez primero, dentro de la ventana de 24 meses? Coatue midió que es más probable hacer 10x cuando ya eres grande — una violación de la narrativa. Pero probabilidad y velocidad son ejes distintos, casi opuestos. Esta es la lectura completa detrás del artículo.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 11, color: 'var(--text-muted)', marginTop: 16, fontFamily: MONO }}>
          <span>Snapshot · {AS_OF}</span><span>·</span>
          <span>SOL · BTC · TSLA · HOOD · PLTR · HIMS</span><span>·</span>
          <span>Base · precio de mercado de hoy</span>
        </div>
      </div>

      {/* ARTÍCULO — portada + paywall (solo imagen y título, sin contenido) */}
      <a href="https://www.10am.pro/p/cual-de-mis-6-convicciones-hara-10x" target="_blank" rel="noopener"
        style={{ display: 'block', textDecoration: 'none', marginBottom: 34 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: VEL }} /> El artículo · 10am.pro
        </div>
        <div style={{ border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', background: 'var(--surface)' }}>
          {/* cover */}
          <div style={{ position: 'relative', lineHeight: 0 }}>
            <img
              src="https://substackcdn.com/image/fetch/$s_!9TBt!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F519ea920-3dec-4a36-b493-eedeebba1f96_1642x958.png"
              alt="¿Cuál de Mis 6 Convicciones Hará 10x Primero?"
              loading="lazy"
              style={{ width: '100%', height: 'auto', display: 'block' }} />
            {/* lock badge */}
            <div style={{ position: 'absolute', top: 12, right: 12, display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: MONO, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '6px 11px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.18)' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
              Solo alphas
            </div>
          </div>
          {/* body */}
          <div style={{ padding: mb ? '18px 16px 20px' : '22px 24px 24px' }}>
            <h2 style={{ fontFamily: DISP, fontWeight: 800, fontSize: mb ? 21 : 27, lineHeight: 1.12, letterSpacing: '-0.015em', color: 'var(--text-bright)', margin: '0 0 10px' }}>
              ¿Cuál de Mis 6 Convicciones Hará 10x Primero?
            </h2>
            <p style={{ fontFamily: BODY, fontSize: mb ? 13.5 : 15, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '0 0 18px', maxWidth: 620 }}>
              Bitcoin, Tesla, Palantir, Solana, Hims y Robinhood compiten en una carrera donde el caballo más pequeño no necesariamente es el más rápido.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--text-muted)' }}>
                Hernán Jaramillo · <span style={{ color: VEL }}>@holdmybirra</span> · 24 jun 2026
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: '#fff', background: VEL, padding: '11px 18px', borderRadius: 10, whiteSpace: 'nowrap' }}>
                Suscríbete para leer →
              </span>
            </div>
          </div>
        </div>
      </a>

      {/* 01 — RANKING */}
      <div style={{ marginBottom: 30 }}>
        <SectionHead n="01" title="El Ranking — velocidad de 10x"
          sub="Ordenado por velocidad, no por tamaño. Cálido = los rápidos · frío = los lentos pero probables." />
        <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
          {A.map((x, i) => {
            const col = velColor(x.vel);
            return (
              <div key={x.tk} style={{ display: 'grid', gridTemplateColumns: mb ? '28px 1fr' : '40px 92px 1fr auto', alignItems: 'center', columnGap: 14, rowGap: 6, padding: mb ? '12px 13px' : '14px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
                <div style={{ fontFamily: DISP, fontWeight: 800, fontSize: mb ? 16 : 19, color: col, textAlign: 'center' }}>{x.rank}</div>
                <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: mb ? 14 : 15, color: 'var(--text-bright)' }}>
                  {x.tk}{!mb && <span style={{ display: 'block', fontWeight: 400, fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>{x.nm}</span>}
                </div>
                <div style={{ fontFamily: BODY, fontSize: 13, color: 'var(--text-secondary)', gridColumn: mb ? '1 / -1' : 'auto' }}>{x.desc}</div>
                <div style={{ fontFamily: MONO, fontSize: mb ? 11.5 : 12.5, textAlign: mb ? 'left' : 'right', whiteSpace: 'nowrap', gridColumn: mb ? '1 / -1' : 'auto' }}>
                  <span style={{ color: 'var(--text-bright)' }}>{x.capL}</span>
                  <span style={{ color: 'var(--text-muted)', margin: '0 6px' }}>→</span>
                  <span style={{ color: col }}>{x.tgtL}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 02 — MATRIX (signature) */}
      <div style={{ marginBottom: 30 }}>
        <SectionHead n="02" title="La Matriz — probabilidad × velocidad" />
        <p style={{ fontFamily: BODY, fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 22px', maxWidth: 660, lineHeight: 1.6 }}>
          El eje frío (→) es la <b style={{ color: PROB }}>probabilidad de eventualmente hacer 10x</b>, al estilo de la violación de Laffont: sube con la escala. El eje cálido (↑) es la <b style={{ color: VEL }}>velocidad del 10x en 24 meses</b>: sube con base chica, curva-S empinada, catalizador en ventana y combustible reflexivo. El tamaño del punto es la capitalización de hoy. Toca un activo.
        </p>

        {/* plot */}
        <div style={{
          position: 'relative', width: '100%', aspectRatio: mb ? '1 / 1.04' : '1 / 0.74', minHeight: mb ? 360 : 320,
          background: `radial-gradient(120% 120% at 12% 10%, ${VEL}22, transparent 42%), radial-gradient(120% 120% at 88% 90%, ${PROB}22, transparent 42%), var(--surface)`,
          border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 16,
        }}>
          {/* quadrant labels */}
          <span style={{ position: 'absolute', top: 12, left: 34, fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>rápido · poco probable</span>
          <span style={{ position: 'absolute', bottom: 40, right: 14, fontFamily: MONO, fontSize: 9, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>probable · lento</span>
          {/* y axis */}
          <div style={{ position: 'absolute', left: 12, top: 14, bottom: 34, display: 'flex', alignItems: 'center' }}>
            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.1em', color: VEL, textTransform: 'uppercase', whiteSpace: 'nowrap', opacity: 0.9 }}>velocidad · 10x en 24 meses →</span>
          </div>
          {/* x axis */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 12, textAlign: 'center' }}>
            <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.1em', color: PROB, textTransform: 'uppercase', opacity: 0.9 }}>probabilidad de 10x (escala / Laffont) →</span>
          </div>
          {/* dots */}
          {A.map((x, i) => {
            const dia = capDiameter(x.cap, mb), col = velColor(x.vel), on = i === sel;
            return (
              <button key={x.tk} type="button" onClick={() => setSel(i)}
                aria-label={`${x.nm} — velocidad ${x.vel}, probabilidad ${x.prob}`}
                style={{
                  position: 'absolute', left: `${px(x.prob)}%`, bottom: `${py(x.vel)}%`,
                  transform: 'translate(-50%, 50%)', width: dia, height: dia, borderRadius: '50%',
                  background: col, color: col, border: '1.5px solid rgba(0,0,0,0.35)', cursor: 'pointer', padding: 0,
                  boxShadow: on ? `0 0 0 3px var(--bg), 0 0 0 5px ${col}, 0 0 22px ${col}` : 'none',
                  zIndex: on ? 6 : 2, outline: 'none',
                }}>
                <span style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)', fontFamily: MONO, fontSize: mb ? 9 : 10, fontWeight: 700, color: 'var(--text-bright)', letterSpacing: '0.03em', pointerEvents: 'none', textShadow: '0 1px 3px var(--bg)' }}>{x.tk}</span>
              </button>
            );
          })}
        </div>

        {/* readout */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px' }}>
          <span style={{ display: 'inline-block', fontFamily: MONO, fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, color: '#fff', background: selCol, marginBottom: 8 }}>#{a.rank} VELOCIDAD</span>
          <div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 22, color: 'var(--text-bright)', letterSpacing: '-0.01em' }}>
            {a.nm} <span style={{ color: 'var(--text-muted)', fontFamily: MONO, fontSize: 15 }}>{a.tk}</span>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 14 }}>
            {a.price} · cap {a.capL} <span style={{ color: 'var(--text-muted)' }}>→ 10x</span> <span style={{ color: selCol }}>{a.tgtL}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            {[{ k: 'Velocidad ↑', v: a.vel, c: VEL }, { k: 'Probabilidad →', v: a.prob, c: PROB }].map((m) => (
              <div key={m.k} style={{ flex: 1, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 9, padding: '10px 11px' }}>
                <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 7 }}>{m.k}</div>
                <div style={{ height: 5, borderRadius: 3, background: 'var(--border)', overflow: 'hidden', marginBottom: 7 }}>
                  <div style={{ height: '100%', width: `${m.v}%`, borderRadius: 3, background: m.c }} />
                </div>
                <div style={{ fontFamily: MONO, fontSize: 12, color: 'var(--text-primary)' }}>{m.v}/100</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: BODY, fontSize: 13.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{a.verdict}</p>
        </div>
      </div>

      {/* 03 — TECHO */}
      <div style={{ marginBottom: 30 }}>
        <SectionHead n="03" title="El Techo — qué exige cada 10x"
          sub="Capitalización de hoy (●) y destino del 10x (◌), en escala logarítmica. El destino de HIMS cae donde viven las mid-caps; el de BTC y TSLA, contra la pared del mundo." />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 22 }}>
          {/* gridlines */}
          {[[10, '$10B'], [100, '$100B'], [1000, '$1T'], [10000, '$10T']].map(([val, lab]) => (
            <div key={lab} style={{ position: 'absolute', top: 0, bottom: 0, left: `${lpos(val)}%`, width: 1, background: 'var(--border-subtle)' }}>
              <span style={{ position: 'absolute', top: 0, left: 0, transform: 'translateX(-50%)', fontFamily: MONO, fontSize: 9.5, color: 'var(--text-muted)' }}>{lab}</span>
            </div>
          ))}
          {A.map((x) => {
            const nowP = lpos(x.cap), tgtP = lpos(x.tgt);
            return (
              <div key={x.tk} style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
                  <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 13, color: 'var(--text-bright)' }}>{x.tk}</span>
                  <span style={{ fontFamily: BODY, fontSize: 11.5, color: 'var(--text-muted)' }}>{x.tgtL} · {x.cmp}</span>
                </div>
                <div style={{ position: 'relative', height: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6 }}>
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${nowP}%`, borderRadius: '6px 0 0 6px', background: `linear-gradient(90deg, ${VEL}40, ${VEL}99)` }} />
                  <div style={{ position: 'absolute', top: '50%', left: `${nowP}%`, transform: 'translate(-50%,-50%)', width: 11, height: 11, borderRadius: '50%', background: 'var(--text-bright)', boxShadow: '0 0 0 3px var(--bg)' }} />
                  <div style={{ position: 'absolute', top: '50%', left: `${tgtP}%`, transform: 'translate(-50%,-50%)', width: 11, height: 11, borderRadius: '50%', border: `2px solid ${VEL}`, boxShadow: `0 0 0 3px var(--bg), 0 0 12px ${VEL}88` }} />
                  <span style={{ position: 'absolute', top: -20, left: `${tgtP}%`, transform: 'translateX(-50%)', fontFamily: MONO, fontSize: 10, color: VEL, whiteSpace: 'nowrap' }}>10x</span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 22, fontFamily: MONO, fontSize: 10.5, color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--text-bright)' }} /> capitalización hoy</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: '50%', border: `2px solid ${VEL}` }} /> destino 10x</span>
          <span style={{ color: 'var(--text-muted)' }}>escala log · $1B → $20T</span>
        </div>
      </div>

      {/* 04 — LAFFONT VIOLATION */}
      <div style={{ marginBottom: 30 }}>
        <SectionHead n="04" title="La Violación — datos de Coatue"
          sub="Probabilidad de volver a hacer 10x desde cada categoría de tamaño. Mientras más grande, más probable." />
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : 'repeat(3,1fr)', gap: 14 }}>
          {VIOL.map((v, i) => (
            <div key={v.lvl} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 16px' }}>
              <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{v.lvl}</div>
              <div style={{ fontFamily: MONO, fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>{v.rng}</div>
              <div style={{ fontFamily: DISP, fontWeight: 800, fontSize: mb ? 44 : 52, lineHeight: 1, margin: '14px 0 12px', color: PROB, opacity: i === 0 ? 0.5 : i === 1 ? 0.78 : 1 }}>{v.pct}%</div>
              <div style={{ height: 6, borderRadius: 4, background: 'var(--border)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${v.w}%`, background: PROB, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: BODY, fontSize: 13, color: 'var(--text-secondary)', margin: '18px 0 0', maxWidth: 660, lineHeight: 1.6 }}>
          <b style={{ color: 'var(--text-bright)' }}>La narrativa que todos nos contamos —el pez chico que es fácil de multiplicar— es falsa.</b> El tamaño no causa el 10x: es el residuo de una máquina con alta velocidad de ontología. Llegaste a gigante porque tu modelo del mundo mejora más rápido que el de nadie, y eso no se apaga solo. Fuente: análisis de Coatue sobre empresas tech respaldadas por capital de riesgo; horizonte de 5+ años.
        </p>
      </div>

      {/* 05 — MACRO */}
      <div style={{ marginBottom: 30 }}>
        <SectionHead n="05" title="El Gobernador — macro, jun 2026"
          sub="En este tape no hay marea que levante a todos. La velocidad tiene que venir de un catalizador propio, no de la liquidez." />
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : 'repeat(3,1fr)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          {MACRO.map((m, i) => (
            <div key={m.k} style={{ background: 'var(--surface)', padding: '16px', borderTop: (mb && i > 0) ? '1px solid var(--border-subtle)' : (!mb && i > 2) ? '1px solid var(--border-subtle)' : 'none', borderLeft: (!mb && i % 3 !== 0) ? '1px solid var(--border-subtle)' : 'none' }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{m.k}</div>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 20, color: 'var(--text-bright)', margin: '9px 0 4px' }}>{m.v}</div>
              <div style={{ fontFamily: BODY, fontSize: 11.5, color: 'var(--text-secondary)', lineHeight: 1.45 }}>{m.n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 06 — SIX BREAKDOWN */}
      <div style={{ marginBottom: 30 }}>
        <SectionHead n="06" title="Los Seis — desglose"
          sub="Cada apuesta contra las variables que de verdad mueven la velocidad." />
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 14 }}>
          {A.map((x) => {
            const col = velColor(x.vel);
            return (
              <div key={x.tk} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
                  <div style={{ fontFamily: DISP, fontWeight: 800, fontSize: 16, width: 26, height: 26, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', background: col, flex: '0 0 auto' }}>{x.rank}</div>
                  <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 14, color: 'var(--text-bright)' }}>{x.tk}<span style={{ display: 'block', fontWeight: 400, fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{x.nm}</span></div>
                  <div style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 11, color: 'var(--text-secondary)', textAlign: 'right', whiteSpace: 'nowrap' }}>{x.capL} <span style={{ color: 'var(--text-muted)' }}>→</span> <span style={{ color: col }}>{x.tgtL}</span></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                  {[['Ontología', x.onto], ['Curva-S', x.sc], ['Catalizador', x.cat], ['Reflexivo', x.fuel]].map(([k, v]) => (
                    <div key={k} style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 10, alignItems: 'center' }}>
                      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{k}</div>
                      <div style={{ fontFamily: BODY, fontSize: 12.5, color: 'var(--text-primary)' }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: BODY, fontSize: 13, color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', paddingTop: 12, lineHeight: 1.55 }}>{x.verdict}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 07 — METHODOLOGY */}
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '16px 18px', marginBottom: 22 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase' }}>Metodología & Notas</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontFamily: BODY, fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          <li>Precios y capitalizaciones son un <b style={{ color: 'var(--text-primary)' }}>snapshot del {AS_OF}</b> y se mueven a diario. El ranking relativo es más durable que las cifras absolutas.</li>
          <li>Las posiciones en la matriz son una <b style={{ color: 'var(--text-primary)' }}>lectura cualitativa propia</b>, no una métrica de mercado. <b style={{ color: 'var(--text-primary)' }}>Velocidad</b> = base + posición en la curva-S + catalizador dentro de la ventana de 24m + combustible reflexivo (cortos, narrativa). <b style={{ color: 'var(--text-primary)' }}>Probabilidad</b> = durabilidad/escala demostrada, al estilo de la violación de Laffont.</li>
          <li>Los datos de Coatue (8% / 13% / 31%) provienen de su análisis de empresas tech respaldadas por VC, con un horizonte de apreciación de 5+ años. Miden probabilidad, no velocidad.</li>
          <li>Cifras macro (Fed, bonos, money markets, petróleo, capex) de fuentes públicas a junio 2026.</li>
          <li>"10x en 24 meses" es un resultado de cola para <b style={{ color: 'var(--text-primary)' }}>los seis</b>. Esto es contexto de datos y research, no una predicción ni asesoría de inversión.</li>
        </ul>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 18 }}>
          <a href="https://mercados.10am.pro" style={{ fontFamily: MONO, fontSize: 12, textDecoration: 'none', padding: '11px 16px', borderRadius: 9, border: '1px solid var(--border)', color: 'var(--text-primary)' }}>↗ mercados.10am.pro</a>
          <a href="https://eldiad.10am.pro" style={{ fontFamily: MONO, fontSize: 12, textDecoration: 'none', padding: '11px 16px', borderRadius: 9, border: '1px solid var(--border)', color: 'var(--text-primary)' }}>★ Día D · 14 oct · EAFIT Medellín</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ padding: '14px 0 40px', borderTop: '1px solid var(--border)', fontFamily: MONO }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <a href="https://10am.pro" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>10am.pro · La Violación de la Narrativa</a>
          <span style={{ fontSize: 12, color: VEL, fontWeight: 700 }}>@holdmybirra</span>
        </div>
        <p style={{ fontFamily: BODY, fontSize: 11, color: 'var(--text-muted)', marginTop: 16, lineHeight: 1.6, maxWidth: 760 }}>
          Descargo de responsabilidad: el contenido es subjetivo y exclusivamente educativo. No constituye asesoría de inversión ni una oferta o solicitud de compra o venta de valores. Realiza tu propio análisis y diligencia. El autor puede tener o no exposición a los activos mencionados; las posiciones pequeñas son herramientas de estudio, no apuestas de convicción.
        </p>
      </footer>
    </div>
  );
}
