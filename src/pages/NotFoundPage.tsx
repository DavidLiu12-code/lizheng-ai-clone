import { Link } from "wouter";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function NotFoundPage() {
  return (
    <div className="lz-site min-h-screen bg-lz-ivory text-lz-ink">
      <Header lang="zh" />
      <main className="lz-notfound">
        <div>
          <h1>没有找到这一页</h1>
          <p>回到首页，或从导航进入栏目。</p>
          <p style={{ marginTop: 18 }}>
            <Link href="/" className="lz-link">
              回到首页 <i aria-hidden="true">→</i>
            </Link>
          </p>
        </div>
      </main>
      <Footer lang="zh" />
    </div>
  );
}
