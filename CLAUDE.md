# CLAUDE.md — Open Technology Blog (Next.js Rebuild)

This file is a complete specification for rebuilding the **Open Technology** blog as a
fresh Next.js project. Follow every section in order. Do not skip steps.

---

## Project Summary

A minimal, dark-mode-capable blog and landing page for an open-source technology brand
called **Open Technology**. The site has:

- A **home page** with a site intro, categorized tech-tool icon grid, and a contact form
- A **blog listing page** with category filtering
- **Individual blog post pages** rendered from MDX files
- A sticky header with a hamburger dropdown nav and dark/light theme toggle
- Full design system built on Tailwind + shadcn/ui

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Components | shadcn/ui (Radix UI) |
| Content | MDX files via `gray-matter` + `next-mdx-remote` |
| Icons | lucide-react |
| Notifications | sonner |
| Fonts | Google Fonts — Space Grotesk + JetBrains Mono |

---

## Bootstrap Commands

```bash
npx create-next-app@latest open-technology --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd open-technology
npx shadcn@latest init
# When prompted: style=Default, base color=Slate, CSS variables=yes

# Install shadcn components
npx shadcn@latest add button badge card input textarea select dropdown-menu tooltip

# Install additional deps
npm install lucide-react sonner gray-matter next-mdx-remote
npm install --save-dev @tailwindcss/typography
```

---

## Directory Structure to Create

```
open-technology/
├── content/
│   └── blog/
│       ├── app-idea-development-nextjs-workflow.mdx
│       ├── brave-browser-workflow-management.mdx
│       ├── digitalocean-rocket-chat-hosting.mdx
│       ├── fleet-wireguard-device-security-asset-management.mdx
│       ├── ai-table-asset-management.mdx
│       └── pikapods-nextcloud-hosting.mdx
├── public/
│   └── logos/             ← copy all SVG/PNG logos from original project
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← RootLayout with providers
│   │   ├── page.tsx               ← Home page
│   │   ├── not-found.tsx          ← 404
│   │   ├── blog/
│   │   │   ├── page.tsx           ← Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx       ← Individual post
│   │   └── globals.css            ← Design tokens + Tailwind
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── TechBullets.tsx
│   │   └── ContactForm.tsx
│   ├── data/
│   │   └── content.ts             ← TECH_TOOLS array + types
│   └── lib/
│       ├── blog.ts                ← MDX file reader helpers
│       └── utils.ts               ← cn() utility
```

---

## Design System

### globals.css

Replace the default `globals.css` with this exactly:

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 220 20% 97%;
    --foreground: 220 25% 10%;
    --card: 0 0% 100%;
    --card-foreground: 220 25% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 220 25% 10%;
    --primary: 215 90% 52%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 15% 92%;
    --secondary-foreground: 220 25% 15%;
    --muted: 220 15% 94%;
    --muted-foreground: 220 10% 46%;
    --accent: 165 70% 42%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 220 15% 88%;
    --input: 220 15% 88%;
    --ring: 215 90% 52%;
    --radius: 0.625rem;
    --gradient-brand: linear-gradient(135deg, hsl(215 90% 52%), hsl(165 70% 42%));
    --shadow-card: 0 1px 3px 0 hsl(220 25% 10% / 0.06), 0 1px 2px -1px hsl(220 25% 10% / 0.06);
    --shadow-card-hover: 0 10px 30px -8px hsl(215 90% 52% / 0.15);
  }

  .dark {
    --background: 222 30% 8%;
    --foreground: 210 20% 92%;
    --card: 222 25% 12%;
    --card-foreground: 210 20% 92%;
    --popover: 222 25% 12%;
    --popover-foreground: 210 20% 92%;
    --primary: 215 90% 58%;
    --primary-foreground: 0 0% 100%;
    --secondary: 222 20% 18%;
    --secondary-foreground: 210 20% 85%;
    --muted: 222 20% 16%;
    --muted-foreground: 215 15% 55%;
    --accent: 165 70% 48%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 222 20% 18%;
    --input: 222 20% 18%;
    --ring: 215 90% 58%;
    --gradient-brand: linear-gradient(135deg, hsl(215 90% 58%), hsl(165 70% 48%));
    --shadow-card: 0 1px 3px 0 hsl(0 0% 0% / 0.2);
    --shadow-card-hover: 0 10px 30px -8px hsl(215 90% 58% / 0.25);
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground font-body antialiased; }
  h1, h2, h3, h4, h5, h6 { @apply font-heading; }
  code, pre { @apply font-mono; }
}

