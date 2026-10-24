import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'jto', name: 'Jito', symbol: 'JTO', cgId: 'jito-governance-token', host: 'mercados.10am.pro/jto',
  sector: 'Solana MEV & liquid staking',
  tagline: 'MEV tips, JitoSOL TVL y revenue real — ¿el token captura lo que la red genera?',
  description: 'Jito ($JTO) en vivo: tips MEV, TVL de JitoSOL, fees y revenue del protocolo, supply overhang on-chain, TA con forecast y tripwires de la tesis. 10AMPRO.',
  stance: 'accumulate-on-weakness', reviewed: '24 Oct 2026',
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
    updated: '24 Oct 2026', bias: 'BEAR',
    read: 'La línea se perdió de vuelta al cierre y el 21 Oct quedó como el barrido. El 24 Oct cerró 0.4441 — −3.6%, tercer cierre rojo seguido desde 0.4814 — 1.7% debajo de la línea inferior del triángulo (0.4517 hoy) y debajo de 0.4488, el stop del rebote que la lectura del 21 Oct dejaba escrito: se cumplió. Hoy 0.4246, −4.4%: debajo de 0.4419 (cierre del 19 Oct, el mínimo de la primera ruptura) — mínimo de 30 días en vivo, 6% bajo la línea. El rebote del 21 Oct (+7.8% con el 93% del volumen) duró exactamente una sesión sobre la línea y devolvió 12% en tres: era la segunda salida, como decía la lectura, no la vuelta. Volumen $20.8M, 66% del promedio de 20 días ($31.7M): la segunda ruptura de la línea vino con menos volumen que la primera (78% el 19 Oct) — nadie compra y nadie necesita vender con tamaño; el promedio de 20 días está en el 98% del de 90, plano. Cero de siete por sexta revisión: las cuatro medias encima y cayendo — la 20 en 0.4817 (13% arriba), la 50 en 0.4997, la 100 en 0.5125, la 200 en 0.5234 (−1.3% en 20 días). RSI 28.1, desde 39.5 — cruzó bajo 30 por segunda vez en dos semanas; la primera (27.8, 18–19 Oct) dio el rebote a 0.4814 que murió a 3% de la EMA20. El histograma del MACD sigue negativo y achicándose — por la velocidad de la caída, no por compras. Relativo: −7.0% en siete días con SOL −3.4%, 2.1×; en el día −7.8% con SOL −4.0%, 2×: el día propio del 21 Oct fue uno, como la lectura decía, y JTO vuelve al múltiplo de siempre. Lo que cambió: la línea se perdió por segunda vez en cinco sesiones y el mínimo del 19 Oct se pasó en vivo — una línea rota dos veces dejó de ser línea; el +1M (0.405) tiene camino directo, a 4.6%. Lo que no cambió: cero de siete, el volumen que no aparece en ninguna dirección y octubre on-chain — pago de BAM al treasury, buyback JIP-38 — sin verificar. La invalidación baja de 0.5035 a 0.4814: el techo del rebote del 21 Oct, con la EMA20 (0.4817) pegada — el nivel que un rebote tiene que recuperar para que la segunda ruptura haya sido un barrido; 0.5035 quedó a 18% y ya no gobierna nada.',
    pattern: '<b>Triángulo de 8 meses resuelto abajo: línea inferior rota el 19 Oct, recuperada el 21 Oct, rota de vuelta el 24 Oct.</b> Máximos decrecientes 0.817 (29 Jun) → 0.652 (22 Ago) → 0.6013 (27 Sep) → 0.5828 (6 Oct), línea hoy en 0.5388; mínimos crecientes 0.26 (4 Abr) → 0.405 (5 Sep), línea en 0.4517. Dos fallas en la línea superior (27 Sep, 12 Oct), una en las EMAs (14 Oct), seis cierres en mínimos de 30 días hasta 0.4419 (19 Oct) bajo la línea, el retest fallido por 0.3% (20 Oct), la recuperación de un día (0.4814, 21 Oct, 93% del volumen) y tres cierres rojos hasta 0.4441 (24 Oct), 1.7% bajo la línea; hoy 0.4246, mínimo de 30 días en vivo. Una línea que se rompe dos veces en cinco sesiones con el volumen bajando dejó de sostener: el patrón está resuelto abajo a cuatro semanas del apex (19 Nov), y los escalones son 0.405 (5 Sep), 0.337 (mínimo de 180 días) y 0.26 (origen); la medida completa (0.234) queda debajo. Arriba, 0.4517 (la línea, desde abajo) es el primer techo, 0.4814 (techo del rebote = EMA20) el que anula el sesgo; las otras tres medias (0.4997–0.5234) encima.',
    watch: '<b>0.405 y 0.4517.</b> Abajo: 0.405 (mínimo del 5 Sep, el +1M) está a 4.6% — con $70M+ y vela de rechazo es la capitulación donde empieza la watchlist; sin volumen es un escalón más hacia 0.337. Arriba: la línea (0.4517) desde abajo es el primer techo, 6% arriba; el que anula el sesgo bajista es el cierre sobre 0.4814 (techo del rebote del 21 Oct = EMA20) con volumen sobre $33M — ahí la segunda ruptura fue un barrido. <b>Volumen:</b> $20.8M, 66% del promedio — la segunda ruptura con menos volumen que la primera; el patrón se resolvió por abandono, no por venta. <b>RSI:</b> 28.1 — segunda sobreventa en dos semanas; la primera dio un rebote de un día. Sobre 50 con el precio sobre 0.4814 es la primera señal de piso; bajo 20 en 0.405 con $70M+, la capitulación. <b>MACD:</b> el histograma se achica con el precio en mínimos — divergencia; vale solo con un cierre sobre 0.4517 y volumen. <b>Octubre:</b> primer pago de preconfs al treasury y primer buyback JIP-38 — si salen y el precio no recupera 0.4814, el mercado les asignó cero. <b>Beta:</b> −7.0% vs SOL −3.4% en la semana, −7.8% vs −4.0% en el día: 2× el mercado, sin días propios desde el 21 Oct.',
    decision: [
      'Con posición: <b>el stop se cumplió — 0.4488 se cerró el 24 Oct (0.4441)</b>: lo que quedaba después de reducir en 0.4814 salió ahí, y el 21 Oct fue el barrido. Si todavía tenés, no se repone en 0.42 porque ya cayó 12%: cero de siete, cuatro medias cayendo encima y 0.405 a 4.6% sin nada en el medio. La única razón para tener JTO hoy es octubre on-chain verificado, y no lo está.',
      'Sin posición: <b>nada</b>. La watchlist empieza en 0.405 con volumen de capitulación ($70M+), RSI bajo 20 y vela de rechazo — 25% del tamaño, stop en el cierre bajo 0.405. La entrada por fuerza es el cierre sobre 0.4814 con $33M+ y el pago de BAM confirmado. Comprar 0.42–0.44 porque está bajo la línea es comprar un triángulo resuelto abajo con cero de siete.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.4814</b> (techo del rebote del 21 Oct, con la EMA20 en 0.4817 pegada) con volumen sobre $33M → 0.4997 (EMA50) → 0.5035 (mínimo del 9 Oct) → 0.5388 (línea superior).',
    ],
    invalidation: { level: 0.4814, text: 'Cierre diario sobre 0.4814 (cierre del 21 Oct, el techo del rebote que duró una sesión; la EMA20 en 0.4817 está pegada y la línea inferior en 0.4517 se recupera en el camino) con volumen sobre $33M anula el path bajista: la segunda ruptura del 24 Oct fue un barrido y el triángulo vuelve a lateral → 0.4997 (EMA50), 0.5035 (mínimo del 9 Oct) y 0.5388 (línea superior del triángulo).' },
    path: [
      { d: 30, h: '+1M', target: 0.405, how: 'Línea perdida de vuelta (0.4441 el 24 Oct) y el mínimo del 19 Oct pasado en vivo → mínimo del 5 Sep, a 4.6%, sin un nivel en el medio. Si cierra sobre 0.4814 con $33M+, el +1M es lateral 0.4517–0.5035 hasta que la EMA50 decida.' },
      { d: 90, h: '+3M', target: 0.337, how: 'Mínimo de 180 días (0.3386): el triángulo resuelto abajo con el retest de 0.405 fallido. Con el Q3 report mostrando client share estabilizado, tips recuperando y el buyback pesando, el +3M vuelve a 0.4814 desde abajo.' },
      { d: 365, h: '+1Y', target: 0.26, how: 'Mínimo del 4 Abr, el origen del triángulo: el escenario en que el client share sigue cayendo y el buyback no alcanza (la medida completa, 0.234, queda debajo). Con BAM pagando al treasury trimestre tras trimestre, el +1Y recupera las EMAs de hoy (0.48–0.52).' },
    ],
    levels: {
      resistance: [[0.4419, 'Cierre 19 Oct · mínimo de la primera ruptura · pasado en vivo el 24 Oct'], [0.4441, 'Cierre 24 Oct · segunda ruptura de la línea'], [0.4465, 'Cierre 20 Oct · retest'], [0.4517, 'Línea inferior del triángulo · rota el 19 Oct, recuperada el 21, rota de vuelta el 24 Oct — ahora techo'], [0.4738, 'Cierre 16 Oct'], [0.4814, 'INVALIDACIÓN bajista · cierre 21 Oct · techo del rebote = EMA20 (0.4817)'], [0.4997, 'EMA50'], [0.5035, 'Mínimo 9 Oct · invalidación vieja'], [0.5125, 'EMA100'], [0.5234, 'EMA200 — cayendo'], [0.5359, 'Cierre 14 Oct'], [0.5388, 'Línea superior del triángulo'], [0.6013, 'Máximo 27 Sep']],
      support: [[0.4246, 'Hoy · mínimo de 30 días · el precio está acá'], [0.405, 'Mínimo 5 Sep · +1M · ahí empieza la watchlist'], [0.3386, 'Mínimo de 180 días · +3M'], [0.26, 'Mínimo 4 Abr · origen del triángulo · +1Y'], [0.234, 'Medida del triángulo'], [0.2181, 'ATL · 5 Feb']],
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
