import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jto', name: 'Jito', symbol: 'JTO', cgId: 'jito-governance-token', host: 'mercados.10am.pro/jto',
  sector: 'Solana MEV & liquid staking',
  tagline: 'MEV tips, JitoSOL TVL y revenue real — ¿el token captura lo que la red genera?',
  description: 'Jito ($JTO) en vivo: tips MEV, TVL de JitoSOL, fees y revenue del protocolo, supply overhang on-chain, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'accumulate-on-weakness', reviewed: '16 Oct 2026',
  catalyst: {
    title: 'SGP-0002 aprobada — y la salvaron los holders de JitoSOL',
    date: 'resultado 28 Ago 2026 · 67.0% vs 66.67% · + BAM preconfirmations en vivo desde el 9 Sep',
    body: [
      '<b>Que paso.</b> SGP-0002 (double disinflation) aprobada con <b>67.0% contra 66.67% requerido — por 0.334 puntos</b>. Y el detalle que importa aca: sin el override de los holders de JitoSOL — stakers votando por encima de la posicion de su validador — la propuesta fallaba. Es la primera demostracion on-chain de que la base de Jito mueve la gobernanza de Solana. Eso no se pricea en un dia, pero existe.',
      '<b>Que significa para el negocio.</b> Cuando el SIMD-0550 active, la emision de SOL cae al doble de velocidad y los tips MEV pesan mas en el yield de staking — la tesis de este catalizador se dio tal cual estaba escrita. El matiz de siempre sigue vigente: mas peso relativo no son mas dolares si los tips no se recuperan en absoluto.',
      '<b>Lo nuevo que si pone plata.</b> <b>BAM preconfirmations</b> en vivo desde el 9 Sep: 34.1% del stake en 383 validadores, revenue repartido 35% validadores / <b>35% treasury de la DAO</b> / 30% partners (Helius, Triton), primeros pagos en octubre. Y <b>JIP-38</b> (julio): 100% de las fees de JTX van a <b>buyback & burn de JTO</b> hasta al menos Q4-27. El cable revenue → token ya no es cero: existe — pero sobre los productos nuevos, no sobre los tips.',
      '<b>La contra que hay que decir.</b> El propio reporte Q2 de Jito pone a la familia de clientes en <b>~54% del stake activo</b>, con Harmonic en ~21% y creciendo. El monopolio de cliente que era la base del argumento del peaje ya no esta. El peaje real hoy son el share de tips (60%+ del volumen de priority fees) y BAM.',
      '<b>LECTURA ·</b> El voto le dio a JTO el viento estructural que esperabamos, y BAM + JIP-38 le pusieron por primera vez un cable de plata al token. Pero la tesis se mudo: ya no es <i>cliente dominante</i>, es <i>tips + BAM + buyback</i> — y eso se verifica, no se asume. <b>Decision:</b> › los dos datos de octubre: primer pago de preconfs al treasury y primer buyback JIP-38 visible on-chain. › activacion de SGP-2 = viento; tips recuperando = plata. › client share siguiendo para abajo = la parte vieja de la tesis se sigue rompiendo, no promediar por nostalgia.',
    ],
  },
  forecast: {
    updated: '21 Sep 2026', score1m: 62, score3m: 58,
    body: [
      '<b>1M · 62/100.</b> El mejor set de catalizadores del anio junto: voto ganado, BAM preconfs cobrando desde octubre, buyback JIP-38 corriendo. Sube desde 58 del corte anterior. Pero JTO sigue siendo beta a SOL — el rally de este mes es prestado del regime, no propio.',
      '<b>3M · 58/100.</b> Baja del pico de 1M por dos cosas medibles: la erosion de client share (~54% y cayendo segun el propio Q2 report) y los tips todavia deprimidos (~1.178 SOL/dia en la semana del launch de BAM). Si el Q3 report muestra share estabilizado y los pagos de BAM entrando al treasury, esto se revisa para arriba.',
      '<b>Invalidacion ·</b> client share bajo 50%, buyback JIP-38 que no aparece on-chain en octubre, o TVL de JitoSOL siguiendo perdiendo share contra Sanctum.',
    ],
  },
  ta: {
    updated: '16 Oct 2026', bias: 'BEAR',
    read: 'Se cerró 0.50, y no por un centavo. El rebote del 14 Oct (0.5359) murió adentro de las EMAs, como anoté que pasaría si llegaba sin volumen, y el 15 Oct cayó 8.5% a 0.4904: bajo el mínimo del 9 Oct (0.5037) y bajo la invalidación. El 16 Oct siguió a 0.4738, mínimo de 30 días; hoy 0.4808. El sesgo pasa a bajista. Uno de siete (era dos): lo único que queda es la EMA200 subiendo, y sube 0.3% en 20 días — eso es plana. Precio 7% debajo de las cuatro EMAs, que están apiladas en 0.518–0.529, y el MACD negativo y cayendo. RSI 45, que es lo que más preocupa: un token 7% debajo de todas sus medias con el RSI en 45 no está sobrevendido, está empezando. Volumen $34M, igual que el promedio ($36M): no hubo pánico, hubo ausencia de compradores en el nivel que importaba. Relativo: −5.2% en siete días con SOL −3.0% — cae con el mercado, un poco más, y lejos de la debilidad propia de JUP (−14%) o NOS (−16%); JTO no es el más débil de la página, pero es el que perdió el nivel que había definido como el suyo. El triángulo sigue dibujado — la línea inferior está en 0.444, el apex el 19 Nov — pero el precio ya salió de la compresión por abajo del piso que la sostenía, y un triángulo que pierde su último mínimo interno a cinco semanas del apex suele resolver en la línea inferior, no en la superior. Octubre on-chain — pago de BAM al treasury y buyback JIP-38 — sigue siendo lo único que puede cambiar esto, y el chart dice que el mercado no lo está esperando.',
    pattern: '<b>Triángulo de 8 meses resolviendo por abajo.</b> Máximos decrecientes 0.817 (29 Jun) → 0.652 (22 Ago) → 0.6013 (27 Sep), línea hoy en 0.558; mínimos crecientes 0.26 (4 Abr) → 0.405 (5 Sep), línea en 0.444. Dos fallas en la línea superior (27 Sep, 12 Oct), una tercera en las EMAs (14 Oct), y el 15 Oct perdió el último mínimo interno (0.5037). El precio está al 32% del rango con las cuatro EMAs encima, 7% arriba: la compresión se convirtió en distribución. Lo que define la resolución formal es la línea inferior, 0.444; debajo de ella la medida del triángulo (0.234) deja de ser teórica.',
    watch: '<b>0.4738 y 0.52.</b> Abajo: cierre bajo 0.4738 (mínimo del 16 Oct) abre 0.444 — la línea inferior del triángulo — directo. Arriba: cierre sobre 0.52 (EMA20 0.5197 y EMA50 0.518, juntas) anula el sesgo bajista; sin eso, cualquier rebote a 0.50–0.51 es el piso perdido actuando de techo. <b>Volumen:</b> la caída fue con volumen promedio; si 0.444 llega con $70M+ es capitulación y ahí empieza la watchlist, no antes. <b>Octubre:</b> primer pago de preconfs al treasury y primer buyback JIP-38 — si salen y el precio no recupera 0.52, el mercado les asignó cero. <b>Beta:</b> JTO cayó 1.7× SOL esta semana; si SOL rebota y JTO no recupera 0.50, la debilidad es propia.',
    decision: [
      'Con posición: <b>reducir en los rebotes a 0.50–0.52</b> (el piso perdido y las EMAs) lo que no querés tener en 0.444. Lo que quede, con stop en el cierre bajo 0.4738: ahí la línea inferior es el siguiente nivel y no hay nada en el medio.',
      'Sin posición: <b>nada</b>. La watchlist de compra empieza en 0.444 con volumen de capitulación, o en 0.405 (mínimo del 5 Sep); la entrada por fuerza es el cierre sobre 0.52 con volumen y octubre on-chain verificado. Comprar 0.48 porque ya cayó es comprar la mitad de un triángulo roto.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.52</b> (EMA20 + EMA50) con volumen sobre el promedio → 0.5359 (cierre 14 Oct) → 0.558 (línea superior).',
    ],
    invalidation: { level: 0.52, text: 'Cierre diario sobre 0.52 (EMA20 en 0.5197 y EMA50 en 0.518, apiladas; recupera también el mínimo del 9 Oct, 0.5037) anula el path bajista → 0.5359 (cierre del 14 Oct) y 0.558 (línea superior del triángulo).' },
    path: [
      { d: 30, h: '+1M', target: 0.444, how: 'Rebote a 0.50–0.52 que falla en las EMAs → cierre bajo 0.4738 → línea inferior del triángulo en 0.444. Si octubre on-chain sale y el precio recupera 0.52, el +1M es 0.52–0.558 hasta el apex.' },
      { d: 90, h: '+3M', target: 0.405, how: 'Mínimo del 5 Sep: el triángulo resuelto abajo con el retest de la línea inferior fallido. Con el Q3 report mostrando client share estabilizado y tips recuperando, el +3M vuelve a la línea (0.55).' },
      { d: 365, h: '+1Y', target: 0.337, how: 'Mínimo de 180 días (0.3367). Es el escenario de la medida del triángulo (0.234) a medio camino: client share cayendo y el buyback sin peso. Con BAM pagando al treasury trimestre tras trimestre, el +1Y recupera 0.52–0.53 (las EMAs de hoy).' },
    ],
    levels: {
      resistance: [[0.4904, 'Cierre 15 Oct · el día del quiebre'], [0.50, 'Invalidación vieja · ahora techo'], [0.5037, 'Mínimo 9 Oct · piso perdido'], [0.518, 'EMA50'], [0.5197, 'EMA20'], [0.52, 'INVALIDACIÓN bajista'], [0.5231, 'EMA100'], [0.5292, 'EMA200 — plana'], [0.5359, 'Cierre 14 Oct'], [0.558, 'Línea superior del triángulo'], [0.6013, 'Máximo 27 Sep']],
      support: [[0.4738, 'Cierre 16 Oct · mínimo de 30 días'], [0.444, 'Línea inferior del triángulo · +1M'], [0.405, 'Mínimo 5 Sep · +3M'], [0.337, 'Mínimo de 180 días · +1Y'], [0.234, 'Medida del triángulo']],
    },
  },
  sources: 'Network telemetry: DefiLlama (Jito TVL, fees = MEV tips, revenue = DAO take).',
  rule: 'fees cayendo >40% desde pico + TVL de JitoSOL perdiendo share = reducir; DAO activando distribución de revenue a stakers = subir posición.',
  thesis: [
    '<b>Qué es.</b> Jito corre la familia de clientes de validador lider de Solana (~54% del stake activo segun su propio reporte Q2, con Harmonic ~21% detras) y el pool de staking liquido JitoSOL. Los searchers pagan tips por inclusion de bundles — 60%+ del volumen de priority fees de la red — y esos tips son revenue real, en SOL, todos los dias.',
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
    tw.custom('watch', '◦', 'Revenue → JTO link', 'JIP-38 (jul 2026) manda 100% de las fees de JTX a buyback & burn de JTO hasta Q4-27, y BAM preconfs manda 35% del revenue al treasury desde octubre. El cable existe — sobre los productos nuevos, no sobre los tips. Pasa a ✓ con el primer buyback visible on-chain; a ! si se pausa o los montos son ruido.'),
    tw.custom('pass', '✓', 'SGP-0002 double disinflation — aprobada', 'Paso el 28 Ago con 67.0% — por 0.334 puntos, y el override de los holders de JitoSOL fue decisivo. Cuando el SIMD-0550 active, la emision cae al doble de velocidad y el MEV pesa mas en el yield. El dato ahora: fecha de activacion.'),
    tw.custom('fail', '!', 'Client share — disparado', 'El propio Q2 report de Jito: familia de clientes en ~54% del stake activo, Harmonic ~21%. Bajo el umbral de 80% que teniamos escrito. La tesis del peaje se muda a tips share (60%+ de priority fees) y BAM (34% del stake en preconfs). Vuelve a ◦ si el Q3 muestra estabilizacion.'),
  ],
  decision: decisionBuilder('JTO', {
    flips: ({ net, M, U }) => {
      const f = net?.fees, r = net?.revenue;
      return [
        `<b>Fee switch / buyback aprobado en la DAO</b> — convierte el cash flow en valor para JTO. Hoy: no existe.`,
        `MEV tips mensuales ${f?.peak ? `volviendo sobre <b>${U(f.peak * 0.85)}</b> (85% del pico; hoy ${U(f.latest)})` : 'recuperando el pico'}. Mientras caen, JTO es beta a SOL sin prima.`,
        `Tesorería / investor wallets moviéndose a exchanges antes del unlock = salir sin esperar el chart.`,
        `Pérdida de share del cliente Jito (Firedancer sin tips) = tesis rota, no solo bajista.`,
        `<b>SGP-0002 aprobada</b> (28 Ago, 67.0%) — se imprime menos SOL y el MEV pesa mas en el yield: viento estructural confirmado. El flip pendiente: primer buyback JIP-38 y primer pago BAM al treasury, ambos verificables en octubre.`,
      ];
    },
  }),
};
