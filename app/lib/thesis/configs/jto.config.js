import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jto', name: 'Jito', symbol: 'JTO', cgId: 'jito-governance-token', host: 'mercados.10am.pro/jto',
  sector: 'Solana MEV & liquid staking',
  tagline: 'MEV tips, JitoSOL TVL y revenue real — ¿el token captura lo que la red genera?',
  description: 'Jito ($JTO) en vivo: tips MEV, TVL de JitoSOL, fees y revenue del protocolo, supply overhang on-chain, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'accumulate-on-weakness', reviewed: '23 Ago 2026',
  catalyst: {
    title: 'SGP-0002 «Double Disinflation» (SIMD-0550)',
    date: 'votación on-chain en vivo · cierra ~29 Ago 2026',
    body: [
      '<b>Qué se vota.</b> Solana decide si duplica su desinflación — la velocidad a la que baja la emisión de SOL nuevo — de -15% a -30% anual. El piso de inflación de 1.5% llegaría en 2029 en vez de 2032, y dejarían de emitirse ~18.9M SOL en 6 años (~2.6% menos supply futuro). Propuesta en <a href="https://governance.solana.com/proposals" style="color:inherit">governance.solana.com</a>.',
      '<b>Por qué beneficia a JTO (1): el MEV pasa a pesar más.</b> El rendimiento de un staker de Solana tiene dos partes: emisión (SOL nuevo que imprime la red) + tips MEV (propinas reales que pagan los traders por prioridad de inclusión — el negocio de Jito). Los autores modelan el yield base cayendo de ~5.8% a ~2.2% en 3 años. Los tips NO dependen de la emisión: si la emisión se corta, el MEV deja de ser el condimento y pasa a ser el plato. La ventaja de JitoSOL sobre staking común se agranda en términos relativos, y cada punto básico extra importa más cuando el yield total es chico.',
      '<b>(2): el peaje se vuelve indispensable.</b> Validadores que cobran menos emisión necesitan más el ingreso MEV para ser rentables. Eso refuerza la dependencia del cliente Jito y de BAM — exactamente el moat de la tesis.',
      '<b>(3): beta a SOL.</b> Menos SOL nuevo = menos venta estructural de recompensas de staking. Bullish SOL en el margen, y JTO opera como beta alta a SOL (ver capa relativa abajo): lo que mueve a SOL mueve amplificado a JTO.',
      '<b>Lo que NO hace.</b> No pone un dólar más en la caja de Jito hoy: los tips (TOV) cayeron ~50% QoQ en Q2. Una porción más grande de una torta que se achica no son más dólares. Un APY total menor puede además reducir el stake total y el TVL de JitoSOL — que ya viene perdiendo share contra Sanctum. Y no toca el problema central de JTO: sin fee switch / buyback de la DAO, el token sigue sin recibir ese cash flow.',
      '<b>Estado y precedente.</b> Tercera iteración de la misma idea: SIMD-228 falló en marzo 2025 (61.4% vs 66.7% requerido) y SIMD-411 murió por inactividad. Votan los validadores — se están votando un recorte de sueldo. Las tesorerías institucionales están divididas (DFDV a favor, Solana Company en contra). Si pasa, la activación técnica llega meses después vía feature gate.',
      '<b>LECTURA ·</b> Catalizador de régimen, no de revenue: reordena el staking de Solana a favor del MEV — el negocio de Jito — y reduce la dilución de SOL. Por sí solo no convierte tips en valor para JTO; eso sigue dependiendo de la DAO. <b>Decisión:</b> › si pasa (≥66.7%), sube la prima estructural de Jito: accumulate-on-weakness con más convicción. › si falla como en 2025, neutral — era opcionalidad gratis, la tesis no cambia. › el doble catalizador real sería esto + fee switch de la DAO: ahí JTO deja de ser solo beta a SOL.',
    ],
  },
  sources: 'Network telemetry: DefiLlama (Jito TVL, fees = MEV tips, revenue = DAO take).',
  rule: 'fees cayendo >40% desde pico + TVL de JitoSOL perdiendo share = reducir; DAO activando distribución de revenue a stakers = subir posición.',
  thesis: [
    '<b>Qué es.</b> Jito corre el cliente de validador dominante en Solana (>90% del stake) y el pool de staking líquido JitoSOL. Los searchers pagan tips por inclusión de bundles; esos tips son revenue real, en SOL, todos los días.',
    '<b>La tesis.</b> JTO es la opción más limpia sobre la actividad económica de Solana: cuando hay volumen y MEV, los tips suben; cuando Solana duerme, caen. El upside es que la DAO ya captura una parte (fee sobre tips + fee sobre JitoSOL) y puede redirigirla al token. El riesgo es que nunca lo haga y JTO quede como token de gobernanza con cash flow que no le pertenece.',
    '<b>Lo que valida.</b> Tips mensuales en máximos o cerca (fees en DefiLlama), TVL de JitoSOL creciendo en SOL (no solo en USD), y cualquier propuesta de la DAO que conecte revenue → JTO (buyback, staking yield, fee switch).',
    '<b>Lo que rompe.</b> Competencia en el cliente (Firedancer sin Jito, Paladin), tips cayendo mientras Solana sube (pérdida de share), o la DAO gastando la tesorería en incentivos sin retorno.',
  ],
  network: {
    title: 'MEV tips · TVL · revenue (DefiLlama)',
    note: 'Fees = tips pagados por searchers (monthly sum). Revenue = parte que retiene la DAO. TVL = JitoSOL + restaking, en USD (ojo: sube con el precio de SOL).',
    metrics: [
      { key: 'fees', label: 'MEV tips (fees)', source: 'llama-fees', slug: 'jito', dataType: 'dailyFees', unit: 'usd', primary: true },
      { key: 'revenue', label: 'Protocol revenue', source: 'llama-fees', slug: 'jito', dataType: 'dailyRevenue', unit: 'usd' },
      { key: 'tvl', label: 'TVL (JitoSOL)', source: 'llama-tvl', slug: 'jito', unit: 'usd' },
    ],
  },
  onchain: {
    mint: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL', supply: 1_000_000_000, decimals: 9, treasuryPct: 3,
    labels: {},
    programs: { jtogvBNH3WBSWDYD5FJfQP2ZxNTuf82zL8GkEhPeaJx: ['Jito DAO governance vault (staked JTO)', 'staking'] },
    staking: { vaultOwner: 'jjCAwuuNpJCNMLAanpwgJZ6cdXzLPXe2GfD6TaDQBXt', label: 'Staked in Jito DAO', note: 'vault del programa de gobernanza jtogv…eaJx, leído en vivo' },
    read: ({ chain, d, fmtNum, pctS }) => {
      const ho = chain.holders; if (!ho) return 'Holders scan unavailable.';
      const tr = ho.treasuryLike, ex = ho.exchange, daily = d?.price && d?.vol24 ? d.vol24 / d.price : null;
      const lots = ho.top.filter((h) => h.kind === 'unlabeled' && h.amt % 1000000 === 0).length;
      return `<b>El overhang de JTO es la tesorería, no el retail.</b> ${pctS(tr)} del supply está en wallets sin etiqueta ≥3% (foundation / team / investors post-cliff) — una sola tiene ${pctS(ho.top[0].amt)}.${lots ? ` ${lots} wallets con múltiplos exactos de 1M (tranches de inversores, no compras de mercado).` : ''} Los unlocks mensuales de inversores y equipo son el vendedor estructural — el float real es mucho menor que el supply. <div style="margin-top:6px"><b>Exchanges:</b> ${fmtNum(ex)} JTO (${pctS(ex)}) en CEX etiquetados${daily ? `, ≈${(ex / daily).toFixed(1)} días de volumen` : ''}. Con liquidez profunda en Binance/Coinbase, el exchange float no es el problema; el problema es el calendario de vesting.</div><div style="margin-top:6px"><b>Decisión:</b> › mirá el unlock del día 7 de cada mes: si el precio no absorbe el unlock en 48h, el mercado no tiene demanda para el float nuevo. › Tesorería moviéndose a CEX = salir. › DAO votando fee switch o buyback = la única razón para ponderar por encima de beta a SOL.</div>`;
    },
  },
  tripwires: ({ M, chain, trend, fc }) => [
    tw.metric(M, 'fees', { good: 80, watch: 55 }),
    tw.metric(M, 'revenue', { good: 80, watch: 55 }),
    tw.metric(M, 'tvl', { good: 85, watch: 60 }),
    tw.concentration(chain, { exchangeWarnPct: 10, treasuryWarnPct: 30 }),
    tw.trend(trend, fc),
    tw.custom('watch', '◦', 'Revenue → JTO link', 'La DAO cobra fee sobre tips y sobre JitoSOL, pero JTO no recibe nada todavía. Sin fee switch / buyback, el token es gobernanza pura. Esto es el tripwire que convierte trade en inversión.'),
    tw.custom('watch', '◦', 'SGP-0002 double disinflation', 'Votación cierra ~29 Ago 2026. Si pasa: la emisión de SOL cae más rápido → el MEV de Jito pesa más en el yield total y los validadores dependen más del cliente. Si falla (como SIMD-228 en 2025): neutral, la tesis no cambia. El dato a mirar es resultado + fecha de activación del feature gate.'),
    tw.custom('watch', '◦', 'Client share', 'Firedancer y clientes alternativos sin el módulo Jito erosionarían el monopolio de tips. Si el share del cliente Jito cae bajo 80%, la tesis de "peaje de Solana" se debilita.'),
  ],
  decision: decisionBuilder('JTO', {
    flips: ({ net, M, U }) => {
      const f = net?.fees, r = net?.revenue;
      return [
        `<b>Fee switch / buyback aprobado en la DAO</b> — convierte el cash flow en valor para JTO. Hoy: no existe.`,
        `MEV tips mensuales ${f?.peak ? `volviendo sobre <b>${U(f.peak * 0.85)}</b> (85% del pico; hoy ${U(f.latest)})` : 'recuperando el pico'}. Mientras caen, JTO es beta a SOL sin prima.`,
        `Tesorería / investor wallets moviéndose a exchanges antes del unlock = salir sin esperar el chart.`,
        `Pérdida de share del cliente Jito (Firedancer sin tips) = tesis rota, no solo bajista.`,
        `<b>SGP-0002 aprobado</b> (doble desinflación de SOL, cierra ~29 Ago) — la emisión cae más rápido y el MEV pesa más en el yield: prima estructural para Jito. Si falla, neutral.`,
      ];
    },
  }),
};
