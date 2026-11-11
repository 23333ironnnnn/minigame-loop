# minigame-loop

[English](README.en.md)

给 AI 编程助手（Claude Code、Cursor、Codex 等）用的一个 skill：一个人或小团队带着 AI，把小游戏一版一版迭代下去，每一版都说得清自己做对了没有。

一圈 = 调研 → 方案 → 制作 → 发版 → 宣发 → 结算 → 沉淀。和平常的做法不一样的有三处：

- **以图代言**：不用文字描述玩法，先拼一张参考对比图让人点。
- **先下注再做**：大改动先写清楚「哪个数预计到多少、哪天结算、什么结果算我错了」，到期拉数对账。
- **经验带证据等级**：每条经验写明是看到过、知道为什么、还是推出来的；被数据推翻就标「失效」，不删。

人只定三件事：北极星和边界、方案点不点头、真机好不好玩。其余 AI 做，每一步做完停下来等你点头。

## 用起来是什么样（示意）

> 你：开新版本，想加个排行榜。
>
> AI：上一版的 B-2 今天到期，先结算：主指标落在预计区间里，中了；它引用的 M-4 从「候选」升成「生效」。<br>
> 这是 4 款游戏排行榜的对比图，每张写了它靠什么让人回来，你点一张。<br>
> （你点完）开工前要你定四件事：……<br>
> PRD 建好了。排行榜算大改动，附一张下注卡草稿：主指标次日留存，预计 ……，第 9 天结算，低于 …… 算我判断错。

## 安装

把一种语言的文件夹拷到你的助手读 skill 的地方，**只拷一种**：

| 助手 | 只给这个项目用 | 给所有项目用 |
| --- | --- | --- |
| Claude Code | `.claude/skills/minigame-loop/` | `~/.claude/skills/minigame-loop/` |
| Cursor | `.cursor/skills/minigame-loop/` | `~/.cursor/skills/minigame-loop/` |
| Codex | 看 Codex 文档 | `~/.codex/skills/minigame-loop/` |

```bash
git clone https://github.com/23333ironnnnn/minigame-loop.git
mkdir -p .claude/skills
cp -R minigame-loop/skills/zh/minigame-loop .claude/skills/   # 中文版
# 英文版换成 minigame-loop/skills/en/minigame-loop
```

Claude Code 和 Cursor 都用的话，放一份在 `.claude/skills/` 就够，Cursor 也读这里。助手没有 skill 机制的：把 `SKILL.md` 正文贴进项目的 `AGENTS.md`，其余文件放在旁边。

## 第一次用

在项目里对助手说「开新版本」，或者「按 minigame-loop 初始化一下」。它会先看一遍仓库，再一次问你四件事（北极星、数据从哪看、上线平台和硬约束、发版怎么做），然后在 `docs/loop/` 建三份文件：

- `project.md`：项目卡（北极星、数据源、平台约束、PRD 放哪）
- `bets.md`：下注账本
- `memory.md`：经验

以后每版的 PRD 放在 `docs/loop/versions/`。这些文件属于你的项目，升级 skill 不会碰它们。项目里一个埋点都没有的，它会先建议照 `analytics.md` 接 4 个事件。

## 里面有什么

| 文件 | 讲什么 |
| --- | --- |
| `SKILL.md` | 一圈九步；开新版本、问「要不要做」、问「效果怎么样」时各怎么走；门禁 |
| `bets.md` | 什么时候下注、下注卡、怎么判中没中、每组要多少人才看得出 |
| `settle.js` | 结算算法：给前后两组数和预计区间，判中 / 没中 / 看不出（只要 Node） |
| `memory.md` | 经验怎么记：作用域、证据等级、候选 → 生效 → 失效 |
| `analytics.md` | 一个埋点都没有时先接的 4 个事件，以及怎么算次日留存、分享闭环、做完率 |
| `platforms.md` | 各平台包体上限和能力的速查，每条带官方链接和核对日期 |
| `new-game.md` | 开新游戏：立项卡、spike、固化层 / 可变层、关卡工厂、资产 |
| `prd-template.md` | 每版 PRD 的骨架 |

真实案例：[咔嚓熊 V5 是怎么跑这一圈的](examples/kacha-bear.md)。

## 不适合

- 想全自动、每天自己改线上游戏的：这里每一步都停下来等人点头。

## 一起改

- 改 skill 要附证据：在哪个项目、哪一版、哪张卡的结算让你觉得该改。只是想法的话，先开 issue 聊。
- 中英两份一起改。只会一种语言也行，PR 里说一声，另一份我们补。
- 改完跑一遍回归自测：`node evals/settle.test.mjs`，再把 [`evals/scenarios.md`](evals/scenarios.md) 里的对话过一遍。
- 欢迎把你的项目写成 `examples/<名字>.md`：北极星怎么定的、一张真卡、几条真经验。不放密钥、用户数据和平台没公开的资料。

## 许可

[MIT](LICENSE)
