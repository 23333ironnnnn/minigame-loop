# Minimal analytics: 4 events

When a project has no analytics at all, add these 4 first: they give you the two most common north-star numbers (day-1 retention, the share loop) and the most common guardrail (completion rate). Adding them is itself the first step of the first version, done after the user approves.

## Every event carries

- `uid`: an anonymous id generated randomly on first open and stored locally. No phone numbers, nicknames or device ids.
- `t`: a timestamp.
- `platform`, `version`: which platform, which version.
- `src`: the source read from the link parameter, empty if none. One value per post, per group, per partner; links that players share use `share_<share_id>`.

## The 4 events

| Event | When | Extra fields |
| --- | --- | --- |
| `open` | every launch | — |
| `round_start` | a round starts | — |
| `round_end` | a round ends normally | — |
| `share` | the player taps share | `share_id`: random, added to the shared link as `?src=share_<share_id>` |

## How to compute

- **Day-1 retention** (for day D): of the `uid`s first seen on day D, the share that `open` again on day D+1. Pick the time zone that defines "a day" once and never change it.
- **Share loop**: over a period, the number of first-seen `uid`s whose `src` starts with `share_` (new people brought by shares); for efficiency, divide by the number of `share` events in the same period.
- **Completion rate**: `round_end` count ÷ `round_start` count over the same period.
- All three are proportions, so they go straight into `settle.js` when settling.

## Where to send them

- Anywhere that accepts a POST: a cloud function plus a table, your own server, the platform's built-in analytics. One event per row; skip the big-data platform for now.
- If a send fails, drop it; never retry in a way that stalls the game. Batching a few events is fine.
- On platforms that don't allow network requests, these numbers come only from the platform console; say so in `project.md`.
- Privacy: anonymous ids only, nothing that identifies a person; state what you collect in the privacy policy; follow each platform's rules.
