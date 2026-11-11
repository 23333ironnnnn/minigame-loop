# minigame-loop

[中文](README.md)

An agent skill for AI coding assistants (Claude Code, Cursor, Codex, …): a solo developer or small team iterates a mini-game with AI, version after version, and every version can say whether it got things right.

One loop = research → plan → build → release → promote → settle → learn. Three things differ from the usual way:

- **Show, don't tell**: nobody describes gameplay in words; you get a comparison image of references and pick one.
- **Bet before you build**: big changes first write down "which number, expected range, settlement date, what result proves me wrong", then get settled against real data.
- **Evidence-graded memory**: each lesson says whether it was observed, understood or inferred; when data disproves it, it's marked "retired", never deleted.

Humans decide only three things: the north star and boundaries, whether a plan is approved, and whether it feels good on a real device. The AI does the rest and stops after every step for your OK.

## What using it looks like (illustrative)

> You: Start a new version. I want to add a leaderboard.
>
> AI: B-2 from last version is due today, so let's settle it first: the primary metric landed inside the expected range, a hit; M-4, which it cited, goes from "candidate" to "active".<br>
> Here's a comparison image of leaderboards in 4 games, each captioned with what brings players back. Pick one.<br>
> (after you pick) Four things to decide before kickoff: …<br>
> The PRD is ready. A leaderboard counts as a big change, so here's a draft bet card: primary metric day-1 retention, expected …, settled on day 9; below … means I was wrong.

## Install

Copy one language's folder to where your assistant reads skills. **Copy only one**:

| Assistant | This project only | All projects |
| --- | --- | --- |
| Claude Code | `.claude/skills/minigame-loop/` | `~/.claude/skills/minigame-loop/` |
| Cursor | `.cursor/skills/minigame-loop/` | `~/.cursor/skills/minigame-loop/` |
| Codex | see the Codex docs | `~/.codex/skills/minigame-loop/` |

```bash
git clone https://github.com/23333ironnnnn/minigame-loop.git
mkdir -p .claude/skills
cp -R minigame-loop/skills/en/minigame-loop .claude/skills/   # English
# for Chinese use minigame-loop/skills/zh/minigame-loop
```

If you use both Claude Code and Cursor, one copy in `.claude/skills/` is enough; Cursor reads it too. For assistants without skills, paste the body of `SKILL.md` into the project's `AGENTS.md` and keep the other files next to it.

## First use

In your project, tell the assistant "start a new version" or "set up minigame-loop". It reads the repo, asks you four things in one go (north star, where the data is, platforms and hard limits, how you release), then creates three files under `docs/loop/`:

- `project.md`: the project card (north star, data sources, platform limits, where PRDs live)
- `bets.md`: the bet ledger
- `memory.md`: lessons

Each version's PRD goes into `docs/loop/versions/`. These files belong to your project; upgrading the skill never touches them. If the project has no analytics at all, it will first suggest adding the 4 events in `analytics.md`.

## What's inside

| File | What it covers |
| --- | --- |
| `SKILL.md` | The nine steps; what to do on "new version", "should we build X" and "how did it do"; the done-gate |
| `bets.md` | When to bet, the bet card, how to judge hit or miss, how many people you need to tell |
| `settle.js` | The settlement math: before/after counts and the expected range in, hit / miss / can't tell out (just Node) |
| `memory.md` | How lessons are recorded: scope, evidence level, candidate → active → retired |
| `analytics.md` | The 4 events to add when you have no analytics, and how to compute day-1 retention, the share loop and completion rate |
| `platforms.md` | A cheat sheet of platform size limits and capabilities, each with an official link and check date |
| `new-game.md` | Starting a new game: kickoff card, spike, fixed / variable layers, level factory, assets |
| `prd-template.md` | The skeleton of every version's PRD |

A real case: [how Kacha Bear V5 ran the loop](examples/kacha-bear.en.md).

## Not a fit

- If you want full autonomy, with the AI changing your live game every day on its own: here every step stops for a human OK.

## Contributing

- Changes to the skill need evidence: which project, which version, which card's settlement made you think it should change. Just an idea? Open an issue first.
- Change both languages together. If you only write one, say so in the PR and we'll do the other.
- After a change, run the regression checks: `node evals/settle.test.mjs`, then go through the conversations in [`evals/scenarios.md`](evals/scenarios.md).
- You're welcome to write your project up as `examples/<name>.md`: how you set the north star, one real card, a few real lessons. No secrets, user data or non-public platform material.

## License

[MIT](LICENSE)
