# 平台速查

核对日期：2026-11-10。只收官方公开页面上写着的，每条带链接。

- 这些会变：微信的旧页面还写着总包 8M，新页面是 30M。用之前点链接再核一遍；离核对日期超过 3 个月的，当「候选」看。
- 官方页面之间也会对不上：以最新、最具体的那一页为准；拿不准就按最严的做。
- 核对完的结论写进自己项目的 `project.md`「平台和硬约束」。
- 想补一个平台、改一个数：附官方链接和核对日期提 PR。

## 微信小游戏

- **包体**：主包 ≤ 4M；普通分包不限大小，独立分包 ≤ 4M；主包 + 全部分包 ≤ 30M。[分包加载](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/subPackage/useSubPackage.html)
- **联网**：只能连后台配置过的服务器域名，域名要 ICP 备案；只能 HTTPS / WSS，TLS ≥ 1.2；`request` 类最多同时 10 个，socket 5 个。[网络](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/network.html)
- **本地存储**：每个用户、每个游戏 10MB，单个 key 1MB。[本地缓存](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/storage.html)
- **Worker**：同时只能 1 个；代码放在 `game.json` 的 `workers` 目录里，只放 JS，默认算进首包；Worker 里不能调 `wx` 接口。[多线程 Worker](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/workers.html)
- **WebGL**：`webgl` 和 `webgl2` 都有，`webgl2` 要基础库 ≥ 2.24.0；iOS 上还有系统版本和运行模式的条件（高性能模式要 iOS ≥ 15），普通模式没写清 → 给 WebGL 1 留一条路。[Canvas.getContext](https://developers.weixin.qq.com/minigame/dev/api/render/canvas/Canvas.getContext.html)、[高性能模式](https://developers.weixin.qq.com/minigame/dev/guide/performance/perf-high-performance.html)
- **排行**：好友 / 群排行用关系链数据（`wx.setUserCloudStorage` 写，`wx.getFriendCloudStorage` 读）；要配开放数据域、要用户授权 `scope.WxFriendInteraction`，开放数据域的画布只有 2d。[关系链数据](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/open-data.html)
- **分享带来源**：`wx.shareAppMessage({ query })`，打开的一方用 `wx.getLaunchOptionsSync()` / `wx.onShow()` 读 `query`；`src=share_<id>` 放在这里。[wx.shareAppMessage](https://developers.weixin.qq.com/minigame/dev/api/share/wx.shareAppMessage.html)
- **自带数据**：后台有访问留存（新增 / 活跃，含次日），也能用数据分析接口拉。[常规分析](https://developers.weixin.qq.com/minigame/analysis/Analysis.html)

## 抖音小游戏

- **包体**：主包 ≤ 4MB；整个包 ≤ 20MB（开通虚拟支付后 30M）；开放数据域目录 ≤ 4MB。几个官方页说法不完全一样，按 20MB 算。[代码包](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/basic-function/subpackages/introduction)
- **联网**：只能连开发者平台白名单里的域名，要 ICP 备案、不能带端口；只能 HTTPS / WSS，TLS ≥ 1.2，iOS 不认自签名证书；`tt.request` 最多同时 15 个。[网络请求](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/basic-function/network)
- **本地存储**：总共约 10MB，单个 key 1MB，超了回调失败。[tt.setStorage](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/javascript-api/data-caching/tt-set-storage)
- **Worker**：同时只能 1 个；要在 `game.json` 里声明 `workers`；Worker 里不能调 `tt` 接口，不能联网、读写文件或渲染。[多线程 Worker](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/basic-function/multi-thread)
- **WebGL**：接口文档只列了 `2d` 和 `webgl`（WebGL 1.0）；WebGL 2 只在 Unity 适配文档里出现，普通小游戏能不能用没写 → 按 WebGL 1 做。[Canvas.getContext](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/javascript-api/drawing/picture/canvas-get-context)
- **排行**：有原生榜单，`tt.setImRankData` 写分，`tt.getImRankList` 拉起好友榜 / 总榜（日 / 周 / 月 / 总），要基础库 ≥ 2.70.0、抖音 ≥ 23.2.0，拉起前先 `tt.login`；自己画榜用 `tt.getImRankData`，要开放数据域。[游戏排行榜](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/open-ability/ImRankIntroduce)
- **分享带来源**：`tt.shareAppMessage({ query })`，打开的一方用 `tt.getLaunchOptionsSync` / `tt.onShow` 读；别用平台保留的字段（`ad_params`、`feed_game_*`）；分享链接 45 天后失效。[ShareParam](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/javascript-api/open-capacity/retweet/share-param)
- **自带数据**：开发者后台「用户分析 → 留存分析」，有 1 / 3 / 14 / 30 天留存，能按新老用户、系统筛。[留存分析](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/operation1/about-data/user/retention-analysis)

## 网页 H5

caniuse 的比例是核对当天的快照。

- **localStorage**：每个域名 5 MiB，超了抛 `QuotaExceededError`。[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- **Web Worker**：约 97.6% 的浏览器支持。[caniuse](https://caniuse.com/webworkers)
- **OffscreenCanvas**：约 96.5% 完整支持；iOS Safari 17 起完整支持，16.2 起部分支持。[caniuse](https://caniuse.com/offscreencanvas)
- **WebGL 2**：约 97.3%；iOS Safari 15 起。[caniuse](https://caniuse.com/webgl2)
- **Service Worker**（离线缓存）：只能在 HTTPS 下用，`localhost` 也算。[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## 小红书

- **小工具**：核对日没找到公开的技术文档；按平台给你的开发文档来，核对完写进自己项目的 `project.md`。发布规则看[《小工具服务协议》](https://agree.xiaohongshu.com/h5/terms/ZXXY20260630004/-1)。
- **小程序里的小游戏**（和小工具是两条线）：要联系官方开白。[快速上手](https://miniapp.xiaohongshu.com/doc/DC125490)

## 跨平台比数

微信按用户（openid）算，抖音的新增 / 活跃按启动游戏的设备数算，两边后台的次日留存不能直接比：拿平台后台的数下注时，一张卡只用一个平台的口径。自己的埋点（[analytics.md](analytics.md)）各平台口径一样，可以合起来算。[微信数据分析](https://developers.weixin.qq.com/minigame/analysis/)、[抖音数据基础介绍](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/operation1/about-data/data-intro/intro)
