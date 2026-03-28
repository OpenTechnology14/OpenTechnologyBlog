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

The contact form in `src/components/ContactForm.tsx` currently shows a success toast on submit. To wire it to a real notification backend, add a Pages Function or API route that forwards submissions to Discord or email via Resend:

**For Discord webhook notifications:**

| Variable | Value |
|---|---|
| `DISCORD_WEBHOOK_URL` | Your Discord webhook URL |

**For Resend email notifications:**

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Your Resend API key (free tier: 3,000 emails/mo) |
| `CONTACT_EMAIL` | Destination email address |

Add these as environment variables in your Vercel or Cloudflare project settings.

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
