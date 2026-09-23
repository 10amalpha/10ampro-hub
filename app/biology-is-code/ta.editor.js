// Editor TA per ticker. Same shape as TOKEN.ta in the Solana hub configs:
// { updated, bias: 'BULL'|'BEAR', read, pattern, watch, decision: [], invalidation: { level, text }, path: [{ d, h, target, how }], levels: { resistance: [[px, why]], support: [[px, why]] } }
// A ticker without an entry falls back to the live auto-forecast (lib/thesis/ta.js).
// Review pass data: /api/equity/{SYM}?summary=1 — basis for this pass: daily closes through 23 Sep 2026.
const U = '23 Sep 2026';

export const EDITOR_TA = {
  TEM: {
    updated: U, bias: 'BULL',
    read: 'Siete de siete checks en verde. El 17 Sep TEM cerró en 80.36 (+15% en el día, volumen 3.6× el promedio de 90 días) y desde ahí consolida entre 76 y 78 sin devolver el salto: eso es una bandera, no un techo. Mínimos crecientes limpios: 41.55 (29 Jul) → 49.36 (18 Ago) → 58.74 (10 Sep). EMA20 68.6, EMA50 62.0, EMA200 58.2 y subiendo. Lo que no está: RSI 71 — no es donde se persigue — y entre 80 y 103 (máximo de 12 meses) no hay pivots de soporte, así que la próxima caída, si llega, es rápida hasta 72.7.',
    pattern: '<b>Tendencia alcista con bandera sobre el gap del 15–17 Sep.</b> Soporte 41.55 → 58.74, 3 toques, hoy en ~64. Sin línea de resistencia válida: cada máximo superó al anterior (61.6 → 72.7 → 80.4). Asta de la bandera 58.7 → 80.4 = 21.6; medida desde el máximo previo de 72.7 → ~94.',
    watch: '<b>El retest.</b> 72.7 (máximo del 21 Ago) es el piso lógico de un pullback; 68.6 (EMA20, arranque del gap) es el último. Un retest a 72–74 con volumen cayendo es compra por estructura. <b>Volumen:</b> 20d en 123% del 90d — que no se seque en la ruptura de 80.4.',
    decision: [
      'Con posición: <b>mantener mientras cierre sobre 68.6</b>. Sumar en 72–74, no en 80.',
      'Sin posición: <b>primer tramo en 72–74</b> si el pullback llega con volumen bajo; segundo en cierre &gt; 80.4 con 2× volumen.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 68.6</b> — el gap se llena y el chart vuelve a 64 (trendline).',
    ],
    invalidation: { level: 68.6, text: 'Cierre diario bajo 68.6 (EMA20 y arranque del gap del 15 Sep) llena el gap y anula la bandera → siguiente parada 64 (trendline) y 58.7 (mínimo del 10 Sep).' },
    path: [
      { d: 30, h: '+1M', target: 85, how: 'Retest de 72–74 → ruptura de 80.4 con volumen → 85. Sin retest y con RSI sobre 70, el camino es más lento pero el destino no cambia.' },
      { d: 90, h: '+3M', target: 94, how: 'Medida de la bandera (72.7 + 21.6). Es el primer nivel donde tiene sentido tomar parte.' },
      { d: 365, h: '+1Y', target: 103, how: 'Máximo de los últimos 12 meses. Requiere que el beneficio GAAP de Q2 se repita y que los ingresos sigan creciendo &gt;20%.' },
    ],
    levels: {
      resistance: [[80.36, 'Máximo del 17 Sep — cierre récord del tramo'], [85, 'Target +1M'], [94, 'Medida de la bandera'], [103.3, 'Máximo de 12 meses']],
      support: [[72.69, 'Máximo del 21 Ago — piso del retest'], [68.6, 'INVALIDACIÓN · EMA20 / gap'], [64, 'Trendline de mínimos crecientes'], [58.74, 'Mínimo del 10 Sep · EMA200 58.2']],
    },
  },

  IBRX: {
    updated: U, bias: 'BULL',
    read: 'Siete de siete checks, pero el dato importante es estructural: el triángulo que venía comprimiendo desde febrero (techo 11.55 → 8.40, piso 5.64 → 6.83) se rompió para arriba. Cierre de 9.29 el 22 Sep (+10%, volumen 1.4× el promedio) y hoy devuelve a 8.63. Los mínimos crecientes siguen intactos: 6.72 (16 Jun) → 6.83 (29 Jul) → 7.72 (10 Sep). EMA20 8.26, EMA50 8.00, EMA200 6.87 y subiendo. Lo que falta: el volumen de 20 días está plano (98% del de 90) — una ruptura sin volumen se retestea. Y el catalizador que manda es binario: PDUFA el 6 Ene 2027.',
    pattern: '<b>Triángulo simétrico — ruptura alcista (22 Sep).</b> Techo desde 11.55 (24 Feb), 3 toques, hoy en ~7.94. Piso desde 5.64 (5 Feb), 3 toques, hoy en ~7.21. Ápex ~23 Oct: la ruptura llegó antes, así que vale. Altura ~5.8 → medida 13.7.',
    watch: '<b>El retest del techo roto.</b> 7.9–8.0 (techo del triángulo + EMA50) tiene que aguantar; 7.72 es el último mínimo creciente. <b>PDUFA 6 Ene 2027:</b> el chart va a subir hacia el evento si aguanta 7.7 — y ahí el riesgo se vuelve binario. Tamaño antes del PDUFA, no durante.',
    decision: [
      'Con posición: <b>mantener mientras cierre sobre 7.72</b>. Considerar recortar parte en 11.5 antes del PDUFA.',
      'Sin posición: <b>primer tramo en 7.9–8.1</b> (retest del techo); segundo en cierre &gt; 9.44 con volumen.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 7.72</b> — la ruptura fue falsa y el precio vuelve al triángulo.',
    ],
    invalidation: { level: 7.72, text: 'Cierre diario bajo 7.72 (último mínimo creciente, 10 Sep) devuelve el precio adentro del triángulo → siguiente parada 7.21 (piso del triángulo) y 6.87 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 9.45, how: 'Retest de 7.9–8.0 → recupera 9.29 → 9.44, el máximo del 2 Jul. Sin volumen, se queda en rango 8–9.3.' },
      { d: 90, h: '+3M', target: 11.5, how: 'Máximo de febrero, justo antes del PDUFA. El mercado suele pagar la anticipación del evento.' },
      { d: 365, h: '+1Y', target: 13.7, how: 'Medida del triángulo. Requiere aprobación el 6 Ene y ventas de ANKTIVA sosteniendo el ritmo de +90% anual.' },
    ],
    levels: {
      resistance: [[9.29, 'Cierre del 22 Sep — día de la ruptura'], [9.44, 'Máximo del 2 Jul'], [11.55, 'Máximo de febrero · origen del techo'], [13.7, 'Medida del triángulo']],
      support: [[8.0, 'EMA50 · techo del triángulo roto'], [7.72, 'INVALIDACIÓN · mínimo del 10 Sep'], [7.21, 'Piso del triángulo'], [6.87, 'EMA200']],
    },
  },

  CAI: {
    updated: U, bias: 'BULL',
    read: 'Siete de siete, pero extendido: +30% en 7 sesiones, RSI 79. La secuencia es de libro — mínimos 14.55 (15 May) → 15.38 → 20.97 → 24.03 (9 Sep), máximos 23.4 → 28.0 → 31.65 — y el volumen acompaña (20d en 176% del 90d). El problema es dónde está: 32.95–33.66 es el máximo de 12 meses, a 4–6% del precio. EMA20 26.9, EMA50 23.7, EMA200 22.1 subiendo. La tendencia está bien; la entrada no.',
    pattern: '<b>Tendencia alcista acelerando — mínimos crecientes, sin techo en la ventana.</b> Rompió 28.0 (máximo del 25 Ago) el 17 Sep. El techo real es horizontal: 33–33.7, máximo de 52 semanas. Desde 28 la medida del tramo (altura ~17) da ~45.',
    watch: '<b>33.0–33.7.</b> Primera vez en un año que llega ahí; lo más probable es que frene y retestee 28. Ese retest es la entrada. <b>RSI:</b> sobre 75 no se compra; se espera que baje a 55–60 con el precio sobre 28.',
    decision: [
      'Con posición: <b>mantener mientras cierre sobre 26.0</b>. Tomar algo en 33–34 si llega con RSI sobre 80.',
      'Sin posición: <b>esperar el retest de 28–29</b>. Segundo tramo en cierre &gt; 33.7 con 2× volumen.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 26.0</b> — pierde la EMA20 y el arranque del tramo del 14 Sep.',
    ],
    invalidation: { level: 26.0, text: 'Cierre diario bajo 26.0 (EMA20 y arranque del tramo del 14 Sep) anula la aceleración → siguiente parada 24.0 (mínimo del 9 Sep) y 22–23.7 (EMA200 / EMA50).' },
    path: [
      { d: 30, h: '+1M', target: 33.7, how: 'Pullback a 28–29 con RSI enfriándose → vuelta al máximo de 52 semanas. En 1M lo más probable es que 33.7 frene, no que se rompa.' },
      { d: 90, h: '+3M', target: 39.3, how: 'Ruptura de 33.7 → 39.3, el máximo post-IPO. Necesita el tercer trimestre récord seguido y adopción de Caris Detect.' },
      { d: 365, h: '+1Y', target: 45, how: 'Medida del tramo desde 28. Requiere que el EBITDA ajustado positivo pase a flujo de caja positivo.' },
    ],
    levels: {
      resistance: [[33.66, 'Máximo de 52 semanas'], [39.3, 'Máximo post-IPO'], [45, 'Medida del tramo']],
      support: [[28.0, 'Máximo del 25 Ago — zona de retest'], [26.0, 'INVALIDACIÓN · EMA20 / arranque del tramo'], [24.03, 'Mínimo del 9 Sep'], [22.05, 'EMA200']],
    },
  },

  HIMS: {
    updated: U, bias: 'BEAR',
    read: 'Uno de siete: el precio está debajo de las tres EMAs (20: 28.85 · 50: 29.48 · 200: 30.62) y la EMA200 ya bajando. Ayer tocó 30.43 — exactamente el techo del triángulo — y hoy devolvió 6.7%. El chart está sentado sobre el piso (mínimos 25.0 → 27.39 → 27.44) con el ápex el 7 Oct: resuelve pronto. El volumen de 20 días está en 62% del de 90 — nadie está comprando la caída. La divergencia con el negocio es real (guía de Q3 +47–50%), pero con FTC y Visa encima el chart no la está pagando.',
    pattern: '<b>Triángulo simétrico bajo la EMA200 — continuación bajista hasta que demuestre lo contrario.</b> Techo desde 38.28 (6 Jul) → 33.78 (21 Ago), hoy en ~30.55. Piso desde 14.52 (27 Feb) → 27.44 (10 Sep), hoy en ~28.3. Ápex ~7 Oct. En régimen bajista estos patrones resuelven con la tendencia previa ~2:1.',
    watch: '<b>27.4.</b> Es el piso del triángulo y el mínimo doble de agosto-septiembre; un cierre abajo abre 25.0 rápido. <b>30.6</b> es el techo + EMA200 — la única zona donde el sesgo cambia. <b>Earnings Q3 (principios de nov):</b> la guía de +47–50% es el catalizador que puede dar vuelta el chart, pero llega después del ápex.',
    decision: [
      'Con posición: <b>reducir en rebotes a 30–30.5</b>; no promediar mientras esté bajo la EMA200.',
      'Sin posición: <b>esperar</b>. Entrada solo en cierre &gt; 30.7 con volumen, o en 22–25 si llega.',
      'Trigger único que anula el sesgo: <b>cierre diario &gt; 30.7</b> con 2× volumen — rompe el techo y recupera la EMA200.',
    ],
    invalidation: { level: 30.7, text: 'Cierre diario sobre 30.7 (techo del triángulo + EMA200) invalida el sesgo bajista → siguiente parada 33.8 (máximo del 21 Ago).' },
    path: [
      { d: 30, h: '+1M', target: 25.0, how: 'Pierde 27.4 antes del ápex → 25.0, el mínimo del 29 Jul.' },
      { d: 90, h: '+3M', target: 22.3, how: 'Mínimo del 18 May. Si Q3 cumple la guía, este es el piso donde el negocio vuelve a mandar.' },
      { d: 365, h: '+1Y', target: 19.8, how: 'Mitad de la medida del triángulo. Solo si el tema regulatorio (FTC / red de pagos) escala.' },
    ],
    levels: {
      resistance: [[29.48, 'EMA50'], [30.7, 'INVALIDACIÓN · techo del triángulo + EMA200'], [33.78, 'Máximo del 21 Ago'], [38.28, 'Máximo del 6 Jul']],
      support: [[27.44, 'Piso del triángulo · mínimo del 10 Sep'], [25.0, 'Mínimo del 29 Jul'], [22.29, 'Mínimo del 18 May'], [19.8, 'Mitad de la medida']],
    },
  },

  PBLS: {
    updated: U, bias: 'BEAR',
    read: 'Solo 72 sesiones desde el IPO de junio — la EMA200 todavía no significa nada; el marco útil es el rango 25.01–41.73. El 18 Sep marcó 41.73 con volumen 14× el promedio de 90 días — clímax — y en tres sesiones cayó a 33.31 (−20%; −12.7% solo hoy), perdiendo EMA20 (37.8) y EMA50 (36.2), RSI 36. Hoy cerró justo sobre el 50% del rango (33.37). El volumen de 20 días está 55% sobre el de 90: la venta tiene tamaño. Fuera del chart: $1.1B de caja contra $5B de capitalización y cero ingresos — el precio lo mueve el flujo, no los números.',
    pattern: '<b>Rango post-IPO 25–42, rechazo violento en el techo.</b> Sin historia suficiente para trendlines por pivots. Niveles de Fibonacci del rango: 50% 33.37 (donde está), 61.8% 31.40, 78.6% 28.59. Si el lockup es el estándar de 180 días, vence a mediados de diciembre — dentro del horizonte de 3M.',
    watch: '<b>33.4.</b> Si el 50% no aguanta en dos o tres sesiones, 31.4 es la siguiente parada. <b>Lockup:</b> el vencimiento de fin de año es el evento de oferta más grande a la vista. <b>Recuperación:</b> solo un cierre sobre 37.8 (EMA20) dice que la caída fue una sacudida.',
    decision: [
      'Con posición: <b>reducir si pierde 31.4</b>; recomprar más abajo cerca del lockup.',
      'Sin posición: <b>esperar</b>. La zona de interés es 25–28.6, idealmente alrededor del lockup.',
      'Trigger único que anula el sesgo: <b>cierre diario &gt; 37.8</b> (EMA20) con volumen.',
    ],
    invalidation: { level: 37.8, text: 'Cierre diario sobre 37.8 (EMA20) recupera el rango alto y anula el sesgo → siguiente parada 41.7 (máximo del 18 Sep).' },
    path: [
      { d: 30, h: '+1M', target: 31.4, how: 'Pierde el 50% del rango → 61.8% (31.4).' },
      { d: 90, h: '+3M', target: 28.6, how: '78.6% del rango, con el lockup de fin de año como presión de oferta.' },
      { d: 365, h: '+1Y', target: 25.0, how: 'Retest del mínimo post-IPO. Sin datos clínicos de Helicon en la ventana, el precio vuelve a donde arrancó.' },
    ],
    levels: {
      resistance: [[36.2, 'EMA50'], [37.8, 'INVALIDACIÓN · EMA20'], [41.73, 'Máximo de cierre del 18 Sep']],
      support: [[33.37, '50% del rango post-IPO — donde está hoy'], [31.4, '61.8% del rango'], [28.59, '78.6% del rango'], [25.01, 'Mínimo post-IPO']],
    },
  },

  RXRX: {
    updated: U, bias: 'BULL',
    read: 'Cuatro de siete — régimen neutral, pero la estructura se está moviendo. El triángulo descendente de julio-septiembre (techo 3.96 → 3.63, piso plano 2.84–2.89) se rompió para arriba el 17–18 Sep y llegó a 4.05 el 22. Hoy devolvió 8.6% a 3.70: exactamente la EMA200 (3.71), que todavía baja. Un triángulo descendente que rompe para arriba es una trampa para los bajistas — si aguanta. El volumen está plano (100% del 90d): no hay confirmación todavía. Los mínimos sí suben: 2.89 (20 Jul) → 3.09 → 3.16 (10 Sep).',
    pattern: '<b>Triángulo descendente — ruptura alcista en retest.</b> Techo desde 3.96 (6 Jul), 3 toques, hoy en ~3.53. Piso plano ~2.9, 3 toques. Altura ~1.08 → medida 4.6 desde la ruptura. Precio justo en la EMA200: el cierre de esta semana decide.',
    watch: '<b>3.53.</b> El techo roto tiene que funcionar como piso; un cierre abajo convierte la ruptura en falsa. <b>EMA200 (3.71):</b> dos cierres seguidos sobre 3.75 y la 200 empieza a girar. <b>Genentech:</b> la opción del primer target neuro es el tipo de noticia que valida el recorte de opex.',
    decision: [
      'Con posición: <b>mantener mientras cierre sobre 3.50</b>.',
      'Sin posición: <b>tramo chico en 3.55–3.65</b> con stop en 3.50; segundo en cierre &gt; 4.05 con volumen.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 3.50</b> — ruptura falsa, vuelta al rango 3.1–3.5.',
    ],
    invalidation: { level: 3.5, text: 'Cierre diario bajo 3.50 (techo del triángulo roto) marca ruptura falsa → siguiente parada 3.16 (mínimo del 10 Sep) y 2.9 (piso del triángulo).' },
    path: [
      { d: 30, h: '+1M', target: 4.05, how: 'Aguanta 3.53 → recupera el máximo del 22 Sep.' },
      { d: 90, h: '+3M', target: 4.6, how: 'Medida del triángulo. Requiere volumen sobre 1.5× en la ruptura de 4.05.' },
      { d: 365, h: '+1Y', target: 4.96, how: 'Máximo de los últimos 6 meses. Más arriba necesita datos clínicos, no solo recorte de costos.' },
    ],
    levels: {
      resistance: [[3.71, 'EMA200 — donde está hoy'], [4.05, 'Máximo del 22 Sep'], [4.6, 'Medida del triángulo'], [4.96, 'Máximo de 6 meses']],
      support: [[3.53, 'Techo del triángulo roto'], [3.5, 'INVALIDACIÓN'], [3.16, 'Mínimo del 10 Sep'], [2.89, 'Piso del triángulo']],
    },
  },

  NGEN: {
    updated: U, bias: 'BEAR',
    read: 'Cero de siete. Precio bajo las tres EMAs (20: 2.10 · 50: 2.07 · 200: 2.69, bajando 4% en 20 días), RSI 28 — sobrevendido. Después de la caída de mayo-junio (3.63 → 1.73) el precio armó un rango de 1.59 a 2.34 y hoy está en la mitad baja, a 1.96. El volumen se está secando (80% del 90d). No hay catalizador clínico cerca: RESTORE recién empieza el screening y la lectura es 1H28. Eso deja al chart sin motor propio por mucho tiempo.',
    pattern: '<b>Rango de base 1.59–2.34 dentro de una tendencia bajista.</b> Máximos del rango: 2.20 (18 Jun), 2.12 (2 Jul), 2.335 (27 Ago). Mínimos: 1.73 (10 Jun), 1.59 (29 Jul), 1.68 (17 Ago). El techo del rango coincide con la EMA50 bajando: esa es la resistencia real.',
    watch: '<b>1.68–1.73.</b> Es la zona de los mínimos de junio y agosto; con RSI 28 lo probable es rebote, no quiebre. <b>2.34:</b> techo del rango — un cierre arriba con volumen es la primera señal de base terminada. <b>Dilución:</b> sin datos hasta 2028, cualquier financiamiento se vende contra el precio.',
    decision: [
      'Con posición: <b>no promediar</b> hasta que cierre sobre 2.34.',
      'Sin posición: <b>solo tramos chicos en 1.6–1.75</b> como opción de largo plazo, sabiendo que no hay catalizador hasta 2028.',
      'Trigger único que anula el sesgo: <b>cierre diario &gt; 2.34</b> con volumen — ruptura del rango.',
    ],
    invalidation: { level: 2.34, text: 'Cierre diario sobre 2.34 (techo del rango, 27 Ago) invalida el sesgo bajista → siguiente parada 2.69 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 1.73, how: 'Pierde 1.90 → mínimo del 10 Jun. Con RSI 28 la caída es lenta.' },
      { d: 90, h: '+3M', target: 1.59, how: 'Retest del piso del rango (29 Jul).' },
      { d: 365, h: '+1Y', target: 1.46, how: 'Mínimo de 2 años. Solo con financiamiento dilutivo y sin novedades de RESTORE.' },
    ],
    levels: {
      resistance: [[2.1, 'EMA20 · EMA50 2.07'], [2.34, 'INVALIDACIÓN · techo del rango'], [2.69, 'EMA200']],
      support: [[1.73, 'Mínimo del 10 Jun'], [1.68, 'Mínimo del 17 Ago'], [1.59, 'Piso del rango · 29 Jul'], [1.46, 'Mínimo de 2 años']],
    },
  },

  NAUT: {
    updated: U, bias: 'BEAR',
    read: 'Dos de siete. La tendencia bajista desde 3.95 (24 Mar) sigue mandando: EMA200 en 1.75 y cayendo 9% en 20 días, EMA50 en 1.18. Pero hay un cambio: el precio ya está sobre la línea de máximos decrecientes (hoy en ~0.89) y los mínimos dejaron de bajar — 0.852 (18 Ago) y nada debajo desde entonces. El salto a 1.12 del 9 Sep se devolvió entero. Fuera del chart: la caja supera la capitalización, y el precio lleva la mayor parte de un mes bajo $1 — el riesgo de aviso de Nasdaq por precio mínimo es real.',
    pattern: '<b>Tendencia bajista con la línea de techo recién rota — base en formación 0.85–1.12.</b> Techo desde 3.95, 4 toques (2.36 → 1.90 → 1.77 → 1.12). Sin línea de soporte válida todavía. La base necesita un segundo mínimo creciente para confirmar.',
    watch: '<b>0.85.</b> El mínimo del 18 Ago es el piso de la base. <b>1.12–1.18:</b> el máximo del 9 Sep + EMA50 — un cierre arriba es la primera señal de cambio de tendencia. <b>$1:</b> sostenerse arriba importa por cumplimiento de Nasdaq, no solo por el chart. Posible reverse split si no lo recupera.',
    decision: [
      'Con posición: <b>mantener solo como opción</b> respaldada por caja; no sumar bajo la EMA50.',
      'Sin posición: <b>esperar cierre &gt; 1.18</b>, o tramo chico en 0.85–0.90 con stop bajo 0.80.',
      'Trigger único que anula el sesgo: <b>cierre diario &gt; 1.18</b> (EMA50) con volumen.',
    ],
    invalidation: { level: 1.18, text: 'Cierre diario sobre 1.18 (EMA50, sobre el máximo del 9 Sep) invalida el sesgo bajista → siguiente parada 1.64–1.77 (zona de julio) y 1.75 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 0.85, how: 'Rebotes rechazados bajo 1.0 → retest del mínimo del 18 Ago.' },
      { d: 90, h: '+3M', target: 0.77, how: 'Pierde 0.85 → medida bajista. Un reverse split en esta ventana suele sumar presión.' },
      { d: 365, h: '+1Y', target: 0.64, how: 'Mínimo de 2 años. La caja por encima de la capitalización es el argumento de piso — el mercado no lo está pagando.' },
    ],
    levels: {
      resistance: [[1.0, '$1 — umbral de Nasdaq'], [1.12, 'Máximo del 9 Sep'], [1.18, 'INVALIDACIÓN · EMA50'], [1.75, 'EMA200']],
      support: [[0.89, 'Línea de techo rota (ahora piso)'], [0.852, 'Mínimo del 18 Ago'], [0.767, 'Medida bajista'], [0.639, 'Mínimo de 2 años']],
    },
  },

  INKT: {
    updated: U, bias: 'BULL',
    read: 'Siete de siete, pero en un régimen comprimido: las cuatro EMAs están entre 11.46 y 11.75 y la 200 casi plana (+0.4% en 20 días). El triángulo de marzo-septiembre (techo 14.21 → 12.2, piso 8.56 → 10.95) se rompió para arriba: 12.35 hoy, sobre el techo en ~11.7. Lo que no está: volumen. El promedio de 20 días está en 65% del de 90, y el volumen diario en dólares ronda $160k — cualquier orden mueve el precio. RSI 70. Fuera del chart: $8.8M de caja, así que una ampliación de capital es probable y le pega directo a este chart.',
    pattern: '<b>Triángulo simétrico — ruptura alcista sin volumen.</b> Techo desde 14.21 (17 Abr), hoy en ~11.67. Piso desde 8.56 (24 Mar), 3 toques, hoy en ~11.28. Ápex ~6 Oct. Altura ~5.3 → medida 17.',
    watch: '<b>Volumen en la ruptura.</b> Sin 2× el promedio, esta ruptura se puede deshacer en una sesión. <b>11.3–11.7:</b> techo roto + piso del triángulo + EMAs — si el precio vuelve ahí, es la prueba. <b>Financiamiento:</b> con $8.8M de caja, un anuncio de oferta es el riesgo más grande del chart.',
    decision: [
      'Con posición: <b>mantener mientras cierre sobre 11.3</b>; tamaño chico por liquidez.',
      'Sin posición: <b>esperar el retest de 11.7</b>, o cierre &gt; 12.8 con volumen.',
      'Trigger único que anula el sesgo: <b>cierre diario &lt; 11.3</b> — pierde el piso del triángulo y las EMAs.',
    ],
    invalidation: { level: 11.3, text: 'Cierre diario bajo 11.3 (piso del triángulo y clúster de EMAs) anula la ruptura → siguiente parada 10.95 (mínimo del 1 Sep) y 10.24 (22 Jul).' },
    path: [
      { d: 30, h: '+1M', target: 12.8, how: 'Aguanta 11.7 → máximo del 3 Jun.' },
      { d: 90, h: '+3M', target: 14.2, how: 'Origen del techo (17 Abr). Necesita el primer dato del Ph2 en ARDS o financiamiento resuelto.' },
      { d: 365, h: '+1Y', target: 17.0, how: 'Medida del triángulo. Requiere datos randomizados positivos.' },
    ],
    levels: {
      resistance: [[12.76, 'Máximo del 3 Jun'], [14.21, 'Máximo del 17 Abr'], [16.3, 'Máximo de 12 meses'], [17.0, 'Medida del triángulo']],
      support: [[11.7, 'Techo del triángulo roto · EMA20'], [11.3, 'INVALIDACIÓN · piso del triángulo'], [10.95, 'Mínimo del 1 Sep'], [10.24, 'Mínimo del 22 Jul']],
    },
  },
};