@layer utilities {
  .gradient-brand { background: var(--gradient-brand); }
  .shadow-card { box-shadow: var(--shadow-card); }
  .shadow-card-hover { box-shadow: var(--shadow-card-hover); }
}
```

### tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.mdx"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
```

---

## Data Layer

### src/data/content.ts

This file holds structured data (tool icons, categories). Blog posts live in MDX files instead.

```ts
export const CATEGORIES = [
  "App + API Dev",
  "App + API Hosting",
  "Workflow Management",
  "Asset Management",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface TechTool {
  name: string;
  icon: string;       // emoji fallback
  logo?: string;      // path under /public/logos/
  category: Category;
  url?: string;
}

export const TECH_TOOLS: TechTool[] = [
  { name: "Penpot",      icon: "🎨", logo: "/logos/penpot.svg",      category: "App + API Dev",        url: "https://penpot.app" },
  { name: "DeepSeek",    icon: "🔍", logo: "/logos/deepseek.png",    category: "App + API Dev",        url: "https://deepseek.com" },
  { name: "Claude",      icon: "🤖", logo: "/logos/claude.svg",      category: "App + API Dev",        url: "https://claude.ai" },
  { name: "OpenAI",      icon: "🧠", logo: "/logos/openai.svg",      category: "App + API Dev",        url: "https://openai.com" },
  { name: "VS Code",     icon: "💻", logo: "/logos/vscode.svg",      category: "App + API Dev",        url: "https://code.visualstudio.com" },
  { name: "Codesandbox", icon: "📦", logo: "/logos/codesandbox.svg", category: "App + API Dev",        url: "https://codesandbox.io" },
  { name: "Gitlab",      icon: "🦊", logo: "/logos/gitlab.svg",      category: "App + API Hosting",    url: "https://gitlab.com" },
  { name: "GitHub",      icon: "🐙", logo: "/logos/github.svg",      category: "App + API Hosting",    url: "https://github.com" },
  { name: "Supabase",    icon: "⚡", logo: "/logos/supabase.svg",    category: "App + API Hosting",    url: "https://supabase.com" },
  { name: "Vercel",      icon: "▲",  logo: "/logos/vercel.svg",      category: "App + API Hosting",    url: "https://vercel.com" },
  { name: "Pika Pods",   icon: "🫛",                                  category: "App + API Hosting",    url: "https://pikapods.com" },
  { name: "Google",      icon: "🔵", logo: "/logos/google.svg",      category: "App + API Hosting",    url: "https://cloud.google.com" },
  { name: "AWS",         icon: "☁️", logo: "/logos/aws.svg",         category: "App + API Hosting",    url: "https://aws.amazon.com" },
  { name: "Microsoft",   icon: "🪟", logo: "/logos/microsoft.svg",   category: "App + API Hosting",    url: "https://azure.microsoft.com" },
  { name: "Brave",       icon: "🦁", logo: "/logos/brave.svg",       category: "Workflow Management",  url: "https://brave.com" },
  { name: "Bitwarden",   icon: "🔐", logo: "/logos/bitwarden.svg",   category: "Workflow Management",  url: "https://bitwarden.com" },
  { name: "Plane",       icon: "✈️", logo: "/logos/plane.png",       category: "Workflow Management",  url: "https://plane.so" },
  { name: "Ai Table",    icon: "📊", logo: "/logos/aitable.png",     category: "Workflow Management",  url: "https://aitable.ai" },
  { name: "Rocket Chat", icon: "🚀", logo: "/logos/rocketchat.svg",  category: "Workflow Management",  url: "https://rocket.chat" },
  { name: "Nextcloud",   icon: "☁️", logo: "/logos/nextcloud.svg",   category: "Asset Management",     url: "https://nextcloud.com" },
  { name: "Metabase",    icon: "📈", logo: "/logos/metabase.svg",    category: "Asset Management",     url: "https://metabase.com" },
  { name: "Wireguard",   icon: "🔒", logo: "/logos/wireguard.svg",   category: "Asset Management",     url: "https://wireguard.com" },
  { name: "Fleet",       icon: "🖥️", logo: "/logos/fleet.png",       category: "Asset Management",     url: "https://fleetdm.com" },
];
```

