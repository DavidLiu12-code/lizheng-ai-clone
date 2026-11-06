import { rebaseHtml, useInternalNav } from "../lib/html";

export function HtmlMain({ html, className }: { html: string; className?: string }) {
  const onClick = useInternalNav();
  return (
    <div
      className={className}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: rebaseHtml(html) }}
    />
  );
}
