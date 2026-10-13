import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jup', name: 'Jupiter', symbol: 'JUP', cgId: 'jupiter-exchange-solana', host: 'mercados.10am.pro/jup',
  sector: 'Solana DEX aggregation & perps',
  tagline: 'Volumen, fees y buyback — el agregador que procesa la mayoría de los swaps de Solana.',
  description: 'Jupiter ($JUP) en vivo: volumen del agregador, fees, revenue y buyback, supply overhang on-chain (vote escrow, tesorería, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-and-add-on-fee-growth', reviewed: '13 Oct 2026',
  ta: {
    updated: '13 Oct 2026', bias: 'BULL',
    read: 'El retest llegó. Después del máximo de 12 meses (0.3747 el 10 Oct) y de 0.3639 el 12 Oct, el 13 Oct cayó 8.8% a 0.3317 — exactamente la EMA20 (0.3309) y la zona de entrada que escribí el 11 Oct — y hoy sigue en 0.3234, 2% debajo. Cuatro de siete con el precio de hoy: perdió la 20, RSI 48, MACD negativo; la estructura larga sigue intacta — sobre la EMA50 (0.292) y la EMA200 (0.238, +10.5% en 20 días, la más empinada de la página). Volumen $79M en la caída, debajo del promedio de 20 días ($101M): no fue distribución, fue el mercado. −7% en la semana con SOL −11.7%: JUP sigue cayendo menos que el benchmark, pero ya no sube contra él. La escalera está viva mientras 0.3153 (mínimo del 3 Oct) aguante; la invalidación de 0.31 queda 4% abajo. Esto es lo que el plan pedía; la pregunta es si el retest aguanta al cierre, y eso se sabe en dos o tres sesiones, no hoy.',
    pattern: '<b>Tendencia alcista en escalera:</b> mínimos crecientes 0.1418 (30 Mar) → 0.1473 (11 Jun) → 0.1664 (16 Ago) → 0.216 (16 Sep) → 0.3153 (3 Oct); máximos crecientes 0.1976 → 0.2392 → 0.2754 → 0.3722 → 0.3747. Impulso, consolidación de dos semanas, impulso — tres veces seguidas. El retest del escalón de octubre está en curso: 0.3317 al cierre del 13 Oct sobre la EMA20; el escalón sigue entero mientras no cierre bajo 0.3153. Sin techo estructural entre acá y 0.40 (zona de Nov-25). Altura del último impulso (0.216 → 0.3747) = 0.16 → medida 0.47–0.48 desde el mínimo del 3 Oct, que coincide con el máximo de Sep-Oct 25.',
    watch: '<b>0.3153 y 0.3309.</b> El retest se valida con dos cierres sobre la EMA20 (0.331) con volumen seco; se rompe con un cierre bajo 0.3153 (mínimo del 3 Oct), que deja la invalidación de 0.31 a nada. <b>Volumen:</b> $79M en la caída, bajo el promedio — bien; un día de $150M+ cerrando bajo 0.32 cambia la lectura a distribución. <b>Relativo:</b> JUP/SOL dejó de subir pero no se dio vuelta (−7% vs −11.7%); el día que JUP caiga más que SOL, se acabó la demanda propia. <b>0.3747:</b> el máximo del 10 Oct es el techo del retest; cerrar sobre él con volumen es el segundo tramo hacia 0.40.',
    decision: [
      'Con posición: <b>mantener; esta es la zona de sumar</b> (0.32–0.335, EMA20 + base del escalón) — después de que un cierre la confirme, no antes. El parcial en 0.40 sigue en pie si llega sin dato nuevo de fees.',
      'Sin posición: <b>la entrada del plan es ahora</b>: 0.32–0.335 que aguante al cierre, 25% del tamaño objetivo, con el stop en el cierre bajo 0.31. Segundo tramo en el cierre sobre 0.3747 con volumen.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.31</b>. Ahí el escalón de octubre falló → 0.292 (EMA50) → 0.257.',
    ],
    invalidation: { level: 0.31, text: 'Cierre diario bajo 0.31 (pierde el mínimo del 3 Oct y la EMA20 con margen) anula el path → 0.292 (EMA50) y 0.257 (mitad del tramo desde el 16 Sep); debajo de eso, 0.238 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 0.40, how: 'Retest de 0.32–0.335 que aguanta → cierre sobre 0.3747 con volumen → 0.40, la zona de Nov-25. Si el retest falla, el +1M es el rango 0.29–0.35.' },
      { d: 90, h: '+3M', target: 0.4445, how: 'Máximo de los últimos 12 meses (Oct-25). Requiere volumen del agregador acompañando y el buyback corriendo: de 0.40 para arriba es fundamentales, no chart.' },
      { d: 365, h: '+1Y', target: 0.55, how: 'Medida del impulso de octubre (0.3153 + 0.233). Solo con share estable y perps/lending creciendo — el chart llega si el múltiplo comprime.' },
    ],
    levels: {
      resistance: [[0.3309, 'EMA20 — a recuperar al cierre'], [0.3639, 'Cierre 12 Oct'], [0.3747, 'Máximo 10 Oct · máximo de 12 meses · techo del retest'], [0.40, 'Zona de Nov-25 · primera oferta real'], [0.4445, 'Máximo Oct-25'], [0.4735, 'Máximo Sep-Oct 25 · medida corta'], [0.55, 'Medida del impulso']],
      support: [[0.3317, 'Cierre 13 Oct · el retest'], [0.3153, 'Mínimo 3 Oct · base del escalón'], [0.31, 'INVALIDACIÓN'], [0.292, 'EMA50'], [0.257, 'Mitad del tramo desde el 16 Sep'], [0.238, 'EMA200 — subiendo 10%/20d']],
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