---

## Content Layer — Blog Posts as MDX Files

### src/lib/blog.ts

This helper reads all `.mdx` files from `/content/blog/` at build time.

```ts
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
```

### MDX Frontmatter Format

Every file in `/content/blog/*.mdx` must start with this frontmatter block:

```mdx
---
title: "Post Title Here"
excerpt: "One-sentence description of the post."
category: "App + API Dev"
date: "2026-02-26"
readTime: "8 min"
---

## Your markdown content starts here
```

Valid `category` values: `App + API Dev` | `App + API Hosting` | `Workflow Management` | `Asset Management`

---

## MDX Blog Post Files to Create

Create all six files in `/content/blog/`. Frontmatter goes at the top of each file, followed by the body verbatim.

### content/blog/app-idea-development-nextjs-workflow.mdx

```mdx
---
title: "App Idea Development: From Concept to Hosted Application"
excerpt: "A structured workflow for developing an app idea using Next.js templates, AI tooling, VS Code, and Git-based hosting."
category: "App + API Dev"
date: "2026-02-26"
readTime: "8 min"
---

## Phase 1 — Idea Formation

Start with:

- Problem definition
- Target user identification
- Core value proposition
- Monetization hypothesis

Sketch UI ideas using:

- Wireframes
- Simple diagrams
- Feature lists

## Using AI to Refine the Idea

AI tools can help:

- Improve product descriptions
- Identify edge cases
- Suggest feature prioritization
- Generate UX flows
- Create initial documentation

AI can assist with:

- Naming
- Taglines
- Landing page copy
- Validation questions

## Phase 2 — Selecting a Next.js Template

Look for templates that include:

- Authentication
- Blog or CMS integration
- Dashboard layout
- Tailwind styling
- API route structure

Evaluate templates based on:

- Folder clarity
- Scalability
- Maintainability
- Deployment compatibility

## Phase 3 — Development Environment Setup

Using VS Code:

- Open project folder
- Install dependencies
- Run local development server
- Test page routing
- Modify components

Common workflow:

- Edit page
- Save file
- Browser auto-refresh
- Validate UI change

## Data Layer Planning

Define:

- Core entities
- Relationships
- Data validation logic
- Access control rules

Keep structure consistent between:

- UI forms
- Database schema
- Server-side logic

## Phase 4 — Hosting Strategy

Git-based workflow:

- Push to GitHub or GitLab
- Enable automatic deployments
- Configure environment variables
- Set production domain

Benefits:

- Version control
- Rollback capability
- Team collaboration
- Continuous deployment

## Ongoing Iteration

After launch:

- Track usage
- Refine features
- Improve performance
- Expand documentation
- Add automation

## Why This Workflow Works

- Idea clarity before coding
- Structured development phases
- Git-based content management
- Scalable hosting approach
- Repeatable product development system
```

### content/blog/brave-browser-workflow-management.mdx

