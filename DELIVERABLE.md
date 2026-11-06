# 交付说明

复刻目标：https://www.lizheng.ai/  
项目路径：`/workspace/lizheng-clone`  
侦察时间：2026-11-06（Asia/Shanghai）

## 运行方式

```bash
cd lizheng-clone
npm install
npm run dev          # http://localhost:5173/
npm run build        # 输出 dist/
GITHUB_PAGES=1 npm run build   # 输出 docs/，base=/lizheng-ai-clone/
```

## 已还原页面

### 营销与栏目（原站 SSR HTML + 原站 CSS class）

| 路由 | 说明 |
|---|---|
| `/` | 中文首页（hero、履历、现场、超线性学院、问问立正、对话、书、判断、文章、加入） |
| `/en` | 英文首页 |
| `/about` `/en/about` | 关于我 |
| `/books` `/en/books` | 书 |
| `/decks` `/en/decks` | 演讲资料列表 |
| `/collab` `/en/collab` | 合作 |
| `/collab/enterprise` `/en/collab/enterprise` | 企业培训 |
| `/collab/creators` | 播客/创作者合作（中文页；英文入口暂复用中文正文） |
| `/zbs` | 《真本事》落地页 |
| `/for-agents` `/en/for-agents` | 产品与资料指南 |

### 嘉宾

| 路由 | 说明 |
|---|---|
| `/guests` | 157 位嘉宾列表（搜索、缩略图、对谈数），样式用原站 `.lz-guests-*` |
| `/guests/:slug` | 157 个详情模板（简介 + 全部对谈，数据来自 lizheng-open-context `catalog/guests.json`） |

### 文章 / 书 / 课件正文（从原站公开 HTML 抓取）

| 路由 | 数量 |
|---|---|
| `/writing/statsig` + 19 篇详情 | 已抓正文 |
| `/book/growth-data-analytics-playbook` + 第 1–10 章 + conclusion | 已抓中文版正文 |
| `/decks/:slug`（含 `/decks/fake-work-fake-learning/zh`） | 18 份讲稿/课件页 |

首页锚点：`#superlinear` `#ask` `#conversations` `#judgment` `#thinking`（以及 `#works` / `#books`）。

## 交互

- 顶栏：中/英切换、更多下拉、移动端菜单、首页 overlay → 滚动变实、hero CTA 可见时隐藏顶栏加入按钮
- 首页：滚动显现（`.rv.pre` + IntersectionObserver）、判断时间线展开、问问立正表单（本地 mock）、城市点阵 Canvas 示意
- 嘉宾搜索过滤
- 站内链接由 wouter 接管（兼容 `GITHUB_PAGES=1` 的 `/lizheng-ai-clone/` base）

## 未能 1:1 还原（及原因）

1. **问问立正的真实检索回答**（`#ask` / ask.lizheng.ai）  
   依赖原站问答后端与公开问答流。复刻提供原站 UI 壳 + 本地示意回答，并链到 https://ask.lizheng.ai/。「别人在问什么」仍是原 SSR 占位，未接日更 ask sitemap 的接口。

2. **CityWindow 完整 WebGL 成员地图**  
   原站使用独立 chunk + WebGL2，并拉取约 833KB 的 `community/city.json` 成员图。复刻用 Canvas 点阵示意同一视觉区域（搜索框保留，完整地图仍链到 https://city.lizheng.ai/）。

3. **原站分片字体文件（约 200 个 hashed `.woff2`）**  
   未整包下载。标题字体家族与原站相同：Noto Serif SC、Source Serif 4（经 Google Fonts 加载），西文 UI 用 Geist Variable / Geist Mono（`@fontsource-variable`）。单字级 hinting / unicode-range 切片可能与原站略有差别。

4. **`/en/collab/creators`**  
   未单独抓英文 SSR；路由存在，正文暂复用中文创作者页。

5. **实验页** `/experiment/emil` `/experiment/vercel` 及 `/podcast` `/speaker` `/decks/0905` 等 bundle 内路由  
   不在 sitemap 的 225 页里，未做。

6. **Radix Popper 浮层实现细节**  
   「更多」菜单使用原站 `.lz-more-panel` 样式 + React state，视觉接近，但未引入完整 `@radix-ui` 定位引擎。

7. **部分内页图片**  
   首页与主要栏目用到的公开图已下载到 `public/`。嘉宾缩略图使用 YouTube 公开 hqdefault；个别文章/课件内的远程图仍指向原站 URL。

8. **统计数字的实时性**（如成员数 20,000+ / 城市图「88,888盏灯」文案）  
   按抓取当日首页文案静态写入，不会随原站数据接口变化。

## 对照说明

桌面/移动对比图：`reference-shots/`（原站）与 `compare-shots/`（复刻，含 `side-by-side/` 拼图）。视觉接近的依据是直接复用原站编译 CSS 与 SSR 标记结构。

Playwright（viewport 1440×900 / 390×844，等待 hero `.rise` 约 1.8s）对比：

- 首页桌面：与参考图逐字节一致；英文首页桌面亦一致。
- 首页移动：平均像素差约 0.04（肉眼不可辨）。移动端 `.lz-nav` 计算样式为 `display: none`，汉堡按钮可见。此前 `writing.css` 未加作用域的 `.bar nav { display:flex }` 曾盖过 `@media (max-width:1023px) .lz-nav { display:none }`，现已把 writing/book 样式限制在 `.lz-writing` / `.lz-book`。
- about / books 桌面与移动：平均像素差约 0.03–0.65，版式与文案对齐。
- guests 列表差异较大（桌面约 45、移动约 25）：列表用 open-context `guests.json` 重建，卡片排序/封面组合与原站 SSR 不完全相同，但沿用 `.lz-guests-*` 栅格与搜索框。详情页模板（如 `/guests/howie-xu`）含简介、社交链接与全部对谈缩略图。
- 另截：`decks` / `collab` / `zbs` / `for-agents` / `guest-detail` 桌面；布局与原站栏目文案一致。

本地预览（本次）：`npx vite preview --host 127.0.0.1 --port 4174`（4173 已被占用）。GitHub Pages 产物在 `docs/`（`base=/lizheng-ai-clone/`，含 `.nojekyll` 与 SPA `404.html`）。
