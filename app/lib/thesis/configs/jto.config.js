import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jto', name: 'Jito', symbol: 'JTO', cgId: 'jito-governance-token', host: 'mercados.10am.pro/jto',
  sector: 'Solana MEV & liquid staking',
  tagline: 'MEV tips, JitoSOL TVL y revenue real — ¿el token captura lo que la red genera?',
  description: 'Jito ($JTO) en vivo: tips MEV, TVL de JitoSOL, fees y revenue del protocolo, supply overhang on-chain, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'accumulate-on-weakness', reviewed: '11 Oct 2026',
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
    updated: '11 Oct 2026', bias: 'BULL',
    read: 'Lo que pedíamos el 22 Sep pasó y no pasó. Cerró sobre 0.556 el 27 Sep (0.6013 — el +1M cumplido en cinco días) y no lo sostuvo: volvió adentro del triángulo, tocó 0.5037 el 9 Oct y recuperó las tres EMAs en dos sesiones. Hoy 0.553, exactamente la banda de hace tres semanas. Lo nuevo y lo que importa: la EMA200 dejó de caer. 0.528 y subiendo (+0.7% en 20 días) por primera vez desde el mínimo de febrero, con las tres EMAs apiladas en 0.522–0.534 — una compresión que este chart no tenía desde el verano. Cuatro de siete (sobre las tres EMAs, la 200 girando), RSI 43, MACD en cero y apuntando arriba. Beta: la semana fue 0% con SOL −8% — la primera vez en meses que JTO no cae con el mercado. O es la base de algo, o es el mercado esperando los dos datos de octubre: el pago de BAM al treasury y el buyback JIP-38 on-chain. Hasta que estén visibles, el chart está solo y lateral.',
    pattern: '<b>Triángulo de 8 meses, apex el 18 Nov, con un falso break arriba</b> (0.6013 el 27 Sep) que no se convirtió en falso break abajo. Máximos decrecientes 0.817 (29 Jun) → 0.652 (22 Ago) → 0.6013 (27 Sep), línea hoy en 0.566; mínimos crecientes 0.26 (4 Abr) → 0.405 (5 Sep), línea en ~0.44. El precio está al 55% del rango con las EMAs planas y apiladas: el apex queda a cinco semanas y ese es el plazo de resolución — un triángulo que llega al apex sin resolverse se resuelve mal.',
    watch: '<b>0.566 y 0.5037.</b> Arriba: cierre sobre 0.566 (la línea) con 2× volumen, y esta vez sostenido tres sesiones — el del 27 Sep duró una. Abajo: perder 0.5037 (mínimo del 9 Oct) deshace la compresión y la 200 vuelve a caer. <b>Volumen:</b> 119% del 90d en el promedio, pero $26M hoy, el más bajo del mes — un triángulo que se seca cerca del apex es normal; lo que cuenta es el volumen del día de salida. <b>Octubre:</b> primer pago de preconfs al treasury y primer buyback JIP-38. El chart debería anticiparlos; hoy no anticipa nada. <b>Beta:</b> si SOL rebota y JTO no rompe 0.566, la semana de resistencia relativa fue ruido.',
    decision: [
      'Con posición: <b>mantener; sumar en 0.50–0.52</b> (EMA50 + mínimo del 9 Oct) con el 0.405 intacto, o en el cierre sobre 0.566 sostenido tres días. No comprar 0.54–0.56 pegado a la línea.',
      'Sin posición: <b>esperar</b>. Mismo plan del 22 Sep, los niveles se corrieron tres centavos arriba: accumulate-on-weakness es 0.50–0.52, o la ruptura confirmada. El medio sigue sin pagar.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 0.50</b>. Ahí la compresión de las EMAs se resolvió para abajo → 0.44 (línea inferior) → 0.405.',
    ],
    invalidation: { level: 0.50, text: 'Cierre diario bajo 0.50 (pierde el mínimo del 9 Oct y las tres EMAs apiladas en 0.52–0.53) anula el path → 0.44 (trendline inferior del triángulo) y 0.405 (mínimo del 5 Sep).' },
    path: [
      { d: 30, h: '+1M', target: 0.60, how: 'Cierre sobre 0.566 sostenido → retest de 0.6013 (máximo del 27 Sep). Sin el cierre, el +1M es lateral 0.50–0.57 hasta el apex.' },
      { d: 90, h: '+3M', target: 0.652, how: 'Máximo del 22 Ago. Necesita octubre verificado on-chain: pago BAM al treasury y buyback JIP-38. Sin datos, el techo es 0.60.' },
      { d: 365, h: '+1Y', target: 0.79, how: 'Máximo del 7 Jul. Solo con client share estabilizado en el Q3 report y tips recuperando; la medida del triángulo (1.04) queda para un regime que hoy no existe.' },
    ],
    levels: {
      resistance: [[0.566, 'Trendline de máximos decrecientes · el trigger'], [0.5828, 'Cierre 6 Oct · máximo de la semana'], [0.6013, 'Máximo 27 Sep · el falso break'], [0.652, 'Máximo 22 Ago'], [0.79, 'Máximo 7 Jul'], [0.817, 'Máximo 29 Jun · primer toque']],
      support: [[0.534, 'EMA20'], [0.528, 'EMA200 — girando arriba'], [0.522, 'EMA50 · zona de sumar'], [0.5037, 'Mínimo 9 Oct'], [0.50, 'INVALIDACIÓN · compresión resuelta abajo'], [0.44, 'Trendline inferior del triángulo'], [0.405, 'Mínimo 5 Sep']],
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
