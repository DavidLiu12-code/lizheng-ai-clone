import { Route, Router, Switch } from "wouter";
import { Toaster } from "sonner";
import { HomePage } from "./pages/HomePage";
import { StaticPage, HtmlFilePage } from "./pages/StaticPage";
import { GuestsPage } from "./pages/GuestsPage";
import { GuestDetailPage } from "./pages/GuestDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import extraPages from "./content/extra-pages.json";

const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

type Extra = { ok?: boolean; kind?: string; slug?: string; title?: string; file?: string };
const extras = extraPages as Extra[];

function extraTitle(kind: string, slug: string, fallback: string) {
  return extras.find((item) => item.kind === kind && item.slug === slug)?.title || fallback;
}

function WritingArticle({ slug }: { slug: string }) {
  return (
    <HtmlFilePage
      file={`writing-${slug}`}
      wrap="lz-writing"
      title={extraTitle("writing", slug, `${slug} · 孙煜征`)}
      lang="zh"
      chrome="writing"
    />
  );
}

function BookChapter({ slug }: { slug: string }) {
  return (
    <HtmlFilePage
      file={`book-${slug}`}
      wrap="lz-book"
      title={extraTitle("book", slug, `Growth Data Analytics Playbook · ${slug}`)}
      lang="zh"
      chrome="book"
    />
  );
}

function DeckPage({ slug }: { slug: string }) {
  const file = `deck-${slug.replace("/", "__")}`;
  return (
    <HtmlFilePage
      file={file}
      wrap="lz-site min-h-screen overflow-x-clip bg-lz-forest-3 text-zinc-100"
      title={extraTitle("deck", slug, slug)}
      lang="zh"
    />
  );
}

export function App() {
  return (
    <Router base={routerBase}>
      <Toaster position="top-center" />
      <Switch>
        <Route path="/">{() => <HomePage lang="zh" />}</Route>
        <Route path="/en">{() => <HomePage lang="en" />}</Route>
        <Route path="/about">{() => <StaticPage id="about" lang="zh" />}</Route>
        <Route path="/en/about">{() => <StaticPage id="en-about" lang="en" />}</Route>
        <Route path="/books">{() => <StaticPage id="books" lang="zh" />}</Route>
        <Route path="/en/books">{() => <StaticPage id="en-books" lang="en" />}</Route>
        <Route path="/decks/fake-work-fake-learning/zh">{() => <DeckPage slug="fake-work-fake-learning/zh" />}</Route>
        <Route path="/decks/:slug">{(params) => <DeckPage slug={params.slug} />}</Route>
        <Route path="/en/decks">{() => <StaticPage id="en-decks" lang="en" />}</Route>
        <Route path="/decks">{() => <StaticPage id="decks" lang="zh" />}</Route>
        <Route path="/collab/enterprise">{() => <StaticPage id="collab-enterprise" lang="zh" />}</Route>
        <Route path="/en/collab/enterprise">{() => <StaticPage id="en-collab-enterprise" lang="en" />}</Route>
        <Route path="/collab/creators">{() => <StaticPage id="collab-creators" lang="zh" />}</Route>
        <Route path="/collab">{() => <StaticPage id="collab" lang="zh" />}</Route>
        <Route path="/en/collab/creators">{() => <StaticPage id="collab-creators" lang="en" />}</Route>
        <Route path="/en/collab">{() => <StaticPage id="en-collab" lang="en" />}</Route>
        <Route path="/zbs">{() => <StaticPage id="zbs" lang="zh" />}</Route>
        <Route path="/for-agents">{() => <StaticPage id="for-agents" lang="zh" />}</Route>
        <Route path="/en/for-agents">{() => <StaticPage id="en-for-agents" lang="en" />}</Route>
        <Route path="/guests/:slug">{(params) => <GuestDetailPage slug={params.slug} />}</Route>
        <Route path="/guests">{() => <GuestsPage lang="zh" />}</Route>
        <Route path="/writing/statsig/:slug">{(params) => <WritingArticle slug={params.slug} />}</Route>
        <Route path="/writing/statsig">{() => <StaticPage id="writing-statsig" lang="zh" />}</Route>
        <Route path="/book/growth-data-analytics-playbook/:slug">{(params) => <BookChapter slug={params.slug} />}</Route>
        <Route path="/book/growth-data-analytics-playbook">{() => <StaticPage id="book-gdap" lang="zh" />}</Route>
        <Route>{() => <NotFoundPage />}</Route>
      </Switch>
    </Router>
  );
}
