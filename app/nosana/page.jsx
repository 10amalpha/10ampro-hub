'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { taStamps } from '../lib/thesis/stamp';
import RelativeLayer from '../lib/thesis/RelativeLayer';

// ============================================================
// NOSANA // NETWORK TELEMETRY
// mercados.10am.pro/nosana
// Live tracker for Nosana's main data points + NOS market data.
// Green = network fundamentals (Nosana API). Blue = market (CoinGecko).
// Data flows through same-origin /api/nosana (server-side proxy, no CORS).
// Point-in-time KPIs are snapshotted to localStorage to build evolution.
// ============================================================

const GRN = '#22c55e';
const BLU = '#5b8cff';
const AMB = '#f59e0b';
const RED = '#ef4444';

// Seed fallbacks (Aug 22 2026 telemetry) if the live feed is unreachable.
// Review log: Aug 1 → hosts 965 · price $0.2537 · Jun hrs ~136k (62% of peak)
//             Aug 22 → hosts 826 · price $0.2823 · Jul hrs ~114k (~52% of peak) — network weaker, price firmer = divergence widening
const SEED = {
  completed: 4115790, jobHours: 4125332, hosts: 826, running: 826, queued: 34,
  price: 0.2823, mcap: 28233000, ath: 7.83, peakHours: 220000,
  hostsBaseline: 965, reviewed: '13 Nov 2026',
};


// ---- Technical analysis (manual read, refreshed on each review) ----
// Chart basis: NOS/USD 1D (CoinGecko) · 13 Nov 2026 · C 0.3973 (12 Nov, −1.4% con SOL −0.04% — 0.3947 aguantado por 0.7%, el cuarto test) / C 0.3758 (13 Nov, −5.4% con SOL −1.9%, 2.8× — 0.3947 cerrado por cuarta vez (4.8%), 0.3922 cerrado, 0.3878 — el cierre más bajo del pullback, el stop de lo legacy — cerrado por 3.1%: el cuarto paso de la secuencia bajista impreso, el cierre más bajo desde el breakout del 21 Sep) / 0.3692 hoy (−1.8% con SOL −1.5% — 0.3679, el 78.6% y el +1M, a 0.35%: alcanzado por la regla en vivo, el cierre decide; la EMA200 a 2.0%) · EMA20 0.4239 · EMA50 0.4369 (la 20 ahora 3.0% debajo, el cruce bajista del 4 Nov abriéndose) · EMA100 0.4064 (techo, 10% arriba) · EMA200 0.362 (+3.4%/20d, desacelerando) · RSI 46.5 (subió desde 43.3 con el precio −8% en dos velas: las barras del 30–31 Oct salieron de la ventana de 14 — la ventana, no el comprador) · MACD histo −0.0031 (negativo y creciendo) · motor 3/7 BEAR sin cambio (quedan los tres checks lentos; dibuja triángulo 0.7365 → 0.4657 con la línea de arriba en 0.3918, rail 0.1996 → 0.2675 en ~0.292, vértice 24 Nov, invalidación 0.461, path 0.292 / 0.267 / 0.178 — ahora mide el rail) · vol 20d/90d 79%, últimas 24 h $0.61M (125% del promedio: la primera barra sobre el promedio de la devolución, roja) vs $1.23M máx-30d · −12.5% en 7d vs SOL −10.6% (1.2×); −33.0% en 30d; mcap $37M
const TA = {
  reviewed: '13 Nov 2026',
  bias: 'BEARISH',
  read: 'El escalón que decidía se cerró: el 12 Nov cerró 0.3973 (−1.4% con SOL −0.04%) — 0.3947 (el máximo de junio) aguantado por 0.7% en el cuarto test, rojo con el benchmark plano —, y el 13 Nov cerró 0.3758 (−5.4% con SOL −1.9%, 2.8× — la que más cayó de la página en esa vela): 0.3947 cerrado por cuarta vez (4.8%), 0.3922 (el cierre del 3 Nov) cerrado, y 0.3878 — el cierre más bajo del pullback, el escalón que esta página escribió como el que decidía si noviembre hizo piso, el stop de lo que se tenía de antes — cerrado por 3.1%. El cuarto paso de la secuencia bajista impreso, un mínimo nuevo del pullback, y el cierre más bajo desde el breakout del 21 Sep: todo lo que el impulso construyó arriba de 0.3947 está devuelto. Hoy 0.3692, −1.8% con SOL −1.5% (1.2×): 0.3679 (el 78.6% del impulso 0.2675 → 0.7365, la medida bajista, el +1M) a 0.35% — alcanzado por la regla de la casa, en vivo, no al cierre —, la EMA200 (0.362) a 2.0%, 1.8% debajo de 0.3758 y 4.8% debajo de 0.3878, que pasó a ser techo. Volumen: las últimas 24 horas traen $0.61M, el 125% del promedio de 20 días ($0.49M, plano, el 79% del de 90) — la primera barra sobre el promedio en una revisión desde el 5 Nov, y es roja: la ventana cubre la vela de −5.4% y la caída de hoy. La devolución entera se había hecho con el libro vacío (52%, 92% del promedio); el vendedor apareció donde el comprador no, en el escalón que decidía. La barra más grande de 30 días sigue siendo la de $1.23M, sin fecha dentro de noviembre. RSI 46.5, desde 43.3: subió tres puntos con el precio 8% más abajo en dos velas — las barras del 30 y el 31 Oct (−4.7%, −4.8%) salieron de la ventana de 14 días; es la ventana, no el comprador, y no se llama cruce. El histograma del MACD, que cruzó a negativo el 11 Nov por un pelo (−0.00002), está en −0.0031: negativo y creciendo — el oscilador que la barra del 5 Nov dio vuelta acelera para abajo. Tres de siete sin cambio — BEAR: quedan los tres checks lentos — el precio sobre la 200 (0.362, +3.4% en 20 días, desacelerando) por 2.0%, la 50 sobre la 200 y la 200 subiendo —; los cuatro rápidos en contra. La EMA20 (0.4239) está 3.0% bajo la EMA50 (0.4369): el cruce bajista del 4 Nov, que el 11 Nov era 1.6%, sigue abriéndose; la EMA100 (0.4064) es techo, 10% arriba. El motor sigue dibujando el triángulo 0.7365 → 0.4657 con la línea de arriba en 0.3918 — 6% sobre el precio — y el rail 0.1996 → 0.2675 en ~0.292; su lectura sigue BEAR con la invalidación en 0.461 y el path en 0.292 / 0.267 / 0.178: ya no mide el 78.6%, mide el rail. Relativo: −12.5% en siete días con SOL −10.6%, 1.2× — JUP (+6.5%) y MET (+6.7%) del otro lado del signo, JTO 0.6×, PUMP 1.25×, 2Z 1.3× —; en la vela del 12 Nov −1.4% contra −0.04%, en la del 13 Nov −5.4% contra −1.9% (2.8×, la peor de la página: 2Z −2.4%, MET −2.1%, JTO −1.4%, PUMP +0.4%, JUP +4.0%), en vivo −1.8% contra −1.5%. SOL hizo su mínimo de cierre de 30 días (81.64) y NOS perdió su escalón cayendo casi el triple: el movimiento es propio, no prestado. Red: nada nuevo — compute hours bajo 150k, revenue pagado sin publicar; el mcap en $37M, desde $40M. Lo que cambió: 0.3947 cerrado por cuarta vez, 0.3878 cerrado (el stop de lo legacy impreso: lo que quedaba salió en 0.3758), el cuarto paso de la secuencia impreso y el quinto (0.3679) tocado por la regla en vivo, la primera barra sobre el promedio de la devolución — roja —, el histograma acelerando, el cruce 20/50 en 3.0%, la línea del motor encima del precio. Lo que no cambió: la invalidación en 0.4657 (26% arriba), el +1M en 0.3679 — ahora el retest en curso, el cierre decide —, la EMA200 como la última media, 0.3125 (el breakout del 21 Sep) y el rail (~0.292) como lo único que queda debajo de ella, la red igual, y la regla: no se compra el nivel tocado, se compra el cierre que lo aguante con la barra. La séptima entrada (el retest de 0.3878–0.3947 aguantado al cierre) no imprimió — el nivel se cerró —; la octava es el 78.6% que aguante al cierre con vela de rechazo abajo y $1.3M+, o el cierre de vuelta sobre 0.3878 con la misma barra y NOS sobre SOL. Un impulso que devolvió el 78.6% en cinco semanas con el libro vacío y trajo la primera barra sobre el promedio en la vela que cerró su último escalón tiene la medida tocada y el piso sin hacer: el piso se ve en el nivel que aguanta al cierre con la barra, y hasta ahora el único nivel que trajo la barra fue el que se cerró.',
  // Chart structure (anchor points are [timestamp, price]) — drawn on the live series
  structure: {
    resistance: { a: [1791158400000, 0.7365], b: [1791331200000, 0.7365], label: 'Techo 0.7365 · máximo 5 Oct · bandera 0.56–0.68 rota por abajo el 13 Oct · EMA20 perdida el 16 Oct · 0.49 cerrado el 19 Oct · dos rebotes frenados bajo 0.5607 (0.5493 el 20 Oct, 0.5521 el 22 Oct) · 0.49 cerrado de vuelta y EMA50 empatada el 24 Oct (0.4657) · 61.8% del impulso (0.4466) resuelto abajo (25–29 Oct) · 0.4304 cerrado el 30 Oct con la primera barra de la devolución · EMA100 y 0.3947 cerrados el 31 Oct (0.3897) · recuperados el 1–2 Nov sin volumen, devueltos el 3 Nov (0.3922) · 0.3897 cerrado el 4 Nov (0.3878) · el 5 Nov +20.1% con SOL +2.9% (0.4657): siete escalones recuperados en una vela — empate con el cierre del 24 Oct, el techo del último rebote · el 6 Nov −9.6% (0.421): la EMA100 aguantada · el 8 Nov +7.0% con SOL −0.4% (0.455): el racimo y el 61.8% recuperados · el 9 Nov −6.8% con SOL −3.7% (0.4241): devueltos en una vela · el 11 Nov −6.1% con SOL −3.8% (0.4031): 0.421 y la EMA100 cerrados — el stop de la entrada del 5 Nov impreso · el 12 Nov 0.3973: 0.3947 aguantado por 0.7% · el 13 Nov −5.4% con SOL −1.9% (0.3758): 0.3947 cerrado por cuarta vez y 0.3878 — el cierre más bajo del pullback — por 3.1%: el stop de lo legacy impreso · hoy 0.3692: 0.3679 (78.6%, el +1M) a 0.35% — el cierre decide; queda la EMA200 (0.362) debajo, después 0.3125 y el rail (~0.292); 0.3758, 0.3878, 0.3947, la EMA100 (0.4064), el racimo (0.4239–0.4369) y 0.4657 (la invalidación) arriba' },
    support: { a: [1770768000000, 0.1784], b: [1785369600000, 0.2431], label: 'Rail 2026 · Feb-11 → Jul-28 → Sep-16 · debajo termina la tesis' },
    touches: [[1791158400000, 0.7365, 'H1'], [1791331200000, 0.6836, 'H2'], [1791763200000, 0.6016, 'H3'], [1770768000000, 0.1784, 'L1'], [1775347200000, 0.1996, 'L2'], [1785369600000, 0.2431, 'L3'], [1789516800000, 0.2675, 'L4'], [1791504000000, 0.5607, 'L5'], [1791849600000, 0.5554, 'L6'], [1792108800000, 0.5084, 'L7'], [1792368000000, 0.4826, 'L8'], [1792454400000, 0.5493, 'H4'], [1792627200000, 0.5521, 'H5'], [1792800000000, 0.4657, 'L9'], [1792886400000, 0.444, 'L10'], [1793232000000, 0.4385, 'L11'], [1793318400000, 0.4093, 'L12'], [1793404800000, 0.3897, 'L13'], [1793750400000, 0.3878, 'L14'], [1793836800000, 0.4657, 'H6'], [1793923200000, 0.421, 'L15'], [1794096000000, 0.455, 'H7'], [1794355200000, 0.4031, 'L16'], [1794528000000, 0.3758, 'L17']],
    pattern: 'Impulso vertical + bandera rota por abajo (13 Oct) + EMA20 perdida (16 Oct) + 0.49 cerrado (19 Oct) + doble techo bajo el piso de la bandera (0.5493 el 20 Oct, 0.5521 el 22 Oct) + 0.49 cerrado de vuelta y EMA50 perdida (24 Oct, 0.4657) + el 61.8% del impulso (0.4466) resuelto abajo (25–29 Oct) + 0.4304 cerrado con la primera barra de la devolución (30 Oct, 0.4093) + EMA100 y el máximo de junio (0.3947) cerrados en una vela (31 Oct, 0.3897) + recuperados en dos cierres sin volumen (1–2 Nov) y devueltos en una vela de mercado (3 Nov, 0.3922) + 0.3897 cerrado (4 Nov, 0.3878) + siete escalones recuperados en una vela de +20.1% con SOL +2.9% (5 Nov, 0.4657 — la barra, como máximo, $1.23M: bajo la condición de $1.3M) + el 48% devuelto con la EMA100 aguantada (6 Nov, 0.421) + el racimo EMA20–EMA50 y el 61.8% recuperados al cierre (8 Nov, 0.455) + devueltos en una vela con el libro vacío (9 Nov, 0.4241) + 0.421 y la EMA100 cerrados (11 Nov, 0.4031): el stop de la entrada del 5 Nov impreso, la barra fue un día + 0.3947 aguantado por 0.7% en el cuarto test (12 Nov, 0.3973) + 0.3947 cerrado por cuarta vez y 0.3878 — el cierre más bajo del pullback — cerrado por 3.1% (13 Nov, 0.3758, −5.4% con SOL −1.9%, 2.8×) con la primera barra sobre el promedio de la devolución, roja: el cuarto paso de la secuencia bajista impreso, el stop de lo legacy impreso, el cierre más bajo desde el breakout del 21 Sep; el motor dibuja el triángulo 0.7365 → 0.4657 con la línea de arriba en 0.3918 sobre el precio, rail 0.1996 → 0.2675 (~0.292), vértice 24 Nov; hoy 0.3692 con 0.3679 (78.6%, el +1M) a 0.35% — alcanzado por la regla en vivo, el cierre decide; queda la EMA200 (0.362), después 0.3125 y el rail; el sesgo bajista por la regla hasta 0.4657 (el techo del último rebote, la invalidación movida desde 0.5607 el 11 Nov)',
    height: 0.469,
    measured: { up: 0.85, down: 0.3679 },
  },
  invalidation: { level: 0.4657, text: 'Cierre diario sobre 0.4657 (cierre del 5 Nov, el techo del último rebote — un máximo decreciente debajo de 0.5521 (22 Oct), 0.5493 (20 Oct) y 0.5607 (el piso de la bandera, la invalidación vieja); empate con el cierre del 24 Oct; 0.3758, 0.3878, 0.3947, la EMA100 en 0.4064, 0.421, 0.4304, el racimo EMA20–EMA50 en 0.4239–0.4369, el 61.8% en 0.4466 y 0.455 quedan debajo y se recuperan en el camino) con 2× volumen ($1.0M) anula el path bajista: el 11 y el 13 Nov fueron barridos, el cierre bajo 0.3878 fue una mecha larga y el rebote del 5 Nov sigue → 0.4826–0.49 (la invalidación vieja de octubre), 0.502 (mitad del impulso), 0.5607 (piso de la bandera) y 0.6836. Movida desde 0.5607 el 11 Nov: con la EMA100 cerrada, el que anula el sesgo es el techo del último rebote, no el piso de la bandera de hace un mes — el criterio de SOL (106.9 → 96.9), JTO (0.5035 → 0.4814) y PUMP (0.004533 → 0.004325); el motor pone la suya en 0.461, el mismo nivel. Está 26% arriba del precio: hasta ahí cada rebote es para reducir, no para sumar.' },
  path: [
    { d: 30, h: '+1M', target: 0.3679, how: '78.6% del impulso 0.2675 → 0.7365, la medida bajista de la estructura, con la EMA200 (0.362, subiendo 3.4% en 20 días y desacelerando) pegada 1.6% debajo: los dos escalones del camino se cerraron — 0.3947 por cuarta vez y 0.3878 (el cierre más bajo del pullback) por 3.1% el 13 Nov (0.3758, −5.4% con SOL −1.9%, con la primera barra sobre el promedio de la devolución, roja) — y hoy 0.3692 en vivo está a 0.35%: el +1M alcanzado por la regla de la casa, en vivo, no al cierre. El +1M es ahora el retest en curso, y el cierre decide: aguantado al cierre con vela de rechazo abajo y $1.3M+, el 13 Nov fue el barrido del último escalón, el piso del pullback está hecho, la octava entrada tiene su nivel y el camino de vuelta es 0.3878 → 0.3947 → la EMA100 (0.4064); cerrado por abajo con la EMA200, el +1M está cumplido del todo y lo que queda es 0.3125 (el breakout del 21 Sep) sin nada en el medio, después el rail del año (~0.292, lo que el motor mide hoy) y 0.2675, el origen. Si 0.3878 se recupera al cierre con la misma barra y NOS sobre SOL antes, el +1M es 0.3947–0.4064 desde abajo.' },
    { d: 90, h: '+3M', target: 0.3947, how: 'Retest desde abajo del máximo de junio — el breakout viejo, cerrado cuatro veces (31 Oct, 3, 4 y 13 Nov) y recuperado una (5 Nov) —, con 0.3758 y 0.3878 (el escalón perdido el 13 Nov) en el camino y la EMA100 (0.4064) pegada arriba: el escenario de un piso hecho en 0.3679–0.362 con la barra ($1.3M+, vela que cierre arriba) y el nivel que decía si noviembre hizo piso probado desde abajo. Con 0.3878 cerrado, el retest del trimestre es el máximo de junio, no la media: el +3M anterior (0.4082, la EMA100) queda detrás. Recuperado al cierre con $1.3M+ y NOS sobre SOL, el +3M pasa a la EMA100 y el racimo (0.4239–0.4369); sin la barra, 0.3947 es el techo del trimestre y 0.3679 el piso que se vuelve a probar — o 0.3125 si no aguanta.' },
    { d: 365, h: '+1Y', target: 0.4657, how: 'Retest desde abajo del techo del último rebote (el cierre del 5 Nov y del 24 Oct), la invalidación: el año termina donde el rebote de noviembre se frenó si el 78.6% o el rail del año (~0.292) aguantan y la red vuelve a crecer; el cierre encima con 2× volumen anula el sesgo y el +1Y pasa a 0.49–0.5607 (la invalidación vieja y el piso de la bandera). Para 0.6836 y 0.7365 hacen falta la bandera reconstruida y revenue pagado publicado, y hoy no está ninguna de las dos. La medida completa (1.03) no es un objetivo honesto para un alt de $37M.' },
  ],
  levels: {
    resistance: [[0.3758, 'Cierre 13 Nov · −5.4% con SOL −1.9% (2.8×) · 0.3947 cerrado por cuarta vez, 0.3878 por 3.1% · el stop de lo legacy impreso · la primera barra sobre el promedio de la devolución, roja — primer escalón'], [0.3878, 'Cierre 4 Nov · el cierre más bajo del pullback hasta el 13 Nov · el escalón que decidía — cerrado el 13 Nov · recuperado al cierre con $1.3M+ y NOS sobre SOL, el 13 Nov fue un barrido y es la octava entrada por arriba'], [0.3918, 'Línea de máximos decrecientes del motor 0.7365 → 0.4657 · hoy 6% sobre el precio'], [0.3922, 'Cierre 3 Nov · cerrado el 13 Nov'], [0.3947, 'Máximo 2 Jun · el breakout viejo · cerrado cuatro veces (31 Oct, 3, 4 y 13 Nov), recuperado una (5 Nov) · +3M · el retest desde abajo que dice si noviembre hizo piso'], [0.3973, 'Cierre 12 Nov · −1.4% con SOL −0.04% · 0.3947 aguantado por 0.7%, el cuarto test'], [0.4031, 'Cierre 11 Nov · −6.1% con SOL −3.8% · 0.421 y la EMA100 cerrados · el stop de la entrada del 5 Nov impreso'], [0.4064, 'EMA100 — cerrada el 11 Nov · techo · 10% sobre el precio · recuperada al cierre con $1.3M+ y NOS sobre SOL, el 11–13 Nov fue un barrido'], [0.421, 'Cierre 6 Nov · el mínimo de la semana del rebote · empatado el 9 y el 10 Nov · cerrado el 11 Nov por 4.3%'], [0.4239, 'EMA20 — 3.0% bajo la EMA50 · el cruce bajista del 4 Nov abriéndose · piso del racimo, techo'], [0.4241, 'Cierre 9 Nov · −6.8% con SOL −3.7% · el racimo, el 61.8% y 0.4304 devueltos en una vela'], [0.4295, 'Cierre 10 Nov · +1.3% con SOL +0.2% · bajo el racimo'], [0.4304, 'Mínimo de 30 días viejo del 29 Oct · cerrado el 30 Oct con volumen · recuperado el 5 y el 8 Nov, devuelto el 6 y el 9 Nov'], [0.4369, 'EMA50 · recuperada al cierre el 5 y el 8 Nov, perdida el 6 y el 9 Nov · techo del racimo'], [0.4385, 'Cierre 29 Oct'], [0.444, 'Cierre 25 Oct · el primer cierre bajo el 61.8%'], [0.4449, 'Cierre 28 Oct'], [0.4466, '61.8% del impulso 0.2675 → 0.7365 · resuelto abajo el 25–29 Oct · recuperado al cierre el 5 y el 8 Nov, devuelto el 9 Nov'], [0.4512, 'Cierre 26 Oct · techo del lateral de octubre'], [0.455, 'Cierre 8 Nov · +7.0% con SOL −0.4% · techo del segundo rebote'], [0.4657, 'INVALIDACIÓN bajista · cierre 5 Nov (+20.1% con SOL +2.9%) y del 24 Oct · techo del último rebote · movida desde 0.5607 el 11 Nov · se anula con 2× volumen ($1.0M) · +1Y · 26% arriba'], [0.4826, 'Cierre 19 Oct · el primer cierre bajo 0.49'], [0.49, 'Invalidación de octubre · cierre 1 Oct — cerrada el 19 Oct, recuperada el 20, cerrada de vuelta el 24 Oct'], [0.4999, 'Cierre 23 Oct'], [0.502, 'Mitad del impulso 0.2675 → 0.7365'], [0.5493, 'Cierre 20 Oct · primer rebote · 2% bajo 0.5607'], [0.5521, 'Cierre 22 Oct · segundo rebote · 1.5% bajo 0.5607'], [0.5607, 'Piso de la bandera · mínimo 9 Oct · invalidación vieja (hasta el 11 Nov)'], [0.6016, 'Cierre 12 Oct'], [0.6836, 'Cierre 7 Oct · techo del pullback'], [0.7365, 'Máximo 5 Oct'], [0.85, 'Medida de la bandera (61.8%) · solo con la bandera reconstruida'], [1.01, 'Blow-off Sep-25 · requiere revenue publicado']],
    support: [[0.3692, 'Hoy · −1.8% con SOL −1.5% · 0.3679 a 0.35% — alcanzado por la regla en vivo · $0.61M en 24 h, el 125% del promedio, rojo · el precio está acá'], [0.3679, '78.6% del impulso · +1M · la medida bajista · alcanzado por la regla en vivo · el cierre decide: aguantado con vela de rechazo y $1.3M+, la octava entrada; cerrado con la EMA200, 0.3125 sin nada en el medio'], [0.362, 'EMA200 — subiendo 3.4%/20d, desacelerando · la última media · stop de la entrada en 0.3679'], [0.3125, 'Nivel del breakout del 21 Sep · nada entre la EMA200 y acá'], [0.292, 'Rail 2026 (0.1996 → 0.2675) hoy · la medida del motor (0.292) · debajo termina la tesis'], [0.2675, 'Mínimo 16 Sep · origen del impulso · el +3M del motor']],
  },
};

