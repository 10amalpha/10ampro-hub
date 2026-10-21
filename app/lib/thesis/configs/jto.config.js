import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jto', name: 'Jito', symbol: 'JTO', cgId: 'jito-governance-token', host: 'mercados.10am.pro/jto',
  sector: 'Solana MEV & liquid staking',
  tagline: 'MEV tips, JitoSOL TVL y revenue real — ¿el token captura lo que la red genera?',
  description: 'Jito ($JTO) en vivo: tips MEV, TVL de JitoSOL, fees y revenue del protocolo, supply overhang on-chain, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'accumulate-on-weakness', reviewed: '21 Oct 2026',
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
    updated: '21 Oct 2026', bias: 'BEAR',
    read: 'La línea se recuperó al cierre, con el volumen justo debajo del que pedía. El 21 Oct cerró 0.4814 — +7.8%, el día verde más grande desde el 14 Oct — 7% arriba de la línea inferior del triángulo (0.4488 hoy) y sobre 0.4738, el techo de la zona de reducir que la lectura del 20 Oct ponía: el retest desde abajo que el 20 Oct falló por 0.3% se resolvió para arriba en la vela siguiente. Hoy 0.479, −0.5%, sosteniendo. El volumen fue $30.3M, 93% del promedio de 20 días ($32.6M): la lectura pedía $33M para llamar barrido a la ruptura del 19 Oct; faltaron $2.7M. Con eso no se la llama confirmada ni barrida: la línea se perdió dos cierres (0.4419 y 0.4465, el retest fallido por nada) y se recuperó con volumen casi promedio — el triángulo deja de estar resuelto y vuelve a ser lateral, entre la línea (0.4488) y las EMAs. Y las EMAs son el techo: la 20 en 0.4959 (3% arriba), la 50 en 0.5071, la 100 en 0.5168, la 200 en 0.5243 cayendo — cero de siete por quinta revisión, nada de esto cambió con un día. RSI 39.4, desde 35.7: la sobreventa del 18–19 Oct (27.8) está gastada y el oscilador sigue debajo de 50. El histograma del MACD se achica por segunda sesión. Relativo: −8.2% en siete días con SOL −0.2% — el peor múltiplo de la página esta semana junto con 2Z, porque SOL dejó de caer hace una semana y JTO recién ayer; en el día, +7.8% con SOL +1.3%, el primer día de demanda propia desde que empezó la caída, y uno solo. Lo que cambió: la línea aguantó al cierre y el +1M (0.405) queda sin camino directo mientras el precio esté arriba de 0.4488. Lo que no cambió: cuatro medias encima, cero de siete, 0.5035 a 4.6% y octubre on-chain — pago de BAM al treasury, buyback JIP-38 — todavía sin verificar. Un rebote de +8% con el 93% del volumen que llega a 3% de la EMA20 es la segunda salida que la lectura del 19 Oct pedía, no la vuelta; la vuelta se escribe con el cierre sobre 0.5035.',
    pattern: '<b>Triángulo de 8 meses, ruptura del 19 Oct recuperada al cierre del 21 Oct — lateral de vuelta.</b> Máximos decrecientes 0.817 (29 Jun) → 0.652 (22 Ago) → 0.6013 (27 Sep) → 0.5828 (6 Oct), línea hoy en 0.5461; mínimos crecientes 0.26 (4 Abr) → 0.405 (5 Sep), línea en 0.4488. Dos fallas en la línea superior (27 Sep, 12 Oct), una en las EMAs (14 Oct), seis cierres seguidos en mínimos de 30 días hasta 0.4419 (19 Oct), el primero debajo de la línea inferior; el 20 Oct (0.4465) el retest desde abajo que no la recuperó por 0.3%; el 21 Oct (0.4814, +7.8%, 93% del volumen promedio) de vuelta adentro. Una ruptura que dura dos cierres y se recupera con volumen casi promedio no resuelve el patrón: lo deja lateral a un mes del apex (19 Nov), con la línea inferior (0.4488) como piso y las EMAs (0.4959–0.5243) como techo. La medida del patrón (0.234) sigue siendo el objetivo formal si la línea se pierde de vuelta; los escalones son 0.405 (5 Sep), 0.337 (mínimo de 180 días) y 0.26 (origen). Un cierre sobre 0.5035 con volumen devuelve el sesgo a lateral-alcista dentro del triángulo; uno sobre 0.5461 lo resuelve arriba.',
    watch: '<b>0.4959 y 0.4488.</b> Arriba: la EMA20 (0.4959) es el primer techo, 3% arriba; el que anula el sesgo bajista es el cierre sobre 0.5035 (mínimo del 9 Oct) con volumen sobre $33M — con $30M es el rebote llegando a la media. Abajo: perder 0.4488 de vuelta al cierre convierte el 21 Oct en el barrido y reabre 0.405 directo; 0.4465–0.4419 (los cierres del retest y la ruptura) son el stop del rebote. <b>Volumen:</b> $30.3M, 93% del promedio — faltaron $2.7M para el barrido; dos cierres más sobre la línea con $33M+ lo valen igual; si 0.405 llega con $70M+ es capitulación y ahí empieza la watchlist. <b>RSI:</b> 39.4 — sin sobreventa ni fuerza; sobre 50 con el precio sobre 0.5035 es la primera señal de piso. <b>MACD:</b> el histograma se achica dos sesiones; gira positivo solo si el precio pasa la EMA20. <b>Octubre:</b> primer pago de preconfs al treasury y primer buyback JIP-38 — si salen y el precio no recupera 0.5035, el mercado les asignó cero. <b>Beta:</b> −8.2% vs SOL −0.2% en la semana, pero +7.8% con SOL +1.3% en el día: un día propio; hacen falta dos o tres.',
    decision: [
      'Con posición: <b>reducir acá — el rebote pasó la zona (0.4478–0.4738) y llegó a 0.4814</b> con el 93% del volumen: es la segunda salida que la lectura del 19 Oct pedía. Lo que quede, con stop en el cierre bajo 0.4488 (línea recuperada): ahí el 21 Oct fue el barrido y 0.405 vuelve a estar abierto.',
      'Sin posición: <b>nada</b>. La línea recuperada deja el triángulo lateral, no alcista — cuatro medias encima y cero de siete. La watchlist sigue en 0.405 con volumen de capitulación ($70M+) y RSI bajo 20; la entrada por fuerza es el cierre sobre 0.5035 con $33M+ y octubre on-chain verificado. Comprar 0.48 porque "recuperó la línea" es comprar a 3% de la EMA20 lo que tiene cuatro medias cayendo encima.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.5035</b> (mínimo del 9 Oct, con la EMA20 en 0.4959 debajo) con volumen sobre $33M → 0.5071 (EMA50) → 0.5359 (cierre 14 Oct) → 0.5461 (línea superior).',
    ],
    invalidation: { level: 0.5035, text: 'Cierre diario sobre 0.5035 (mínimo del 9 Oct, el piso perdido del 15 Oct, con la EMA20 en 0.4959 debajo) anula el path bajista: la ruptura del 19 Oct queda como un barrido y el triángulo vuelve a lateral-alcista → 0.5071 (EMA50), 0.5359 (cierre del 14 Oct) y 0.5461 (línea superior del triángulo).' },
    path: [
      { d: 30, h: '+1M', target: 0.405, how: 'Rebote a 0.4814–0.4959 (cierre del 21 Oct y EMA20) que falla → línea (0.4488) perdida de vuelta → mínimo del 5 Sep. Si la EMA20 se recupera al cierre con $33M+, el +1M es lateral 0.4488–0.5035 hasta que la 50 decida.' },
      { d: 90, h: '+3M', target: 0.337, how: 'Mínimo de 180 días (0.3378): el triángulo resuelto abajo con el retest de 0.405 fallido. Con el Q3 report mostrando client share estabilizado, tips recuperando y el buyback pesando, el +3M vuelve a 0.5035 desde abajo.' },
      { d: 365, h: '+1Y', target: 0.26, how: 'Mínimo del 4 Abr, el origen del triángulo: el escenario en que el client share sigue cayendo y el buyback no alcanza (la medida completa, 0.234, queda debajo). Con BAM pagando al treasury trimestre tras trimestre, el +1Y recupera las EMAs de hoy (0.50–0.52).' },
    ],
    levels: {
      resistance: [[0.4959, 'EMA20 — primer techo del rebote'], [0.50, 'Invalidación vieja'], [0.5035, 'INVALIDACIÓN bajista · mínimo 9 Oct'], [0.5071, 'EMA50'], [0.5168, 'EMA100'], [0.5243, 'EMA200 — cayendo'], [0.5359, 'Cierre 14 Oct'], [0.5461, 'Línea superior del triángulo'], [0.6013, 'Máximo 27 Sep']],
      support: [[0.4814, 'Cierre 21 Oct · techo del rebote · 93% del volumen'], [0.4738, 'Cierre 16 Oct · techo viejo de la zona de reducir'], [0.4488, 'Línea inferior del triángulo · rota el 19 Oct, recuperada el 21 Oct · stop del rebote'], [0.4465, 'Cierre 20 Oct · retest'], [0.4419, 'Cierre 19 Oct · mínimo de la caída'], [0.405, 'Mínimo 5 Sep · +1M · ahí empieza la watchlist'], [0.337, 'Mínimo de 180 días · +3M'], [0.26, 'Mínimo 4 Abr · origen del triángulo · +1Y'], [0.234, 'Medida del triángulo'], [0.2181, 'ATL · 5 Feb']],
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
