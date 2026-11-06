export type Lang = "zh" | "en";

export function langFromPath(path: string): Lang {
  return path === "/en" || path.startsWith("/en/") ? "en" : "zh";
}

export function toEnglishPath(path: string): string {
  if (path === "/" || path === "") return "/en";
  if (path.startsWith("/en")) return path;
  const paired = new Set([
    "/about",
    "/books",
    "/collab",
    "/collab/creators",
    "/collab/enterprise",
    "/decks",
    "/for-agents",
  ]);
  if (paired.has(path)) return `/en${path}`;
  return "/en";
}

export function toChinesePath(path: string): string {
  if (path === "/en" || path === "/en/") return "/";
  if (path.startsWith("/en/")) return path.slice(3);
  return path;
}

export const COPY = {
  zh: {
    name: "孙煜征",
    alias: "课代表立正",
    brandLabel: "孙煜征 · 课代表立正，回到首页",
    navLabel: "主导航",
    more: "更多",
    join: "免费加入社区",
    menuOpen: "打开菜单",
    menuClose: "关闭菜单",
    homeGroup: "首页",
    moreGroup: "更多",
    switchLabel: "Switch to English",
    home: "/",
  },
  en: {
    name: "Yuzheng Sun",
    alias: "立正",
    brandLabel: "Yuzheng Sun · 立正, back to the homepage",
    navLabel: "Main",
    more: "More",
    join: "Join free",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    homeGroup: "Homepage",
    moreGroup: "More",
    switchLabel: "切换到中文",
    home: "/en",
  },
} as const;

export const HOME_NAV = [
  { id: "superlinear", zh: "超线性学院", en: "Academy" },
  { id: "ask", zh: "问问立正", en: "Ask Lizheng" },
  { id: "conversations", zh: "对话", en: "Conversations" },
  { id: "judgment", zh: "判断", en: "Calls" },
  { id: "thinking", zh: "文章", en: "Writing" },
] as const;

export const MORE_NAV = [
  { href: "/about", zh: "关于我", en: "About" },
  { href: "/books", zh: "书", en: "Books" },
  { href: "/decks", zh: "演讲资料", en: "Talks & slides" },
  { href: "/collab", zh: "合作", en: "Collaborate" },
  { href: "/for-agents", zh: "产品与资料指南", en: "Products & resources" },
] as const;

export const JOIN_URL = "https://www.superlinear.academy/";
export const SHOP_URL = "https://shop.lizheng.ai/";
