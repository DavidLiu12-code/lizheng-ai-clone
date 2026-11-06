import { useEffect } from "react";
import { Link } from "wouter";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import guests from "../data/guests.json";
import type { Lang } from "../lib/i18n";

export function GuestDetailPage({ slug, lang = "zh" }: { slug: string; lang?: Lang }) {
  const guest = (guests as typeof guests).find((g) => g.slug === slug);
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.title = guest ? `${guest.name} · 课代表立正` : "嘉宾 · 课代表立正";
  }, [guest, lang]);

  if (!guest) {
    return (
      <div className="lz-site lz-guests relative min-h-screen">
        <Header lang={lang} />
        <main className="lz-notfound">
          <div>
            <h1>没有找到这位嘉宾</h1>
            <p>
              <Link href="/guests">回到嘉宾列表</Link>
            </p>
          </div>
        </main>
      </div>
    );
  }

  const featured = guest.videos.find((v) => v.primary) || guest.videos[0];

  return (
    <div className={lang === "en" ? "lz-site lz-guests relative min-h-screen l-en" : "lz-site lz-guests relative min-h-screen"}>
      <Header lang={lang} />
      <main className="relative z-10">
        <section className="lz-guests-stage">
          <div className="wrap">
            <Link href="/guests" className="lz-guest-back">
              {lang === "en" ? "← All guests" : "← 全部嘉宾"}
            </Link>
            <div className="lz-guest-head">
              <div>
                <h1>{guest.name}</h1>
                <p className="lz-guest-facts">
                  {[guest.enName, guest.company, guest.title].filter(Boolean).join(" · ")}
                </p>
                {guest.intro ? <p className="lz-guest-introduction">{guest.intro}</p> : null}
                <div className="lz-guest-actions">
                  {featured?.url ? (
                    <a className="lz-guest-watch" href={featured.url} target="_blank" rel="noopener noreferrer">
                      {lang === "en" ? "Watch" : "观看对谈"}
                    </a>
                  ) : null}
                  <Link className="lz-guest-ask" href="/#ask">
                    {lang === "en" ? "Ask Lizheng" : "问问立正"}
                  </Link>
                </div>
                <div className="lz-guest-links">
                  {guest.linkedin ? (
                    <a href={guest.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  ) : null}
                  {guest.xiaohongshu ? (
                    <a href={guest.xiaohongshu} target="_blank" rel="noopener noreferrer">
                      小红书
                    </a>
                  ) : null}
                </div>
              </div>
              {featured ? (
                <a className="lz-guest-featured" href={featured.url || "#"} target="_blank" rel="noopener noreferrer">
                  <img src={featured.thumbnail || guest.thumbnail} alt="" />
                  <span className="lz-guest-featured-title">{featured.title}</span>
                  <span className="lz-guest-featured-meta">{featured.published}</span>
                </a>
              ) : null}
            </div>
          </div>
        </section>
        <section className="lz-guest-section wrap" style={{ padding: "48px var(--lz-gut) 96px" }}>
          <h2>{lang === "en" ? "All conversations (newest first)" : "全部对谈（按时间从新到旧）"}</h2>
          <ul className="lz-guests-grid" style={{ marginTop: 28 }}>
            {[...guest.videos]
              .sort((a, b) => (b.published || "").localeCompare(a.published || ""))
              .map((v) => (
                <li key={`${v.video_id}-${v.title}`}>
                  <a className="lz-guest" href={v.url || "#"} target="_blank" rel="noopener noreferrer">
                    <span className="lz-guest-thumb">
                      <img src={v.thumbnail || guest.thumbnail} alt="" loading="lazy" />
                    </span>
                    <b className="lz-guest-name">{v.title}</b>
                    <span className="lz-guest-meta">{v.published}</span>
                  </a>
                </li>
              ))}
          </ul>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
