import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jto', name: 'Jito', symbol: 'JTO', cgId: 'jito-governance-token', host: 'mercados.10am.pro/jto',
  sector: 'Solana MEV & liquid staking',
  tagline: 'MEV tips, JitoSOL TVL y revenue real — ¿el token captura lo que la red genera?',
  description: 'Jito ($JTO) en vivo: tips MEV, TVL de JitoSOL, fees y revenue del protocolo, supply overhang on-chain, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'accumulate-on-weakness', reviewed: '20 Oct 2026',
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
    updated: '20 Oct 2026', bias: 'BEAR',
    read: 'El retest de la línea se imprimió como falla al cierre y hoy la pasa intradía. El 20 Oct cerró 0.4465 — +1% en el día, el primer cierre verde desde el 14 Oct, y 0.3% debajo de la línea inferior del triángulo (0.4477 ese día, 0.4478 hoy): el precio tocó la línea desde abajo y no la recuperó. Hoy 0.4598, +4.1%, 2.7% arriba de la línea en el intradía — el rebote técnico que la lectura del 19 Oct daba por probable con RSI 28 llegó, y llegó justo a la zona de reducir (0.4478–0.4738). Lo que lo separa de un barrido es el cierre: recuperar la línea al cierre con volumen sobre $33M convierte la ruptura del 19 Oct en falsa y el sesgo vuelve a lateral; cerrar de vuelta debajo con este volumen es la línea actuando de techo. Y el volumen no está: $21.3M, 66% del promedio de 20 días ($32.2M), menos que el día de la ruptura (78%) — un rebote con dos tercios del volumen desde un nivel recién roto es cobertura de cortos, no demanda. Cero de siete por cuarta revisión: las cuatro EMAs apiladas en 0.4957–0.5262, 8% a 14% arriba, la 200 girando para abajo (−0.6% en 20 días) y el MACD negativo, con el histograma achicándose por primera vez. RSI 35.7, de vuelta sobre 30 desde 27.9: la sobreventa duró dos sesiones y se gastó en el rebote, que es lo que hace la sobreventa en una tendencia bajista. Relativo: −12.4% en siete días con SOL −2.3%, 5.5× el mercado — peor que ayer (3.4×), porque SOL dejó de caer y JTO no; solo MET y 2Z cayeron más en términos relativos. Un triángulo que rompe por abajo, retesta la línea en dos sesiones y no la recupera al cierre es el patrón confirmándose; el rebote de hoy es la segunda oportunidad de salir, no la primera señal de piso. Octubre on-chain — pago de BAM al treasury, buyback JIP-38 — sigue siendo lo único que puede cambiar esto, y 0.405 sigue siendo el primer escalón abajo.',
    pattern: '<b>Triángulo de 8 meses resuelto por abajo (cierre del 19 Oct), en retest de la línea.</b> Máximos decrecientes 0.817 (29 Jun) → 0.652 (22 Ago) → 0.6013 (27 Sep) → 0.5828 (6 Oct), línea hoy en 0.55; mínimos crecientes 0.26 (4 Abr) → 0.405 (5 Sep), línea en 0.4478. Dos fallas en la línea superior (27 Sep, 12 Oct), una en las EMAs (14 Oct), el último mínimo interno perdido (15 Oct), seis cierres seguidos en mínimos de 30 días, el 19 Oct (0.4419) el primero debajo de la línea inferior y el 20 Oct (0.4465) el retest desde abajo que no la recuperó. Hoy 0.4598 la pasa intradía con dos tercios del volumen: hasta el cierre es un rebote dentro del retest. Un triángulo que rompe la línea inferior a un mes del apex (19 Nov), la retesta sin volumen y la pierde de vuelta resuelve por abajo: la medida del patrón (0.234) es el objetivo formal; los escalones son 0.405 (5 Sep), 0.337 (mínimo de 180 días) y 0.26 (origen). Un cierre sobre 0.4478 con $33M+ es un barrido y el patrón vuelve a lateral.',
    watch: '<b>0.4478 y 0.405.</b> Arriba: la línea rota (0.4478 hoy) — el precio está 2.7% arriba intradía; el cierre de hoy decide: sobre la línea con volumen sobre $33M convierte la ruptura en barrido y el sesgo vuelve a lateral; sobre la línea con $20M es un rebote dentro del retest y se reduce; debajo, la línea actuó de techo y 0.405 sigue abierto. El que anula el sesgo bajista es el cierre sobre 0.5035 (mínimo del 9 Oct, con la EMA20 en 0.4957 debajo). Abajo: 0.405 (mínimo del 5 Sep) es el +1M y no hay nada en el medio; un cierre debajo abre 0.337. <b>Volumen:</b> $21.3M, 66% del promedio — el rebote vino con menos volumen que la ruptura; si 0.405 llega con $70M+ es capitulación y ahí empieza la watchlist. <b>RSI:</b> 35.7, de vuelta sobre 30 — la sobreventa se gastó en el rebote; bajo 20 con vela de rechazo en 0.405 es la primera señal de piso. <b>MACD:</b> el histograma se achicó una sesión; vale solo si el cierre recupera la línea. <b>Octubre:</b> primer pago de preconfs al treasury y primer buyback JIP-38 — si salen y el precio no recupera 0.5035, el mercado les asignó cero. <b>Beta:</b> 5.5× SOL esta semana, peor que ayer: SOL dejó de caer y JTO no.',
    decision: [
      'Con posición: <b>reducir acá — el rebote a 0.4478–0.4738 llegó</b> (0.4598 hoy, la línea rota y el mínimo del 16 Oct) y vino con dos tercios del volumen: es la salida que la lectura del 19 Oct pedía, no la vuelta. Lo que quede, con stop en el cierre bajo 0.405: ahí el escalón del 5 Sep cedió y el siguiente nivel es 0.337.',
      'Sin posición: <b>nada</b>. Un cierre sobre 0.4478 con $33M+ cambia el patrón a lateral, no a alcista — tampoco es compra. La watchlist empieza en 0.405 (mínimo del 5 Sep) con volumen de capitulación ($70M+) y RSI bajo 20; la entrada por fuerza es el cierre sobre 0.5035 con volumen y octubre on-chain verificado. Comprar el rebote del retest porque "recuperó la línea intradía" es comprar con $21M lo que se rompió con $26M.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.5035</b> (mínimo del 9 Oct, con la EMA20 en 0.4957 debajo) con volumen sobre el promedio → 0.5074 (EMA50) → 0.5359 (cierre 14 Oct) → 0.55 (línea superior).',
    ],
    invalidation: { level: 0.5035, text: 'Cierre diario sobre 0.5035 (mínimo del 9 Oct, el piso perdido del 15 Oct, con la EMA20 en 0.4957 debajo) anula el path bajista: la ruptura de la línea inferior del 19 Oct queda como un barrido → 0.5074 (EMA50), 0.5359 (cierre del 14 Oct) y 0.55 (línea superior del triángulo).' },
    path: [
      { d: 30, h: '+1M', target: 0.405, how: 'Línea inferior perdida al cierre (0.4419 el 19 Oct), retestada desde abajo el 20 Oct (0.4465) sin recuperarla, rebote intradía con dos tercios del volumen → mínimo del 5 Sep. Si la línea se recupera al cierre con vela de rechazo y $70M+, el +1M es 0.4478–0.4738 hasta que las EMAs decidan.' },
      { d: 90, h: '+3M', target: 0.337, how: 'Mínimo de 180 días (0.3378): el triángulo resuelto abajo con el retest de 0.405 fallido. Con el Q3 report mostrando client share estabilizado, tips recuperando y el buyback pesando, el +3M vuelve a 0.4478 desde abajo.' },
      { d: 365, h: '+1Y', target: 0.26, how: 'Mínimo del 4 Abr, el origen del triángulo: el escenario en que el client share sigue cayendo y el buyback no alcanza (la medida completa, 0.234, queda debajo). Con BAM pagando al treasury trimestre tras trimestre, el +1Y recupera las EMAs de hoy (0.50–0.53).' },
    ],
    levels: {
      resistance: [[0.4465, 'Cierre 20 Oct · retest de la línea desde abajo, fallido'], [0.4478, 'Línea inferior del triángulo · rota el 19 Oct — ahora techo · el precio la pasa intradía hoy'], [0.4672, 'Cierre 17 Oct'], [0.4738, 'Cierre 16 Oct · techo del rebote · zona de reducir'], [0.4957, 'EMA20'], [0.50, 'Invalidación vieja'], [0.5035, 'INVALIDACIÓN bajista · mínimo 9 Oct'], [0.5074, 'EMA50'], [0.5172, 'EMA100'], [0.5262, 'EMA200 — girando abajo'], [0.5359, 'Cierre 14 Oct'], [0.55, 'Línea superior del triángulo'], [0.6013, 'Máximo 27 Sep']],
      support: [[0.4419, 'Cierre 19 Oct · el día de la resolución · mínimo de la caída'], [0.405, 'Mínimo 5 Sep · +1M · ahí empieza la watchlist'], [0.337, 'Mínimo de 180 días · +3M'], [0.26, 'Mínimo 4 Abr · origen del triángulo · +1Y'], [0.234, 'Medida del triángulo'], [0.2181, 'ATL · 5 Feb']],
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