```mdx
---
title: "Brave Browser: Workflow Management for Technical Teams"
excerpt: "How Brave can be structured into a secure, segmented, high-performance workflow environment for modern teams."
category: "Workflow Management"
date: "2026-02-26"
readTime: "6 min"
---

## Why Browser Workflow Matters

Your browser is:

- Your dashboard
- Your admin panel
- Your communication hub
- Your research environment

Optimizing it improves:

- Speed
- Focus
- Security
- Session organization

## Performance Benefits

Brave provides:

- Built-in ad and tracker blocking
- Faster page load times
- Reduced background scripts
- Lower memory usage

This leads to:

- Faster dashboards
- Smoother SaaS usage
- Reduced cognitive load

## Workspace Segmentation

Use Brave profiles to separate:

- Development work
- Infrastructure administration
- Personal browsing
- Client environments

Benefits:

- Cookie isolation
- Reduced cross-account conflicts
- Clear workspace boundaries
- Safer production access

## Extension-Based Workflow Control

Enhance workflow with:

- Password managers
- Session managers
- Note capture tools
- Markdown editors
- Task managers

Keep extensions segmented by profile to reduce risk.

## Security as Workflow Stability

Brave improves:

- Tracking protection
- Script blocking
- Phishing reduction
- Login session protection

This protects:

- Admin dashboards
- Internal tools
- Cloud consoles
- Production systems

## Workflow Strategy

Structure your browser intentionally:

- Define profiles by responsibility
- Limit unnecessary extensions
- Bookmark critical tools
- Use tab groups strategically
- Close stale sessions

## Final Thought

Workflow management begins at the environment level.

Brave supports:

- Speed
- Isolation
- Stability
- Reduced friction
```

### content/blog/digitalocean-rocket-chat-hosting.mdx

```mdx
---
title: "DigitalOcean + Rocket.Chat: Practical Hosting Overview"
excerpt: "A practical deployment guide for hosting Rocket.Chat on DigitalOcean with production-ready infrastructure considerations."
category: "App + API Hosting"
date: "2026-02-24"
readTime: "7 min"
---

## What You're Hosting

- Node.js runtime
- MongoDB database
- Reverse proxy (Nginx or Caddy)
- SSL certificate
- Persistent file storage

## Infrastructure on DigitalOcean

- Droplets (Ubuntu 22.04 LTS recommended)
- Managed MongoDB (recommended for production)
- VPC networking
- Cloud Firewalls
- Snapshots & automated backups

## Recommended Production Architecture

- App Droplet running Rocket.Chat via Docker
- Managed MongoDB cluster
- Object storage (DigitalOcean Spaces) for uploads
- Nginx reverse proxy
- Let's Encrypt SSL

## Deployment Flow

- Create Droplet
- Install Docker & Docker Compose
- Configure docker-compose.yml
- Define environment variables
- Start containers
- Configure reverse proxy
- Enable SSL
- Configure firewall rules

## Scaling Strategy

- Increase Droplet size vertically first
- Move database to managed service early
- Offload uploads to object storage
- Introduce load balancer when needed

## Benefits

- Full infrastructure control
- Predictable pricing
- API extensibility
- Custom compliance configuration
```

### content/blog/fleet-wireguard-device-security-asset-management.mdx

```mdx
---
title: "Fleet: WireGuard Device Security and Asset Management"
excerpt: "How Fleet enables WireGuard-based device security, endpoint visibility, and structured asset management for modern teams."
category: "Asset Management"
date: "2026-02-26"
readTime: "9 min"
---

## Overview

Fleet provides:

- Device inventory visibility
- Endpoint query capabilities
- Policy enforcement
- Secure remote access
- Asset tracking across users and devices

When combined with WireGuard, it strengthens:

- Encrypted device connectivity
- Controlled access to internal resources
- Zero-trust style architecture

## WireGuard Integration Concept

WireGuard provides:

- Lightweight VPN tunnels
- Strong encryption
- Minimal attack surface
- High performance connectivity

Fleet complements this by:

- Tracking which device owns which key
- Mapping devices to users
- Monitoring device posture
- Logging access patterns

## Asset Management Structure

Core asset categories:

- Users
- Devices
- Vendors
- Access policies

Each device record can include:

- Owner
- Operating system
- Encryption status
- Installed software
- Last check-in
- Assigned access roles

## User Access Governance

Fleet enables:

- Role-based access
- Query-based compliance checks
- Device approval workflows
- Audit logging

This allows teams to:

- Remove stale devices
- Detect unauthorized software
- Enforce encryption policies
- Validate patch levels

## Security Benefits

- Centralized visibility
- Reduced shadow IT
- Enforced endpoint compliance
- Structured audit readiness

## Infrastructure Flow

- Device enrolls in Fleet
- WireGuard key assigned
- Policies applied
- Queries run on schedule
- Results logged for compliance
- Access granted or restricted

## Why This Matters

Modern asset management requires:

- Real-time device state
- Encrypted connectivity
- Clear ownership mapping
- Structured reporting

Fleet combined with WireGuard creates:

- Secure remote device control
- Continuous compliance visibility
- Scalable asset governance
```

