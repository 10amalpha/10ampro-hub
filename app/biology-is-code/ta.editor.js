// Editor TA per ticker. Same shape as TOKEN.ta in the Solana hub configs:
// { updated, bias: 'BULL'|'BEAR', read, pattern, watch, decision: [], invalidation: { level, text }, path: [{ d, h, target, how }], levels: { resistance: [[px, why]], support: [[px, why]] } }
// A ticker without an entry falls back to the live auto-forecast (lib/thesis/ta.js).
// Review pass data: /api/equity/{SYM}?summary=1 — basis for this pass: daily closes through 22 Oct 2026 (Thursday; marketTime 20:00 UTC = completed close; the 21 Oct close is folded in — no pass ran on it). Previous pass: 20 Oct 2026. Daily refresh: only reads with a material change are rewritten (22 Oct: TEM, IBRX, CAI, PBLS, QSI, NAUT, NGEN; 20 Oct: TEM, IBRX, PBLS, INKT; 19 Oct: TEM, IBRX, PBLS, RXRX, NGEN, NAUT, QSI; 15 Oct: HIMS, PBLS, RXRX, NGEN; 13 Oct: HIMS, PBLS, RXRX, INKT; 12 Oct: TEM, PBLS, NGEN, QSI). Note: the API's volume fields are dollar volume (shares × price) — quote them as $ traded, not shares.
const U = '22 Oct 2026';

