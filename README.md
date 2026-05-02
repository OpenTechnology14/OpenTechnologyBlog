# Open Technology Blog

A dark-mode-capable blog and landing page for the **Open Technology** brand. The site features a categorized tech-tool icon grid, MDX-powered blog posts, a Supabase-backed contact form, and a dedicated landing page for the Open Technology App. Hosted on Vercel.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| Content | MDX files via `gray-matter` + `next-mdx-remote` |
| Contact Form | Supabase (anon key, client-side) |
| Icons | lucide-react |
| Notifications | sonner |
| Theme | next-themes (dark/light toggle) |
| Deployment | Vercel |

---

## Local Development Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Steps

```bash
git clone https://github.com/OpenTechnology14/OpenTechnologyBlog.git
cd OpenTechnologyBlog
npm install
```

Create a `.env.local` file in the project root (see [Environment Variables](#environment-variables) below), then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### npm Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Next.js dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Environment Variables

| Variable | Required | Where Used | Notes |
|----------|----------|------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (for contact form) | `src/lib/supabase.ts` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (for contact form) | `src/lib/supabase.ts` | Supabase anonymous/public key |

The Supabase client is initialized only when both variables are present. If either is missing, the client is `null` and the contact form will not persist submissions. The rest of the site works without them.

Create `.env.local` for local development:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## Project Structure

```
OpenTechnologyBlog/
├── content/
│   └── blog/                      # MDX blog posts
│       ├── brave-browser-workflow-management.mdx
│       ├── device-server-security-compliance.mdx
│       ├── digitalocean-rocket-chat-hosting.mdx
│       ├── hybrid-ai-hugging-face-claude.mdx
│       ├── open-technology-app.mdx
│       ├── pikapods-nextcloud-hosting.mdx
│       └── zero-to-deployed-modern-dev-stack.mdx
├── public/
│   └── logos/                     # Tool/brand SVG and PNG logos
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with providers
│   │   ├── page.tsx               # Home page
│   │   ├── not-found.tsx          # 404 page
│   │   ├── blog/
│   │   │   ├── page.tsx           # Blog listing with category filter
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Individual blog post (MDX rendered)
│   │   ├── open-technology-app/   # OTA landing page
│   │   └── globals.css            # Design tokens + Tailwind
│   ├── components/
│   │   ├── Header.tsx             # Sticky header with nav + theme toggle
│   │   ├── OtaHeader.tsx          # Open Technology App landing header
│   │   ├── Footer.tsx             # Site footer
│   │   ├── TechBullets.tsx        # Categorized tech-tool icon grid
│   │   ├── ContactForm.tsx        # Supabase-backed contact form
│   │   ├── BlogList.tsx           # Client-side blog list with filtering
│   │   ├── PageWrap.tsx           # Shared page wrapper
│   │   ├── mdx/                   # MDX component overrides
│   │   └── ui/                    # shadcn/ui primitives (do not edit directly)
│   ├── data/
│   │   └── content.ts             # TECH_TOOLS array, categories, types
│   └── lib/
│       ├── blog.ts                # MDX file reader (getAllPosts, getPostBySlug)
│       ├── supabase.ts            # Supabase client init
│       └── utils.ts               # cn() utility
├── next.config.ts                 # pageExtensions, Turbopack config
├── vercel.json                    # Vercel build settings
├── package.json
└── tsconfig.json
```

---

## Adding Blog Posts

Blog posts are MDX files in `content/blog/`. No code changes are needed to add a new post.

### 1. Create the file

```bash
touch content/blog/my-new-post.mdx
```

The filename becomes the URL slug: `/blog/my-new-post`.

### 2. Add frontmatter

Every MDX file must start with this frontmatter block:

```mdx
---
title: "Post Title Here"
excerpt: "One-sentence description of the post."
category: "Dev Tools"
date: "2026-05-01"
readTime: "6 min"
---

## Your markdown content starts here
```

Valid categories are defined in `src/data/content.ts`. Currently: `Open Technology App`, `Workflow Management`, `Dev Tools`, `Managed Cloud Apps`, `Device & Data`.

### 3. Checklist

- [ ] Filename matches the intended slug (lowercase, hyphenated)
- [ ] All frontmatter fields present: `title`, `excerpt`, `category`, `date`, `readTime`
- [ ] `category` matches one of the values in `src/data/content.ts`
- [ ] `date` is ISO format: `YYYY-MM-DD`
- [ ] Body is valid Markdown/MDX
- [ ] Run `npm run build` locally to confirm static generation succeeds

The site rebuilds automatically on the next Vercel deployment (or on save in dev mode).

---

## Contact Form — Supabase Setup

The contact form submits to a `contact_submissions` table in Supabase.

### Create the table

In your Supabase project, open the SQL Editor and run:

```sql
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated reads"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
```

Then set the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables as described above.

---

## Vercel Deployment

### Build Configuration

The project includes a `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

Vercel auto-detects Next.js. No output directory override is needed.

### Deployment Checklist

- [ ] Import the repository on [vercel.com](https://vercel.com) via Add New Project
- [ ] Set environment variables before the first deploy:
  - `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
  - Apply to Production, Preview, and Development environments
- [ ] Click Deploy — Vercel runs `npm install` then `npm run build`
- [ ] Verify the home page, blog listing, individual blog posts, and contact form all work
- [ ] Subsequent deploys trigger automatically on push to `main`

### Adding a Custom Domain

1. In the Vercel dashboard, go to **Settings > Domains**.
2. Add your domain. Vercel provides the DNS records to configure at your registrar:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

3. DNS propagation takes 1-48 hours. Vercel automatically provisions an SSL certificate once it detects the records.

> **Cloudflare DNS users:** Set the proxy status to DNS only (grey cloud) for the `A` record so Vercel can issue its SSL certificate.

### Known Gotchas

- **Missing env vars** — If the Supabase variables are not set, the contact form silently fails (the client is `null`). The rest of the site works fine without them.
- **MDX build errors** — Malformed frontmatter in any `.mdx` file breaks the entire build. Validate frontmatter before pushing.
- **Static generation** — Blog post pages use `generateStaticParams`. All posts are built at deploy time. A new post requires a new deployment to appear on the live site.
- **Turbopack** — The dev server uses Turbopack (`next.config.ts` has a `turbopack` key). This only affects local development, not production builds.
- **`pageExtensions`** — Set to `["ts", "tsx", "mdx"]` in `next.config.ts`. Raw `.md` files in the app directory will not be treated as pages unless you update this list.

---

## Related Repositories

| Repo | Purpose |
|------|---------|
| [Task-Management](https://github.com/OpenTechnology14/Task-Management) | Task queue manager — dev environment |
| [OpenTechnologyApp](https://github.com/OpenTechnology14/OpenTechnologyApp) | Production tenant repo for the task management app |
| **OpenTechnologyBlog** (this repo) | Blog and landing page site |
