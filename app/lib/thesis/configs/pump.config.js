import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'pump', name: 'Pump.fun', symbol: 'PUMP', cgId: 'pump-fun', host: 'mercados.10am.pro/pump',
  sector: 'Solana memecoin launchpad & AMM',
  tagline: 'Revenue de launches + PumpSwap, buyback agresivo — el token más ligado al ciclo de memes.',
  description: 'Pump.fun ($PUMP) en vivo: fees y revenue del launchpad y PumpSwap, buyback, supply overhang on-chain (tesorería, ICO, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'trade-the-cycle', reviewed: '16 Oct 2026',
  ta: {
    updated: '16 Oct 2026', bias: 'BEAR',
    read: 'El primer piso ya no está. Tres cierres seguidos para abajo — 0.005016 (14 Oct), 0.004768 (15 Oct) y 0.004537 (16 Oct) — y el último debajo de la EMA50 (0.00468), que el 13 Oct escribí como el primer soporte real. Hoy 0.004424: sobre la trendline de junio (0.00448) por nada, y ya tocando el +1M bajista (0.0044) intradía. Tres de siete (era cuatro): perdió la 50; queda la EMA200 subiendo (0.00324, +18% en 20 días) y la 50 sobre la 200 — la tendencia de junio todavía existe en las medias largas, pero el precio devolvió el 79% del tramo 0.00385 → 0.00652 en once sesiones. Un impulso que devuelve más de tres cuartos no es pullback: es el tramo deshaciéndose entero, y el objetivo es su base, 0.00385. RSI 37, sin sobreventa — hay espacio para abajo. Volumen $132M, 42% del promedio de 20 días ($314M): nadie vende con pánico y nadie compra; en un token de memes eso es la actividad apagándose, que es exactamente lo que la capa de revenue debería estar mostrando. Relativo: −19.3% en siete días con SOL −3.0% — 6× el mercado, el peor de la página por segunda revisión seguida. Esto es debilidad propia: el ciclo de memes se está cerrando mientras SOL apenas corrige. Con trade-the-cycle como stance, el ciclo ya dijo que no; lo que queda es la trendline de junio como última línea antes de que la tendencia desde el ATL (0.0012) se convierta en rango.',
    pattern: '<b>Impulso de octubre devuelto; la tendencia de junio en su última línea.</b> Mínimos crecientes 0.0014 → 0.0027 → 0.0035 → 0.00385 (25 Sep), trendline hoy en 0.00448 — el precio la está tocando. El 5 Oct (0.00652) fue un máximo de agotamiento: once sesiones después devolvió el 79% del tramo desde 0.00385 y perdió la EMA20 (13 Oct) y la EMA50 (16 Oct). La secuencia de mínimos crecientes se defiende en 0.00385; debajo, el 14 Sep (0.00348) y después la EMA200 (0.00324), que coincide con el 61.8% de todo el tramo junio → octubre. Un cierre bajo la trendline con volumen convierte la tendencia de junio en un rango 0.0032–0.0052.',
    watch: '<b>0.00448 y 0.00468.</b> Abajo: cierre bajo la trendline de junio (0.00448) abre 0.00385 directo — no hay nada en el medio. Arriba: recuperar la EMA50 (0.00468) al cierre frena la caída; el que anula el sesgo bajista sigue siendo 0.00546 (mínimo del 10 Oct), 23% arriba. <b>Volumen:</b> $132M, 42% del promedio; un rebote con $150M es cortos cerrando; un día de $400M+ bajo 0.0044 es la salida de los que compraron sobre 0.006. <b>Revenue:</b> la capa de network manda — si el revenue diario bajó con el precio, el buyback no sostiene la trendline y 0.00385 llega rápido. <b>Relativo:</b> 6× SOL en la semana; el día que PUMP suba con SOL plano, el ciclo volvió a abrirse. Hasta ahí, no.',
    decision: [
      'Con posición: <b>reducir en cualquier rebote a 0.0047–0.0051</b> (EMA50 y EMA20) mientras no cierre sobre 0.00546. Lo que quede, con stop en el cierre bajo 0.00448 (trendline de junio): ahí la tendencia desde el ATL deja de ser argumento y el siguiente nivel es 0.00385.',
      'Sin posición: <b>nada</b>. La watchlist empieza en 0.00385 (mínimo del 25 Sep) con volumen de capitulación y el revenue en máximos; la entrada por fuerza es el cierre sobre 0.00546 con volumen sobre $300M. Comprar la trendline sin volumen es comprar el nivel que se está rompiendo.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.00546</b> con volumen sobre el promedio → 0.00563 (cierre 12 Oct) → 0.00652.',
    ],
    invalidation: { level: 0.00546, text: 'Cierre diario sobre 0.00546 (mínimo del 10 Oct, con la EMA20 en 0.00514 y la EMA50 en 0.00468 recuperadas en el camino) anula el path bajista → 0.00563 (cierre del 12 Oct) y 0.00652 (máximo del 5 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.00385, how: 'Trendline de junio (0.00448) perdida al cierre → mínimo del 25 Sep. El tramo de octubre devuelto entero. Con el revenue sosteniendo $1M+/día y un rebote con volumen desde la trendline, el +1M es 0.0044–0.0051.' },
      { d: 90, h: '+3M', target: 0.00348, how: 'Mínimo del 14 Sep, el último de la escalera de agosto–septiembre. Es el escenario de revenue de memes cayendo con el mercado; si el revenue hace máximos mientras el precio baja, el +3M vuelve a la EMA20 (0.0051).' },
      { d: 365, h: '+1Y', target: 0.0032, how: '61.8% del tramo junio → octubre (0.0012 → 0.00652), que hoy coincide con la EMA200 (0.00324). Solo si la manía se apaga y el buyback no alcanza; con el ciclo de memes de vuelta, el +1Y recupera 0.00652.' },
    ],
    levels: {
      resistance: [[0.00468, 'EMA50 — perdida el 16 Oct'], [0.00477, 'Cierre 15 Oct'], [0.00502, 'Cierre 14 Oct'], [0.00514, 'EMA20'], [0.00546, 'INVALIDACIÓN · mínimo 10 Oct'], [0.00563, 'Cierre 12 Oct'], [0.00652, 'Máximo 5 Oct · máximo del año'], [0.0071, 'Máximo Oct-25']],
      support: [[0.00454, 'Cierre 16 Oct'], [0.00448, 'Trendline de mínimos desde junio · última línea'], [0.00385, 'Mínimo 25 Sep · +1M'], [0.00348, 'Mínimo 14 Sep · +3M'], [0.0032, 'EMA200 + 61.8% junio → octubre · +1Y'], [0.00267, 'Mínimo 17 Ago']],
    },
  },
  sources: 'Network telemetry: DefiLlama (pump.fun fees/revenue, PumpSwap volume).',
  rule: 'revenue mensual <40% del pico + buyback cayendo = salir del todo (no hay tesis de largo plazo sin volumen de memes); revenue en máximos con buyback ≥ 2% del supply/mes = mantener.',
  forecast: {
    updated: '21 Sep 2026', score1m: 52, score3m: 58,
    body: [
      '<b>1M · 52/100.</b> El buyback mas agresivo de Solana y de casi todo cripto: <b>$446.65M acumulados al 3 Sep, 16.38% del supply original quemado</b>, con revenue de 90 dias en ~$1.21M/dia. PUMP y HYPE juntos son ~90% de los $638M en buybacks de cripto en 2026. El mecanismo funciona y es visible on-chain — pero el activo sigue siendo trade-the-cycle: sin mania de memes, el revenue se apaga y el buyback con el.',
      '<b>3M · 58/100.</b> Mejora a 3M por la misma logica de siempre: el buyback compone si el revenue sostiene, y la rotacion alt (si BTC.D afloja) le pega primero a los tokens con caja. La regla de la casa queda intacta: revenue <40% del pico + buyback cayendo = salir del todo.',
      '<b>Invalidacion ·</b> volumen de memes migrando de chain o de launchpad, buyback reducido por la DAO, o tesoreria/equipo apareciendo en CEX.',
    ],
  },
  thesis: [
    '<b>Qué es.</b> Pump.fun es el launchpad de memecoins de Solana y, desde 2025, también el AMM (PumpSwap) donde gradúan. Cobra fee sobre cada trade del bonding curve y del AMM. Revenue en SOL, enorme en los picos del ciclo, y una parte se usa para comprar PUMP en el mercado.',
    '<b>La tesis.</b> No es una inversión de largo plazo: es el activo con más beta al ciclo de memes de Solana. Cuando hay manía, el revenue es de los más altos de todo cripto y el buyback es visible en el chart; cuando no, se apaga. La estructura de supply (ICO de $600M, tesorería enorme, 33% en equipo/inversores) añade overhang permanente.',
    '<b>Lo que valida.</b> Revenue mensual volviendo a máximos, buyback sostenido (≥1–2% del supply/mes), PumpSwap ganando share vs Raydium/Meteora en tokens graduados.',
    '<b>Lo que rompe.</b> Volumen de memes migrando a otra chain o a otro launchpad (BONK/LetsBonk, etc.), regulación sobre launchpads, buyback reducido, o tesorería/equipo vendiendo. El riesgo reputacional (lawsuits) es estructural.',
  ],
  network: {
    title: 'fees · revenue · PumpSwap volume (DefiLlama)',
    note: 'Fees = cobrado en bonding curves + PumpSwap (monthly sum). Revenue = parte del protocolo (fuente del buyback). Volume = swaps en PumpSwap.',
    metrics: [
      { key: 'revenue', label: 'Protocol revenue', source: 'llama-fees', slug: 'pump.fun', dataType: 'dailyRevenue', unit: 'usd', primary: true },
      { key: 'fees', label: 'Total fees', source: 'llama-fees', slug: 'pump.fun', dataType: 'dailyFees', unit: 'usd' },
      { key: 'swapvol', label: 'PumpSwap volume', source: 'llama-dex', slug: 'pumpswap', unit: 'usd' },
    ],
  },
  onchain: {
    mint: 'pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H7Dfn', supply: 1_000_000_000_000, decimals: 6, treasuryPct: 3,
    labels: {},
    programs: {},
    staking: null,
    read: ({ chain, d, fmtNum, pctS }) => {
      const ho = chain.holders; if (!ho) return 'Holders scan unavailable.';
      const tr = ho.treasuryLike, ex = ho.exchange, daily = d?.price && d?.vol24 ? d.vol24 / d.price : null;
      return `<b>PUMP tiene el overhang más grande de los cinco.</b> ${pctS(tr)} del supply en wallets sin etiqueta ≥3%: tesorería, equipo (20%) e inversores (13%) con vesting, más la reserva de ecosistema. No hay staking que lockee nada. <div style="margin-top:6px"><b>Exchanges:</b> ${fmtNum(ex)} PUMP (${pctS(ex)}) en CEX etiquetados${daily ? `, ≈${(ex / daily).toFixed(1)} días de volumen` : ''}. El float que circula es ICO + airdrop + mercado secundario — y el buyback compra contra eso.</div><div style="margin-top:6px"><b>Decisión:</b> › el único número: <b>buyback mensual / supply circulante</b>. ≥1.5%/mes sostiene el precio aunque el revenue caiga; &lt;0.5%/mes y el overhang gana. › Wallets de tesorería moviéndose a CEX = salir el mismo día. › No hay razón para holdear PUMP en un ciclo sin memes: es trade, no inversión.</div>`;
    },
  },
  tripwires: ({ M, chain, trend, fc }) => [
    tw.metric(M, 'revenue', { good: 75, watch: 40 }),
    tw.metric(M, 'fees', { good: 75, watch: 40 }),
    tw.metric(M, 'swapvol', { good: 70, watch: 40 }),
    tw.concentration(chain, { exchangeWarnPct: 10, treasuryWarnPct: 35 }),
    tw.trend(trend, fc),
    tw.custom('watch', '◦', 'Buyback intensity', 'El buyback se financia con revenue; sin tesis de largo plazo, la intensidad del buyback (% del supply/mes) es lo único que sostiene el precio entre ciclos. Mirar la wallet de buyback on-chain, no anuncios.'),
    tw.custom('watch', '◦', 'Launchpad share', 'BONK/LetsBonk, Bags y otros launchpads compiten por el mismo flujo. Si la share de launches de Pump.fun cae bajo 50% sostenido, el revenue no vuelve a máximos aunque el ciclo vuelva.'),
  ],
  decision: decisionBuilder('PUMP', {
    flips: ({ net, U }) => {
      const r = net?.revenue;
      return [
        `<b>Ciclo de memes activo</b>: revenue mensual ${r?.peak ? `sobre <b>${U(r.peak * 0.75)}</b> (hoy ${U(r.latest)})` : 'en máximos'} con share de launchpad estable. Sin esto, no hay caso.`,
        `Buyback ≥1.5% del supply circulante por mes, verificable on-chain.`,
        `Tesorería / inversores moviéndose a exchanges = salir sin esperar el chart. En PUMP esto es lo que más rápido rompe el precio.`,
        `Launchpad share cayendo bajo 50% = el revenue no vuelve aunque el ciclo vuelva. Reducir.`,
      ];
    },
  }),
};
