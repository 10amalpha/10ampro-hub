import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jup', name: 'Jupiter', symbol: 'JUP', cgId: 'jupiter-exchange-solana', host: 'mercados.10am.pro/jup',
  sector: 'Solana DEX aggregation & perps',
  tagline: 'Volumen, fees y buyback — el agregador que procesa la mayoría de los swaps de Solana.',
  description: 'Jupiter ($JUP) en vivo: volumen del agregador, fees, revenue y buyback, supply overhang on-chain (vote escrow, tesorería, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-and-add-on-fee-growth', reviewed: '22 Sep 2026',
  ta: {
    updated: '11 Oct 2026', bias: 'BULL',
    read: 'El único chart de la página que subió en una semana en la que SOL cayó 8%: +10.8%, nuevo máximo de 12 meses en 0.3747 el 10 Oct, y el mínimo del 3 Oct (0.3153) más alto que todo lo anterior. El +1M de 0.33 del 22 Sep se cumplió en seis días; el +3M de 0.40 está a 8%. Cinco de siete, EMA200 subiendo 10.8% en 20 días — la más empinada de la página después de PUMP — y el dato que más pesa: RSI 49 con el precio a 2% del máximo. Subió 52% en el mes sin sobrecomprarse porque consolidó dos semanas en 0.315–0.36 antes del último tramo. El MACD en cero es consecuencia de esa consolidación, no una señal. Volumen 178% del 90d, $85M hoy — no es un pico, es un piso más alto de actividad. Beta negativa en la semana: eso es demanda propia, y en un alt solo pasa cuando hay un comprador que no es el mercado (el buyback, o alguien grande). Lo que falta: la capa de network — si el volumen del agregador no acompaña, el precio va adelantado.',
    pattern: '<b>Tendencia alcista en escalera:</b> mínimos crecientes 0.1418 (30 Mar) → 0.1473 (11 Jun) → 0.1664 (16 Ago) → 0.216 (16 Sep) → 0.3153 (3 Oct); máximos crecientes 0.1976 → 0.2392 → 0.2754 → 0.3722 → 0.3747. Impulso, consolidación de dos semanas, impulso — tres veces seguidas. Sin techo estructural entre acá y 0.40 (zona de Nov-25). Altura del último impulso (0.216 → 0.3747) = 0.16 → medida 0.47–0.48 desde el mínimo del 3 Oct, que coincide con el máximo de Sep-Oct 25.',
    watch: '<b>0.3153 y 0.40.</b> El mínimo del 3 Oct es la base de este escalón; perderlo con volumen termina la escalera por ahora. 0.40 es la primera zona de oferta real (Nov-25): ahí se vende una parte o se espera el retest, no se compra. <b>Volumen:</b> una semana de $85–100M/día sosteniendo el precio sobre 0.35 es consolidación sana; un día de $200M con el precio sin pasar 0.3747 es distribución. <b>Relativo:</b> JUP/SOL subiendo con SOL cayendo es la señal más rara del mes — mientras dure, el chart manda sobre el macro; el día que JUP caiga más que SOL, se acabó.',
    decision: [
      'Con posición: <b>mantener; parcial en 0.40</b> si llega sin dato nuevo de fees. Sumar solo en 0.33–0.34 (EMA20 + base del escalón), no en 0.37.',
      'Sin posición: <b>no a 0.37 a 2% del máximo</b>. La entrada es el retest de 0.33–0.335 que aguante (25% del tamaño objetivo), o el cierre sobre 0.3747 con volumen → segundo tramo hacia 0.40.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.31</b>. Ahí el escalón de octubre falló → 0.289 (EMA50) → 0.257.',
    ],
    invalidation: { level: 0.31, text: 'Cierre diario bajo 0.31 (pierde el mínimo del 3 Oct y la EMA20 con margen) anula el path → 0.289 (EMA50) y 0.257 (mitad del tramo desde el 16 Sep); debajo de eso, 0.234 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 0.40, how: 'Cierre sobre 0.3747 con volumen → 0.40, la zona de Nov-25. Con retest de 0.33 primero es más sano que sin él.' },
      { d: 90, h: '+3M', target: 0.4445, how: 'Máximo de los últimos 12 meses (Oct-25). Requiere volumen del agregador acompañando y el buyback corriendo: de 0.40 para arriba es fundamentales, no chart.' },
      { d: 365, h: '+1Y', target: 0.55, how: 'Medida del impulso de octubre (0.3153 + 0.233). Solo con share estable y perps/lending creciendo — el chart llega si el múltiplo comprime.' },
    ],
    levels: {
      resistance: [[0.3747, 'Máximo 10 Oct · máximo de 12 meses'], [0.40, 'Zona de Nov-25 · primera oferta real'], [0.4445, 'Máximo Oct-25'], [0.4735, 'Máximo Sep-Oct 25 · medida corta'], [0.55, 'Medida del impulso']],
      support: [[0.3358, 'Cierre 9 Oct'], [0.332, 'EMA20 · zona de sumar'], [0.3153, 'Mínimo 3 Oct · base del escalón'], [0.31, 'INVALIDACIÓN'], [0.289, 'EMA50'], [0.257, 'Mitad del tramo desde el 16 Sep'], [0.234, 'EMA200 — subiendo']],
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
