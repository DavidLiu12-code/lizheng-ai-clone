const htmlFiles = import.meta.glob("../content/*.html", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export function getHtml(name: string): string {
  const key = name.endsWith(".html") ? name : `${name}.html`;
  const match = Object.entries(htmlFiles).find(([path]) => path === `../content/${key}` || path.endsWith(`/${key}`));
  return match?.[1] ?? "";
}

export const PAGE_META: Record<
  string,
  { file: string; wrap: string; title: string; chrome: "standard" | "none" | "writing" | "book" }
> = {
  about: {
    file: "about",
    wrap: "lz-site min-h-screen bg-lz-forest-3 text-zinc-100",
    title: "课代表立正（孙煜征）· 人物简介",
    chrome: "standard",
  },
  "en-about": {
    file: "en-about",
    wrap: "lz-site min-h-screen bg-lz-forest-3 text-zinc-100 l-en",
    title: "Profile · Yuzheng Sun · 孙煜征",
    chrome: "standard",
  },
  books: {
    file: "books",
    wrap: "lz-site min-h-screen overflow-x-clip bg-lz-ivory text-lz-ink",
    title: "Feels Like Progress、Growth Data Analytics Playbook与《真本事》｜孙煜征的书",
    chrome: "standard",
  },
  "en-books": {
    file: "en-books",
    wrap: "lz-site min-h-screen overflow-x-clip bg-lz-ivory text-lz-ink l-en",
    title: "Feels Like Progress, Growth Data Analytics Playbook & Real Stuff · Yuzheng Sun",
    chrome: "standard",
  },
  decks: {
    file: "decks",
    wrap: "lz-site min-h-screen overflow-x-clip bg-lz-forest-3 text-zinc-100 selection:bg-superlinear selection:text-white",
    title: "企业AI培训与课件｜课代表立正（孙煜征）",
    chrome: "standard",
  },
  "en-decks": {
    file: "en-decks",
    wrap: "lz-site min-h-screen overflow-x-clip bg-lz-forest-3 text-zinc-100 selection:bg-superlinear selection:text-white l-en",
    title: "Enterprise AI Training & Strategic Briefings · Yuzheng Sun",
    chrome: "standard",
  },
  collab: {
    file: "collab",
    wrap: "lz-site relative min-h-screen overflow-x-clip bg-superlinear-canvas text-superlinear-ink",
    title: "合作 · 课代表立正",
    chrome: "standard",
  },
  "en-collab": {
    file: "en-collab",
    wrap: "lz-site relative min-h-screen overflow-x-clip bg-superlinear-canvas text-superlinear-ink l-en",
    title: "Collaborate with Yuzheng Sun · 课代表立正",
    chrome: "standard",
  },
  "collab-enterprise": {
    file: "collab-enterprise",
    wrap: "lz-site min-h-screen overflow-x-clip bg-lz-forest-3 text-zinc-100",
    title: "企业AI培训与定制项目｜课代表立正",
    chrome: "standard",
  },
  "en-collab-enterprise": {
    file: "en-collab-enterprise",
    wrap: "lz-site min-h-screen overflow-x-clip bg-lz-forest-3 text-zinc-100 l-en",
    title: "Enterprise AI training & custom programs · Yuzheng Sun",
    chrome: "standard",
  },
  "collab-creators": {
    file: "collab-creators",
    wrap: "lz-site min-h-screen overflow-x-clip bg-lz-forest-3 text-zinc-100",
    title: "一起做一期节目｜课代表立正·播客与视频合作",
    chrome: "standard",
  },
  zbs: {
    file: "zbs",
    wrap: "min-h-screen bg-[#0B0F1A] text-white relative",
    title: "《真本事：从会工作到会赚钱》· 孙煜征",
    chrome: "none",
  },
  "for-agents": {
    file: "for-agents",
    wrap: "product-guide",
    title: "超线性学院产品与资料指南｜AI Builders、Stay与免费社区",
    chrome: "standard",
  },
  "en-for-agents": {
    file: "en-for-agents",
    wrap: "product-guide l-en",
    title: "A field guide to Superlinear Academy",
    chrome: "standard",
  },
  "writing-statsig": {
    file: "writing-statsig",
    wrap: "lz-writing",
    title: "在Statsig写的文章（中文版）· 孙煜征",
    chrome: "writing",
  },
  "book-gdap": {
    file: "book-gdap",
    wrap: "lz-book",
    title: "Growth Data Analytics Playbook 中文版：免费在线读 · 孙煜征",
    chrome: "book",
  },
};
