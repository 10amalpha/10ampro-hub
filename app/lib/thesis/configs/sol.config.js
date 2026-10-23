import { decisionBuilder, tw, fmt } from '../framework';

// SOL is the benchmark, not an alt: no SPL mint to scan (onchain.native), the relative layer
// rotates its benchmark to ETH/BTC server-side, and "who has to sell" here means emission, not wallets.

export const TOKEN = {
  slug: 'sol', name: 'Solana', symbol: 'SOL', cgId: 'solana', host: 'mercados.10am.pro/sol',
  sector: 'Layer 1 · el benchmark del ecosistema',
  tagline: 'Fees de red, economía de apps, inflación vs burn, SOL/BTC y flujo ETF — el activo contra el que se mide todo lo demás en esta página.',
  description: 'Solana ($SOL) en vivo: fees de la red y de las apps, volumen DEX, TVL, inflación y staking on-chain, ratios SOL/BTC y SOL/ETH, posicionamiento en futuros, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'core-accumulate', reviewed: '23 Oct 2026',
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
    updated: '23 Oct 2026', bias: 'BEAR',
    read: 'El rebote murió en la EMA50 y devolvió todo en una vela. El 22 Oct cerró 106.9 — +0.5%, el cuarto cierre verde seguido desde 103.4 — 0.2 arriba de la EMA50 y del 61.8% (106.5), los dos techos que la lectura anterior le ponía al rebote, y 1.5% debajo de la EMA20 (108.5 entonces), la que anulaba el sesgo: tocó el primer techo y no llegó al segundo. El 23 Oct cerró 103.5, −3.2%: debajo de 104.2 (mínimo del 15 Oct), que era el nivel de abajo de la lectura — un cierre de vuelta bajo 104.2 deja el rebote como cuatro días — y a 0.1 del cierre más bajo de la corrección (103.4, 18 Oct). Hoy 104.1, +0.6%. Cuatro días para subir 3.4% y uno para devolverlos: es la forma de un rebote de sobreventa que se frena en la media, no la de un piso. Volumen $2.05B, 74% del promedio de 20 días ($2.76B) — la devolución tampoco trajo volumen, y ninguna de las cinco sesiones del rebote y la caída pasó el promedio; los $4B que la lectura pedía para marcar piso siguen sin aparecer. Tres de siete, desde cuatro: el precio perdió la EMA50 (106.5) de vuelta y sigue debajo de la EMA20 (107.7); quedan el precio sobre la EMA200 (98.3, +2.4% en 20 días), la 50 sobre la 200 y la 200 subiendo. RSI 38.7, desde 31 — subió con el rebote y casi no bajó con la caída, que es lo que hace el oscilador después de una sobreventa extrema (15.6 el 18 Oct): el rebote técnico se dio y se gastó. El histograma del MACD sigue negativo y sigue subiendo — la caída pierde velocidad, pero lleva seis sesiones diciendo lo mismo mientras el precio vuelve al mínimo. Relativo: −2.5% en siete días; JUP (−0.4%) y PUMP (+2.8%) le ganaron en la semana, JTO (−5.6%) y NOS (−6.5%) cayeron el doble, MET y 2Z (−10%) cuatro veces — la rotación a SOL dentro del ecosistema dejó de ser pareja: dos alts aguantan, cuatro no. Lo que cambió: el rebote llegó al techo (EMA50) y falló, 104.2 se perdió y el mínimo de la corrección está a 0.1 — en esta página un nivel a esa distancia se cierra en la sesión siguiente siete veces de ocho, así que la lectura se escribe con 103.4 perdido: 102.3 (78.6% del tramo 96.9 → 122.1) y 100.3 (EMA100) quedan abiertos. Lo que no cambió: la tendencia de junio sigue en pie mientras 96.9 y la EMA200 aguanten, y la zona de sumar sigue siendo 97–100.3 — ahora a 3–6%, no a 6–8%. No se suma en 103.5 por haber esperado 100: el nivel está más cerca, no cambió.',
    pattern: '<b>Tendencia alcista con mínimos crecientes, en corrección; rebote a la EMA50 fallido, de vuelta al mínimo de la corrección:</b> 62.2 (7 Jun) → 74.5 (17 Ago) → 96.9 (16 Sep), trendline hoy en 86.3. Techo 122.1 (26 Sep), máximo de ocho meses. La corrección devolvió el 78.6% del tramo 96.9 → 122.1 (102.3) con el cierre más bajo en 103.4 (18 Oct) y el mínimo intradía en 102. Rebote de cuatro cierres hasta 106.9 (22 Oct): tocó la EMA50 y el 61.8% (106.5) por 0.2 y no llegó a la EMA20; el 23 Oct (103.5, −3.2%) lo devolvió entero y cerró bajo 104.2. Un rebote que se frena en la primera media y vuelve al mínimo en una vela es el retest clásico antes de la segunda pierna: 103.4 a 0.1 y, debajo, 102.3 y 100.3 (EMA100) sin nada en el medio. Entre 100.3 y 96.9 (EMA200 98.3 + mínimo del 16 Sep) está el piso de la tendencia larga, y ahí es donde core-accumulate compra. Arriba, 106.5–106.9 es ahora el techo probado dos veces (21–22 Oct); la EMA20 (107.7) sigue siendo la que anula el sesgo.',
    watch: '<b>103.4 y 107.7.</b> Abajo: el cierre bajo 103.4 (mínimo de la corrección) abre 102.3 (78.6%) y 100.3 (EMA100) directo — está a 0.1, se escribe como hecho; la vela que importa es la que aguante 100.3 con rechazo abajo y $4B+. Arriba: 106.5–106.9 (EMA50 + 61.8% + cierre del 22 Oct) es el techo probado; el que anula el sesgo bajista es el cierre sobre la EMA20 (107.7) con volumen sobre $4B. <b>RSI:</b> 38.7 — ni sobreventa ni fuerza; el rebote desde 15.6 ya se gastó; bajo 30 de vuelta con el precio en 100–102 es la segunda sobreventa, la que suele marcar el piso de verdad. <b>Volumen:</b> $2.05B, 74% del promedio; cinco sesiones de rebote y caída sin una sobre el promedio — ni piso ni techo tienen volumen todavía. <b>Relativo:</b> SOL −2.5% en la semana con JUP y PUMP arriba y MET/2Z −10%: la rotación a SOL ya no es pareja; 97–100 sigue siendo zona de comprar SOL, no alts. <b>MACD:</b> histograma negativo subiendo seis sesiones con el precio de vuelta al mínimo — divergencia incipiente; vale algo si 103.4 aguanta con volumen, no antes.',
    decision: [
      'Con posición: <b>mantener el core; no sumar en 103.5</b>. El rebote hizo lo que la lectura anterior decía — llegó a la EMA50 y falló — y 104.2 se perdió: la zona de sumar (97–100.3: EMA200 + mínimo del 16 Sep + EMA100) está ahora a 3–6%, no cambió. El primer 25% en el cierre que aguante 100.3 con vela de rechazo, el stop del tramo nuevo en el cierre bajo 96.9. Si en cambio cierra sobre 107.7 con $4B, el 23 Oct fue el retest del mínimo y el añadido se hace en el retest de 106.5 desde arriba.',
      'Sin posición: <b>esperar</b>. 25% en 97–100.3 con el stop en el cierre bajo 96.9, o 25% en el cierre sobre 107.7 con volumen sobre $4B. Comprar 103–104 porque el mínimo aguantó es comprar a 0.1 de un nivel que en esta página se cierra en la sesión siguiente.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 107.7</b> (EMA20, con la EMA50 en 106.5 y el cierre del 22 Oct en 106.9 recuperados en el camino) con volumen. Ahí el 23 Oct fue el retest del piso de la corrección → 111.3 (cierre 12 Oct) → 116.2 (cierre 8 Oct) → 122.1.',
    ],
    invalidation: { level: 107.7, text: 'Cierre diario sobre 107.7 (EMA20, con la EMA50 en 106.5 y el techo del rebote del 22 Oct en 106.9 recuperados en el camino) anula el path bajista: la corrección terminó en el 78.6% del tramo y el 23 Oct (103.5) fue el retest del piso → 111.3 (cierre del 12 Oct), 116.2 (cierre del 8 Oct) y 122.1 (máximo del 26 Sep).' },
    path: [
      { d: 30, h: '+1M', target: 100.3, how: 'Rebote a la EMA50 fallido (106.9 el 22 Oct) y 104.2 perdido (103.5 el 23 Oct) → cierre bajo 103.4 → 102.3 (78.6%) → EMA100 en 100.3. Si cierra sobre 107.7 con $4B+, el +1M es el rango 106.5–116.2 y el sesgo vuelve a alcista.' },
      { d: 90, h: '+3M', target: 97, how: 'EMA200 (98.3) y mínimo del 16 Sep (96.9): el tramo 96.9 → 122.1 devuelto entero. Es el nivel donde core-accumulate compra; un cierre debajo con volumen abre la trendline en 86.3.' },
      { d: 365, h: '+1Y', target: 122, how: 'Retest del máximo del 26 Sep desde 97, con la EMA200 todavía subiendo. A un año la corrección es un pullback dentro de la tendencia de junio; para 147 (medida del tramo) hace falta BTC.D bajo 57% y la emisión recortada pesando, y eso hoy no está.' },
    ],
    levels: {
      resistance: [[104.2, 'Mínimo 15 Oct · perdido el 23 Oct — ahora techo'], [106.5, 'EMA50 + 61.8% del tramo 96.9 → 122.1 · techo del rebote, probado 21–22 Oct'], [106.9, 'Cierre 22 Oct · máximo del rebote'], [107.7, 'INVALIDACIÓN bajista · EMA20'], [111.3, 'Cierre 12 Oct'], [116.2, 'Cierre 8 Oct'], [118.9, 'Máximo 21 Sep · zona 118–122'], [122.1, 'Máximo 26 Sep · máximo de 8 meses · +1Y'], [147, 'Medida del tramo']],
      support: [[103.5, 'Cierre 23 Oct · el precio está acá'], [103.4, 'Cierre 18 Oct · mínimo de la corrección · a 0.1'], [102.3, '78.6% del tramo 96.9 → 122.1 · aguantó el 18 Oct (102 intradía)'], [100.3, 'EMA100 · +1M · primer nivel para sumar'], [98.3, 'EMA200 — subiendo'], [96.9, 'Mínimo 16 Sep · +3M'], [86.3, 'Trendline de mínimos crecientes'], [74.5, 'Mínimo 17 Ago']],
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
