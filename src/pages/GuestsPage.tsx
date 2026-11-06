import { useMemo, useState, useEffect } from "react";
import { Link } from "wouter";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import guests from "../data/guests.json";
import type { Lang } from "../lib/i18n";

type Guest = (typeof guests)[number];

export function GuestsPage({ lang = "zh" as Lang }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.title = lang === "en" ? "Guests · 课代表立正" : "嘉宾与对谈 · 课代表立正 — 157位嘉宾，411期对谈";
  }, [lang]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return guests as Guest[];
    return (guests as Guest[]).filter((g) => {
      const blob = [g.name, g.enName, g.company, g.title, g.intro, g.slug].filter(Boolean).join(" ").toLowerCase();
      return blob.includes(needle);
    });
  }, [q]);

  return (
    <div className={lang === "en" ? "lz-site lz-guests relative min-h-screen l-en" : "lz-site lz-guests relative min-h-screen"}>
      <Header lang={lang} />
      <main className="relative z-10">
        <section className="lz-guests-stage">
          <div className="wrap">
            <h1 className="lz-guests-title">{lang === "en" ? "Guests & conversations" : "嘉宾与对谈"}</h1>
            <p className="lz-guests-lede">
              {lang === "en"
                ? "157 guests and 411 conversations since 2020, searchable by name, company, or topic."
                : "课代表立正的嘉宾与对谈：157位嘉宾、411期对谈，可按名字、公司或话题查找。"}
            </p>
            <div className="lz-guests-search">
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={lang === "en" ? "Search by name, company, or topic" : "按名字、公司或话题查找"}
                aria-label={lang === "en" ? "Search guests" : "搜索嘉宾"}
              />
              <button type="button" onClick={() => setQ("")}>
                {q ? (lang === "en" ? "Clear" : "清除") : lang === "en" ? "Search" : "搜索"}
              </button>
            </div>
          </div>
        </section>
        <div className="lz-guests-body wrap">
          <p className="lz-guests-found">
            {lang === "en" ? `${filtered.length} guests` : `找到 ${filtered.length} 位嘉宾`}
          </p>
          {filtered.length === 0 ? (
            <p className="lz-guests-empty">{lang === "en" ? "No matches." : "没有符合条件的嘉宾。"}</p>
          ) : (
            <ul className="lz-guests-grid">
              {filtered.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guests/${g.slug}`} className="lz-guest">
                    <span className="lz-guest-thumb">
                      <img src={g.thumbnail} alt="" width={320} height={180} loading="lazy" />
                    </span>
                    <b className="lz-guest-name">{g.name}</b>
                    <span className="lz-guest-intro">{[g.company, g.title].filter(Boolean).join(" · ") || g.intro}</span>
                    <span className="lz-guest-meta">
                      {lang === "en" ? `${g.talks} conversations` : `${g.talks}期对谈`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <p className="lz-guests-credit wrap">
        <span>
          {lang === "en"
            ? "Interview videos © their rights holders. Guest catalog from lizheng-open-context."
            : "访谈视频版权归权利人所有。嘉宾名录来自 lizheng-open-context 公开目录。"}
        </span>
      </p>
      <Footer lang={lang} />
    </div>
  );
}
