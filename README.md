# Open Technology Blog

A fully static blog and landing page built with Next.js (App Router), Tailwind CSS, shadcn/ui, and MDX. No database, no authentication, no admin panel — content lives in version-controlled MDX files and the site is pre-rendered at build time.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui (Radix UI) |
| Content | MDX files via `gray-matter` + `next-mdx-remote` |
| Icons | lucide-react |
| Hosting | Vercel |

---

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/OpenTechnology14/OpenTechnologyBlog.git
cd OpenTechnologyBlog
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables are required to run the blog locally.

---

## Deploying to Vercel

### Option A — Vercel (recommended)

1. Go to [vercel.com/new](https://vercel.com/new) and import `OpenTechnology14/OpenTechnologyBlog`.
2. Vercel auto-detects Next.js — no build settings needed.
3. Click **Deploy**. The site is live in ~1 minute.

Every `git push` to `main` triggers an automatic redeploy.

### Adding a Custom Domain on Vercel

1. In the [Vercel dashboard](https://vercel.com/dashboard), open your project and go to **Settings → Domains**.
2. Type your domain (e.g. `opentechnology.dev`) and click **Add**.
3. Vercel shows the DNS records to configure at your registrar:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

4. Log in to your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.) and add those records.
5. DNS propagation takes 1–48 hours. Vercel automatically provisions an SSL certificate once it detects the records.

> **Using Cloudflare DNS?** Set the proxy status to **DNS only** (grey cloud) for the `A` record — Vercel needs to see the bare IP to issue its SSL certificate. You can re-enable proxying after the cert is provisioned if desired.

6. Once verified, Vercel marks the domain as **Valid Configuration**. Your site is live at `https://yourdomain.com`.

### Option B — Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com) and connect your GitHub repo.
2. Set the build command to `npm run build` and the output directory to `.next`.
3. Install the Cloudflare adapter first:

```bash
npm install --save-dev @cloudflare/next-on-pages
```

See the [official Cloudflare Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/) for details.

---

## Contact Form

The contact form submits to a `contact_submissions` table in Supabase. Set up the table once and add two environment variables — no server code needed.

### Step 1 — Create the Supabase table

In your Supabase project, open the **SQL Editor** and run:

```sql
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow anonymous inserts (form submissions from the public site)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (you) can read submissions
CREATE POLICY "Allow authenticated reads"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
```

### Step 2 — Add environment variables

Add these to your Vercel project under **Settings → Environment Variables**, and to `.env.local` for local development:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → `anon` / `public` key |

### Step 3 — Redeploy

```bash
git commit --allow-empty -m "add supabase env vars" && git push
```

Vercel picks up the new variables and redeploys automatically. Submissions will appear in your Supabase dashboard under **Table Editor → contact_submissions**.

---

## Adding Blog Posts

Drop a `.mdx` file in `/content/blog/` with this frontmatter:

```mdx
---
title: "Your Post Title"
excerpt: "One sentence description."
category: "Dev Tools"
date: "2026-04-01"
readTime: "5 min"
---

## Your content here
```

Valid categories: `Dev Tools` | `Managed Cloud Apps` | `Workflow Management` | `Device & Data`

The site rebuilds automatically on the next deploy. No code changes needed.

---

## Project Structure

```
├── content/blog/               MDX blog posts
├── public/logos/               Tool logo assets (SVG/PNG)
├── src/
│   ├── app/
│   │   ├── page.tsx            Home page
│   │   ├── blog/page.tsx       Blog listing
│   │   └── blog/[slug]/        Individual post
│   ├── components/
│   │   ├── Header.tsx          Sticky nav + theme toggle
│   │   ├── Footer.tsx
│   │   ├── TechBullets.tsx     Tool icon grid
│   │   ├── ContactForm.tsx     Contact form
│   │   └── mdx/                Custom MDX components
│   ├── data/content.ts         Tool list + category definitions
│   └── lib/
│       └── blog.ts             MDX file reader
```

---

## License

MIT
