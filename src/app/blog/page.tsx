import { Suspense } from "react";
import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function BlogPage() {
  const posts = getAllPosts().map(({ content: _content, ...meta }) => meta);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="page-wrap py-12">
          <Suspense>
            <BlogList posts={posts} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
