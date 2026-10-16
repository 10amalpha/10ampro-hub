import { decisionBuilder, tw, fmt } from '../framework';

// DoubleZero publishes network stats quarterly (and hourly at doublezero.xyz/dashboard, no public JSON). Seed series below = quarterly updates; burn is live from the mint.
const Q = (d, v) => [d, v];

export const TOKEN = {
  slug: '2z', name: 'DoubleZero', symbol: '2Z', cgId: 'doublezero', host: 'mercados.10am.pro/2z',
  sector: 'DePIN · fiber network for validators',
  tagline: 'Stake de Solana sobre fibra dedicada, seat fees en 2Z y burn — la red que Solana ya usa, con un token que todavía no lo refleja.',
  description: 'DoubleZero ($2Z) en vivo: % del stake de Solana conectado, validadores, TCV, burn de seat fees, unlocks, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'reduce-on-bounce', reviewed: '16 Oct 2026',
  ta: {
    updated: '16 Oct 2026', bias: 'BEAR',
    read: 'El +1M bajista se cumplió al cierre. 0.03462 (14 Oct), 0.03367 (15 Oct) — debajo del 0.034 que era el primer objetivo — y 0.03318 el 16 Oct, el mínimo histórico al cierre, con 0.03151 intradía el 15 Oct como nuevo ATL. Hoy 0.03334. Cuatro cierres seguidos en mínimos sin una sola vela de rechazo. Cero de siete por tercera revisión; RSI 13 (era 6): subió porque el precio dejó de caer rápido, no porque alguien compre — más de diez sesiones debajo de 15 no es sobreventa, es la ausencia de mercado. El único dato nuevo es que el histograma del MACD dejó de ampliarse: la caída pierde velocidad, que es lo que pasa cuando ya vendieron todos los que iban a vender y los que quedan no compran. Volumen $3.9M, un tercio del promedio de 20 días ($12M) y un 4% del día del unlock ($101M). Un ATL con un tercio del volumen promedio no es capitulación — la capitulación trae volumen — es abandono. Relativo: −6.7% en siete días con SOL −3.0%, 2.2× el mercado; menos propio que la semana pasada (1.6× con SOL −12%), pero cuando el mercado casi no cae y vos hacés mínimo histórico igual, la beta no te explica nada. La invalidación bajó: el piso viejo (0.0458) quedó 37% arriba y ya no es el nivel que anula nada — el que importa es el cierre del 7 Oct (0.0413), donde hoy pasa la EMA20 (0.0414). Lo que cambia esto sigue siendo lo mismo: ese cierre con volumen, o el Q3 update con stake weight sobre 55%. Hasta ahí, cada rebote es para vender lo que no quieras tener en 0.030.',
    pattern: '<b>Tendencia bajista intacta, sin mínimo definido:</b> máximos decrecientes 0.1126 (22 May) → 0.0724 (27 Sep), línea hoy en 0.066; cada soporte histórico se rompió (0.0468, 0.0458, 0.0448, 0.0343, 0.0337 y ahora 0.0315). Post-unlock: vela de capitulación (8–9 Oct), rebote de tres días sin volumen que murió en 0.03787 sin llegar al primer nivel (0.0413), y cuatro cierres seguidos en mínimos con el volumen secándose. La medida del tramo bajo el piso viejo (0.030) está 10% abajo y es el único nivel medible antes del 61.8% de la estructura May → Sep (0.0242). Un rebote que falla debajo del primer nivel es continuación; cuatro mínimos seguidos sin volumen es continuación lenta — la peor para el que tiene.',
    watch: '<b>0.0315 y 0.03787.</b> Abajo: el ATL intradía del 15 Oct; perderlo al cierre abre 0.030 directo. Arriba: el máximo del rebote (0.03787, 12 Oct) es el primer nivel, el cierre del 7 Oct (0.0413) con la EMA20 encima (0.0414) es el que anula el path bajista. <b>Volumen:</b> $3.9M es abandono; un rebote sin $20M+/día sigue siendo cortos cerrando. El día que aparezcan $30M+ con vela verde desde 0.031–0.033, se mira — antes no. <b>Stake weight:</b> el único dato de fondo; si el Q3 update lo muestra bajo 50%, el rebote no importa. <b>Foundation:</b> si las wallets "unlocked but unmoved" se mueven a un exchange en la capa on-chain, se acabó el debate.',
    decision: [
      'Con posición: <b>reducí en cualquier subida a 0.036–0.0413</b> (máximo del rebote y cierre del 7 Oct) lo que no querés tener en 0.030. No promediar — RSI bajo 15 por más de diez sesiones no es un nivel, es la ausencia de compradores, y el volumen en un tercio del promedio lo confirma.',
      'Sin posición: <b>nada</b>. La opcionalidad se compra con un cierre sobre 0.0413 con volumen y stake weight sobre 50% en el Q3 — ni antes, ni porque ya cayó 54% desde el máximo del 27 Sep.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario sobre 0.0413</b> (cierre del 7 Oct, hoy la EMA20) con 2× volumen → 0.0458 (piso viejo del 16 Sep) → 0.0477 (EMA50).',
    ],
    invalidation: { level: 0.0413, text: 'Cierre diario sobre 0.0413 (cierre del 7 Oct, el primer nivel que el rebote nunca alcanzó, hoy con la EMA20 en 0.0414) con volumen 2× anula el path bajista → 0.0458 (piso viejo del 16 Sep), 0.0477 (EMA50) y 0.0598 (cierre pre-unlock del 1 Oct).' },
    path: [
      { d: 30, h: '+1M', target: 0.0315, how: 'Retest del ATL intradía del 15 Oct desde 0.033–0.034, con el volumen en mínimos. Con $20M+/día en un rebote y stake weight sosteniendo, 0.0315 aguanta y el +1M es 0.033–0.038; sin volumen, se pierde al cierre.' },
      { d: 90, h: '+3M', target: 0.030, how: 'Medida del tramo bajo el piso viejo de 0.0458, con el float del unlock todavía sin absorber. Si el Q3 trae stake weight sobre 55%, el +3M vuelve a 0.0413 (EMA20).' },
      { d: 365, h: '+1Y', target: 0.0242, how: 'Medida del 61.8% de la estructura May → Sep (0.0724 − 0.618 × 0.078) si el stake weight cae y los seat fees no monetizan. Con adopción sosteniendo (>55%) y absorción tardía del float, el +1Y recupera la EMA50 de hoy (0.0477); el 0.06 requiere la EMA200 girando, y hoy cae 7.5%/20d.' },
    ],
    levels: {
      resistance: [[0.03367, 'Cierre 15 Oct'], [0.03462, 'Cierre 14 Oct'], [0.03787, 'Máximo del rebote · cierre 12 Oct'], [0.0413, 'INVALIDACIÓN · cierre 7 Oct · EMA20 (0.0414)'], [0.0458, 'Piso viejo del 16 Sep'], [0.0477, 'EMA50'], [0.0543, 'EMA100'], [0.0598, 'Cierre 1 Oct · pre-unlock'], [0.066, 'Línea de máximos decrecientes'], [0.0694, 'EMA200 — cayendo'], [0.0724, 'Máximo 27 Sep']],
      support: [[0.03318, 'Cierre 16 Oct · mínimo histórico al cierre'], [0.0315, 'ATL intradía · 15 Oct · +1M'], [0.030, 'Medida del tramo bajista · +3M'], [0.0242, 'Medida 61.8% May → Sep · +1Y']],
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
