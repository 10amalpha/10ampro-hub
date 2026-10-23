import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jup', name: 'Jupiter', symbol: 'JUP', cgId: 'jupiter-exchange-solana', host: 'mercados.10am.pro/jup',
  sector: 'Solana DEX aggregation & perps',
  tagline: 'Volumen, fees y buyback — el agregador que procesa la mayoría de los swaps de Solana.',
  description: 'Jupiter ($JUP) en vivo: volumen del agregador, fees, revenue y buyback, supply overhang on-chain (vote escrow, tesorería, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-and-add-on-fee-growth', reviewed: '23 Oct 2026',
  ta: {
    updated: '23 Oct 2026', bias: 'BULL',
    read: 'La regla se cumplió y el mercado la devolvió al día siguiente. El 22 Oct cerró 0.3266 — +3.9%, tercer cierre verde seguido y el más alto desde el 14 Oct — 3.3% sobre 0.3161, la invalidación bajista: por regla, el sesgo pasa a alcista y el 16–19 Oct queda escrito como barrido. El 23 Oct cerró 0.3115, −4.6%: de vuelta debajo de 0.3161, de la EMA20 (0.3167) y de la base del escalón (0.3153) en una sola vela, y hoy 0.31, −0.5%. Un cierre sobre el nivel que se devuelve entero en la sesión siguiente es una ruptura fallida hasta que lo recupere — el sesgo es alcista por regla, no por el chart de hoy. El volumen fue $59.6M, 72% del promedio de 20 días ($83M): la devolución vino sin volumen, igual que la subida; los $90M que la lectura pedía para confirmar no aparecieron en ninguno de los dos días. Cuatro de siete, desde cinco: el precio perdió la EMA20 de vuelta; quedan el precio sobre la 50 (0.2971) y la 200 (0.2433, +8.3% en 20 días, todavía la más empinada de la página), la 50 sobre la 200 y la 200 subiendo. RSI 28.7, desde 40.9 — cruzó bajo 30 por primera vez en toda la corrección: en el mínimo del movimiento (0.2891, 19 Oct) marcaba 36 y ahora, con el precio 8% más arriba, marca 29; el oscilador terminó de descontar la caída de octubre con el precio ya rebotado, como pasó en MET la semana pasada — es el indicador alcanzando al precio, no una venta nueva. El histograma del MACD sigue negativo y achicándose por tercera sesión. Relativo: −0.4% en siete días con SOL −2.5% — JUP le ganó a SOL en la semana, el único de la página junto con PUMP; en el día, −4.6% con SOL −3.2%, 1.4× en la caída. La demanda propia que la lectura pedía (tres días seguidos subiendo más que SOL) llegó a dos y el tercero fue rojo. Lo que cambió: el sesgo, por regla. Lo que no cambió: el precio sigue debajo del racimo (0.3153–0.3167) que decide, el volumen sigue bajo el promedio y los fees siguen siendo la variable que importa. Con el sesgo alcista, la invalidación es el cierre bajo la EMA50 (0.2971) — el nivel recuperado el 20 Oct, 4.6% abajo; el stop del movimiento entero sigue en 0.2891. Hasta que 0.3161 se recupere al cierre, no se suma: una ruptura que dura un día es un lugar para esperar, no para comprar.',
    pattern: '<b>Escalera alcista; el escalón de octubre barrido, recuperado al cierre del 22 Oct y devuelto el 23 Oct — ruptura fallida sobre la EMA20.</b> Mínimos crecientes 0.1418 (30 Mar) → 0.1473 (11 Jun) → 0.1664 (16 Ago) → 0.216 (16 Sep) → 0.3153 (3 Oct); máximos 0.1976 → 0.2392 → 0.2754 → 0.3722 → 0.3747 (10 Oct). El tramo 0.216 → 0.3747 devolvió el 54% (0.2891, 19 Oct) sin llegar al 61.8% (0.2766); desde ahí tres cierres verdes hasta 0.3266 (22 Oct), sobre 0.3161 y la EMA20 — y el 23 Oct (0.3115) de vuelta debajo de las dos y de la base del escalón. Una ruptura que se devuelve en una sesión sin volumen deja el precio en el medio: la escalera sigue en pie (mínimos crecientes intactos, EMA50 0.2971 sobre la 200, la 200 subiendo 8%) y el escalón de octubre todavía no está reconstruido. Para arriba, 0.3161–0.3167 (invalidación vieja + EMA20) es el techo que hay que cerrar de vuelta, después 0.3266 (cierre del 22 Oct) y 0.3317 (13 Oct); para abajo, 0.2971 (EMA50) decide si el 22 Oct fue un escalón o un barrido al revés, y 0.2891 es el stop del movimiento. La medida del impulso (0.47–0.55) vuelve al mapa recién con una base nueva sobre 0.3153.',
    watch: '<b>0.3161 y 0.2971.</b> Arriba: el cierre de vuelta sobre 0.3161 (con la EMA20 en 0.3167 y la base del escalón en 0.3153, las tres juntas) con $90M+ convierte el 23 Oct en el retest y reabre 0.3317; sin volumen vale como cierre, pero el añadido espera. Abajo: el cierre bajo la EMA50 (0.2971) anula el sesgo alcista — ahí el 22 Oct fue una ruptura falsa, 0.2891 se prueba y 0.2766 (61.8%) vuelve al camino. <b>RSI:</b> 28.7, primera vez bajo 30 en la corrección, con el precio 8% sobre el mínimo — el indicador alcanzando al precio; una vela verde con volumen desde acá es sobreventa comprable, dos rojas más no. <b>Volumen:</b> $59.6M, 72% del promedio; la ruptura y la devolución, las dos sin volumen. Un cierre sobre 0.3161 con $150M+ es la escalera reconstruida. <b>Fees:</b> la capa de network decide — fees de Jupiter en máximos con el precio sobre la EMA20 es la escalera intacta; fees cayendo con el precio rebotando, no. <b>Relativo:</b> JUP −0.4% vs SOL −2.5% en la semana, el único de la página junto con PUMP que le ganó; en el día −4.6% vs −3.2%. Dos días de demanda propia y uno rojo; hacen falta tres seguidos.',
    decision: [
      'Con posición: <b>mantener; no sumar</b>. El sesgo pasó a alcista por regla (0.3266 el 22 Oct, 3.3% sobre 0.3161) y el 23 Oct lo devolvió: lo que quede se mantiene con el stop en el cierre bajo 0.2971 (EMA50); el añadido se hace en el retest de 0.3153–0.3167 desde arriba, después de que el cierre recupere 0.3161, no antes.',
      'Sin posición: <b>nada hasta el cierre de vuelta sobre 0.3161</b>. La entrada por fuerza se disparó por precio el 22 Oct y el 23 Oct la dejó −4.6%: si la tomaste, el stop es el cierre bajo 0.2971 y no se agrega. Si no, 25% del tamaño con el cierre sobre 0.3161 y $90M+, o 25% en el retest de la EMA50 (0.2971) que aguante al cierre con vela de rechazo y JUP subiendo más que SOL — stop en el cierre bajo 0.2891.',
      'Trigger único que anula el sesgo alcista: <b>cierre diario &lt; 0.2971</b> (EMA50, recuperada el 20 Oct). Ahí el 22 Oct fue una ruptura falsa → 0.2891 (mínimo del 19 Oct) → 0.2766 (61.8%) → 0.2666 (EMA100).',
    ],
    invalidation: { level: 0.2971, text: 'Cierre diario bajo 0.2971 (EMA50, recuperada el 20 Oct; el 23 Oct cerró 0.3115, 4.8% arriba) anula el path alcista: el cierre del 22 Oct sobre 0.3161 fue una ruptura falsa → 0.2891 (mínimo del 19 Oct, el stop del movimiento), 0.2766 (61.8% del tramo 0.216 → 0.3747) y 0.2666 (EMA100).' },
    path: [
      { d: 30, h: '+1M', target: 0.3317, how: 'Cierre de vuelta sobre 0.3161 con $90M+ → retest de 0.3153–0.3167 que aguante → cierre del 13 Oct. Si pierde la EMA50 (0.2971) al cierre, el +1M es 0.2891–0.2766 y el sesgo vuelve a bajista.' },
      { d: 90, h: '+3M', target: 0.3747, how: 'Máximo del 10 Oct, máximo de 12 meses: el escalón de octubre reconstruido sobre 0.3153 con los fees de Jupiter en máximos. Sin fees, 0.3317 es el techo del trimestre.' },
      { d: 365, h: '+1Y', target: 0.4445, how: 'Máximo de Oct-25. Requiere fees, buyback y share del agregador creciendo, no chart; la medida del impulso (0.55) queda detrás y solo con la escalera reconstruida.' },
    ],
    levels: {
      resistance: [[0.3153, 'Mínimo 3 Oct · base del escalón · perdida de vuelta el 23 Oct'], [0.3161, 'Invalidación bajista vieja · cerrada el 22 Oct (0.3266), devuelta el 23 Oct'], [0.3167, 'EMA20'], [0.3266, 'Cierre 22 Oct · máximo del rebote'], [0.3317, 'Cierre 13 Oct · +1M'], [0.3639, 'Cierre 12 Oct'], [0.3747, 'Máximo 10 Oct · máximo de 12 meses · +3M'], [0.4445, 'Máximo Oct-25 · +1Y'], [0.55, 'Medida del impulso · archivada']],
      support: [[0.3115, 'Cierre 23 Oct · el precio está acá'], [0.31, 'Invalidación vieja · recuperada el 21 Oct'], [0.2971, 'INVALIDACIÓN alcista · EMA50 — recuperada el 20 Oct'], [0.2891, 'Cierre 19 Oct · mínimo del movimiento · stop del remanente'], [0.2766, '61.8% del tramo 0.216 → 0.3747 · no llegó'], [0.2666, 'EMA100'], [0.25, '78.6% del tramo'], [0.2433, 'EMA200 — subiendo 8.3%/20d'], [0.216, 'Mínimo 16 Sep · escalón anterior · debajo termina la escalera']],
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
