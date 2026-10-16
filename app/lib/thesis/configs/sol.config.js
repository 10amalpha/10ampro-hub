import { decisionBuilder, tw, fmt } from '../framework';

// SOL is the benchmark, not an alt: no SPL mint to scan (onchain.native), the relative layer
// rotates its benchmark to ETH/BTC server-side, and "who has to sell" here means emission, not wallets.

export const TOKEN = {
  slug: 'sol', name: 'Solana', symbol: 'SOL', cgId: 'solana', host: 'mercados.10am.pro/sol',
  sector: 'Layer 1 · el benchmark del ecosistema',
  tagline: 'Fees de red, economía de apps, inflación vs burn, SOL/BTC y flujo ETF — el activo contra el que se mide todo lo demás en esta página.',
  description: 'Solana ($SOL) en vivo: fees de la red y de las apps, volumen DEX, TVL, inflación y staking on-chain, ratios SOL/BTC y SOL/ETH, posicionamiento en futuros, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'core-accumulate', reviewed: '16 Oct 2026',
  catalyst: {
    title: 'Gobernanza SGP-1/2/3 — RESULTADO',
    date: 'cerro 28 Ago 2026 (epoch 1024) · SGP-1 ✓ 86% · SGP-2 ✓ 67.0% · SGP-3 ✗ 53.9%',
    body: [
      '<b>Que paso.</b> La primera gobernanza on-chain de Solana cerro con resultado partido. <b>SGP-1</b> (la Constitucion) aprobada con 86% — el sistema svmgov queda activo y esto se vota asi de aca en adelante. <b>SGP-2</b> (double disinflation) aprobada con <b>67.0% contra 66.67% requerido: paso por 0.334 puntos</b>. <b>SGP-3</b> (fees + burn 14×) rechazada con ~54%: quorum sobrado, supermayoria no.',
      '<b>El final de pelicula.</b> Seis horas antes del cierre SGP-2 iba perdiendo. Kraken, que habia votado en contra toda la manana, dio vuelta ~8.9M SOL en la ultima hora; Galaxy tambien giro; ~90 validadores entraron en el ultimo tramo; y el override de los holders de JitoSOL — stakers votando por encima de su validador — termino de inclinarla. Participacion: 60.7% del stake elegible. La primera gobernanza de Solana no fue un tramite: fue una final por penales.',
      '<b>Que cambia y que no.</b> Cambia: la emision se recorta al doble de velocidad (-15% → -30% anual), ~18.9M SOL programados que nunca se emiten, piso de 1.5% en 2029 en vez de 2032. NO cambia: el burn sigue en ~648 SOL/dia — el desague grande (SGP-3) no paso. Y ojo con el timing: SGP-2 es un mandato, no un switch. Falta el SIMD-0550 y el feature gate en mainnet — la emision de hoy es la misma que la de ayer hasta la activacion.',
      '<b>LECTURA ·</b> Se dio exactamente el escenario que teniamos escrito aca: solo SGP-2 = la mitad del efecto, y sigue siendo neto positivo. <b>Decision:</b> › el dato que manda ahora es la <b>fecha de activacion de SIMD-0550</b>, no el precio del anuncio. › SGP-3 con 54% no esta muerta: es rechazo del diseno, no de la idea — va a volver en otra forma. › el combo que sube el sizing sigue igual: activacion + flujo ETF sostenido + SOL/BTC sin minimos nuevos.',
    ],
  },
  forecast: {
    updated: '21 Sep 2026', score1m: 74, score3m: 78,
    body: [
      '<b>1M · 74/100.</b> El viento de este mes es de ejecucion, no de narrativa: slot-time ya cortado a 250ms (18 Sep) y Alpenglow apuntado al 28 Sep. SOL ~$116 tras un rally beta a BTC (inflows de ETF + short squeeze); la zona que manda: $110–113 de soporte, $119 de resistencia. Alpenglow limpio = la ventaja de velocidad se agranda y el tripwire tecnico pasa a ✓; con incidentes = el riesgo de L1 vuelve a la mesa y el rally se devuelve.',
      '<b>3M · 78/100.</b> La activacion de SGP-2 convierte el mandato en menos SOL impreso — la primera vez que el overhang estructural de este activo se achica de verdad. Pero BTC.D ~59–60% sigue siendo el techo del regime: sin SOL/BTC dejando de hacer minimos, todo rally en USD es prestado.',
      '<b>Invalidacion ·</b> outflows sostenidos de ETFs, Alpenglow con rollback, o % staked cayendo bajo 60% tras el recorte de yield.',
    ],
  },
  ta: {
    updated: '16 Oct 2026', bias: 'BEAR',
    read: 'El trigger se dio, por poco, y eso es lo peor que podía pasar. El 15 Oct cerró 104.2 — bajo 105, la invalidación que el 13 Oct quedó como el caso entero — y al día siguiente 105.3, hoy 106.2. Una invalidación que se cumple por 0.8% y se recupera en una sesión no confirma la baja ni la anula: deja el precio en tierra de nadie, 1% debajo de la EMA50 (107.2) y 4% debajo de la EMA20 (110.8), con el 61.8% del tramo 96.9 → 122.1 (106.5) como techo inmediato. La regla era cierre bajo 105 y el cierre fue bajo 105: el sesgo pasa a bajista hasta que recupere la EMA20 al cierre. Tres de siete sin cambios — lo que sigue en pie es la estructura larga: la 50 sobre la 200 y la 200 subiendo (97.6, +3.8% en 20 días). El RSI en 28 con el precio 9% sobre la EMA200 sigue siendo un pullback sobrevendido, y el histograma del MACD dejó de caer — es el único dato a favor, y es de los que avisan temprano y se equivocan seguido. Volumen $3.0B hoy, debajo del promedio de 20 días ($3.2B): ni la caída del 15 Oct ni el rebote trajeron volumen; el mercado está esperando. Relativo: −3.0% en siete días, y los alts de la página cayeron mucho más (JUP −14%, MET −14%, NOS −16%, PUMP −19%). Esta semana SOL fue el refugio dentro de Solana: la debilidad es de los alts, no de SOL, y por eso el sesgo bajista acá es táctico — una corrección dentro de la tendencia de junio, no un techo.',
    pattern: '<b>Tendencia alcista con mínimos crecientes, en corrección:</b> 62.2 (7 Jun) → 74.5 (17 Ago) → 96.9 (16 Sep), trendline hoy en 85.1. Techo 122.1 (26 Sep), máximo de ocho meses. La corrección devolvió el 71% del tramo 96.9 → 122.1 (104.2 el 15 Oct): pasó la mitad el 9 Oct, el 61.8% el 13 Oct y el 71% el 15 Oct. Un retroceso que devuelve más del 61.8% suele devolver el tramo entero: el objetivo natural es 96.9–97.6 (mínimo del 16 Sep + EMA200), que es también donde la tendencia de junio se defiende. Entre 104.2 y 107.2 el precio está atrapado entre el mínimo de la corrección y la EMA50; de ese rango sale el próximo movimiento.',
    watch: '<b>104.2 y 110.8.</b> Abajo: cierre bajo 104.2 (mínimo del 15 Oct) confirma la invalidación y abre 99.6 (EMA100) directo. Arriba: la EMA50 (107.2) es el primer escalón, pero el que anula el sesgo bajista es un cierre sobre la EMA20 (110.8) con volumen sobre $4B — ahí el 15 Oct fue un barrido de stops y la corrección terminó. <b>Volumen:</b> ninguno de los últimos cuatro días pasó el promedio; un rebote sin $4B+ es cobertura de cortos. <b>Relativo:</b> SOL −3% en la semana con los alts −14/−19% — si SOL/BTC aguanta en la capa de relativo mientras los alts sangran, el dinero está rotando a SOL dentro del ecosistema y el 97 no llega. <b>MACD:</b> el histograma dejó de caer; si gira positivo con el precio sobre 107.2, el sesgo vuelve a alcista antes de la EMA20.',
    decision: [
      'Con posición: <b>mantener el core; no sumar acá</b>. La invalidación se dio y el rebote no tiene volumen: la zona de sumar bajó a 97–99.6 (EMA200 + mínimo del 16 Sep + EMA100), donde la tendencia de junio se defiende. Si recupera 110.8 al cierre sin haber llegado, se suma sobre 110.8, no antes.',
      'Sin posición: <b>esperar</b>. 25% en 97–99.6 con el stop en el cierre bajo 96.9, o 25% en el cierre sobre 110.8 con volumen sobre $4B. Entre 104 y 110 es comprar en el medio de un rango que acaba de fallar.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 110.8</b> (EMA20) con volumen. Ahí el 15 Oct fue un barrido → 116.2 (cierre 8 Oct) → 122.1.',
    ],
    invalidation: { level: 110.8, text: 'Cierre diario sobre 110.8 (EMA20, con la EMA50 en 107.2 ya recuperada) anula el path bajista: el cierre de 104.2 del 15 Oct queda como un barrido de stops y la corrección terminó → 116.2 (cierre del 8 Oct) y 122.1 (máximo del 26 Sep).' },
    path: [
      { d: 30, h: '+1M', target: 99.6, how: 'Rebote a 107–108 (EMA50) que falla → cierre bajo 104.2 → EMA100 en 99.6. Si el rebote pasa la EMA50 con volumen, el +1M es lateral 104–111 hasta que la EMA20 decida.' },
      { d: 90, h: '+3M', target: 97, how: 'EMA200 (97.6) y mínimo del 16 Sep (96.9): el tramo 96.9 → 122.1 devuelto entero. Es el nivel donde core-accumulate compra; un cierre debajo con volumen abre la trendline en 85.' },
      { d: 365, h: '+1Y', target: 122, how: 'Retest del máximo del 26 Sep desde 97, con la EMA200 todavía subiendo. A un año la corrección es un pullback dentro de la tendencia de junio; para 147 (medida del tramo) hace falta BTC.D bajo 57% y la emisión recortada pesando, y eso hoy no está.' },
    ],
    levels: {
      resistance: [[106.5, '61.8% del tramo 96.9 → 122.1 · techo inmediato'], [107.2, 'EMA50 — primer escalón'], [110.8, 'INVALIDACIÓN bajista · EMA20'], [116.2, 'Cierre 8 Oct'], [118.9, 'Máximo 21 Sep · zona 118–122'], [122.1, 'Máximo 26 Sep · máximo de 8 meses'], [147, 'Medida del tramo']],
      support: [[105.3, 'Cierre 16 Oct'], [104.2, 'Cierre 15 Oct · mínimo de la corrección · la invalidación de 105 se cerró acá'], [99.6, 'EMA100 · +1M'], [97.6, 'EMA200 — subiendo'], [96.9, 'Mínimo 16 Sep · +3M'], [85.1, 'Trendline de mínimos crecientes'], [74.5, 'Mínimo 17 Ago']],
    },
  },
  sources: 'Network telemetry: DefiLlama (fees de la propia red, fees agregados de las apps del ecosistema, volumen DEX, TVL de la chain). Supply, staking e inflación: Solana RPC en vivo.',
  rule: 'fees de red y de apps cayendo mientras el precio sube = rally sin uso, reducir; SGP-2 activada + flujo ETF sostenido + SOL/BTC dejando de hacer mínimos = subir posición.',
  thesis: [
    '<b>Qué es.</b> Solana es la L1 de alta velocidad donde vive todo lo demás que cubrimos en esta página: el MEV de Jito, el volumen de Jupiter, la liquidez de Meteora, los launches de Pump.fun, la fibra de DoubleZero. Comprar SOL es comprar el índice de esa economía: cada transacción paga fees en SOL, cada validador stakea SOL, cada app lo usa como colateral.',
    '<b>La tesis.</b> SOL es la única posición del ecosistema que captura valor por tres vías a la vez: fees quemados (uso), yield de staking (seguridad) y demanda institucional vía ETFs spot (~$1.16B acumulado desde el lanzamiento). El resto de los tokens de esta página son apuestas sobre una app; SOL es la apuesta sobre que la economía entera crece. El costo: su propio grifo de emisión (~4.3% anual, cayendo) es venta estructural diaria — y eso es exactamente lo que SGP-2 acaba de votar recortar — activacion pendiente via SIMD-0550.',
    '<b>Lo que valida.</b> Fees de red y de apps recuperando contra el pico de enero 2025, volumen DEX y TVL creciendo en SOL (no solo en USD), stake estable arriba del 60% con yield cayendo, flujo ETF semanal positivo sostenido, y el burn subiendo si SGP-3 vuelve en otra forma (el 54% que saco es rechazo del diseno, no de la idea).',
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
    tw.custom('pass', '✓', 'Gobernanza SGP-1/2/3 — resultado', 'SGP-1 ✓ (86%), SGP-2 ✓ (67.0%, por 0.334 puntos, con Kraken girando 8.9M SOL en la ultima hora), SGP-3 ✗ (53.9%). La emision cae al doble de velocidad — cuando active. El dato ahora: fecha de activacion de SIMD-0550. El burn queda en ~648 SOL/dia hasta nuevo aviso.'),
    tw.custom('watch', '◦', 'Flujo ETF spot (EE.UU.)', '~$1.16B acumulado, ~$900M en activos, 7 semanas seguidas de inflows netos — pero concentrados en pocos fondos y chicos contra la emisión diaria. Pasa a ✓ con semanas sostenidas >$50M; pasa a ! con outflows netos sostenidos.'),
    tw.custom(chain?.staking?.pct >= 60 ? 'pass' : 'watch', chain?.staking?.pct >= 60 ? '✓' : '◦', 'Stake rate (en vivo)', chain?.staking?.pct ? `${chain.staking.pct}% del supply está en staking. Sobre 60% = la seguridad y el ancla de float están intactas. Si SGP-2 pasa y el yield cae, este es el número que dice si el capital se queda o se va: bajo 60% = !` : 'Sin lectura de stake.'),
    tw.custom('watch', '◦', 'Alpenglow / slot-time 200ms', 'Slot-time ya cortado a 250ms en mainnet (18 Sep); Alpenglow — el overhaul de consenso rumbo a finality de ~150ms — apuntado al 28 Sep. Ejecucion limpia = ✓; incidentes o rollback = ! (el riesgo tecnico de L1 vuelve a la mesa).'),
  ],
  decision: decisionBuilder('SOL', {
    flips: ({ net, M: Mf, U }) => {
      const f = net?.fees, a = net?.appfees;
      return [
        `<b>Activacion de SIMD-0550</b> (el mandato de SGP-2 hecho codigo) — la emision cayendo al doble de velocidad es el flip que convierte "trade de ciclo" en "core de largo plazo". Fecha de feature gate = el dato.`,
        `Fees de red ${f?.peak ? `recuperando sobre <b>${U(f.peak * 0.5)}</b> mensual (50% del pico; hoy ${U(f.latest)})` : 'recuperando contra el pico de enero 2025'} — el precio sin uso es un rally prestado.`,
        `App fees del ecosistema ${a?.latest ? `(hoy ${U(a.latest)}/mes) ` : ''}haciendo máximos: la economía de apps es lo que los ETFs le venden a las instituciones.`,
        `Flujo ETF semanal sostenido sobre $50M = demanda estructural real; outflows sostenidos = quitar el viento institucional de la tesis.`,
        `<b>SOL/BTC dejando de hacer mínimos</b> — mientras el ratio caiga, todo rally en USD es sospechoso. El ratio girando es el permiso para subir tamaño.`,
        `% staked cayendo bajo 60% tras el recorte de yield = el capital se va; reducir convicción aunque el precio aguante.`,
      ];
    },
  }),
};
