import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jup', name: 'Jupiter', symbol: 'JUP', cgId: 'jupiter-exchange-solana', host: 'mercados.10am.pro/jup',
  sector: 'Solana DEX aggregation & perps',
  tagline: 'Volumen, fees y buyback — el agregador que procesa la mayoría de los swaps de Solana.',
  description: 'Jupiter ($JUP) en vivo: volumen del agregador, fees, revenue y buyback, supply overhang on-chain (vote escrow, tesorería, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-and-add-on-fee-growth', reviewed: '22 Sep 2026',
  ta: {
    updated: '22 Sep 2026', bias: 'BULL',
    read: 'El chart más limpio de la página después de SOL: siete de siete, EMA200 subiendo (+3.5% en 20 días), la 50 sobre la 200 desde julio, y el volumen de 20 días en 200% del de 90 — el doble. La ruptura fue el 17–18 Sep: de 0.2377 a 0.2655 en un día y 0.299 dos días después. Mínimos crecientes desde marzo (0.142 → 0.147 → 0.166 → 0.205 → 0.216) y ningún máximo decreciente en el camino. Hoy: 0.292 después de tocar 0.299 el 19 Sep — dos días de pausa bajo 0.30 con RSI 65. Es una pausa dentro de un impulso, no una distribución; pero +29% en la semana con el buyback de Litterbox como único dato nuevo es momento de sector, y el sector se devuelve cuando BTC rebota. Beta a SOL de 1.6× esta semana.',
    pattern: '<b>Tendencia alcista — mínimos crecientes, sin techo definido.</b> Línea de soporte 0.142 (30 Mar) → 0.147 (11 Jun), hoy en ~0.155 — lejos, porque el impulso de septiembre despegó del piso. Los pivotes que mandan ahora: 0.216 (16 Sep), 0.2377 (día de la ruptura), 0.2655 (primer cierre post-break), 0.299 (máximo 19 Sep). Arriba no hay estructura hasta 0.4735, el máximo de Sep-Oct 25.',
    watch: '<b>0.30.</b> Dos cierres bajo el máximo del 19 Sep con volumen cayendo = pausa; volumen creciendo sin pasar 0.30 = distribución. <b>El retest que vale:</b> 0.2655 (nivel del breakout) y después la EMA20 (0.252). Un pullback ahí con volumen secándose es la compra del mes. <b>Volumen:</b> 200% del 90d — si baja de 120% mientras el precio no rompe 0.30, el impulso terminó. <b>Litterbox:</b> el buyback compra con revenue, no con precio: si el volumen del agregador cae, el piso fundamental baja con él.',
    decision: [
      'Con posición: <b>mantener mientras cierre sobre 0.24</b>. Hold-and-add-on-fee-growth: el add es en 0.25–0.27 con revenue sosteniendo, no en 0.30 con RSI 65.',
      'Sin posición: <b>retest de 0.2655 o de la EMA20 (0.252)</b> con volumen cayendo. Segundo tramo en cierre &gt; 0.30 con 2× volumen.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.24</b>. Ahí la ruptura del 17 Sep se devuelve y el objetivo vuelve a ser 0.216 y la EMA50 (0.229).',
    ],
    invalidation: { level: 0.24, text: 'Cierre diario bajo 0.24 (el nivel desde donde rompió el 17 Sep) anula el path → 0.216 (mínimo 16 Sep) y EMA50 (0.229); debajo de eso, 0.205.' },
    path: [
      { d: 30, h: '+1M', target: 0.33, how: 'Cierre sobre 0.30 con 2× volumen → 0.33 (medida: 0.2655 + altura del impulso 0.06). Con retest de 0.2655 primero es más sano que sin él.' },
      { d: 90, h: '+3M', target: 0.40, how: 'Extensión del impulso hacia la zona de Nov-25. Requiere volumen del agregador estable y el buyback corriendo: 0.40 es fundamentales, no chart.' },
      { d: 365, h: '+1Y', target: 0.47, how: 'Retest del máximo de Sep-Oct 25 (0.4735). Solo con share estable y perps/lending creciendo — el chart llega si el múltiplo comprime.' },
    ],
    levels: {
      resistance: [[0.299, 'Máximo 19 Sep'], [0.33, 'Medida del impulso de septiembre'], [0.40, 'Zona de Nov-25'], [0.4735, 'Máximo Sep-Oct 25']],
      support: [[0.2655, 'Nivel del breakout (18 Sep) — el retest'], [0.252, 'EMA20'], [0.24, 'INVALIDACIÓN · base de la ruptura'], [0.229, 'EMA50'], [0.216, 'Mínimo 16 Sep'], [0.155, 'Trendline de mínimos desde marzo']],
    },
  },
  sources: 'Network telemetry: DefiLlama (Jupiter aggregator volume, fees, revenue).',
  rule: 'volumen mensual <50% del pico + buyback reducido = reducir; share del agregador estable y fees en máximos = mantener aunque el chart esté feo.',
  forecast: {
    updated: '21 Sep 2026', score1m: 60, score3m: 64,
    body: [
      '<b>1M · 60/100.</b> El mejor momento fundamental del token desde el TGE: 3B quemados y net-zero (cero unlocks por delante), Litterbox comprando con el 50% del revenue (un dia de $822K de revenue el 30 Ago = ~$400K a compra), JupUSD lanzado con Ethena y respaldo del fondo tokenizado de BlackRock, y la mania de StonkFun pagandole el routing. Bonus politico: voto contra SGP-3 defendiendo a las apps — y gano.',
      '<b>3M · 64/100.</b> El buyback anualizado (~$17M ≈ 2–3% del mcap) es real pero no alcanza solo: necesita share del agregador estable y perps/lending creciendo para que el multiplo comprima. Sigue debajo de SOL y arriba de todo lo demas de esta pagina.',
      '<b>Invalidacion ·</b> revenue cayendo mas rapido que el volumen (compresion de take rate), la DAO tocando el % del Litterbox, o perdida de share contra routing directo.',
    ],
  },
  thesis: [
    '<b>Qué es.</b> Jupiter enruta la mayor parte de los swaps en Solana (agregador), corre perps, DCA, límite y un launchpad. Cobra fees sobre ese flujo y destina el 50% del revenue a comprar JUP (buyback), que va al lock de 3 años (Litterbox).',
    '<b>La tesis.</b> Es el único activo de Solana donde revenue → token ya está cableado y es verificable. Y en 2026 arreglo el otro lado de la ecuacion: quemo 3B JUP (supply de 10B a ~6.9B) y decidio net-zero — no quedan unlocks programados. La pregunta ya no es la dilucion: es a que multiplo pagas un buyback de ~$17M anualizados (~2–3% del mcap).',
    '<b>Lo que valida.</b> Volumen mensual del agregador estable o creciendo vs Solana total (share), fees y revenue en máximos, JUP staked (vote escrow) creciendo, buyback ≥ unlocks mensuales.',
    '<b>Lo que rompe.</b> Pérdida de share frente a routing directo / otros agregadores, DAO diluyendo con emisiones (airdrops grandes), tesorería vendiendo, o fees cayendo más rápido que el volumen (compresión de take rate).',
  ],
  network: {
    title: 'aggregator volume · fees · revenue (DefiLlama)',
    note: 'Volume = swaps enrutados por el agregador (monthly sum). Fees = total cobrado; revenue = parte del protocolo (de aquí sale el buyback al 50%).',
    metrics: [
      { key: 'volume', label: 'Aggregator volume', source: 'llama-agg', slug: 'jupiter-aggregator', unit: 'usd', primary: true },
      { key: 'perpfees', label: 'Perps fees', source: 'llama-fees', slug: 'jupiter-perpetual-exchange', dataType: 'dailyFees', unit: 'usd' },
      { key: 'fees', label: 'Fees', source: 'llama-fees', slug: 'jupiter-aggregator', dataType: 'dailyFees', unit: 'usd' },
      { key: 'revenue', label: 'Revenue', source: 'llama-fees', slug: 'jupiter-aggregator', dataType: 'dailyRevenue', unit: 'usd' },
      { key: 'tvl', label: 'TVL (perps + lend)', source: 'llama-tvl', slug: 'jupiter', unit: 'usd' },
    ],
  },
  onchain: {
    mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', supply: 10_000_000_000, decimals: 6, treasuryPct: 3,
    labels: {},
    programs: { voTpe3tHQ7AjQHMapgSue2HuFAcoSJM9NVVpM7aHhhY: ['Jupiter vote escrow (staked JUP)', 'staking'] },
    staking: { manual: { label: 'Staked (vote escrow)', total: null, source: 'vote.jup.ag — escrows per-user, not aggregated here', note: 'Ver vote.jup.ag para total staked' } },
    read: ({ chain, d, fmtNum, pctS }) => {
      const ho = chain.holders; if (!ho) return 'Holders scan unavailable.';
      const tr = ho.treasuryLike, ex = ho.exchange, stk = ho.staking, daily = d?.price && d?.vol24 ? d.vol24 / d.price : null;
      return `<b>JUP es un token de supply gigante con un float chico.</b> ${pctS(tr)} del supply vive en wallets sin etiqueta ≥3% (tesorería, equipo, reserva de airdrops). Eso no se vende mañana, pero define el techo: cada emisión de la DAO es dilución contra el buyback. <div style="margin-top:6px"><b>Lo que sí importa:</b> ${stk ? `${fmtNum(stk)} JUP (${pctS(stk)}) detectados en escrows de voto en el top-20` : 'el vote escrow'} — tokens lockeados hasta 30 días para salir. ${fmtNum(ex)} JUP (${pctS(ex)}) en CEX etiquetados${daily ? `, ≈${(ex / daily).toFixed(1)} días de volumen` : ''}.</div><div style="margin-top:6px"><b>Decisión:</b> › la métrica que manda es <b>buyback mensual vs emisiones</b>: si la DAO emite más de lo que compra, el precio no puede subir por fundamentales. › Tesorería grande moviéndose a CEX = salir. › Staked JUP cayendo = los holders más convencidos se van; reducir.</div>`;
    },
  },
  tripwires: ({ M, chain, trend, fc }) => [
    tw.metric(M, 'volume', { good: 75, watch: 45 }),
    tw.metric(M, 'fees', { good: 80, watch: 50 }),
    tw.metric(M, 'revenue', { good: 80, watch: 50 }),
    tw.concentration(chain, { exchangeWarnPct: 10, treasuryWarnPct: 35 }),
    tw.trend(trend, fc),
    tw.custom('pass', '✓', 'Revenue → JUP link exists', '50% del revenue del protocolo compra JUP (Litterbox, lock 3 años). Es el único de los 5 hubs con el cable puesto. Tripwire pasa a ! si la DAO reduce el % o pausa el buyback.'),
    tw.custom('pass', '✓', 'Emisiones vs buyback — resuelto por diseno', 'Burn de 3B JUP + decision net-zero: no quedan unlocks programados. El flotante ya no crece por calendario; solo crece si la DAO emite (airdrops/grants). Pasa a ! si aparece una emision nueva que supere el buyback del mes.'),
  ],
  decision: decisionBuilder('JUP', {
    flips: ({ net, U }) => {
      const v = net?.volume, r = net?.revenue;
      return [
        `<b>Buyback &gt; emisiones</b> durante 3 meses seguidos — ahí el supply se vuelve deflacionario en la práctica y el múltiplo comprime.`,
        `Volumen mensual ${v?.peak ? `volviendo sobre <b>${U(v.peak * 0.75)}</b> (hoy ${U(v.latest)})` : 'recuperando el pico'} con share del agregador estable.`,
        `DAO pausando o recortando el buyback = el cable revenue→token se corta. Reducir sin esperar el chart.`,
        `Tesorería / reserva de airdrops moviéndose a exchanges = salir.`,
      ];
    },
  }),
};
