import { decisionBuilder, tw, fmt } from '../framework';

// DoubleZero publishes network stats quarterly (and hourly at doublezero.xyz/dashboard, no public JSON). Seed series below = quarterly updates; burn is live from the mint.
const Q = (d, v) => [d, v];

export const TOKEN = {
  slug: '2z', name: 'DoubleZero', symbol: '2Z', cgId: 'doublezero', host: 'mercados.10am.pro/2z',
  sector: 'DePIN · fiber network for validators',
  tagline: 'Stake de Solana sobre fibra dedicada, seat fees en 2Z y burn — la red que Solana ya usa, con un token que todavía no lo refleja.',
  description: 'DoubleZero ($2Z) en vivo: % del stake de Solana conectado, validadores, TCV, burn de seat fees, unlocks, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'accumulate-slowly-below-unlocks', reviewed: '22 Sep 2026',
  ta: {
    updated: '22 Sep 2026', bias: 'BEAR',
    read: 'Rebote de +14% desde el mínimo histórico del 16 Sep (0.0448 intradía, 0.0458 al cierre) y con eso cruzó la línea de máximos decrecientes que venía desde mayo (hoy en ~0.046) y la EMA20 (0.050). Es lo primero que este chart hace bien desde el TGE. Pero tres de siete: debajo de la 50 (0.053), de la 100 (0.060) y de la 200 (0.086, cayendo −8.6% en 20 días — la más bajista de la página). El volumen no acompañó: 84% del promedio de 90d, secándose. Y el 2 Oct entran 1.655B de tokens, +47.7% del circulante. Un rebote sin volumen a diez días de un unlock de ese tamaño se llama posicionamiento de los que van a vender, no cambio de tendencia.',
    pattern: '<b>Tendencia bajista — máximos decrecientes, piso recién testeado.</b> Línea de resistencia 0.1126 (22 May) → 0.0597 (28 Ago), hoy en ~0.046: el precio la cruzó el 18 Sep, pero una línea que cae más rápido que el precio se rompe sola. Máximos decrecientes 0.075 (22 Jun) → 0.073 (10 Jul) → 0.055 (10 Ago) → 0.060 (28 Ago). Mínimos: 0.0468 (19 Ago) → 0.0458 (16 Sep): doble piso apenas, con el unlock adelante. Sin línea de soporte válida.',
    watch: '<b>El 2 Oct.</b> Todo lo demás es ruido hasta ese día. El chart bueno: unlock que abre con volumen 3× y cierra la semana sobre 0.0458 = absorbido, y ahí se compra. El chart malo: nuevo mínimo bajo 0.0448 en la semana del unlock = el float nuevo manda y el objetivo es 0.041 (medida) y 0.035. <b>Antes del unlock:</b> la EMA50 (0.053) y el máximo del 28 Ago (0.0597) son los techos; cerrar sobre 0.060 con volumen antes del evento sería la sorpresa alcista — no la esperes. <b>Foundation:</b> tokens "unmoved" moviéndose a CEX antes del 2 Oct = salir sin mirar el chart.',
    decision: [
      'Con posición: <b>no sumar antes del 2 Oct</b>. Si el rebote llega a 0.056–0.060 antes del unlock, es la última salida cómoda para lo que no querés tener en el evento.',
      'Sin posición: <b>esperar el otro lado del unlock</b>. Accumulate-slowly-below-unlocks: primer tramo solo con 7 días post-unlock sin nuevo mínimo, en 0.045–0.048.',
      'Trigger único que anula el sesgo: <b>cierre diario &gt; 0.060</b> con 2× volumen (EMA100 + máximo 28 Ago). Ahí el mercado absorbió antes de tiempo y el objetivo sube a 0.073.',
    ],
    invalidation: { level: 0.06, text: 'Cierre diario sobre 0.060 (EMA100 y máximo del 28 Ago) con volumen 2× anula el path bajista → 0.073 (máximo 10 Jul) y la EMA200 (0.086).' },
    path: [
      { d: 30, h: '+1M', target: 0.046, how: 'Retest del piso de 0.0458 con el unlock del 2 Oct adentro de la ventana. Sin volumen de absorción, el piso no aguanta la primera semana.' },
      { d: 90, h: '+3M', target: 0.041, how: 'Medida del tramo bajista bajo el piso. Es el escenario de unlock no absorbido; si se absorbe, el +3M vuelve a 0.053–0.060.' },
      { d: 365, h: '+1Y', target: 0.06, how: 'Post-unlock, el único DePIN con adopción no incentivada recupera la EMA100 si el stake weight aguanta sobre 50%. Sin eso, 0.035.' },
    ],
    levels: {
      resistance: [[0.0531, 'EMA50'], [0.0597, 'Máximo 28 Ago · EMA100 · INVALIDACIÓN'], [0.0732, 'Máximo 10 Jul'], [0.0863, 'EMA200 — cayendo'], [0.1126, 'Máximo 22 May']],
      support: [[0.0501, 'EMA20'], [0.0468, 'Mínimo 19 Ago'], [0.0458, 'Mínimo histórico al cierre · 16 Sep'], [0.0448, 'Mínimo histórico intradía'], [0.041, 'Medida del tramo bajista'], [0.035, 'Undercut post-unlock']],
    },
  },
  sources: 'Network telemetry: DoubleZero quarterly updates (Q4-25 → Q2-26), data.malbeclabs.com. Burn: on-chain supply vs 10B minted.',
  rule: 'stake weight conectado cayendo trimestre a trimestre = tesis rota, salir; burn acelerando + stake >60% + Edge con suscriptores pagando = subir posición aunque el chart esté feo.',
  catalyst: {
    title: 'Unlock 1.655B 2Z — el evento de supply del anio',
    date: '2 Oct 2026 00:00 UTC · 16.55% del supply · +47.7% del circulante en un dia',
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
      return `<b>2Z es 65% supply no circulante.</b> ${pctS(tr)} del supply en wallets sin etiqueta ≥3% — Foundation ("unlocked but unmoved", según su propia disclosure), validator sale con cliff, equipo e inversores a 4 años. El proximo unlock grande es <b>1.655B 2Z (16.55% del supply) el 2 Oct 2026 — +47.7% del circulante en un solo dia</b>: eso es el evento que define el siguiente trimestre. ${burned != null ? `<div style="margin-top:6px"><b>Burn:</b> ${fmtNum(burned)} 2Z quemados desde el TGE (${(burned / 10e9 * 100).toFixed(3)}% del supply). Es real pero chico frente a los unlocks; la tesis de burn solo gana a 3+ años.</div>` : ''}<div style="margin-top:6px"><b>Exchanges:</b> ${fmtNum(ex)} 2Z (${pctS(ex)}) en CEX etiquetados${daily ? `, ≈${(ex / daily).toFixed(1)} días de volumen` : ''}. Binance es la venue principal; el float de exchange es suficiente para absorber, no para sostener.</div><div style="margin-top:6px"><b>Decisión:</b> › no comprar antes del unlock de 1.62B; comprar <b>después</b> si el precio lo absorbe en una semana sin nuevo mínimo. › Foundation moviendo tokens "unmoved" a CEX = salir. › Burn acelerando + stake weight &gt;60% = la única combinación que justifica ponderar más que un trade.</div>`;
    },
  },
  tripwires: ({ M, chain, trend, fc }) => [
    tw.metric(M, 'stake', { good: 95, watch: 80, unit: 'pct' }),
    tw.metric(M, 'tcv', { good: 95, watch: 80 }),
    tw.custom(M?.burn?.latest > 0 ? 'pass' : 'watch', M?.burn?.latest > 0 ? '✓' : '◦', 'Seat fees burning 2Z', M?.burn?.latest > 0 ? `${fmt.M(M.burn.latest)} 2Z quemados (on-chain, vivo). El mecanismo funciona; la magnitud todavía no mueve el supply.` : 'Sin lectura de burn.'),
    tw.concentration(chain, { exchangeWarnPct: 10, treasuryWarnPct: 40 }),
    tw.trend(trend, fc),
    tw.custom('fail', '!', 'Unlock 1.655B 2Z (16.55%) — 2 Oct 2026', 'En 11 dias. Mayor evento de supply del anio: +47.7% del circulante en un solo momento (00:00 UTC), repartido en varios buckets con Malbec Labs entre ellos. Hasta que pase y se vea absorbido, el chart no manda: manda el calendario. Pasa a ✓ si el precio no hace nuevo minimo en los 7 dias posteriores.'),
    tw.custom('watch', '◦', 'Edge revenue (USDC)', '447 suscriptores distintos desde abril (Q2-26). Es el primer revenue no ligado a seat fees. Falta que DoubleZero publique el run-rate; cuando lo haga, pasa a ✓ o ! según sea >$1M/año o no.'),
  ],
  decision: decisionBuilder('2Z', {
    flips: ({ net, M: Mf }) => {
      const s = net?.stake, b = net?.burn;
      return [
        `<b>Unlock de 1.655B (2 Oct) absorbido</b> sin nuevo minimo en 7 dias — el mercado tiene demanda para el float nuevo. Hasta entonces, no hay prisa.`,
        `Stake weight conectado ${s?.latest ? `sobre <b>60%</b> en el Q3 update (hoy ${s.latest}%)` : 'subiendo trimestre a trimestre'}; si baja un trimestre, la tesis de adopción orgánica se rompe.`,
        `Burn on-chain acelerando ${b?.latest ? `(hoy ${Mf(b.latest)} 2Z acumulado)` : ''} = los seat fees se monetizan. Es la única captura de valor real hoy.`,
        `Foundation moviendo tokens "unmoved" a exchanges = salir sin esperar el chart.`,
      ];
    },
  }),
};
