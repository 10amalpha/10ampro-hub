import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jup', name: 'Jupiter', symbol: 'JUP', cgId: 'jupiter-exchange-solana', host: 'mercados.10am.pro/jup',
  sector: 'Solana DEX aggregation & perps',
  tagline: 'Volumen, fees y buyback — el agregador que procesa la mayoría de los swaps de Solana.',
  description: 'Jupiter ($JUP) en vivo: volumen del agregador, fees, revenue y buyback, supply overhang on-chain (vote escrow, tesorería, exchanges), TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-and-add-on-fee-growth', reviewed: '22 Ago 2026',
  sources: 'Network telemetry: DefiLlama (Jupiter aggregator volume, fees, revenue).',
  rule: 'volumen mensual <50% del pico + buyback reducido = reducir; share del agregador estable y fees en máximos = mantener aunque el chart esté feo.',
  thesis: [
    '<b>Qué es.</b> Jupiter enruta la mayor parte de los swaps en Solana (agregador), corre perps, DCA, límite y un launchpad. Cobra fees sobre ese flujo y destina el 50% del revenue a comprar JUP (buyback), que va al lock de 3 años (Litterbox).',
    '<b>La tesis.</b> Es el único activo de Solana donde revenue → token ya está cableado y es verificable. La pregunta no es si captura valor, sino a qué múltiplo y con qué dilución: el supply total es grande y la tesorería/equipo tienen una porción enorme. El caso alcista es compresión de múltiplo cuando el buyback supera las emisiones.',
    '<b>Lo que valida.</b> Volumen mensual del agregador estable o creciendo vs Solana total (share), fees y revenue en máximos, JUP staked (vote escrow) creciendo, buyback ≥ unlocks mensuales.',
    '<b>Lo que rompe.</b> Pérdida de share frente a routing directo / otros agregadores, DAO diluyendo con emisiones (airdrops grandes), tesorería vendiendo, o fees cayendo más rápido que el volumen (compresión de take rate).',
  ],
  network: {
    title: 'aggregator volume · fees · revenue (DefiLlama)',
    note: 'Volume = swaps enrutados por el agregador (monthly sum). Fees = total cobrado; revenue = parte del protocolo (de aquí sale el buyback al 50%).',
    metrics: [
      { key: 'volume', label: 'Aggregator volume', source: 'llama-dex', slug: 'jupiter-aggregator', unit: 'usd', primary: true },
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
    tw.custom('watch', '◦', 'Emisiones vs buyback', 'Airdrops y grants de la DAO son dilución. Mientras las emisiones mensuales superen el buyback, el flotante crece. Mirar propuestas de la DAO, no solo el chart.'),
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
