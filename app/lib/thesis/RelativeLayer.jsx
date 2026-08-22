'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

const GRN = '#22c55e', BLU = '#5b8cff', AMB = '#f59e0b', RED = '#ef4444', PUR = '#8b5cf6';
const MONO = "'JetBrains Mono',monospace", SANS = "'Plus Jakarta Sans',system-ui,sans-serif";
const pc = (x, d = 0) => (x == null || isNaN(x) ? '—' : `${x >= 0 ? '+' : ''}${(x * 100).toFixed(d)}%`);
const fmtUsd = (n) => { if (n == null || isNaN(n)) return '—'; const a = Math.abs(n); if (a >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B'; if (a >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M'; if (a >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'k'; return '$' + n.toFixed(2); };

function RatioChart({ t, a, b, labelA, labelB, height = 220 }) {
  const ref = useRef(null); const [w, setW] = useState(680); const [hover, setHover] = useState(null);
  useEffect(() => { if (!ref.current) return; const ro = new ResizeObserver((es) => setW(Math.max(280, es[0].contentRect.width))); ro.observe(ref.current); return () => ro.disconnect(); }, []);
  if (!t || t.length < 10) return <div style={{ color: 'var(--text-muted)', fontSize: 11, padding: 20 }}>loading…</div>;
  const L = 46, R = 12, T = 14, B = 24, iw = w - L - R, ih = height - T - B;
  const all = a.concat(b); const lo = Math.min(...all) * 0.9, hi = Math.max(...all) * 1.05;
  const X = (i) => L + (i / (t.length - 1)) * iw, Y = (v) => T + ih - ((Math.log(v) - Math.log(lo)) / (Math.log(hi) - Math.log(lo))) * ih;
  const path = (arr) => arr.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
  const onMove = (e) => { const r = e.currentTarget.getBoundingClientRect(); const px = ((e.clientX - r.left) / r.width) * w; setHover(Math.max(0, Math.min(t.length - 1, Math.round(((px - L) / iw) * (t.length - 1))))); };
  const grid = [0.1, 0.2, 0.3, 0.5, 0.7, 1, 1.5, 2, 3, 5].filter((g) => g > lo && g < hi);
  return (
    <div ref={ref} style={{ width: '100%', position: 'relative' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" onMouseMove={onMove} onMouseLeave={() => setHover(null)} style={{ display: 'block' }}>
        {grid.map((g) => <g key={g}><line x1={L} x2={w - R} y1={Y(g)} y2={Y(g)} stroke={g === 1 ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.05)'} strokeDasharray={g === 1 ? '4 3' : ''} /><text x={L - 6} y={Y(g) + 3} textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily={MONO}>{g}x</text></g>)}
        <path d={path(b)} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.3" />
        <path d={path(a)} fill="none" stroke={PUR} strokeWidth="2" />
        {hover != null && <g><line x1={X(hover)} x2={X(hover)} y1={T} y2={T + ih} stroke={PUR} strokeDasharray="3 3" opacity=".6" /><circle cx={X(hover)} cy={Y(a[hover])} r="3.5" fill={PUR} /><circle cx={X(hover)} cy={Y(b[hover])} r="3" fill="#fff" /></g>}
        {[0, Math.floor((t.length - 1) / 2), t.length - 1].map((i, k) => <text key={k} x={X(i)} y={height - 7} textAnchor={k === 0 ? 'start' : k === 2 ? 'end' : 'middle'} fontSize="10" fill="var(--text-muted)" fontFamily={MONO}>{new Date(t[i]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</text>)}
      </svg>
      <div style={{ position: 'absolute', top: 6, right: 10, fontSize: 10.5, color: 'var(--text-muted)', fontFamily: MONO, display: 'flex', gap: 12 }}><span><span style={{ color: PUR }}>▬</span> {labelA}</span><span><span style={{ color: 'rgba(255,255,255,.5)' }}>▬</span> {labelB}</span></div>
      {hover != null && <div style={{ position: 'absolute', top: 26, left: Math.min(Math.max(8, (X(hover) / w) * (ref.current?.clientWidth || w) - 60), (ref.current?.clientWidth || w) - 150), background: 'var(--bg)', border: `1px solid ${PUR}`, borderRadius: 4, padding: '5px 8px', fontSize: 11, pointerEvents: 'none', whiteSpace: 'nowrap', fontFamily: MONO }}><div style={{ color: 'var(--text-muted)' }}>{new Date(t[hover]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div><div style={{ color: PUR, fontWeight: 700 }}>{labelA} {a[hover].toFixed(2)}x</div><div style={{ color: 'var(--text-secondary)' }}>{labelB} {b[hover].toFixed(2)}x</div></div>}
    </div>
  );
}

export default function RelativeLayer({ cgId, symbol, mb }) {
  const [r, setR] = useState(null);
  useEffect(() => { (async () => { try { const j = await (await fetch(`/api/relative?cg=${cgId}&sym=${symbol}`, { cache: 'no-store' })).json(); setR(j); } catch { setR({ ok: false, errors: ['fetch failed'] }); } })(); }, [cgId, symbol]);
  const s = r?.stats, m = r?.macro, d = r?.derivs;
  const tile = (k, v, sub, c) => <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '8px 10px', minWidth: 0 }}><div style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{k}</div><div style={{ fontSize: 15, fontWeight: 800, marginTop: 3, color: c || 'var(--text-primary)' }}>{v}</div>{sub ? <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div> : null}</div>;

  // ---- lectura en español, sin jerga ----
  const read = useMemo(() => {
    if (!s) return null;
    const L = [];
    const beta = s.betaSol90, corr = s.corrSol90;
    const relSol = s.relSol90, relBtc = s.relBtc90;
    const ratioAtLow = s.vsSolNow <= s.vsSolLow365 * 1.05;
    const ratioStrong = s.vsSolNow >= s.vsSolHigh365 * 0.9;
    // 1. ¿Se mueve solo o sigue a SOL?
    if (corr > 0.6) L.push(`<b>${symbol} no se mueve solo: sigue a SOL.</b> En los últimos 90 días, ${Math.round(corr * 100)}% de sus movimientos van en la misma dirección que Solana, y los amplifica ${beta.toFixed(1)}× (si SOL sube 10%, ${symbol} tiende a subir ${Math.round(beta * 10)}%; si baja 10%, baja ${Math.round(beta * 10)}%). Traducido: antes de mirar el chart de ${symbol}, mirá el de SOL.`);
    else if (corr > 0.3) L.push(`<b>${symbol} sigue parcialmente a SOL</b> (correlación ${Math.round(corr * 100)}%, beta ${beta.toFixed(1)}×). Hay algo propio en su precio — noticias del protocolo, unlocks, buyback — que pesa tanto como el mercado.`);
    else L.push(`<b>${symbol} se mueve por su cuenta</b> (correlación con SOL de solo ${Math.round(corr * 100)}%). El mercado general explica poco; lo que manda son sus propios catalizadores. Eso es bueno si el catalizador es positivo, y peligroso si es un unlock.`);
    // 2. ¿Gana o pierde contra SOL?
    if (relSol != null) {
      if (relSol < -0.2) L.push(`<b>Contra SOL está perdiendo: ${pc(relSol)} en 90 días.</b> Es decir, si en vez de ${symbol} hubieras tenido SOL, hoy tendrías ${Math.round(-relSol * 100)}% más. ${ratioAtLow ? `Y el ratio ${symbol}/SOL está en mínimos del año: el mercado todavía no encuentra una razón para preferir ${symbol} sobre la chain donde vive.` : ''}`);
      else if (relSol > 0.2) L.push(`<b>Contra SOL está ganando: ${pc(relSol)} en 90 días.</b> Hay demanda específica por ${symbol}, no solo por Solana. ${ratioStrong ? `El ratio ${symbol}/SOL está cerca de máximos del año — el mercado le está dando prima.` : ''}`);
      else L.push(`<b>Contra SOL va parejo</b> (${pc(relSol)} en 90 días). ${symbol} se comporta como "Solana con más volatilidad", sin prima ni castigo propio.`);
    }
    // 3. Macro
    if (m?.btcDominance != null) L.push(`<b>Contexto:</b> BTC domina el ${m.btcDominance.toFixed(1)}% del mercado cripto. ${m.btcDominance > 58 ? 'Con dominancia alta, el dinero se queda en Bitcoin y los alts sangran aunque BTC suba — no es buen momento para esperar que un alt chico despegue solo.' : m.btcDominance < 50 ? 'Dominancia baja = temporada de alts: el dinero rota hacia tokens más chicos. Es el viento de cola que un alt necesita.' : 'Dominancia media: ni temporada de alts ni huida a BTC. El token tiene que ganarse el movimiento con fundamentales.'}`);
    // 4. Derivados
    if (d?.venue) {
      const f = d.funding, ann = f * 3 * 365;
      L.push(`<b>Posicionamiento en futuros (${d.venue}):</b> open interest ${fmtUsd(d.oiUsd)}, funding ${(f * 100).toFixed(4)}% cada 8h (${pc(ann)} anualizado). ${f > 0.0005 ? 'Funding alto y positivo = los que están largos pagan caro por mantener la posición. Demasiada gente apostando a que sube; es combustible para una caída rápida si no sube.' : f < -0.0003 ? 'Funding negativo = los cortos pagan a los largos. Hay mucha gente apostando a la baja; si el precio sube un poco, esos cortos tienen que cerrar comprando y el movimiento se acelera (short squeeze). Riesgo para quien está corto, oportunidad táctica para quien está largo.' : 'Funding cerca de cero = nadie está sobreapalancado en ninguna dirección. El próximo movimiento va a depender de spot, no de liquidaciones.'}`);
    } else if (d) L.push(`<b>Futuros:</b> ${d.note}. Sin perps, no hay apalancamiento que liquidar: los movimientos son más lentos pero también más "honestos" (spot puro).`);
    return L;
  }, [s, m, d, symbol]);

  const decision = useMemo(() => {
    if (!s) return [];
    const D = [];
    const beta = s.betaSol90, corr = s.corrSol90, relSol = s.relSol90;
    if (corr > 0.6) D.push(`Con beta ${beta.toFixed(1)}× a SOL, <b>tu posición en ${symbol} es una posición apalancada en SOL</b>. Si ya tenés SOL, estás duplicando el mismo riesgo — contá ${symbol} como ${beta.toFixed(1)}× su peso en el portafolio.`);
    if (relSol != null && relSol < -0.2) D.push(`Perder contra SOL 90 días seguidos significa que <b>el mercado no compra la tesis todavía</b>. Si querés exposición a Solana, SOL es mejor vehículo hoy; ${symbol} solo tiene sentido si creés que el ratio va a dar vuelta — y eso necesita un catalizador con fecha.`);
    if (relSol != null && relSol > 0.2) D.push(`Ganar contra SOL es la señal más limpia de que <b>hay demanda propia</b>. Mientras el ratio ${symbol}/SOL haga máximos crecientes, el sesgo es mantener; si el ratio rompe su tendencia, reducir aunque el precio en USD siga subiendo.`);
    if (m?.btcDominance > 58) D.push(`Con BTC.D sobre 58%, <b>no persigas rallies de alts</b>: suelen ser rebotes, no tendencias. Esperá a que la dominancia caiga para subir tamaño.`);
    if (d?.venue && d.funding > 0.0005) D.push(`Funding alto = <b>no abras largos con apalancamiento</b> acá; si estás largo, tené stop. El mercado está cargado de un solo lado.`);
    if (d?.venue && d.funding < -0.0003) D.push(`Funding negativo = <b>no abras cortos ahora</b>; el squeeze te saca. Para largos, es un momento de menor riesgo relativo.`);
    if (!D.length) D.push(`Nada extremo en relativo ni en posicionamiento. <b>La decisión la marcan los fundamentales y el chart</b>, no esta capa.`);
    return D;
  }, [s, m, d, symbol]);

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: 16 }}>
      {!r ? <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>computing relative performance…</div> : (
        <>
          <div style={{ fontSize: 11.5, lineHeight: 1.55, color: 'var(--text-secondary)', fontFamily: SANS, marginBottom: 12, padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 4, background: 'rgba(255,255,255,.015)' }}>
            <b style={{ color: 'var(--text-primary)' }}>Por qué importa esto.</b> Un alt casi nunca se mueve solo: sigue a SOL y a BTC. Si {symbol} sube 20% pero SOL subió 30%, no ganaste — perdiste contra la alternativa más simple. Esta sección mide eso: cuánto sigue {symbol} al mercado, si le gana o le pierde, y si los traders apalancados están cargados de un lado (lo que anticipa movimientos bruscos).
          </div>
          {r.series && <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>{symbol}/SOL vs {symbol}/BTC · 365 días · base 1x = hace un año · log</div>
            <RatioChart t={r.series.t} a={r.series.vsSol} b={r.series.vsBtc} labelA={`${symbol}/SOL`} labelB={`${symbol}/BTC`} />
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 4, fontFamily: SANS }}>Lectura: si la línea sube, {symbol} le gana a SOL (o a BTC); si baja, le pierde. Bajo 1x = hoy compra menos SOL que hace un año.</div>
          </div>}
          {s && <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(2,1fr)' : 'repeat(6,1fr)', gap: 8 }}>
            {tile('vs SOL · 30d / 90d', `${pc(s.relSol30)} / ${pc(s.relSol90)}`, 'rendimiento relativo', s.relSol90 > 0 ? GRN : RED)}
            {tile('vs BTC · 90d', pc(s.relBtc90), 'rendimiento relativo', s.relBtc90 > 0 ? GRN : RED)}
            {tile('Beta a SOL · 90d', `${s.betaSol90.toFixed(2)}×`, `corr ${Math.round(s.corrSol90 * 100)}% · 30d: ${s.betaSol30.toFixed(2)}×`, s.betaSol90 > 1.5 ? AMB : 'var(--text-primary)')}
            {tile('BTC dominance', m?.btcDominance != null ? `${m.btcDominance.toFixed(1)}%` : '—', m?.solDominance != null ? `SOL ${m.solDominance.toFixed(1)}% · total ${fmtUsd(m.totalMcap)}` : '', m?.btcDominance > 58 ? RED : m?.btcDominance < 50 ? GRN : 'var(--text-primary)')}
            {tile('Funding · 8h', d?.venue ? `${(d.funding * 100).toFixed(4)}%` : '—', d?.venue ? `${d.venue} · ${pc(d.funding * 3 * 365)} anual` : (d?.note || ''), d?.funding > 0.0005 ? RED : d?.funding < -0.0003 ? GRN : 'var(--text-primary)')}
            {tile('Open interest', d?.venue ? fmtUsd(d.oiUsd) : '—', d?.venue ? 'posiciones abiertas en perps' : '', 'var(--text-primary)')}
          </div>}
          {read && <div style={{ marginTop: 12, padding: '10px 12px', border: `1px solid ${PUR}`, borderRadius: 4, background: 'rgba(139,92,246,.05)', fontSize: 11.5, lineHeight: 1.6, color: 'var(--text-secondary)', fontFamily: SANS }}>
            <b style={{ color: PUR, fontFamily: MONO, letterSpacing: '.08em' }}>LECTURA ·</b> {read.map((x, i) => <div key={i} style={{ marginTop: i ? 6 : 0, display: i ? 'block' : 'inline' }} dangerouslySetInnerHTML={{ __html: x }} />)}
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(139,92,246,.25)' }}>
              <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: PUR, fontFamily: MONO, marginBottom: 3 }}>Decisión</div>
              {decision.map((x, i) => <div key={i}>› <span dangerouslySetInnerHTML={{ __html: x }} /></div>)}
            </div>
          </div>}
          {r.errors?.length > 0 && <div style={{ fontSize: 10.5, color: RED, marginTop: 8 }}>partial: {r.errors.join(' · ')}</div>}
          <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: SANS }}>Fuentes: CoinGecko (precios diarios de {symbol}, SOL, BTC y dominancia), funding/OI del primer exchange que responde (Bybit → Binance → MEXC → Gate). Beta y correlación sobre retornos diarios. Recalculado en cada carga, cache 10 min.</div>
        </>
      )}
    </div>
  );
}
