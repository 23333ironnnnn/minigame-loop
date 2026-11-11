---
name: minigame-loop
description: >-
  The full iteration loop for mini-games (research → plan → build → release → promote → settle → learn), for a solo
  developer or small team working with an AI coding agent, on a live game or a new one (web / mini-programs / any
  mini-game platform). New features and big changes get a falsifiable "bet" first (which metric, expected range,
  settlement date, what result proves us wrong) and are settled against real data when due; lessons go into a
  project-level memory as "claim + evidence + evidence level"; every version's PRD follows a template; level-based
  games use a seeded level factory. Read this first when the user says "start a new version", "next version",
  "new game", "kick off", "what should we do next", "should we build X", "how did this version do", "retro",
  "settle", "how are the numbers", or "remember this lesson".
license: MIT
metadata:
  version: "0.2.0"
---

# Mini-game iteration: how one loop goes

Humans decide three things: **the north star and the boundaries**, **whether a plan is approved**, and **whether it feels good on a real device**. The AI does the rest: research, first-draft plans, building, measuring, attribution, recording lessons.

On conflict: what the user said this turn > the current version's PRD > the project's own rules and skills > this file. This file only says what each step is and where its output goes. If the project already has a more specific way to do something (a release script, a posting guide, a cleanup list), hand off to it instead of copying it here.

## Four things that live in the project

The skill holds the method only. Each project keeps its own state in its own repo, by default under `docs/loop/` (if the project already keeps docs somewhere, use that and say so in `project.md`):

| File | What's in it | Template |
| --- | --- | --- |
| `docs/loop/project.md` | North star, where the data is, platforms and hard limits, where PRDs live, which project script / doc handles each step | "First use" below |
| `docs/loop/bets.md` | The bet ledger | [bets.md](bets.md) |
| `docs/loop/memory.md` | Lessons | [memory.md](memory.md) |
| `docs/loop/versions/<version>.md` | One PRD per version | [prd-template.md](prd-template.md) |

## First use in a project (no `docs/loop/` yet)

