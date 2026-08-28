import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jto', name: 'Jito', symbol: 'JTO', cgId: 'jito-governance-token', host: 'mercados.10am.pro/jto',
  sector: 'Solana MEV & liquid staking',
  tagline: 'MEV tips, JitoSOL TVL y revenue real — ¿el token captura lo que la red genera?',
  description: 'Jito ($JTO) en vivo: tips MEV, TVL de JitoSOL, fees y revenue del protocolo, supply overhang on-chain, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'accumulate-on-weakness', reviewed: '27 Ago 2026',
  catalyst: {
    title: 'SGP-0002 «Double Disinflation» (SIMD-0550)',
    date: 'votación on-chain · cierra hoy 27 Ago 2026 ~15:30 UTC (fin de epoch 1023)',
    body: [
      '<b>Qué se vota.</b> Solana está votando si cierra el grifo al doble de velocidad: la desinflación pasa de -15% a -30% por año. En criollo: hoy la red imprime ~60.000 SOL por día para pagar staking, y ese grifo se achica el doble de rápido. El piso de 1.5% de inflación llega en 2029 en vez de 2032 — ~18.9M SOL que nunca se emiten. La propuesta vive en <a href="https://governance.solana.com/proposals" style="color:inherit">governance.solana.com</a> y cierra hoy, 27 de agosto (~15:30 UTC).',
      '<b>Cómo viene el conteo.</b> El snapshot del 26 de agosto mostraba ~83.7M SOL a favor, ~12M en contra y ~8.3M en abstención: <b>~87% de apoyo entre los votos decisivos</b>. Pinta bien, pero ojo: el umbral es supermayoría de dos tercios y hay ruido público sobre cómo se cuenta el quorum, así que el resultado oficial es el que manda, no el tablero.',
      '<b>Por qué le sirve a JTO.</b> El yield de staking en Solana son dos cosas: SOL impreso + tips MEV — las propinas que pagan los traders por prioridad, o sea, el negocio de Jito. Los propios autores modelan el yield base cayendo de ~5.8% a ~2.2% en tres años. Los tips no dependen de la emisión: cuando lo impreso se achica, el MEV deja de ser el condimento y pasa a ser el plato. Stakear sin Jito rinde cada vez menos; si stakeás con Jito, la parte que solo Jito reparte pesa cada vez más.',
      'Segundo efecto: los validadores cobran menos por emisión y necesitan más el ingreso MEV para no fundirse. Más dependencia del cliente Jito y de BAM. El peaje se vuelve más caro de esquivar, no menos.',
      'Tercero: menos SOL nuevo = menos venta estructural de recompensas de staking. Viento a favor para SOL — y ya lo viste en la capa relativa: JTO no se mueve solo, sigue a SOL. Lo que le hace bien a SOL le llega a JTO con beta.',
      '<b>Lo que NO te resuelve.</b> Por esto no entra un dólar más a la caja de Jito. Los tips vienen cayendo (~50% menos que el trimestre pasado): una porción más grande de una torta que se achica no son más dólares. Un APY total más bajo puede achicar el stake total y el TVL de JitoSOL, que ya viene perdiendo share contra Sanctum. Y el problema de fondo sigue intacto: sin fee switch / buyback de la DAO, JTO no cobra nada de todo esto.',
      '<b>El precedente.</b> Tercer intento de la misma idea: SIMD-228 falló en marzo 2025 (61.4% cuando necesitaba 66.7%) y SIMD-411 murió en el cajón. Votan los validadores — se están votando un recorte de sueldo. Las tesorerías cotizadas están partidas: DFDV a favor, Solana Company en contra. Y si pasa, no es mañana: la activación técnica llega meses después.',
      '<b>LECTURA ·</b> Esto no le pone plata a JTO — le cambia el terreno. Reordena el staking de Solana a favor del MEV, que es el negocio de Jito, y le saca presión vendedora a SOL. Convertir tips en valor para el token sigue dependiendo de la DAO, no de esta votación. <b>Decisión:</b> › si pasa (≥66.7%), la tesis gana un viento estructural: accumulate-on-weakness con más convicción, sin FOMO al resultado. › si falla como en 2025, no cambió nada — era opcionalidad gratis. › el combo que sí te cambia el sizing es este voto + fee switch de la DAO: ahí JTO deja de ser solo beta a SOL.',
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
    tw.custom('watch', '◦', 'SGP-0002 double disinflation', 'Cierra hoy 27 Ago 2026 (~15:30 UTC). Si pasa: la emisión de SOL cae al doble de velocidad, el MEV pesa más en el yield y los validadores dependen más del cliente Jito. Si falla como SIMD-228 en 2025: no cambió nada. El dato: resultado + fecha de activación.'),
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
        `<b>SGP-0002 aprobado</b> (doble desinflación de SOL, cerró 27 Ago) — se imprime menos SOL y el MEV pesa más en el yield: viento estructural para Jito. Si falla, no cambió nada.`,
      ];
    },
  }),
};
