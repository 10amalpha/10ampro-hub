import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jup', name: 'Jupiter', symbol: 'JUP', cgId: 'jupiter-exchange-solana', host: 'mercados.10am.pro/jup',
  sector: 'Solana DEX aggregation & perps',
  tagline: 'Volumen, fees y buyback — el agregador que procesa la mayoría de los swaps de Solana.',
  description: 'Jupiter ($JUP) en vivo: volumen del agregador, fees, revenue y buyback, supply overhang on-chain (vote escrow, tesorería, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-and-add-on-fee-growth', reviewed: '24 Oct 2026',
  ta: {
    updated: '24 Oct 2026', bias: 'BULL',
    read: 'La invalidación aguantó al cierre por 0.8% y en vivo ya está 4% debajo. El 24 Oct cerró 0.2995 — −3.9%, el segundo cierre rojo desde la ruptura fallida del 22 Oct (0.3266) — 0.8% sobre 0.2971, la EMA50 que anula el sesgo alcista: por regla no se cumplió; por la regla del 1% de esta página, se escribe como cumplida — siete de ocho niveles a esa distancia se cerraron en la sesión siguiente, y hoy 0.2834 (−5.4%) ya está 4.3% debajo de la EMA50 (0.2962 hoy) y 2% debajo de 0.2891, el mínimo del 19 Oct que era el stop del movimiento entero. El sesgo queda alcista hasta que el cierre imprima; la lectura se escribe como si ya lo hubiera hecho. Tres cierres rojos desde 0.3266 devolvieron 13% — más de lo que los tres verdes habían subido (+13% desde 0.2891): la ruptura fallida del 22 Oct resultó ser el techo del rebote entero. Volumen $54.7M, 66% del promedio de 20 días ($82.9M): la caída bajo la EMA50 tampoco tiene volumen — ni la ruptura, ni la devolución, ni la pérdida de la media pasaron el promedio, que sigue 29% sobre el de 90 días por los días del 10–13 Oct. Tres de siete, desde cuatro: el precio perdió la EMA50 en vivo; quedan el precio sobre la 200 (0.2448, +7.7% en 20 días, la más empinada de la página), la 50 sobre la 200 y la 200 subiendo. RSI 26.9, desde 28.7 — segunda sesión bajo 30, y esta vez con el precio cayendo: ya no es el indicador alcanzando al precio, es sobreventa con la media perdida. El histograma del MACD volvió a ampliarse después de tres sesiones achicándose. Relativo: −4.3% en siete días con SOL −3.4%, 1.3× — el múltiplo más bajo de la página en la semana, JUP sigue siendo la alt que menos cae; en el día, −8.8% con SOL −4.0%, 2.2×: el día de la pérdida de la media fue a beta en contra. Lo que cambió: 0.2971 se escribe como perdido, 0.2891 se pasó en vivo y el 61.8% (0.2766) está a 2.4% — el escalón de octubre dejó de ser un escalón barrido y recuperado para ser un escalón devuelto. Lo que no cambió: el mínimo creciente de la escalera (0.216, 16 Sep) sigue lejos, la EMA200 sigue subiendo 8% y los fees siguen siendo la variable que importa. La entrada por fuerza del 22 Oct está −13% con su stop (0.2971) escrito como cumplido: se cierra en el rebote a 0.2962–0.2971 o en el cierre bajo el nivel, lo que llegue primero; el añadido que quedaba era el retest de la EMA50 desde arriba, y la EMA50 ahora está arriba.',
    pattern: '<b>Escalera alcista; el escalón de octubre devuelto — ruptura fallida sobre la EMA20 (22 Oct) y la EMA50 perdida en vivo (24 Oct).</b> Mínimos crecientes 0.1418 (30 Mar) → 0.1473 (11 Jun) → 0.1664 (16 Ago) → 0.216 (16 Sep) → 0.3153 (3 Oct); máximos 0.1976 → 0.2392 → 0.2754 → 0.3722 → 0.3747 (10 Oct). El tramo 0.216 → 0.3747 devolvió el 54% (0.2891, 19 Oct), rebotó tres cierres hasta 0.3266 (22 Oct, sobre 0.3161 y la EMA20) y devolvió eso y más en tres: 0.3115 / 0.2995 (24 Oct, a 0.8% de la EMA50) / 0.2834 hoy, bajo la EMA50 (0.2962) y bajo 0.2891. Un rebote a la EMA20 que se devuelve entero y pierde la EMA50 es el escalón de octubre devuelto: la escalera sigue en pie como estructura (0.216 es el mínimo creciente que la sostiene, la EMA200 sube 8%), pero el precio está debajo de las dos medias que la definían. Abajo, 0.2766 (61.8% del tramo) es el nivel que la corrección nunca tocó, 0.2668 (EMA100) el siguiente y 0.25 (78.6%) el último antes de 0.2448 (EMA200). Arriba, 0.2891–0.2971 (mínimo del 19 Oct + invalidación) es ahora el techo inmediato, 0.3126 (EMA20) y 0.3153–0.3161 el segundo. La medida del impulso (0.47–0.55) vuelve al mapa recién con una base nueva sobre 0.3153.',
    watch: '<b>0.2971 y 0.2766.</b> Arriba: 0.2971 (EMA50, 0.2962 hoy) — a 0.8% al cierre y 4% debajo en vivo, escrito como perdido; el cierre de vuelta sobre 0.2971 con 0.2891 recuperado deja el 24 Oct como un barrido y reabre 0.3126 (EMA20). Abajo: el cierre bajo 0.2971 cumple la invalidación y pasa el sesgo a bajista → 0.2891 ya está pasado en vivo → 0.2766 (61.8%) a 2.4%, el único nivel de la corrección que nunca se tocó; con $90M+ y vela de rechazo ahí es la entrada; sin volumen, 0.2668 (EMA100). <b>RSI:</b> 26.9, segunda sesión bajo 30 con el precio cayendo — sobreventa real, no indicador adelantado; una vela verde con volumen desde 0.2766 es comprable, dos rojas más no. <b>Volumen:</b> $54.7M, 66% del promedio; nada de lo que pasó en dos semanas tuvo volumen. Un cierre bajo 0.2766 con $150M+ es la distribución del escalón; uno de vuelta sobre 0.2971 con $90M+, el barrido. <b>Fees:</b> la capa de network decide — fees de Jupiter en máximos con el precio en 0.2766 es la escalera intacta y el lugar de sumar; fees cayendo, no. <b>Relativo:</b> JUP −4.3% vs SOL −3.4% en la semana, el múltiplo más bajo de la página; −8.8% vs −4.0% en el día. Sin días propios desde el 22 Oct.',
    decision: [
      'Con posición: <b>mantener el core; la entrada por fuerza del 22 Oct se cierra</b>. Su stop (cierre bajo 0.2971) se escribe como cumplido — aguantó por 0.8% y hoy está 4% debajo — y se ejecuta en el rebote a 0.2962–0.2971 o en el cierre bajo el nivel, lo que llegue primero. Lo que quede del core, con stop en el cierre bajo 0.2766 (61.8%): ahí el escalón de octubre está devuelto entero y 0.2668 es el camino. No se promedia en 0.28 porque perdió la media: se suma en 0.2766 con vela de rechazo y $90M+, no antes.',
      'Sin posición: <b>nada hasta 0.2766 o hasta el cierre de vuelta sobre 0.2971</b>. 25% del tamaño en el retest de 0.2766 (61.8% del tramo 0.216 → 0.3747) que aguante al cierre con vela de rechazo, $90M+ y JUP subiendo más que SOL — stop en el cierre bajo 0.2668 (EMA100); o 25% en el cierre de vuelta sobre 0.2971 con 0.2891 recuperado. Comprar 0.28 entre la media perdida y el 61.8% es comprar sin nivel.',
      'Trigger único que anula el sesgo alcista: <b>cierre diario &lt; 0.2971</b> (EMA50, 0.2962 hoy; a 0.8% al cierre del 24 Oct, en vivo 4% debajo). Ahí el 22 Oct fue una ruptura falsa y el escalón de octubre está devuelto → 0.2766 (61.8%) → 0.2668 (EMA100) → 0.25 (78.6%).',
    ],
    invalidation: { level: 0.2971, text: 'Cierre diario bajo 0.2971 (EMA50, recuperada el 20 Oct, hoy en 0.2962; el 24 Oct cerró 0.2995, a 0.8%, y el precio en vivo está 4% debajo — se escribe como cumplida) anula el path alcista: el cierre del 22 Oct sobre 0.3161 fue una ruptura falsa y el escalón de octubre se devolvió → 0.2766 (61.8% del tramo 0.216 → 0.3747, nunca tocado), 0.2668 (EMA100) y 0.25 (78.6%).' },
    path: [
      { d: 30, h: '+1M', target: 0.2766, how: '61.8% del tramo 0.216 → 0.3747, el nivel que la corrección nunca tocó: EMA50 perdida en vivo (0.2834 el 24 Oct) y 0.2891 pasado → 0.2766, a 2.4%. Es donde se suma con vela y $90M+; si cierra de vuelta sobre 0.2971 con 0.2891 recuperado, el +1M es la EMA20 (0.3126).' },
      { d: 90, h: '+3M', target: 0.3153, how: 'Mínimo del 3 Oct, la base del escalón: el retest desde abajo del racimo 0.3126–0.3161 (EMA20 + invalidación vieja) después de que 0.2766 aguante con los fees de Jupiter en máximos. Sin fees, 0.2971 es el techo del trimestre.' },
      { d: 365, h: '+1Y', target: 0.3747, how: 'Máximo del 10 Oct, máximo de 12 meses: el escalón de octubre reconstruido sobre 0.3153. Requiere fees, buyback y share del agregador creciendo, no chart; 0.4445 (máximo de Oct-25) y la medida del impulso (0.55) quedan detrás.' },
    ],
    levels: {
      resistance: [[0.2891, 'Cierre 19 Oct · mínimo del movimiento · pasado en vivo el 24 Oct — ahora techo'], [0.2962, 'EMA50 (0.2971 en la regla) · INVALIDACIÓN alcista · perdida en vivo'], [0.2995, 'Cierre 24 Oct · a 0.8% de la invalidación'], [0.3115, 'Cierre 23 Oct'], [0.3126, 'EMA20'], [0.3153, 'Mínimo 3 Oct · base del escalón · +3M'], [0.3161, 'Invalidación bajista vieja · cerrada el 22 Oct, devuelta el 23 Oct'], [0.3266, 'Cierre 22 Oct · techo del rebote · ruptura fallida'], [0.3317, 'Cierre 13 Oct'], [0.3639, 'Cierre 12 Oct'], [0.3747, 'Máximo 10 Oct · máximo de 12 meses · +1Y'], [0.4445, 'Máximo Oct-25'], [0.55, 'Medida del impulso · archivada']],
      support: [[0.2834, 'Hoy · el precio está acá'], [0.2766, '61.8% del tramo 0.216 → 0.3747 · +1M · nunca tocado · donde se suma con vela'], [0.2668, 'EMA100 · stop del core'], [0.25, '78.6% del tramo'], [0.2448, 'EMA200 — subiendo 7.7%/20d'], [0.216, 'Mínimo 16 Sep · escalón anterior · debajo termina la escalera']],
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
