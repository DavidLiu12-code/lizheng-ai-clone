import { useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HtmlMain } from "../components/HtmlMain";
import { getHtml } from "../lib/content";
import { useHomeEnhance } from "../hooks/useHomeEnhance";
import type { Lang } from "../lib/i18n";

export function HomePage({ lang }: { lang: Lang }) {
  useHomeEnhance();
  const html = getHtml(lang === "en" ? "en-home" : "home");
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.title =
      lang === "en"
        ? "Yuzheng Sun (立正 / 课代表立正) — MAKE WHAT LASTS"
        : "立正（孙煜征，课代表立正）｜学点真本事，做点真东西";
  }, [lang]);
  return (
    <div className={lang === "en" ? "lz-home l-en" : "lz-home"} lang={lang === "en" ? "en" : "zh-CN"}>
      <Header lang={lang} overlay />
      <HtmlMain html={html} />
      <Footer lang={lang} />
    </div>
  );
}