1. Read the repo first: how it builds, which platforms it ships to, whether there's analytics / a dashboard, existing PRDs and release scripts.
2. Ask four things in one go (don't ask what the repo already tells you; phrase it as "I see X, right?"):
   - North star: at most two numbers, e.g. day-1 retention, new users brought back by shares. Every bet's primary metric is picked from these.
   - Where the data is: own dashboard / platform console / third-party analytics; which platforms give you no data at all. No numbers at all → add the 4 events in [analytics.md](analytics.md) first, as the first step of the first version.
   - Platforms and hard limits: package size cap, minimum OS / client version, network access, review rules. Start from [platforms.md](platforms.md), then re-check through its links.
   - How release, promotion and cleanup are done today (record script / doc paths; leave blank if there are none).
3. Create `project.md` from the sample below, and the other two files from the "ledger header" in [bets.md](bets.md) / [memory.md](memory.md). Show the user before committing.
4. Add one line to the project's `AGENTS.md` / `CLAUDE.md` (whichever exists): "Iterations and new games follow minigame-loop; project state is in `docs/loop/`."

`project.md` looks like this:

```markdown
# <Game> · project card for iteration

- North star (set by the user on <date>): ① <metric> (<where to see it>); ② <metric> (<where to see it>). Completion rate, error rate and the like are guardrails.
- Where the data is: <dashboard URL, without the key> / <which console page>; platforms with no data: <…>.
  - Secrets (dashboard keys, console logins) are given by the user on the spot and used only to fetch data: never written into any file or commit, never repeated in replies.
- Platforms and hard limits: <platform>: <size cap / min version / network / review>; …
- PRDs live in: `docs/loop/versions/` (or <existing location>).
- Who handles each step: build <project dev rules / skill>; release <script / doc>; promotion <doc>; cleanup <doc>. Write "none, minigame-loop default" where there isn't one.
```

## Every session, first

1. `git status`: stop and ask about changes you don't recognize; don't touch other people's work.
2. Read `docs/loop/bets.md`: any bet past its settlement date → settle it first (step 7), then open new ones.
3. Look up related entries in `docs/loop/memory.md`: follow "active" ones; treat "candidate" ones as hints, not conclusions.
4. Decide which kind of work this is: **iteration** (changing a live game) → this version's PRD; **new game** → [new-game.md](new-game.md).

## When the user says "start a new version / next version"

1. Do "Every session, first".
2. Check the last steps of the previous PRD (release / promotion / settlement / learning). List anything unfinished and ask: wrap it up first, or carry it into the new version?
3. Research: show reference comparison images for what this version wants to do (step 1); the user picks.
4. Ask everything needed to start, in one go: which items, in what order, which branch (a new branch needs the user's OK), and which items are big enough to need a bet.
5. Create this version's PRD from [prd-template.md](prd-template.md); reserve a placeholder under "Pending" in `bets.md` for each big change.
6. Then build one step, one sign-off at a time (step 3).

## When the user asks "should we build X / what next"

1. Which north-star number is X expected to move? If nobody can say, don't do it yet, or do it as a small change (no bet).
2. Check memory for related entries, retired ones included: why it didn't work before.
3. Give a recommendation with a draft bet card for the user to approve.

## When the user asks "how did this version do / retro"

1. Changes with a bet: settle by the card (step 7), and talk only in terms of the definitions written on the card.
2. Changes without a bet: you may pull numbers and show them, but only as "X went from a to b over this period", without crediting any change. After the fact, anyone can find a reason.
3. To be able to tell next time: give it a card when the next version starts.

## The nine steps

| # | Step | Output goes to | The user's part |
| --- | --- | --- | --- |
| 1 | Research: show, don't tell | PRD §1 | Pick one of the candidate images |
| 2 | Plan: PRD; big changes get a bet card | PRD, `bets.md` | Approve / edit |
| 3 | Build: one step, one sign-off | PRD "Steps" | Look at each step |
| 4 | Quality check | PRD acceptance section | Play it on a real device |
| 5 | Release | the release method in `project.md` | Say "ship it"; upload / submit for review |
| 6 | Promote | the promotion method in `project.md` | Post it yourself |
| 7 | Settle: compare data to the bet when due | `bets.md` | Provide data (a key on the spot, or screenshots) |
| 8 | Learn: lessons into memory | `memory.md` | Glance at new entries |
| 9 | Clean up | the cleanup method in `project.md` | Approve the list |

### 1. Research: show, don't tell

- Don't make the user describe gameplay in words. Find 3–6 real references (game screenshots, video frames, social-post screenshots), put them into one comparison image (if you can't composite images, list paths / links), caption each with one line, "its core action is …", and let the user pick.
- Distill the pick into three lines in PRD §1: the core action (one verb), how a round ends, and what makes people play again.
- Borrow ideas only: never copy text, assets or visuals as they are; stay away from other people's IP.

### 2. Plan: how to write the PRD

- Every paragraph must turn directly into a dev action (which file, which parameter, what acceptance measures). If a sentence can't, cut it.
- Decision log (PRD §0): who, when, their exact words, what was decided. Decisions the AI made on its own are marked "AI's call (reversible)".
- New features and big changes (new gameplay, core feel, home screen / main flow, sharing / scoring / leaderboard rules, a new game launch) → open a bet card and present it with the PRD. Bug fixes, copy edits and parameter tweaks need no bet.

### 3. Build: one step, one sign-off

- One step = one change the user can see. When it's done, verify it yourself first (type check / build / tests / screenshots), show the evidence, then stop and wait for an OK before starting the next step.
- When closing each step, update the PRD's "Steps" and §0 in the same turn. When the user changes their mind, log it in §0; don't rely on chat history.
- For feel, animation and sound, automated tests can only prove it's *correct*; whether it's *good* only shows on a real device. Ship something touchable first, then tune parameters.

### 4. Quality check

- At least one real device per platform (both iOS and Android if you ship to both); also try a low-end device and the minimum supported version once.
- On platforms with a package size cap, record the size at every step and stop before you reach the line.

### 5–6. Release and promotion

- Follow the methods written in `project.md`. Deploying, uploading and posting always wait for the user to say so.
- Give every promotion channel (each post, each group, each partner) its own source parameter (`src` in [analytics.md](analytics.md)), so settlement can tell what the change did from what the promotion brought in.

### 7. Bets and settlement (details in [bets.md](bets.md))

- A bet = a falsifiable judgment: primary metric, current value, expected value (a range), settlement date, what result proves it wrong, and the basis (which memory entries it cites).
- Settling = on the date, pull data by the card's definitions, compare line by line, and write "hit / miss / can't tell" with the reason. Compute the verdict with `settle.js`, not in your head. On a miss, trace which basis was wrong and downgrade or retire that memory entry.
- With incomplete data (dashboard down, retention window not over, too few samples), draw no conclusion: write "can't tell" and push the date. Better not to settle than to settle wrong.
- Externally (promotion, partners, DMs), only quote numbers that count under your definitions.

### 8. Learn (details in [memory.md](memory.md))

- One entry = a claim + its evidence; no process logs, no numbers that will go stale (numbers stay in the PRD or settlement record; memory says where).
- Each entry carries a scope, an evidence level (observation / mechanism / inference) and a status (candidate / active / retired).

## Gate: the session ending ≠ done

Before closing each step, check the list; fill the gaps, or say plainly what can't be filled:

- PRD §0 decision log and "Steps" were updated in the same turn;
- big changes have bet cards; due cards are settled;
- new lessons are in `memory.md`, or you said explicitly "no new lessons this time";
- verification actually ran; anything not run is listed with the reason.

## Not doing

- No multi-agent frameworks, remote containers or job queues: one person + one AI coding agent; the current session is the scheduler.
- No automatic daily metric checks, no automatic changes to production: add a scheduled task only when the user asks.
- No secrets, user save data or non-public platform material in the repo.