### content/blog/ai-table-asset-management.mdx

```mdx
---
title: "AI Table: Structured Asset Management and Analytics Integration"
excerpt: "How AI Table enables structured asset management and integrates with analytics platforms like Metabase for visualization and governance."
category: "Workflow Management"
date: "2026-02-26"
readTime: "8 min"
---

## Overview

AI Table acts as:

- A structured data layer
- A validation engine
- A workflow automation layer
- A governance tracking system

It captures asset records across:

- Users
- Devices
- Vendors
- Access permissions

## Form-Based Data Capture

Structured forms collect:

- User information
- Device attributes
- Vendor relationships
- Access level definitions

AI assists with:

- Field validation
- Data normalization
- Duplicate detection
- Policy suggestion

## Core Asset Categories

### Users

- Role
- Department
- Access level
- Assigned devices

### Devices

- Owner
- Operating system
- Encryption status
- Last check-in
- Installed software

### Vendors

- Service category
- Data sensitivity level
- Contract renewal date
- Risk tier

## Data Normalization

AI Table ensures:

- Consistent naming conventions
- Relationship mapping
- Foreign key integrity
- Schema validation

This allows clean integration into analytics systems.

## Integration with Analytics (Metabase)

The integration flow:

- AI Table writes structured records to SQL
- Database enforces relationships
- Metabase connects with read-only credentials
- Dashboards update from live queries

Dashboards can display:

- Device compliance metrics
- Vendor exposure tracking
- User access patterns
- Audit history trends

## Governance and Reporting

AI Table supports:

- Audit logs
- Change tracking
- Access reviews
- Compliance reporting

## Why This Matters

Modern asset management requires:

- Real-time structure
- Clear ownership mapping
- Analytics visibility
- Governance enforcement

AI Table bridges operational data with business intelligence.
```

### content/blog/pikapods-nextcloud-hosting.mdx

```mdx
---
title: "PikaPods + Nextcloud: Practical Hosting Overview"
excerpt: "A streamlined guide to deploying and managing Nextcloud on PikaPods with minimal DevOps overhead."
category: "App + API Hosting"
date: "2026-02-24"
readTime: "5 min"
---

## What You're Hosting

- PHP runtime
- Database (MariaDB or PostgreSQL)
- File storage
- Background job processor
- SSL

## What PikaPods Manages

- Containerized deployment
- Database provisioning
- Automated updates
- Backups
- SSL certificates

## Deployment Flow

- Create PikaPods account
- Select Nextcloud
- Choose storage and region
- Configure admin credentials
- Deploy container
- Configure domain (optional)
- Enable additional apps

## Storage & Performance

- Storage tier impacts cost
- Higher allocation for heavy file usage
- Background jobs handled automatically
- Built-in backup management

## Benefits

- No server maintenance
- Automatic updates
- Minimal infrastructure management
- Predictable scaling
```

---

## Components

### src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Open Technology",
  description: "Exploring the open-source ecosystem — tools, frameworks, and infrastructure for building modern applications without vendor lock-in.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

### src/components/Header.tsx (Client Component)

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-brand">
            <span className="text-sm font-bold text-primary-foreground">OT</span>
          </div>
          <span className="font-heading text-lg font-bold tracking-tight">Open Technology</span>
        </Link>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/" className={pathname === "/" ? "font-semibold" : ""}>
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/blog" className={pathname === "/blog" ? "font-semibold" : ""}>
                  Blog
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
```

### src/components/Footer.tsx

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="container text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Open Technology. Built with open source.
      </div>
    </footer>
  );
}
```

