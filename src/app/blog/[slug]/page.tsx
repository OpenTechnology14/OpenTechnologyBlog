import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageWrap from "@/components/PageWrap";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Category } from "@/data/content";

const categoryColors: Record<Category, string> = {
  "App + API Dev": "bg-primary/10 text-primary border-primary/20",
  "App + API Hosting": "bg-accent/10 text-accent border-accent/20",
  "Workflow Management": "bg-ring/10 text-ring border-ring/20",
  "Asset Management": "bg-destructive/10 text-destructive border-destructive/20",
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageWrap className="py-12" style={{ maxWidth: '48rem' }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <Badge
            variant="outline"
            className={`mb-4 text-xs ${categoryColors[post.category]}`}
          >
            {post.category}
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </article>
        </PageWrap>
      </main>
      <Footer />
    </div>
  );
}
