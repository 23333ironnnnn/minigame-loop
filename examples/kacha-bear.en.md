# Case study: Kacha Bear V5

[中文](kacha-bear.md)

Kacha Bear is a 3D squishy stress-relief game: pick a shape, tune how it feels, add colors and fillings, then squeeze it and listen to it crunch. It ships on the web, as a WeChat mini-program and as a Xiaohongshu (RED) mini-tool. One person working with an AI coding agent took it from V0 to V5, and minigame-loop was distilled from V5.

This case study only shows how the method played out. Server addresses, keys, user data and non-public platform material are left out; memory entries are rewritten without the project's internal paths. Quotes from the user are translated from Chinese.

## North star

At the start of V5 the user set two: **day-1 retention**, and **the share loop** (how many new users the results people share bring back). Completion rate and performance errors are guardrails only.

On one of the three platforms we get none of our own analytics (M-1), so bets on changes there can only use numbers the platform console shows.

## How this version went

**Show, don't tell.** The user didn't open this version with a spec. They sent a screenshot of a Japanese 3D squishy game, and pointed at another game where "every round has a score and a title, and you can compare". PRD §0 recorded the user's words and also stated: "borrow ideas only; never take its text, assets or titles". Later, for the S2 result card, the AI first made three candidate images (A / B / C); the user picked A, "receipt style", and only then did coding start.

**Ask everything at once.** The four things the user had to decide before kickoff went into a single question: what to build first, how scoring works, how dents left by squeezing get undone, and whether to use the platform leaderboard. Every later step worked the same way: three questions before S2, two more before an S2 sign-off.

**One step, one sign-off.** S1 started from one sentence by the user: "When I squeeze it, it just bounces back. Not crunchy. Not satisfying." So two squishy types (ice bars and blocks) were changed to "dents stay where you press". The automated checks (dent depth, whether the dent stays after release, whether grains poke through the skin) all passed. Then the user tried it on a real device: "This ball keeps moving around. Can you make it stop moving?" After the fix and another try, the user said "OK, keep going", and only then was S1 ✅. This became M-3, and acceptance gained a new check: "once the hand stops, no grain may keep moving".

**Bet before building.** This version has three big changes, each with a bet card. The AI proposed primary metrics and guardrails; the user confirms them when the card is opened:

| Card | Change | Primary metric | Guardrails | Settlement date |
| --- | --- | --- | --- | --- |
| B-1 | Ice bars / blocks become moldable + one-tap re-round + crunch sound | Day-1 retention | Completion rate of those crafting lines | From day 2 after release |
| B-2 | A result receipt after each squish + per-round score + titles | Share loop (people brought back by shared receipts) | Completion rate | Day 7 after release |
| B-3 | Cumulative score leaderboard | Day-1 retention (coming back to earn points) | Performance errors | Day 8 after release (after the 7-day window ends) |

At the time of writing V5 hasn't shipped, so none of the three cards is open yet: before release we pull a baseline and fill in "Now" and "Expected", then compare on the settlement date. This page will be updated after settlement.

## What B-1 will look like once opened

`<…>` marks numbers that only exist right before release; nothing is made up here.

```markdown
### B-1 Moldable ice bars / blocks + re-round + crunch (<date opened>, V5.0 S1)
- Status: pending
- What changed: ice bars and blocks dent where you press and the dents stay; tap "re-round" to smooth them out; squeezing adds a crunchy layer of sound
- Primary metric: day-1 retention (dashboard "Retention" block); definition: web + WeChat mini-program (the mini-tool gives us no data of our own), <new vs. returning users, bots excluded or not: decided when opening>
- Now: <value over the 7 days before release> (<date range>)
- Expected: <range>; settlement date: <when people who arrived on the window's last day have had their day 2>
- Guardrails: completion rate of the ice-bar / block crafting lines
- Wrong if: day-1 retention below the low end of the range, or completion rate down by more than 2 percentage points
- Basis: the user's words "When I squeeze it, it just bounces back. Not crunchy. Not satisfying."; M-6
- Settlement: (filled in when due)
```

## Real memory entries

### M-1 On one platform we can't get our own behavior data
- Scope: that one platform
- Evidence: mechanism — platform rules don't let us send analytics out, so analytics on that platform are a no-op. Effects can only be read from the platform console, post data and the leaderboard.
- Status: active

### M-2 With fewer than 100 per A/B group, p < 0.05 is often luck
- Scope: all games
- Evidence: mechanism — with small samples, random noise alone can produce "significance". Our dashboard shows only "can't conclude yet" until every group has 100.
- Status: active

### M-3 Automated checks can only prove feel is *correct*; whether it's *good* only shows on a real device
- Scope: this game (changes to feel)
- Evidence: observation — V5 S1 passed every automated check, and the user's first real-device try was "it keeps moving around"; only then did acceptance gain "no grain may move once the hand stops".
- Status: active

### M-5 Using multithreading on that platform restricts you to newer OS versions
- Scope: that one platform
- Evidence: mechanism — the platform's packaging spec at the time, verbatim.
- Status: retired (2026-11: the spec dropped this rule, and the platform docs now state multithreading is supported, with a minimum client version. If you use it, follow the documented limits and keep a non-multithreaded path for older versions.)

It's kept so that people later can see it used to be true, and why it stopped being true. The new-game kickoff card changed along with it.

### M-6 Users often change their minds about feel and gameplay details only after trying it
- Scope: this game
- Evidence: observation — once, after juicy fruit was built, the user looked at it and asked for realistic fruit instead; once in V5, the user tried the ice bars / blocks, said "not satisfying", and they became moldable. So changes to feel ship something touchable first, then settle the parameters.
- Status: candidate

### M-7 With React Three Fiber, all of three.js ends up in the bundle; look here first to save size
- Scope: every project using React Three Fiber
- Evidence: mechanism — in `@react-three/fiber` 9.x, `<Canvas>` calls `extend(THREE)` by default, registering the whole three namespace for JSX, so tree-shaking can't drop it. Kacha Bear actually uses only 26 classes as JSX.
- Status: candidate

### M-8 When the bundle is over the limit, deleting dead code frees almost nothing; attribute bytes with a source map first
- Scope: every project relying on bundler tree-shaking
- Evidence: mechanism — unused exports are already shaken out at build time. Two dead-code scans on Kacha Bear left only intentionally kept exports; the real savings were all at the dependency level (stubbing out unused libraries, registering three classes on demand).
- Status: active

M-4 is about writing social posts, not game iteration, so it's left out.

## Pitfalls that made it into the skill

- **The ledger and memory first lived inside the skill folder.** When open-sourcing, they moved to the project's `docs/loop/`: the skill holds the method, the project holds its state, and upgrading the skill never overwrites your ledger.
- **We only found out one platform has no data while writing a bet card** (M-1). So first use now writes "where the data is, which platforms have none" into `project.md`.
- **All automated checks passing ≠ fun** (M-3). So steps about feel only count as accepted after a real-device try.
