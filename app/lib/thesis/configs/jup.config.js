import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jup', name: 'Jupiter', symbol: 'JUP', cgId: 'jupiter-exchange-solana', host: 'mercados.10am.pro/jup',
  sector: 'Solana DEX aggregation & perps',
  tagline: 'Volumen, fees y buyback — el agregador que procesa la mayoría de los swaps de Solana.',
  description: 'Jupiter ($JUP) en vivo: volumen del agregador, fees, revenue y buyback, supply overhang on-chain (vote escrow, tesorería, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-and-add-on-fee-growth', reviewed: '21 Oct 2026',
  ta: {
    updated: '21 Oct 2026', bias: 'BEAR',
    read: 'La EMA20 quedó a un pelo al cierre y hoy la pasa. El 21 Oct cerró 0.3144 — +6.9%, el segundo cierre verde seguido y el mejor día desde el 10 Oct — 0.0017 debajo de 0.3161, la invalidación bajista, y 0.001 debajo de la base del escalón (0.3153): un empate justo debajo del racimo que decide. Hoy 0.3232, +2.8%, 2% arriba de 0.3161 y 1.7% sobre la EMA20 (0.3177): si cierra acá, la regla se cumple y el sesgo vuelve a alcista en la próxima revisión. El volumen fue $80.9M, 96% del promedio de 20 días ($84M) — la lectura pedía $90M; faltaron $9M, y el promedio de 20 días es un tercio más alto que el de 90 ($62.6M): el interés está, le falta un día de convicción. Cinco de siete en vivo, desde cuatro: el precio sobre las cuatro medias con la 20 recién pasada, la 50 (0.2959) sobre la 200 (0.2417, +8.6% en 20 días, la más empinada de la página), la 200 subiendo; faltan el RSI sobre 50 (40.9, desde 36.9) y el MACD, negativo, con el histograma achicándose por primera vez en diez sesiones. Relativo: −1.0% en siete días con SOL −0.2% — el múltiplo de 3× de la semana pasada desapareció, porque JUP recuperó en dos días lo que perdió en cinco; en el día, +6.9% con SOL +1.3% y hoy +2.8% con SOL +2.8%: el segundo día seguido en que JUP sube igual o más que SOL — la lectura del 20 Oct pedía dos o tres, van dos. El mínimo del movimiento sigue en 0.2891 (19 Oct); el 0.2766 no llegó y ya no está en el camino inmediato. La regla es la regla: 0.3144 no es 0.3161, el sesgo sigue bajista por 0.0017 — pero la decisión se escribe como si ya hubiera cerrado arriba, porque un nivel tocado así en esta página se cierra en la siguiente sesión siete veces de ocho este mes. Lo que decide ahora no es el chart, que ya contestó, sino si el cierre de hoy trae los $90M y si los fees de Jupiter siguen en máximos: con las dos, la escalera de marzo sigue y el 16–19 Oct fue un barrido.',
    pattern: '<b>Escalera alcista con el escalón de octubre barrido; el precio de vuelta en la EMA20.</b> Mínimos crecientes 0.1418 (30 Mar) → 0.1473 (11 Jun) → 0.1664 (16 Ago) → 0.216 (16 Sep) → 0.3153 (3 Oct); máximos 0.1976 → 0.2392 → 0.2754 → 0.3722 → 0.3747 (10 Oct). Perdidos en orden: 0.3153 (16 Oct), 0.31 (17 Oct) y la EMA50 (18 Oct) — el tramo 0.216 → 0.3747 devolvió el 54% (mínimo 0.2891, 19 Oct) sin llegar al 61.8% (0.2766); recuperados en orden: la EMA50 (20 Oct, por un diezmilésimo), 0.31 (21 Oct, 0.3144) y hoy la EMA20 y la base del escalón intradía. Un escalón que se pierde y se recupera en cinco sesiones sin tocar el 61.8% es un barrido, no un cambio de tendencia — queda confirmado con el cierre sobre 0.3161 y $90M. Encima, la escalera sigue: 0.3317 (13 Oct), 0.3639 (12 Oct) y 0.3747; la medida del impulso (0.47–0.55) vuelve al mapa recién con una base nueva sobre 0.3153. Debajo, 0.2891 es el stop del movimiento entero.',
    watch: '<b>0.3161 y 0.2959.</b> Arriba: cierre sobre 0.3161 — ya tocado al cierre por 0.0017 y pasado en vivo — con $90M+ anula el sesgo bajista y recupera la base del escalón (0.3153) en el mismo movimiento; con $80M vale igual como cierre, pero el añadido espera el retest. Después, 0.3317 (cierre del 13 Oct) es el primer techo real. Abajo: perder la EMA50 (0.2959) de vuelta al cierre deja los dos días verdes como un rebote y 0.2766 vuelve a estar en juego — su cierre abre la EMA100 (0.2647). <b>Relativo:</b> dos días seguidos de JUP subiendo igual o más que SOL; el tercero con el cierre sobre 0.3161 es la demanda propia de vuelta. <b>Volumen:</b> $81M, 96% del promedio y el 20 días un tercio sobre el 90 días; un cierre sobre 0.3161 con $150M+ es la escalera reconstruida. <b>Fees:</b> la capa de network decide — fees de Jupiter en máximos con el precio sobre la EMA20 es la escalera intacta; fees cayendo con el precio rebotando, no. <b>RSI:</b> 40.9 — sin sobreventa en el mínimo y sin fuerza todavía; sobre 50 con el precio sobre 0.3161 confirma.',
    decision: [
      'Con posición: <b>no reducir más</b>. La zona de reducir (0.31–0.3161) se tocó al cierre del 21 Oct y el precio ya está arriba en vivo: lo que había que vender se vendió ahí; lo que quede se mantiene con el stop en el cierre bajo 0.2891 (mínimo del 19 Oct). Si el cierre de hoy imprime sobre 0.3161, el sesgo vuelve a alcista y el añadido se hace en el retest de 0.3153–0.3177 desde arriba, no en el impulso.',
      'Sin posición: <b>la entrada por fuerza está a un cierre</b>. 25% del tamaño con el cierre sobre 0.3161 y volumen sobre $90M, stop en el cierre bajo 0.2959 (EMA50); el resto en el retest de la EMA20 que aguante con JUP subiendo más que SOL. La entrada de 0.2766 queda archivada — no llegó (mínimo 0.2891) y perseguirla ahora es esperar un nivel que el mercado ya rechazó dos escalones más arriba.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.3161</b> (EMA20 en 0.3177 y base del escalón en 0.3153, las tres juntas) con volumen sobre $90M → 0.3317 (cierre 13 Oct) → 0.3639 → 0.3747.',
    ],
    invalidation: { level: 0.3161, text: 'Cierre diario sobre 0.3161 (el racimo EMA20 0.3177 + base del escalón 0.3153 + 0.31; el 21 Oct cerró 0.3144, a 0.0017, y hoy el precio está arriba) anula el path bajista: el 16–19 Oct queda como un barrido y la escalera sigue → 0.3317 (cierre del 13 Oct) y 0.3747 (máximo del 10 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.2647, how: 'Rechazo en 0.3161–0.3177 sin los $90M → EMA50 (0.2959) perdida de vuelta → 61.8% (0.2766) cerrado → EMA100. Si la EMA20 se cierra con $90M+ — a 0.0017 al cierre del 21 Oct, pasada en vivo — el +1M es el rango 0.3161–0.3317 y el sesgo vuelve a alcista.' },
      { d: 90, h: '+3M', target: 0.2417, how: 'EMA200 de hoy (+8.6% en 20 días), la línea de la tendencia de marzo: el tramo de septiembre-octubre devuelto casi entero. Es el nivel donde hold-and-add compra si los fees siguen creciendo; con la base reconstruida sobre 0.3153 antes, el +3M vuelve a 0.3747.' },
      { d: 365, h: '+1Y', target: 0.3747, how: 'Retest del máximo del 10 Oct desde la EMA200. A un año la caída es un escalón perdido dentro de la escalera de marzo; para 0.4445 (máximo de Oct-25) hacen falta fees, buyback y share del agregador, no chart. La medida del impulso (0.55) vuelve solo con la escalera reconstruida.' },
    ],
    levels: {
      resistance: [[0.3153, 'Mínimo 3 Oct · base del escalón · a 0.001 del cierre del 21 Oct'], [0.3161, 'INVALIDACIÓN bajista · el 21 Oct cerró a 0.0017 — pasada en vivo'], [0.3177, 'EMA20'], [0.3317, 'Cierre 13 Oct · primer techo real'], [0.3639, 'Cierre 12 Oct'], [0.3747, 'Máximo 10 Oct · máximo de 12 meses · +1Y'], [0.4445, 'Máximo Oct-25'], [0.55, 'Medida del impulso · archivada']],
      support: [[0.3144, 'Cierre 21 Oct · +6.9%, 96% del volumen'], [0.31, 'Invalidación vieja · recuperada el 21 Oct'], [0.2959, 'EMA50 — recuperada el 20 Oct · stop de la entrada por fuerza'], [0.2891, 'Cierre 19 Oct · mínimo del movimiento · stop del remanente'], [0.2766, '61.8% del tramo 0.216 → 0.3747 · no llegó · archivada'], [0.2647, 'EMA100 · +1M'], [0.25, '78.6% del tramo'], [0.2417, 'EMA200 — subiendo 8.6%/20d · +3M'], [0.216, 'Mínimo 16 Sep · escalón anterior · debajo termina la escalera']],
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
