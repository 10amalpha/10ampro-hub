import { decisionBuilder, tw, fmt } from '../framework';

// SOL is the benchmark, not an alt: no SPL mint to scan (onchain.native), the relative layer
// rotates its benchmark to ETH/BTC server-side, and "who has to sell" here means emission, not wallets.

export const TOKEN = {
  slug: 'sol', name: 'Solana', symbol: 'SOL', cgId: 'solana', host: 'mercados.10am.pro/sol',
  sector: 'Layer 1 · el benchmark del ecosistema',
  tagline: 'Fees de red, economía de apps, inflación vs burn, SOL/BTC y flujo ETF — el activo contra el que se mide todo lo demás en esta página.',
  description: 'Solana ($SOL) en vivo: fees de la red y de las apps, volumen DEX, TVL, inflación y staking on-chain, ratios SOL/BTC y SOL/ETH, posicionamiento en futuros, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'core-accumulate', reviewed: '23 Ago 2026',
  catalyst: {
    title: 'Primera gobernanza on-chain de Solana — SGP-1 · SGP-2 · SGP-3',
    date: 'votación en epoch 1021 · en curso · cierra ~29 Ago 2026',
    body: [
      '<b>Qué se vota.</b> Tres propuestas a la vez, votadas por los validadores ponderados por stake, en la primera gobernanza on-chain formal de la red. <b>SGP-1</b> adopta la "Constitución de Solana" (el marco de cómo se vota de acá en adelante). <b>SGP-2</b> es la "double disinflation": el grifo de emisión se cierra al doble de velocidad (de -15% a -30% por año), el piso de 1.5% de inflación llega en 2029 en vez de 2032, y ~18.9M SOL que estaban programados nunca se emiten. <b>SGP-3</b> cambia la mecánica de fees y podría multiplicar el burn diario de ~648 a ~9.000 SOL. Ojo: el frontend de gobernanza mostró por error un quorum de 60% — el quorum real es un tercio del stake.',
      '<b>Por qué importa.</b> Hoy la red imprime ~60.000 SOL por día para pagar el staking, y ese SOL impreso es la venta estructural de Solana: validadores y stakers venden una parte todos los días para cubrir costos. SGP-2 achica el grifo; SGP-3 agranda el desagüe. Aprobadas las dos, la matemática de supply de SOL empieza a parecerse a la de ETH después del merge: emisión cayendo contra un burn creciendo. Para un activo cuyo mayor overhang es su propia emisión, es el cambio estructural más grande desde el lanzamiento.',
      '<b>El costo.</b> Los propios autores modelan el yield base de staking cayendo de ~5.8% a ~2.2% en tres años. Menos yield puede achicar el % del supply en staking (mirá la capa on-chain de arriba: hoy ronda dos tercios) y presionar el TVL de los pools líquidos. Segundo efecto: con menos emisión, los tips MEV pesan más en el yield — esa es exactamente la tesis de <a href="/jto" style="color:inherit">JTO</a>, que se beneficia del mismo voto por otra vía.',
      '<b>El precedente.</b> Es el tercer intento de la misma idea: SIMD-228 falló en marzo 2025 con 61.4% (necesitaba 66.7%) y SIMD-411 murió antes de votarse. Votan los validadores — se están votando un recorte de sueldo — así que el resultado no está cantado. Y si pasa, la activación técnica no es inmediata.',
      '<b>LECTURA ·</b> Esto no es una noticia de precio para mañana: es la estructura de supply de los próximos cinco años decidiéndose en una semana. <b>Decisión:</b> › SGP-2 + SGP-3 aprobadas = flip estructural: menos emisión y más burn justifican subir la convicción del core, comprando debilidad, no el anuncio. › solo SGP-2 = la mitad del efecto, sigue siendo neto positivo. › si fallan como en 2025, no cambió nada — el statu quo no es bajista, era opcionalidad gratis. › el combo que cambia el sizing: aprobación + flujo ETF sostenido en la misma ventana.',
    ],
  },
  sources: 'Network telemetry: DefiLlama (fees de la propia red, fees agregados de las apps del ecosistema, volumen DEX, TVL de la chain). Supply, staking e inflación: Solana RPC en vivo.',
  rule: 'fees de red y de apps cayendo mientras el precio sube = rally sin uso, reducir; SGP-2/SGP-3 aprobadas + flujo ETF sostenido + SOL/BTC dejando de hacer mínimos = subir posición.',
  thesis: [
    '<b>Qué es.</b> Solana es la L1 de alta velocidad donde vive todo lo demás que cubrimos en esta página: el MEV de Jito, el volumen de Jupiter, la liquidez de Meteora, los launches de Pump.fun, la fibra de DoubleZero. Comprar SOL es comprar el índice de esa economía: cada transacción paga fees en SOL, cada validador stakea SOL, cada app lo usa como colateral.',
    '<b>La tesis.</b> SOL es la única posición del ecosistema que captura valor por tres vías a la vez: fees quemados (uso), yield de staking (seguridad) y demanda institucional vía ETFs spot (~$1.16B acumulado desde el lanzamiento). El resto de los tokens de esta página son apuestas sobre una app; SOL es la apuesta sobre que la economía entera crece. El costo: su propio grifo de emisión (~4.3% anual, cayendo) es venta estructural diaria — y eso es exactamente lo que la gobernanza está votando cambiar.',
    '<b>Lo que valida.</b> Fees de red y de apps recuperando contra el pico de enero 2025, volumen DEX y TVL creciendo en SOL (no solo en USD), stake estable arriba del 60% con yield cayendo, flujo ETF semanal positivo sostenido, y el burn subiendo si SGP-3 pasa.',
    '<b>Lo que rompe.</b> Actividad on-chain estancada con el precio subiendo (rally sin uso), % staked cayendo fuerte (el yield ya no retiene capital), outflows sostenidos de ETFs, o Ethereum/L2s recuperando el flujo de apps y estables que hoy migra hacia Solana.',
  ],
  network: {
    title: 'Network fees · app fees · DEX volume · TVL (DefiLlama)',
    note: 'Network fees = lo que paga el usuario a la red (base + priority), suma mensual. App fees = fees agregados de todos los protocolos del ecosistema. TVL en USD (ojo: sube con el precio de SOL).',
    metrics: [
      { key: 'fees', label: 'Network fees', source: 'llama-fees', slug: 'solana', dataType: 'dailyFees', unit: 'usd', primary: true },
      { key: 'appfees', label: 'App fees (ecosistema)', source: 'llama-chain', chain: 'solana', kind: 'fees', dataType: 'dailyFees', unit: 'usd' },
      { key: 'dex', label: 'DEX volume', source: 'llama-chain', chain: 'solana', kind: 'dexs', unit: 'usd' },
      { key: 'tvl', label: 'Chain TVL', source: 'llama-chain-tvl', chain: 'Solana', unit: 'usd' },
    ],
  },
  onchain: {
    native: true, mint: 'So11111111111111111111111111111111111111112', supply: 640_000_000, decimals: 9,
    read: ({ chain, d, fmtNum, pctS }) => {
      const circ = chain.circulating, nc = chain.nonCirculating, stk = chain.stake, inf = chain.inflation;
      if (!circ) return 'Supply scan unavailable.';
      const emisDia = inf && chain.totalSupply ? Math.round(chain.totalSupply * inf.total / 365) : null;
      const stkPct = stk && chain.totalSupply ? (stk / chain.totalSupply * 100).toFixed(1) : null;
      return `<b>El overhang de SOL no es una wallet: es el grifo de emisión.</b> A diferencia de los alts de esta página, acá no hay "3 wallets con 27%" ni cliff de inversores por delante — el estate de FTX ya distribuyó lo grueso y el float es profundo. Lo que diluye es la inflación: ${inf ? `${(inf.total * 100).toFixed(2)}% anual` : 'la emisión'}${emisDia ? ` (~${fmtNum(emisDia)} SOL nuevos por día)` : ''} que va a validadores y stakers, de los cuales una parte se vende todos los días para cubrir costos. Eso es exactamente lo que SGP-2 y SGP-3 están votando cambiar (mirá el catalizador arriba).<div style="margin-top:6px"><b>Staking:</b> ${stk ? `${fmtNum(stk)} SOL activados${stkPct ? ` (${stkPct}% del supply)` : ''}` : 'sin lectura'} — dos tercios del supply no está en venta, está cobrando yield. Es el ancla de SOL: mientras el % staked se mantenga, el float que efectivamente circula en mercado es mucho menor que el circulante nominal de ${fmtNum(circ)}.</div><div style="margin-top:6px"><b>El comprador nuevo:</b> los ETFs spot de EE.UU. (~$1.16B de inflow acumulado, ~$900M en activos) son el "unlock inverso": demanda estructural diaria que los alts de esta página no tienen. Chico todavía contra la emisión, pero es la primera vez que SOL tiene un flujo comprador que no depende del ciclo cripto.</div><div style="margin-top:6px"><b>Decisión:</b> › la variable a mirar es emisión neta vs burn: si SGP-3 pasa, el burn diario puede pasar de ~648 a ~9.000 SOL — seguí ese número, no el precio. › % staked cayendo bajo 60% = el recorte de yield está expulsando capital, primera señal de estrés. › outflows semanales sostenidos de ETFs = el viento institucional se apagó, bajar convicción del core.</div>`;
    },
  },
  tripwires: ({ M, chain, trend, fc }) => [
    tw.metric(M, 'fees', { good: 70, watch: 40 }),
    tw.metric(M, 'appfees', { good: 70, watch: 40 }),
    tw.metric(M, 'dex', { good: 75, watch: 45 }),
    tw.metric(M, 'tvl', { good: 85, watch: 60 }),
    tw.trend(trend, fc),
    tw.custom('watch', '◦', 'Gobernanza SGP-1/2/3 (cierra ~29 Ago)', 'Doble desinflación (~18.9M SOL que no se emiten) + burn ~14× más grande. Aprobadas = el mayor cambio estructural de supply desde el lanzamiento; pasa a ✓. Fallan como SIMD-228 en 2025 = statu quo; queda en ◦. El dato: resultado + fecha de activación.'),
    tw.custom('watch', '◦', 'Flujo ETF spot (EE.UU.)', '~$1.16B acumulado, ~$900M en activos, 7 semanas seguidas de inflows netos — pero concentrados en pocos fondos y chicos contra la emisión diaria. Pasa a ✓ con semanas sostenidas >$50M; pasa a ! con outflows netos sostenidos.'),
    tw.custom(chain?.staking?.pct >= 60 ? 'pass' : 'watch', chain?.staking?.pct >= 60 ? '✓' : '◦', 'Stake rate (en vivo)', chain?.staking?.pct ? `${chain.staking.pct}% del supply está en staking. Sobre 60% = la seguridad y el ancla de float están intactas. Si SGP-2 pasa y el yield cae, este es el número que dice si el capital se queda o se va: bajo 60% = !` : 'Sin lectura de stake.'),
    tw.custom('watch', '◦', 'Alpenglow / slot-time 200ms', 'Agave v4.2 activándose en mainnet: primera reducción de slot-time rumbo a 200ms y al overhaul de consenso Alpenglow. Ejecución limpia = ✓ (la ventaja de velocidad se agranda); incidentes o rollback = ! (el riesgo técnico de L1 vuelve a la mesa).'),
  ],
  decision: decisionBuilder('SOL', {
    flips: ({ net, M: Mf, U }) => {
      const f = net?.fees, a = net?.appfees;
      return [
        `<b>SGP-2 + SGP-3 aprobadas</b> — menos emisión y más burn cambian la matemática de supply de los próximos 5 años. Es el flip que convierte "trade de ciclo" en "core de largo plazo".`,
        `Fees de red ${f?.peak ? `recuperando sobre <b>${U(f.peak * 0.5)}</b> mensual (50% del pico; hoy ${U(f.latest)})` : 'recuperando contra el pico de enero 2025'} — el precio sin uso es un rally prestado.`,
        `App fees del ecosistema ${a?.latest ? `(hoy ${U(a.latest)}/mes) ` : ''}haciendo máximos: la economía de apps es lo que los ETFs le venden a las instituciones.`,
        `Flujo ETF semanal sostenido sobre $50M = demanda estructural real; outflows sostenidos = quitar el viento institucional de la tesis.`,
        `<b>SOL/BTC dejando de hacer mínimos</b> — mientras el ratio caiga, todo rally en USD es sospechoso. El ratio girando es el permiso para subir tamaño.`,
        `% staked cayendo bajo 60% tras el recorte de yield = el capital se va; reducir convicción aunque el precio aguante.`,
      ];
    },
  }),
};
