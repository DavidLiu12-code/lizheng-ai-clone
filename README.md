# lizheng.ai 复刻

本地可运行、并可导出为 GitHub Pages 静态预览的 [lizheng.ai](https://www.lizheng.ai/) 复刻。

技术栈与原站对齐：Vite + React + TypeScript + **wouter** + lucide-react + sonner，样式使用原站编译后的 CSS（Tailwind tokens + `.lz-*` 自定义类）。未安装 Framer Motion / GSAP / React Router / shadcn / Aceternity / Magic UI。

## 本地运行

```bash
npm install
npm run dev
```

默认地址：http://localhost:5173/

生产构建：

```bash
npm run build
npm run preview
```

## GitHub Pages 预览

```bash
GITHUB_PAGES=1 npm run build
```

会输出到 `docs/`，`base` 为 `/lizheng-ai-clone/`，并生成 `.nojekyll` 与 `404.html`（SPA 回退）。

预览地址（Pages 开启后）：`https://<user>.github.io/lizheng-ai-clone/`

## 文档

- `RECON.md` — 技术栈与库证据
- `PAGES.md` — 原站 225 条路由清单
- `DELIVERABLE.md` — 交付页、运行方式、未能 1:1 还原的项
