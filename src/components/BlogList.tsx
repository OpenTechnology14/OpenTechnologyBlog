"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { Category } from "@/data/content";

interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
}

const CATEGORIES_LIST = [
  "Dev Tools",
  "Managed Cloud Apps",
  "Workflow Management",
  "Device & Data",
] as const;

const categoryColors: Record<Category, string> = {
  "Dev Tools": "bg-primary/10 text-primary border-primary/20",
  "Managed Cloud Apps": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  "Workflow Management": "bg-ring/10 text-ring border-ring/20",
  "Device & Data": "bg-destructive/10 text-destructive border-destructive/20",
};

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const filtered =
    selectedCategory === "all"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="mt-1 text-muted-foreground">
            Articles on open-source tools, infra, and dev practices.
          </p>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by label" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES_LIST.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5 animate-fade-in no-underline"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <Badge
              variant="outline"
              className={`mb-3 w-fit text-xs ${categoryColors[post.category]}`}
            >
              {post.category}
            </Badge>
            <h2 className="mb-2 text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          No posts in this category yet.
        </div>
      )}
    </>
  );
}