export const EDITOR_TA = {
  TEM: {
    updated: U, bias: 'BEAR',
    read: 'The bounce reached the ceiling and the next bar took the low of the move. Oct 21 closed 67.76 (+1.5%) — 0.2 over the EMA50 (67.55), a tie with the 67.8 ceiling the read named; Oct 22 printed −5.8% to 63.81 on $395M traded (82% of the 20-day average), through 64.34 (Oct 19) to a new low of the move and 0.6 above the EMA100 (63.23). RSI 35.1; MACD histogram negative. Score 3/7, regime BEAR, unchanged: price under the EMA20 (69.65) and the EMA50; the EMA200 (60.95) rising, the 50/200 order intact. The engine still carries a BULL forecast off the 58.74 pivot (invalidation 58.7). The sell-the-bounce sequence completed as written: 67–68 was the exit and it printed. −25% from the 85.08 leg high; the next references below are the EMA100 (63.2), the Jul 1 high (61.6), the EMA200 (61.0) and 58.74. 71.2 remains the line.',
    pattern: '<b>Uptrend broken — trendline lost Oct 12, EMA50 lost Oct 16, bounce to the EMA50 Oct 21, new low of the move Oct 22.</b> Support 41.55 (Jul 29) → 58.74 (Sep 10), 3 touches; the engine still projects the line (~75.5 today) and it is irrelevant above price. No ceiling line: 85.08 (Sep 28) is the leg high and the top of a 58.74–85.08 range. The Sep 15–17 gap (68.6–72.7) was filled Oct 6 and failed as support Oct 16; the Jul–Aug shelf (64) held once (Oct 19) and went Oct 22. Engine measured move down: 37.4 — the long-range risk if 58.74 goes.',
    watch: '<b>63.2 and 61.6.</b> The EMA100 (63.23) is 0.6 under the close and the last average between price and the EMA200; under it, 61.6 (Jul 1 high) and 60.95 (EMA200) are the +1M zone, then 58.74 (Sep 10 low, the engine invalidation of the July structure). Above, 67.55 (EMA50) is the bounce ceiling again — Oct 21 closed on it and sold — and nothing under 71.2 is a repair. <b>Volume:</b> $395M on the break of 64.34 — 82% of average, more than the Oct 20 bounce ($331M) and less than the Oct 16 break: the sellers are still in control without a flush. <b>RSI 35:</b> not oversold after a −5.8% bar; no bounce fuel yet. <b>Q3 print (Nov):</b> the chart sits in the 58.7–68 band until it.',
    decision: [
      'Holding: <b>the 67.8 stop printed on Oct 16 and the bounce to 67–68 printed on Oct 21</b> — a position that stayed through the break had its exit. A core kept for the Nov print accepts 58.7 as the next stop.',
      'Not holding: <b>do not buy the break.</b> The zone of interest is 58.7–61.6 (Sep 10 low / Jul 1 high / EMA200) with a reversal bar on volume above the 20-day average, or a close back above 71.2.',
      'Single trigger that flips the bias: <b>daily close &gt; 71.2</b> — the Oct 15 close, above the EMA20 and back inside the trendline band.',
    ],
    invalidation: { level: 71.2, text: 'A daily close above 71.2 (Oct 15 close, the failed reclaim, with the EMA20 at 69.65 under it) puts price back above the EMA50 and inside the old trendline band and voids the bear read → next stop 73–75 and 80.4.' },
    path: [
      { d: 30, h: '+1M', target: 60.8, how: 'EMA200 (60.95), between the Jul 1 high (61.6) and the Sep 10 low (58.74); the bounce to 67–68 came and went, the EMA100 (63.2) is the only step in between.' },
      { d: 90, h: '+3M', target: 58.7, how: 'Sep 10 low and the engine invalidation of the July structure; the Q3 print (Nov) decides whether it holds. Under it, the measured move (37) is the risk.' },
      { d: 365, h: '+1Y', target: 80, how: 'Retest of the Sep 17 high (old flag top) from below — a correction inside the 2026 uptrend, not a top, if the EMA200 holds and the GAAP profit repeats. 103 is off the table until 71.2 is reclaimed.' },
    ],
    levels: {
      resistance: [[67.55, 'EMA50 — lost Oct 16 · bounce ceiling, sold Oct 21'], [69.65, 'EMA20'], [71.2, 'INVALIDATION · Oct 15 close'], [80.36, 'Sep 17 high · old flag top'], [85.08, 'Sep 28 high · leg high']],
      support: [[63.81, 'Oct 22 close — today · low of the move'], [63.23, 'EMA100'], [61.6, 'Jul 1 high'], [60.95, 'EMA200 · +1M'], [58.74, 'Sep 10 low · engine invalidation · +3M'], [37.4, 'Engine measured move']],
    },
  },

  IBRX: {
    updated: U, bias: 'BEAR',
    read: 'The bounce failed at the EMA50 and the low of the move went. Oct 21 closed 8.64 (−1.5%) after the Oct 20 tag of the EMA50; Oct 22 printed −3.8% to 8.31 on $106M traded (69% of the 20-day average) — through 8.42 (Oct 19), a new low of the move, 0.04 above the EMA100 (8.27). RSI 29.9, under 30 for the first time in the leg; MACD negative and falling. Score 3/7, regime BEAR, unchanged: price under the EMA20 (9.15) and the EMA50 (8.77); the EMA200 (7.34) rising, the 50/200 order intact. −21% from the 10.51 high (Oct 9). The engine keeps the "uptrend, higher lows" frame off the 6.66–6.83 floor with a BULL forecast and invalidation 6.95 — the 6-month frame; the editor does not follow it. The reduce zone (8.8–9.35) was touched once and never closed in; the 20-day volume ($154M) is 1.54× the 90-day — the unwind is still the heavier side.',
    pattern: '<b>Breakout follow-through undone — retest low (8.44) lost Oct 19, EMA50 rejected Oct 20–21, new low 8.31 Oct 22.</b> The Sep 22 breakout (9.29) and the Sep 23–25 retest held three weeks; the Oct 9 high (10.51) is a lower high against 11.55 (Feb 24). Below 8.31: the EMA100 (8.27), 7.91 (30-day low, the September retest), 7.72 (Sep 10 low), then the EMA200 (7.34) and the higher-lows floor (6.83, Jul 29; engine line 6.95). Above: 8.77 (EMA50), 9.15 (EMA20), 9.44 (Sep 30 close / Jul 2 high — the old ceiling pivot).',
    watch: '<b>8.27 and 7.72.</b> The EMA100 is 0.04 under the close — a tie, the last rising average between price and the Sep 10 low; a close under it opens 7.91 (the September retest low) and 7.72, with the EMA200 (7.34) and the engine measure (5.99) behind them. Above, 8.77 (EMA50) is the bounce ceiling and was rejected twice; 9.44 remains the flip line. <b>Volume:</b> $106M on the new low — 69% of average, less than the Oct 19 break ($164M): a drift, not a flush, and no reversal bar. <b>RSI 29.9:</b> first sub-30 of the move — the oversold bounce has fuel from here, into 8.6–8.8, and that bounce is a sell. <b>PDUFA Jan 6, 2027:</b> 11 weeks out; the chart is pricing the run-up from lower.',
    decision: [
      'Holding: <b>the 8.44 stop printed on Oct 19 and the reduce zone was touched on Oct 20</b> (8.77, on the EMA50) — the exit was there for one session; the next one is the oversold bounce to 8.6–8.8. A core kept for the PDUFA is sized for 7.3.',
      'Not holding: <b>wait</b>. The zone of interest is 7.3–7.9 (EMA200 / Sep 10 low / September retest) with a reversal bar, or a close back above 9.44 on volume — 8.31 with RSI just under 30 is a bounce setup, not a base.',
      'Single trigger that flips the bias: <b>daily close &gt; 9.44</b> — back above the EMA20 and the old ceiling pivot; the Oct 16–22 drop becomes a shakeout.',
    ],
    invalidation: { level: 9.44, text: 'A daily close above 9.44 (Jul 2 high / Sep 30 close, the old triangle ceiling pivot; EMA20 9.15) puts price back above both near EMAs and voids the bear read → next stop 10.0 and 10.51 (Oct 9 high).' },
    path: [
      { d: 30, h: '+1M', target: 7.72, how: 'Sep 10 low, the last higher low; the oversold bounce to 8.6–8.8 (EMA50) comes first and is the sell.' },
      { d: 90, h: '+3M', target: 7.3, how: 'EMA200, rising toward 7.5 by then — the window ends two weeks before the Jan 6 PDUFA, when the run-up trade would normally start.' },
      { d: 365, h: '+1Y', target: 10.5, how: 'Retest of the Oct 9 high from below. The PDUFA decides the direction, not the chart: a positive label with ANKTIVA still compounding puts 11.55–13.7 back on; a CRL puts 6 on. Size for a binary.' },
    ],
    levels: {
      resistance: [[8.77, 'EMA50 — rejected Oct 20–21 · bounce ceiling'], [9.15, 'EMA20'], [9.44, 'INVALIDATION · Jul 2 high / Sep 30 close'], [10.51, 'Oct 9 high · lower high'], [11.55, 'Feb 24 high']],
      support: [[8.31, 'Oct 22 close — today · low of the move'], [8.27, 'EMA100'], [7.91, '30-day low · September retest'], [7.72, 'Sep 10 low · +1M'], [7.34, 'EMA200 · +3M'], [6.95, 'Engine invalidation · higher-lows line'], [6.83, 'Floor · Jul 29'], [5.99, 'Engine measured move']],
    },
  },

  CAI: {
    updated: U, bias: 'BULL',
    read: 'The box top got its close and gave it back. Oct 21 closed 32.35 (+4.0%) — 0.08 over the Sep 24 high (32.27), the first close above the 24–32.3 box since it formed and a new 12-month closing high; Oct 22 printed −2.0% to 31.71 on $77M traded (69% of the 20-day average), back inside the box by 0.6. One close over the ceiling on an ordinary day is a test, not a breakout; the structure is intact either way. Score 7/7, STRONG BULL, every check on: price above the EMA20 (30.09), the EMA50 (27.56) and the EMA200 (23.68, rising); MACD positive; RSI 62. The engine reads an uptrend with higher lows (14.55 → 15.38 → 24.03 → 27.1) and a BULL forecast (invalidation 22.2). The box is now 27.1–32.35 and the question is whether the next test of 32.3 comes on volume.',
    pattern: '<b>Uptrend in a 27.1–32.35 box — ceiling closed over once (Oct 21), not held.</b> Higher-lows trendline from 14.55 (May 15) and 15.38 (Jul 22) is far below (~16.5) — not actionable. The actionable frame is the box: 32.35 (Oct 21 close) and 32.27 (Sep 24) are the ceiling, 27.1 (Oct 7, now an engine pivot) the floor, 24.03 (Sep 10) under it. No ceiling line because every high since May took out the prior one. The 52-week high (33.13 intraday) is 4% up.',
    watch: '<b>32.35 and 30.1.</b> A second close above 32.35 on volume above the 20-day average ($111M) is the breakout the Oct 21 bar was not, and opens 33.1 (52-week high) and the +3M. Below, the EMA20 (30.09) is the first support and the Oct 16 close (30.56) sits on it; losing it sends price to 27.1–27.6 (Oct 7 low / EMA50), the box floor. <b>Volume:</b> $77M on the give-back, 69% of average — the ceiling was not sold hard. <b>Q3 print (Nov):</b> the box most likely resolves on it; 7/7 into the print is the strongest regime in the basket.',
    decision: [
      'Holding: <b>keep it while it closes above 27.1</b> (Oct 7 low, with the EMA50 at 27.56 just above it). Add on a hold of 30.1 (EMA20) with volume, not at 32.',
      'Not holding: <b>first tranche at 30–30.5</b> (EMA20 / Oct 16 close); second on a second close &gt; 32.35 with volume above the 20-day average.',
      'Single trigger that flips the bias: <b>daily close &lt; 27.1</b> — the Oct 7 pivot and the EMA50 go together and the box floor at 24 is next.',
    ],
    invalidation: { level: 27.1, text: 'A daily close below 27.1 (Oct 7 low, the last higher low; EMA50 27.56 right above it) breaks the near structure → next stop 24.03 (Sep 10 low) and 23.7 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 33.1, how: 'The 52-week high (33.13) after a second close over 32.35; the box resolves up if 30.1 holds.' },
      { d: 90, h: '+3M', target: 36, how: 'Break of 33.1 (52-week high) on Q3 results (Nov) with adj-EBITDA still positive.' },
      { d: 365, h: '+1Y', target: 45, how: 'Requires Caris Detect (MCED) revenue to show up in guidance.' },
    ],
    levels: {
      resistance: [[32.27, 'Sep 24 high · box top'], [32.35, 'Oct 21 close · 12-month closing high'], [33.13, '52-week high · +1M'], [36, '+3M target'], [45, '+1Y target']],
      support: [[31.71, 'Oct 22 close — today'], [30.56, 'Oct 16 close'], [30.09, 'EMA20'], [27.56, 'EMA50'], [27.1, 'INVALIDATION · Oct 7 low · box floor'], [24.03, 'Sep 10 low']],
    },
  },

  HIMS: {
    updated: U, bias: 'BULL',
    read: 'The floor got its test and held. Oct 14 printed −6.7% to 27.72 — through the rising floor line (~29.6) that was the first warning of the last pass and 0.28 above the 27.44 invalidation — and Oct 15 took it all back, +6.0% to 29.38. A 6% round trip in two sessions that leaves HIMS where it was. The engine went from 4/7 to 1/7 (STRONG BEAR) on the way: the EMA20/50/100 are bunched at 29.3–29.4 and price closed inside the bunch, under the EMA200 (30.5); MACD flat, RSI 52. The rising line of the triangle is lost on close, the horizontal floor (27.44) is not. The engine forecast stays BEAR (invalidation 30.4); the editor keeps BULL on the floor test only — the Nov 9 print is inside the window and the chart still has not chosen. The Oct 16 open printed 29.24, flat.',
    pattern: '<b>Symmetrical triangle — upside break failed (Oct 9–13), floor tested (Oct 14), held.</b> Ceiling 38.28 (Jul 6) → 30.43 (Sep 22), 3 touches; the horizontal 30.43 is what matters above. Floor 14.52 (Feb 27) → 27.44 (Sep 10), 3 touches — the rising line passes ~29.8 today and price closed under it, so the triangle is now the 27.44–30.92 box, nothing finer. Height ~11 → measure 38–40 up / 14–17 down, both far.',
    watch: '<b>27.44 and 30.4.</b> The box is 27.44–30.92 and price closed in the middle of it. A second test of the floor is the one that counts: a close under 27.44 resolves the contraction down. Above, 30.43–30.92 has to be reclaimed and held two sessions for the break to count again. <b>Volume:</b> 20-day at 75% of 90-day — the month is still trading light for a stock that moved 6% twice in two days. <b>Q3 earnings Nov 9:</b> the triangle will most likely resolve on the print, not before.',
    decision: [
      'Holding: <b>keep it while it closes above 27.44</b> (triangle floor, Sep 10 low). The Oct 14 test was the stop check and it passed; no add until 30.9 is held.',
      'Not holding: <b>wait</b>. The floor retest at 27.7 came and went in one session; the next entry is a second test of 27.5–28 (stop 27.44) or a close back above 30.9 with volume — not 29.4 in the middle of the box.',
      'Single trigger that flips the bias: <b>daily close &lt; 27.44</b> — the floor goes and the triangle resolves down.',
    ],
    invalidation: { level: 27.44, text: 'A daily close below 27.44 (Sep 10 low, triangle floor; tested Oct 14 at 27.72) resolves the contraction to the downside → next stop 25.0 (Jul low) and 22.' },
    path: [
      { d: 30, h: '+1M', target: 30.9, how: 'Back to the Oct 9 high; the 27.4–31 box holds into the Nov 9 print.' },
      { d: 90, h: '+3M', target: 33.8, how: 'Aug 17 gap, after a clean Q3 (guided +47–50%) and a second, held break of 30.4. The 38.3 measure is not a 3-month call after a failed break.' },
      { d: 365, h: '+1Y', target: 48, how: 'Half the way back to the 65.3 high. Requires the peptide channel (post-PCAC) to show in subscriber growth.' },
    ],
    levels: {
      resistance: [[29.4, 'EMA50 / EMA100 cluster'], [30.43, 'Sep 22 high · triangle ceiling — reclaimed Oct 9, lost Oct 13'], [30.92, 'Oct 9 high'], [33.8, 'Aug 17 gap'], [38.28, 'Jul 6 high · triangle measure'], [48, '+1Y target']],
      support: [[29.38, 'Oct 15 close — today'], [29.25, 'EMA20'], [27.72, 'Oct 14 close · floor test'], [27.44, 'INVALIDATION · Sep 10 low'], [25.0, 'Jul low']],
    },
  },

  PBLS: {
    updated: U, bias: 'BEAR',
    read: 'The +1M target printed and the bounce turned there. Oct 21 closed 27.85 (+2.8%) — through 27.48 (Oct 9 low), the bounce ceiling and the +1M of the last two passes, the third green close in a row and the top of the move from 22.75 (+22%); Oct 22 printed −3.3% to 26.92 on $25M traded (84% of the 20-day average), back under 27.48. The exit window (27.5–28.6) was open for one session and closed 0.75 under its top: 28.59 (78.6%) was never reached. RSI 39.8; MACD histogram positive — the only check on. Score 1/7, STRONG BEAR: price 6% under the EMA20 (28.7) and 15% under the EMA50 (31.6), both falling; −35% from 41.73. The engine still returns no clean structure and a BEAR forecast (invalidation 33.7). Three up, one down: the bounce has done the normal thing for a 2× volume reversal bar at a new low, and the trend has not changed.',
    pattern: '<b>Post-IPO range 25–42 — floor lost (Oct 16), reclaimed on a reversal bar (Oct 19), bounce to 27.85 (Oct 21), first red close (Oct 22).</b> No pivot trendlines; the engine returns no clean structure. 25.01 is the line price trades on both sides of; 22.75 (Oct 16) is the low of the move. Above: 27.48 (Oct 9 low — closed over once, given back), 27.85 (Oct 21 close, the bounce high), 28.59 (78.6%), 28.7 (EMA20) and 28.95 (Oct 12 close) are stacked inside 1.5 points. Below 22.75: 22, then 20.5 (engine measure).',
    watch: '<b>25.0 and 27.85.</b> The post-IPO low is where the bounce is decided: a close under 25.01 says the two-day reversal is over and 22.75 is retested; a close above 27.85 on volume above the 20-day average ($29M) reopens the window to 28.6–28.95, where the bear read is voided. <b>Volume:</b> $25M on the first red day, 84% of average — a fade, not a sell-off; the two reversal days ran $54M and $40M. <b>Lockup:</b> IPO June → 180-day expiry mid-December is the supply event in sight; the bounce did not change the calendar.',
    decision: [
      'Holding: <b>the exit window opened on Oct 21</b> (27.85, 0.4 over the 27.48 bottom of it) and the first red day took the close back under it — a position that stayed through the break sells the next test of 27.5–27.85, not 25. Holding through December means holding through the lockup.',
      'Not holding: <b>the Oct 19 tranche (24–25) trails its stop to 25.01</b> — the close over 27.48 printed on Oct 21 — and is +8%; no second tranche until 28.6 holds two closes. If missed, the next entry is 22–23 into the lockup, or a retest of 25 on falling volume.',
      'Single trigger that flips the bias: <b>daily close &gt; 28.95</b> (Oct 12 close, with the EMA20 at 28.7 under it) with volume.',
    ],
    invalidation: { level: 28.95, text: 'A daily close above 28.95 (Oct 12 close, the last close above the 27.5–28.6 shelves; EMA20 28.7 right under it) reclaims the middle of the range and voids the bias → next stop 31.6 (EMA50) and 36.' },
    path: [
      { d: 30, h: '+1M', target: 25.0, how: 'Post-IPO low (25.01), retested from above after the bounce stalled at 27.85 — the trailing stop of the Oct 19 tranche and the line that says whether the reversal bar meant anything.' },
      { d: 90, h: '+3M', target: 22, how: 'New post-IPO low into the mid-December lockup expiry; a second close under 22.75 is the trigger.' },
      { d: 365, h: '+1Y', target: 25, how: 'Flat from here on a 12-month view: the lockup supply gets absorbed in H1 2027 and the first Helicon clinical data decides the direction.' },
    ],
    levels: {
      resistance: [[27.48, 'Oct 9 low — closed over Oct 21, lost Oct 22'], [27.85, 'Oct 21 close · bounce high'], [28.59, '78.6% of the range'], [28.7, 'EMA20'], [28.95, 'INVALIDATION · Oct 12 close'], [31.6, 'EMA50']],
      support: [[26.92, 'Oct 22 close — today'], [25.35, 'Oct 19 close · reversal bar'], [25.01, 'Post-IPO low · trailing stop · +1M'], [22.75, 'Oct 16 close · low of the move'], [22, '+3M target'], [20.5, 'Engine measured move']],
    },
  },

  RXRX: {
    updated: U, bias: 'BEAR',
    read: 'The reclaim lasted one session. Oct 16 closed 3.465 (−16.7%) — through the 3.70 invalidation, the 3.74 retest low, the EMA50 (3.71), the EMA200 (3.76) and the EMA100 (3.60) in one bar, the worst session of the move; Oct 19 bounced +4.2% to 3.61 on 108M shares (82% of the 20-day average), back above the EMA100 only. The bias flips to BEAR on the rule. Score 1/7, STRONG BEAR: the only check left is the rising EMA200; RSI 45, MACD negative and falling. From the 4.78 high (Oct 5) the drawdown bottomed at −28% (3.465); at today’s close the move from the old ceiling (3.40) to 4.78 is 85% retraced. The Oct 15 close (4.16) is now a lower high under the EMA20 (3.90). The engine keeps its BULL structure off the 2.84–2.89 floor (invalidation 2.93) — that is the 6-month frame; the breakout frame of the last three passes is gone. The 20-day volume (132M) is 1.6× the 90-day: the breakout month and its unwind are both in the average.',
    pattern: '<b>Descending-triangle breakout — retest held once (Oct 14), then failed (Oct 16).</b> Old ceiling 3.96 (Jul 6) → 3.63 (Sep 4), 3 touches, now ~3.40 — the first reference below price. Floor 2.84 (Mar 30) → 2.89 (Jul 20), 3 touches, ~2.93 today. The measure (~4.75) was met Oct 5 and most of the September move has been given back. Above: 3.71–3.76 (EMA50 / EMA200, the lost cluster), 3.90 (EMA20), 4.16 (Oct 15 close).',
    watch: '<b>3.40 and 3.76.</b> The old triangle ceiling is where the breakout started; a close under 3.40 puts the whole September move in question and opens 3.16 (Sep 10 low). The repair runs through 3.76 (EMA200 — the top of the lost cluster) and is complete at 3.90 (EMA20), where the bear read is voided. <b>Volume:</b> Oct 19 bounced on 82% of average — a relief bar, not a reversal; the Oct 16 bar is the one the chart has to overcome. <b>Q3 print (Nov):</b> the opex cut has to show; the chart will not repair on its own before it.',
    decision: [
      'Holding: <b>the 3.70 stop printed on Oct 16</b>. The tranche taken at 3.70–3.80 on Oct 14 is stopped; the exit is the bounce to 3.71–3.76, not 3.46. A core kept for the readouts accepts 3.16 as the next stop.',
      'Not holding: <b>wait</b>. The next entry is 3.16–3.40 (Sep 10 low / old ceiling) with a reversal bar, or a close back above 3.90 on volume — not 3.6 the day after a −17% bar.',
      'Single trigger that flips the bias: <b>daily close &gt; 3.90</b> — the EMA20; price back above the whole cluster and the Oct 16 gap closed.',
    ],
    invalidation: { level: 3.9, text: 'A daily close above 3.90 (EMA20; the lost EMA50/EMA200 cluster at 3.71–3.76 is the first hurdle) puts price back above every moving average and voids the bear read → next stop 4.16 (Oct 15 close) and 4.36.' },
    path: [
      { d: 30, h: '+1M', target: 3.4, how: 'Old triangle ceiling, the breakout origin — retested from above. A bounce to 3.71–3.76 first is the sell.' },
      { d: 90, h: '+3M', target: 3.16, how: 'Sep 10 low, the last higher low of the 6-month structure; the Q3 print (Nov) lands in this window.' },
      { d: 365, h: '+1Y', target: 4.4, how: 'Retest of the Oct 9 close from below — needs a clinical readout from the AI-designed pipeline; the 7.2 of the last pass is off the table until 3.90 is reclaimed.' },
    ],
    levels: {
      resistance: [[3.71, 'EMA50 — lost Oct 16'], [3.76, 'EMA200'], [3.9, 'INVALIDATION · EMA20'], [4.16, 'Oct 15 close · lower high'], [4.36, 'Oct 9 close'], [4.78, 'Oct 5 high · triangle measure']],
      support: [[3.61, 'Oct 19 close — today · EMA100 3.60'], [3.465, 'Oct 16 close · low of the move'], [3.4, 'Old triangle ceiling · +1M'], [3.16, 'Sep 10 low · +3M'], [2.93, 'Triangle floor · engine invalidation']],
    },
  },

  NGEN: {
    updated: U, bias: 'BEAR',
    read: 'The +1M target printed and went. Oct 21 closed 1.50 (−2.6%) — on the round number the last pass named as the next stop; Oct 22 printed −5.3% to 1.42 on $892K traded, 111% of the 20-day average ($802K) — the first above-average bar of the drift — a new 52-week closing low (1.415 intraday) and the low of the 2-year window. Zero of seven, STRONG BEAR; RSI 17.3, under 30 for nine sessions. EMA20 1.69, EMA50 1.85, EMA200 2.50, all falling; price is 16% under the nearest. The engine re-ran its measured move with the new low: 1.28, and its path reads 1.28 / 1.09 / 0.925. The descending line from 4.39 (Apr 6) passes ~1.82, on the EMA50. −37% from the Sep 17 high (2.27) in five weeks.',
    pattern: '<b>Downtrend — lower highs, 52-week low lost Oct 14, confirmed Oct 19, 1.50 lost Oct 22.</b> Resistance line 4.39 (Apr 6) → 2.27 (Sep 17), 3 touches, today ~1.82 (EMA50 1.85 on top of it). No support line: 1.42 (Oct 22 close, 1.415 intraday) is the only reference, then the old engine measure (1.39) and the recalculated one (1.28).',
    watch: '<b>1.39 and 1.69.</b> The old engine measure is 2% under the close and the first place a base can form; under it the recalculated measure (1.28) is the +3M. The bounce ceiling is 1.69 (EMA20) — a trade, not a change of trend. <b>Reversal needs</b> a close above 1.85 (descending line + EMA50) — the first lower high taken out since April. <b>Volume:</b> $892K on the new low, the first bar above the 20-day average since the drift began — still 77% of the 90-day; a flush, if it comes, looks like 2–3× this. <b>Cash:</b> funded to the 1H28 readout, so the overhang is time, not solvency.',
    decision: [
      'Holding: <b>nothing to do under 1.85</b>. The thesis is the 2028 readout; the chart is dead money until then.',
      'Not holding: <b>wait for the close &gt; 1.85</b>; a new low every other session is not an entry.',
      'Single trigger that flips the bias: <b>daily close &gt; 1.85</b> with 2× volume.',
    ],
    invalidation: { level: 1.85, text: 'A daily close above 1.85 (EMA50, with the descending line from Apr 6 at ~1.82 just under it) breaks the lower-highs sequence → next stop 2.27 (Sep 17 high) and 2.50 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 1.39, how: 'The old engine measure, 2% under the close; 1.50 printed on Oct 21 and broke on Oct 22.' },
      { d: 90, h: '+3M', target: 1.28, how: 'Engine measure recalculated with the 1.42 low; nothing on the calendar before year-end to change it.' },
      { d: 365, h: '+1Y', target: 1.9, how: 'A base through 2027 as the Ph3 enrolls; a re-rate before the 1H28 readout is a 2027 story, not a 2026 one.' },
    ],
    levels: {
      resistance: [[1.69, 'EMA20 · bounce ceiling'], [1.85, 'INVALIDATION · EMA50 / descending line (~1.82)'], [2.27, 'Sep 17 high'], [2.5, 'EMA200']],
      support: [[1.42, 'Oct 22 close — today · 52-week closing low'], [1.415, '52-week intraday low'], [1.39, 'Old engine measure · +1M'], [1.28, 'Engine measure · +3M']],
    },
  },

  NAUT: {
    updated: U, bias: 'BULL',
    read: 'The Jul high got its close and the next bar gave it back. Oct 21 closed 2.71 (+6.3%) — 0.03 over 2.68, the ceiling named in the last three passes, a new 90-day closing high and the engine +1M in one bar; Oct 22 printed −4.1% to 2.60 on $17.9M traded (79% of the 20-day average), back under 2.68. From the 0.95 low (Sep 25) the move is +174% in 19 sessions. RSI 64 — under 70 for the first time since Oct 9, after nine sessions above it; MACD positive, histogram shrinking. Score 6/7, STRONG BULL: price above every EMA; the one missing check is the 50/200 cross — the EMA50 (1.655) is 0.12 under the EMA200 (1.78) and closing at the current pace. The engine forecast is BULL with invalidation 1.82; the engine still draws the old triangle (neutral) — irrelevant 2× above its ceiling. The frame is 2.05 (box floor) to 2.71 (leg high), with the air pocket to 3.95 above.',
    pattern: '<b>Vertical breakout out of a 5-month triangle — six-session box (2.05–2.25), second leg Oct 19–21 to 2.71, first give-back Oct 22.</b> Ceiling 3.95 (Mar 24) → 1.12 (Sep 9), 4 touches, broken Sep 29 (1.365). Floor 0.852 → 0.891 held. Breakout point plus the triangle height projects ~3.4, where the sell-side targets sit (Roth 3.50, Leerink 4). 2.68–2.71 is now a ceiling closed over once and not held; 2.25 (box top) and 2.05 (box floor, Oct 13 close) are the structural levels below.',
    watch: '<b>2.71 and 2.25.</b> A second close over 2.71 on volume above the 20-day average ($22.6M) is the break of the Jul high that counts and opens 2.95–3.4 with nothing in between; the Oct 21 bar did not carry it. Below, 2.25 is the box top — a close under it makes Oct 19–21 a spike and sends price to 2.05 and the EMA20 (2.03). <b>Volume:</b> $17.9M on the give-back at 79% of average — the Jul high was not sold hard; the 20-day average has gone 4× in a month, so "average" is a high bar now. <b>RSI 64:</b> the first cool-off under 70 since the breakout, with price 4% off the high — the healthier version of a second leg, not a top signal by itself.',
    decision: [
      'Holding: <b>keep the core while it closes above 2.05</b> (box floor). The trading tranche comes off into 2.68–3.0 — 2.71 printed on Oct 21 and is the first fill; the experimental position (avg ~0.91) is 2.9×.',
      'Not holding: <b>wait for the retest of 2.05–2.25</b> (the box) on falling volume, or a second close over 2.71 with volume above the 20-day average; 2.60 the day after a failed ceiling test is neither.',
      'Single trigger that flips the bias: <b>daily close &lt; 2.05</b> — the box fails, Oct 19–21 was a blow-off and price returns to the EMA20 (2.03) and 1.57.',
    ],
    invalidation: { level: 2.05, text: 'A daily close below 2.05 (Oct 13 close, the floor of the Oct 9–16 box; EMA20 2.03 on it now) voids the second leg → next stop 1.78 (EMA200), 1.57 (Oct 1 close, the EMA200 reclaim) and 1.12.' },
    path: [
      { d: 30, h: '+1M', target: 2.95, how: 'Second close over 2.71 and through the Jul high; a pause at 2.25–2.6 first is the healthier version.' },
      { d: 90, h: '+3M', target: 3.4, how: 'Triangle projection and the Roth target (3.50). Requires volume to stay above the 90-day average and the raise (guided before mid-2027) not to hit the chart first.' },
      { d: 365, h: '+1Y', target: 3.95, how: 'Mar 24 high and the top of the triangle. Lines up with the sell-side targets (3.50–4.00) and ~20 proteoform assays by mid-2028.' },
    ],
    levels: {
      resistance: [[2.68, 'Jul high — closed over Oct 21, lost Oct 22'], [2.71, 'Oct 21 close · leg high'], [2.95, '+1M'], [3.4, 'Triangle projection · +3M'], [3.5, 'Roth target'], [3.95, 'Mar 24 high · triangle top']],
      support: [[2.6, 'Oct 22 close — today'], [2.25, 'Oct 9 close · box top'], [2.05, 'INVALIDATION · Oct 13 close · box floor'], [2.03, 'EMA20'], [1.78, 'EMA200'], [1.57, 'Oct 1 close · EMA200 reclaim']],
    },
  },

  QSI: {
    updated: U, bias: 'BEAR',
    read: 'The invalidation fired by a cent and was undone the next session. Oct 21 closed 1.23 (+6.0%) — 0.01 over the 1.22 line, the top of the 1.17–1.22 reduce zone the last pass named, back above the EMA20 (1.17); Oct 22 printed −6.5% to 1.15 on $4.1M traded — 27% of the 20-day average, the lightest session since the breakout — back under 1.22 and the EMA20 in one bar. By the rule the bias flipped to BULL on the Oct 21 close and the bull read lost its level the next day; the net is BEAR, with a failed reclaim at 1.23 as the new reference. Score 4/7, NEUTRAL: above the EMA50 (1.03) and the EMA200 (1.02, rising); RSI 36.8; MACD negative. The engine keeps a BULL forecast off the 0.70–0.72 floor (invalidation 0.805) — the 4-month frame. The 1.07 gap (Sep 30 close) is 7% under price; the EMA cluster (1.02–1.03) 11%.',
    pattern: '<b>Bear-triangle failure → breakout → higher low (1.22) lost Oct 16, reclaimed Oct 21 by 0.01, lost again Oct 22.</b> Floor 0.70–0.72 (Jul 29, Aug 18, Sep 15) held; ceiling 1.28 → 0.85 broke Sep 29; measure (~1.30) met Oct 1. The Oct 9 record bar (1.53 on $63M) is the top of a failed second leg. From 1.55 (Oct 2) the retrace is −26%; 1.22–1.23 is now a ceiling tested from below and failed, with 1.28 (Oct 5/7 closes) and 1.36 (Oct 12 close) above it. Below 1.07: the 1.02–1.03 EMA cluster, then 0.85 (the old ceiling, breakout origin).',
    watch: '<b>1.07 and 1.23.</b> The Sep 30 gap is the last reference above the EMA cluster; a close under 1.07 sends price to 1.00–1.03 (EMA50 / EMA200) and the breakout is retested from above at 0.85. The repair is a close back above 1.23 — the Oct 21 close, the one-session reclaim — on volume above the 20-day average ($15M); a cent over 1.22 on a light day did not count and the next day proved it. <b>Volume:</b> $4.1M on the give-back is the thinnest bar of the move; no reversal bar either way. <b>Nasdaq $1 compliance:</b> back on the radar under 1.10 — thirty consecutive closes under $1 start the clock. <b>Q3 print Nov 5.</b>',
    decision: [
      'Holding: <b>the 1.22 stop printed on Oct 16 and the reduce zone (1.17–1.22) printed on Oct 21</b> (1.23) — the trading tranche had its exit. Shares plus 2027 calls are the sensor leg of the chain and the thesis is untouched; keep the calls.',
      'Not holding: <b>wait</b>. The next entry is 0.96–1.03 (EMA cluster) with a reversal bar, or a close back above 1.23 on volume above the 20-day average.',
      'Single trigger that flips the bias: <b>daily close &gt; 1.23</b> on volume — the failed reclaim taken out; the Oct 16–22 sequence becomes a shakeout.',
    ],
    invalidation: { level: 1.23, text: 'A daily close above 1.23 (Oct 21 close — the one-session reclaim of the lost 1.22 higher low; EMA20 1.17 under it) voids the breakdown → next stop 1.36 (Oct 12 close) and 1.55 (Oct 2 high).' },
    path: [
      { d: 30, h: '+1M', target: 1.0, how: 'EMA50 / EMA200 cluster (1.02–1.03), with the 1.07 gap the first stop; a retest of the breakout from above.' },
      { d: 90, h: '+3M', target: 0.85, how: 'Old triangle ceiling (Aug 25 high), the breakout origin; the Nov 5 print lands in this window and Proteus timing decides whether it holds.' },
      { d: 365, h: '+1Y', target: 1.55, how: 'Retest of the Oct 2 high from below — needs the Proteus launch (Q2 2027) on schedule and no financing off the $300M shelf hitting the chart. 3.1 is off the table until 1.23 is reclaimed and held.' },
    ],
    levels: {
      resistance: [[1.17, 'EMA20'], [1.22, 'Oct 6/8 lows — lost Oct 16, reclaimed Oct 21 by 0.01, lost Oct 22'], [1.23, 'INVALIDATION · Oct 21 close · failed reclaim'], [1.28, 'Oct 5/7 closes'], [1.36, 'Oct 12 close'], [1.55, 'Oct 2 high'], [2.63, '12-month high · Nov 2025']],
      support: [[1.15, 'Oct 22 close — today'], [1.09, 'Oct 19 close · low of the move'], [1.07, 'Sep 30 close · EMA200 reclaim'], [1.03, 'EMA50 / EMA200 cluster · +1M'], [0.85, 'Old triangle ceiling · +3M'], [0.72, 'Triangle floor, 3 touches · engine invalidation 0.805']],
    },
  },

  INKT: {
    updated: U, bias: 'BEAR',
    read: 'The +1M target printed and the bounce started. The drift from 12.73 (Oct 1) ran eleven of twelve sessions down to 9.41 (Oct 16, −5.3%) — through the 9.5 +1M target of the Oct 13 pass and a new 90-day low, 8% under the lost 10.24 shelf — then 9.56 (Oct 19) and 9.86 (Oct 20, +3.1%) on $81K traded, a third of the 20-day average: the oversold bounce the read expected, on no volume either way. RSI 18, under 20 for seven sessions, still the most oversold reading in the basket; MACD histogram rising. Score 0/7, STRONG BEAR: the EMA20 (10.85) is 10% above price, the EMA50/100/200 bunched at 11.26–11.44, all falling. The −23% from Oct 1 has retraced nothing yet. Market cap is ~$50M against $8.8M of cash.',
    pattern: '<b>Symmetrical triangle — resolved down (Oct 6–9), 90-day low lost (Oct 13), new low 9.41 (Oct 16).</b> Ceiling 14.21 (Apr 17) → 12.73 (Oct 1), today ~12.6. Floor 8.56 (Mar 24) → 10.95 (Sep 1), 3 touches, today ~11.7 — price is 16% below it. Height ~5.3; the measure from the break at 11.5 is ~8.5, which coincides with the 52-week low (8.48). Between 9.41 and 8.5 there is no horizontal reference.',
    watch: '<b>10.85 and 9.41.</b> The EMA20 is the bounce ceiling: 10.7–10.85 (Oct 9 close / EMA20) is where the oversold bounce meets the first sellers and is a sell unless the 11.3–11.4 cluster is reclaimed. A close under 9.41 resumes the drift toward 8.5, where the measure, the Mar 24 low and the 52-week low sit together and the chart becomes interesting. <b>Reversal needs</b> a close back above 11.4 and then 12.2 (Aug 21 high). <b>Cash $8.8M:</b> a raise is the overhang and the lower the stock, the more dilutive it gets; the ARDS Ph2 readout is the only thing that changes this chart.',
    decision: [
      'Holding: <b>reduce on the bounce to 10.7–10.85</b> unless the EMA cluster (11.3–11.4) is reclaimed and held.',
      'Not holding: <b>wait</b>. The zone of interest is 8.5–9.5, with the raise terms known; 9.86 two days off the low on a third of average volume is the bounce, not the base.',
      'Single trigger that flips the bias: <b>daily close &gt; 12.2</b> (Aug 21 high, back inside the upper triangle) with volume.',
    ],
    invalidation: { level: 12.2, text: 'A daily close above 12.2 (Aug 21 high) puts price back in the upper half of the triangle and voids the breakdown → next stop 12.73 (Oct 1 high) and 14.2.' },
    path: [
      { d: 30, h: '+1M', target: 9.4, how: 'Retest of the Oct 16 low (9.41) after the bounce fades at 10.7–10.85; the old +1M (9.5) printed on Oct 16.' },
      { d: 90, h: '+3M', target: 8.6, how: 'Triangle measure and the Mar 24 / 52-week low. The raise lands in this window.' },
      { d: 365, h: '+1Y', target: 10, how: 'Flat-to-down on a 12-month view until the ARDS Ph2 reads out; the option is the readout, not the chart.' },
    ],
    levels: {
      resistance: [[10.72, 'Oct 9 close · bounce target'], [10.85, 'EMA20 · bounce ceiling'], [11.4, 'EMA50/100/200 cluster — first reclaim'], [12.2, 'INVALIDATION · Aug 21 high'], [12.73, 'Oct 1 high']],
      support: [[9.86, 'Oct 20 close — today'], [9.41, 'Oct 16 close · 90-day low · +1M'], [8.56, 'Mar 24 low · triangle origin · +3M'], [8.48, '52-week low']],
    },
  },

};
