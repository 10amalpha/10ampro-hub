import { decisionBuilder, tw, fmt } from '../framework';

export const TOKEN = {
  slug: 'met', name: 'Meteora', symbol: 'MET', cgId: 'meteora', host: 'mercados.10am.pro/met',
  sector: 'Solana liquidity layer (DLMM / DAMM)',
  tagline: 'TVL, volumen y fees de la capa de liquidez — con buyback y 52% del supply todavía por emitir.',
  description: 'Meteora ($MET) en vivo: TVL, volumen DLMM/DAMM, fees y revenue, unlocks y buyback, supply overhang on-chain, TA con forecast y tripwires. 10AMPRO.',
  stance: 'hold-trim-at-0.50', reviewed: '24 Oct 2026',
  ta: {
    updated: '24 Oct 2026', bias: 'BEAR',
    read: 'El cuarto test de 0.33 se cerró, con margen. El 24 Oct cerró 0.3177 — −4.0%, el segundo cierre rojo desde el rebote fallido a la EMA20 (0.3579, 22 Oct) — 3.7% debajo de 0.33: la invalidación se cumplió al cierre y con margen real, no por un pelo; el gap del 8 Oct (0.3278 → 0.4447) está lleno al cierre y el sesgo pasa a bajista. Hoy 0.3087, −2.8%: debajo de la EMA50 (0.313), que era el stop de lo que quedaba — el cierre todavía no imprimió debajo (0.3177 está 1.5% arriba), en vivo sí. Tres sesiones desde 0.3579 devolvieron 14%; el rebote entero (0.3349 → 0.3579) tardó cuatro en subir 7%. Volumen $7.9M, 12% del promedio de 20 días ($63.7M) — el más bajo del mes por quinta vez: 0.33 cayó sin vendedores, como había aguantado sin compradores; el promedio de 20 días sigue 2.4× el de 90 porque los días del 8–10 Oct todavía están en la ventana, y cuando salgan el promedio real es un cuarto de ese. Tres de siete, desde cuatro: el precio perdió la EMA50 en vivo; quedan el precio sobre la 200 (0.24, +13% en 20 días), la 50 sobre la 200 y la 200 subiendo. RSI 15.7, desde 25.4 — el más bajo de la página hoy y el más bajo de MET desde junio: tres revisiones bajo 30, y esta vez con el precio cayendo 4% y 3% — sobreventa real, no el oscilador adelantado. El histograma del MACD sigue negativo y ampliándose. Relativo: −13.6% en siete días con SOL −3.4%, 4× — el peor múltiplo de la página esta semana junto con NOS, por segunda semana; en el día, −6.4% con SOL −4.0%, 1.6× — el día de la ruptura fue el menos malo de la semana, que es lo que pasa cuando ya no queda quién venda. Lo que cambió: la regla se cumplió — el 8 Oct fue un evento, no una tendencia — y la EMA50 se perdió en vivo el mismo día. Lo que no cambió: el volumen no existe, la wallet del buyback sigue sin ser auditable y 0.2942 (mínimo del 3 Oct, post-unlock) sigue siendo el único mínimo de la escalera que queda debajo antes de la EMA100. La invalidación bajista va a 0.3384: el cierre del 21 Oct, el más alto de los tres que aguantaron 0.33 — un cierre de vuelta encima deja el cuarto test como un barrido; la EMA20 (0.3449) está pegada arriba y es el primer techo después.',
    pattern: '<b>Tendencia alcista con mínimos crecientes desde junio; el gap del 8 Oct lleno al cierre (24 Oct), 0.33 cerrado en el cuarto test, la EMA50 perdida en vivo:</b> 0.0975 → 0.129 → 0.157 → 0.185 → 0.2942 (3 Oct). El gap (0.3278 → 0.4447) se devolvió el 83% al cierre del 18 Oct, se llenó intradía (0.3206), aguantó tres cierres sobre 0.33 (0.3349 / 0.3377 / 0.3384) con el 18% del volumen, rebotó a la EMA20 (0.3579, 22 Oct) con el 11% y devolvió todo en tres velas: 0.331 (23 Oct, a 0.001) y 0.3177 (24 Oct, −4.0%), el cierre bajo 0.33 con 3.7% de margen; hoy 0.3087 bajo la EMA50 (0.313). Un nivel que aguanta tres veces sin volumen y cae la cuarta sin volumen no fue un piso: fue un libro vacío que se quedó sin el último comprador. Lo que queda de la escalera de junio es 0.2942 (mínimo del 3 Oct, el último mínimo creciente) y la EMA100 (0.2674); debajo, 0.256 (meseta de septiembre) es el piso de la tesis. Arriba, 0.313–0.3278 (EMA50 + base del gap) es el primer techo, 0.33–0.3384 (el nivel perdido + los tres cierres que lo aguantaron) el que anula el sesgo, y la EMA20 (0.3449) el techo que vendió el rebote del 22 Oct.',
    watch: '<b>0.313 y 0.3384.</b> Abajo: la EMA50 (0.313) — en vivo ya debajo; el cierre bajo ella deja 0.2942 (mínimo del 3 Oct) a 6% sin un nivel en el medio, y con $50M+ llega rápido. Arriba: el cierre de vuelta sobre 0.3384 (cierre del 21 Oct, el techo de los tres que aguantaron 0.33, con la EMA20 en 0.3449 pegada) con $60M+ deja el cuarto test como un barrido y anula el sesgo bajista — con $7M es el rebote llegando al nivel perdido, y ahí se reduce. <b>Volumen:</b> $7.9M, 12% del promedio, el más bajo del mes por quinta vez — la ruptura sin volumen no es capitulación, es abandono; la capitulación es $200M con vela roja bajo 0.2942, y ahí empieza la watchlist. <b>RSI:</b> 15.7, tres revisiones bajo 30 y el más bajo desde junio — con el precio cayendo es sobreventa real; vale como señal solo con una vela verde con volumen desde 0.2942–0.313, no desde acá. <b>Relativo:</b> MET −13.6% vs SOL −3.4% en la semana (4×, el peor de la página con NOS por segunda semana) y −6.4% vs −4.0% en el día: beta en contra; ningún día propio desde el 8 Oct. <b>Buyback:</b> la wallet auditable sigue siendo lo único que convierte el 8 Oct en tesis; sin ella, el gap lleno es la foto completa.',
    decision: [
      'Con posición: <b>0.33 se cerró — la regla se cumplió; reducir en el rebote a 0.3278–0.3384, no acá</b>. Lo que quedaba tenía el stop en el cierre bajo 0.3137 (EMA50): el cierre no imprimió (0.3177) y en vivo está debajo — se escribe como cumplido y se ejecuta en el rebote a la base del gap (0.3278) y el nivel perdido (0.33–0.3384), o en el cierre bajo 0.313, lo que llegue primero. No se promedia en 0.31 porque el RSI marca 15: sin volumen no hay piso, hay niveles, y el siguiente es 0.2942.',
      'Sin posición: <b>nada</b>. La próxima entrada es el retest de 0.2942 (mínimo del 3 Oct, post-unlock) que aguante al cierre con vela de rechazo y $50M+, 25% del tamaño y el stop en el cierre bajo 0.2674 (EMA100) — o el cierre de vuelta sobre 0.3384 con $60M+ y la wallet del buyback auditada. Comprar 0.31 porque llenó el gap es comprar el quinto test de un nivel que ya cayó, con el volumen más bajo del mes.',
      'Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.3384</b> (cierre del 21 Oct, el techo de los tres cierres que aguantaron 0.33; la EMA20 en 0.3449 pegada arriba) con volumen sobre $60M → 0.3449 (EMA20) → 0.3579 (cierre 22 Oct) → 0.3809 (máximo 28 Sep).',
    ],
    invalidation: { level: 0.3384, text: 'Cierre diario sobre 0.3384 (cierre del 21 Oct, el más alto de los tres que aguantaron 0.33 antes del cuarto test; 0.33 y la base del gap en 0.3278 se recuperan en el camino, y la EMA20 en 0.3449 es el primer techo después) con volumen sobre $60M anula el path bajista: el cierre del 24 Oct bajo 0.33 fue un barrido y el gap del 8 Oct vuelve a defenderse → 0.3449 (EMA20), 0.3579 (cierre del 22 Oct) y 0.3809 (máximo del 28 Sep).' },
    path: [
      { d: 30, h: '+1M', target: 0.2942, how: 'Gap lleno al cierre (0.3177 el 24 Oct) y la EMA50 (0.313) perdida en vivo con el 12% del volumen → cierre bajo 0.313 → mínimo del 3 Oct, el último mínimo creciente de la escalera, a 5%. Si cierra sobre 0.3384 con $60M+, el +1M es la EMA20 (0.3449) y el sesgo vuelve a alcista.' },
      { d: 90, h: '+3M', target: 0.256, how: 'Meseta de septiembre, el piso de la tesis, con la EMA100 (0.2674) justo encima: el escenario de 0.2942 perdido con el revenue del sector contrayéndose y el buyback sin auditar. Con la wallet auditable y un buyback trimestral ejecutado, el +3M vuelve a 0.3384 desde abajo.' },
      { d: 365, h: '+1Y', target: 0.3809, how: 'Retest del máximo del 28 Sep, el techo que defendía el gap, desde abajo — con la EMA200 todavía subiendo. A un año el gap lleno es un evento devuelto dentro de la tendencia de junio si 0.256 aguanta; 0.4447 (máximo del 8 Oct) requiere dos buybacks consecutivos y el revenue del sector creciendo, y hoy no está ninguno.' },
    ],
    levels: {
      resistance: [[0.313, 'EMA50 · stop viejo · perdida en vivo el 24 Oct'], [0.3177, 'Cierre 24 Oct · el cierre bajo 0.33'], [0.3278, 'Cierre 7 Oct · base del gap — llena al cierre el 24 Oct'], [0.33, 'Invalidación vieja · cerrada el 24 Oct en el cuarto test'], [0.3349, 'Cierre 19 Oct'], [0.3384, 'INVALIDACIÓN bajista · cierre 21 Oct · techo de los tres cierres que aguantaron 0.33'], [0.3449, 'EMA20 — vendió el rebote del 22 Oct'], [0.3579, 'Cierre 22 Oct · techo del rebote'], [0.3809, 'Máximo 28 Sep · +1Y'], [0.4447, 'Máximo 8 Oct'], [0.50, 'Mitad de la caída Oct-Nov 25'], [0.687, 'ATH 23 Oct 25']],
      support: [[0.3087, 'Hoy · el precio está acá'], [0.2942, 'Mínimo 3 Oct · post-unlock · último mínimo creciente · +1M'], [0.2674, 'EMA100 · stop de la próxima entrada'], [0.256, 'Meseta de septiembre · piso de la tesis · +3M'], [0.24, 'EMA200 — subiendo 13%/20d'], [0.185, 'Mínimo 5 Sep']],
    },
  },
  sources: 'Network telemetry: DefiLlama (Meteora TVL, DEX volume, fees, revenue). Unlocks: Tokenomist via CoinGecko.',
  rule: 'revenue mensual <50% del pico + unlock mensual no absorbido en 72h = reducir; buyback trimestral ≥ unlocks del trimestre = mantener aunque el chart esté feo.',
  catalyst: {
    title: 'Unlock de la Ecosystem Reserve',
    date: '23 Sep 2026 — ABSORBIDO: ningún cierre bajo 0.256, mínimo post-unlock 0.2942 (3 Oct), +36% el 8 Oct · 55.06% del supply desbloqueado',
    body: [
      '<b>Que pasa.</b> El proximo unlock del calendario de MET cae el 23 de septiembre y va a la Ecosystem Reserve — la misma reserva del 34% que ya es el bloque mas grande del overhang. Con 55.06% del supply desbloqueado, cada tramo nuevo compite por los mismos compradores. El contexto no ayuda: las fees on-chain del sector DEX cayeron 57% interanual en Q2 y Meteora es parte de esa caida.',
      '<b>El contrapeso.</b> La wallet de buyback existe y es auditable (FzULv8…EJtoG9): el que quiera verificar si la tesoreria esta comprando, puede. La regla de la casa aplica tal cual esta escrita abajo: unlock no absorbido en 72h = reducir; buyback trimestral cubriendo unlocks = mantener aunque el chart este feo.',
      '<b>LECTURA ·</b> Este unlock no es sorpresa — esta en el calendario desde el TGE. Lo que importa no es el dia, es la semana. <b>Decision:</b> › mirar el precio 72h post-23 Sep contra el nivel previo, no el candle del dia. › el proximo anuncio de buyback trimestral es el tripwire que manda. › Ecosystem Reserve moviendose a CEX despues del unlock = salir sin esperar el chart.',
    ],
  },
  forecast: {
    updated: '21 Sep 2026', score1m: 34, score3m: 40,
    body: [
      '<b>1M · 34/100.</b> Capado por el unlock del 23 Sep y por un revenue de sector en contraccion (fees DEX -57% interanual en Q2). El stance sigue siendo wait-for-unlock-absorption: no hay apuro en ser el comprador del float nuevo.',
      '<b>3M · 40/100.</b> Mejora si pasan dos cosas verificables: buyback trimestral anunciado y ejecutado desde la wallet auditable, y PumpSwap sin comerle el flujo de long-tail que es ~50% de las fees. El volumen DEX de Solana en maximos ($10B+/semana) es la marea que lo puede levantar — si el share aguanta.',
      '<b>Invalidacion ·</b> unlock del 23 Sep no absorbido en 72h, buyback salteado un trimestre, o share de volumen cayendo contra PumpSwap.',
    ],
  },
  thesis: [
    '<b>Qué es.</b> Meteora es la capa de liquidez de Solana: DLMM (liquidez concentrada dinámica), DAMM v2, vaults y el launchpad que usa buena parte del long tail (incluido PumpFun). Cobra 5–20% de las fees de cada pool como revenue del protocolo.',
    '<b>La tesis.</b> MET es un token de revenue real con dos problemas de supply: 52% del total vesting lineal a 6 años (equipo + reserva) y un TGE que salió con 48% en circulación. El buyback trimestral (Q4-25: $10M USDC, 2.3% del supply) es el contrapeso. La tesis funciona si el buyback absorbe los unlocks y el revenue se sostiene sin depender del ciclo de memecoins.',
    '<b>Lo que valida.</b> Revenue mensual estable aunque caiga el volumen de memes (diversificación), TVL creciendo en SOL, buyback trimestral anunciado y ejecutado on-chain, MET staked (Comet Points) creciendo.',
    '<b>Lo que rompe.</b> ~50% de las fees vienen de PumpFun/long-tail: si ese flujo migra a PumpSwap u otro AMM, el revenue se parte. Unlocks diarios (~7.3M MET/mes) sin demanda, o buyback suspendido.',
  ],
  network: {
    title: 'TVL · DEX volume · fees · revenue (DefiLlama)',
    note: 'Volume = swaps en pools Meteora (monthly sum). Revenue = take del protocolo (5–20% de fees). TVL en USD — sube con SOL.',
    metrics: [
      { key: 'revenue', label: 'Protocol revenue', source: 'llama-fees', slug: 'meteora', dataType: 'dailyRevenue', unit: 'usd', primary: true },
      { key: 'fees', label: 'Total fees', source: 'llama-fees', slug: 'meteora', dataType: 'dailyFees', unit: 'usd' },
      { key: 'volume', label: 'DEX volume', source: 'llama-dex', slug: 'meteora', unit: 'usd' },
      { key: 'tvl', label: 'TVL', source: 'llama-tvl', slug: 'meteora', unit: 'usd' },
    ],
  },
  onchain: {
    mint: 'METvsvVRapdj9cFLzq4Tr43xK4tAjQfwX76z3n6mWQL', supply: 1_000_000_000, decimals: 6, treasuryPct: 3,
    labels: {},
    programs: {},
    staking: { manual: { label: 'Staked MET (Comet)', total: null, source: 'app.meteora.ag — referral staking program', note: 'Ver app.meteora.ag para total staked' } },
    read: ({ chain, d, fmtNum, pctS }) => {
      const ho = chain.holders; if (!ho) return 'Holders scan unavailable.';
      const tr = ho.treasuryLike, ex = ho.exchange, ve = ho.vesting, daily = d?.price && d?.vol24 ? d.vol24 / d.price : null;
      return `<b>MET es una carrera entre unlocks y buyback.</b> 52% del supply (equipo 18% + reserva 34%) vesting lineal a 6 años ≈ <b>7.3M MET/mes</b> entrando al float. ${pctS(tr)} del supply está en wallets sin etiqueta ≥3% (reserva de ecosistema, equipo) y ${pctS(ve)} en cuentas tipo vesting. <div style="margin-top:6px"><b>Exchanges:</b> ${fmtNum(ex)} MET (${pctS(ex)}) en CEX etiquetados${daily ? `, ≈${(ex / daily).toFixed(1)} días de volumen` : ''}. Binance/OKX/Coinbase dan liquidez para absorber unlocks; el problema no es el float, es quién compra el float nuevo.</div><div style="margin-top:6px"><b>Decisión:</b> › el número que manda: <b>buyback del trimestre vs 22M MET de unlocks</b> del trimestre. Si el buyback lo cubre, HOLD; si no, el precio baja por aritmética. › Reserva de ecosistema moviéndose a CEX = salir. › Staked MET subiendo con el precio bajando = acumulación; con el precio subiendo = fin del ciclo de farming.</div>`;
    },
  },
  tripwires: ({ M, chain, trend, fc }) => [
    tw.metric(M, 'revenue', { good: 80, watch: 50 }),
    tw.metric(M, 'volume', { good: 70, watch: 45 }),
    tw.metric(M, 'tvl', { good: 85, watch: 60 }),
    tw.concentration(chain, { exchangeWarnPct: 10, treasuryWarnPct: 30 }),
    tw.trend(trend, fc),
    tw.custom('watch', '◦', 'Buyback vs unlocks', 'Q4-25: $10M USDC de buyback ≈ 2.3% del supply. Unlocks ≈ 7.3M MET/mes (0.73%/mes). El buyback cubre los unlocks solo si se sostiene cada trimestre. Tripwire pasa a ✓ con el siguiente anuncio ejecutado on-chain, a ! si se salta un trimestre.'),
    tw.custom('watch', '◦', 'Dependencia de PumpFun', '~50% de las fees vienen de long-tail / PumpFun. Si PumpSwap internaliza ese flujo, el revenue de Meteora se parte. Mirar share de volumen Meteora vs PumpSwap, no solo el total.'),
  ],
  decision: decisionBuilder('MET', {
    flips: ({ net, U }) => {
      const r = net?.revenue;
      return [
        `<b>Buyback trimestral ≥ unlocks del trimestre</b>, ejecutado on-chain desde la wallet única anunciada. Ahí MET deja de ser dilutivo en la práctica.`,
        `Revenue mensual ${r?.peak ? `volviendo sobre <b>${U(r.peak * 0.8)}</b> (hoy ${U(r.latest)})` : 'en máximos'} sin depender del ciclo de memecoins (share PumpFun bajando, revenue estable).`,
        `Reserva de ecosistema moviéndose a exchanges = salir sin esperar el chart.`,
        `Buyback suspendido o reducido = la única defensa contra 6 años de vesting se cae. Reducir.`,
      ];
    },
  }),
};
