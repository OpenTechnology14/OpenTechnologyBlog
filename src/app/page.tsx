import Link from "next/link";
import TechBullets from "@/components/TechBullets";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageWrap from "@/components/PageWrap";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="border-b border-border/50 bg-gradient-to-b from-background to-muted/30">
          <PageWrap className="pt-14 pb-12 flex flex-col items-center text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-foreground mb-4 leading-[1.1]">
              Open Technology
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[480px] mb-7">
              Exploring the open-source ecosystem — tools, frameworks, and infrastructure
              for building modern applications without vendor lock-in.
            </p>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              >
                Read the blog
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <a
                href="#tools"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.98]"
              >
                Browse tools
              </a>
            </div>
          </PageWrap>
        </div>

        {/* ── Tool Grid ────────────────────────────────────────────── */}
        <div id="tools">
          <PageWrap className="py-12">
            <TechBullets />
          </PageWrap>
        </div>

        {/* ── Divider ──────────────────────────────────────────────── */}
        <div className="border-t border-border/50" />

        {/* ── Contact ──────────────────────────────────────────────── */}
        <PageWrap className="py-14 flex flex-col items-center">
          <div className="w-full max-w-md">
            <ContactForm />
          </div>
        </PageWrap>
      </main>

      <Footer />
    </div>
  );
}
