import { decisionBuilder, tw, fmt } from '../framework';

// SOL is the benchmark, not an alt: no SPL mint to scan (onchain.native), the relative layer
// rotates its benchmark to ETH/BTC server-side, and "who has to sell" here means emission, not wallets.

export const TOKEN = {
  slug: 'sol', name: 'Solana', symbol: 'SOL', cgId: 'solana', host: 'mercados.10am.pro/sol',
  sector: 'Layer 1 · el benchmark del ecosistema',
  tagline: 'Fees de red, economía de apps, inflación vs burn, SOL/BTC y flujo ETF — el activo contra el que se mide todo lo demás en esta página.',
  description: 'Solana ($SOL) en vivo: fees de la red y de las apps, volumen DEX, TVL, inflación y staking on-chain, ratios SOL/BTC y SOL/ETH, posicionamiento en futuros, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'core-accumulate', reviewed: '24 Oct 2026',
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
    updated: '24 Oct 2026', bias: 'BEAR',
    read: 'El mínimo de la corrección se perdió y el RSI volvió a sobreventa con el precio en la EMA100. El 24 Oct cerró 102.7 — −0.8%, el segundo cierre rojo seguido desde el techo del rebote (106.9, 22 Oct) — debajo de 103.4 (cierre del 18 Oct), el mínimo de la corrección que la lectura anterior ya daba por perdido: el cierre más bajo desde el 15 Sep y mínimo de 30 días. Hoy 100.5, −2.1%: debajo de 102.3 (78.6% del tramo 96.9 → 122.1) y a 0.2 de la EMA100 (100.2), el +1M de la lectura — a esa distancia en esta página se escribe como alcanzado. Cinco sesiones desde 106.9 para devolver 6%, sin una vela verde. Volumen $2.24B, 81% del promedio de 20 días ($2.77B): la ruptura del mínimo tampoco trajo volumen — ni el rebote, ni la devolución, ni la ruptura pasaron el promedio; los $4B que marcan piso siguen sin aparecer, y el promedio de 20 días ya es el 91% del de 90. Tres de siete, sin cambio: el precio sobre la EMA200 (98.3, +2.1% en 20 días, hoy a 2%), la 50 sobre la 200 y la 200 subiendo; debajo de la EMA20 (106.9) y de la 50 (106.2), y la EMA100 (100.2) se decide hoy. RSI 29.9, desde 38.7 — cruzó bajo 30 por segunda vez en la corrección: la primera (15.6 el 18 Oct) dio un rebote de cuatro días que murió en la EMA50; la segunda llega con el precio 2% más abajo y en la media de 100 días, que es donde la lectura anterior decía que suele estar el piso de verdad. El histograma del MACD giró: después de seis sesiones subiendo volvió a bajar — la divergencia que se insinuaba se canceló con la ruptura de 103.4. Relativo: −3.4% en siete días; JUP (−4.3%) cayó parecido, JTO, PUMP y 2Z (−7% a −8%) el doble, MET y NOS (−13.5%) cuatro veces: la rotación a SOL dentro del ecosistema sigue — SOL cae la mitad que la página — y en el día (−4.0%) fue la caída más grande desde el 15 Oct, con todas las alts entre 1.6× y 2.6× salvo 2Z. Lo que cambió: 103.4 se cerró, 102.3 se pasó en vivo y el +1M (100.3) llegó; la zona de sumar (97–100.2) ya no está a 3–6%, está acá. Lo que no cambió: la tendencia de junio sigue en pie mientras 96.9 y la EMA200 aguanten, y nada de lo que pasó esta semana tuvo volumen — ni para marcar piso ni para romperlo. Core-accumulate compra acá, pero compra con la vela: el primer 25% en el cierre que aguante 100.2 con rechazo abajo y $4B+, no porque el precio tocó el número.',
    pattern: '<b>Tendencia alcista con mínimos crecientes, en corrección; rebote a la EMA50 fallido, mínimo de la corrección perdido, el precio en la EMA100:</b> 62.2 (7 Jun) → 74.5 (17 Ago) → 96.9 (16 Sep), trendline hoy en 86.5. Techo 122.1 (26 Sep), máximo de ocho meses. La corrección devolvió el 78.6% del tramo 96.9 → 122.1 (102.3) al cierre del 18 Oct (103.4, con 102 intradía), rebotó cuatro cierres hasta 106.9 (22 Oct) — la EMA50 y el 61.8% (106.5) tocados por 0.2, la EMA20 nunca — y devolvió todo en dos velas: 103.5 (23 Oct) y 102.7 (24 Oct), el cierre bajo 103.4. Hoy 100.5: 102.3 pasado, la EMA100 (100.2) a 0.2. Un rebote que se frena en la primera media y rompe el mínimo en la quinta sesión es la segunda pierna de la corrección, y la segunda pierna llega al piso de la tendencia: entre 100.2 (EMA100) y 96.9 (EMA200 98.3 + mínimo del 16 Sep) no hay nada en el medio, y ahí es donde core-accumulate compra. Arriba, 102.3–103.4 es ahora el primer techo, 106.2–106.9 (EMA50 + techo del rebote) el segundo; la EMA20 (106.9, hoy pegada al cierre del 22 Oct) es la que anula el sesgo.',
    watch: '<b>100.2 y 96.9.</b> Abajo: la EMA100 (100.2) está a 0.2 — la vela que importa es la que la aguante al cierre con rechazo abajo y $4B+; si cierra debajo, 98.3 (EMA200) y 96.9 (mínimo del 16 Sep) son el piso de la tendencia, y el cierre bajo 96.9 con volumen abre la trendline en 86.5. Arriba: 102.3–103.4 (78.6% + mínimo perdido) es el primer techo del rebote; el que anula el sesgo bajista es el cierre sobre 106.9 (EMA20 = cierre del 22 Oct) con volumen sobre $4B. <b>RSI:</b> 29.9 — segunda sobreventa de la corrección, con el precio en la EMA100: es la que suele marcar el piso, pero una vela verde con volumen desde acá la confirma y dos rojas más la convierten en 97. <b>Volumen:</b> $2.24B, 81% del promedio; siete sesiones de rebote, devolución y ruptura sin una sobre el promedio, y el promedio de 20 días en el 91% del de 90 — el mercado se vacía, no capitula. <b>Relativo:</b> SOL −3.4% en la semana con las alts entre 1.3× y 4×: la rotación a SOL dentro del ecosistema sigue, y 97–100 sigue siendo zona de comprar SOL, no alts. <b>MACD:</b> el histograma volvió a bajar después de seis sesiones subiendo — la divergencia se canceló; vale de vuelta solo si 100.2 aguanta y el histograma gira con volumen.',
    decision: [
      'Con posición: <b>mantener el core; el primer 25% del añadido solo con la vela</b>. La zona de sumar (97–100.2: EMA100 + EMA200 + mínimo del 16 Sep) llegó — 100.5 hoy, a 0.2 de la EMA100 — y se compra como decía la lectura: en el cierre que aguante 100.2 con vela de rechazo y $4B+, el stop del tramo nuevo en el cierre bajo 96.9. Sin la vela, no: el precio tocó el número con el 81% del volumen y el RSI recién cruzó 30; el segundo 25% es el retest de 96.9–98.3 que aguante, o el cierre de vuelta sobre 103.4 con volumen.',
      'Sin posición: <b>esperar la vela, no el número</b>. 25% en 97–100.2 con el stop en el cierre bajo 96.9, solo con vela de rechazo y $4B+ — el cierre que aguante la EMA100 o el retest de la EMA200; o 25% en el cierre sobre 106.9 con volumen sobre $4B. Comprar 100.5 porque el +1M llegó es comprar la segunda pierna a mitad de camino: sin volumen, 100.2 no es un piso, es el siguiente nivel.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 106.9</b> (EMA20, pegada al cierre del 22 Oct que fue el techo del rebote; la EMA50 en 106.2 se recupera en el camino) con volumen. Ahí el 24 Oct fue el barrido del mínimo de la corrección → 111.3 (cierre 12 Oct) → 116.2 (cierre 8 Oct) → 122.1.',
    ],
    invalidation: { level: 106.9, text: 'Cierre diario sobre 106.9 (EMA20, hoy pegada al cierre del 22 Oct que fue el techo del rebote; la EMA50 en 106.2 y el 61.8% en 106.5 se recuperan en el camino) anula el path bajista: la corrección terminó con el barrido de 103.4 y la EMA100 (100.2) fue el piso → 111.3 (cierre del 12 Oct), 116.2 (cierre del 8 Oct) y 122.1 (máximo del 26 Sep).' },
    path: [
      { d: 30, h: '+1M', target: 97, how: 'Mínimo de la corrección perdido (102.7 el 24 Oct) y la EMA100 (100.2) alcanzada en vivo con el 81% del volumen → cierre bajo 100.2 → EMA200 (98.3) y mínimo del 16 Sep (96.9): el tramo 96.9 → 122.1 devuelto entero. Es el nivel donde core-accumulate compra; si 100.2 aguanta al cierre con rechazo y $4B+, el +1M es el rebote a 102.3–103.4.' },
      { d: 90, h: '+3M', target: 106.5, how: 'EMA50 y 61.8% del tramo (106.5): el rebote desde el piso de la tendencia (97–100.2) hasta la media que frenó el del 22 Oct. Con 96.9 perdido al cierre con volumen, el +3M es la trendline en 86.5 y la tendencia de junio queda en duda.' },
      { d: 365, h: '+1Y', target: 122, how: 'Retest del máximo del 26 Sep desde 97, con la EMA200 todavía subiendo. A un año la corrección es un pullback dentro de la tendencia de junio; para 147 (medida del tramo) hace falta BTC.D bajo 57% y la emisión recortada pesando, y eso hoy no está.' },
    ],
    levels: {
      resistance: [[102.3, '78.6% del tramo 96.9 → 122.1 · pasado en vivo el 24 Oct'], [102.7, 'Cierre 24 Oct · mínimo de la corrección'], [103.4, 'Cierre 18 Oct · mínimo viejo · perdido el 24 Oct — ahora techo'], [104.2, 'Mínimo 15 Oct · perdido el 23 Oct'], [106.2, 'EMA50'], [106.5, '61.8% del tramo · techo del rebote, probado 21–22 Oct · +3M'], [106.9, 'INVALIDACIÓN bajista · EMA20 = cierre 22 Oct · máximo del rebote'], [111.3, 'Cierre 12 Oct'], [116.2, 'Cierre 8 Oct'], [118.9, 'Máximo 21 Sep · zona 118–122'], [122.1, 'Máximo 26 Sep · máximo de 8 meses · +1Y'], [147, 'Medida del tramo']],
      support: [[100.5, 'Hoy · el precio está acá'], [100.2, 'EMA100 · el +1M viejo, alcanzado · primer nivel para sumar — con vela'], [98.3, 'EMA200 — subiendo 2%/20d'], [96.9, 'Mínimo 16 Sep · +1M · stop del tramo nuevo'], [86.5, 'Trendline de mínimos crecientes'], [74.5, 'Mínimo 17 Ago']],
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
