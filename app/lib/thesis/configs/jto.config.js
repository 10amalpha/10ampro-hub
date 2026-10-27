import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jto', name: 'Jito', symbol: 'JTO', cgId: 'jito-governance-token', host: 'mercados.10am.pro/jto',
  sector: 'Solana MEV & liquid staking',
  tagline: 'MEV tips, JitoSOL TVL y revenue real — ¿el token captura lo que la red genera?',
  description: 'Jito ($JTO) en vivo: tips MEV, TVL de JitoSOL, fees y revenue del protocolo, supply overhang on-chain, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'accumulate-on-weakness', reviewed: '26 Oct 2026',
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
    updated: '26 Oct 2026', bias: 'BEAR',
    read: 'El mínimo de 30 días se confirmó al cierre y el RSI salió de la sobreventa con el precio abajo. El 25 Oct cerró 0.434 (−2.3%) y el 26 Oct 0.4228 (−2.6%) — quinto cierre rojo seguido desde 0.4814, 4.3% debajo de 0.4419 (cierre del 19 Oct, el mínimo de la primera ruptura) y 6.9% debajo de la línea inferior del triángulo (0.454 hoy): el mínimo de 30 días que la lectura anterior tenía en vivo quedó impreso, y es el cierre más bajo desde la primera semana de septiembre. Hoy 0.4337, +2.6%: la primera impresión verde desde el 21 Oct, con el 61% del volumen. Cinco sesiones desde 0.4814 devolvieron 12% a razón de 2–4% por día, sin una vela de pánico: el triángulo se vacía hacia abajo, no se rompe. Volumen $18.5M, 61% del promedio de 20 días ($30.4M) — cada cierre nuevo en mínimos vino con menos volumen que el anterior (78% el 19 Oct, 66% el 24, 61% hoy); el promedio de 20 días está en el 95% del de 90, plano. Cero de siete por séptima revisión: las cuatro medias encima y cayendo — la 20 en 0.4728 (9% arriba, ya debajo de la invalidación), la 50 en 0.4945, la 100 en 0.5094, la 200 en 0.5221 (−1.7% en 20 días). RSI 33.2, desde 28.1 — volvió sobre 30 con el precio 0.5% más abajo que cuando lo cruzó: el oscilador hizo un mínimo más alto contra un precio más bajo, divergencia, la misma que SOL imprimió esta semana. El histograma del MACD sigue negativo y achicándose por octava sesión. Relativo: −2.8% en siete días con SOL −4.0%, 0.7× — la primera semana de octubre en que JTO cae menos que SOL; no porque alguien compre JTO, sino porque la semana nueva ya no incluye los días de la ruptura (19–24 Oct) y SOL cayó a su ritmo. En el día, +2.6% con SOL −0.5%: una impresión propia, en vivo, con $18M. Lo que cambió: el mínimo de 30 días es un cierre (0.4228), el RSI divergió y la beta de la semana bajó de 2× a 0.7×. Lo que no cambió: cero de siete, el volumen que no aparece en ninguna dirección, 0.405 a 4.2% del cierre sin nada en el medio y octubre on-chain — pago de BAM al treasury, buyback JIP-38 — sin verificar. La invalidación sigue en 0.4814: el techo del rebote del 21 Oct; la EMA20 (0.4728) ya cayó debajo y es el primer escalón.',
    pattern: '<b>Triángulo de 8 meses resuelto abajo: línea inferior rota el 19 Oct, recuperada el 21 Oct, rota de vuelta el 24 Oct; mínimo de 30 días confirmado al cierre el 26 Oct.</b> Máximos decrecientes 0.817 (29 Jun) → 0.652 (22 Ago) → 0.6013 (27 Sep) → 0.5828 (6 Oct), línea hoy en 0.5331; mínimos crecientes 0.26 (4 Abr) → 0.405 (5 Sep), línea en 0.454. Dos fallas en la línea superior (27 Sep, 12 Oct), una en las EMAs (14 Oct), seis cierres en mínimos de 30 días hasta 0.4419 (19 Oct) bajo la línea, el retest fallido por 0.3% (20 Oct), la recuperación de un día (0.4814, 21 Oct, 93% del volumen) y cinco cierres rojos hasta 0.4228 (26 Oct), 7% bajo la línea y 4% bajo el mínimo del 19 Oct; hoy 0.4337. Una línea que se rompe dos veces en cinco sesiones con el volumen bajando dejó de sostener: el patrón está resuelto abajo a tres semanas del apex (19 Nov), y los escalones son 0.405 (5 Sep), 0.337 (mínimo de fines de abril) y 0.26 (origen); la medida completa (0.234) queda debajo. Arriba, 0.4419–0.4441 (los dos cierres de las rupturas) es el primer techo, 0.454 (la línea, desde abajo) el segundo, 0.4814 (techo del rebote) el que anula el sesgo; la EMA20 (0.4728) y las otras tres medias (0.4945–0.5221) encima.',
    watch: '<b>0.405 y 0.454.</b> Abajo: 0.405 (mínimo del 5 Sep, el +1M) está a 4.2% del cierre — con $70M+ y vela de rechazo es la capitulación donde empieza la watchlist; sin volumen es un escalón más hacia 0.337. Arriba: 0.4419–0.4441 (los cierres de las dos rupturas) es el primer techo del rebote, la línea (0.454) desde abajo el segundo, 5% arriba; el que anula el sesgo bajista es el cierre sobre 0.4814 (techo del rebote del 21 Oct) con volumen sobre $33M — ahí la segunda ruptura fue un barrido. <b>Volumen:</b> $18.5M, 61% del promedio — cada mínimo nuevo con menos volumen que el anterior; el patrón se resuelve por abandono, no por venta. <b>RSI:</b> 33.2 — salió de la sobreventa con el precio en mínimos: divergencia, vale con un cierre sobre 0.4441 y volumen, se cancela con un cierre bajo 0.4228. Bajo 20 en 0.405 con $70M+, la capitulación. <b>MACD:</b> el histograma se achica por octava sesión con el precio en mínimos — la misma divergencia; sola, no es señal. <b>Octubre:</b> primer pago de preconfs al treasury y primer buyback JIP-38 — si salen y el precio no recupera 0.4814, el mercado les asignó cero. <b>Beta:</b> −2.8% vs SOL −4.0% en la semana (0.7×, la primera semana de octubre bajo 1×), +2.6% vs −0.5% en vivo: la beta se comprimió porque la semana ya no incluye la ruptura, no porque haya compradores.',
    decision: [
      'Con posición: <b>el stop se cumplió — 0.4488 se cerró el 24 Oct (0.4441)</b> y desde ahí el precio hizo dos cierres más abajo (0.434, 0.4228): lo que quedaba después de reducir en 0.4814 salió ahí, y el 21 Oct fue el barrido. Si todavía tenés, no se repone en 0.43 porque el RSI divergió: cero de siete, cuatro medias cayendo encima y 0.405 a 4% sin nada en el medio. La única razón para tener JTO hoy es octubre on-chain verificado, y no lo está.',
      'Sin posición: <b>nada</b>. La watchlist empieza en 0.405 con volumen de capitulación ($70M+), RSI bajo 20 y vela de rechazo — 25% del tamaño, stop en el cierre bajo 0.405. La entrada por fuerza es el cierre sobre 0.4814 con $33M+ y el pago de BAM confirmado. Comprar 0.42–0.44 porque cayó menos que SOL esta semana es comprar un triángulo resuelto abajo con cero de siete y $18M de volumen.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.4814</b> (techo del rebote del 21 Oct; la EMA20 en 0.4728 y la línea en 0.454 se recuperan en el camino) con volumen sobre $33M → 0.4945 (EMA50) → 0.5035 (mínimo del 9 Oct) → 0.5331 (línea superior).',
    ],
    invalidation: { level: 0.4814, text: 'Cierre diario sobre 0.4814 (cierre del 21 Oct, el techo del rebote que duró una sesión; la EMA20 en 0.4728 y la línea inferior en 0.454 se recuperan en el camino) con volumen sobre $33M anula el path bajista: la segunda ruptura del 24 Oct fue un barrido y el triángulo vuelve a lateral → 0.4945 (EMA50), 0.5035 (mínimo del 9 Oct) y 0.5331 (línea superior del triángulo).' },
    path: [
      { d: 30, h: '+1M', target: 0.405, how: 'Línea perdida de vuelta (0.4441 el 24 Oct) y el mínimo de 30 días confirmado al cierre (0.4228 el 26 Oct) → mínimo del 5 Sep, a 4.2%, sin un nivel en el medio. Si cierra sobre 0.4814 con $33M+, el +1M es lateral 0.454–0.5035 hasta que la EMA50 decida.' },
      { d: 90, h: '+3M', target: 0.337, how: 'Mínimo de fines de abril (0.3386), el último escalón antes del origen: el triángulo resuelto abajo con el retest de 0.405 fallido. Con el Q3 report mostrando client share estabilizado, tips recuperando y el buyback pesando, el +3M vuelve a 0.4814 desde abajo.' },
      { d: 365, h: '+1Y', target: 0.26, how: 'Mínimo del 4 Abr, el origen del triángulo: el escenario en que el client share sigue cayendo y el buyback no alcanza (la medida completa, 0.234, queda debajo). Con BAM pagando al treasury trimestre tras trimestre, el +1Y recupera las EMAs de hoy (0.47–0.52).' },
    ],
    levels: {
      resistance: [[0.4419, 'Cierre 19 Oct · mínimo de la primera ruptura · perdido al cierre el 26 Oct'], [0.4441, 'Cierre 24 Oct · segunda ruptura de la línea'], [0.4465, 'Cierre 20 Oct · retest'], [0.454, 'Línea inferior del triángulo · rota el 19 Oct, recuperada el 21, rota de vuelta el 24 Oct — ahora techo'], [0.4728, 'EMA20 — ya debajo de la invalidación'], [0.4738, 'Cierre 16 Oct'], [0.4814, 'INVALIDACIÓN bajista · cierre 21 Oct · techo del rebote'], [0.4945, 'EMA50'], [0.5035, 'Mínimo 9 Oct · invalidación vieja'], [0.5094, 'EMA100'], [0.5221, 'EMA200 — cayendo'], [0.5331, 'Línea superior del triángulo'], [0.5359, 'Cierre 14 Oct'], [0.6013, 'Máximo 27 Sep']],
      support: [[0.4337, 'Hoy · el precio está acá'], [0.4228, 'Cierre 26 Oct · mínimo de 30 días'], [0.405, 'Mínimo 5 Sep · +1M · ahí empieza la watchlist'], [0.3386, 'Mínimo de fines de abril · +3M'], [0.26, 'Mínimo 4 Abr · origen del triángulo · +1Y'], [0.234, 'Medida del triángulo'], [0.2181, 'ATL · 5 Feb']],
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
