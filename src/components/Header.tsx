import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandMark } from "./BrandMark";
import {
  COPY,
  HOME_NAV,
  JOIN_URL,
  MORE_NAV,
  SHOP_URL,
  type Lang,
  toChinesePath,
  toEnglishPath,
} from "../lib/i18n";

export function Header({
  lang,
  overlay = false,
}: {
  lang: Lang;
  overlay?: boolean;
}) {
  const [location, setLocation] = useLocation();
  const copy = COPY[lang];
  const [moreOpen, setMoreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [tinted, setTinted] = useState(false);
  const [heroJoinShown, setHeroJoinShown] = useState(overlay);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMoreOpen(false);
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!overlay) {
      setSolid(false);
      setTinted(false);
      setHeroJoinShown(false);
      return;
    }
    const onScroll = () => {
      const y = window.scrollY;
      setTinted(y > 10);
      setSolid(y > 72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const hero = document.querySelector("[data-hero-join]");
    const io = hero
      ? new IntersectionObserver(
          ([entry]) => setHeroJoinShown(entry.isIntersecting),
          { threshold: 0.35 },
        )
      : null;
    if (hero && io) io.observe(hero);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [overlay, location]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const home = copy.home;
  const headerClass = [
    "lz-header",
    lang === "en" ? "l-en" : "",
    overlay ? "is-overlay" : "",
    overlay && tinted && !solid ? "tinted" : "",
    overlay && solid ? "solid" : "",
    overlay && heroJoinShown && !solid ? "hero-join-shown" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const goHash = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setMoreOpen(false);
    setMenuOpen(false);
    if (location === home || location === `${home}/`) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setLocation(home);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const moreHref = (href: string) => (lang === "en" ? `/en${href}` : href);
  const langHref = lang === "en" ? toChinesePath(location) : toEnglishPath(location);
  const isCurrent = (href: string) => location === href || location === moreHref(href);

  return (
    <header className={headerClass}>
      <div className="bar">
        <Link href={home} className="lz-brand" aria-label={copy.brandLabel}>
          <BrandMark />
          <span>
            <b>{copy.name}</b>
            <small>{copy.alias}</small>
          </span>
        </Link>
        <nav className="lz-nav" aria-label={copy.navLabel}>
          {HOME_NAV.map((item) => (
            <a key={item.id} href={`${home}#${item.id}`} onClick={goHash(item.id)}>
              {item[lang]}
            </a>
          ))}
          <div className="lz-more" ref={moreRef}>
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-controls="lz-more-panel"
              onClick={() => setMoreOpen((v) => !v)}
            >
              {copy.more}
              <ChevronDown aria-hidden="true" />
            </button>
            {moreOpen && (
              <div id="lz-more-panel" className="lz-more-panel">
                {MORE_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={moreHref(item.href)}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                  >
                    {item[lang]}
                  </Link>
                ))}
                <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                  {lang === "en" ? "Shop" : "周边店"}
                  <span className="ext" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            )}
          </div>
        </nav>
        <div className="lz-actions">
          <Link
            href={langHref}
            hrefLang={lang === "zh" ? "en" : "zh-CN"}
            lang={lang === "zh" ? "en" : "zh"}
            aria-label={copy.switchLabel}
            className="lz-lang"
          >
            {lang === "zh" ? "EN" : "中文"}
          </Link>
          <a className="lz-join" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
            {copy.join}
          </a>
          <button
            type="button"
            className="lz-menu-button"
            aria-expanded={menuOpen}
            aria-controls="lz-menu"
            aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div id="lz-menu" className="lz-menu">
          <div className="inner">
            <nav aria-label={copy.homeGroup}>
              <p className="grp">{copy.homeGroup}</p>
              <ul>
                {HOME_NAV.map((item) => (
                  <li key={item.id}>
                    <a href={`${home}#${item.id}`} onClick={goHash(item.id)}>
                      {item[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label={copy.moreGroup}>
              <p className="grp">{copy.moreGroup}</p>
              <ul>
                {MORE_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={moreHref(item.href)}>{item[lang]}</Link>
                  </li>
                ))}
                <li>
                  <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                    {lang === "en" ? "Shop" : "周边店"}
                  </a>
                </li>
              </ul>
            </nav>
            <a className="lz-join" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
              {copy.join}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
