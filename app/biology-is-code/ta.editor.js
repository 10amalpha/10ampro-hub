// Editor TA per ticker. Same shape as TOKEN.ta in the Solana hub configs:
// { updated, bias: 'BULL'|'BEAR', read, pattern, watch, decision: [], invalidation: { level, text }, path: [{ d, h, target, how }], levels: { resistance: [[px, why]], support: [[px, why]] } }
// A ticker without an entry falls back to the live auto-forecast (lib/thesis/ta.js).
// Review pass data: /api/equity/{SYM}?summary=1 — basis for this pass: daily closes through 20 Oct 2026 (Tuesday; marketTime 20:00 UTC = completed close). Previous pass: 19 Oct 2026. Daily refresh: only reads with a material change are rewritten (20 Oct: TEM, IBRX, PBLS, INKT; 19 Oct: TEM, IBRX, PBLS, RXRX, NGEN, NAUT, QSI; 15 Oct: HIMS, PBLS, RXRX, NGEN; 13 Oct: HIMS, PBLS, RXRX, INKT; 12 Oct: TEM, PBLS, NGEN, QSI). Note: the API's volume fields are dollar volume (shares × price) — quote them as $ traded, not shares.
const U = '20 Oct 2026';

export const EDITOR_TA = {
  TEM: {
    updated: U, bias: 'BEAR',
    read: 'The oversold bounce came on schedule and stopped where it should. Oct 20 closed 66.75 (+3.7%) on $331M traded — 64% of the 20-day average, less than either red session of the break — and 0.95 under the EMA50 (67.7), the first level of the "sell the bounce to 67–68" of the last pass. RSI 28 → 32.7, back over 30 after one session under it; MACD histogram shrinking for the first time since Oct 12. Score 3/7, regime BEAR, unchanged: price under the EMA20 (70.5) and the EMA50; the EMA200 (60.9) rising, the 50/200 order intact. The two closes under the EMA50 (64.72, 64.34) stand as the low of the move; the engine still carries a BULL forecast off the 58.74 pivot (invalidation 58.7). Nothing in the bar changes the bear read: a +3.7% day on falling volume into the lost EMA50 is the rebound the read priced, not a reclaim. 71.2 remains the line.',
    pattern: '<b>Uptrend broken — trendline lost Oct 12, EMA50 lost Oct 16, first bounce into it Oct 20.</b> Support 41.55 (Jul 29) → 58.74 (Sep 10), 3 touches; the engine still projects the line (~75 today) and it is irrelevant above price. No ceiling line: 85.08 (Sep 28) is the leg high and now the top of a 58.74–85.08 range. The Sep 15–17 gap (68.6–72.7) was filled Oct 6 and failed as support Oct 16; the Jul–Aug shelf (64) held on the first test (64.34). Engine measured move down: 37.4 — the long-range risk if 58.74 goes.',
    watch: '<b>67.8 and 64.3.</b> The EMA50 (67.7) is the bounce ceiling and the sell: a close above it, then 71.2 (Oct 15 close, EMA20 70.5) is the repair sequence, and nothing under 67.8 is a repair. Below, 64.34 (Oct 19 close) is the low of the move; a close under it opens 63.1 (EMA100), 61.6 (Jul 1 high) and 58.74 (Sep 10 low, the engine invalidation of the July structure). <b>Volume:</b> $331M on the bounce day — 64% of average, lighter than the break: bought by nobody in particular. <b>RSI 32.7:</b> back over 30; the bounce has room to 67–68 and no more without volume. <b>Q3 print (Nov):</b> the chart will most likely sit in the 58.7–68 band until it.',
    decision: [
      'Holding: <b>the 67.8 stop printed on Oct 16</b>; the bounce the read asked for is here — 66.75 is 1.4% under the EMA50 and 67–68 is the exit for a position that stayed through the break. A core kept for the Nov print accepts 58.7 as the next stop.',
      'Not holding: <b>do not buy the bounce.</b> The zone of interest is 58.7–61 (Sep 10 low / Jul 1 high / EMA200) with a reversal bar, or a close back above 71.2 on volume above the 20-day average.',
      'Single trigger that flips the bias: <b>daily close &gt; 71.2</b> — the Oct 15 close, above the EMA20 and back inside the trendline band.',
    ],
    invalidation: { level: 71.2, text: 'A daily close above 71.2 (Oct 15 close, the failed reclaim, with the EMA20 at 70.5 just under it) puts price back above the EMA50 and inside the old trendline band and voids the bear read → next stop 73–75 and 80.4.' },
    path: [
      { d: 30, h: '+1M', target: 60.8, how: 'EMA200, between the Jul 1 high (61.6) and the Sep 10 low (58.74); the bounce to 67–68 comes first and is the sell, then the drift at half volume gets there without a flush.' },
      { d: 90, h: '+3M', target: 58.7, how: 'Sep 10 low and the engine invalidation of the July structure; the Q3 print (Nov) decides whether it holds. Under it, the measured move (37) is the risk.' },
      { d: 365, h: '+1Y', target: 80, how: 'Retest of the Sep 17 high (old flag top) from below — a correction inside the 2026 uptrend, not a top, if the EMA200 holds and the GAAP profit repeats. 103 is off the table until 71.2 is reclaimed.' },
    ],
    levels: {
      resistance: [[67.7, 'EMA50 — lost Oct 16 · bounce ceiling'], [70.5, 'EMA20'], [71.2, 'INVALIDATION · Oct 15 close'], [80.36, 'Sep 17 high · old flag top'], [85.08, 'Sep 28 high · leg high']],
      support: [[66.75, 'Oct 20 close — today'], [64.34, 'Oct 19 close · low of the move'], [63.1, 'EMA100'], [61.6, 'Jul 1 high'], [60.9, 'EMA200 · +1M'], [58.74, 'Sep 10 low · engine invalidation · +3M'], [37.4, 'Engine measured move']],
    },
  },

  IBRX: {
    updated: U, bias: 'BEAR',
    read: 'The first bounce arrived at the EMA50 to the cent. Oct 20 closed 8.77 (+4.2%) on $123M traded — 80% of the 20-day average — 0.02 under the EMA50 (8.79): the bottom of the 8.8–9.35 reduce zone of the last pass, reached in one session. The bias stays BEAR on the rule — 9.44 is the flip line and price is 7% under it; the Oct 19 close (8.42) under the 8.44 retest low stands as the low of the move. Score 3/7, regime BEAR, unchanged: price under the EMA20 (9.30) and, by a cent, the EMA50; MACD negative and still falling; RSI 44 — the bounce started from mid-range, which is why it has no oversold fuel. The engine re-drew again: the descending triangle of Oct 19 is gone and the structure is back to "uptrend, higher lows" off the 6.66–6.83 floor with a BULL forecast and invalidation 6.95 — the 6-month frame; the engine flips with every pivot the day prints and the editor does not follow it. The 20-day volume ($153M) is 1.55× the 90-day.',
    pattern: '<b>Breakout follow-through undone — retest low (8.44) lost Oct 19, EMA50 retested from below Oct 20.</b> The Sep 22 breakout (9.29) and the Sep 23–25 retest held for three weeks; the Oct 9 high (10.51) is a lower high against 11.55 (Feb 24) and the two red sessions took price back to where the breakout was retested. Below 8.42: 7.72 (Sep 10 low), then the EMA200 (7.32) and the higher-lows floor (6.83, Jul 29; engine line 6.95). Above: 8.79 (EMA50, closed on it), 9.30 (EMA20), 9.44 (Sep 30 close / Jul 2 high — the old ceiling pivot).',
    watch: '<b>8.8 and 9.44.</b> The EMA50 (8.79) is the first hurdle and price closed on it; a close above it opens 9.30 (EMA20) and 9.44 — the old triangle ceiling pivot, the Sep 30 close and the flip line in one number. A close back under 8.42 (Oct 19) cancels the bounce and puts 7.72 (Sep 10 low, the last higher low) and the EMA200 (7.32) back in play, with the engine measure (5.99) on the table. <b>Volume:</b> $123M on the bounce day at 80% of average, against $164M on the break — the sellers of Oct 19 have not been outbid. <b>PDUFA Jan 6, 2027:</b> 11 weeks out; the chart stopped pricing it early and the sizing question still comes from the other side.',
    decision: [
      'Holding: <b>the 8.44 stop printed on Oct 19</b>; the bounce reached the reduce zone (8.8–9.35) on Oct 20 — reduce here, not at 8.4. A core kept for the PDUFA is sized for 7.3.',
      'Not holding: <b>wait</b>. The zone of interest is 7.3–7.7 (EMA200 / Sep 10 low) with a reversal bar, or a close back above 9.44 on volume — 8.77 on the EMA50 after one green day is neither.',
      'Single trigger that flips the bias: <b>daily close &gt; 9.44</b> — back above the EMA20 and the old ceiling pivot; the Oct 16–19 drop becomes a shakeout.',
    ],
    invalidation: { level: 9.44, text: 'A daily close above 9.44 (Jul 2 high / Sep 30 close, the old triangle ceiling pivot; EMA20 9.30) puts price back above both near EMAs and voids the bear read → next stop 10.0 and 10.51 (Oct 9 high).' },
    path: [
      { d: 30, h: '+1M', target: 7.72, how: 'Sep 10 low, the last higher low; the engine +1M of the last pass. The bounce to 8.8–9.3 came on Oct 20 and is the sell.' },
      { d: 90, h: '+3M', target: 7.3, how: 'EMA200, rising toward 7.5 by then — the window ends two weeks before the Jan 6 PDUFA, when the run-up trade would normally start.' },
      { d: 365, h: '+1Y', target: 10.5, how: 'Retest of the Oct 9 high from below. The PDUFA decides the direction, not the chart: a positive label with ANKTIVA still compounding puts 11.55–13.7 back on; a CRL puts 6 on. Size for a binary.' },
    ],
    levels: {
      resistance: [[8.79, 'EMA50 — retested from below Oct 20'], [9.3, 'EMA20'], [9.44, 'INVALIDATION · Jul 2 high / Sep 30 close'], [10.51, 'Oct 9 high · lower high'], [11.55, 'Feb 24 high']],
      support: [[8.77, 'Oct 20 close — today · on the EMA50'], [8.42, 'Oct 19 close · low of the move'], [7.72, 'Sep 10 low · +1M'], [7.32, 'EMA200 · +3M'], [6.95, 'Engine invalidation · higher-lows line'], [6.83, 'Floor · Jul 29'], [5.99, 'Engine measured move']],
    },
  },

  CAI: {
    updated: U, bias: 'BULL',
    read: 'Five of seven. The run from 24 (Sep 10) to 32.27 (Sep 24) reversed hard on Oct 1 (30.63 → 28.35) and again Oct 6 (30.39 → 27.45), then recovered +8% on Oct 9 to 29.70 — a volatile two weeks that netted out flat. Price sits a hair above EMA20 (28.70) and above EMA50 (26.10) and EMA200 (23.0, rising). RSI 46, MACD turned down. The structure is still an uptrend with higher lows (14.55 → 15.38 → 24.03), but the 30-day range 24–32 is now a box until one side gives.',
    pattern: '<b>Uptrend in a 24–32.3 box.</b> Higher-lows trendline from 14.55 (May 15) and 15.38 (Jul 22) is far below (~16.3) — not actionable. The actionable frame is the box: 32.27 (Sep 24) is the ceiling, 27.1 (Oct 7) and 24.03 (Sep 10) the floors. No ceiling line because every high since May took out the prior one.',
    watch: '<b>27.1 and 32.3.</b> The Oct 7 low is the near floor; losing it on volume sends it to the 26.1 EMA50 and then 24. A close above 32.3 resumes the uptrend toward 33.65 (52-week high). <b>Volume:</b> 20d at 156% of 90d, split between the up days and the Oct 1 / Oct 6 drops — no edge either way yet.',
    decision: [
      'Holding: <b>keep it while it closes above 26.1</b> (EMA50). Add on a hold of 27–28 with volume, not at 32.',
      'Not holding: <b>first tranche at 27–28</b>; second on a close &gt; 32.3.',
      'Single trigger that flips the bias: <b>daily close &lt; 26.1</b> — the EMA50 goes and the box floor at 24 is next.',
    ],
    invalidation: { level: 26.1, text: 'A daily close below 26.1 (EMA50) breaks the near structure → next stop 24.03 (Sep 10 low) and 23.0 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 32.3, how: 'Back to the Sep 24 high; the box resolves up if 27 holds.' },
      { d: 90, h: '+3M', target: 36, how: 'Break of 33.65 (52-week high) on Q3 results (Nov) with adj-EBITDA still positive.' },
      { d: 365, h: '+1Y', target: 45, how: 'Requires Caris Detect (MCED) revenue to show up in guidance.' },
    ],
    levels: {
      resistance: [[32.27, 'Sep 24 high · box top'], [33.65, '52-week high'], [36, '+3M target'], [45, '+1Y target']],
      support: [[28.7, 'EMA20'], [27.1, 'Oct 7 low · near floor'], [26.1, 'INVALIDATION · EMA50'], [24.03, 'Sep 10 low · box floor']],
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
    read: 'The reversal bar got its follow-through. Oct 20 closed 27.08 (+6.8%) on $40M traded — 1.35× the 20-day average, the second above-average green session in a row — and the two-day bounce from 22.75 is +19%, back to 0.40 under the Oct 9 low (27.48), the first ceiling the last pass named and the +1M target. RSI 29 → 34.5, over 30 for the first time since Oct 1; MACD histogram rising a second session. Score 0/7, STRONG BEAR, unchanged: price 7% under the EMA20 (29.0) and 15% under the EMA50 (32.0), both falling; the drawdown from 41.73 is −35%. The engine still returns no clean structure and a BEAR forecast (invalidation 33.8). Two sessions do not change the trend, they price the bounce: 27.5–28.6 is where it meets the first sellers, and that is the exit window the Oct 15 read asked for, open now.',
    pattern: '<b>Post-IPO range 25–42 — floor lost on a close (Oct 16), reclaimed on a reversal bar (Oct 19), bounce extended (Oct 20).</b> No pivot trendlines yet; the engine returns no clean structure. 25.01 is a line price trades on both sides of: a lost floor reclaimed in one session on 2× volume and followed through is a short-term bottom until 22.75 goes. Above: 27.48 (Oct 9 low) and 28.6 (78.6%) are the shelves in play, 28.95 (Oct 12 close) the last close above them, 29.0 (EMA20) the bounce ceiling. Below 22.75: nothing before 22 and then 20.5 (engine measure).',
    watch: '<b>27.5 and 22.75.</b> The Oct 9 low is 1.5% above the close and the +1M target; a close above it on this volume opens 28.6 and 29.0 (EMA20), where the bear read is voided. A close back under 25.01 says the bounce is over; a second close under 22.75 cancels the reversal and opens 22 and 20.5. <b>Reversal needs</b> 28.6 reclaimed and held two closes, then 29.0 on volume above the 20-day average — until then the bias is bear and the bounce is a trade. <b>Volume:</b> $54M then $40M on the two green days against a 20-day average of $30M — the first two-day buying sequence of the decline. <b>Lockup:</b> IPO was June → 180-day expiry mid-December is the supply event in sight; the bounce does not change the calendar.',
    decision: [
      'Holding: <b>the exit window is open</b> — 27.5–28.6 is where a position that stayed through the break comes off, and the close is 0.40 under the bottom of it. Holding through December means holding through the lockup.',
      'Not holding: <b>the first tranche triggered on Oct 19</b> (reversal bar at 24–25 on 1.85× volume) and is +7%: stop 22.75, trail to 25.01 on a close above 27.48; no second tranche until 28.6 holds two closes. If missed, the next entry is 22–23 into the lockup, or a retest of 25 on falling volume.',
      'Single trigger that flips the bias: <b>daily close &gt; 29.0</b> (EMA20) with volume.',
    ],
    invalidation: { level: 29.0, text: 'A daily close above 29.0 (EMA20; 28.6 and 28.95 are the hurdles under it) reclaims the middle of the range and voids the bias → next stop 32.0 (EMA50) and 36.' },
    path: [
      { d: 30, h: '+1M', target: 27.5, how: 'Oct 9 low from below — 1.5% away after two green days; the normal extent of a bounce from a 2× volume reversal bar at a new low, and a sell, not a level to hold for.' },
      { d: 90, h: '+3M', target: 22, how: 'New post-IPO low into the mid-December lockup expiry; a second close under 22.75 is the trigger.' },
      { d: 365, h: '+1Y', target: 25, how: 'Flat from here on a 12-month view: the lockup supply gets absorbed in H1 2027 and the first Helicon clinical data decides the direction.' },
    ],
    levels: {
      resistance: [[27.48, 'Oct 9 low · bounce ceiling · +1M'], [28.59, '78.6% of the range'], [28.95, 'Oct 12 close'], [29.0, 'INVALIDATION · EMA20'], [32.0, 'EMA50']],
      support: [[27.08, 'Oct 20 close — today'], [25.35, 'Oct 19 close · reversal bar'], [25.01, 'Post-IPO low — lost Oct 16, reclaimed Oct 19'], [22.75, 'Oct 16 close · low of the move'], [22, '+3M target'], [20.5, 'Engine measured move']],
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
    read: 'The second close under 1.565 printed. Oct 16 held at 1.59 (−1.9%), Oct 19 closed 1.54 (−3.1%) — a new 52-week closing low, under the Oct 14 close (1.565) that was the watch, with 1.53 the intraday low. Zero of seven, STRONG BEAR; RSI 19, under 30 for six sessions. EMA20 1.76, EMA50 1.90, EMA200 2.53, all falling, and price is 12% under the nearest of them. Volume stays absent: 652K on Oct 19, 79% of a 20-day average (825K) that is itself 69% of the 90-day — the drift continues to be a drift. The 1.50 +1M target is 2.6% away. The descending line from 4.39 (Apr 6) now passes ~1.86, just under the EMA50.',
    pattern: '<b>Downtrend — lower highs, 52-week low lost Oct 14, confirmed with a second close under it Oct 19.</b> Resistance line 4.39 (Apr 6) → 2.27 (Sep 17), 3 touches, today ~1.86 (EMA50 1.90 on top of it). No support line: 1.54 (Oct 19 close) and 1.53 (intraday) are the only references, then 1.50 and the engine measure at 1.39.',
    watch: '<b>1.50 and 1.90.</b> The round number is next and has no history; under it the 1.39–1.46 engine zone is the first place a base can form. The bounce ceiling is 1.76 (EMA20) — a trade, not a change of trend. <b>Reversal needs</b> a close above 1.90 (descending line + EMA50) — the first lower high taken out since April. <b>Cash:</b> funded to the 1H28 readout, so the overhang is time, not solvency.',
    decision: [
      'Holding: <b>nothing to do under 1.90</b>. The thesis is the 2028 readout; the chart is dead money until then.',
      'Not holding: <b>wait for the close &gt; 1.90</b>; a new low every other session is not an entry.',
      'Single trigger that flips the bias: <b>daily close &gt; 1.90</b> with 2× volume.',
    ],
    invalidation: { level: 1.9, text: 'A daily close above 1.90 (descending line from Apr 6 at ~1.86 and the EMA50) breaks the lower-highs sequence → next stop 2.27 (Sep 17 high) and 2.53 (EMA200).' },
    path: [
      { d: 30, h: '+1M', target: 1.5, how: 'Second close under 1.565 printed Oct 19; 1.50 is 2.6% away — round number, no reference.' },
      { d: 90, h: '+3M', target: 1.39, how: 'Engine measure (recalculated with the new low); nothing on the calendar before year-end to change it.' },
      { d: 365, h: '+1Y', target: 1.9, how: 'A base through 2027 as the Ph3 enrolls; a re-rate before the 1H28 readout is a 2027 story, not a 2026 one.' },
    ],
    levels: {
      resistance: [[1.76, 'EMA20 · bounce ceiling'], [1.9, 'INVALIDATION · descending line (~1.86) / EMA50'], [2.27, 'Sep 17 high'], [2.53, 'EMA200']],
      support: [[1.54, 'Oct 19 close — today · 52-week closing low'], [1.53, '52-week intraday low'], [1.5, '+1M target'], [1.39, 'Engine measure · +3M target']],
    },
  },

  NAUT: {
    updated: U, bias: 'BULL',
    read: 'The consolidation resolved up. After six sessions in a 2.05–2.25 box (Oct 9–16), Oct 19 printed +27.7% to 2.63 on 38.9M shares — 2× the 20-day average and 7× the 90-day — a new leg high above 2.25 (Oct 9) and 0.05 under the Jul high (2.68), the ceiling named in the last two passes. From the 0.95 low of Sep 25 the move is +177% in 16 sessions. Score 5/7, BULL: price above every EMA, MACD positive, RSI 75 (above 70 at every pass since the Oct 9 bar; it never cooled inside the box). The two missing checks are the same: the EMA200 (1.75, flat) and the 50/200 cross — the EMA50 (1.53) is 0.22 under the 200 and closing. The engine forecast is BULL with invalidation 1.84 (EMA20 1.82). The old triangle is irrelevant; the frame is the air pocket above 2.68 up to 3.95 (Mar 24).',
    pattern: '<b>Vertical breakout out of a 5-month triangle — six-session box (2.05–2.25), second leg started Oct 19.</b> Ceiling 3.95 (Mar 24) → 1.12 (Sep 9), 4 touches, broken Sep 29 (1.365). Floor 0.852 → 0.891 held. Breakout point (1.12) plus the triangle height projects ~3.4, where the sell-side targets sit (Roth 3.50, Leerink 4). Above 2.68 the only references are 3.50 and 3.95; the box floor (2.05, Oct 13 close) is the new structural level.',
    watch: '<b>2.68 and 2.05.</b> The Jul high is 2% away; a close above it on volume above the 20-day average opens 3.4–3.5 with nothing in between. A failure at 2.68 followed by a close back inside the box (under 2.25) makes Oct 19 a one-day spike; under 2.05 the box fails and the second leg is void. <b>Volume:</b> 38.9M on the breakout day is just under the Oct 9 climax bar (43.8M), against a 20-day average that has quadrupled since — strong, not climactic by itself. <b>RSI 75</b> through the whole box: the stock is being accumulated through overbought, which is what the first leg of a re-rating looks like and also where every pullback starts.',
    decision: [
      'Holding: <b>keep the core while it closes above 2.05</b> (box floor). The trading tranche comes off into 2.68–3.0, not here; the experimental position (avg ~0.91) is now 2.9×.',
      'Not holding: <b>wait for the retest of 2.05–2.25</b> (the box) on falling volume; chasing 2.63 the day after a +28% bar buys the top of the second leg with a 22% stop.',
      'Single trigger that flips the bias: <b>daily close &lt; 2.05</b> — the box fails, the Oct 19 bar was a blow-off and price returns to the EMA20 (1.82) and 1.57.',
    ],
    invalidation: { level: 2.05, text: 'A daily close below 2.05 (Oct 13 close, the floor of the Oct 9–16 box) voids the second leg → next stop 1.82 (EMA20), 1.57 (Oct 1 close, the EMA200 reclaim) and 1.12.' },
    path: [
      { d: 30, h: '+1M', target: 2.95, how: 'Break of 2.68 and the engine +1M; a pause at 2.4–2.7 first is the healthier version.' },
      { d: 90, h: '+3M', target: 3.4, how: 'Triangle projection and the Roth target (3.50). Requires volume to stay above the 90-day average and the raise (guided before mid-2027) not to hit the chart first.' },
      { d: 365, h: '+1Y', target: 3.95, how: 'Mar 24 high and the top of the triangle. Lines up with the sell-side targets (3.50–4.00) and ~20 proteoform assays by mid-2028.' },
    ],
    levels: {
      resistance: [[2.68, 'Jul high — 2% away'], [2.95, 'Engine +1M'], [3.4, 'Triangle projection · +3M'], [3.5, 'Roth target'], [3.95, 'Mar 24 high · triangle top']],
      support: [[2.63, 'Oct 19 close — today · leg high'], [2.25, 'Oct 9 close · box top'], [2.05, 'INVALIDATION · Oct 13 close · box floor'], [1.82, 'EMA20'], [1.75, 'EMA200'], [1.57, 'Oct 1 close · EMA200 reclaim']],
    },
  },

  QSI: {
    updated: U, bias: 'BEAR',
    read: 'The hold zone broke. Oct 16 closed 1.12 (−14.5%) — through the 1.28–1.35 zone the last two passes called the entry, through 1.22 (the Oct 6/8 lows, the invalidation) and under the EMA20 (1.17) in one bar; Oct 19 added −2.7% to 1.09 on 9.4M shares (64% of the 20-day average). The bias flips to BEAR on the rule: the first higher low of the breakout failed. Score 4/7, NEUTRAL: above the EMA50 (1.01) and EMA200 (1.02, rising), RSI 53, MACD negative. The 1.07 gap (Sep 30 close, the EMA200 reclaim) is 2% under price. The engine keeps a BULL forecast off the 0.70–0.72 floor (invalidation 0.763) — the 4-month frame holds; the October second leg does not. NAUT +27.7% on Oct 19 while QSI closed down: the proteomics pair is no longer trading as one.',
    pattern: '<b>Bear-triangle failure → breakout → higher low (1.22) lost Oct 16.</b> Floor 0.70–0.72 (Jul 29, Aug 18, Sep 15) held; ceiling 1.28 → 0.85 broke Sep 29; measure (~1.30) met Oct 1. The Oct 9 record bar (1.53 on 62M shares) is now the top of a failed second leg — a blow-off, as the Oct 12 read suspected. From 1.55 (Oct 2 high) the retrace is −30% and 66% of the 0.85 → 1.55 impulse. Below 1.07: the 1.01–1.02 EMA cluster, then 0.85 (the old ceiling, breakout origin).',
    watch: '<b>1.07 and 1.22.</b> The Sep 30 gap is the last reference above the EMA cluster; a close under 1.07 sends price to 1.00–1.02 (EMA50 / EMA200) and the breakout is retested from above at 0.85. The repair is a close back above 1.22 — the lost higher low, with the EMA20 (1.17) under it. <b>Volume:</b> the Oct 16 break came on a −14.5% bar; Oct 19 drifted on 64% of average — no reversal bar yet. <b>Nasdaq $1 compliance:</b> back on the radar under 1.10 — thirty consecutive closes under $1 start the clock. <b>Q3 print Nov 5.</b>',
    decision: [
      'Holding: <b>the 1.22 stop printed on Oct 16</b>. Shares plus 2027 calls are the sensor leg of the chain and the thesis is untouched; the chart says reduce the trading tranche into 1.17–1.22 (EMA20 / lost low), not at 1.09, and keep the calls.',
      'Not holding: <b>wait</b>. The next entry is 0.96–1.02 (EMA cluster) with a reversal bar, or a close back above 1.22 on volume above the 20-day average (14.8M).',
      'Single trigger that flips the bias: <b>daily close &gt; 1.22</b> — the lost higher low reclaimed, above the EMA20; the Oct 16 bar becomes a shakeout.',
    ],
    invalidation: { level: 1.22, text: 'A daily close back above 1.22 (Oct 6/8 lows, the lost higher low; EMA20 1.17 under it) voids the breakdown → next stop 1.36 and 1.55 (Oct 2 high).' },
    path: [
      { d: 30, h: '+1M', target: 1.0, how: 'EMA50 / EMA200 cluster (1.01–1.02), with the 1.07 gap the first stop; a retest of the breakout from above.' },
      { d: 90, h: '+3M', target: 0.85, how: 'Old triangle ceiling (Aug 25 high), the breakout origin; the Nov 5 print lands in this window and Proteus timing decides whether it holds.' },
      { d: 365, h: '+1Y', target: 1.55, how: 'Retest of the Oct 2 high from below — needs the Proteus launch (Q2 2027) on schedule and no financing off the $300M shelf hitting the chart. 3.1 is off the table until 1.22 is reclaimed.' },
    ],
    levels: {
      resistance: [[1.17, 'EMA20'], [1.22, 'INVALIDATION · Oct 6/8 lows — lost Oct 16'], [1.36, 'Oct 12 close'], [1.55, 'Oct 2 high'], [2.63, '12-month high · Nov 2025']],
      support: [[1.09, 'Oct 19 close — today'], [1.07, 'Sep 30 close · EMA200 reclaim'], [1.01, 'EMA50 / EMA200 cluster · +1M'], [0.85, 'Old triangle ceiling · +3M'], [0.72, 'Triangle floor, 3 touches · engine invalidation 0.763']],
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
