import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jup', name: 'Jupiter', symbol: 'JUP', cgId: 'jupiter-exchange-solana', host: 'mercados.10am.pro/jup',
  sector: 'Solana DEX aggregation & perps',
  tagline: 'Volumen, fees y buyback — el agregador que procesa la mayoría de los swaps de Solana.',
  description: 'Jupiter ($JUP) en vivo: volumen del agregador, fees, revenue y buyback, supply overhang on-chain (vote escrow, tesorería, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-and-add-on-fee-growth', reviewed: '16 Oct 2026',
  ta: {
    updated: '16 Oct 2026', bias: 'BULL',
    read: 'El retest falló y la invalidación aguantó por un diezmilésimo. Tres cierres seguidos para abajo desde la EMA20: 0.3308 (14 Oct), 0.3193 (15 Oct) y 0.3101 (16 Oct) — debajo del mínimo del 3 Oct (0.3153), la base del escalón de octubre, y a 0.0001 de la invalidación de 0.31. Hoy 0.3097, debajo de ella intradía. Lo que escribí el 13 Oct — "el retest aguanta o no, y se sabe en dos o tres sesiones" — se supo: no aguantó. La escalera perdió su último mínimo y la entrada del plan (0.32–0.335) no confirmó nunca; quien compró ahí está 5% abajo con el stop a nada. Cuatro de siete, igual que el 13 Oct, pero la foto es otra: RSI 48, MACD negativo y ampliándose, y el precio 5% debajo de la EMA20 (0.3267). Lo que sigue en pie es la estructura larga — sobre la EMA50 (0.2944) y la EMA200 (0.2385, +10% en 20 días, la más empinada de la página). Volumen $67M en la caída, 70% del promedio de 20 días: no es distribución con volumen, es la demanda que se fue. Y acá está el cambio de verdad: −13.7% en siete días con SOL −3.0%. JUP cayó 4.6× el mercado — la semana pasada caía menos, ahora cae mucho más. El relativo que sostenía la lectura de "demanda propia" se dio vuelta, y eso vale más que el diezmilésimo que separa el cierre de 0.31. Mantengo el sesgo alcista por una sola razón: la regla no se cumplió, y las reglas valen cuando se respetan en los dos sentidos. Pero es un alcista que ya no compra.',
    pattern: '<b>Escalera alcista con el último escalón roto.</b> Mínimos crecientes 0.1418 (30 Mar) → 0.1473 (11 Jun) → 0.1664 (16 Ago) → 0.216 (16 Sep) → 0.3153 (3 Oct); máximos 0.1976 → 0.2392 → 0.2754 → 0.3722 → 0.3747 (10 Oct). El 16 Oct cerró bajo 0.3153: el escalón de octubre se perdió y el patrón de impulso-consolidación-impulso se cortó en el tercer ciclo. La secuencia de mínimos crecientes sigue viva en el escalón anterior (0.216) y la EMA50 (0.2944) es el primer soporte real debajo del precio; entre 0.31 y 0.2944 no hay nada. La medida del impulso (0.47–0.55) queda archivada hasta que el precio vuelva sobre 0.3153 y construya una base nueva.',
    watch: '<b>0.31 y 0.3153.</b> Abajo: cierre bajo 0.31 anula el sesgo — está a 0.0001 y hoy intradía ya pasó; no hay margen. Arriba: recuperar 0.3153 al cierre devuelve el precio al escalón; dos cierres sobre la EMA20 (0.3267) y el retest fallido pasa a ser un barrido. <b>Relativo:</b> el dato de la semana — JUP −13.7% vs SOL −3.0%. Hasta que JUP suba más que SOL en un día verde, la demanda propia no volvió y cada rebote es para reducir. <b>Volumen:</b> un día de $150M+ cerrando bajo 0.31 confirma la salida; un rebote con $60M es cortos cerrando. <b>EMA50 (0.2944):</b> si 0.31 cae, es el único nivel hasta 0.257.',
    decision: [
      'Con posición: <b>mantener solo con el 0.31 intacto; no sumar</b>. La entrada del plan falló y el relativo se dio vuelta — el parcial en 0.40 queda archivado. Si cierra bajo 0.31, se reduce en el rebote a 0.3153–0.3267, no en pánico.',
      'Sin posición: <b>nada</b>. La entrada del 13 Oct ya no existe: la próxima es el retest de la EMA50 (0.2944) que aguante con JUP subiendo más que SOL, o el cierre de vuelta sobre 0.3267 con volumen. 25% del tamaño, como siempre.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.31</b>. Ahí la escalera perdió dos mínimos seguidos → 0.2944 (EMA50) → 0.257.',
    ],
    invalidation: { level: 0.31, text: 'Cierre diario bajo 0.31 (el mínimo del 3 Oct, 0.3153, ya se perdió el 16 Oct; 0.31 es lo que queda del escalón de octubre) anula el path → 0.2944 (EMA50) y 0.257 (mitad del tramo desde el 16 Sep); debajo de eso, 0.2385 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 0.3317, how: 'Recuperar 0.3153 → dos cierres sobre la EMA20 (0.3267) → 0.3317, el cierre del 13 Oct y el techo del retest fallido. Sin la EMA20 de vuelta, el +1M es 0.2944–0.3267.' },
      { d: 90, h: '+3M', target: 0.3747, how: 'Retest del máximo del 10 Oct. Requiere una base nueva sobre 0.3153 y el relativo contra SOL de vuelta positivo; sin eso, el techo del trimestre es la EMA20.' },
      { d: 365, h: '+1Y', target: 0.4445, how: 'Máximo de Oct-25. De 0.3747 para arriba es fundamentales — fees, buyback, share del agregador — no chart. La medida del impulso (0.55) vuelve solo si el precio reconstruye la escalera sobre 0.3153.' },
    ],
    levels: {
      resistance: [[0.3153, 'Mínimo 3 Oct · base del escalón, perdida el 16 Oct — a recuperar'], [0.3267, 'EMA20'], [0.3317, 'Cierre 13 Oct · techo del retest fallido'], [0.3639, 'Cierre 12 Oct'], [0.3747, 'Máximo 10 Oct · máximo de 12 meses'], [0.40, 'Zona de Nov-25'], [0.4445, 'Máximo Oct-25'], [0.55, 'Medida del impulso · archivada']],
      support: [[0.3101, 'Cierre 16 Oct'], [0.31, 'INVALIDACIÓN · sin margen'], [0.2944, 'EMA50 · único nivel hasta 0.257'], [0.257, 'Mitad del tramo desde el 16 Sep'], [0.2385, 'EMA200 — subiendo 10%/20d'], [0.216, 'Mínimo 16 Sep · escalón anterior']],
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
