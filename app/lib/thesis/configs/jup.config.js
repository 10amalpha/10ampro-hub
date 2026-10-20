import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jup', name: 'Jupiter', symbol: 'JUP', cgId: 'jupiter-exchange-solana', host: 'mercados.10am.pro/jup',
  sector: 'Solana DEX aggregation & perps',
  tagline: 'Volumen, fees y buyback — el agregador que procesa la mayoría de los swaps de Solana.',
  description: 'Jupiter ($JUP) en vivo: volumen del agregador, fees, revenue y buyback, supply overhang on-chain (vote escrow, tesorería, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-and-add-on-fee-growth', reviewed: '20 Oct 2026',
  ta: {
    updated: '20 Oct 2026', bias: 'BEAR',
    read: 'La EMA50 se recuperó por nada y el 0.2766 no llegó. El 20 Oct cerró 0.294 — +1.7%, el primer cierre verde desde el 12 Oct — exactamente sobre la EMA50 (0.2943 hoy): la media que el 18 Oct se había perdido y que la lectura señalaba como el nivel que frena la caída se recuperó al cierre por un diezmilésimo, que es un empate, no una recuperación. Hoy 0.3041, +3.4%, 3.3% arriba de la EMA50 y 4% debajo de la EMA20 (0.3161). El mínimo del movimiento quedó en 0.2891 (19 Oct), 4.5% arriba del 61.8% (0.2766): la zona de comprar que la lectura esperaba no se tocó, y el rebote arrancó antes de llegar — eso es demanda en el escalón de arriba, con un pero: el volumen. $58.9M, 71% del promedio de 20 días ($82.7M), más que los $45M del día que se perdió la EMA50 pero debajo del promedio y lejos de los $90M que la lectura pide para anular el sesgo. Cuatro de siete, de vuelta desde tres: el precio sobre la 50 (en vivo), sobre la 200 (0.2411, +8.7% en 20 días, la más empinada de la página), la 50 sobre la 200 y la 200 subiendo; faltan la EMA20, el RSI sobre 50 (36.9, subiendo desde 35.8) y el MACD, negativo y todavía ampliándose. Es la foto de una tendencia larga intacta con el escalón de octubre devuelto y el primer rebote desde el nivel correcto. Relativo: −7.5% en siete días con SOL −2.3%, 3.3× el mercado — el mismo múltiplo de ayer, con la diferencia de que hoy JUP subió más que SOL en un día verde (+3.4% contra −0.7%): el primero desde que empezó la caída, y uno solo. La regla es la regla en los dos sentidos: el sesgo pasó a bajista con el cierre bajo 0.31 y lo deshace un cierre sobre la EMA20 (0.3161, con el mínimo del 3 Oct, 0.3153, pegado debajo), no una EMA50 recuperada por un diezmilésimo con el 71% del volumen. Mientras tanto, el rebote a 0.31–0.3161 es para reducir, y los fees de Jupiter siguen decidiendo si el 0.2766 que no llegó era piso o pausa.',
    pattern: '<b>Escalera alcista con el escalón de octubre deshecho; el precio de vuelta entre la EMA50 y la EMA20.</b> Mínimos crecientes 0.1418 (30 Mar) → 0.1473 (11 Jun) → 0.1664 (16 Ago) → 0.216 (16 Sep) → 0.3153 (3 Oct); máximos 0.1976 → 0.2392 → 0.2754 → 0.3722 → 0.3747 (10 Oct). Perdidos en orden: 0.3153 (16 Oct), 0.31 (17 Oct) y la EMA50 (18 Oct) — el tercer ciclo de impulso-consolidación-impulso falló y el tramo 0.216 → 0.3747 devolvió el 54% (mínimo 0.2891 el 19 Oct, sin llegar al 61.8%). El 20 Oct recuperó la EMA50 al cierre por un diezmilésimo (0.294) y hoy la pasa en 3% con el 71% del volumen: el rebote desde el escalón de arriba del 0.2766. Lo que manda ahora es la EMA20 (0.3161) con la base del escalón perdido (0.3153) pegada: encima, la escalera sigue y el 16–18 Oct fue un barrido; debajo, el rebote es el retest de la EMA20 desde abajo y 0.2766 vuelve a estar en juego. La medida del impulso (0.47–0.55) queda archivada hasta que el precio reconstruya una base sobre 0.3153.',
    watch: '<b>0.3161 y 0.2943.</b> Arriba: cierre sobre la EMA20 (0.3161) con volumen sobre $90M anula el sesgo bajista — recupera en el mismo movimiento 0.31 y la base del escalón (0.3153). Sin el volumen, 0.31–0.3161 es la zona de reducir. Abajo: perder la EMA50 (0.2943) de vuelta al cierre deja el rebote de hoy como un día, y 0.2766 (61.8%) vuelve a ser el siguiente nivel — su cierre abre la EMA100 (0.2634) directo. <b>Relativo:</b> JUP +3.4% hoy con SOL −0.7% — el primer día verde en que JUP sube más que SOL desde el 10 Oct; hacen falta dos o tres seguidos, no uno, para decir que la demanda propia volvió. <b>Volumen:</b> $59M, 71% del promedio; un cierre sobre 0.3161 con $150M+ es la escalera reconstruida; un rebote con $50M es cortos cerrando. <b>Fees:</b> la capa de network decide — fees de Jupiter en máximos con el precio sosteniendo la EMA50 es la escalera intacta; fees cayendo con el precio rebotando, no. <b>RSI:</b> 36.9 — sin sobreventa; el rebote viene sin la señal de piso clásica, lo que lo hace más frágil.',
    decision: [
      'Con posición: <b>reducir en el rebote a 0.31–0.3161</b> (la invalidación vieja y la EMA20) lo que no querés tener en 0.2766. La EMA50 recuperada por un diezmilésimo con el 71% del volumen no cambia el sesgo; lo cambia el cierre sobre 0.3161 con $90M+. Lo que quede, con stop en el cierre bajo 0.2891 (mínimo del 19 Oct): ahí el rebote falló y el 61.8% es el siguiente nivel.',
      'Sin posición: <b>esperar</b>. El 0.2766 no llegó (mínimo 0.2891) y la entrada ahí sigue vigente si vuelve — 25% del tamaño con JUP subiendo más que SOL y los fees en máximos, stop en el cierre bajo 0.2634 (EMA100). La entrada por fuerza es el cierre sobre 0.3161 con volumen sobre $90M, después 0.3317. Comprar 0.30 porque "recuperó la EMA50" es comprar un empate con el 71% del volumen.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.3161</b> (EMA20, con la base del escalón, 0.3153, pegada debajo) con volumen sobre $90M → 0.3317 (cierre 13 Oct) → 0.3747.',
    ],
    invalidation: { level: 0.3161, text: 'Cierre diario sobre 0.3161 (EMA20, con la base del escalón perdido, 0.3153, pegada debajo; recupera en el camino 0.31) anula el path bajista: el 16–18 Oct queda como un barrido y la escalera sigue → 0.3317 (cierre del 13 Oct) y 0.3747 (máximo del 10 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.2634, how: 'Rebote a 0.31–0.3161 que falla sin volumen → EMA50 (0.2943) perdida de vuelta → 61.8% (0.2766) cerrado → EMA100. Si la EMA20 se recupera al cierre con $90M+, el +1M es el rango 0.3161–0.3317 y el sesgo vuelve a alcista.' },
      { d: 90, h: '+3M', target: 0.2411, how: 'EMA200 de hoy (+8.7% en 20 días), la línea de la tendencia de marzo: el tramo de septiembre-octubre devuelto casi entero. Es el nivel donde hold-and-add compra si los fees siguen creciendo; con la base reconstruida sobre 0.3153 antes, el +3M vuelve a 0.3747.' },
      { d: 365, h: '+1Y', target: 0.3747, how: 'Retest del máximo del 10 Oct desde la EMA200. A un año la caída es un escalón perdido dentro de la escalera de marzo; para 0.4445 (máximo de Oct-25) hacen falta fees, buyback y share del agregador, no chart. La medida del impulso (0.55) vuelve solo con la escalera reconstruida.' },
    ],
    levels: {
      resistance: [[0.306, 'Cierre 17 Oct'], [0.31, 'Invalidación vieja · cerrada el 17 Oct · zona de reducir'], [0.3153, 'Mínimo 3 Oct · base del escalón perdido'], [0.3161, 'INVALIDACIÓN bajista · EMA20'], [0.3317, 'Cierre 13 Oct'], [0.3639, 'Cierre 12 Oct'], [0.3747, 'Máximo 10 Oct · máximo de 12 meses · +1Y'], [0.4445, 'Máximo Oct-25'], [0.55, 'Medida del impulso · archivada']],
      support: [[0.2943, 'EMA50 — recuperada al cierre del 20 Oct por un diezmilésimo (0.294)'], [0.2891, 'Cierre 19 Oct · mínimo del movimiento · stop del rebote'], [0.2766, '61.8% del tramo 0.216 → 0.3747 · no llegó · la zona de la entrada'], [0.2634, 'EMA100 · +1M'], [0.25, '78.6% del tramo'], [0.2411, 'EMA200 — subiendo 8.7%/20d · +3M'], [0.216, 'Mínimo 16 Sep · escalón anterior · debajo termina la escalera']],
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
