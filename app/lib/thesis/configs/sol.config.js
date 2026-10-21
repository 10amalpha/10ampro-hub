import { decisionBuilder, tw, fmt } from '../framework';

// SOL is the benchmark, not an alt: no SPL mint to scan (onchain.native), the relative layer
// rotates its benchmark to ETH/BTC server-side, and "who has to sell" here means emission, not wallets.

export const TOKEN = {
  slug: 'sol', name: 'Solana', symbol: 'SOL', cgId: 'solana', host: 'mercados.10am.pro/sol',
  sector: 'Layer 1 · el benchmark del ecosistema',
  tagline: 'Fees de red, economía de apps, inflación vs burn, SOL/BTC y flujo ETF — el activo contra el que se mide todo lo demás en esta página.',
  description: 'Solana ($SOL) en vivo: fees de la red y de las apps, volumen DEX, TVL, inflación y staking on-chain, ratios SOL/BTC y SOL/ETH, posicionamiento en futuros, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'core-accumulate', reviewed: '21 Oct 2026',
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
    updated: '21 Oct 2026', bias: 'BEAR',
    read: 'El rebote llegó a la EMA50 y se frenó un paso debajo. El 18 Oct (103.4) fue el cierre más bajo de la corrección; desde ahí tres cierres verdes seguidos — 104.0, 105.0 y el 21 Oct 106.4 (+1.3%) — y hoy 106.8. El cierre quedó 0.1 debajo del 61.8% del tramo 96.9 → 122.1 (106.5) y 0.3 debajo de la EMA50 (106.7): los dos niveles que la lectura del 18 Oct ponía como techo del rebote, tocados en la misma vela y no recuperados al cierre — hoy el precio los pasa por 0.1, que es un empate. La EMA20 (108.5) sigue 1.6% arriba y es la que decide: hasta ahí el sesgo es bajista por regla. Cuatro de siete, desde tres: el precio sobre la 50 y la 200 (en vivo), la 50 sobre la 200 y la 200 subiendo (98.0, +2.8% en 20 días); faltan la EMA20, el RSI sobre 50 y el MACD, negativo pero con el histograma subiendo por quinta sesión — la caída perdió velocidad y ahora rebota. RSI 31.4, de vuelta sobre 30 desde 15.6 el 18 Oct y 21 ayer: la sobreventa más profunda de la tendencia de junio se gastó en 3% de rebote, que es poco para lo extremo que era. Volumen $2.7B, 95% del promedio de 20 días ($2.85B): el primer día del rebote con volumen casi normal, pero ninguno de los tres días verdes pasó el promedio ni se acercó a los $4B que la lectura pedía para marcar piso. Relativo: −0.2% en siete días con los alts de la página entre −1% (JUP) y −10% (2Z) — SOL dejó de caer una semana antes que todo lo demás, y hoy sube 2.8% en el día mientras NOS queda plano: la rotación a SOL dentro del ecosistema sigue, en las dos direcciones. Lo que cambió es que el 78.6% (102.3) aguantó sin un cierre debajo y el rebote llegó al primer techo; lo que no cambió es que llegó con volumen promedio, sin vela de rechazo abajo ni de ruptura arriba. Un rebote de sobreventa que se frena en el 61.8% y la EMA50 es el rebote típico de una corrección que no terminó; se vuelve otra cosa con el cierre sobre 108.5. La zona de sumar (97–100.1) no llegó — mínimo 103.4 al cierre, 102 intradía — y no se suma a 106 por haber esperado 100.',
    pattern: '<b>Tendencia alcista con mínimos crecientes, en corrección; rebote frenado en el 61.8% y la EMA50:</b> 62.2 (7 Jun) → 74.5 (17 Ago) → 96.9 (16 Sep), trendline hoy en 85.9. Techo 122.1 (26 Sep), máximo de ocho meses. La corrección devolvió el 78.6% del tramo 96.9 → 122.1 (102.3) con el cierre más bajo en 103.4 (18 Oct) y el mínimo intradía en 102 — sin cerrar debajo. Desde ahí tres cierres verdes hasta 106.4 (21 Oct): el 61.8% (106.5) y la EMA50 (106.7) tocados en una vela y no recuperados al cierre; hoy el precio los pasa por 0.1. Entre 106.7 y 108.5 (EMA20) está la decisión: un cierre sobre la EMA20 convierte el 18 Oct en el piso de la corrección y reabre 116.2 → 122.1; un rechazo acá con el volumen que hubo es el rebote clásico al 61.8% antes de la segunda pierna a 100.1–97. La trendline de junio (85.9) y el mínimo del 16 Sep (96.9) siguen siendo donde la tendencia larga se defiende.',
    watch: '<b>108.5 y 106.7.</b> Arriba: la EMA50 (106.7) y el 61.8% (106.5) ya se tocaron — el cierre de hoy sobre ellos los convierte en soporte; el que anula el sesgo bajista es el cierre sobre la EMA20 (108.5) con volumen sobre $4B — con $2.7B es un rebote que llegó a su techo. Abajo: un cierre de vuelta bajo 104.2 (mínimo del 15 Oct) deja el rebote como tres días y abre 102.3 (78.6%) y 100.1 (EMA100) directo. <b>RSI:</b> 31.4, de vuelta sobre 30 — el rebote técnico desde 15.6 ya se dio; para que sea otra cosa necesita cerrar sobre 50 con el precio sobre 108.5. <b>Volumen:</b> $2.7B, 95% del promedio; tres días verdes sin uno sobre el promedio no marcan piso — una vela de $4B+ sobre 108.5 sí. <b>Relativo:</b> SOL −0.2% en la semana con los alts −1/−10% y hoy +2.8% con NOS plano: la rotación a SOL sigue; 97–100 sigue siendo zona de comprar SOL, no alts. <b>MACD:</b> el histograma subió cinco sesiones; si gira positivo con el precio sobre 108.5, el sesgo vuelve a alcista.',
    decision: [
      'Con posición: <b>mantener el core; no sumar en 106</b>. La zona de sumar (97–100.1: EMA200 + mínimo del 16 Sep + EMA100) no llegó — el mínimo quedó en 103.4 al cierre — y el rebote está en el techo que la lectura anterior le ponía (61.8% y EMA50). Si cierra sobre 108.5 con $4B, el core se queda como está y el añadido se hace en el retest de 106.7 desde arriba; si falla acá, se espera 100.1–97 con el primer 25% en el cierre que aguante 100.1 con vela de rechazo y el stop del tramo nuevo en el cierre bajo 96.9.',
      'Sin posición: <b>esperar</b>. 25% en 97–100.1 con el stop en el cierre bajo 96.9, o 25% en el cierre sobre 108.5 con volumen sobre $4B. Entre 106.5 y 108.5 es comprar el techo de un rebote de sobreventa que todavía no cerró sobre la media que importa.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 108.5</b> (EMA20, con la EMA50 en 106.7 ya recuperada) con volumen. Ahí la corrección terminó en el 78.6% y el 18 Oct fue el mínimo → 116.2 (cierre 8 Oct) → 122.1.',
    ],
    invalidation: { level: 108.5, text: 'Cierre diario sobre 108.5 (EMA20, con la EMA50 en 106.7 y el 61.8% en 106.5 recuperados en el camino) anula el path bajista: la corrección terminó en el 78.6% del tramo y el 18 Oct (103.4) fue el mínimo → 116.2 (cierre del 8 Oct) y 122.1 (máximo del 26 Sep).' },
    path: [
      { d: 30, h: '+1M', target: 100.1, how: 'Rebote frenado en 106.5–106.7 (61.8% + EMA50) con volumen promedio → cierre bajo 104.2 → 102.3 (78.6%) → EMA100 en 100.1. Si cierra sobre 108.5 con $4B+, el +1M es el rango 106.7–116.2 y el sesgo vuelve a alcista.' },
      { d: 90, h: '+3M', target: 97, how: 'EMA200 (98.0) y mínimo del 16 Sep (96.9): el tramo 96.9 → 122.1 devuelto entero. Es el nivel donde core-accumulate compra; un cierre debajo con volumen abre la trendline en 85.9.' },
      { d: 365, h: '+1Y', target: 122, how: 'Retest del máximo del 26 Sep desde 97, con la EMA200 todavía subiendo. A un año la corrección es un pullback dentro de la tendencia de junio; para 147 (medida del tramo) hace falta BTC.D bajo 57% y la emisión recortada pesando, y eso hoy no está.' },
    ],
    levels: {
      resistance: [[106.5, '61.8% del tramo 96.9 → 122.1 · tocado el 21 Oct, no recuperado al cierre'], [106.7, 'EMA50 — techo del rebote · el precio está acá'], [108.5, 'INVALIDACIÓN bajista · EMA20'], [111.3, 'Cierre 12 Oct'], [116.2, 'Cierre 8 Oct'], [118.9, 'Máximo 21 Sep · zona 118–122'], [122.1, 'Máximo 26 Sep · máximo de 8 meses'], [147, 'Medida del tramo']],
      support: [[104.2, 'Mínimo 15 Oct · recuperado el 20 Oct — perderlo deja el rebote en tres días'], [103.4, 'Cierre 18 Oct · mínimo de la corrección al cierre'], [102.3, '78.6% del tramo 96.9 → 122.1 · aguantó (102 intradía)'], [100.1, 'EMA100 · +1M · primer nivel para sumar'], [98.0, 'EMA200 — subiendo'], [96.9, 'Mínimo 16 Sep · +3M'], [85.9, 'Trendline de mínimos crecientes'], [74.5, 'Mínimo 17 Ago']],
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
