import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Category } from "@/data/content";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        category: data.category as Category,
        date: data.date,
        readTime: data.readTime,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