const BEAR = TA.bias === 'BEARISH';

// ---- TA scenario fan chart (SVG, log-y) ----
function TAFan({ price, ta, mb }) {
  const W = 680, H = mb ? 300 : 340, L = 50, R = 64, T = 18, B = 34;
  const px = price || 0.28;
  const xs = (days) => L + Math.sqrt(days / 365) * (W - L - R);
  const yMin = 0.12, yMax = 0.80;
  const ys = (v) => T + (1 - (Math.log(v) - Math.log(yMin)) / (Math.log(yMax) - Math.log(yMin))) * (H - T - B);
  const P = [{ d: 0, target: px }].concat(ta.path);
  // smooth path through targets
  const pts = P.map((p) => [xs(p.d), ys(p.target)]);
  let dPath = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], cx = (x0 + x1) / 2;
    dPath += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  // uncertainty cone: ±6% / ±12% / ±22%
  const tol = [0, 0.06, 0.12, 0.22];
  const up = P.map((p, i) => [xs(p.d), ys(p.target * (1 + tol[i]))]);
  const dn = P.map((p, i) => [xs(p.d), ys(p.target * (1 - tol[i]))]).reverse();
  const cone = 'M' + up.concat(dn).map((q) => q.join(',')).join(' L') + ' Z';
  const gridV = [0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75];
  const lv = [...ta.levels.resistance, ...ta.levels.support].filter(([v]) => v >= yMin && v <= yMax && Math.abs(v - px) / px > 0.08 && v !== ta.invalidation.level);
  const inv = ta.invalidation.level;
  const bear = ta.bias === 'BEARISH';
  const pct = (v) => `${v / px - 1 >= 0 ? '+' : ''}${Math.round((v / px - 1) * 100)}%`;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', height: 'auto' }}>
      <defs>
        <linearGradient id="taCone" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={GRN} stopOpacity="0.05" /><stop offset="100%" stopColor={GRN} stopOpacity="0.22" />
        </linearGradient>
      </defs>
      {gridV.map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={ys(v)} y2={ys(v)} stroke="rgba(255,255,255,.05)" />
          <text x={L - 6} y={ys(v) + 3} textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">${v.toFixed(2)}</text>
        </g>
      ))}
      {P.map((p, i) => (
        <g key={i}>
          <line x1={xs(p.d)} x2={xs(p.d)} y1={T} y2={H - B} stroke="rgba(255,255,255,.07)" strokeDasharray="2 3" />
          <text x={xs(p.d)} y={H - B + 14} textAnchor={i === 0 ? 'start' : 'middle'} fontSize="10.5" fontWeight="700" fill="var(--text-secondary)" fontFamily="'JetBrains Mono',monospace">{i === 0 ? 'HOY' : p.h}</text>
        </g>
      ))}
      {/* invalidation zone */}
      <rect x={L} y={bear ? T : ys(inv)} width={W - L - R} height={bear ? Math.max(0, ys(inv) - T) : Math.max(0, H - B - ys(inv))} fill={RED} opacity="0.05" />
      <line x1={L} x2={W - R} y1={ys(inv)} y2={ys(inv)} stroke={RED} strokeWidth="1.5" strokeDasharray="6 3" />
      <text x={L + 6} y={bear ? ys(inv) - 5 : ys(inv) + 12} fontSize="9.5" fontWeight="700" fill={RED} fontFamily="'JetBrains Mono',monospace">{bear ? `INVALIDATION › $${inv} · bear path cancelled, flag rebuilt` : `INVALIDATION ‹ $${inv} · path flips back to 0.2675`}</text>
      {lv.map(([v]) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={ys(v)} y2={ys(v)} stroke="rgba(255,255,255,.18)" strokeWidth="1" strokeDasharray="1 3" />
          <text x={W - R + 4} y={ys(v) + 3} fontSize="9.5" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">{v.toFixed(3)}</text>
        </g>
      ))}
      <path d={cone} fill="url(#taCone)" />
      <path d={dPath} fill="none" stroke={bear ? RED : GRN} strokeWidth="2.4" />
      <line x1={L} x2={W - R} y1={ys(px)} y2={ys(px)} stroke="var(--text-primary)" strokeOpacity=".4" strokeWidth="1" />
      <circle cx={xs(0)} cy={ys(px)} r="4.5" fill="#fff" />
      <rect x={W - R + 2} y={ys(px) - 8} width={R - 4} height="16" rx="2" fill="#fff" />
      <text x={W - R + R / 2} y={ys(px) + 3.5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#000" fontFamily="'JetBrains Mono',monospace">${px.toFixed(3)}</text>
      {ta.path.map((p, i) => {
        const x = xs(p.d), y = ys(p.target);
        const last = i === ta.path.length - 1;
        return (
          <g key={p.h}>
            <circle cx={x} cy={y} r="5" fill="#0c0c0e" stroke={GRN} strokeWidth="2" />
            <rect x={x - (last ? 64 : 32)} y={y + 10} width="64" height="28" rx="3" fill="rgba(34,197,94,.14)" stroke={GRN} strokeOpacity=".5" />
            <text x={x - (last ? 32 : 0)} y={y + 22} textAnchor="middle" fontSize="11" fontWeight="800" fill={GRN} fontFamily="'JetBrains Mono',monospace">${p.target.toFixed(2)}</text>
            <text x={x - (last ? 32 : 0)} y={y + 33} textAnchor="middle" fontSize="9" fill={GRN} fontFamily="'JetBrains Mono',monospace">{pct(p.target)}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ---- live trend engine (computed client-side from CoinGecko daily closes) ----
const ema = (arr, n) => { const k = 2 / (n + 1); let e = arr[0]; const out = [e]; for (let i = 1; i < arr.length; i++) { e = arr[i] * k + e * (1 - k); out.push(e); } return out; };
function computeTrend(closes, vols) {
  if (!closes || closes.length < 60) return null;
  const c = closes, last = c[c.length - 1];
  const e20 = ema(c, 20), e50 = ema(c, 50), e100 = ema(c, 100), e200 = ema(c, 200);
  const m12 = ema(c, 12), m26 = ema(c, 26);
  const macd = m12.map((v, i) => v - m26[i]); const sig = ema(macd, 9);
  const hist = macd[macd.length - 1] - sig[sig.length - 1];
  const histPrev = macd[macd.length - 4] - sig[sig.length - 4];
  let g = 0, l = 0; for (let i = c.length - 14; i < c.length; i++) { const d = c[i] - c[i - 1]; if (d > 0) g += d; else l -= d; }
  const rsi = l === 0 ? 100 : 100 - 100 / (1 + (g / 14) / (l / 14));
  const at = (a) => a[a.length - 1];
  const slope200 = e200.length > 21 ? at(e200) / e200[e200.length - 21] - 1 : 0;
  const chg30 = c.length > 30 ? last / c[c.length - 31] - 1 : 0;
  const chg7 = c.length > 7 ? last / c[c.length - 8] - 1 : 0;
  const checks = [
    ['Price > EMA20', last > at(e20)], ['Price > EMA50', last > at(e50)], ['Price > EMA200', last > at(e200)],
    ['EMA50 > EMA200', at(e50) > at(e200)], ['EMA200 rising', slope200 > 0], ['MACD histo > 0', hist > 0], ['RSI > 50', rsi > 50],
  ];
  const score = checks.filter((x) => x[1]).length;
  let volRatio = null;
  if (vols && vols.length > 90) { const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length; volRatio = avg(vols.slice(-20)) / avg(vols.slice(-90)); }
  const regime = score <= 1 ? 'STRONG BEAR' : score <= 3 ? 'BEAR' : score === 4 ? 'NEUTRAL' : score <= 5 ? 'BULL' : 'STRONG BULL';
  return { last, e20: at(e20), e50: at(e50), e100: at(e100), e200: at(e200), hist, histUp: hist > histPrev, rsi, slope200, chg30, chg7, checks, score, regime, volRatio };
}

// ---- TA structure chart: price + EMAs + trendlines + levels + projection ----
function TAStructure({ series, ta, mb }) {
  if (!series || series.c.length < 60) return <div style={{ color: 'var(--text-muted)', fontSize: 11, padding: 20 }}>loading structure…</div>;
  const W = 680, H = mb ? 320 : 380, L = 46, R = 58, T = 16, B = 30;
  const DAY = 86400000;
  const keep = 320;
  const sl = (a) => a.slice(-keep);
  const t = sl(series.t), c = sl(series.c), v = sl(series.v);
  const t0 = t[0], tEnd = t[t.length - 1] + 120 * DAY;
  const xs = (ts) => L + ((ts - t0) / (tEnd - t0)) * (W - L - R);
  const all = c.concat([ta.structure.measured.up, 0.11]);
  const yMin = Math.min(...all) * 0.9, yMax = Math.max(...all) * 1.08;
  const ys = (p) => T + (1 - (Math.log(p) - Math.log(yMin)) / (Math.log(yMax) - Math.log(yMin))) * (H - T - B);
  const line = (arr) => 'M' + arr.map((p, i) => `${xs(t[i]).toFixed(1)},${ys(p).toFixed(1)}`).join(' L');
  const e20 = sl(ema(series.c, 20)), e50 = sl(ema(series.c, 50)), e200 = sl(ema(series.c, 200));
  // trendline helper: through a,b; extended to x2
  const tl = ({ a, b }, extendTo) => {
    const m = (b[1] - a[1]) / (b[0] - a[0]);
    const yAt = (ts) => a[1] + m * (ts - a[0]);
    return { m, yAt, x1: a[0], x2: extendTo, y1: a[1], y2: yAt(extendTo) };
  };
  const res = tl(ta.structure.resistance, tEnd), sup = tl(ta.structure.support, tEnd);
  // apex
  const apexT = ta.structure.resistance.a[0] + (sup.yAt(ta.structure.resistance.a[0]) - res.yAt(ta.structure.resistance.a[0])) / (res.m - sup.m);
  const apexY = res.yAt(apexT);
  const last = c[c.length - 1], lastT = t[t.length - 1];
  // volume bars
  const vmax = Math.max(...v);
  const vh = 34;
  // projection path from forecast
  const proj = [[lastT, last]].concat(ta.path.map((p) => [lastT + p.d * DAY, p.target])).filter((p) => p[0] <= tEnd);
  const projD = 'M' + proj.map((p) => `${xs(p[0]).toFixed(1)},${ys(p[1]).toFixed(1)}`).join(' L');
  const grid = [0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.7, 1.0].filter((g) => g > yMin && g < yMax);
  const mono = "'JetBrains Mono',monospace";
  const lab = (x, y, txt, col, anchor = 'start', size = 9.5) => <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight="700" fill={col} fontFamily={mono}>{txt}</text>;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', height: 'auto' }}>
      <defs><clipPath id="taClip"><rect x={L} y={T} width={W - L - R} height={H - T - B} /></clipPath></defs>
      {grid.map((g) => (
        <g key={g}>
          <line x1={L} x2={W - R} y1={ys(g)} y2={ys(g)} stroke="rgba(255,255,255,.05)" />
          <text x={L - 5} y={ys(g) + 3} textAnchor="end" fontSize="9.5" fill="var(--text-muted)" fontFamily={mono}>${g.toFixed(2)}</text>
        </g>
      ))}
      {/* month ticks */}
      {t.filter((ts, i) => i === 0 || new Date(ts).getUTCMonth() !== new Date(t[i - 1]).getUTCMonth()).map((ts) => (
        <text key={ts} x={xs(ts)} y={H - B + 13} fontSize="9" fill="var(--text-muted)" fontFamily={mono}>{['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'][new Date(ts).getUTCMonth()]}</text>
      ))}
      {/* future shade */}
      <rect x={xs(lastT)} y={T} width={W - R - xs(lastT)} height={H - T - B} fill="rgba(255,255,255,.02)" />
      {lab(xs(lastT) + 4, T + 10, 'PROJECTION →', 'var(--text-muted)')}
      {/* triangle fill */}
      <path d={`M${xs(res.x1)},${ys(res.y1)} L${xs(res.x1)},${ys(sup.yAt(res.x1))} L${xs(apexT)},${ys(apexY)} Z`} fill={AMB} opacity="0.07" clipPath="url(#taClip)" />
      {/* volume */}
      <g clipPath="url(#taClip)">
        {v.map((vol, i) => i % 1 === 0 && (
          <rect key={i} x={xs(t[i]) - 0.6} y={H - B - (vol / vmax) * vh} width="1.2" height={(vol / vmax) * vh} fill={i > 0 && c[i] >= c[i - 1] ? GRN : RED} opacity="0.35" />
        ))}
      </g>
      {/* EMAs */}
      <path d={line(e200)} fill="none" stroke="#3b5bdb" strokeWidth="1.4" clipPath="url(#taClip)" />
      <path d={line(e50)} fill="none" stroke={AMB} strokeWidth="1" opacity=".8" clipPath="url(#taClip)" />
      <path d={line(e20)} fill="none" stroke={RED} strokeWidth="1" opacity=".7" clipPath="url(#taClip)" />
      {/* price */}
      <path d={line(c)} fill="none" stroke="var(--text-primary)" strokeWidth="1.5" clipPath="url(#taClip)" />
      {/* trendlines */}
      <line x1={xs(res.x1)} y1={ys(res.y1)} x2={xs(Math.min(apexT + 30 * DAY, tEnd))} y2={ys(res.yAt(Math.min(apexT + 30 * DAY, tEnd)))} stroke={RED} strokeWidth="1.6" strokeDasharray="5 3" />
      <line x1={xs(sup.x1)} y1={ys(sup.y1)} x2={xs(Math.min(apexT + 30 * DAY, tEnd))} y2={ys(sup.yAt(Math.min(apexT + 30 * DAY, tEnd)))} stroke={GRN} strokeWidth="1.6" strokeDasharray="5 3" />
      {lab(xs(res.x1) - 4, ys(res.y1) - 14, ta.structure.resistance.label, RED, 'end')}
      {lab(xs(sup.x1) + 14, ys(sup.y1) + 4, ta.structure.support.label, GRN)}
      {/* touches */}
      {ta.structure.touches.map(([ts, p, k]) => (
        <g key={k}>
          <circle cx={xs(ts)} cy={ys(p)} r="3.5" fill="#0c0c0e" stroke={k[0] === 'H' ? RED : GRN} strokeWidth="1.5" />
          {lab(xs(ts), ys(p) + (k[0] === 'H' ? -8 : 15), k, k[0] === 'H' ? RED : GRN, 'middle', 8.5)}
        </g>
      ))}
      {/* apex */}
      <line x1={xs(apexT)} x2={xs(apexT)} y1={T} y2={H - B} stroke={AMB} strokeWidth="1" strokeDasharray="2 4" />
      {lab(xs(apexT) + 4, T + 24, `APEX ~${new Date(apexT).toLocaleDateString('es', { day: '2-digit', month: 'short' })}`, AMB)}
      {/* measured moves */}
      <line x1={xs(lastT)} x2={W - R} y1={ys(ta.structure.measured.up)} y2={ys(ta.structure.measured.up)} stroke={GRN} strokeWidth="1" strokeDasharray="3 3" opacity=".7" />
      {lab(W - R - 4, ys(ta.structure.measured.up) - 4, `MEASURED ↑ ${ta.structure.measured.up}`, GRN, 'end')}
      <line x1={xs(lastT)} x2={W - R} y1={ys(ta.structure.measured.down)} y2={ys(ta.structure.measured.down)} stroke={RED} strokeWidth="1" strokeDasharray="3 3" opacity=".7" />
      {lab(W - R - 4, ys(ta.structure.measured.down) - 4, `MEASURED ↓ ${ta.structure.measured.down}`, RED, 'end')}
      {/* invalidation */}
      <line x1={xs(lastT - 30 * DAY)} x2={W - R} y1={ys(ta.invalidation.level)} y2={ys(ta.invalidation.level)} stroke={RED} strokeWidth="1.2" strokeDasharray="6 3" />
      {lab(W - R - 4, ys(ta.invalidation.level) + 11, `INVALIDATION ${ta.invalidation.level}`, RED, 'end')}
      {/* projection */}
      <path d={projD} fill="none" stroke={GRN} strokeWidth="2" strokeDasharray="1 0" opacity=".9" />
      {proj.slice(1).map((p, i) => (
        <g key={i}>
          <circle cx={xs(p[0])} cy={ys(p[1])} r="4" fill="#0c0c0e" stroke={GRN} strokeWidth="2" />
          {lab(xs(p[0]) + 8, ys(p[1]) + (i === 0 ? -8 : 14), `${ta.path[i].h} $${p[1].toFixed(2)}`, GRN)}
        </g>
      ))}
      {/* last price badge */}
      <circle cx={xs(lastT)} cy={ys(last)} r="3.5" fill="#fff" />
      <rect x={W - R + 2} y={ys(last) - 8} width={R - 4} height="16" rx="2" fill="#fff" />
      <text x={W - R + R / 2} y={ys(last) + 3.5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#000" fontFamily={mono}>${last.toFixed(3)}</text>
      {/* legend */}
      <g transform={`translate(${L + 6},${H - B - 6})`}>
        {[['#3b5bdb', 'EMA200'], [AMB, 'EMA50'], [RED, 'EMA20']].map(([col, n], i) => (
          <g key={n} transform={`translate(${i * 62},0)`}><line x1="0" x2="14" y1="-3" y2="-3" stroke={col} strokeWidth="2" /><text x="18" y="0" fontSize="9" fill="var(--text-muted)" fontFamily={mono}>{n}</text></g>
        ))}
      </g>
    </svg>
  );
}

const PERIODS = [
  { k: '2592000', label: '30D' },
  { k: '7776000', label: '90D' },
  { k: '31536000', label: '1Y' },
  { k: '0', label: 'ALL' },
];

// ---------- formatters ----------
const fmtInt = (n) => (n == null || isNaN(n) ? '—' : Math.round(n).toLocaleString('en-US'));
const fmtM = (n) => (n == null || isNaN(n) ? '—' : '$' + (n / 1e6).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'M');
const fmtPx = (n) => (n == null || isNaN(n) ? '—' : '$' + Number(n).toFixed(4));
const monthLabel = (ms) => new Date(ms).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
const dayLabel = (ms) => new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

// ---------- SVG area chart with hover ----------
function AreaChart({ points, color, fmtY, height = 260, monthly = false }) {
  const wrapRef = useRef(null);
  const [w, setW] = useState(680);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((es) => setW(Math.max(280, es[0].contentRect.width)));
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const pad = { l: 52, r: 12, t: 14, b: 26 };
  const iw = w - pad.l - pad.r;
  const ih = height - pad.t - pad.b;

  const data = points || [];
  const ready = data.length > 1;
  const ys = data.map((p) => p.y);
  const yMin = ready ? Math.min(...ys) : 0;
  const yMax = ready ? Math.max(...ys) : 1;
  const span = yMax - yMin || 1;
  const lo = yMin - span * 0.08;
  const hi = yMax + span * 0.08;

  const X = (i) => pad.l + (data.length <= 1 ? 0 : (i / (data.length - 1)) * iw);
  const Y = (v) => pad.t + ih - ((v - lo) / (hi - lo || 1)) * ih;

  const line = ready ? data.map((p, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(p.y).toFixed(1)}`).join(' ') : '';
  const area = ready ? `${line} L${X(data.length - 1).toFixed(1)},${(pad.t + ih).toFixed(1)} L${X(0).toFixed(1)},${(pad.t + ih).toFixed(1)} Z` : '';

  const yticks = 4;
  const gridY = Array.from({ length: yticks + 1 }, (_, i) => lo + ((hi - lo) * i) / yticks);
  const gid = useMemo(() => 'g' + Math.random().toString(36).slice(2, 8), []);

  const onMove = (e) => {
    if (!ready) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * w;
    let idx = Math.round(((px - pad.l) / (iw || 1)) * (data.length - 1));
    idx = Math.max(0, Math.min(data.length - 1, idx));
    setHover(idx);
  };

  return (
    <div ref={wrapRef} style={{ width: '100%', position: 'relative' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none"
        onMouseMove={onMove} onMouseLeave={() => setHover(null)} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {gridY.map((v, i) => (
          <g key={i}>
            <line x1={pad.l} x2={w - pad.r} y1={Y(v)} y2={Y(v)} stroke="rgba(255,255,255,.05)" strokeWidth="1" />
            <text x={pad.l - 8} y={Y(v) + 3} textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">
              {fmtY ? fmtY(v) : Math.round(v)}
            </text>
          </g>
        ))}
        {ready && <path d={area} fill={`url(#${gid})`} />}
        {ready && <path d={line} fill="none" stroke={color} strokeWidth="2" />}
        {/* x labels: first, middle, last */}
        {ready && [0, Math.floor((data.length - 1) / 2), data.length - 1].map((i, k) => (
          <text key={k} x={X(i)} y={height - 8} textAnchor={k === 0 ? 'start' : k === 2 ? 'end' : 'middle'}
            fontSize="10" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">
            {monthly ? monthLabel(data[i].t) : dayLabel(data[i].t)}
          </text>
        ))}
        {hover != null && ready && (
          <g>
            <line x1={X(hover)} x2={X(hover)} y1={pad.t} y2={pad.t + ih} stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx={X(hover)} cy={Y(data[hover].y)} r="3.5" fill={color} />
          </g>
        )}
        {!ready && (
          <text x={w / 2} y={height / 2} textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontFamily="'JetBrains Mono',monospace">
            loading series…
          </text>
        )}
      </svg>
      {hover != null && ready && (
        <div style={{
          position: 'absolute', top: 6,
          left: Math.min(Math.max(8, (X(hover) / w) * 100 + '%' ? (X(hover) / w) * (wrapRef.current?.clientWidth || w) - 60 : 8), (wrapRef.current?.clientWidth || w) - 130),
          background: 'var(--bg)', border: `1px solid ${color}`, borderRadius: 4, padding: '5px 8px',
          fontSize: 11, pointerEvents: 'none', whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono',monospace",
        }}>
          <div style={{ color: 'var(--text-muted)' }}>{monthly ? monthLabel(data[hover].t) : dayLabel(data[hover].t)}</div>
          <div style={{ color, fontWeight: 700 }}>{fmtY ? fmtY(data[hover].y) : fmtInt(data[hover].y)}</div>
        </div>
      )}
    </div>
  );
}

// ---------- small pieces ----------
function Delta({ cur, prev, pct = true }) {
  if (prev == null || cur == null || isNaN(prev) || isNaN(cur))
    return <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>— no prior</span>;
  const d = cur - prev;
  if (Math.abs(d) < 1e-9) return <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>± 0</span>;
  const up = d > 0;
  const clr = up ? GRN : RED;
  const val = pct ? (prev !== 0 ? ((d / prev) * 100).toFixed(2) + '%' : 'n/a') : fmtInt(Math.abs(d));
  return <span style={pill(clr, up ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)')}>{up ? '▲' : '▼'} {val}</span>;
}
const pill = (color, bg) => ({ color, background: bg, fontSize: 11, fontWeight: 600, padding: '1px 5px', borderRadius: 3, letterSpacing: '.02em' });

function Eyebrow({ children, dot = GRN }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, margin: '26px 2px 12px', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot }} />
      {children}
    </div>
  );
}
const panel = { border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: 16 };

// ============================================================
export default function NosanaTelemetry() {
  const [d, setD] = useState(null);          // summary
  const [prev, setPrev] = useState(null);     // previous snapshot
  const [net, setNet] = useState([]);         // network series points
  const [pxHist, setPxHist] = useState({ price: [], mcap: [] });
  const [trend, setTrend] = useState(null);
  const [series, setSeries] = useState(null);
  const [chain, setChain] = useState(null);
  const stamps = useMemo(() => taStamps(series, TA.reviewed, d?.price), [series, d]);
  useEffect(() => { (async () => { try { const r = await fetch('/api/nosana/onchain', { cache: 'no-store' }); setChain(await r.json()); } catch {} })(); }, []);
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/nosana?history=365', { cache: 'no-store' });
        const j = await r.json();
        const raw = (j.prices || []).filter((q) => q[1] > 0);
        const pts = raw.map((q) => q[1]);
        const vols = (j.volumes || []).map((q) => q[1]);
        setSeries({ t: raw.map((q) => q[0]), c: pts, v: vols });
        setTrend(computeTrend(pts, vols));
      } catch {}
    })();
  }, []);
  const [metric, setMetric] = useState('hours');
  const [period, setPeriod] = useState('31536000');
  const [days, setDays] = useState('365');
  const [snaps, setSnaps] = useState([]);
  const [updated, setUpdated] = useState('—');
  const [clock, setClock] = useState('—');
  const [status, setStatus] = useState('booting');
  const [mb, setMb] = useState(false);

  useEffect(() => {
    const f = () => setMb(window.innerWidth < 760);
    f(); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setClock(new Date().toLocaleTimeString('en-GB', { hour12: false })), 1000);
    return () => clearInterval(t);
  }, []);

  const loadSnaps = () => { try { return JSON.parse(localStorage.getItem('nosana:snapshots') || '[]'); } catch { return []; } };
  const saveSnaps = (a) => { try { localStorage.setItem('nosana:snapshots', JSON.stringify(a.slice(-400))); } catch {} };

  // ---- summary + snapshot ----
  const refresh = useCallback(async (manual) => {
    setStatus('fetching…');
    const prevSnaps = loadSnaps();
    setPrev(prevSnaps.length ? prevSnaps[prevSnaps.length - 1] : null);
    let s = {};
    try {
      const r = await fetch('/api/nosana', { cache: 'no-store' });
      s = await r.json();
    } catch { s = { ok: false }; }

    const merged = {
      completed: s.completed ?? SEED.completed,
      jobHours: s.jobHours ?? SEED.jobHours,
      running: s.running ?? SEED.running,
      queued: s.queued ?? SEED.queued,
      hosts: s.hosts ?? SEED.hosts,
      price: s.price ?? SEED.price,
      mcap: s.mcap ?? SEED.mcap,
      chg: s.chg ?? null,
    };
    setD(merged);
    const live = s.ok && (s.completed != null || s.price != null);
    setStatus(live ? 'ok · live feed' : 'ok · seeded (live feed unreachable)');
    setUpdated(new Date().toLocaleTimeString('en-GB', { hour12: false }));

    // snapshot throttle: 1 per 6h (manual allows >5min)
    const snap = { t: new Date().toISOString(), price: merged.price, mcap: merged.mcap, completed: merged.completed, jobHours: merged.jobHours, hosts: merged.hosts, running: merged.running, queued: merged.queued };
    const arr = prevSnaps.slice();
    const last = arr[arr.length - 1];
    const gapH = last ? (Date.now() - new Date(last.t)) / 3600000 : 999;
    if (!last || gapH >= 6 || (manual && gapH > 0.08)) { arr.push(snap); saveSnaps(arr); }
    setSnaps(arr);
  }, []);

  // ---- network series ----
  const loadNet = useCallback(async () => {
    setNet([]);
    try {
      const r = await fetch(`/api/nosana?series=${metric}&period=${period}`, { cache: 'no-store' });
      const j = await r.json();
      let data = Array.isArray(j.data) ? j.data.slice() : [];
      // API returns newest-first — sort ascending so the chart reads old → new
      data.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());
      if (data.length > 2) data = data.slice(1, -1); // drop oldest sliver + newest partial bucket (matches explorer)
      setNet(data.map((p) => ({ t: new Date(p.x).getTime(), y: Math.round(p.y) })));
    } catch { setNet([]); }
  }, [metric, period]);

  // ---- price history ----
  const loadHist = useCallback(async () => {
    try {
      const r = await fetch(`/api/nosana?history=${days}`, { cache: 'no-store' });
      const j = await r.json();
      const step = Math.max(1, Math.floor((j.prices || []).length / 180));
      const price = [], mcap = [];
      for (let i = 0; i < (j.prices || []).length; i += step) {
        price.push({ t: j.prices[i][0], y: +j.prices[i][1].toFixed(4) });
        if (j.market_caps && j.market_caps[i]) mcap.push({ t: j.market_caps[i][0], y: Math.round(j.market_caps[i][1]) });
      }
      setPxHist({ price, mcap });
    } catch { setPxHist({ price: [], mcap: [] }); }
  }, [days]);

  useEffect(() => { refresh(false); }, [refresh]);
  useEffect(() => { loadNet(); }, [loadNet]);
  useEffect(() => { loadHist(); }, [loadHist]);

  // ---- derived thesis metrics ----
  const monthlyNet = period === '0' || Number(period) > 10512000;
  const netHours = useMemo(() => {
    if (metric !== 'hours' || !net.length) return null;
    const ys = net.map((p) => p.y);
    const peak = Math.max(...ys, SEED.peakHours);
    const latest = ys[ys.length - 1];
    return { latest, peak, rec: peak ? Math.round((latest / peak) * 100) : 0 };
  }, [net, metric]);

  const drawdown = useMemo(() => {
    const p = pxHist.price;
    if (!p.length) return null;
    return Math.round((p[p.length - 1].y / SEED.ath - 1) * 100);
  }, [pxHist]);

  // recovery for tripwires (independent of chart metric) — reuse netHours if on hours+ALL-ish, else estimate from seed
  const recPct = netHours ? netHours.rec : null;

  const netColor = netHours ? (netHours.rec >= 90 ? GRN : netHours.rec >= 60 ? AMB : RED) : 'var(--text-primary)';
  const divergence = (() => {
    if (recPct != null && recPct < 70 && drawdown != null)
      return { txt: `Network at ${recPct}% of peak while price ${drawdown}% below ATH — both soft; no confirmation yet.`, c: AMB };
    if (recPct != null && recPct >= 90)
      return { txt: `Network re-accelerating (${recPct}% of peak) — watch for market to follow.`, c: GRN };
    return { txt: `Network ${recPct != null ? recPct + '% of peak' : '—'} · price ${drawdown != null ? drawdown + '% below ATH' : '—'}.`, c: 'var(--text-secondary)' };
  })();

  const seg = (on) => ({
    fontFamily: "'JetBrains Mono',monospace", fontSize: 11, padding: '5px 10px', cursor: 'pointer',
    border: 0, background: on ? 'rgba(34,197,94,.13)' : 'transparent', color: on ? GRN : 'var(--text-muted)', letterSpacing: '.03em',
  });
  const segBlue = (on) => ({ ...seg(on), background: on ? 'rgba(91,140,255,.14)' : 'transparent', color: on ? BLU : 'var(--text-muted)' });
  const segWrap = { display: 'flex', border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' };

  const kpi = (label, value, sub, valColor) => (
    <div style={{ ...panel, padding: '13px 13px 12px', minHeight: 104, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
      <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: '-.01em', lineHeight: 1.05, marginTop: 8, color: valColor || 'var(--text-bright)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 5, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>{sub}</div>
    </div>
  );

  const trips = useMemo(() => {
    const T = [];
    if (recPct != null) {
      T.push(recPct >= 90
        ? ['pass', '✓', 'Compute hours recovering toward peak', `Latest ≈ ${recPct}% of the Oct-25 peak. Sustained recovery = demand not purely incentive-driven.`]
        : ['fail', '!', 'Compute hours below peak', `Latest ≈ ${recPct}% of Oct-25 peak (~220k/mo). The #1 warning sign until it re-trends up.`]);
    } else {
      T.push(['watch', '◦', 'Compute hours vs peak', 'Switch the chart to COMPUTE HRS · ALL to read recovery vs the ~220k Oct-25 peak.']);
    }
    const hosts = d?.hosts;
    const hb = SEED.hostsBaseline;
    T.push(hosts && hosts > hb
      ? ['pass', '✓', 'Host count above baseline', `${fmtInt(hosts)} online GPU hosts (>${hb} Aug-1 baseline). Growth toward ~2,000 = supply-side conviction.`]
      : hosts && hosts < hb * 0.9
        ? ['fail', '!', 'Host count bleeding', `${fmtInt(hosts)} online hosts — ${Math.round((hosts / hb - 1) * 100)}% vs the ${hb} Aug-1 baseline. Supply leaving after the APR cut; watch for a floor.`]
        : ['watch', '◦', 'Host count', `${fmtInt(hosts)} online hosts. Track durable growth above the ~${hb} Aug-1 baseline.`]);
    T.push(['watch', '◦', 'Paid revenue disclosure', 'No published USDC/USD paid-compute revenue yet. THE decisive signal — watch for a paid-vs-incentivized split.']);
    if (chain?.staking) {
      const st = chain.staking; const left = st.unstaking.nosRemaining / st.unstaking.nosTotal;
      T.push(left < 0.2
        ? ['pass', '✓', 'Staked NOS — bleed exhausted', `${(st.active.nos / 1e6).toFixed(1)}M active (from ~29.7M pre-NNP-0001). Unstake queue ${(left * 100).toFixed(0)}% left → floor forming. Flip to fail if active stake drops below ${(st.active.nos * 0.9 / 1e6).toFixed(1)}M.`]
        : ['fail', '!', 'Staked NOS still bleeding', `${(st.active.nos / 1e6).toFixed(1)}M active; ${(st.unstaking.nosRemaining / 1e6).toFixed(1)}M still in cooldown.`]);
    } else {
      T.push(['watch', '◦', 'Staked NOS stabilizing', 'Staking fell ~29.7M → ~14M NOS; APR cut ~20%→~4% (NNP-0001). Watch for it to stop bleeding.']);
    }
    T.push(['watch', '◦', 'Roadmap ships (SSH · confidential compute · Sombrero billing)', 'Q3/Q4 2026 promises + Sombrero fiat ramps/billing (H2-26) + AMD/Intel/Apple hardware. Confirm they ship, not slip — the $SHDW failure mode is perpetual "upcoming".']);
    T.push(['watch', '◦', 'Newsflow silence', 'No protocol updates or disclosures in the last 30d (Messari, mid-Aug). Next public touchpoint: Solana Summit Belgrade, 26 Ago. Silence + falling throughput = the pattern not to rationalize.']);
    return T;
  }, [recPct, d, chain]);

  const tripStyle = { pass: [GRN, 'rgba(34,197,94,.12)'], fail: [RED, 'rgba(239,68,68,.12)'], watch: [AMB, 'rgba(245,158,11,.13)'] };

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: mb ? '16px 12px 50px' : '22px 20px 60px', fontFamily: "'JetBrains Mono',ui-monospace,monospace", minHeight: '100vh' }}>

      {/* BACK TO 10AM.PRO */}
      <a href="https://10am.pro?utm_source=nosana&utm_medium=header&utm_campaign=hub" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 12 }}>
        <img src="/logo.jpg" alt="10AMPRO" style={{ width: 34, height: 34, borderRadius: 6 }} />
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>← 10am.pro</span>
      </a>

      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', border: '1px solid var(--border)', background: 'var(--surface)', padding: '12px 16px', borderRadius: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, letterSpacing: '.02em' }}>
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><path d="M6 24V8l10 12V8m4 0v16" stroke={GRN} strokeWidth="3.2" strokeLinecap="square" /></svg>
          NOSANA
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: GRN, boxShadow: `0 0 8px ${GRN}` }} />
          <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase' }}>Network Telemetry</span>
        </div>
        <div style={{ flex: 1 }} />
        {!mb && <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>SYS.TIME <b style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{clock}</b> · UPD <b style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{updated}</b></div>}
        <button onClick={() => refresh(true)} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text-primary)', background: 'transparent', border: '1px solid var(--border)', borderRadius: 3, padding: '6px 11px', cursor: 'pointer' }}>↻ REFRESH</button>
      </div>
      <div style={{ margin: '10px 2px 0', color: 'var(--text-muted)', fontSize: 12 }}>
        &gt; executing telemetry.sh … <span style={{ color: status.includes('seeded') ? AMB : GRN }}>{status}</span>
      </div>
      <div style={{ margin: '4px 2px 0', color: 'var(--text-muted)', fontSize: 11, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Última actualización: <b style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{SEED.reviewed}</b> · datos de mercado en vivo</div>

      {/* THESIS STRIP */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
        {[
          ['Network signal · fundamentals', netHours ? `${netHours.rec}% of peak` : '—', netHours ? `Latest ${fmtInt(netHours.latest)} vs Oct-25 peak ${fmtInt(netHours.peak)} compute hrs` : 'GPU compute hours, latest vs Oct-25 peak', GRN, netColor],
          ['Market signal · price', drawdown != null ? `${drawdown}%` : '—', pxHist.price.length ? `NOS ${fmtPx(pxHist.price[pxHist.price.length - 1].y)} vs ATH $${SEED.ath}` : 'NOS vs all-time high', BLU, RED],
          ['Divergence watch', null, null, AMB, null],
        ].map((c, i) => (
          <div key={i} style={{ flex: 1, minWidth: 210, border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: '12px 14px', position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: c[3] }} />
            <div style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{c[0]}</div>
            {i < 2 ? (
              <>
                <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6, color: c[4] }}>{c[1]}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{c[2]}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 6, lineHeight: 1.35, color: divergence.c }}>{divergence.txt}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>Thesis confirms when network re-accelerates & market follows</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* KPIs */}
      {/* DECISION CARD — qué hacer con esto */}
      {(() => {
        const px = d?.price; const st = chain?.staking; const ho = chain?.holders;
        const inv = px != null && (BEAR ? px > TA.invalidation.level : px < TA.invalidation.level);
        const supLine = (() => { const a = TA.structure.support.a, b = TA.structure.support.b; const m = (b[1] - a[1]) / (b[0] - a[0]); return a[1] + m * (Date.now() - a[0]); })();
        const zone = px == null ? null : px >= 0.85 ? 'target' : px > 0.7365 ? 'extended' : px >= TA.invalidation.level ? 'breakout' : px > 0.3947 ? 'failed' : 'broken';
        const Z = {
          target: ['EN LA MEDIDA DE LA BANDERA — zona de tomar parcial', GRN, 'Sobre 0.85. La medida al 61.8% del impulso está acá. Sin revenue pagado publicado, este es el lugar de vender otra parte, no de sumar.'],
          extended: ['NUEVOS MÁXIMOS — bandera resuelta arriba', GRN, 'Sobre 0.7365 (máximo del 5 Oct). El path alcista está intacto y acelerando; no es zona de entrar: el próximo nivel para sumar es el retest de 0.68–0.74 que aguante.'],
          breakout: ['SOBRE 0.4657 — techo del último rebote recuperado, sesgo bajista anulado', GRN, 'Entre 0.4657 y 0.7365. Los cierres bajo la EMA100 (11 Nov) y bajo 0.3878 (13 Nov) quedaron como barridos: el techo del rebote del 5 Nov se recuperó al cierre y el camino es 0.4826–0.49 (la invalidación de octubre), 0.502, 0.5607 (el piso de la bandera — recuperado, la bandera se reconstruye) y 0.6836. Sumar solo con 2× volumen ($1.0M) y NOS subiendo más que SOL; sin eso, es un rebote largo dentro de la devolución.'],
          failed: ['DE VUELTA SOBRE 0.3947 — el máximo de junio recuperado después de cerrarse cuatro veces; sesgo bajista por la regla hasta 0.4657: la banda 0.3947–0.4657 es la que hay que reconstruir, escalón por escalón, con la barra', RED, `Bajo 0.4657 y sobre 0.3947. La invalidación de octubre se cumplió al cierre del 19 Oct (0.4826) y de vuelta el 24 Oct (0.4657): el impulso devolvió el 61.8% (0.4466) y el tramo fue rotación de sector; el 25–29 Oct resolvió ese nivel abajo, el 30 Oct cerró 0.4304, el 31 Oct cerró la EMA100 y el máximo de junio (0.3947) en una vela (0.3897), el 4 Nov cerró 0.3878 — y el 5 Nov cerró 0.4657, +20.1% con SOL +2.9%: siete escalones recuperados en una vela con una barra de $1.23M como máximo, no $1.4M. El 6 Nov devolvió el 48% (0.421); el 8 Nov recuperó el racimo EMA20–EMA50 y el 61.8% (0.455); el 9 Nov los devolvió (0.4241); el 11 Nov cerró 0.421 y la EMA100 (0.4031): el stop de la entrada del 5 Nov imprimió. El 12 Nov 0.3947 aguantó por 0.7% (0.3973) y el 13 Nov se cerró por cuarta vez con 0.3878 — el cierre más bajo del pullback — (0.3758, −5.4% con SOL −1.9%, con la primera barra sobre el promedio de la devolución, roja): el stop de lo legacy imprimió. Si el precio está acá, volvió sobre el máximo de junio desde abajo: no hay posición del 5 Nov (salió en 0.4031) ni legacy con stop (salió en 0.3758). Lo que vale es cómo volvió — recuperado al cierre con vela de rechazo y $1.3M+ y NOS sobre SOL, el 13 Nov fue un barrido y la octava entrada está impresa por arriba (stop en el cierre bajo 0.3679); recuperado con $0.5M, es el rebote llegando al nivel perdido y se vende. Arriba quedan la EMA100 (0.4064, techo), el racimo (0.4239–0.4369), 0.4466, 0.455 y 0.4657 — la invalidación, movida desde 0.5607 el 11 Nov: hasta ahí 0.3878–0.4064 es donde se reduce lo que no se quiere tener en 0.3679. Abajo, 0.3878, 0.3758, 0.3679 (78.6%, la medida), la EMA200 (0.362), 0.3125 y el rail del año en ~${supLine.toFixed(3)}. El sesgo bajista lo anula solo un cierre sobre 0.4657 con 2× volumen.`],
          broken: ['EL CIERRE MÁS BAJO DEL PULLBACK CERRADO — 0.3878 perdido el 13 Nov, el 78.6% (0.3679) tocado en vivo: el cierre decide', RED, 'Bajo 0.3947. El máximo de junio se cerró cuatro veces (31 Oct, 3, 4 y 13 Nov) y se recuperó una (5 Nov, +20.1%); la EMA100 se cerró el 11 Nov (0.4031 — el stop de la entrada del 5 Nov) y 0.3878, el cierre más bajo del pullback y el escalón que decidía si noviembre hizo piso, se cerró el 13 Nov (0.3758, −5.4% con SOL −1.9%, con la primera barra sobre el promedio de la devolución, roja — el stop de lo legacy). Lo que quedaba salió en 0.3758: si el precio está acá, no hay posición con stop que siga adentro. Un impulso que se devuelve entero llega al nivel del breakout: 0.3679 (78.6%, la medida, el +1M — a 0.35% en vivo, alcanzado por la regla) → 0.362 (EMA200, la última media) → 0.3125 (el breakout del 21 Sep) → el rail (~0.292) → 0.2675. La octava entrada es el 78.6% que aguante al cierre con vela de rechazo abajo y $1.3M+ (stop en el cierre bajo la EMA200), o el cierre de vuelta sobre 0.3878 con la misma barra y NOS sobre SOL (stop en el cierre bajo 0.3679). No promediar a la baja porque la medida se tocó: la entrada es el cierre que la aguante con la barra, no el nivel tocado — y la única barra sobre el promedio que trajo la devolución fue la que cerró el escalón.'],
        };
        const z = zone ? Z[zone] : ['CARGANDO', 'var(--text-muted)', ''];
        const B = ({ c, children }) => <div style={{ display: 'flex', gap: 8, fontSize: 11.5, lineHeight: 1.5, marginTop: 4 }}><span style={{ color: c, fontWeight: 800 }}>›</span><span>{children}</span></div>;
        const H = ({ c, children }) => <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: c, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>{children}</div>;
        const bleed = st ? st.unstaking.nosRemaining / st.unstaking.nosTotal : null;
        return (
          <div style={{ marginTop: 14, border: `1px solid ${z[1]}`, borderRadius: 4, background: 'var(--surface)', padding: 14, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', fontFamily: "'JetBrains Mono',monospace" }}>
              <span style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Qué hacer con esto · hoy</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: z[1], letterSpacing: '.04em' }}>{z[0]}</span>
              {px != null && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>NOS {fmtPx(px)} · stance <b style={{ color: 'var(--text-primary)' }}>HOLD · TRIM-INTO-STRENGTH</b></span>}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 6 }}>{z[2]}</div>
            <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : 'repeat(3,1fr)', gap: 12, marginTop: 12, color: 'var(--text-secondary)' }}>
              <div>
                <H c={RED}>Si ya tenés NOS</H>
                <B c={RED}>El cierre bajo <b>0.49</b> se imprimió dos veces — 0.4826 (19 Oct) y 0.4657 (24 Oct): el stop mental del plan se cumplió, el sesgo es bajista por la regla y desde ahí el precio completó la secuencia bajista entera — el 61.8% (0.4466), 0.4304 con la primera barra de la devolución, la EMA100 y el máximo de junio (0.3947) en una vela, 0.3897 — con los dos stops impresos (el del rebote el 3 Nov, el de lo que quedaba el 4 Nov). <b>El 5 Nov cerró 0.4657, +20.1% con SOL +2.9%</b>: siete escalones en una vela con una barra de $1.23M como máximo (la condición de $1.3M no se cumplió). El 6 Nov devolvió el 48% (0.421); el 8 Nov recuperó el racimo y el 61.8% (0.455); el 9 Nov los devolvió (0.4241); <b>el 11 Nov cerró 0.421 y la EMA100 (0.4031): el stop de la entrada del 5 Nov imprimió</b> — esa posición salió en 0.4031. El 12 Nov 0.3947 aguantó por 0.7% (0.3973); <b>el 13 Nov cerró 0.3758, −5.4% con SOL −1.9% (2.8×): 0.3947 cerrado por cuarta vez y 0.3878 — el cierre más bajo del pullback, el stop de lo que se tenía de antes — cerrado por 3.1%, con la primera barra sobre el promedio de la devolución ($0.61M, el 125%), roja</b>. Lo que quedaba salió en 0.3758: si tenías de antes con el stop escrito acá, ya no tenés. Hoy 0.3692, −1.8% con SOL −1.5%: el 78.6% (<b>0.3679</b>, la medida) a 0.35%, tocado por la regla en vivo; la EMA200 (0.362) a 2.0%. No se repone en 0.37 porque la medida se tocó: se repone con el cierre que la aguante con vela de rechazo y $1.3M+, o con el cierre de vuelta sobre 0.3878 con la misma barra y NOS sobre SOL.</B>
                <B c={RED}><b>No se suma en 0.3679 porque el precio lo tocó, y no se suma arriba de 0.3878 sin la barra.</b> La invalidación sigue en <b>0.4657</b> (el techo del último rebote, el cierre del 5 Nov y del 24 Oct) con 2× volumen ($1.0M) — 26% arriba —: hasta ahí cada rebote es para reducir lo que no querés tener en 0.3125, y la zona es <b>0.3878–0.4064</b> (el escalón perdido y la EMA100, hoy techo) si llega sin NOS sobre SOL. Lo que cambió esta semana es que el libro dejó de estar vacío en la peor dirección: la devolución entera se hizo con el 52–92% del promedio y la primera barra sobre el promedio (el 125%) fue la roja que cerró 0.3878 — el vendedor apareció donde el comprador no. El histograma del MACD pasó de −0.00002 a −0.0031 (negativo y acelerando), la EMA20 está 3.0% bajo la EMA50 — el cruce bajista del 4 Nov abriéndose por cuarta revisión —, el motor sigue 3/7 BEAR y ahora mide el rail (0.292), no el 78.6%. El RSI subió a 46.5 con el precio 8% más abajo: salieron las barras del 30–31 Oct de la ventana — la ventana, no el comprador. Se suma con el cierre que aguante 0.3679 con vela y $1.3M+, o con el cierre de vuelta sobre 0.3878 con la misma barra; no en 0.37 porque el precio llegó a la medida.</B>
                <B c={RED}>Si no tenés stop porque sos legacy: 0.3758 (el cierre del 13 Nov), <b>0.3878</b> (el escalón perdido), 0.3947, la EMA100 (<b>0.4064</b>, techo), el racimo (0.4239–0.4369) y 0.4657 están arriba (1.8%, 5%, 7%, 10%, 15–18% y 26%); el precio en vivo está 0.35% sobre 0.3679 y 2.0% sobre la EMA200. El siguiente nivel abajo es el 78.6% (<b>0.3679</b>, la medida — tocado), después la EMA200 (0.362, la última media), 0.3125 (el breakout del 21 Sep) y el rail del año en {supLine.toFixed(3)}. Entre 0.3679 y 0.362 hay 1.6%; entre 0.362 y 0.3125 no hay ningún nivel. Si querés reducir, el lugar es 0.3878–0.4064 en un rebote sin NOS sobre SOL — no 0.37.</B>
                <B c={RED}>Si estás staked 181–365d: ya pagaste el costo. No rompas el lock por el chart, ni para arriba ni para abajo.</B>
              </div>
              <div>
                <H c={GRN}>Si querés entrar</H>
                <B c={GRN}>No compres el nivel tocado: el retest de 0.3878–0.3947 que esta página escribió como la séptima entrada era el retest que <i>aguantara al cierre</i>, y el cierre imprimió del otro lado (0.3758, 13 Nov) — después de +175% en tres semanas la bandera se rompió por abajo, la EMA20 cedió, el 0.49 se cerró dos veces, la EMA50 se perdió, el 61.8% se perdió, 0.4304 se cerró con la primera barra de la devolución, la EMA100 y 0.3947 se cerraron en una vela, se recuperaron sin volumen y se devolvieron, el 4 Nov cerró 0.3878, el 5 Nov recuperó siete escalones en una vela de +20.1% con la barra bajo la condición, el 6 Nov devolvió el 48%, el 8 Nov recuperó las medias, el 9 Nov las devolvió, el 11 Nov cerró la EMA100 con el 92% y el 13 Nov cerró 0.3947 y 0.3878 con la primera barra sobre el promedio de la devolución — roja. La red está igual: comprás el sector, no el activo. NOS −12.5% en la semana con SOL −10.6% (1.2×), −5.4% contra −1.9% en la vela que perdió el escalón: el movimiento es propio, no prestado — y hoy el 78.6% está tocado con el libro del lado del vendedor.</B>
                <B c={GRN}>Las entradas del plan (0.54–0.56, 0.49–0.502 y el retest de la EMA50 en 0.467) se cancelaron las tres. La cuarta era el retest del <b>máximo de junio (0.3947)</b>: llegó el 31 Oct–1 Nov con dos de tres. La quinta — el cierre que recupere 0.3947 y la EMA100 con vela y $1.3M+ — <b>imprimió el 5 Nov</b> con la barra corta y <b>salió en su stop el 11 Nov</b> (0.4031). La sexta — el retest de la EMA100 que aguantara al cierre — no imprimió. La séptima — el retest de <b>0.3878–0.3947</b> que aguantara al cierre — <b>no imprimió: el nivel se cerró el 13 Nov (0.3758)</b> con la primera barra sobre el promedio de la devolución, roja. La octava es ésta: <b>el 78.6% (0.3679) que aguante al cierre</b> con vela de rechazo abajo y $1.3M+ — está a 0.35% en vivo, alcanzado por la regla; 25% del tamaño objetivo, stop en el cierre bajo la <b>EMA200 (0.362)</b> —, o <b>el cierre de vuelta sobre 0.3878</b> con la misma barra y NOS sobre SOL, stop en el cierre bajo 0.3679; se compra con el cierre impreso, no con la medida tocada a la mañana con $0.61M rojos. Si 0.3679 no aguanta, la siguiente es 0.3125 (el breakout del 21 Sep) con $1.3M+ y vela que cierre arriba, stop en el cierre bajo el rail (~0.292). Arriba, el cierre sobre <b>0.4657</b> con 2× volumen ($1.0M) y NOS sobre SOL anula el sesgo y es la entrada por fuerza.</B>
                <B c={GRN}>Entrada por fuerza: cierre diario &gt; <b>0.4657</b> (techo del último rebote recuperado — la invalidación, movida desde 0.5607 el 11 Nov) con 2× volumen, después &gt; 0.49 y &gt; 0.5607 (piso de la bandera). Entrás más caro, pero con el sesgo de vuelta alcista. Un cierre sobre 0.3878, 0.3947, la EMA100 (0.4064) o el racimo (0.4239–0.4369) con el libro vacío no es entrada: es el rebote llegando al nivel perdido — el segundo (0.455, 8 Nov) duró una vela, el tercero no llegó al racimo y el cuarto todavía no empezó; con $1.3M+ y NOS sobre SOL, el cierre sobre 0.3878 es la octava entrada por arriba y se acompaña con el stop en el cierre bajo 0.3679.</B>
                <B c={GRN}>Nunca full size en un alt de $40M con $0.3–1.2M de volumen diario: tu orden es el libro.</B>
              </div>
              <div>
                <H c={AMB}>Lo que cambia la tesis</H>
                <B c={AMB}><b>Revenue pagado publicado</b> — el único dato que convierte esto en inversión y no en trade. Hoy: no existe.</B>
                <B c={AMB}>Compute hours volviendo sobre <b>150k/mes</b> (hoy ~{netHours ? fmtInt(netHours.latest) : '114k'}). Mientras cae, la red no valida el precio.</B>
                <B c={AMB}>{st ? <>Stake activo bajo <b>{(st.active.nos * 0.9 / 1e6).toFixed(1)}M</b> o las 12 ballenas empezando a deshacer → acelerar salida.</> : 'Stake activo cayendo o ballenas deshaciendo → acelerar salida.'}</B>
                <B c={AMB}>{ho ? <>Movimiento de las 3 wallets treasury-shaped ({(ho.treasuryLikeNos / 1e6).toFixed(0)}M NOS) hacia Gate/MEXC = salir sin esperar el chart.</> : 'Tesorería moviéndose a exchanges = salir.'}</B>
              </div>
            </div>
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text-muted)', display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'baseline' }}>
              <span>Niveles y triggers se recalculan con el precio vivo. Marco y sizing son del research de 10AMPRO, no consejo de inversión.</span>
              <a href="https://10am.pro?utm_source=nosana&utm_medium=decision&utm_campaign=hub" style={{ color: GRN, textDecoration: 'none', marginLeft: 'auto', fontFamily: "'JetBrains Mono',monospace" }}>más tesis en 10am.pro →</a>
            </div>
          </div>
        );
      })()}

      <Eyebrow>Core data points</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(2,1fr)' : 'repeat(6,1fr)', gap: 10 }}>
        {kpi('NOS Price', fmtPx(d?.price), <>
          {d?.chg != null && <span style={pill(d.chg >= 0 ? GRN : RED, d.chg >= 0 ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)')}>{d.chg >= 0 ? '▲' : '▼'} {Math.abs(d.chg).toFixed(2)}% 24h</span>}
          {prev && <Delta cur={d?.price} prev={prev.price} />}
        </>, BLU)}
        {kpi('Market Cap', fmtM(d?.mcap), prev ? <Delta cur={d?.mcap} prev={prev.mcap} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>)}
        {kpi('Completed Jobs', fmtInt(d?.completed), prev ? <Delta cur={d?.completed} prev={prev.completed} pct={false} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>, GRN)}
        {kpi('Total Job Hours', fmtInt(d?.jobHours), prev ? <Delta cur={d?.jobHours} prev={prev.jobHours} pct={false} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>, GRN)}
        {kpi('Online GPU Hosts', fmtInt(d?.hosts), prev ? <Delta cur={d?.hosts} prev={prev.hosts} pct={false} /> : <span style={pill('var(--text-muted)', 'rgba(255,255,255,.04)')}>baseline</span>, GRN)}
        {kpi('Running / Queued', fmtInt(d?.running), <span style={{ color: 'var(--text-muted)' }}>{fmtInt(d?.queued)} queued</span>)}
      </div>

      {/* NETWORK EVOLUTION */}
      <Eyebrow>Network evolution — is real usage growing?</Eyebrow>
      <div style={panel}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{metric === 'hours' ? 'GPU Compute Hours' : 'Completed Jobs'}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{metric === 'hours' ? 'Monthly throughput — leading indicator of paid demand vs incentives' : 'Jobs processed per bucket'}</div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginLeft: 'auto', flexWrap: 'wrap' }}>
            <div style={segWrap}>
              <button style={seg(metric === 'hours')} onClick={() => setMetric('hours')}>COMPUTE HRS</button>
              <button style={seg(metric === 'count')} onClick={() => setMetric('count')}>JOBS</button>
            </div>
            <div style={segWrap}>
              {PERIODS.map((p) => <button key={p.k} style={seg(period === p.k)} onClick={() => setPeriod(p.k)}>{p.label}</button>)}
            </div>
          </div>
        </div>
        <AreaChart points={net} color={GRN} monthly={monthlyNet} fmtY={(v) => (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : Math.round(v))} height={mb ? 220 : 300} />
        {netHours && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
            Latest bucket ≈ <b style={{ color: GRN }}>{fmtInt(netHours.latest)}</b> compute hrs · peak ≈ {fmtInt(netHours.peak)} · <b>{netHours.rec}%</b> of peak.
          </div>
        )}
      </div>

      {/* MARKET */}
      <Eyebrow dot={BLU}>Market context — price & market cap (CoinGecko)</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 14 }}>
        <div style={panel}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
            <div><div style={{ fontSize: 13, fontWeight: 700, color: BLU }}>NOS Price</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>USD</div></div>
            <div style={{ ...segWrap, marginLeft: 'auto' }}>
              {['90', '365', 'max'].map((k) => <button key={k} style={segBlue(days === k)} onClick={() => setDays(k)}>{k === 'max' ? 'MAX' : k === '90' ? '90D' : '1Y'}</button>)}
            </div>
          </div>
          <AreaChart points={pxHist.price} color={BLU} monthly={days !== '90'} fmtY={(v) => '$' + v.toFixed(2)} height={mb ? 200 : 240} />
        </div>
        <div style={panel}>
          <div style={{ marginBottom: 6 }}><div style={{ fontSize: 13, fontWeight: 700, color: BLU }}>Market Cap</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>USD · fully circulating (~100M NOS)</div></div>
          <AreaChart points={pxHist.mcap} color={BLU} monthly={days !== '90'} fmtY={(v) => '$' + (v / 1e6).toFixed(0) + 'M'} height={mb ? 200 : 240} />
        </div>
      </div>

      {/* SNAPSHOT LOG */}
      {/* ON-CHAIN SUPPLY OVERHANG */}
      <Eyebrow dot={AMB}>Supply overhang — who has to sell · on-chain (Solana) · live</Eyebrow>
      <div style={{ border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: 16 }}>
        {!chain ? <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>scanning staking program + top holders…</div> : (() => {
          const st = chain.staking, ho = chain.holders, S = chain.supply || 100e6;
          const M = (n) => (n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(0) + 'k' : String(n));
          const pc = (n) => (n / S * 100).toFixed(1) + '%';
          const dailyNos = d?.price && trend?.volRatio != null && series?.v?.length ? (series.v.slice(-20).reduce((a, b) => a + b, 0) / 20) / d.price : null;
          const segs = st && ho ? [
            ['Treasury-shaped ≥5%', ho.treasuryLikeNos, '#8b5cf6'],
            ['Staked (active)', st.active.nos, GRN],
            ['Unstake cooldown', st.unstaking.nosRemaining, AMB],
            ['On exchanges', ho.exchangeNos, RED],
            ['DEX pools', ho.dexNos, BLU],
            ['Vesting-like', ho.programNos, '#a78bfa'],
          ] : [];
          const known = segs.reduce((a, b) => a + b[1], 0);
          const seriesRow = (label, val, sub, col) => (
            <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginTop: 3, color: col || 'var(--text-primary)' }}>{val}</div>
              {sub && <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>}
            </div>
          );
          return (
            <>
              {/* supply map */}
              {segs.length > 0 && (
                <>
                  <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Supply map · 100M NOS · where the tokens sit</div>
                  <div style={{ display: 'flex', height: 22, borderRadius: 3, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    {segs.map(([l, v, c]) => <div key={l} title={`${l}: ${M(v)} (${pc(v)})`} style={{ width: `${v / S * 100}%`, background: c, opacity: .85 }} />)}
                    <div style={{ flex: 1, background: 'rgba(255,255,255,.05)' }} title={`Float / unlabeled: ${M(S - known)}`} />
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6, fontSize: 10.5, color: 'var(--text-muted)' }}>
                    {segs.map(([l, v, c]) => <span key={l}><span style={{ color: c }}>■</span> {l} <b style={{ color: 'var(--text-primary)' }}>{pc(v)}</b></span>)}
                    <span><span style={{ color: 'rgba(255,255,255,.25)' }}>■</span> Float/unlabeled <b style={{ color: 'var(--text-primary)' }}>{pc(S - known)}</b></span>
                  </div>
                </>
              )}
              {st && (
                <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(2,1fr)' : 'repeat(6,1fr)', gap: 8, marginTop: 14 }}>
                  {seriesRow('Staked · active', M(st.active.nos), `${st.active.count.toLocaleString()} stakes · avg lock ${st.avgDurationDays}d`, GRN)}
                  {seriesRow('Unstake queue left', M(st.unstaking.nosRemaining), `of ${M(st.unstaking.nosTotal)} unstaked · ${M(st.unstaking.nosReleased)} already out`, AMB)}
                  {seriesRow('Drip next 30d', M(st.unstaking.release[1].nos), dailyNos ? `≈ ${(st.unstaking.release[1].nos / 30 / dailyNos * 100).toFixed(1)}% of daily volume` : 'linear vesting', AMB)}
                  {seriesRow('Locked 181–365d', M(st.durationMix[3].nos), `${(st.durationMix[3].nos / st.active.nos * 100).toFixed(0)}% of stake · conviction`, GRN)}
                  {seriesRow('Flight-ready ≤14d', M(st.durationMix[0].nos), `${st.durationMix[0].count.toLocaleString()} stakes · can exit fast`, RED)}
                  {seriesRow('Whale stakes ≥100k', `${st.whales.count} · ${M(st.whales.nos)}`, `${(st.whales.nos / st.active.nos * 100).toFixed(0)}% of active stake`, 'var(--text-primary)')}
                </div>
              )}
              {st && (
                <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 10, marginTop: 12 }}>
                  <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
                    <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, marginBottom: 8 }}>Unstake release schedule · forced supply</div>
                    {st.unstaking.release.map((r, i) => {
                      const prev = i ? st.unstaking.release[i - 1].nos : 0; const inc = r.nos - prev; const max = st.unstaking.release[3].nos || 1;
                      return (
                        <div key={r.days} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, marginBottom: 5 }}>
                          <span style={{ width: 52, color: 'var(--text-muted)' }}>+{r.days}d</span>
                          <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,.05)', borderRadius: 2 }}><div style={{ width: `${r.nos / max * 100}%`, height: '100%', background: AMB, borderRadius: 2 }} /></div>
                          <span style={{ width: 120, textAlign: 'right', fontWeight: 700 }}>{M(r.nos)} <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>(+{M(inc)})</span></span>
                        </div>
                      );
                    })}
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 6, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Cumulative NOS becoming withdrawable from cooldown. Each unstake vests linearly over its original lock.</div>
                  </div>
                  <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
                    <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: GRN, marginBottom: 8 }}>Active stake by lock duration</div>
                    {st.durationMix.map((b) => (
                      <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, marginBottom: 5 }}>
                        <span style={{ width: 66, color: 'var(--text-muted)' }}>{b.label}</span>
                        <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,.05)', borderRadius: 2 }}><div style={{ width: `${b.nos / st.active.nos * 100}%`, height: '100%', background: b.label === '≤14d' ? RED : GRN, borderRadius: 2 }} /></div>
                        <span style={{ width: 120, textAlign: 'right', fontWeight: 700 }}>{M(b.nos)} <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>· {b.count.toLocaleString()}</span></span>
                      </div>
                    ))}
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 6, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Long locks = holders who accepted the APR cut and stayed. ≤14d = yield tourists one click from the exit.</div>
                  </div>
                </div>
              )}
              {ho && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', gap: 14, fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6, flexWrap: 'wrap' }}>
                    <span>Top 20 token accounts</span><span>top10 = <b style={{ color: 'var(--text-primary)' }}>{ho.top10pct}%</b></span><span>top20 = <b style={{ color: 'var(--text-primary)' }}>{ho.top20pct}%</b></span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: '2px 14px', fontSize: 11 }}>
                    {ho.top.map((h, i) => {
                      const col = { exchange: RED, treasury_like: '#8b5cf6', dex: BLU, program: '#a78bfa', staking_vault: GRN, unlabeled: 'var(--text-muted)' }[h.kind];
                      return (
                        <div key={h.tokenAccount} style={{ display: 'flex', gap: 8, alignItems: 'baseline', padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                          <span style={{ width: 18, color: 'var(--text-muted)' }}>{i + 1}</span>
                          <a href={`https://solscan.io/account/${h.owner || h.tokenAccount}`} target="_blank" rel="noopener" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: "'JetBrains Mono',monospace" }}>{(h.owner || h.tokenAccount).slice(0, 4)}…{(h.owner || h.tokenAccount).slice(-4)}</a>
                          <span style={{ color: col, fontSize: 10.5, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.label || '—'}</span>
                          <span style={{ fontWeight: 700 }}>{M(h.nos)}</span>
                          <span style={{ width: 44, textAlign: 'right', color: 'var(--text-muted)' }}>{h.pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {st && ho && (
                <div style={{ marginTop: 12, padding: '10px 12px', border: `1px solid ${AMB}`, borderRadius: 4, background: 'rgba(245,158,11,.05)', fontSize: 11.5, lineHeight: 1.55, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
                  <b style={{ color: AMB, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.08em' }}>READ ·</b> <b>The unstake bleed is {st.unstaking.nosRemaining / st.unstaking.nosTotal < 0.2 ? 'mostly spent' : 'still running'}.</b> {M(st.unstaking.nosReleased)} of the {M(st.unstaking.nosTotal)} that left staking is already withdrawable; only {M(st.unstaking.nosRemaining)} is still in cooldown, dripping ~{M(st.unstaking.release[1].nos)} over the next 30 days{dailyNos ? ` (≈${(st.unstaking.release[1].nos / 30 / dailyNos * 100).toFixed(1)}% of daily volume — absorbable)` : ''}. The forced seller from NNP-0001 is not the overhang anymore.
                  <div style={{ marginTop: 6 }}><b>The overhang is {pc(ho.treasuryLikeNos)} of supply in {ho.top.filter((h) => h.kind === 'treasury_like').length} unlabeled wallets</b> — allocation-shaped (company / team / mining reserve per the tokenomics). No vesting program holds them; they are signer-controlled and can move any day. Plus {pc(ho.exchangeNos)} already sitting on Gate and MEXC — the two venues that print the price. That exchange float is the ammunition for any breakdown.</div>
                  <div style={{ marginTop: 6 }}><b>Conviction is real but small:</b> {M(st.durationMix[3].nos)} NOS locked 181–365d by holders who took the APR cut and stayed. {st.whales.count} whale stakes hold {(st.whales.nos / st.active.nos * 100).toFixed(0)}% of active stake — the floor is a dozen wallets. If those start unstaking, the queue refills and the TA path accelerates. Watch this number, not the chart.</div>
                  {ho.roundLots > 0 && <div style={{ marginTop: 6 }}><b>{ho.roundLots} wallets hold exact 250k multiples</b> (e.g. 750,000) — allocation tranches, not market buys. Treat as latent supply.</div>}
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(245,158,11,.25)' }}>
                    <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, fontFamily: "'JetBrains Mono',monospace", marginBottom: 3 }}>Decisión</div>
                    <div>› El unstake ya no es argumento para vender: <b>no uses "el staking sangra" como razón</b>.</div>
                    <div>› Alerta real = las 3 wallets grandes moviéndose o el stake activo perforando {(st.active.nos * 0.9 / 1e6).toFixed(1)}M. <b>Eso sí es salir.</b></div>
                    <div>› {(ho.exchangeNos / 1e6).toFixed(1)}M en exchanges = ~{d?.price && series?.v?.length ? (ho.exchangeNos / ((series.v.slice(-20).reduce((a, b) => a + b, 0) / 20) / d.price)).toFixed(1) : '2'} días de volumen. Un breakdown tiene munición; <b>no compres el primer rebote bajo 0.22</b>.</div>
                  </div>
                </div>
              )}
              {chain.errors?.length > 0 && <div style={{ fontSize: 10.5, color: RED, marginTop: 8 }}>partial: {chain.errors.join(' · ')}</div>}
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Source: Solana RPC, read on every load — staking program <code>nosS…rTJE</code> (all StakeAccounts decoded) + largest token accounts of <code>nosX…oo7</code>. Exchange labels are community labels (Solscan), unverified. Cached 10 min.</div>
            </>
          );
        })()}
      </div>

      {/* RELATIVE + POSITIONING */}
      <Eyebrow dot="#8b5cf6">Relativo y posicionamiento — ¿se mueve solo o sigue a SOL? · beta · dominancia · funding</Eyebrow>
      <RelativeLayer cgId="nosana" symbol="NOS" mb={mb} />

      {/* TECHNICAL ANALYSIS */}
      <Eyebrow dot={GRN}>Technical analysis — NOS/USD 1D · forecast 1M / 3M / 1Y · read {TA.reviewed}</Eyebrow>
      <div style={{ border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', padding: 16 }}>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{TA.read}</div>
        {/* LIVE TREND */}
        {(() => {
          const t = trend;
          const col = !t ? 'var(--text-muted)' : t.score >= 5 ? GRN : t.score === 4 ? AMB : RED;
          const inv = d?.price != null && (BEAR ? d.price > TA.invalidation.level : d.price < TA.invalidation.level);
          const tile = (k, v, sub, c) => (
            <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '8px 10px', minWidth: 0 }}>
              <div style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{k}</div>
              <div style={{ fontSize: 15, fontWeight: 800, marginTop: 3, color: c || 'var(--text-primary)' }}>{v}</div>
              {sub ? <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div> : null}
            </div>
          );
          const pc = (x) => `${x >= 0 ? '+' : ''}${(x * 100).toFixed(1)}%`;
          return (
            <div style={{ marginTop: 14, border: `1px solid ${col}`, borderRadius: 4, padding: 12, background: 'rgba(255,255,255,.015)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Trend now · live</div>
                <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '.06em', color: col }}>{t ? t.regime : 'computing…'}</div>
                {t && <div style={{ display: 'flex', gap: 3 }}>{t.checks.map((x, i) => <span key={i} title={x[0]} style={{ width: 14, height: 6, borderRadius: 2, background: x[1] ? col : 'rgba(255,255,255,.08)' }} />)}</div>}
                {t && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.score}/7 bullish checks</span>}
                <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: inv ? RED : GRN }}>
                  FORECAST {BEAR ? 'BEAR' : 'BULL'} · {inv ? (BEAR ? 'INVALIDATED ›' : 'INVALIDATED ‹') : (BEAR ? 'INTACT ‹' : 'INTACT ›')} ${TA.invalidation.level}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 10.5, color: 'var(--text-muted)', marginTop: 8 }}>
                <span>Data through <b style={{ color: 'var(--text-primary)' }}>{stamps.dataThrough}</b> close</span>
                <span>Chart built <b style={{ color: 'var(--text-primary)' }}>{stamps.builtOn}</b></span>
                <span>Editor read <b style={{ color: 'var(--text-primary)' }}>{TA.reviewed}</b>{stamps.daysAgo != null ? ` (${stamps.daysAgo}d ago)` : ''}</span>
                {stamps.atRead != null && <span>Price at read <b style={{ color: 'var(--text-primary)' }}>${stamps.atRead.toFixed(4)}</b>{stamps.sinceRead != null ? <> · since read <b style={{ color: stamps.sinceRead >= 0 ? GRN : RED }}>{pc(stamps.sinceRead)}</b></> : null}</span>}
              </div>
              {t && (
                <div style={{ display: 'grid', gridTemplateColumns: mb ? 'repeat(2,1fr)' : 'repeat(6,1fr)', gap: 8, marginTop: 10 }}>
                  {tile('EMA stack', `${t.last > t.e20 ? '▲' : '▼'}20 ${t.last > t.e50 ? '▲' : '▼'}50 ${t.last > t.e200 ? '▲' : '▼'}200`, `${t.e20.toFixed(3)} · ${t.e50.toFixed(3)} · ${t.e200.toFixed(3)}`, t.last > t.e200 ? GRN : RED)}
                  {tile('EMA200 slope', pc(t.slope200), '20d change', t.slope200 > 0 ? GRN : RED)}
                  {tile('MACD histo', (t.hist >= 0 ? '+' : '') + t.hist.toFixed(4), t.histUp ? 'rising' : 'falling', t.hist > 0 ? GRN : RED)}
                  {tile('RSI 14', t.rsi.toFixed(0), t.rsi > 70 ? 'overbought' : t.rsi < 30 ? 'oversold' : 'neutral zone', t.rsi > 50 ? GRN : RED)}
                  {tile('7d / 30d', `${pc(t.chg7)} / ${pc(t.chg30)}`, 'momentum', t.chg30 > 0 ? GRN : RED)}
                  {tile('vs path', d?.price ? pc(d.price / TA.path[0].target - 1) : '—', 'vs +1M target', 'var(--text-primary)')}
                </div>
              )}
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
                Regime is recomputed on every load from 365 daily closes (CoinGecko): EMA 20/50/200, MACD (12,26,9), RSI 14. The forecast below is the {TA.reviewed} read; this strip tells you whether the market is still agreeing with it.
              </div>
            </div>
          );
        })()}
        {/* STRUCTURE CHART */}
        <div style={{ marginTop: 14, border: '1px solid var(--border)', borderRadius: 4, padding: '8px 4px 4px' }}>
          <div style={{ display: 'flex', gap: 14, fontSize: 10.5, padding: '0 10px 4px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span style={{ color: AMB, fontWeight: 800, letterSpacing: '.1em' }}>STRUCTURE · {TA.structure.pattern.toUpperCase()}</span>
            <span><span style={{ color: RED }}>╌</span> lower highs</span>
            <span><span style={{ color: GRN }}>╌</span> higher lows</span>
            <span><span style={{ color: AMB }}>┆</span> apex</span>
            <span style={{ marginLeft: 'auto' }}>365d daily closes · log scale · volume at base · as of {stamps.dataThrough}</span>
          </div>
          <TAStructure series={series} ta={TA} mb={mb} />
        </div>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 10, fontSize: 11.5, lineHeight: 1.55, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
          <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
            <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>Pattern read</div>
            <b>Impulso vertical, bandera rota por abajo, el 0.49 cerrado dos veces, dos rebotes frenados bajo el piso de la bandera, el 61.8% resuelto abajo, 0.4304 cerrado con la primera barra de la devolución, la EMA100 y el máximo de junio cerrados en una vela, recuperados sin volumen y devueltos, 0.3878 (4 Nov) — siete escalones recuperados en una vela de +20.1% (0.4657, 5 Nov, con la barra bajo la condición), el 48% devuelto respetando la EMA100 (0.421, 6 Nov), las medias recuperadas con el mercado rojo (0.455, 8 Nov), devueltas en una vela con el libro vacío (0.4241, 9 Nov), 0.421 y la EMA100 cerrados (0.4031, 11 Nov — el stop de la entrada del 5 Nov), 0.3947 aguantado por 0.7% (0.3973, 12 Nov) y cerrado por cuarta vez con 0.3878 — el cierre más bajo del pullback, el escalón que decidía — por 3.1% (0.3758, 13 Nov, −5.4% con SOL −1.9%, 2.8×) con la primera barra sobre el promedio de la devolución, roja: el stop de lo legacy impreso, el cuarto paso de la secuencia bajista, el cierre más bajo desde el breakout del 21 Sep. Hoy 0.3692 con el 78.6% (0.3679, el +1M) a 0.35% — tocado por la regla en vivo, el cierre decide. Sesgo bajista por la regla hasta 0.4657 (la invalidación, movida desde 0.5607); motor 3/7 BEAR, dibujando el triángulo 0.7365 → 0.4657 con la línea de arriba (0.3918) sobre el precio y midiendo el rail (0.292).</b> Breakout del triángulo el 21 Sep (0.3125) → 0.49 el 1 Oct → 0.7365 el 5 Oct, sin un solo cierre debajo de la EMA20 en el camino: la medida del triángulo (0.47) se pasó en un 57%. Desde el 5 Oct: máximos decrecientes 0.7365 → 0.6836 → 0.6016, el piso de la bandera (0.5607) perdido el 13 Oct, la EMA20 el 16 Oct (0.5084), el cierre bajo 0.49 el 19 Oct (0.4826). Dos rebotes — 0.5493 (20 Oct) y 0.5521 (22 Oct), frenados a 1.5–2% de 0.5607 sin volumen — y la devolución: 0.4999 (23 Oct), 0.4657 (24 Oct), 0.444 → 0.4385 (25–29 Oct, el 61.8% resuelto abajo), 0.4093 (30 Oct, bajo 0.4304 con $0.80M), 0.3897 (31 Oct, la EMA100 y 0.3947 en una vela), 0.4021 y 0.4102 (1–2 Nov, recuperados sin volumen), 0.3922 (3 Nov, devueltos), 0.3878 (4 Nov). El rebote: 0.4657 (5 Nov, +20.1% con SOL +2.9% — siete escalones en una vela; la barra, como máximo, $1.23M), 0.421 (6 Nov, −9.6% — la EMA100 aguantada por 3.1%), 0.4253 (7 Nov), 0.455 (8 Nov, +7.0% con SOL −0.4% — el racimo y el 61.8% recuperados). La devolución del rebote: 0.4241 (9 Nov, −6.8% con SOL −3.7%), 0.4295 (10 Nov), 0.4031 (11 Nov, −6.1% con SOL −3.8% — 0.421 y la EMA100 cerrados con el 92% del promedio), 0.3973 (12 Nov, −1.4% con SOL −0.04% — 0.3947 aguantado por 0.7%, el cuarto test), 0.3758 (13 Nov, −5.4% con SOL −1.9% — 0.3947 cerrado por cuarta vez, 0.3922 cerrado, 0.3878 cerrado por 3.1%, con $0.61M, el 125% del promedio: la primera barra sobre el promedio de la devolución, roja) y hoy 0.3692 en vivo, −1.8% con SOL −1.5%. Veinte sesiones de devolución completaron la secuencia entera hasta 0.3878; una vela deshizo siete niveles con menos volumen del que se le atribuyó; seis velas después todo eso estaba devuelto y la media que había respetado cerrada; y dos velas más tarde el escalón que decidía si noviembre hizo piso se cerró con la primera barra que trajo la devolución — roja. Un rebote que termina debajo de donde empezó, seguido de un cierre bajo el mínimo que lo originó con el vendedor adentro, es la devolución llegando a su medida, no un piso. Lo que sigue arriba es 0.3758, 0.3878 (el escalón perdido, hoy techo), 0.3947, la EMA100 (0.4064, pegada a la línea del motor en 0.3918), el racimo (0.4239–0.4369) y 0.4657; lo que sigue abajo es 0.3679 (78.6%, a 0.35%), la EMA200 (0.362), 0.3125 (el breakout) y el rail (~0.292) sin nada en el medio. La medida al 61.8% (0.85) vuelve a valer solo si el precio reconstruye la bandera sobre 0.5607 — la completa (1.03) no se usa para un alt de $37M.
            <div style={{ marginTop: 6 }}><b>El 0.49 se cerró dos veces; la EMA50 duró un cierre; el 61.8% se perdió; 0.4304 cayó con volumen; la EMA100 y 0.3947 cayeron en una vela, volvieron sin volumen y se fueron en una vela de mercado; 0.3897 cayó sin volumen; el 5 Nov todo eso se recuperó en una vela con menos volumen del que parecía; el 9 Nov la mitad se devolvió sin volumen; el 11 Nov la media que decidía se cerró con el 92% del promedio; el 13 Nov el escalón que decidía — 0.3878 — se cerró con el 125%, la primera barra sobre el promedio de la devolución, roja.</b> La lectura del 8 Nov dijo que el primer aviso era el cierre bajo el racimo (0.4469) y el segundo el cierre bajo 0.421: imprimieron el 9 y el 11 Nov. La del 10 Nov dijo que el retest de la EMA100 era el +1M y se decidía al cierre: el cierre imprimió 1.1% debajo — un día. La del 11 Nov dijo que 0.3878 era el escalón que decidía si noviembre hizo piso y el stop de lo que se tenía de antes: se cerró por 3.1% el 13 Nov — no hizo piso, y lo que quedaba salió en 0.3758. Lo que la regla de esta página no deja hacer es llamar al toque del 78.6% una entrada: la entrada es el cierre que aguante 0.3679 con vela de rechazo y $1.3M+, o el cierre de vuelta sobre 0.3878 con la misma barra, y ninguno imprimió. A favor: la 200 sigue subiendo (0.362, +3.4% en 20 días, desacelerando), el precio sigue encima de ella por 2.0%, y la medida (0.3679) es un nivel de la estructura — el 78.6% del impulso —, no un porcentaje del motor. En contra: el motor sigue 3/7 BEAR y su dibujo tiene la línea de arriba (0.3918) sobre el precio y mide el rail (0.292), el histograma pasó de −0.00002 a −0.0031 — negativo y acelerando —, el RSI (46.5) subió con el precio bajando porque salieron las barras del 30–31 Oct de la ventana (la ventana, no el comprador), la EMA20 está 3.0% bajo la EMA50 — el cruce bajista del 4 Nov abriéndose —, la única barra sobre el promedio de toda la devolución es la roja que cerró 0.3878, la semana es 1.2× la del benchmark y la vela del escalón fue 2.8× — propia, no prestada —, y la red no cambió: compute hours bajo 150k, revenue pagado sin publicar, mcap $37M. La medida está tocada; el piso, todavía no.</div>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
            <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>What to watch this week</div>
            <b>Volumen.</b> {trend?.volRatio != null ? `El promedio de 20 días está en ${Math.round(trend.volRatio * 100)}% del de 90 días — ${trend.volRatio < 0.85 ? 'se está secando: el breakout se queda sin combustible' : trend.volRatio > 1.2 ? 'expandido: el movimiento tiene combustible' : 'plano'}.` : 'Cargando…'} El retest sano viene con volumen cayendo; un retest con volumen creciente es distribución.
            <div style={{ marginTop: 6 }}><b>Secuencia que anula el sesgo bajista:</b> el 78.6% (<b>0.3679</b>, el +1M — alcanzado por la regla en vivo, a 0.35%) aguantado al cierre con vela de rechazo abajo y $1.3M+ — el cierre decide, y ningún cierre lo probó todavía — → <b>0.3878</b> (el escalón perdido el 13 Nov) recuperado al cierre con la misma barra y NOS sobre SOL — ahí el 13 Nov fue un barrido y la octava entrada está impresa — → <b>0.3947</b> (el máximo de junio, cerrado cuatro veces) recuperado → la EMA100 (<b>0.4064</b>, techo, cerrada el 11 Nov) recuperada al cierre → el racimo EMA20–EMA50 (<b>0.4239–0.4369</b>) y el 61.8% (<b>0.4466</b>) — hechos el 8 Nov (0.455), devueltos el 9 Nov — → cierre sobre <b>0.4657</b> (el techo del último rebote, el cierre del 5 Nov y del 24 Oct) con 2× volumen ($1.0M) = invalidación bajista cumplida → <b>0.4826–0.49</b> (la invalidación de octubre) → 0.502 → <b>0.5607</b> (piso de la bandera — recuperado, la bandera se reconstruye) → <b>0.6836</b> → retest de 0.7365. El primer paso está en curso y los dos siguientes se perdieron esta semana; hasta 0.4657 cada escalón sigue siendo un lugar para reducir lo que no se quiere tener en 0.3125 — la zona es 0.3878–0.4064 sin NOS sobre SOL —, no para sumar; desde 0.4657, con la barra, cada escalón es un punto para sumar el 25% de la posición objetivo. El 0.85 vuelve al mapa solo con la bandera reconstruida.</div>
            <div style={{ marginTop: 6 }}><b>Secuencia que lo confirma:</b> el cierre bajo el racimo (<b>0.4469</b> entonces) — impreso el 9 Nov (0.4241) — → el cierre bajo <b>0.421</b> — impreso el 11 Nov (0.4031) — → la EMA100 (<b>0.4082</b>, el +1M de la lectura del 10 Nov) cerrada por abajo — impreso el 11 Nov: el stop de la entrada del 5 Nov — → <b>0.3947</b> cerrado por cuarta vez y <b>0.3878</b> (el cierre más bajo del pullback) cerrado — impreso el 13 Nov (0.3758, −5.4% con SOL −1.9%, con la primera barra sobre el promedio de la devolución, roja): el stop de lo legacy, lo que quedaba salió — → <b>0.3679</b> (78.6% del impulso, el +1M) — hoy a 0.35%, tocado por la regla en vivo: el cierre decide — → <b>0.362</b> (EMA200, la última media) → <b>0.3125</b> (el breakout del 21 Sep) sin un nivel en el medio → el rail del año (~0.292, lo que el motor mide hoy) → 0.2675. Un impulso parabólico que devolvió el 78.6% en cinco semanas con el libro vacío, recuperó la mitad en una vela con menos volumen del que parecía, devolvió la recuperación en seis velas y cerró el mínimo que la originó con la primera barra sobre el promedio — roja — tiene cuatro de siete pasos de esta secuencia impresos y el quinto a 0.35%: si 0.3679 aguanta al cierre con $1.3M+ y una vela que cierre arriba, el 13 Nov fue el barrido y noviembre un rango 0.3679–0.4657; si cierra debajo con la EMA200, 0.3125 llega en días y el rail es lo único que queda. <b>Relativo:</b> NOS −12.5% vs SOL −10.6% en la semana (1.2×; JUP +6.5% y MET +6.7% del otro lado del signo, JTO 0.6×, PUMP 1.25×, 2Z 1.3×); −1.4% vs −0.04% en la vela del 12 Nov, −5.4% vs −1.9% en la del 13 Nov (2.8×, la peor de la página) y −1.8% vs −1.5% en vivo. SOL hizo su mínimo de cierre de 30 días y NOS perdió su escalón cayendo casi el triple: el movimiento es propio, no prestado — la vela que cerró 0.3878 fue de NOS, y el vendedor que trajo también.</div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(245,158,11,.25)' }}>
              <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: AMB, fontFamily: "'JetBrains Mono',monospace", marginBottom: 3 }}>Decisión</div>
              <div>› Con posición: <b>el stop se cumplió — 0.49 cerrado de vuelta (0.4657, 24 Oct) —, el del rebote también (la EMA100 devuelta el 3 Nov), el de lo que quedaba también (0.3897 cerrado el 4 Nov), el de la entrada del 5 Nov también (la EMA100 cerrada el 11 Nov, 0.4031), y el de lo legacy también: 0.3878 cerrado el 13 Nov (0.3758, −5.4% con SOL −1.9%)</b> — lo que quedaba salió en 0.3758, y no se repone en 0.37 porque el 78.6% se tocó: se repone con el cierre que aguante 0.3679 con vela de rechazo y $1.3M+, o con el cierre de vuelta sobre 0.3878 con la misma barra y NOS sobre SOL. Si todavía tenés sin stop, el rebote a 0.3878–0.4064 (el escalón perdido y la EMA100) es para reducir si llega sin NOS sobre SOL. La invalidación sigue en 0.4657 (el techo del último rebote), 26% arriba: hasta ahí el sesgo es bajista y cada rebote es para reducir; desde ahí, con 2× volumen, para sumar.</div>
              <div>› Sin posición: <b>no se compra el nivel tocado; se compra el cierre que lo aguante</b>. Las tres entradas del plan se cancelaron; la cuarta (el retest de 0.3947) llegó con dos de tres; la quinta imprimió el 5 Nov con la barra corta y salió en su stop el 11 Nov; la sexta (el retest de la EMA100) no imprimió; la séptima (el retest de 0.3878–0.3947 que aguantara al cierre) no imprimió — el nivel se cerró el 13 Nov con la primera barra sobre el promedio de la devolución, roja; la octava es ésta: el 78.6% (0.3679, a 0.35% en vivo) que aguante al cierre con vela de rechazo abajo y $1.3M+, 25% del tamaño objetivo, stop en el cierre bajo la EMA200 (0.362); o el cierre de vuelta sobre 0.3878 con $1.3M+ y NOS sobre SOL, stop en el cierre bajo 0.3679; o el cierre sobre 0.4657 con 2× volumen ($1.0M), la entrada por fuerza. Comprar 0.37 porque NOS está en la medida y la EMA200 sube es comprar el toque de un nivel con la única barra sobre el promedio de la devolución en contra, el histograma acelerando para abajo y la vela que perdió el escalón hecha 2.8× la del benchmark: el cierre de esta noche o el de mañana es el que cuenta.</div>
              <div>› Trigger único que anula el sesgo bajista: <b>cierre diario &gt; 0.4657</b> (techo del último rebote — el cierre del 5 Nov y del 24 Oct, un máximo decreciente debajo de 0.5521 y 0.5607; 0.3758, 0.3878, 0.3947, la EMA100 en 0.4064, 0.421, 0.4304, el racimo EMA20–EMA50 en 0.4239–0.4369, 0.4466 y 0.455 se recuperan en el camino) con 2× volumen ($1.0M). Ahí el 11 y el 13 Nov fueron barridos, el cierre bajo 0.3878 fue una mecha larga y el camino es 0.4826–0.49 → 0.502 → 0.5607 (piso de la bandera: recuperado, la bandera se reconstruye) → 0.6836 → 0.7365. Movida desde 0.5607 el 11 Nov: con la media cerrada, lo que anula el sesgo es el techo del último rebote, no el piso de la bandera de hace un mes; el motor pone la suya en 0.461, el mismo nivel.</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14, border: '1px solid var(--border)', borderRadius: 4, padding: '8px 4px 4px' }}>
          <div style={{ display: 'flex', gap: 14, fontSize: 10.5, padding: '0 10px 4px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span style={{ color: BEAR ? RED : GRN, fontWeight: 800, letterSpacing: '.1em' }}>BIAS: {TA.bias}</span>
            <span><span style={{ color: BEAR ? RED : GRN }}>▬</span> forecast path</span>
            <span><span style={{ color: RED }}>╌</span> invalidation</span>
            <span style={{ marginLeft: 'auto' }}>path set <b style={{ color: 'var(--text-primary)' }}>{TA.reviewed}</b>{stamps.atRead != null ? ` at $${stamps.atRead.toFixed(4)}` : ''} · log scale · x = √time · shade = tolerance</span>
          </div>
          <TAFan price={d?.price} ta={TA} mb={mb} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : 'repeat(3,1fr)', gap: 10, marginTop: 14 }}>
          {TA.path.map((p) => {
            const px = d?.price;
            return (
              <div key={p.h} style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.08em', color: 'var(--text-secondary)' }}>{p.h}</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: BEAR ? RED : GRN }}>${p.target.toFixed(2)} <span style={{ fontSize: 10.5, fontWeight: 500, color: 'var(--text-muted)' }}>{px ? `${p.target / px - 1 >= 0 ? '+' : ''}${Math.round((p.target / px - 1) * 100)}%` : ''}</span></span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{p.how}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 10, padding: '9px 12px', border: `1px solid ${RED}`, borderRadius: 4, background: 'rgba(239,68,68,.06)', fontSize: 11.5, color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
          <b style={{ color: RED, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.08em' }}>INVALIDATION ·</b> {TA.invalidation.text}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mb ? '1fr' : '1fr 1fr', gap: 10, marginTop: 12 }}>
          {[['Resistance', TA.levels.resistance, RED], ['Support', TA.levels.support, GRN]].map(([t, L, col]) => (
            <div key={t}>
              <div style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: col, marginBottom: 4 }}>{t}</div>
              {L.map(([lv, why]) => (
                <div key={lv} style={{ display: 'flex', gap: 10, fontSize: 11.5, padding: '3px 0', color: 'var(--text-muted)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', minWidth: 58 }}>${lv.toFixed(lv < 0.5 ? 4 : 2)}</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{why}</span>
                  {d?.price ? <span style={{ marginLeft: 'auto', fontSize: 10.5 }}>{lv / d.price - 1 >= 0 ? '+' : ''}{Math.round((lv / d.price - 1) * 100)}%</span> : null}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 12, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>Editor read: {TA.reviewed}{stamps.atRead != null ? ` at $${stamps.atRead.toFixed(4)}` : ''}. Regime and structure are recalculated live. % shown is distance from the live price, not from the price on the read date. Daily series through {stamps.dataThrough}; chart built {stamps.builtOn}. Refreshed manually on each thesis review. Not investment advice.</div>
      </div>

      <Eyebrow>Tracked snapshots — accumulates every visit → your own history</Eyebrow>
      <div style={panel}>
        <div style={{ marginBottom: 8 }}><span style={{ fontSize: 13, fontWeight: 700 }}>Data-point log</span> <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>· auto-saved in this browser (max 1 per 6h). Deltas above are vs the previous row.</span></div>
        {snaps.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: 12, padding: '10px 2px' }}>No snapshots yet — this is your first read. Revisit to build the trend.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead><tr>{['Timestamp', 'NOS $', 'Mkt Cap', 'Completed', 'Job hrs', 'Hosts', 'Running'].map((h, i) => (
                <th key={h} style={{ textAlign: i ? 'right' : 'left', padding: '7px 8px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontWeight: 500, fontSize: 10, letterSpacing: '.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {snaps.slice(-12).reverse().map((s, i) => (
                  <tr key={i}>
                    <td style={td(1)}>{new Date(s.t).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                    <td style={td()}>{fmtPx(s.price)}</td>
                    <td style={td()}>{fmtM(s.mcap)}</td>
                    <td style={td()}>{fmtInt(s.completed)}</td>
                    <td style={td()}>{fmtInt(s.jobHours)}</td>
                    <td style={td()}>{fmtInt(s.hosts)}</td>
                    <td style={td()}>{fmtInt(s.running)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* TRIPWIRES */}
      <Eyebrow>Thesis tripwires — materialization checklist (from due-diligence) · last review {SEED.reviewed} · stance: hold · trim-into-strength</Eyebrow>
      <div>
        {trips.map(([cls, ic, t, desc], i) => (
          <div key={i} style={{ display: 'flex', gap: 11, padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, marginTop: 1, color: tripStyle[cls][0], background: tripStyle[cls][1] }}>{ic}</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{t}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: 26, borderTop: '1px solid var(--border)', paddingTop: 14, color: 'var(--text-muted)', fontSize: 11, fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif", lineHeight: 1.6 }}>
        <b style={{ color: 'var(--text-secondary)' }}>Sources.</b> Network data via server-side proxy to the Nosana API (dashboard.k8s.prd.nos.ci — same backend as <a href="https://explore.nosana.com/" target="_blank" rel="noopener" style={{ color: GRN }}>explore.nosana.com</a>). Market data: CoinGecko.<br />
        <b style={{ color: 'var(--text-secondary)' }}>Green</b> = network fundamentals · <b style={{ color: 'var(--text-secondary)' }}>blue</b> = market. The dashboard's job is to show whether the two converge. The network-evolution chart is native historical series; point-in-time KPIs are snapshotted per visit.<br />
        <b style={{ color: 'var(--text-secondary)' }}>Cómo leer los tripwires.</b> ✓ = la tesis se confirma en ese eje · ! = se rompe · ◦ = sin datos concluyentes. Regla de 10AMPRO: <b>dos "!" simultáneos en compute hours y hosts = reducir sin esperar el chart</b>; revenue pagado publicado = subir la posición aunque el chart esté feo.<br/>
        <b style={{ color: 'var(--text-secondary)' }}>Note.</b> Completed jobs / compute hours include incentivized, grant and charity (Folding@Home) activity — not a clean paid-revenue signal. La campana RTX 4090/5090 (17 Sep 2026) paga el equivalente a 20% de utilizacion diaria: demanda incentivada por Nosana, no organica — descontala del growth que veas arriba. Watch the tripwires for real materialization. Data & research context, not investment advice.
        <div style={{ marginTop: 12 }}>
          <a href="https://10am.pro?utm_source=nosana&utm_medium=footer&utm_campaign=hub" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>← 10am.pro</a>
        </div>
      </div>
    </div>
  );
}
const td = (first) => ({ textAlign: first ? 'left' : 'right', padding: '7px 8px', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' });
