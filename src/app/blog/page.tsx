import { Suspense } from "react";
import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageWrap from "@/components/PageWrap";

export default async function BlogPage() {
  const posts = getAllPosts().map(({ content: _content, ...meta }) => meta);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageWrap className="py-12">
          <Suspense>
            <BlogList posts={posts} />
          </Suspense>
        </PageWrap>
      </main>
      <Footer />
    </div>
  );
}
