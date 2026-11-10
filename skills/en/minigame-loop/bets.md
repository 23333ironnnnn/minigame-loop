# Bets: rules and the card

The rules live here (they upgrade with the skill); the ledger lives in the project's `docs/loop/bets.md`.

## When to bet

New gameplay, core feel, home screen / main flow, sharing / scoring / leaderboard rules, a new game launch. Bug fixes, copy edits and parameter tweaks need no bet.

## The bet card (copy this block; keep numbering going, never reuse a number)

```markdown
### B-<n> <one line> (<date opened>, <version / PRD item>)
- Status: pending / shipped, awaiting settlement (<release date>) / settled
- What changed: <one line the user can see>
- Primary metric: <which north-star metric; which dashboard block and row / which console number>; definition: <which platforms, new vs. returning users, bots excluded or not>
- Now: <value> (<date range>)
- Expected: <range>; settlement date: <date>
- Guardrails: <metrics that must not get worse, e.g. completion rate, error rate>
- Wrong if: <what result means we were wrong, e.g. primary metric below the low end of the range, or a guardrail worse by more than 2 percentage points>
- Basis: <memory.md M-numbers / reference images / the user's own words>
- Settlement: <date> <actual value> → hit / miss / can't tell; reason; memory changes (M-<n> up / down / retired / new)
```

## Rules for writing and settling

- The primary metric comes only from the north star in `project.md`; pick guardrails separately, one or two per card.
- "Now" is a window before release of the same length (usually 7 days) as the settlement window. Don't compare 3 days with 14.
- Wait for the window to finish before settling: for day-1 retention, the people who arrived on the window's last day must have had their day 2; same idea for day-7. On platforms with review, count from the day it actually goes live.
- The range must be breakable: "goes up a bit" is not a bet. If unsure, make it wide, but write numbers.
- Before comparing before/after, check sources: promotion, a big account reposting, holidays in the window? Then separate them, or write "can't tell".
- Prefer A/B whenever you can. With small groups, p < 0.05 is often luck: set a minimum sample per group first (at least 100 per group if unsure). When it ends, hard-code the winner and remove the switch.
- When a platform gives you none of your own data, the primary metric can only come from numbers its console shows; ask the user for screenshots.
- A miss is not a failure: trace which basis was wrong and downgrade or retire that memory entry. That is what bets are for.

## Ledger header (copy into `docs/loop/bets.md` on first use)

```markdown
# Bet ledger

Rules: minigame-loop's bets.md. North star and data definitions: `project.md`.

## Pending / shipped, awaiting settlement

- (none)

## Settled

- (none)
```
