import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jup', name: 'Jupiter', symbol: 'JUP', cgId: 'jupiter-exchange-solana', host: 'mercados.10am.pro/jup',
  sector: 'Solana DEX aggregation & perps',
  tagline: 'Volumen, fees y buyback — el agregador que procesa la mayoría de los swaps de Solana.',
  description: 'Jupiter ($JUP) en vivo: volumen del agregador, fees, revenue y buyback, supply overhang on-chain (vote escrow, tesorería, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-and-add-on-fee-growth', reviewed: '19 Oct 2026',
  ta: {
    updated: '18 Oct 2026', bias: 'BEAR',
    read: 'La invalidación se cumplió y la EMA50 no aguantó. El 17 Oct cerró 0.306 — bajo 0.31, la invalidación que el 16 Oct había aguantado por un diezmilésimo — y el sesgo pasó a bajista; el 18 Oct cerró 0.2924, debajo de la EMA50 (0.2936), que era el primer soporte real y el único hasta el 61.8%. Hoy 0.2807, 1.5% arriba de ese 61.8% del tramo 0.216 → 0.3747 (0.2766). Cinco cierres seguidos para abajo desde la EMA20: 0.3308, 0.3193, 0.3101, 0.306, 0.2924 — el tramo de septiembre-octubre devolvió el 59%. Tres de siete (era cuatro): perdió la 50; quedan la EMA200 (0.2393, +9% en 20 días, la más empinada de la página), la 50 sobre la 200 y el precio sobre la 200. Es la foto de una tendencia larga intacta con el escalón de octubre deshaciéndose entero. RSI 35.8, bajando sin ser extremo — hay espacio para abajo — y el MACD negativo y ampliándose. Volumen $45M, 51% del promedio de 20 días ($88M): la EMA50 se perdió con la mitad del volumen, que es lo que pasa cuando no hay vendedores de pánico pero tampoco quien compre el nivel. Relativo: −23.3% en siete días con SOL −6.7%, 3.5× el mercado, pegado a JTO y PUMP. Después de un mes de ganarle a SOL, JUP lleva dos semanas cayendo tres y cuatro veces lo que cae su beta: la demanda propia que sostenía la escalera se fue y todavía no volvió. El 61.8% (0.2766) es el nivel que la lectura señalaba como zona de comprar — está a 1.5%, y lo que decide si es compra o trámite no es el chart: son los fees de Jupiter. Si siguen en máximos con el precio en 0.2766 y JUP le gana a SOL en un día verde, es la entrada; si llegan cayendo, el siguiente es la EMA100 (0.2617).',
    pattern: '<b>Escalera alcista con el escalón de octubre deshecho; el precio entre la EMA50 y el 61.8%.</b> Mínimos crecientes 0.1418 (30 Mar) → 0.1473 (11 Jun) → 0.1664 (16 Ago) → 0.216 (16 Sep) → 0.3153 (3 Oct); máximos 0.1976 → 0.2392 → 0.2754 → 0.3722 → 0.3747 (10 Oct). Perdidos en orden: 0.3153 (16 Oct), 0.31 (17 Oct) y la EMA50 (18 Oct) — el tercer ciclo de impulso-consolidación-impulso falló y el tramo 0.216 → 0.3747 devolvió el 59%. Lo que queda: el 61.8% (0.2766), la EMA100 (0.2617) y la EMA200 (0.2393), con el mínimo del 16 Sep (0.216) como el último escalón de la secuencia — debajo de él termina la escalera de marzo. La medida del impulso (0.47–0.55) queda archivada hasta que el precio reconstruya una base sobre 0.3153.',
    watch: '<b>0.2766 y 0.2936.</b> Abajo: cierre bajo 0.2766 (61.8% del tramo) abre la EMA100 (0.2617) directo — es el +1M. Arriba: recuperar la EMA50 (0.2936) al cierre frena la caída; el que anula el sesgo bajista es un cierre sobre la EMA20 (0.3191) con volumen sobre $90M. <b>Relativo:</b> el dato que manda — JUP −23.3% vs SOL −6.7%. Hasta que JUP suba más que SOL en un día verde, la demanda propia no volvió y cada rebote es para reducir. <b>Volumen:</b> un día de $150M+ cerrando bajo 0.2766 confirma la salida; un rebote con $50M es cortos cerrando. <b>Fees:</b> la capa de network decide si 0.2766 es piso — fees de Jupiter en máximos con el precio ahí es la zona de comprar; fees cayendo con el precio, no. <b>RSI:</b> 35.8 — sin sobreventa todavía; bajo 30 en 0.2766 con vela de rechazo es la primera señal de piso.',
    decision: [
      'Con posición: <b>reducir en el rebote a 0.2936–0.31</b> (la EMA50 perdida y la invalidación vieja) lo que no querés tener en 0.2617. Lo que quede, con stop en el cierre bajo 0.2766: ahí el 61.8% cedió y el siguiente nivel es la EMA100.',
      'Sin posición: <b>esperar 0.2766</b>. La entrada es el retest del 61.8% que aguante al cierre con JUP subiendo más que SOL y los fees en máximos — 25% del tamaño, stop en el cierre bajo 0.2617 (EMA100). La entrada por fuerza es el cierre sobre 0.3191 con volumen. Comprar 0.28 porque \"está cerca\" es comprar un nivel que todavía no mostró vela de rechazo ni volumen.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.3191</b> (EMA20) con volumen sobre $90M → 0.3317 (cierre 13 Oct) → 0.3747.',
    ],
    invalidation: { level: 0.3191, text: 'Cierre diario sobre 0.3191 (EMA20; recupera en el camino la EMA50, 0.31 y la base del escalón, 0.3153) anula el path bajista: el 17–18 Oct queda como un barrido y la escalera sigue → 0.3317 (cierre del 13 Oct) y 0.3747 (máximo del 10 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.2617, how: '61.8% (0.2766) perdido al cierre → EMA100. Si el 61.8% aguanta con vela de rechazo, JUP ganándole a SOL y los fees en máximos, el +1M es el rango 0.2766–0.2936 hasta que la EMA50 se recupere o no.' },
      { d: 90, h: '+3M', target: 0.2393, how: 'EMA200 de hoy (+9% en 20 días), la línea de la tendencia de marzo: el tramo de septiembre-octubre devuelto casi entero. Es el nivel donde hold-and-add compra si los fees siguen creciendo; con la base reconstruida sobre 0.3153 antes, el +3M vuelve a la EMA20.' },
      { d: 365, h: '+1Y', target: 0.3747, how: 'Retest del máximo del 10 Oct desde la EMA200. A un año la caída es un escalón perdido dentro de la escalera de marzo; para 0.4445 (máximo de Oct-25) hacen falta fees, buyback y share del agregador, no chart. La medida del impulso (0.55) vuelve solo con la escalera reconstruida.' },
    ],
    levels: {
      resistance: [[0.2924, 'Cierre 18 Oct'], [0.2936, 'EMA50 — perdida el 18 Oct · techo del rebote'], [0.306, 'Cierre 17 Oct'], [0.31, 'Invalidación vieja · cerrada el 17 Oct'], [0.3153, 'Mínimo 3 Oct · base del escalón perdido'], [0.3191, 'INVALIDACIÓN bajista · EMA20'], [0.3317, 'Cierre 13 Oct'], [0.3639, 'Cierre 12 Oct'], [0.3747, 'Máximo 10 Oct · máximo de 12 meses · +1Y'], [0.4445, 'Máximo Oct-25'], [0.55, 'Medida del impulso · archivada']],
      support: [[0.2766, '61.8% del tramo 0.216 → 0.3747 · a 1.5% · la zona de la entrada'], [0.2617, 'EMA100 · +1M'], [0.25, '78.6% del tramo'], [0.2393, 'EMA200 — subiendo 9%/20d · +3M'], [0.216, 'Mínimo 16 Sep · escalón anterior · debajo termina la escalera']],
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