### src/components/TechBullets.tsx (Client Component)

The tool icons link to `/blog?category=X`. Tooltip requires client-side JS.

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, TECH_TOOLS, Category } from "@/data/content";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const categoryColors: Record<Category, string> = {
  "App + API Dev": "text-primary",
  "App + API Hosting": "text-accent",
  "Workflow Management": "text-ring",
  "Asset Management": "text-destructive",
};

export default function TechBullets() {
  return (
    <TooltipProvider delayDuration={100}>
      <section className="space-y-6">
        {CATEGORIES.map((cat) => {
          const tools = TECH_TOOLS.filter((t) => t.category === cat);
          return (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`h-2 w-2 rounded-full bg-current ${categoryColors[cat]}`} />
                <h3 className={`font-semibold text-sm uppercase tracking-wider ${categoryColors[cat]}`}>
                  {cat}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 pl-4">
                {tools.map((tool) => (
                  <Tooltip key={tool.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/blog?category=${encodeURIComponent(cat)}`}
                        className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card shadow-card transition-all hover:shadow-card-hover hover:scale-110 hover:-translate-y-0.5"
                      >
                        {tool.logo ? (
                          <Image
                            src={tool.logo}
                            alt={tool.name}
                            width={28}
                            height={28}
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-xl">{tool.icon}</span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{tool.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </TooltipProvider>
  );
}
```

### src/components/ContactForm.tsx (Client Component)

```tsx
"use client";

import { useState } from "react";
import { CATEGORIES } from "@/data/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Thanks for reaching out.");
    setEmail("");
    setComment("");
    setCategory("");
  };

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h2 className="mb-1 text-xl font-bold tracking-tight">Get in Touch</h2>
      <p className="mb-5 text-sm text-muted-foreground">
        Interested in a topic? Drop a note and select a category.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Textarea
          placeholder="What's on your mind?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          required
        />
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a tech category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full gradient-brand text-primary-foreground">
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </form>
    </section>
  );
}
```

---

## Pages

### src/app/page.tsx — Home

```tsx
import TechBullets from "@/components/TechBullets";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mb-10 max-w-lg">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground mb-2">
              Open Technology
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Exploring the open-source ecosystem — tools, frameworks, and infrastructure
              for building modern applications without vendor lock-in.
            </p>
          </div>

          <div className="mb-16">
            <TechBullets />
          </div>

          <div className="max-w-md">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

### src/app/blog/page.tsx — Blog Listing (Client Component)

Category filtering uses `useSearchParams` so this must be a client component.

```tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

// BlogPost type matching what the server action returns
interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
}

const CATEGORIES_LIST = [
  "App + API Dev",
  "App + API Hosting",
  "Workflow Management",
  "Asset Management",
] as const;

const categoryColors: Record<Category, string> = {
  "App + API Dev": "bg-primary/10 text-primary border-primary/20",
  "App + API Hosting": "bg-accent/10 text-accent border-accent/20",
  "Workflow Management": "bg-ring/10 text-ring border-ring/20",
  "Asset Management": "bg-destructive/10 text-destructive border-destructive/20",
};

function BlogList({ posts }: { posts: PostMeta[] }) {
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

      <div className="mb-8 flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className={`cursor-pointer px-3 py-1 text-sm transition-colors ${
            selectedCategory === "all"
              ? "bg-foreground text-background border-foreground"
              : "hover:bg-muted"
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </Badge>
        {CATEGORIES_LIST.map((cat) => (
          <Badge
            key={cat}
            variant="outline"
            className={`cursor-pointer px-3 py-1 text-sm transition-colors ${
              selectedCategory === cat
                ? categoryColors[cat] + " ring-1 ring-current"
                : "hover:bg-muted"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
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

// Posts are fetched server-side and passed as props via a wrapper
// This page.tsx exports a server component wrapper
export default function BlogPage() {
  // NOTE: In a real implementation, fetch posts from server action or static import
  // For client component simplicity, import the static data directly:
  // import { getAllPosts } from "@/lib/blog" — but that requires server context.
  // Use a Server Component wrapper pattern instead (see note below).
  return <div>Loading...</div>;
}
```

> **Implementation Note:** The blog listing page needs server-side post reading
> combined with client-side filtering. The cleanest pattern in Next.js App Router is:
>
> 1. Make `src/app/blog/page.tsx` a **Server Component** that reads posts with `getAllPosts()`
> 2. Pass the posts array as props to a `<BlogList posts={posts} />` **Client Component**
>
> Example server component wrapper:
>
> ```tsx
> // src/app/blog/page.tsx  (Server Component — no "use client")
> import { getAllPosts } from "@/lib/blog";
> import BlogList from "@/components/BlogList";
> import Header from "@/components/Header";
> import Footer from "@/components/Footer";
> import { Suspense } from "react";
>
> export default async function BlogPage() {
>   const posts = getAllPosts().map(({ content: _content, ...meta }) => meta);
>   return (
>     <div className="flex min-h-screen flex-col">
>       <Header />
>       <main className="flex-1">
>         <div className="container py-12">
>           <Suspense>
>             <BlogList posts={posts} />
>           </Suspense>
>         </div>
>       </main>
>       <Footer />
>     </div>
>   );
> }
> ```
>
> Move the filtering UI code above into `src/components/BlogList.tsx` with `"use client"`.

### src/app/blog/[slug]/page.tsx — Blog Post

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl py-12">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

### src/app/not-found.tsx

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found.</p>
      <Link href="/" className="text-primary hover:underline">
        Return home
      </Link>
    </div>
  );
}
```

---

## Category Color Reference

Use this record in every file that needs to map category to color:

```ts
const categoryColors: Record<Category, string> = {
  "App + API Dev":       "bg-primary/10 text-primary border-primary/20",
  "App + API Hosting":   "bg-accent/10 text-accent border-accent/20",
  "Workflow Management": "bg-ring/10 text-ring border-ring/20",
  "Asset Management":    "bg-destructive/10 text-destructive border-destructive/20",
};

// For TechBullets section headings:
const categoryTextColors: Record<Category, string> = {
  "App + API Dev":       "text-primary",
  "App + API Hosting":   "text-accent",
  "Workflow Management": "text-ring",
  "Asset Management":    "text-destructive",
};
```

---

## Adding New Blog Posts

To add a new post, create a new `.mdx` file in `/content/blog/` following the
frontmatter format above. The site rebuilds automatically. No code changes needed.

**Checklist for a new post:**
- [ ] File name matches the intended slug (e.g. `my-post-title.mdx`)
- [ ] All frontmatter fields present: `title`, `excerpt`, `category`, `date`, `readTime`
- [ ] `category` is one of the four valid values exactly
- [ ] `date` is ISO format: `YYYY-MM-DD`
- [ ] Body is valid Markdown/MDX

---

## next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default nextConfig;
```

---

## Implementation Order

1. Run bootstrap commands
2. Replace `globals.css` and `tailwind.config.ts` with the versions above
3. Create `src/lib/utils.ts`
4. Create `src/data/content.ts` with all TECH_TOOLS
5. Create `src/lib/blog.ts` (MDX reader)
6. Copy all logos to `/public/logos/`
7. Create all six MDX files in `/content/blog/`
8. Build all components: `Header`, `Footer`, `TechBullets`, `ContactForm`, `BlogList`
9. Build all pages: `app/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/not-found.tsx`
10. Update `app/layout.tsx` with Toaster
11. Run `npm run dev` and verify all routes
12. Run `npm run build` to confirm static generation works

---

## Replacing Blog Posts Later (Content Layer Workflow)

When switching to a CMS or content layer system (e.g. Contentlayer, Sanity, Tina CMS):

1. Replace `src/lib/blog.ts` to fetch from the new source instead of reading MDX files
2. Keep the `BlogPost` interface identical — all components depend on it
3. `getAllPosts()` and `getPostBySlug()` are the only functions pages call — swap their internals only
4. The MDX files in `/content/blog/` can serve as the migration seed data
