# Open Technology Blog

A minimal, dark-mode-capable blog and landing page for an open-source technology brand. Built with Next.js, Tailwind CSS v4, shadcn/ui, and MDX. Contact form submissions are stored in Supabase.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Radix UI) |
| Content | MDX files |
| Contact Form | Supabase (PostgreSQL) |
| Hosting | Vercel |

---

## Local Development

### Step 1 — Clone and install

```bash
git clone https://github.com/OpenTechnology14/OpenTechnologyBlog.git
cd OpenTechnologyBlog
npm install
```

### Step 2 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New project**, enter a name, password, and region, then click **Create new project**.
3. Wait about 1 minute for the project to provision.

### Step 3 — Create the contact_submissions table

In the Supabase dashboard, click **SQL Editor** in the left sidebar and run:

```sql
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Step 4 — Enable Row Level Security and allow inserts

Still in the SQL Editor, run:

```sql
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

This lets the form submit without authentication while blocking public reads.

### Step 5 — Get your Supabase API keys

1. In the Supabase dashboard, click **Project Settings** (gear icon) → **API**.
2. Copy the **Project URL** and the **anon / public** key.

### Step 6 — Set up environment variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with what you copied in Step 5.

### Step 7 — Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Fill out the contact form and check **Table Editor → contact_submissions** in Supabase to confirm submissions are saved.

---

## Deploying to Vercel

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "Add Supabase contact form"
git push origin main
```

### Step 2 — Import the project in Vercel

1. Go to [vercel.com](https://vercel.com) and click **Add New → Project**.
2. Import your GitHub repository (`OpenTechnology14/OpenTechnologyBlog`).

### Step 3 — Add environment variables in Vercel

In the **Environment Variables** section before deploying, add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

### Step 4 — Deploy

Click **Deploy**. Vercel builds and deploys automatically on every push to `main`.

---

## Viewing Contact Submissions

All form submissions appear in Supabase under **Table Editor → contact_submissions**. Columns:

| Column | Description |
|---|---|
| `id` | Auto-incremented primary key |
| `email` | Submitter's email address |
| `message` | Message body |
| `category` | Selected tech category |
| `created_at` | Timestamp (UTC) |

---

## Adding Blog Posts

Drop a `.mdx` file in `/content/blog/` with this frontmatter:

```mdx
---
title: "Your Post Title"
excerpt: "One sentence description."
category: "App + API Dev"
date: "2026-03-14"
readTime: "5 min"
---

## Your content here
```

Valid categories: `App + API Dev` | `App + API Hosting` | `Workflow Management` | `Asset Management`

The site rebuilds automatically on the next deploy.

---

## Environment Variable Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL — Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key — Project Settings → API |

---

## Project Structure

```
├── content/blog/          MDX blog posts
├── public/logos/          Tool logo assets (SVG/PNG)
├── src/
│   ├── app/
│   │   ├── page.tsx              Home page (hero + tools + contact form)
│   │   ├── blog/page.tsx         Blog listing with category filter
│   │   └── blog/[slug]/page.tsx  Individual blog post
│   ├── components/
│   │   ├── Header.tsx            Sticky nav + dark mode toggle
│   │   ├── Footer.tsx
│   │   ├── TechBullets.tsx       Tool icon grid grouped by category
│   │   ├── ContactForm.tsx       Contact form → Supabase
│   │   └── PageWrap.tsx          Centered layout wrapper
│   ├── data/content.ts           TECH_TOOLS array + categories
│   └── lib/
│       ├── blog.ts               MDX file reader
│       ├── supabase.ts           Supabase client
│       └── utils.ts              cn() utility
└── .env.local                    Local environment variables (git-ignored)
```

---

## License

MIT
