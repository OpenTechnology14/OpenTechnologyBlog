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
import CollapsibleCode from "@/components/mdx/CollapsibleCode";
import ComplianceMatrix from "@/components/mdx/ComplianceMatrix";
import SecurityMatrix from "@/components/mdx/SecurityMatrix";
import CostSavings from "@/components/mdx/CostSavings";
import PikaPodsApps from "@/components/mdx/PikaPodsApps";
import PikaPodsSavings from "@/components/mdx/PikaPodsSavings";
import LogRetention from "@/components/mdx/LogRetention";
import AlertingConfig from "@/components/mdx/AlertingConfig";
import Callout from "@/components/mdx/Callout";
import AiPrompt from "@/components/mdx/AiPrompt";
import ToolFlow from "@/components/mdx/ToolFlow";
import StackAtAGlance from "@/components/mdx/StackAtAGlance";
import ContactForm from "@/components/ContactForm";
import React from "react";

function MdxTable(props: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 w-full overflow-x-auto rounded-lg border"
         style={{ borderColor: 'hsl(var(--border))' }}>
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  );
}

function MdxThead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className="border-b"
      style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--primary) / 0.08)' }}
      {...props}
    />
  );
}

function MdxTbody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

function MdxTr(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className="border-b last:border-b-0 transition-colors even:bg-[hsl(var(--muted)/0.4)]"
      style={{ borderColor: 'hsl(var(--border))' }}
      {...props}
    />
  );
}

function MdxTh(props: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="px-4 py-3 text-left font-semibold tracking-wide text-xs uppercase"
      style={{ color: 'hsl(var(--foreground))' }}
      {...props}
    />
  );
}

function MdxTd(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className="px-4 py-3 align-top"
      style={{ color: 'hsl(var(--foreground) / 0.85)' }}
      {...props}
    />
  );
}

const mdxComponents = {
  pre: CollapsibleCode,
  table: MdxTable,
  thead: MdxThead,
  tbody: MdxTbody,
  tr: MdxTr,
  th: MdxTh,
  td: MdxTd,
  Callout,
  AiPrompt,
  ToolFlow,
  StackAtAGlance,
};

const categoryColors: Record<Category, string> = {
  "App + API Dev": "bg-primary/10 text-primary border-primary/20",
  "App + API Hosting": "bg-accent/10 text-accent border-accent/20",
  "Workflow Management": "bg-ring/10 text-ring border-ring/20",
  "Asset Management": "bg-destructive/10 text-destructive border-destructive/20",
};

type VisualInjection = {
  heading: string;
  component: React.ReactNode;
  skipSection?: boolean;
};

type ContentPart = {
  content: string;
  after?: React.ReactNode;
};

// Split content at the first occurrence of `heading`, returning [before_incl_heading, rest]
function splitAtHeading(content: string, heading: string): [string, string] | null {
  const idx = content.indexOf(heading);
  if (idx === -1) return null;
  return [content.slice(0, idx + heading.length), content.slice(idx + heading.length)];
}

// Find the next section boundary (---, ##, ###) and split there
function splitAtNextSection(content: string): [string, string] {
  const patterns = [/\n---\n/, /\n## /, /\n### /];
  let earliest = -1;
  for (const pattern of patterns) {
    const match = pattern.exec(content.slice(1));
    if (match && match.index !== undefined) {
      const pos = match.index + 1;
      if (earliest === -1 || pos < earliest) earliest = pos;
    }
  }
  if (earliest === -1) return [content, ""];
  return [content.slice(0, earliest), content.slice(earliest)];
}

// Apply multiple injections in sequence, returning ordered content parts
function applyInjections(content: string, injections: VisualInjection[]): ContentPart[] {
  const parts: ContentPart[] = [];
  let remaining = content;

  for (const injection of injections) {
    const split = splitAtHeading(remaining, injection.heading);
    if (!split) continue;
    const [before, after] = split;
    let afterContent = after;
    if (injection.skipSection) {
      const [, rest] = splitAtNextSection(after);
      afterContent = rest;
    }
    parts.push({ content: before, after: injection.component });
    remaining = afterContent;
  }

  parts.push({ content: remaining });
  return parts;
}

// Slug → ordered list of visual injections
const SLUG_VISUALS: Record<string, VisualInjection[]> = {
  "fleet-wireguard-device-security-asset-management": [
    { heading: "## Compliance Control Mapping", component: <ComplianceMatrix />, skipSection: true },
    { heading: "## Log Retention by Framework", component: <LogRetention />, skipSection: true },
    { heading: "## Alerting Configuration", component: <AlertingConfig />, skipSection: true },
  ],
  "brave-browser-workflow-management": [
    { heading: "## Security Comparison", component: <SecurityMatrix />, skipSection: true },
  ],
  "digitalocean-rocket-chat-hosting": [
    { heading: "### Dramatic Cost Savings vs. SaaS Alternatives", component: <CostSavings />, skipSection: true },
  ],
  "pikapods-nextcloud-hosting": [
    { heading: "| App | Starting Price |", component: <PikaPodsApps />, skipSection: true },
    { heading: "### The Numbers Are Compelling", component: <PikaPodsSavings />, skipSection: true },
  ],
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const injections = SLUG_VISUALS[slug];
  const parts: ContentPart[] = injections
    ? applyInjections(post.content, injections)
    : [{ content: post.content }];

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
            <Badge
              variant="outline"
              className={`text-xs ${categoryColors[post.category]}`}
            >
              {post.category}
            </Badge>
          </div>

          <article className="prose prose-neutral dark:prose-invert max-w-none overflow-x-hidden w-full">
            {parts.map((part, i) => (
              <React.Fragment key={i}>
                {part.content && (
                  <MDXRemote source={part.content} components={mdxComponents} />
                )}
                {part.after}
              </React.Fragment>
            ))}
          </article>

          <div className="mt-16 max-w-md">
            <ContactForm />
          </div>
        </PageWrap>
      </main>
      <Footer />
    </div>
  );
}
