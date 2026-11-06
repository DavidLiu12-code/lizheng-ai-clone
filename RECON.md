# lizheng.ai 侦察报告

目标站：https://www.lizheng.ai/  
侦察时间：2026-11-06（Asia/Shanghai）

## 技术栈（有证据）

| 项 | 结论 | 证据 |
|---|---|---|
| 构建 | Vite | HTML `type="module"` + `/assets/index-*.js`；bundle 内 `__vite` / `vite` |
| UI 框架 | React 18+ | `createRoot`（`client-*.js` / 主 bundle） |
| 路由 | **wouter v3**（不是 React Router） | 主 bundle 含 `Symbol.for("wouter_v3")`、`window.__WOUTER_ROUTES__`；无 `createBrowserRouter` / `react-router` |
| 样式 | Tailwind CSS（含动画工具类） | `CityWindow-*.css` 大量 `--tw-*`、`--tw-enter-*` / `--tw-exit-*` |
| 无障碍/浮层 | Radix UI | `data-radix-popper-content-wrapper`；`radix-ui` 字符串 |
| 图标 | **lucide-react** | `x-RPYrCTAG.js` 含 `createLucideIcon` 模式、`className: n("lucide", …)`；HTML 有 `lucide lucide-chevron-down` / `lucide-menu` / `lucide-mail` |
| Toast | **sonner** | 主 bundle 出现 `sonner` 126 次；SSR 有 `aria-label="Notifications alt+T"` |
| 字体（标题） | **Noto Serif SC** + **Source Serif 4 Variable** | `fonts-Gl0BvC6K.css` 的 `@font-face`；token `--lz-serif-zh` / `--lz-serif-en` / `--lz-num` |
| 字体（西文 UI） | **Geist Variable** + **Geist Mono Variable** | `CityWindow-*.css` / `index-*.css` 的 `@font-face`；`--font-sans` / `--font-mono` |
| 中文无衬线 | 系统字体 PingFang SC / Microsoft YaHei | `--lz-sans-zh` |
| 特殊模块 | CityWindow | 独立 lazy chunk `CityWindow-*.js/css` |
| Ask 能力 | 外部 ask.lizheng.ai | robots 指向 `ask.lizheng.ai`；日更 ask sitemap |

## 未检出（主 bundle 字符串扫描）

- Framer Motion / `motion/react`
- GSAP / ScrollTrigger
- Aceternity / Magic UI 包名
- 显式 `shadcn` 字面量（但 Radix + Tailwind + cva 风格常见于 shadcn 体系）

## 相关开源

- https://github.com/sunyuzheng/lizheng-open-context — 公开上下文（帖子/公理/真本事等），**不是**站点前端源码。

## 资源指纹（首页）

- `/assets/index-dce2JSrJ.js`（~937KB）
- `/assets/index-BaDp8EeZ.css`
- `/assets/CityWindow-YiMFqqnz.css` + `CityWindow-qdGblRGF.js`
- `/assets/client-D6DYtmJw.js`
- `/assets/fonts-Gl0BvC6K.css`
- OG 图：`/lizheng-og.png`

## 复刻选型

Vite + React + TypeScript + **wouter** + Tailwind（沿用原站编译后的 site.css，含 `--tw-*` 与 `--lz-*` tokens）+ lucide-react + sonner。动画为原站 CSS（`lz-rise` / `.rv.pre` + IntersectionObserver），未安装 Framer Motion / GSAP / shadcn / Aceternity / Magic UI。


## 补充证据（2026-11-06 续查）

### 构建与运行时
- HTML：`type="module"`、`modulepreload`、hashed `/assets/index-*.js` → Vite
- `data-ssr="true"` + `hydrateRoot`：部分页面服务端预渲染后再 hydration
- CityWindow 独立 chunk：`CityWindow-qdGblRGF.js` + `CityWindow-YiMFqqnz.css`；社区点阵数据来自 `https://kwicxc1px65aokwa.public.blob.vercel-storage.com/community/city.json`（约 833KB）+ WebGL2（`getContext("webgl2")`）

### 样式方案
- 主 CSS `CityWindow-YiMFqqnz.css`（~177KB）= **Tailwind v4 编译产物**（`@layer properties`、`--tw-enter-*` / `--tw-exit-*`）+ 大量自定义类（`.lz-home` `.lz-header` `.hero` `.grain` `.marquee` `.lz-guests` `.product-guide`）
- 页面同时出现 Tailwind 工具类：`bg-lz-green/[0.06]`、`text-superlinear-ink`、`border-lz-green/20`、`hover:text-superlinear-deep`
- 设计 token（节选）：
  - `--lz-green: #238343`；`--lz-ivory: #f8f5ee`；`--lz-ink: #121613`
  - `--color-superlinear: #238343`；`--color-superlinear-canvas: #fbf9f5`；`--color-superlinear-ink: #17151d`
  - `--lz-forest: #0f3d23`；`--lz-wrap: 1200px`；`--lz-header-h: 68px`

### 动画（纯 CSS + IO，不是动画库）
- `@keyframes lz-rise`：`0%{opacity:0;transform:translateY(18px)}`，`.rise{animation:.9s cubic-bezier(.2,.7,.2,1) both lz-rise}`
- `.rv.pre{transform:translateY(18px)}`；JS `querySelectorAll(".rv")` + `IntersectionObserver`（`rootMargin: 0px 0px -6% 0px`）去掉 `pre`
- 其它：`lz-mark-in`、`lz-rise-portrait`、`lz-live-dot`、`lz-lift`、`lz-guests-shimmer`

### 未检出（再次确认）
- Framer Motion / `motion/react` / GSAP / ScrollTrigger
- Aceternity、Magic UI
- `shadcn` 字面量（但存在 Radix Primitive + `data-radix-popper-content-wrapper` + shadcn 风格 `--sidebar-*` / `--chart-*` token；下拉「更多」用 Radix popper）
- React Router（路由库是 wouter）

### 组件库决策
| 库 | 原站 | 复刻 |
|---|---|---|
| wouter | 是 | 安装同一库 |
| lucide-react | 是 | 安装同一库 |
| sonner | 是 | 安装同一库 |
| Tailwind | 是（编译进 CSS） | 直接复用原站编译 CSS，保证 class 与视觉一致 |
| Radix | 少量（popper/「更多」菜单） | 用同一套 `.lz-more-panel` CSS + 本地 state 还原，不另装整套 shadcn |
| Framer Motion / GSAP | 否 | 不安装 |

### 数据来源
- 嘉宾目录：https://github.com/sunyuzheng/lizheng-open-context `catalog/guests.json`（157 位、411 期对谈）
- 该仓库是公开上下文，不是站点前端源码
