import { getHtml } from "../lib/content";
import { HtmlMain } from "./HtmlMain";
import type { Lang } from "../lib/i18n";

export function Footer({ lang }: { lang: Lang }) {
  const html = getHtml(lang === "en" ? "footer-en" : "footer-zh");
  return <HtmlMain html={html} />;
}
