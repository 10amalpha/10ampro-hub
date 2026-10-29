import { decisionBuilder, tw, fmt } from '../framework';

// DoubleZero publishes network stats quarterly (and hourly at doublezero.xyz/dashboard, no public JSON). Seed series below = quarterly updates; burn is live from the mint.
const Q = (d, v) => [d, v];

export const TOKEN = {
  slug: '2z', name: 'DoubleZero', symbol: '2Z', cgId: 'doublezero', host: 'mercados.10am.pro/2z',
  sector: 'DePIN · fiber network for validators',
  tagline: 'Stake de Solana sobre fibra dedicada, seat fees en 2Z y burn — la red que Solana ya usa, con un token que todavía no lo refleja.',
  description: 'DoubleZero ($2Z) en vivo: % del stake de Solana conectado, validadores, TCV, burn de seat fees, unlocks, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'reduce-on-bounce', reviewed: '29 Oct 2026',
  ta: {
    updated: '29 Oct 2026', bias: 'BEAR',
    read: 'Otro ATL de cierre, un rebote de dos días que no llegó al primer techo, y hoy el ATL intradía perdido en vivo. El 27 Oct cerró 0.02804, −2.9%: 2.9% debajo de 0.02889 (26 Oct), el ATL de cierre nuevo — el quinto cierre en escalera descendente — con 0.02702 intradía, el ATL absoluto. El 28 Oct 0.02897 (+3.3%) y el 29 Oct 0.02907 (+0.3%): dos cierres verdes que se quedaron 0.9% debajo de 0.02932, el primer techo de la zona de reducir, sin tocarlo. Hoy 0.02743, −4.7%: debajo de 0.02749 — el ATL intradía del 26 Oct que la lectura anterior ponía abajo como el nivel que abre la medida — en vivo, el rebote de dos días devuelto entero en una impresión, mínimo de 30 días en vivo; solo 0.02702 (27 Oct) queda debajo. Diecisiete sesiones entre 0.027 y 0.0318: tres intentos de rebote (0.03181 el 22 Oct, 0.02992 el 24, 0.02907 ayer), cada uno con un techo más bajo que el anterior y cada uno vendido en una vela — máximos decrecientes dentro del lateral, que es la forma de un lateral que se resuelve abajo. Uno de siete, sin cambio: el histograma del MACD sigue positivo (+0.0004, el doble que la semana pasada) — la divergencia sobrevive al segundo ATL de cierre seguido y sigue valiendo lo que valen las otras seis: el precio 16% debajo de la EMA20 (0.0325), 32% debajo de la 50 (0.0403), 57% debajo de la 200 (0.0638, cayendo 10% en 20 días). RSI 29.3, desde 22.9 — subió seis puntos con el precio 2% más abajo: la misma divergencia que el MACD, y la quinta semana bajo 30 sin cruzarlo. Volumen $4.4M, 89% de un promedio de 20 días que bajó a $5.0M (desde $6.0M; el promedio de 20 está en el 67% del de 90): el libro se achica cada semana y los ATL vienen con el volumen de un día cualquiera — ni los $30M de capitulación ni los $20M de un rebote con compradores. Relativo: −8.6% en siete días con SOL −3.5%, 2.5× — la semana pasada 1.1× porque la ventana había soltado el unlock; esta arranca en el rebote del 22 Oct y la beta volvió, aunque es la más baja de las alts de la página (JTO 3.4×, MET 3.6×, JUP 4.1×, NOS 5.2×). En el día, −4.7% con SOL −2.3%, 2×. −59% en 30 días sigue siendo el peor número de la página. Lo que cambió: el ATL de cierre es 0.02804 (27 Oct) y el intradía 0.02702; 0.02749 se perdió en vivo; el motor bajó la medida de 0.0252 a 0.0247. Lo que no cambió: ninguna vela de rechazo en diecisiete sesiones, la EMA20 (0.0325) debajo de la invalidación (0.03787), el histograma positivo sin volumen que lo acompañe, y el único dato de fondo — stake weight en el Q3 — sin publicar. El +1M sigue en 0.0264 (la medida con el rango del 23 Oct), a 4% del precio, con 0.0252 y 0.0247 (las medidas con los rangos nuevos) como los escalones siguientes.',
    pattern: '<b>Tendencia bajista intacta, sin mínimo definido; diecisiete sesiones laterales con máximos decrecientes que terminaron en un ATL de cierre nuevo (0.02804, 27 Oct) y el ATL intradía (0.02749) perdido en vivo:</b> máximos decrecientes 0.1126 (22 May) → 0.0724 (27 Sep), línea hoy en 0.0622; cada soporte histórico se rompió (0.0468, 0.0458, 0.0448, 0.0343, 0.0337, 0.0315, 0.030, 0.02932, 0.02889, 0.0287 y 0.02749 intradía). Post-unlock: vela de capitulación (8–9 Oct), rebote de tres días sin volumen que murió en 0.03787, nueve cierres seguidos en mínimos hasta 0.02932 (20 Oct), tres rebotes cada vez más cortos (0.03181 el 22 Oct, 0.02992 el 24, 0.02907 el 29) devueltos en una vela cada uno, y dos ATL de cierre en el medio (0.02889 el 26 Oct, 0.02804 el 27, con 0.02702 intradía); hoy 0.02743. Con el +1M (0.0315) y el +3M (0.030) cumplidos al cierre y dos ATL de cierre seguidos (26–27 Oct), la medida del tramo bajista (0.0264 con el rango del 23 Oct; 0.0252 y 0.0247 con los rangos nuevos) es el siguiente nivel medible, y después el 61.8% de la estructura May → Sep (0.0242). Un lateral cuyos rebotes hacen techos decrecientes con el volumen bajando y el histograma positivo por un pelo es la continuación lenta que las tres lecturas anteriores describían, no un piso: el piso llega con volumen, y no hubo.',
    watch: '<b>0.02702 y 0.02932.</b> Abajo: el ATL intradía del 27 Oct, a 1.5% del precio; con 0.02749 ya perdido en vivo, un cierre bajo 0.02702 abre 0.0264 (la medida, el +1M) y 0.0252–0.0247 (las medidas nuevas) sin un solo nivel en el medio. Arriba: 0.02907 (el techo del rebote de ayer) y 0.02932 (el ATL de cierre del 20 Oct, el techo que el rebote no tocó) son los dos primeros escalones de la zona de reducir; después 0.03181 (techo del rebote del 22 Oct), la EMA20 (0.0325) y el máximo del rebote post-unlock (0.03787), que es el que anula el path bajista. <b>Volumen:</b> $4.4M en la impresión que pierde 0.02749 es abandono; un rebote sin $20M+/día sigue siendo cortos cerrando. El día que aparezcan $30M+ con vela verde desde 0.027–0.028, se mira — antes no. <b>MACD y RSI:</b> el histograma positivo (+0.0004) y el RSI subiendo seis puntos con el precio en el ATL — dos divergencias que valen algo solo con volumen y un cierre sobre 0.02932. <b>Beta:</b> −8.6% vs SOL −3.5% en la semana (2.5×, desde 1.1×: la ventana arranca en el rebote del 22 Oct) — la más baja de las alts de la página, con el precio en ATL. <b>Stake weight:</b> el único dato de fondo; si el Q3 update lo muestra bajo 50%, el rebote no importa. <b>Foundation:</b> si las wallets "unlocked but unmoved" se mueven a un exchange en la capa on-chain, se acabó el debate.',
    decision: [
      'Con posición: <b>reducí en cualquier subida a 0.0291–0.03787</b> (el techo del rebote de ayer, el ATL de cierre viejo, el techo del rebote del 22 Oct, la EMA20 y el máximo del rebote post-unlock) lo que no querés tener en 0.0264 — tres rebotes llegaron, cada uno más corto que el anterior, y los tres se vendieron en una vela. No promediar — RSI bajo 30 por cinco semanas no es un nivel, es la ausencia de compradores, y dos ATL de cierre seguidos con el 89% del volumen lo confirman.',
      'Sin posición: <b>nada</b>. La opcionalidad se compra con un cierre sobre 0.03787 con volumen y stake weight sobre 50% en el Q3 — ni antes, ni porque el MACD y el RSI divergen, ni porque ya cayó 59% en 30 días y esta semana fue la alt que menos cayó de la página.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario sobre 0.03787</b> (máximo del rebote post-unlock, con 0.02932, 0.03181 y la EMA20 en 0.0325 como escalones) con 2× volumen → 0.0403 (EMA50) → 0.0413 (cierre del 7 Oct) → 0.0458 (piso viejo del 16 Sep).',
    ],
    invalidation: { level: 0.03787, text: 'Cierre diario sobre 0.03787 (cierre del 12 Oct, el máximo del rebote post-unlock; 0.02932, 0.03181 y la EMA20 en 0.0325 son los escalones) con volumen 2× anula el path bajista → 0.0403 (EMA50), 0.0413 (cierre del 7 Oct) y 0.0458 (piso viejo del 16 Sep).' },
    path: [
      { d: 30, h: '+1M', target: 0.0264, how: 'Medida del tramo bajista con el rango del 23 Oct (el motor hoy la pone en 0.0247, con 0.0252 en el medio — los escalones siguientes): segundo ATL de cierre seguido (0.02804 el 27 Oct) y 0.02749 perdido en vivo sin volumen → continuación lenta hasta ahí, a 4%. Con $20M+/día en un rebote y stake weight sosteniendo, 0.02702 aguanta y el +1M es 0.0291–0.0318.' },
      { d: 90, h: '+3M', target: 0.0242, how: 'Medida del 61.8% de la estructura May → Sep (0.0724 − 0.618 × 0.078), con el float del unlock todavía sin absorber. Si el Q3 trae stake weight sobre 55%, el +3M vuelve a 0.03787 (el máximo del rebote).' },
      { d: 365, h: '+1Y', target: 0.030, how: 'Retest desde abajo del 0.030 que cedió el 19 Oct: el año termina donde el +3M se cumplió si el stake weight aguanta y los seat fees empiezan a monetizar. Con adopción sosteniendo (>55%) y absorción tardía del float, el +1Y recupera la EMA20 de hoy (0.0325); el 0.046 requiere la EMA200 girando, y hoy cae 10%/20d.' },
    ],
    levels: {
      resistance: [[0.02804, 'Cierre 27 Oct · ATL de cierre — hoy debajo'], [0.02889, 'Cierre 26 Oct · ATL de cierre viejo'], [0.02907, 'Cierre 29 Oct · techo del rebote de dos días'], [0.02932, 'Cierre 20 Oct · ATL de cierre del 20 Oct · el rebote no lo tocó — techo'], [0.030, 'El +3M · cerrado el 19 Oct · +1Y'], [0.03181, 'Cierre 22 Oct · techo del rebote · piso de la zona de reducir'], [0.0325, 'EMA20 — ya debajo de la invalidación'], [0.03298, 'Cierre 17 Oct'], [0.03462, 'Cierre 14 Oct'], [0.03787, 'INVALIDACIÓN · máximo del rebote · cierre 12 Oct'], [0.0403, 'EMA50'], [0.0413, 'Cierre 7 Oct · invalidación vieja'], [0.0458, 'Piso viejo del 16 Sep'], [0.0486, 'EMA100'], [0.0598, 'Cierre 1 Oct · pre-unlock'], [0.0622, 'Línea de máximos decrecientes'], [0.0638, 'EMA200 — cayendo'], [0.0724, 'Máximo 27 Sep']],
      support: [[0.02749, 'ATL intradía 26 Oct · perdido en vivo el 29 Oct'], [0.02743, 'Hoy · mínimo de 30 días en vivo · el precio está acá'], [0.02702, 'ATL intradía · 27 Oct'], [0.0264, 'Medida del tramo bajista (rango del 23 Oct) · +1M'], [0.0252, 'Medida del tramo con el rango del 26 Oct'], [0.0247, 'Medida del tramo con el rango de hoy'], [0.0242, 'Medida 61.8% May → Sep · +3M']],
    },
  },
  sources: 'Network telemetry: DoubleZero quarterly updates (Q4-25 → Q2-26), data.malbeclabs.com. Burn: on-chain supply vs 10B minted.',
  rule: 'stake weight conectado cayendo trimestre a trimestre = tesis rota, salir; burn acelerando + stake >60% + Edge con suscriptores pagando = subir posición aunque el chart esté feo.',
  catalyst: {
    title: 'Unlock 1.655B 2Z — el evento de supply del anio',
    date: '2 Oct 2026 — NO ABSORBIDO: −40% en seis sesiones (0.0598 → 0.0358), nuevo mínimo histórico 0.0343 el 8 Oct · 16.55% del supply',
    body: [
      '<b>Que pasa.</b> El 2 de octubre se desbloquean 1.655B 2Z en un solo momento, repartidos en varios buckets (Malbec Labs el mayor). Por cada dos tokens que circulan hoy, llega casi uno nuevo. Desbloqueado no es vendido — pero el mercado lo pricea antes, no despues.',
      '<b>Lo que juega a favor.</b> Edge ya factura de verdad: desde el 12 de agosto <b>Kalshi</b> transmite su order book L1/L2 por la fibra de DoubleZero — el primer prediction market en hacerlo, y la primera demanda paga que no depende de incentivos. El burn de seat fees sigue corriendo (chico, pero vivo). Nada de eso cambia el calendario; cambia lo que vale el activo del otro lado del unlock.',
      '<b>LECTURA ·</b> Regla intacta desde el dia uno de este hub. <b>Decision:</b> › no comprar antes del 2 Oct — la opcionalidad se compra barata despues, no antes. › comprar despues SOLO si no hay nuevo minimo en los 7 dias posteriores. › Foundation moviendo tokens "unmoved" a CEX = salir sin preguntar.',
    ],
  },
  forecast: {
    updated: '21 Sep 2026', score1m: 28, score3m: 35,
    body: [
      '<b>1M · 28/100.</b> El unlock del 2 Oct cae adentro de la ventana y domina todo: 16.55% del supply, +47.7% del circulante, con un chart que ya venia de dejar a todos bajo agua desde el ATH del dia 1. El score mas bajo de la pagina a 1M, y esta bien que asi sea.',
      '<b>3M · 35/100.</b> Mejora solo del otro lado del evento: si el unlock se absorbe sin nuevo minimo en 7 dias, lo que queda es el unico DePIN con adopcion no incentivada (59% del stake de Solana enrutado) mas la primera demanda paga real (Kalshi via Edge) — a un precio que ya paso su peor test de supply. Eso es lo que se compra despues, no antes.',
      '<b>Invalidacion ·</b> nuevo minimo post-unlock, Foundation moviendo "unmoved" a CEX, o stake weight cayendo bajo 50%.',
    ],
  },
  thesis: [
    '<b>Qué es.</b> DoubleZero es una red de fibra dedicada entre data centers, permissionless, por la que los validadores de Solana enrutan su tráfico en lugar del internet público. Los validadores pagan un "seat fee" (5% de su revenue de validación) en 2Z; parte va a los contribuidores de fibra y parte se quema. Edge vende datos de mercado en tiempo real (Kalshi, shreds de Solana) por suscripción.',
    '<b>La tesis.</b> Es el único DePIN de los cinco con adopción medible y no incentivada: 59% del stake de Solana ya corre sobre DoubleZero (Q2-26), sin que nadie lo pague por usarlo. El token captura valor vía burn de seat fees y, eventualmente, staking. El problema es la curva de supply: 34.7% circulante, 10B total, un unlock de 1.655B el 2 Oct 2026 y un ATH de $0.75 en el día 1 que dejó a todo el mundo bajo agua.',
    '<b>Lo que valida.</b> Stake weight conectado subiendo (25% → 46% → 59%), TCV creciendo, burn on-chain acelerando (supply bajando vs 10B), Edge con suscriptores pagando en USDC, y expansión a otras chains.',
    '<b>Lo que rompe.</b> Unlocks no absorbidos (Foundation y validator sale desbloqueando), stake weight estancado o cayendo, Solana bajando el revenue de validación (menos seat fees), o Alpenglow/Rotor reduciendo la ventaja de latencia.',
  ],
  network: {
    title: 'Solana stake weight on DZ · validators · TCV · burn',
    note: 'Serie trimestral (Q4-25 → Q2-26) de los network updates oficiales; se actualiza manualmente cada quarter. Burn = 10B minted − supply on-chain, leído en vivo.',
    metrics: [
      { key: 'stake', label: 'Solana stake on DZ', source: 'manual', unit: 'pct', primary: true, mode: 'level', note: 'Quarterly network update', points: [Q('2025-10-02', 22), Q('2025-12-31', 25), Q('2026-03-31', 46.2), Q('2026-06-30', 59)] },
      { key: 'validators', label: 'Connected validators', source: 'manual', unit: 'num', mode: 'level', note: 'Quarterly network update', points: [Q('2025-09-28', 386), Q('2026-03-31', 448), Q('2026-06-30', 462)] },
      { key: 'tcv', label: 'Total connected value', source: 'manual', unit: 'usd', mode: 'level', note: 'Quarterly network update', points: [Q('2026-03-31', 17e9), Q('2026-04-30', 18e9), Q('2026-06-30', 21.7e9)] },
      { key: 'capacity', label: 'Capacity (Tbps)', source: 'manual', unit: 'num', mode: 'level', note: 'Quarterly network update', points: [Q('2026-03-31', 9.52), Q('2026-06-30', 10.14)] },
      { key: 'burn', label: 'Burned 2Z (live)', source: 'rpc-supply', mint: 'J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd', minted: 10_000_000_000, unit: 'num' },
    ],
  },
  onchain: {
    mint: 'J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd', supply: 10_000_000_000, decimals: 8, treasuryPct: 3,
    labels: {},
    programs: {},
    staking: { manual: { label: 'Staking', total: null, source: 'not live yet', note: 'Staking de 2Z anunciado, no activo' } },
    read: ({ chain, d, fmtNum, pctS }) => {
      const ho = chain.holders; if (!ho) return 'Holders scan unavailable.';
      const tr = ho.treasuryLike, ex = ho.exchange, daily = d?.price && d?.vol24 ? d.vol24 / d.price : null;
      const burned = chain.onchainSupply ? 10e9 - chain.onchainSupply : null;
      return `<b>2Z es 65% supply no circulante.</b> ${pctS(tr)} del supply en wallets sin etiqueta ≥3% — Foundation ("unlocked but unmoved", según su propia disclosure), validator sale con cliff, equipo e inversores a 4 años. El unlock grande ya pasó: <b>1.655B 2Z (16.55% del supply) el 2 Oct 2026 — +47.7% del circulante en un solo dia</b>, y no se absorbió (ATL 0.0343 el 8 Oct): eso define el trimestre. ${burned != null ? `<div style="margin-top:6px"><b>Burn:</b> ${fmtNum(burned)} 2Z quemados desde el TGE (${(burned / 10e9 * 100).toFixed(3)}% del supply). Es real pero chico frente a los unlocks; la tesis de burn solo gana a 3+ años.</div>` : ''}<div style="margin-top:6px"><b>Exchanges:</b> ${fmtNum(ex)} 2Z (${pctS(ex)}) en CEX etiquetados${daily ? `, ≈${(ex / daily).toFixed(1)} días de volumen` : ''}. Binance es la venue principal; el float de exchange es suficiente para absorber, no para sostener.</div><div style="margin-top:6px"><b>Decisión:</b> › el unlock no se absorbió (tres mínimos nuevos en la semana): comprar solo con cierre semanal sobre 0.047 y stake weight &gt;50% en el Q3. › Foundation moviendo tokens "unmoved" a CEX = salir. › Burn acelerando + stake weight &gt;60% = la única combinación que justifica ponderar más que un trade.</div>`;
    },
  },
  tripwires: ({ M, chain, trend, fc }) => [
    tw.metric(M, 'stake', { good: 95, watch: 80, unit: 'pct' }),
    tw.metric(M, 'tcv', { good: 95, watch: 80 }),
    tw.custom(M?.burn?.latest > 0 ? 'pass' : 'watch', M?.burn?.latest > 0 ? '✓' : '◦', 'Seat fees burning 2Z', M?.burn?.latest > 0 ? `${fmt.M(M.burn.latest)} 2Z quemados (on-chain, vivo). El mecanismo funciona; la magnitud todavía no mueve el supply.` : 'Sin lectura de burn.'),
    tw.concentration(chain, { exchangeWarnPct: 10, treasuryWarnPct: 40 }),
    tw.trend(trend, fc),
    tw.custom('fail', '!', 'Unlock 1.655B 2Z (16.55%) — 2 Oct 2026 · NO absorbido', 'Pasó y el float ganó: −40% en seis sesiones y nuevo mínimo histórico (0.0343, 8 Oct) — tres mínimos nuevos en la semana en la que la regla pedía cero. Mayor evento de supply del anio: +47.7% del circulante en un solo momento (00:00 UTC), repartido en varios buckets con Malbec Labs entre ellos. Hasta que pase y se vea absorbido, el chart no manda: manda el calendario. Pasa a ✓ si el precio no hace nuevo minimo en los 7 dias posteriores.'),
    tw.custom('watch', '◦', 'Edge revenue (USDC)', '447 suscriptores distintos desde abril (Q2-26). Es el primer revenue no ligado a seat fees. Falta que DoubleZero publique el run-rate; cuando lo haga, pasa a ✓ o ! según sea >$1M/año o no.'),
  ],
  decision: decisionBuilder('2Z', {
    flips: ({ net, M: Mf }) => {
      const s = net?.stake, b = net?.burn;
      return [
        `<b>Unlock del 2 Oct NO absorbido</b>: mínimos nuevos cada semana, ATL 0.0337 el 13 Oct. El flip ahora es un cierre sobre 0.0458 (el piso viejo del 16 Sep) con volumen 2× — hasta entonces, no hay prisa.`,
        `Stake weight conectado ${s?.latest ? `sobre <b>60%</b> en el Q3 update (hoy ${s.latest}%)` : 'subiendo trimestre a trimestre'}; si baja un trimestre, la tesis de adopción orgánica se rompe.`,
        `Burn on-chain acelerando ${b?.latest ? `(hoy ${Mf(b.latest)} 2Z acumulado)` : ''} = los seat fees se monetizan. Es la única captura de valor real hoy.`,
        `Foundation moviendo tokens "unmoved" a exchanges = salir sin esperar el chart.`,
      ];
    },
  }),
};
