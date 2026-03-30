import Link from "next/link";
import Image from "next/image";
import TechBullets from "@/components/TechBullets";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageWrap from "@/components/PageWrap";
import { getAllPosts } from "@/lib/blog";
import { CATEGORIES } from "@/data/content";

export default function Home() {
  const allPosts = getAllPosts();
  const sortedPosts = [...allPosts]
    .filter((p) => p.slug !== "brave-browser-workflow-management")
    .sort(
      (a, b) => CATEGORIES.indexOf(a.category as typeof CATEGORIES[number]) - CATEGORIES.indexOf(b.category as typeof CATEGORIES[number])
    );

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
              for building modern applications without vendor lock-in.{" "}
              I&apos;m available for a free consultation meeting to help you find the right open-source stack for your project.
            </p>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Link
                href="https://www.opentechnologyapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Image src="/icon.png" alt="" width={18} height={18} className="rounded-sm" />
                Try the App
              </Link>
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
            </div>
            <p className="mt-3 text-xs text-muted-foreground max-w-[400px]">
              Open Technology App is an item, task, and workflow management platform built entirely on the open-source stack covered in this blog.
            </p>

            <ul className="mt-4 space-y-1.5 text-sm text-left">
              {sortedPosts.map((post) => (
                <li key={post.slug} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:underline underline-offset-2 transition-colors"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
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
