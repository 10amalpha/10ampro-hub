// Editor TA per ticker. Same shape as TOKEN.ta in the Solana hub configs:
// { updated, bias: 'BULL'|'BEAR', read, pattern, watch, decision: [], invalidation: { level, text }, path: [{ d, h, target, how }], levels: { resistance: [[px, why]], support: [[px, why]] } }
// A ticker without an entry falls back to the live auto-forecast (lib/thesis/ta.js).
// Review pass data: /api/equity/{SYM}?summary=1 — basis for this pass: daily closes through 26 Oct 2026 (Monday; marketTime 20:00 UTC = completed close). The engine's bar series and indicators were still asOf 23 Oct at run time: the Oct 26 close comes from the quote field, the EMAs are rolled forward with it, and RSI / MACD / score / volume are quoted as of Oct 23 where cited. Previous pass: 23 Oct 2026. Daily refresh: only reads with a material change are rewritten (26 Oct: IBRX, CAI, RXRX, NAUT; 23 Oct: IBRX, HIMS, PBLS, QSI, NAUT, INKT; 22 Oct: TEM, IBRX, CAI, PBLS, QSI, NAUT, NGEN; 20 Oct: TEM, IBRX, PBLS, INKT; 19 Oct: TEM, IBRX, PBLS, RXRX, NGEN, NAUT, QSI; 15 Oct: HIMS, PBLS, RXRX, NGEN; 13 Oct: HIMS, PBLS, RXRX, INKT; 12 Oct: TEM, PBLS, NGEN, QSI). Note: the API's volume fields are dollar volume (shares × price) — quote them as $ traded, not shares.
const U = '26 Oct 2026';

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
    read: 'The September retest went. Oct 26 closed 7.81 (−5.0%) — through 7.91 (the 30-day low and the September retest, the first horizontal reference under the EMA100) in one bar, the fourth red close in a row and a new low of the move; 0.09 (1.2%) above 7.72 (Sep 10 low, the +1M of the last three reads) — inside the near-miss rule for a target, written as reached. −26% from the 10.51 high (Oct 9). The engine indicator set is through Oct 23 (RSI 28.0, score 3/7, BEAR; the Oct 26 bar is not in it yet); the EMAs rolled forward with the close put the EMA20 at 8.94, the EMA50 at 8.71, the EMA100 at 8.26 and the EMA200 at 7.37, rising — price is 0.44 over the last one. The engine keeps the "uptrend, higher lows" frame off the 6.66–6.83 floor (BULL, invalidation 6.95) — the 6-month frame; the editor does not follow it. The oversold bounce the last two reads expected has not come: four red closes from the EMA50 tag, each lower, and the last bar the engine has ($49M on Oct 23, a third of average) was a drift, not a flush. Under 7.72 there is the EMA200 (7.37) and nothing else until the floor.',
    pattern: '<b>Breakout follow-through undone — retest low (8.44) lost Oct 19, EMA50 rejected Oct 20–21, EMA100 lost Oct 23, September retest (7.91) lost Oct 26 (7.81).</b> The Sep 22 breakout (9.29) and the Sep 23–25 retest held three weeks; the Oct 9 high (10.51) is a lower high against 11.55 (Feb 24). Below 7.81: 7.72 (Sep 10 low, the last higher low of the 6-month structure), then the EMA200 (7.37), the higher-lows floor (6.83, Jul 29; engine line 6.95) and the engine measure (5.99). Above: 7.91 (lost), 8.26 (EMA100), 8.71 (EMA50), 8.94 (EMA20), 9.44 (Sep 30 close / Jul 2 high — the old ceiling pivot).',
    watch: '<b>7.72 and 7.91.</b> The Sep 10 low is 1.2% under the close and the last higher low of the structure the engine still draws: a close under it ends the "higher lows" frame on the engine’s own terms and puts the EMA200 (7.37) next, with 6.83–6.95 behind. Above, 7.91 has to be reclaimed on the close for the drift to stop; 8.26 (EMA100) and 8.71 (EMA50) are the bounce ceilings, and 9.44 remains the flip line. <b>Volume:</b> the Oct 26 bar is not in the engine yet; the Oct 23 drift printed $49M, 32% of average — four red closes with no flush is a drift, and a drift ends with either a flush (2× average) or a bounce on nothing. <b>RSI:</b> 28 through Oct 23 and lower after a −5% bar — a third sub-30 session; the bounce to 8.3–8.7 (EMA100 / EMA50) is still the setup, and still a sell. <b>PDUFA Jan 6, 2027:</b> 10 weeks out; the chart is pricing the run-up from lower.',
    decision: [
      'Holding: <b>the 8.44 stop printed on Oct 19 and the reduce zone was touched on Oct 20</b> (8.77, on the EMA50) — the next exit is the oversold bounce to 8.3–8.7 (EMA100 / EMA50). A core kept for the PDUFA is sized for 7.0.',
      'Not holding: <b>the zone of interest is here — 7.3–7.9</b> (EMA200 / Sep 10 low / the lost September retest) — but the entry is the reversal bar on volume above the 20-day average ($154M), not the fourth red close of a drift; or a close back above 9.44 on volume.',
      'Single trigger that flips the bias: <b>daily close &gt; 9.44</b> — back above the EMA20 and the old ceiling pivot; the Oct 16–26 drop becomes a shakeout.',
    ],
    invalidation: { level: 9.44, text: 'A daily close above 9.44 (Jul 2 high / Sep 30 close, the old triangle ceiling pivot; EMA20 8.94) puts price back above every near average and voids the bear read → next stop 10.0 and 10.51 (Oct 9 high).' },
    path: [
      { d: 30, h: '+1M', target: 7.4, how: 'EMA200 (7.37), rising toward 7.5 by then — 7.72 (the old +1M) is 1.2% away and written as reached; the oversold bounce to 8.3–8.7 comes first and is the sell.' },
      { d: 90, h: '+3M', target: 7.0, how: 'The higher-lows line (engine invalidation 6.95) and the Jul 29 floor (6.83) — the test of the 6-month structure, in the window that ends two weeks before the Jan 6 PDUFA, when the run-up trade would normally start.' },
      { d: 365, h: '+1Y', target: 10.5, how: 'Retest of the Oct 9 high from below. The PDUFA decides the direction, not the chart: a positive label with ANKTIVA still compounding puts 11.55–13.7 back on; a CRL puts 6 on. Size for a binary.' },
    ],
    levels: {
      resistance: [[7.91, 'September retest · 30-day low — lost Oct 26'], [8.26, 'EMA100 — lost Oct 23'], [8.71, 'EMA50 — rejected Oct 20–21 · bounce ceiling'], [8.94, 'EMA20'], [9.44, 'INVALIDATION · Jul 2 high / Sep 30 close'], [10.51, 'Oct 9 high · lower high'], [11.55, 'Feb 24 high']],
      support: [[7.81, 'Oct 26 close — today · low of the move'], [7.72, 'Sep 10 low · old +1M — 1.2% away, written as reached'], [7.37, 'EMA200 · +1M'], [6.95, 'Engine invalidation · higher-lows line · +3M'], [6.83, 'Floor · Jul 29'], [5.99, 'Engine measured move']],
    },
  },

  CAI: {
    updated: U, bias: 'BULL',
    read: 'The second close over the box top printed. Oct 26 closed 32.45 (+1.4%) — 0.10 over the Oct 21 close (32.35) and 0.18 over the Sep 24 high (32.27): the second close above the 24–32.3 box the last read asked for, a new 12-month closing high and the highest close in the series the engine holds. The volume condition (above the $110M 20-day average) cannot be checked yet — the Oct 26 bar is not in the engine (indicators through Oct 23: 7/7, STRONG BULL, RSI 56.6, MACD positive). EMAs rolled forward with the close: EMA20 30.48, EMA50 27.92, EMA200 23.85, all rising. The engine reads an uptrend with higher lows (14.55 → 15.38 → 24.03 → 27.1) and a BULL forecast (invalidation 22.4; path 39.3 / 47.2 / 58.9); it now returns 32.89 as the 52-week high (older reads carried 33.13), 1.4% over the close. Two closes over the ceiling in four sessions, with the give-back (Oct 22, 31.71) held above the EMA20, is a breakout on price; the Oct 26 volume (once the engine has it) and a hold of 32.27 on the first pullback are what make it one on the tape.',
    pattern: '<b>Uptrend — 27.1–32.35 box resolved up on the second close (Oct 21 test, Oct 22 give-back to 31.71, Oct 26 close 32.45).</b> Higher-lows trendline from 14.55 (May 15) and 15.38 (Jul 22) is far below (~16.5) — not actionable. The actionable frame is the broken box: 32.27–32.35 (Sep 24 high / Oct 21 close) is now the line under price, 30.5 (EMA20) and 30.56 (Oct 16 close) the first support under it, 27.1 (Oct 7 low, engine pivot) the floor, 24.03 (Sep 10) under it. Box height (5.25) from 32.35 projects 37.6. No ceiling line because every high since May took out the prior one; above 32.45 the only references are 32.89 (52-week high) and 39.3 (2-year high, the engine +1M).',
    watch: '<b>32.27 and 32.89.</b> The old box top is 0.18 under the close: the first pullback has to hold it on the close for the breakout to stand — a close back under 32.27 is a failed breakout (reduce, not exit; the bias runs on 27.1). Above, 32.89 (52-week high) is 1.4% away and the last reference under 37.6 (box measure) and 39.3 (2-year high). <b>Volume:</b> the Oct 26 bar is not in the engine yet; the Oct 21 test came on $77M (69% of average) — a second close on volume above $110M is the confirmation, a second one under it says the box top is being leaned on, not broken. <b>Q3 print (Nov):</b> the breakout came before it; 7/7 into the print is the strongest regime in the basket.',
    decision: [
      'Holding: <b>keep it while it closes above 27.1</b> (Oct 7 low, with the EMA50 at 27.92 just above it). The add on a hold of the EMA20 (30.5) stands; a close back under 32.27 is the reduce line for anything added over 32, not for the core.',
      'Not holding: <b>first tranche on the retest of 32.27–32.35 that holds on the close</b> (the old box top), or at 30.5 (EMA20) on a deeper pullback; not at 32.45 on the breakout day with the volume unknown.',
      'Single trigger that flips the bias: <b>daily close &lt; 27.1</b> — the Oct 7 pivot and the EMA50 go together and the box floor at 24 is next.',
    ],
    invalidation: { level: 27.1, text: 'A daily close below 27.1 (Oct 7 low, the last higher low; EMA50 27.92 right above it) breaks the near structure → next stop 24.03 (Sep 10 low) and 23.85 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 34, how: 'Through the 52-week high (32.89) once the breakout holds 32.27 on the first pullback; the round number is the first reference above the box.' },
      { d: 90, h: '+3M', target: 37.6, how: 'Box measure (5.25 from 32.35) on Q3 results (Nov) with adj-EBITDA still positive; the engine +1M is 39.3 (2-year high).' },
      { d: 365, h: '+1Y', target: 45, how: 'Requires Caris Detect (MCED) revenue to show up in guidance.' },
    ],
    levels: {
      resistance: [[32.89, '52-week high'], [34, '+1M target'], [37.6, 'Box measure · +3M'], [39.3, '2-year high · engine +1M'], [45, '+1Y target']],
      support: [[32.45, 'Oct 26 close — today · 12-month closing high'], [32.35, 'Oct 21 close · first close over the box'], [32.27, 'Sep 24 high · old box top — breakout line'], [30.56, 'Oct 16 close'], [30.48, 'EMA20'], [27.92, 'EMA50'], [27.1, 'INVALIDATION · Oct 7 low · box floor'], [24.03, 'Sep 10 low']],
    },
  },

  HIMS: {
    updated: U, bias: 'BULL',
    read: 'The second test of the floor printed, to the cent of the first. Oct 23 closed 27.71 (−4.9%) on $272M traded — 94% of the 20-day average — 0.27 above the 27.44 invalidation and 0.01 under the Oct 14 test (27.72). The margin is 0.98%: inside the near-miss rule, so the read is written as fired while the bias stays BULL by the rule until a close under 27.44. The engine is at 0/7, STRONG BEAR — every average above price: EMA20 28.95, EMA50 29.24, EMA100 29.34, EMA200 30.35; RSI 42.7, MACD negative. The symmetrical triangle reached its apex today (the engine dates it Oct 24) with price on the floor, not in the middle: the contraction is over and the first move out of it is down. The engine forecast is BEAR (invalidation 30.9, path 25 / 22.3 / 15.4). The box is still 27.44–30.92 and price closed in the bottom 8% of it, 11 sessions before the Q3 print.',
    pattern: '<b>Symmetrical triangle — upside break failed (Oct 9–13), floor tested Oct 14 (27.72), tested again Oct 23 (27.71), apex reached.</b> Ceiling 38.28 (Jul 6) → 30.43 (Sep 22), 3 touches; the horizontal 30.43–30.92 is what matters above. Floor 14.52 (Feb 27) → 27.44 (Sep 10), 3 touches — the rising line is gone, the horizontal floor is the whole pattern now. Two closes within 0.3 of the floor in seven sessions is a floor being leaned on, not defended: no bar between them reclaimed the EMA50. Height ~11 → measure 38–40 up / 15.4 down (engine), both far.',
    watch: '<b>27.44 and 28.95.</b> The floor is 1% under the close and has now been tested twice; a close under 27.44 resolves the contraction down and opens 25.0 (Jul 29 low) and 22.3 (May 18 low). Above, the EMA20 (28.95) is the first ceiling and the Oct 15 bounce (29.38) the second; 30.43–30.92 has to be reclaimed and held two sessions for the upside case to exist again. <b>Volume:</b> $272M on the second test, 94% of average — the first test bounced 6% the next day; a second test with no bounce bar yet is the weaker version. <b>Q3 earnings Nov 9:</b> 11 sessions away; the floor has to hold through them for the print to decide anything.',
    decision: [
      'Holding: <b>written as fired — the stop is 0.27 away and the floor has been hit twice.</b> A position that keeps the 27.44 rule sells the next bounce to 28.9–29.4 (EMA20 / EMA50) or the close under 27.44, whichever comes first; a core kept for the Nov 9 print accepts 25.0 as the next stop.',
      'Not holding: <b>wait</b>. 27.71 on the floor with the engine at 0/7 is not the second-test entry the last read named — that entry needs a reversal bar on volume above $289M (the 20-day average), or a close back above 30.9. Under 27.44 the next zone is 25.0.',
      'Single trigger that flips the bias: <b>daily close &lt; 27.44</b> — the floor goes and the triangle resolves down.',
    ],
    invalidation: { level: 27.44, text: 'A daily close below 27.44 (Sep 10 low, triangle floor; tested Oct 14 at 27.72 and Oct 23 at 27.71) resolves the contraction to the downside → next stop 25.0 (Jul 29 low) and 22.3 (May 18 low).' },
    path: [
      { d: 30, h: '+1M', target: 28.95, how: 'EMA20 — the bounce ceiling from the floor; 30.9 is off the table until the EMA50 (29.24) is reclaimed on a close.' },
      { d: 90, h: '+3M', target: 33.8, how: 'Aug 17 gap, only if 27.44 holds through the Nov 9 print and 30.4 is reclaimed on it; the 38.3 measure is not a 3-month call from the floor.' },
      { d: 365, h: '+1Y', target: 48, how: 'Half the way back to the 65.3 high. Requires the peptide channel (post-PCAC) to show in subscriber growth.' },
    ],
    levels: {
      resistance: [[28.95, 'EMA20 · +1M'], [29.24, 'EMA50'], [29.34, 'EMA100'], [29.38, 'Oct 15 close · bounce high'], [30.35, 'EMA200'], [30.43, 'Sep 22 high · triangle ceiling — reclaimed Oct 9, lost Oct 13'], [30.92, 'Oct 9 high'], [33.8, 'Aug 17 gap · +3M'], [38.28, 'Jul 6 high · triangle measure'], [48, '+1Y target']],
      support: [[27.71, 'Oct 23 close — today · second floor test (Oct 14: 27.72)'], [27.44, 'INVALIDATION · Sep 10 low'], [25.0, 'Jul 29 low'], [22.3, 'May 18 low'], [15.4, 'Engine measured move']],
    },
  },

  PBLS: {
    updated: U, bias: 'BEAR',
    read: 'The +1M printed and the trailing stop with it. Oct 23 closed 24.44 (−9.2%) on $44.5M traded — 150% of the 20-day average, the heaviest bar since the Oct 19 reversal — through 25.35 (the reversal close) and 25.01 (the post-IPO low, the +1M of the last pass and the trailing stop of the Oct 19 tranche) in one session, 1.69 above the 22.75 low of the move. Two red days have given back 67% of the three-day bounce (22.75 → 27.85). RSI 36.0; the MACD histogram is still the one check on — score 1/7, STRONG BEAR; price 14% under the EMA20 (28.29) and 22% under the EMA50 (31.35), both falling. −41% from 41.73 (Sep 18). The engine still returns no clean structure and a BEAR forecast (invalidation 30.6; path 22.8 / 20.5 / 17.4). The reversal bar did what reversal bars at a new low usually do — one bounce to the first ceiling — and the trend has the tape back.',
    pattern: '<b>Post-IPO range 25–42 — floor lost (Oct 16), reclaimed on a reversal bar (Oct 19), bounce to 27.85 (Oct 21), floor lost again (Oct 23).</b> No pivot trendlines; the engine returns no clean structure. 25.01 has now been closed through twice in six sessions — it is a line price trades across, not a floor; 22.75 (Oct 16) is the low of the move and the only horizontal reference under today. Above: 25.01–25.35 (the lost floor and the reversal close), 27.48 (Oct 9 low), 27.85 (Oct 21 close, the bounce high and the lower high of the range), 28.29 (EMA20). Below 22.75: 22, then 20.5 (engine measure) and 17.4 (engine +1Y).',
    watch: '<b>22.75 and 25.35.</b> The Oct 16 low is 7% under the close: a close under it is a new post-IPO low with the lockup seven weeks out and sends price to 20.5. Above, a close back over 25.35 (the reversal close) puts the two-day drop back inside the bounce; 27.85 is the lower high and the line where the bear read is voided. <b>Volume:</b> $44.5M on the break — 1.5× average, more than either reversal day ($54M and $40M were 1.85× and 1.35× of a lower average): the sellers came back with size. <b>Lockup:</b> IPO June → 180-day expiry mid-December is the supply event in sight; a new low into it is the base case.',
    decision: [
      'Holding: <b>the exit window (27.5–27.85) printed on Oct 21 and closed on Oct 22; the trailing stop (25.01) printed on Oct 23.</b> A position still in it has 22.75 as the last line; under it, the lockup is the next reference, not a level. Holding through December means holding through the lockup.',
      'Not holding: <b>the Oct 19 tranche is stopped at 25.01</b> (closed 24.44, −2% to +2% from the 24–25 entry) — the reversal trade is over. No entry on the way down: the next one is 20.5–22 (engine measure / the +3M) with a reversal bar on volume above $45M, or a close back over 27.85.',
      'Single trigger that flips the bias: <b>daily close &gt; 27.85</b> (Oct 21 close, the bounce high; EMA20 28.29 right over it) with volume.',
    ],
    invalidation: { level: 27.85, text: 'A daily close above 27.85 (Oct 21 close, the bounce high and the lower high of the range; EMA20 28.29 the first hurdle over it) reclaims the whole Oct 22–23 drop and voids the bias → next stop 28.95 (Oct 12 close) and 31.4 (EMA50).' },
    path: [
      { d: 30, h: '+1M', target: 22.75, how: 'Oct 16 low, retested from above after the floor (25.01) went a second time; the engine +1M is 22.8.' },
      { d: 90, h: '+3M', target: 20.5, how: 'Engine measured move and a new post-IPO low into the mid-December lockup expiry; a second close under 22.75 is the trigger.' },
      { d: 365, h: '+1Y', target: 25, how: 'Flat from here on a 12-month view: the lockup supply gets absorbed in H1 2027 and the first Helicon clinical data decides the direction.' },
    ],
    levels: {
      resistance: [[25.01, 'Post-IPO low — lost Oct 16, reclaimed Oct 19, lost Oct 23'], [25.35, 'Oct 19 close · reversal bar'], [27.48, 'Oct 9 low'], [27.85, 'INVALIDATION · Oct 21 close · bounce high'], [28.29, 'EMA20'], [28.95, 'Oct 12 close'], [31.35, 'EMA50']],
      support: [[24.44, 'Oct 23 close — today'], [22.75, 'Oct 16 close · low of the move · +1M'], [22, 'Round number'], [20.5, 'Engine measured move · +3M'], [17.4, 'Engine +1Y']],
    },
  },

  RXRX: {
    updated: U, bias: 'BEAR',
    read: 'The bounce went through the sell zone. Oct 26 closed 3.80 (+2.7%) — the fourth green close in five sessions — through 3.71 (EMA50) and 3.76 (EMA200), the lost cluster the last read named as the exit, in one bar; 0.01 under the EMA20 (3.81, rolled forward with the close) and 0.10 under 3.90, the flip line. EMAs today: EMA50 3.71, EMA100 3.61, EMA200 3.76 — price is above all three for the first time since Oct 15; the EMA20 is the only average left over it. The engine indicator set is through Oct 23 (RSI 34, score 1/7, STRONG BEAR; the Oct 26 bar is not in it yet) and the Oct 23 volume ($70M, 55% of average) is the last bar it has. +9.7% from the 3.465 low (Oct 16) in six sessions; 48% of the Oct 16 bar (4.16 → 3.465) retraced. The engine keeps its BULL structure off the 2.84–2.89 floor (invalidation 2.93; path 3.81 / 4.78 / 10.9) — the 6-month frame. The repair has run from the EMA100 to the EMA200 in four sessions on below-average volume; what is left is 0.10 and the EMA20.',
    pattern: '<b>Descending-triangle breakout — retest held once (Oct 14), failed (Oct 16), bounce back over the EMA50/EMA200 cluster (Oct 26).</b> Old ceiling 3.96 (Jul 6) → 3.63 (Sep 4), 3 touches, now ~3.40 — the first reference below 3.61 (EMA100). Floor 2.84 (Mar 30) → 2.89 (Jul 20), 3 touches, ~2.93 today. The measure (~4.75) was met Oct 5 and the September move was 85% retraced at the low. Above: 3.81 (EMA20), 3.90 (the flip line), 4.16 (Oct 15 close, the lower high), 4.36, 4.78. Below: 3.76–3.71 (the reclaimed cluster), 3.61 (EMA100), 3.465 (Oct 16 close).',
    watch: '<b>3.90 and 3.71.</b> The flip line is 2.6% up with the EMA20 (3.81) a cent over the close: a close over 3.90 puts price back above every average and the lower high (4.16) is next. Below, 3.71 (EMA50) is the line the bounce has to hold on the first red close for the repair to stand; a close back under it says Oct 26 was the sell the read was written for and 3.40 (old ceiling) is next. <b>Volume:</b> the Oct 26 bar is not in the engine yet; the bounce so far has run on 50–82% of average — a reclaim of 3.90 without an above-average bar is a bounce, not a reversal. <b>Q3 print (Nov):</b> the opex cut has to show; the chart is repairing ahead of it this time.',
    decision: [
      'Holding: <b>the exit at 3.71–3.76 printed on Oct 26</b> — the tranche stopped on Oct 16 had its bounce to sell into. A core kept for the readouts holds while it closes above 3.40 (old ceiling) and sizes for 3.16.',
      'Not holding: <b>wait for the close &gt; 3.90 on volume above the 20-day average ($128M)</b>, or the retest of 3.40 with a reversal bar; 3.80 on the sixth day of a below-average bounce is neither.',
      'Single trigger that flips the bias: <b>daily close &gt; 3.90</b> — above the EMA20 (3.81) and every other average; the Oct 16 bar becomes a shakeout.',
    ],
    invalidation: { level: 3.9, text: 'A daily close above 3.90 (the flip line set on the EMA20, now 3.81 — the last average over price) puts price back above every moving average and voids the bear read → next stop 4.16 (Oct 15 close, the lower high) and 4.36.' },
    path: [
      { d: 30, h: '+1M', target: 3.4, how: 'Old triangle ceiling, the breakout origin — retested from above after the bounce fails at the EMA20 / 3.90; the bounce to 3.71–3.76 printed on Oct 26 and was the sell.' },
      { d: 90, h: '+3M', target: 3.16, how: 'Sep 10 low, the last higher low of the 6-month structure; the Q3 print (Nov) lands in this window.' },
      { d: 365, h: '+1Y', target: 4.4, how: 'Retest of the Oct 9 close from below — needs a clinical readout from the AI-designed pipeline; the 7.2 of the older passes is off the table until 3.90 is reclaimed.' },
    ],
    levels: {
      resistance: [[3.81, 'EMA20 · last average over price'], [3.9, 'INVALIDATION · flip line'], [4.16, 'Oct 15 close · lower high'], [4.36, 'Oct 9 close'], [4.78, 'Oct 5 high · triangle measure']],
      support: [[3.8, 'Oct 26 close — today · bounce high'], [3.76, 'EMA200 — reclaimed Oct 26'], [3.71, 'EMA50 — reclaimed Oct 26 · first line of the repair'], [3.61, 'EMA100'], [3.465, 'Oct 16 close · low of the move'], [3.4, 'Old triangle ceiling · +1M'], [3.16, 'Sep 10 low · +3M'], [2.93, 'Triangle floor · engine invalidation']],
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
    updated: U, bias: 'BEAR',
    read: 'The third leg was a spike. Oct 26 closed 2.44 (−24.7%) — through 2.95 (the old +1M), 2.71 (the breakout line) and 2.60 (the invalidation, the Oct 22 pullback low) in one bar, 0.16 (6.2%) under 2.60: a real margin, not a near-miss. The Oct 23 bar (+24.6% to 3.24 on $44M) is fully given back and then some — 2.44 is under the Oct 22 close (2.60) and the Oct 19 close (2.63); the highest close since the spring lasted one session. By the rule the bias flips to BEAR. The engine indicator set is through Oct 23 (RSI 74.2, score 6/7, STRONG BULL; the Oct 26 bar is not in it yet); the EMAs rolled forward with the close put the EMA20 at 2.17, the EMA50 at 1.75, the EMA100 at 1.72 and the EMA200 at 1.80, so price is still 12% over the EMA20 and above every average: the trend is intact, the third leg is not. QSI printed +4.3% the same session — the pair decoupled again, this time with NAUT the one giving back. From the 0.95 low (Sep 25) the stock is still +157% in 21 sessions; from 3.24 it is −25% in one. The frame is back to the box (2.05–2.25) under price and the failed breakout (2.71 / 3.24) over it.',
    pattern: '<b>Vertical breakout out of a 5-month triangle — box (2.05–2.25), second leg to 2.71, give-back to 2.60, spike to 3.24 (Oct 23), full reversal to 2.44 (Oct 26) under the breakout line.</b> Ceiling 3.95 (Mar 24) → 1.12 (Sep 9), 4 touches, broken Sep 29 (1.365). Floor 0.852 → 0.891 held. The triangle projection (~3.4) was not reached; 3.24 is the spike high, under both sell-side targets (Roth 3.50, Leerink 4). 2.68–2.71 (the Jul high / Oct 21 close) is now resistance — the breakout line lost on the close; 2.60 (Oct 22 close) the lost invalidation under it. Below 2.44: 2.25 (box top, Oct 9 close), 2.17 (EMA20), 2.05 (box floor, Oct 13 close), 1.80 (EMA200), 1.75 (EMA50).',
    watch: '<b>2.25 and 2.71.</b> The box top is 8% under the close and the first structural level: a hold of 2.25 on the close keeps the October structure (two legs out of the triangle) intact with the spike removed; a close under it opens the EMA20 (2.17) and the box floor (2.05). Above, 2.71 is the breakout line: a close back over it says Oct 26 was a shakeout inside the breakout and the bear read is void. <b>Volume:</b> the Oct 26 bar is not in the engine yet; the Oct 23 spike came on $44M (1.8× the 20-day average) — a −25% reversal on more than that is distribution, on less it is the spike buyers leaving. <b>RSI:</b> 74 through Oct 23; a −25% bar takes it out of overbought in one session. <b>The raise:</b> guided before mid-2027 — a one-session round trip of 3.24 → 2.44 on $129M of cash is the kind of tape a raise gets done into, and the overhang is now priced from lower.',
    decision: [
      'Holding: <b>the 2.60 stop fired on Oct 26</b> — the core trailing 2.60 is out on the rule, at a close 6% under it. What stays is the experimental position (avg ~0.91, still 2.7×), sized for 2.05 (box floor); nothing is added under 2.71.',
      'Not holding: <b>wait for the retest of 2.05–2.25</b> (the box) on falling volume with a reversal bar, or a close back over 2.71 on volume above the 20-day average ($24.7M); 2.44 the day after a −25% bar is neither.',
      'Single trigger that flips the bias: <b>daily close &gt; 2.71</b> — back over the breakout line; the Oct 26 bar becomes a shakeout and 3.24 is the next reference.',
    ],
    invalidation: { level: 2.71, text: 'A daily close above 2.71 (Oct 21 close, the breakout line over the Jul high at 2.68; the lost 2.60 invalidation is the first step) puts price back inside the breakout and voids the bear read → next stop 2.95 and 3.24 (Oct 23 close, the spike high).' },
    path: [
      { d: 30, h: '+1M', target: 2.25, how: 'Box top (Oct 9 close), retested from above — the first structural level under the spike; the EMA20 (2.17) is just under it.' },
      { d: 90, h: '+3M', target: 2.05, how: 'Box floor (Oct 13 close) — the test of the whole October structure in the window the raise is most likely to land; under it, 1.80 (EMA200) is the trend floor.' },
      { d: 365, h: '+1Y', target: 3.24, how: 'Retest of the Oct 23 spike high from below — needs the raise priced and the proteoform assay cadence (~20 by mid-2028) showing; 3.95–4.3 are off the table until 2.71 is reclaimed.' },
    ],
    levels: {
      resistance: [[2.6, 'Oct 22 close · lost invalidation'], [2.68, 'Jul high'], [2.71, 'INVALIDATION · Oct 21 close · breakout line'], [2.95, 'Old +1M — printed Oct 23'], [3.24, 'Oct 23 close · spike high · +1Y'], [3.4, 'Triangle projection'], [3.5, 'Roth target'], [3.95, 'Mar 24 high · triangle top'], [4.0, 'Leerink target']],
      support: [[2.44, 'Oct 26 close — today'], [2.25, 'Oct 9 close · box top · +1M'], [2.17, 'EMA20'], [2.05, 'Oct 13 close · box floor · +3M'], [1.8, 'EMA200'], [1.75, 'EMA50']],
    },
  },

  QSI: {
    updated: U, bias: 'BULL',
    read: 'The bear invalidation fired, with room to spare. Oct 23 closed 1.40 (+21.7%) on $16.0M traded — 99% of the 20-day average and 2.9× the 90-day — through 1.23 (the failed-reclaim line), 1.28 (Oct 5/7 closes) and 1.36 (Oct 12 close) in one bar, the biggest green day since the Oct 9 record bar and the highest close since Oct 13. By the rule the bias flips to BULL: the volume condition (above the 20-day average) was missed by 1% and the price condition was cleared by 14%, and 1.22 — the higher low lost on Oct 16 — is reclaimed with 0.18 to spare. Score 6/7, STRONG BULL: above every EMA (EMA20 1.19, EMA50 1.05, EMA200 1.02, rising); RSI 54; the MACD histogram is the one check still negative, rising. The engine keeps a BULL forecast off the 0.70–0.72 floor (invalidation 0.98; path 1.55 / 1.86 / 2.6). NAUT printed +24.6% the same session — the pair that decoupled on Oct 16 moved together again. The Oct 16–22 drop reads as the shakeout the flip line was written for; what is left above is 1.53 (Oct 9 close) and 1.55 (Oct 2 high), the top of the second leg.',
    pattern: '<b>Bear-triangle failure → breakout → higher low (1.22) lost Oct 16, reclaimed Oct 23 on a +22% bar.</b> Floor 0.70–0.72 (Jul 29, Aug 18, Sep 15) held; ceiling 1.28 → 0.85 broke Sep 29; measure (~1.30) met Oct 1. The Oct 9 record bar (1.53 on $63M) is the top of the second leg; 1.09 (Oct 19) is the low of the retrace (−30% from 1.55) and the new higher low of the structure. Between 1.40 and 1.55 there is one reference: 1.53 (Oct 9 close). Below: 1.36 (Oct 12 close), 1.28, 1.22–1.23 (the reclaimed line), 1.19 (EMA20), 1.07 (Sep 30 gap), 1.02–1.05 (EMA200 / EMA50).',
    watch: '<b>1.53 and 1.22.</b> A close above 1.53 (Oct 9 close) on volume above the 20-day average ($16M) takes out the record bar and makes 1.55 the last line before the +3M; a stall under it with RSI in the 50s is the retest setup. Below, 1.22 is the reclaimed higher low — a close back under it on the next pullback says the +22% bar was a one-day event and the bear read returns at 1.23. <b>Volume:</b> $16.0M on the reclaim — 1% short of the 20-day average, 2.9× the 90-day: enough to count, not the $63M of the Oct 9 bar. <b>Q3 print Nov 5:</b> 8 sessions away; the chart reclaimed its structure before it, not after. <b>Nasdaq $1 compliance:</b> off the radar above 1.22.',
    decision: [
      'Holding: <b>keep the core while it closes above 1.22</b> (the reclaimed higher low; EMA20 1.19 under it). The trading tranche had its exit at 1.23 on Oct 21 and is not re-entered at 1.40 after a +22% bar; shares plus 2027 calls are the sensor leg of the chain and the thesis is untouched.',
      'Not holding: <b>wait for the retest of 1.22–1.28</b> (the reclaimed line / Oct 5–7 closes) on falling volume, or a close above 1.53 on volume above $16M; 1.40 on the day of the flip is neither.',
      'Single trigger that flips the bias: <b>daily close &lt; 1.22</b> — the reclaimed higher low goes again and the Oct 23 bar becomes a failed reclaim at 1.40.',
    ],
    invalidation: { level: 1.22, text: 'A daily close below 1.22 (Oct 6/8 lows, the higher low lost Oct 16 and reclaimed Oct 23; EMA20 1.19 right under it) voids the reclaim → next stop 1.09 (Oct 19 low) and 1.02–1.05 (EMA200 / EMA50).' },
    path: [
      { d: 30, h: '+1M', target: 1.55, how: 'Oct 2 high, the top of the second leg, through 1.53 (Oct 9 close); the Nov 5 print lands inside the window.' },
      { d: 90, h: '+3M', target: 1.86, how: 'Engine +3M — the triangle measure (~1.30) projected again from the 1.22 reclaim; needs Proteus on the Q2 2027 schedule at the Nov 5 print.' },
      { d: 365, h: '+1Y', target: 2.6, how: 'The 12-month high (2.63, Nov 2025) and the engine +1Y — requires the Proteus launch on time and no financing off the $300M shelf hitting the chart; 3.1 comes back on the table above 1.55.' },
    ],
    levels: {
      resistance: [[1.53, 'Oct 9 close · record bar'], [1.55, 'Oct 2 high · +1M'], [1.86, 'Engine +3M'], [2.6, '12-month high (2.63, Nov 2025) · +1Y']],
      support: [[1.4, 'Oct 23 close — today'], [1.36, 'Oct 12 close'], [1.28, 'Oct 5/7 closes'], [1.22, 'INVALIDATION · reclaimed higher low'], [1.19, 'EMA20'], [1.09, 'Oct 19 close · low of the retrace'], [1.07, 'Sep 30 close · EMA200 reclaim'], [1.05, 'EMA50 / EMA200 cluster'], [0.72, 'Triangle floor, 3 touches · engine invalidation 0.98']],
    },
  },

  INKT: {
    updated: U, bias: 'BEAR',
    read: 'The bounce reached the sell zone. Oct 23 closed 10.71 (+6.5%) on $315K traded — 134% of the 20-day average, the first above-average bar of the bounce — 0.01 inside the 10.7–10.85 zone the last read named as the place to reduce, 0.01 under the Oct 9 close (10.72) and 0.04 under the EMA20 (10.75). +13.8% from the 9.41 low (Oct 16) in five sessions; 39% of the Oct 1–16 drop retraced. RSI 36.3, from 18 at the low; MACD histogram rising. Score 0/7, STRONG BEAR, unchanged: the EMA20 is the first average above price and the EMA50/100/200 are bunched at 11.17–11.42, all falling. The engine forecast is BEAR (invalidation 12.7; path 10.2 / 9.41 / 7.7). Market cap is ~$54M against $8.8M of cash. The bounce has done the normal thing; the next session decides whether 10.72–10.85 holds it.',
    pattern: '<b>Symmetrical triangle — resolved down (Oct 6–9), 90-day low lost (Oct 13), new low 9.41 (Oct 16), bounce to the EMA20 (Oct 23).</b> Ceiling 14.21 (Apr 17) → 12.73 (Oct 1), today ~12.5. Floor 8.56 (Mar 24) → 10.95 (Sep 1), 3 touches, today ~11.7 — price is 9% below it. Height ~5.3; the measure from the break at 11.5 is ~8.5, which coincides with the 52-week low (8.48). Between 9.41 and 8.5 there is no horizontal reference; between 10.71 and 11.17 (EMA50) there is one: 10.85, the top of the sell zone.',
    watch: '<b>10.85 and 9.41.</b> The top of the sell zone is 1% up: a close over 10.85 on volume above the 20-day average says the bounce has a second leg to 11.2–11.4 (the EMA cluster), where the bear read is tested; a red close from here with the EMA20 untouched is the rejection the read is written for and sends price back to 9.41. A close under 9.41 resumes the drift toward 8.5. <b>Reversal needs</b> a close back above 11.4 and then 12.2 (Aug 21 high). <b>Volume:</b> $315K on the fifth day of the bounce, 1.3× average — the first bar of the bounce with size, and it came at the sell zone, not at the low. <b>Cash $8.8M:</b> a raise is the overhang and 10.7 is a better price to do it at than 9.4; the ARDS Ph2 readout is the only thing that changes this chart.',
    decision: [
      'Holding: <b>reduce here — the bounce to 10.7–10.85 printed on Oct 23</b>; keep only what is sized for 8.5 unless the EMA cluster (11.2–11.4) is reclaimed and held.',
      'Not holding: <b>wait</b>. The zone of interest is 8.5–9.5, with the raise terms known; 10.71 on the EMA20 with the engine at 0/7 is the bounce, not the base.',
      'Single trigger that flips the bias: <b>daily close &gt; 12.2</b> (Aug 21 high, back inside the upper triangle) with volume.',
    ],
    invalidation: { level: 12.2, text: 'A daily close above 12.2 (Aug 21 high) puts price back in the upper half of the triangle and voids the breakdown → next stop 12.73 (Oct 1 high) and 14.2.' },
    path: [
      { d: 30, h: '+1M', target: 9.4, how: 'Retest of the Oct 16 low (9.41) after the bounce fades at 10.7–10.85 — the sell zone printed on Oct 23; the engine +1M is 10.2.' },
      { d: 90, h: '+3M', target: 8.6, how: 'Triangle measure and the Mar 24 / 52-week low. The raise lands in this window.' },
      { d: 365, h: '+1Y', target: 10, how: 'Flat-to-down on a 12-month view until the ARDS Ph2 reads out; the option is the readout, not the chart.' },
    ],
    levels: {
      resistance: [[10.72, 'Oct 9 close · sell zone'], [10.75, 'EMA20 · bounce ceiling'], [10.85, 'Top of the sell zone'], [11.17, 'EMA50'], [11.42, 'EMA100/200 — first reclaim'], [12.2, 'INVALIDATION · Aug 21 high'], [12.73, 'Oct 1 high']],
      support: [[10.71, 'Oct 23 close — today · bounce high'], [10.06, 'Oct 22 close'], [9.86, 'Oct 20 close'], [9.41, 'Oct 16 close · 90-day low · +1M'], [8.56, 'Mar 24 low · triangle origin · +3M'], [8.48, '52-week low']],
    },
  },

};
