# Platform cheat sheet

Checked on 2026-11-10. Only what official public pages say, each with a link.

- These change: an old WeChat page still says 8M total, the current one says 30M. Re-check through the links before relying on them; treat anything checked more than 3 months ago as a "candidate".
- Official pages sometimes disagree with each other: go with the newest, most specific page; when unsure, follow the strictest one.
- Write what you verified into your project's `project.md` under "Platforms and hard limits".
- To add a platform or fix a number: open a PR with the official link and the check date.

## WeChat Mini Games

- **Package size**: main package ≤ 4M; regular subpackages have no size limit, independent subpackages ≤ 4M; main + all subpackages ≤ 30M. [Subpackages](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/subPackage/useSubPackage.html)
- **Network**: only server domains configured in the console, which need ICP filing; HTTPS / WSS only, TLS ≥ 1.2; at most 10 concurrent `request`-type calls and 5 sockets. [Network](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/network.html)
- **Local storage**: 10MB per user per game, 1MB per key. [Storage](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/storage.html)
- **Workers**: one at a time; code lives in the `workers` directory set in `game.json`, JS only, counted in the first package by default; no `wx` APIs inside a worker. [Workers](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/workers.html)
- **WebGL**: both `webgl` and `webgl2`; `webgl2` needs base library ≥ 2.24.0. On iOS there are further OS-version and run-mode conditions (high-performance mode needs iOS ≥ 15), and normal mode isn't documented → keep a WebGL 1 path. [Canvas.getContext](https://developers.weixin.qq.com/minigame/dev/api/render/canvas/Canvas.getContext.html), [High-performance mode](https://developers.weixin.qq.com/minigame/dev/guide/performance/perf-high-performance.html)
- **Leaderboards**: friend / group rankings use relationship-chain data (write with `wx.setUserCloudStorage`, read with `wx.getFriendCloudStorage`); needs an open data context and the user's `scope.WxFriendInteraction` authorization, and the open-data canvas is 2d only. [Open data](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/open-data.html)
- **Share with a source tag**: `wx.shareAppMessage({ query })`; the opening side reads `query` via `wx.getLaunchOptionsSync()` / `wx.onShow()`. Put `src=share_<id>` here. [wx.shareAppMessage](https://developers.weixin.qq.com/minigame/dev/api/share/wx.shareAppMessage.html)
- **Built-in data**: the console has visit retention (new / active users, including day 1), also available through the data-analysis API. [Analytics](https://developers.weixin.qq.com/minigame/analysis/Analysis.html)

## Douyin Mini Games

- **Package size**: main package ≤ 4MB; whole package ≤ 20MB (30M once virtual payments are enabled); open-data-context directory ≤ 4MB. Official pages don't fully agree, so plan for 20MB. [Code package](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/basic-function/subpackages/introduction)
- **Network**: only allowlisted domains from the developer console, with ICP filing and no port; HTTPS / WSS only, TLS ≥ 1.2, no self-signed certificates on iOS; at most 15 concurrent `tt.request` calls. [Network](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/basic-function/network)
- **Local storage**: about 10MB total, 1MB per key; the callback fails beyond that. [tt.setStorage](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/javascript-api/data-caching/tt-set-storage)
- **Workers**: one at a time; declare `workers` in `game.json`; no `tt` APIs, network, file I/O or rendering inside a worker. [Workers](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/basic-function/multi-thread)
- **WebGL**: the API docs list only `2d` and `webgl` (WebGL 1.0); WebGL 2 appears only in the Unity adaptation docs, and whether regular mini-games can use it isn't documented → build for WebGL 1. [Canvas.getContext](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/javascript-api/drawing/picture/canvas-get-context)
- **Leaderboards**: native rankings: write scores with `tt.setImRankData`, open the friend / overall board (daily / weekly / monthly / all-time) with `tt.getImRankList`; needs base library ≥ 2.70.0 and Douyin ≥ 23.2.0, and call `tt.login` first. To draw your own board use `tt.getImRankData`, which needs an open data context. [Game leaderboards](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/open-ability/ImRankIntroduce)
- **Share with a source tag**: `tt.shareAppMessage({ query })`; the opening side reads it via `tt.getLaunchOptionsSync` / `tt.onShow`. Avoid platform-reserved fields (`ad_params`, `feed_game_*`); share links expire after 45 days. [ShareParam](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/javascript-api/open-capacity/retweet/share-param)
- **Built-in data**: developer console, "User analysis → Retention analysis": day 1 / 3 / 14 / 30 retention, filterable by new vs. returning users and OS. [Retention analysis](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/operation1/about-data/user/retention-analysis)

## Web / H5

The caniuse percentages are snapshots from the check date.

- **localStorage**: 5 MiB per origin; exceeding it throws `QuotaExceededError`. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- **Web Workers**: supported by about 97.6% of browsers. [caniuse](https://caniuse.com/webworkers)
- **OffscreenCanvas**: about 96.5% full support; full support from iOS Safari 17, partial from 16.2. [caniuse](https://caniuse.com/offscreencanvas)
- **WebGL 2**: about 97.3%; iOS Safari 15 and later. [caniuse](https://caniuse.com/webgl2)
- **Service Workers** (offline caching): HTTPS only, though `localhost` counts. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## Xiaohongshu (RED)

- **Mini-tools**: no public technical docs found as of the check date; follow the developer docs the platform gives you, and write what you verify into your project's `project.md`. Publishing rules: the [Mini-tool Service Agreement](https://agree.xiaohongshu.com/h5/terms/ZXXY20260630004/-1).
- **Mini-games inside mini-programs** (a separate track from mini-tools): you need to contact the platform to be allowlisted. [Quick start](https://miniapp.xiaohongshu.com/doc/DC125490)

## Comparing numbers across platforms

WeChat counts users (openid); Douyin counts new / active users by the devices that launched the game. Their consoles' day-1 retention can't be compared directly: when betting on console numbers, use one platform's definitions per card. Your own analytics ([analytics.md](analytics.md)) use the same definitions everywhere, so those can be combined. [WeChat analytics](https://developers.weixin.qq.com/minigame/analysis/), [Douyin data basics](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/operation1/about-data/data-intro/intro)
