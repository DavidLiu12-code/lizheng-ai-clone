import { useLocation } from "wouter";
import { useCallback } from "react";

export function assetBase(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith("/") ? base : `${base}/`;
}

export function rebaseHtml(html: string): string {
  const base = import.meta.env.BASE_URL;
  if (!base || base === "/") return html;
  return html.replace(/(src|href)="\/(?!\/)/g, `$1="${base}`);
}

export function isInternalHref(href: string | null): boolean {
  if (!href) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (href.startsWith("http://") || href.startsWith("https://")) return false;
  if (href.startsWith("//")) return false;
  return href.startsWith("/") || href.startsWith("#") || !href.includes(":");
}

/** Convert an href from rebased HTML back to a wouter path (no base prefix). */
export function toWouterPath(href: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  let next = href;
  if (base && next.startsWith(base + "/")) next = next.slice(base.length);
  else if (base && next === base) next = "/";
  const hash = next.indexOf("#");
  const path = hash >= 0 ? next.slice(0, hash) : next;
  return path || "/";
}

export function useInternalNav() {
  const [, setLocation] = useLocation();
  return useCallback(
    (event: React.MouseEvent) => {
      const a = (event.target as HTMLElement).closest("a");
      if (!a) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!isInternalHref(href) || !href) return;
      if (href.startsWith("#")) return;
      const url = new URL(href, window.location.origin);
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      let path = url.pathname;
      if (base && path.startsWith(base + "/")) path = path.slice(base.length);
      else if (base && path === base) path = "/";
      // only intercept same-origin site paths
      if (!path.startsWith("/")) return;
      event.preventDefault();
      const next = url.hash ? `${path}${url.hash}` : path;
      setLocation(next || "/");
      if (url.hash) {
        requestAnimationFrame(() => {
          document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
        });
      } else {
        window.scrollTo({ top: 0 });
      }
    },
    [setLocation],
  );
}
