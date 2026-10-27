import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jup', name: 'Jupiter', symbol: 'JUP', cgId: 'jupiter-exchange-solana', host: 'mercados.10am.pro/jup',
  sector: 'Solana DEX aggregation & perps',
  tagline: 'Volumen, fees y buyback — el agregador que procesa la mayoría de los swaps de Solana.',
  description: 'Jupiter ($JUP) en vivo: volumen del agregador, fees, revenue y buyback, supply overhang on-chain (vote escrow, tesorería, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-and-add-on-fee-growth', reviewed: '26 Oct 2026',
  ta: {
    updated: '26 Oct 2026', bias: 'BEAR',
    read: 'La invalidación se cumplió al cierre, con margen, y el 61.8% llegó en vivo. El 25 Oct cerró 0.2892 — −3.4%, el tercer cierre rojo desde la ruptura fallida del 22 Oct (0.3266) — 2.7% debajo de 0.2971, la EMA50 que anulaba el sesgo alcista: un cierre real, no el 0.8% del día anterior; la regla se cumplió y el sesgo pasa a bajista. Y 0.2892 es 0.2891 — el mínimo del 19 Oct que era el stop del movimiento entero — al diezmilésimo: un empate que la regla cuenta como cumplido. El 26 Oct cerró 0.2827, −2.2%: debajo de 0.2891 con margen, mínimo de 30 días, el cierre más bajo desde la última semana de septiembre, antes de que el escalón de octubre existiera. Hoy 0.2777, −1.8%: 0.4% sobre 0.2766, el 61.8% del tramo 0.216 → 0.3747 y el +1M de la lectura — a esa distancia en esta página se escribe como alcanzado. Cinco cierres rojos desde 0.3266 devolvieron 13.4% — el rebote entero (0.2891 → 0.3266, +13%) más 2%: la ruptura fallida del 22 Oct fue el techo del rebote y el rebote fue el techo del escalón. Volumen $51.5M, 65% del promedio de 20 días ($78.9M): la pérdida de la EMA50 y del mínimo del 19 Oct, sin volumen las dos — nada de lo que pasó en dos semanas pasó el promedio, que todavía está 22% sobre el de 90 días por los días del 10–13 Oct. Tres de siete, sin cambio: el precio sobre la 200 (0.2463, +6.8% en 20 días, la más empinada de la página), la 50 sobre la 200 y la 200 subiendo; debajo de la EMA20 (0.3072), la 50 (0.2952) y, hoy, a 4% de la 100 (0.2674). RSI 29.1, desde 26.9 — cuarta sesión bajo 30 con el precio 5% más abajo que cuando lo cruzó: sobreventa que se extiende, no que se agota; el histograma del MACD sigue ampliándose. Relativo: −5.6% en siete días con SOL −4.0%, 1.4× — JUP dejó de ser la alt que menos cae: JTO (−2.8%), 2Z (−4.4%) y PUMP (−4.5%) cayeron menos esta semana; en el día, −1.9% con SOL −0.5%. Lo que cambió: 0.2971 y 0.2891 se cerraron, el sesgo es bajista, el +1M llegó y 0.2766 es el precio. Lo que no cambió: el mínimo creciente de la escalera (0.216, 16 Sep) sigue lejos, la EMA200 sigue subiendo 7% y los fees siguen siendo la variable que importa — la estructura de 2026 está intacta debajo de un escalón devuelto. La invalidación bajista va a 0.2995: el cierre del 24 Oct, el último que aguantó la EMA50 — el pivote de la ruptura, no la media (0.2952), que es el primer escalón; 0.2891 se recupera en el camino.',
    pattern: '<b>Escalera alcista; el escalón de octubre devuelto — ruptura fallida sobre la EMA20 (22 Oct), la EMA50 cerrada (25 Oct) y el 61.8% alcanzado (27 Oct en vivo).</b> Mínimos crecientes 0.1418 (30 Mar) → 0.1473 (11 Jun) → 0.1664 (16 Ago) → 0.216 (16 Sep) → 0.3153 (3 Oct); máximos 0.1976 → 0.2392 → 0.2754 → 0.3722 → 0.3747 (10 Oct). El tramo 0.216 → 0.3747 devolvió el 54% (0.2891, 19 Oct), rebotó tres cierres hasta 0.3266 (22 Oct, sobre 0.3161 y la EMA20) y devolvió eso y más en cinco: 0.3115 / 0.2995 / 0.2892 (25 Oct, la EMA50 cerrada y 0.2891 empatado) / 0.2827 (26 Oct, mínimo de 30 días) / 0.2777 hoy, en el 61.8% (0.2766). Un rebote a la EMA20 que se devuelve entero y cierra bajo la EMA50 y bajo el mínimo del que salió es el escalón de octubre devuelto: la escalera sigue en pie como estructura (0.216 es el mínimo creciente que la sostiene, la EMA200 sube 7%), pero el precio está debajo de las dos medias que la definían y en el nivel que la corrección nunca había tocado. Abajo, 0.2674 (EMA100) es el siguiente, 0.25 (78.6%) el último antes de 0.2463 (EMA200) y 0.216. Arriba, 0.2891–0.2952 (mínimo del 19 Oct + EMA50) es el primer techo, 0.2995 (último cierre sobre la media) el que anula el sesgo, 0.3072 (EMA20) y 0.3153–0.3161 el siguiente racimo. La medida del impulso (0.47–0.55) vuelve al mapa recién con una base nueva sobre 0.3153.',
    watch: '<b>0.2766 y 0.2995.</b> Abajo: 0.2766 (61.8% del tramo 0.216 → 0.3747) es el precio — a 0.4%, escrito como alcanzado; la vela que importa es la que lo aguante al cierre con rechazo abajo, $90M+ y JUP subiendo más que SOL: ahí se suma. Sin la vela, el cierre bajo 0.2766 abre 0.2674 (EMA100) y 0.25 (78.6%) sin un nivel en el medio. Arriba: 0.2891–0.2952 (mínimo del 19 Oct + EMA50) es el primer techo del rebote; el que anula el sesgo bajista es el cierre sobre 0.2995 (cierre del 24 Oct, el último sobre la EMA50) con $90M+ — ahí el 25–26 Oct fue un barrido y 0.3072 (EMA20) reabre. <b>RSI:</b> 29.1, cuarta sesión bajo 30 con el precio cayendo — sobreventa real; una vela verde con volumen desde 0.2766 es comprable, dos rojas más son la EMA100. <b>Volumen:</b> $51.5M, 65% del promedio; dos semanas sin una barra sobre el promedio en ninguna dirección. Un cierre bajo 0.2766 con $150M+ es la distribución del escalón; uno de vuelta sobre 0.2995 con $90M+, el barrido. <b>Fees:</b> la capa de network decide — fees de Jupiter en máximos con el precio en 0.2766 es la escalera intacta y el lugar de sumar; fees cayendo, no. <b>Relativo:</b> JUP −5.6% vs SOL −4.0% en la semana (1.4×): dejó de ser la alt que menos cae; −1.9% vs −0.5% en el día. Sin días propios desde el 22 Oct.',
    decision: [
      'Con posición: <b>mantener el core con el stop en el cierre bajo 0.2766; no sumar sin la vela</b>. La entrada por fuerza del 22 Oct se cerró — su stop (cierre bajo 0.2971) imprimió el 25 Oct en 0.2892 — y el core quedó con la regla que la lectura anterior dejó: cierre bajo 0.2766 (61.8%) y el escalón de octubre está devuelto entero, 0.2674 es el camino. El 61.8% es el precio de hoy y no es la entrada todavía: se suma 25% en el cierre que lo aguante con vela de rechazo, $90M+ y JUP subiendo más que SOL, no porque el precio tocó el número con el 65% del volumen y el RSI bajo 30 por cuarta sesión.',
      'Sin posición: <b>nada hasta la vela en 0.2766 o hasta el cierre de vuelta sobre 0.2995</b>. 25% del tamaño en el retest de 0.2766 que aguante al cierre con vela de rechazo, $90M+ y JUP subiendo más que SOL — stop en el cierre bajo 0.2674 (EMA100); o 25% en el cierre de vuelta sobre 0.2995 con 0.2891 recuperado y $90M+. Comprar 0.2777 porque es el 61.8% es comprar un Fibonacci con el libro vacío: 0.2971 y 0.2891 eran niveles de verdad y cayeron igual.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.2995</b> (cierre del 24 Oct, el último que aguantó la EMA50; la media en 0.2952 y 0.2891 se recuperan en el camino) con $90M+. Ahí el 25–26 Oct fue un barrido del mínimo del 19 Oct → 0.3072 (EMA20) → 0.3153 (base del escalón) → 0.3266 (techo del rebote).',
    ],
    invalidation: { level: 0.2995, text: 'Cierre diario sobre 0.2995 (cierre del 24 Oct, el último sobre la EMA50 antes de que la media se cerrara el 25 Oct en 0.2892; la EMA50 en 0.2952 y el mínimo del 19 Oct en 0.2891 se recuperan en el camino) con volumen sobre $90M anula el path bajista: el 25–26 Oct fue un barrido y el escalón de octubre se reconstruye → 0.3072 (EMA20), 0.3153 (base del escalón) y 0.3266 (techo del rebote del 22 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.25, how: '78.6% del tramo 0.216 → 0.3747, con la EMA200 (0.2463) pegada debajo: EMA50 y 0.2891 cerrados (25 Oct), el 61.8% (0.2766) alcanzado en vivo con el 65% del volumen → cierre bajo 0.2766 → EMA100 (0.2674, el escalón) → 0.25. Si 0.2766 aguanta al cierre con vela y $90M+, el +1M es el rebote a 0.2891–0.2952 (mínimo del 19 Oct + EMA50).' },
      { d: 90, h: '+3M', target: 0.3153, how: 'Mínimo del 3 Oct, la base del escalón: el retest desde abajo del racimo 0.3072–0.3161 (EMA20 + invalidación vieja) después de que 0.25–0.2766 aguante con los fees de Jupiter en máximos. Sin fees, 0.2995 es el techo del trimestre y 0.216 (16 Sep) el nivel donde termina la escalera.' },
      { d: 365, h: '+1Y', target: 0.3747, how: 'Máximo del 10 Oct, máximo de 12 meses: el escalón de octubre reconstruido sobre 0.3153. Requiere fees, buyback y share del agregador creciendo, no chart; 0.4445 (máximo de Oct-25) y la medida del impulso (0.55) quedan detrás.' },
    ],
    levels: {
      resistance: [[0.2827, 'Cierre 26 Oct · mínimo de 30 días'], [0.2891, 'Mínimo 19 Oct · empatado el 25 Oct, perdido el 26 Oct — ahora techo'], [0.2952, 'EMA50 · invalidación alcista vieja (0.2971) · cerrada el 25 Oct'], [0.2995, 'INVALIDACIÓN bajista · cierre 24 Oct · el último sobre la EMA50'], [0.3072, 'EMA20'], [0.3115, 'Cierre 23 Oct'], [0.3153, 'Mínimo 3 Oct · base del escalón · +3M'], [0.3161, 'Invalidación bajista vieja · cerrada el 22 Oct, devuelta el 23 Oct'], [0.3266, 'Cierre 22 Oct · techo del rebote · ruptura fallida'], [0.3317, 'Cierre 13 Oct'], [0.3639, 'Cierre 12 Oct'], [0.3747, 'Máximo 10 Oct · máximo de 12 meses · +1Y'], [0.4445, 'Máximo Oct-25'], [0.55, 'Medida del impulso · archivada']],
      support: [[0.2777, 'Hoy · el precio está acá'], [0.2766, '61.8% del tramo 0.216 → 0.3747 · +1M viejo, alcanzado en vivo · donde se suma con vela · stop del core'], [0.2674, 'EMA100 · el escalón · stop de la próxima entrada'], [0.25, '78.6% del tramo · +1M'], [0.2463, 'EMA200 — subiendo 6.8%/20d'], [0.216, 'Mínimo 16 Sep · escalón anterior · debajo termina la escalera']],
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
