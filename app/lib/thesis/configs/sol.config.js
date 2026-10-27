import { decisionBuilder, tw, fmt } from '../framework';

// SOL is the benchmark, not an alt: no SPL mint to scan (onchain.native), the relative layer
// rotates its benchmark to ETH/BTC server-side, and "who has to sell" here means emission, not wallets.

export const TOKEN = {
  slug: 'sol', name: 'Solana', symbol: 'SOL', cgId: 'solana', host: 'mercados.10am.pro/sol',
  sector: 'Layer 1 · el benchmark del ecosistema',
  tagline: 'Fees de red, economía de apps, inflación vs burn, SOL/BTC y flujo ETF — el activo contra el que se mide todo lo demás en esta página.',
  description: 'Solana ($SOL) en vivo: fees de la red y de las apps, volumen DEX, TVL, inflación y staking on-chain, ratios SOL/BTC y SOL/ETH, posicionamiento en futuros, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'core-accumulate', reviewed: '26 Oct 2026',
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
    updated: '26 Oct 2026', bias: 'BEAR',
    read: 'La EMA100 aguantó dos cierres sin la vela, y el 78.6% se perdió en el camino. El 25 Oct cerró 102.3 — −0.4%, exactamente el 78.6% del tramo 96.9 → 122.1 (102.3): un empate — y el 26 Oct cerró 101.2, −1.1%: debajo del 78.6%, el cuarto cierre rojo seguido desde el techo del rebote (106.9, 22 Oct), mínimo de 30 días al cierre y el cierre más bajo desde el 16 Sep. Hoy 100.8, −0.4%: 0.5 sobre la EMA100 (100.3), el nivel que la lectura anterior ponía a decidirse. Se decidió a medias: dos cierres la aguantaron (102.3 y 101.2, a 2% y a 1% de la media) y ninguno fue la vela — ni rechazo abajo, ni volumen. Siete sesiones desde 106.9 para devolver 6% sin una vela verde y sin una vela de pánico: una corrección que baja medio punto por día sobre una media no está capitulando, está goteando. Volumen $2.48B, 91% del promedio de 20 días ($2.72B): nueve sesiones sin una barra sobre el promedio, y el promedio de 20 días en el 89% del de 90 — los $4B que marcan piso siguen sin aparecer. Tres de siete, sin cambio: el precio sobre la EMA200 (98.6, +1.6% en 20 días, hoy a 2.2%), la 50 sobre la 200 y la 200 subiendo; debajo de la EMA20 (106.0) y de la 50 (105.9), que ya están pegadas una a la otra — cuando la 20 cruce bajo la 50, el rebote del 22 Oct queda certificado como el techo. RSI 35.3, desde 29.9 — volvió sobre 30 con el precio 2% más abajo: la segunda sobreventa de la corrección duró una sesión, y el indicador hizo un mínimo más alto (29.9 en 102.7, 35 en 100.8) mientras el precio hacía uno más bajo — divergencia (el precio baja y el oscilador no lo acompaña: la caída pierde velocidad). El histograma del MACD volvió a subir después de girar el 24 Oct: la misma señal por el otro lado. Las dos valen lo que vale el volumen, y el volumen no está. Relativo: −4.0% en siete días; JTO (−2.8%), PUMP (−4.5%), 2Z (−4.4%), MET (−5.1%) y JUP (−5.6%) cayeron lo mismo o apenas más — la primera semana de octubre en que las alts no caen el doble que SOL — y NOS (−19.7%) cinco veces. No es que las alts suban: es que SOL cae a su ritmo y la rotación hacia SOL dentro del ecosistema se frenó. Lo que cambió: 102.3 se cerró, 101.2 es el mínimo nuevo de la corrección, la EMA100 aguantó dos cierres y el RSI divergió. Lo que no cambió: nada tuvo volumen, la EMA20 sigue a 5% y la tendencia de junio sigue en pie mientras 96.9 y la EMA200 aguanten. Core-accumulate sigue comprando con la vela, no con el número: dos cierres sobre la EMA100 con el 91% del volumen son un nivel que aguanta, no un piso comprado — el primer 25% espera el cierre con rechazo abajo y $4B+, o el retest de 96.9–98.6.',
    pattern: '<b>Tendencia alcista con mínimos crecientes, en corrección; rebote a la EMA50 fallido, 78.6% perdido, el precio goteando sobre la EMA100:</b> 62.2 (7 Jun) → 74.5 (17 Ago) → 96.9 (16 Sep), trendline hoy en 86.5. Techo 122.1 (26 Sep), máximo de ocho meses. La corrección devolvió el 78.6% del tramo 96.9 → 122.1 (102.3) al cierre del 18 Oct (103.4), rebotó cuatro cierres hasta 106.9 (22 Oct) — la EMA50 y el 61.8% (106.5) tocados por 0.2, la EMA20 nunca — y devolvió todo en cuatro velas rojas: 103.5 / 102.7 / 102.3 (empate con el 78.6%) / 101.2 (26 Oct), el mínimo nuevo de la corrección, a 1% de la EMA100 (100.3). Hoy 100.8. Un rebote que se frena en la primera media y una devolución que baja medio punto por día sin volumen es la segunda pierna de la corrección llegando al piso de la tendencia a cuentagotas: entre 100.3 (EMA100) y 96.9 (EMA200 98.6 + mínimo del 16 Sep) no hay nada en el medio, y ahí es donde core-accumulate compra — con la vela. Arriba, 102.3–103.4 (78.6% + mínimo viejo) es el primer techo, 105.9–106.9 (EMA50 + EMA20 + techo del rebote, ya un racimo) el segundo; el cierre sobre 106.9 es el que anula el sesgo.',
    watch: '<b>100.3 y 96.9.</b> Abajo: la EMA100 (100.3) aguantó dos cierres a 1–2% — la vela que importa sigue siendo la que la aguante con rechazo abajo y $4B+, y todavía no llegó; el cierre debajo abre 98.6 (EMA200) y 96.9 (mínimo del 16 Sep), el piso de la tendencia, y el cierre bajo 96.9 con volumen abre la trendline en 86.5. Arriba: 102.3–103.4 (78.6% + mínimo del 18 Oct) es el primer techo del rebote; el que anula el sesgo bajista es el cierre sobre 106.9 (techo del rebote del 22 Oct, con la EMA20 en 106.0 y la EMA50 en 105.9 pegadas debajo) con volumen sobre $4B. <b>RSI:</b> 35.3 — salió de la sobreventa con el precio bajando: mínimo más alto del oscilador contra mínimo más bajo del precio, divergencia; vale con una vela verde con volumen desde la EMA100, y se cancela con un cierre bajo 98.6. <b>Volumen:</b> $2.48B, 91% del promedio; nueve sesiones sin una barra sobre el promedio y el promedio de 20 días en el 89% del de 90 — el mercado se vacía, no capitula; el piso se compra el día que aparezcan $4B con rechazo, no antes. <b>Relativo:</b> SOL −4.0% en la semana con las alts entre 0.7× y 1.4× por primera vez en octubre (NOS 5× es la excepción): la rotación a SOL se frenó; 96.9–100.3 sigue siendo zona de comprar SOL, no alts. <b>Medias:</b> la EMA20 (106.0) y la EMA50 (105.9) están pegadas — el cruce de la 20 bajo la 50 certifica el techo del 22 Oct; mientras no cruce, el rebote sigue teniendo un racimo en 106 para ir a buscar.',
    decision: [
      'Con posición: <b>mantener el core; el primer 25% del añadido sigue esperando la vela</b>. La zona de sumar (96.9–100.3: EMA100 + EMA200 + mínimo del 16 Sep) está acá — 100.8 hoy, 0.5 sobre la EMA100 — y dos cierres la aguantaron sin rechazo y con el 91% del volumen: eso es un nivel que aguanta, no un piso comprado. Se compra como decía la lectura: en el cierre que aguante 100.3 con vela de rechazo y $4B+, el stop del tramo nuevo en el cierre bajo 96.9; o en el retest de 96.9–98.6 que aguante. El segundo 25%, con el cierre de vuelta sobre 103.4 con volumen.',
      'Sin posición: <b>esperar la vela, no el número</b>. 25% en 96.9–100.3 con el stop en el cierre bajo 96.9, solo con vela de rechazo y $4B+ — el cierre que aguante la EMA100 o el retest de la EMA200; o 25% en el cierre sobre 106.9 con volumen sobre $4B. Comprar 100.8 porque la EMA100 aguantó dos días es comprar un goteo a mitad de camino: la divergencia del RSI dice que la caída pierde velocidad, y el volumen dice que nadie la está comprando todavía.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 106.9</b> (techo del rebote del 22 Oct, con la EMA20 en 106.0 y la EMA50 en 105.9 pegadas debajo — se recuperan en el camino) con volumen. Ahí el 26 Oct fue el mínimo de la corrección → 111.3 (cierre 12 Oct) → 116.2 (cierre 8 Oct) → 122.1.',
    ],
    invalidation: { level: 106.9, text: 'Cierre diario sobre 106.9 (cierre del 22 Oct, el techo del rebote; la EMA20 en 106.0, la EMA50 en 105.9 y el 61.8% en 106.5 se recuperan en el camino) anula el path bajista: la corrección terminó en 101.2 con la EMA100 (100.3) como piso → 111.3 (cierre del 12 Oct), 116.2 (cierre del 8 Oct) y 122.1 (máximo del 26 Sep).' },
    path: [
      { d: 30, h: '+1M', target: 97, how: '78.6% perdido (101.2 el 26 Oct) y la EMA100 (100.3) aguantando dos cierres sin volumen → cierre bajo 100.3 → EMA200 (98.6) y mínimo del 16 Sep (96.9): el tramo 96.9 → 122.1 devuelto entero. Es el nivel donde core-accumulate compra; si 100.3 aguanta al cierre con rechazo y $4B+, el +1M es el rebote a 102.3–103.4.' },
      { d: 90, h: '+3M', target: 106.5, how: 'EMA50 y 61.8% del tramo (106.5): el rebote desde el piso de la tendencia (96.9–100.3) hasta el racimo de medias que frenó el del 22 Oct. Con 96.9 perdido al cierre con volumen, el +3M es la trendline en 86.5 y la tendencia de junio queda en duda.' },
      { d: 365, h: '+1Y', target: 122, how: 'Retest del máximo del 26 Sep desde 97, con la EMA200 todavía subiendo. A un año la corrección es un pullback dentro de la tendencia de junio; para 147 (medida del tramo) hace falta BTC.D bajo 57% y la emisión recortada pesando, y eso hoy no está.' },
    ],
    levels: {
      resistance: [[101.2, 'Cierre 26 Oct · mínimo de la corrección · mínimo de 30 días'], [102.3, '78.6% del tramo 96.9 → 122.1 · empatado el 25 Oct, perdido el 26 Oct'], [102.7, 'Cierre 24 Oct'], [103.4, 'Cierre 18 Oct · mínimo viejo · perdido el 24 Oct — ahora techo'], [104.2, 'Mínimo 15 Oct · perdido el 23 Oct'], [105.9, 'EMA50'], [106.0, 'EMA20 — pegada a la 50'], [106.5, '61.8% del tramo · techo del rebote, probado 21–22 Oct · +3M'], [106.9, 'INVALIDACIÓN bajista · cierre 22 Oct · máximo del rebote'], [111.3, 'Cierre 12 Oct'], [116.2, 'Cierre 8 Oct'], [118.9, 'Máximo 21 Sep · zona 118–122'], [122.1, 'Máximo 26 Sep · máximo de 8 meses · +1Y'], [147, 'Medida del tramo']],
      support: [[100.8, 'Hoy · el precio está acá'], [100.3, 'EMA100 · aguantó dos cierres (25–26 Oct) sin la vela · primer nivel para sumar — con vela'], [98.6, 'EMA200 — subiendo 1.6%/20d'], [96.9, 'Mínimo 16 Sep · +1M · stop del tramo nuevo'], [86.5, 'Trendline de mínimos crecientes'], [74.5, 'Mínimo 17 Ago']],
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
