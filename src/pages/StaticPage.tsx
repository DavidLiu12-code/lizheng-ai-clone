import { useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HtmlMain } from "../components/HtmlMain";
import { PAGE_META, getHtml } from "../lib/content";
import type { Lang } from "../lib/i18n";

export function StaticPage({ id, lang }: { id: string; lang: Lang }) {
  const meta = PAGE_META[id];
  const html = meta ? getHtml(meta.file) : "";
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    if (meta) document.title = meta.title;
  }, [lang, meta]);
  if (!meta) return null;
  const body = <HtmlMain html={html} />;
  if (meta.chrome === "none" || meta.chrome === "writing" || meta.chrome === "book") {
    return <div className={meta.wrap}>{body}</div>;
  }
  return (
    <div className={meta.wrap}>
      <Header lang={lang} />
      {body}
      <Footer lang={lang} />
    </div>
  );
}

export function HtmlFilePage({
  file,
  wrap,
  title,
  lang,
  chrome = "standard",
}: {
  file: string;
  wrap: string;
  title: string;
  lang: Lang;
  chrome?: "standard" | "none" | "writing" | "book";
}) {
  const html = getHtml(file);
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.title = title;
  }, [lang, title]);
  const body = html ? (
    <HtmlMain html={html} />
  ) : (
    <main className="lz-notfound">
      <div>
        <h1>尚未抓到这一页的正文</h1>
        <p>路由已接通，原文请到 lizheng.ai 查看。</p>
      </div>
    </main>
  );
  if (chrome === "none" || chrome === "writing" || chrome === "book") {
    return <div className={wrap}>{body}</div>;
  }
  return (
    <div className={wrap}>
      <Header lang={lang} />
      {body}
      <Footer lang={lang} />
    </div>
  );
}
