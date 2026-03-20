# Open Technology

A minimal, dark-mode-capable blog and landing page for an open-source technology brand. Built with Next.js 14+, Tailwind CSS, shadcn/ui, and MDX.

## Features

- Blog listing with category filtering
- MDX blog posts with syntax highlighting
- Tech tool icon grid (grouped by category)
- Contact form with toast notifications
- Dark / light theme toggle
- Authentication — sign in, sign up, admin role
- Admin settings panel: manage users, blog posts, site name/description, and tech tools
- First-run `/setup` page to create the admin account securely

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Radix UI) |
| Content | MDX files + database posts |
| Auth | NextAuth.js v5 (credentials) |
| Database (local) | SQLite via `better-sqlite3` |
| Database (production) | Supabase (PostgreSQL) |
| Hosting | Vercel |

---

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/OpenTechnology14/OpenTechnologyTest.git
cd OpenTechnologyTest
npm install
```

### 2. Set environment variables

Create a `.env.local` file in the project root:

```bash
# Generate a random secret:
#   openssl rand -base64 32
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> `NEXTAUTH_URL` must match the URL you open in the browser.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Create the admin account

Navigate to [http://localhost:3000/setup](http://localhost:3000/setup).

This page is **only available the first time the app runs** (when no users exist). Fill in your name, email, and password to create the admin account. After that, `/setup` becomes inaccessible.

### 5. Sign in and explore the admin panel

Click **Sign In** in the top-right corner and use the credentials you just created. As admin you get access to **Admin Settings** via the menu or directly at `/admin/settings`:

| Tab | What you can do |
|-----|-----------------|
| **Users** | View all accounts, delete users, generate invite links |
| **Blog Posts** | Create, edit (Markdown), publish/draft, delete posts |
| **Site Settings** | Change the blog name and homepage description |
| **Tech Tools** | Add, edit, or remove tools shown in the icon grid |

---

## Deploying to Vercel

Yes — you can deploy entirely from the Vercel dashboard without touching a terminal (after the initial `git push`). Vercel's serverless functions use an **ephemeral filesystem**, so the local SQLite file won't persist between deployments. For production you need a hosted database. Choose one of the two free options below.

| | Supabase | Turso | PocketBase | Cloudflare Pages |
|---|---|---|---|---|
| **Type** | PostgreSQL | SQLite (libSQL) | SQLite (embedded) | Static + Workers |
| **Migration effort** | Medium — query syntax changes | Low — near-identical to local SQLite | Low — simple REST/SDK | Low — form endpoint only |
| **Free tier** | 500 MB, 2 projects | 9 GB, 500 databases | Self-hosted (free) | 100k requests/day |
| **Open source** | Yes | Yes | Yes | Runtime only |

---

## Option A — Supabase (PostgreSQL)

> Best if you want a full PostgreSQL database with a web dashboard, REST API, and built-in auth options.

Yes — you can deploy entirely from the Vercel dashboard without touching a terminal (after the initial `git push`). Vercel's serverless functions use an **ephemeral filesystem**, so the local SQLite file won't persist between deployments. For production you need **Supabase** (PostgreSQL).

### Step 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in (free tier works).
2. Click **New project**, choose a name, password, and region.
3. Wait ~1 minute for the project to provision.

### Step 2 — Run the database schema

1. In the Supabase dashboard, click **SQL Editor** in the left sidebar.
2. Paste and run the following:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE invitations (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  token TEXT UNIQUE NOT NULL,
  created_by INTEGER REFERENCES users(id),
  used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE tech_tools (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  logo TEXT,
  category TEXT NOT NULL,
  url TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT,
  content TEXT,
  published INTEGER DEFAULT 1
);

-- Seed default site settings
INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'Open Technology'),
  ('site_description', 'Exploring the open-source ecosystem — tools, frameworks, and infrastructure for building modern applications without vendor lock-in.');
```

### Step 3 — Collect your Supabase credentials

You will need these for Vercel environment variables:

| What | Where to find it |
|---|---|
| **Project URL** | Supabase → Settings → API → Project URL |
| **Anon / public key** | Supabase → Settings → API → Project API keys |
| **Database connection string** | Supabase → Settings → Database → Connection string → URI |

The connection string looks like:
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### Step 4 — Update `src/lib/db.ts` and push to GitHub

Switch the data layer from SQLite to Supabase:

```bash
npm install @supabase/supabase-js
```

Update `src/lib/db.ts` to use the Supabase client instead of `better-sqlite3`. The function signatures stay the same — only the internals change. Then push to GitHub:

```bash
git add .
git commit -m "Switch to Supabase PostgreSQL"
git push origin main
```

### Step 5 — Import your project in the Vercel dashboard

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New → Project**.
3. Under **Import Git Repository**, select `OpenTechnology14/OpenTechnologyTest` (connect your GitHub account if prompted).
4. Click **Import**.

### Step 6 — Configure build settings

Vercel auto-detects Next.js. Confirm or set:

| Setting | Value |
|---|---|
| **Framework Preset** | Next.js |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` (auto-detected) |
| **Install Command** | `npm install` |
| **Node.js Version** | 22.x (recommended) |

### Step 7 — Add environment variables

Still on the same import screen, scroll down to **Environment Variables** and add each one:

| Variable | Value |
|---|---|
| `NEXTAUTH_SECRET` | A random secret — generate one at [generate-secret.vercel.app](https://generate-secret.vercel.app/32) |
| `NEXTAUTH_URL` | Your Vercel URL, e.g. `https://your-app.vercel.app` (update after deploy) |
| `NEXT_PUBLIC_APP_URL` | Same as `NEXTAUTH_URL` |
| `DATABASE_URL` | Supabase connection string from Step 3 |
| `SUPABASE_URL` | Supabase Project URL from Step 3 |
| `SUPABASE_ANON_KEY` | Supabase anon key from Step 3 |

### Step 8 — Deploy

Click **Deploy**. Vercel builds and publishes your site. The first deploy takes about 1–2 minutes. You'll get a live URL like `https://open-technology-test.vercel.app`.

### Step 9 — Create your admin account

Visit `https://your-app.vercel.app/setup` to create the first admin account. This route is only available until the first admin exists.

### Step 10 — Update the production URL (important for invite links)

After deployment:

1. In the Vercel dashboard, go to **Settings → Environment Variables**.
2. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to your live URL.
3. Click **Save** — Vercel will trigger a new deployment automatically.

---

## Option B — Turso (libSQL / SQLite)

> Best if you want the simplest possible migration — Turso uses SQLite, so your existing queries work with near-zero changes.

### Step 1 — Create a Turso account and database

1. Go to [turso.tech](https://turso.tech) and sign in (free tier works).
2. Click **Create database**, choose a name and region.
3. Once created, click into your database and open the **Shell** tab.

### Step 2 — Run the database schema

Paste and run the following in the Turso shell:

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'viewer',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS invitations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  token TEXT UNIQUE NOT NULL,
  created_by INTEGER REFERENCES users(id),
  used INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tech_tools (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  icon TEXT,
  logo TEXT,
  category TEXT NOT NULL,
  url TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT,
  content TEXT,
  published INTEGER DEFAULT 1
);

INSERT OR IGNORE INTO site_settings (key, value) VALUES
  ('site_name', 'Open Technology'),
  ('site_description', 'Exploring the open-source ecosystem — tools, frameworks, and infrastructure for building modern applications without vendor lock-in.');
```

### Step 3 — Collect your Turso credentials

You will need these for Vercel environment variables:

| What | Where to find it |
|---|---|
| **Database URL** | Turso dashboard → your database → **Connect** → copy `libsql://...` URL |
| **Auth token** | Same **Connect** screen → **Generate token** |

### Step 4 — Update `src/lib/db.ts` and push to GitHub

Switch the data layer from `better-sqlite3` to the Turso client:

```bash
npm install @libsql/client
```

Update `src/lib/db.ts` — the main change is that queries become `async`:

```ts
import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Before (better-sqlite3):  db.prepare("SELECT * FROM users").all()
// After  (@libsql/client):  (await db.execute("SELECT * FROM users")).rows
```

Then push to GitHub:

```bash
git add .
git commit -m "Switch to Turso libSQL"
git push origin main
```

### Step 5 — Import your project in the Vercel dashboard

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New → Project**.
3. Under **Import Git Repository**, select `OpenTechnology14/OpenTechnologyTest` (connect your GitHub account if prompted).
4. Click **Import**.

### Step 6 — Configure build settings

Vercel auto-detects Next.js. Confirm or set:

| Setting | Value |
|---|---|
| **Framework Preset** | Next.js |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` (auto-detected) |
| **Install Command** | `npm install` |
| **Node.js Version** | 22.x (recommended) |

### Step 7 — Add environment variables

Still on the same import screen, scroll down to **Environment Variables** and add each one:

| Variable | Value |
|---|---|
| `NEXTAUTH_SECRET` | A random secret — generate one at [generate-secret.vercel.app](https://generate-secret.vercel.app/32) |
| `NEXTAUTH_URL` | Your Vercel URL, e.g. `https://your-app.vercel.app` (update after deploy) |
| `NEXT_PUBLIC_APP_URL` | Same as `NEXTAUTH_URL` |
| `TURSO_DATABASE_URL` | Your `libsql://...` URL from Step 3 |
| `TURSO_AUTH_TOKEN` | Your auth token from Step 3 |

### Step 8 — Deploy

Click **Deploy**. Vercel builds and publishes your site. The first deploy takes about 1–2 minutes. You'll get a live URL like `https://open-technology-test.vercel.app`.

### Step 9 — Create your admin account

Visit `https://your-app.vercel.app/setup` to create the first admin account. This route is only available until the first admin exists.

### Step 10 — Update the production URL (important for invite links)

After deployment:

1. In the Vercel dashboard, go to **Settings → Environment Variables**.
2. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to your live URL.
3. Click **Save** — Vercel will trigger a new deployment automatically.

---

---

## Option C — PocketBase (Self-Hosted SQLite)

> Best if you want a fully open-source, zero-cloud-dependency backend. PocketBase is a single Go binary — no Docker, no VM required beyond a small server. Its SDK is nearly identical to Supabase in structure.

### Step 1 — Deploy PocketBase

The easiest zero-config host is [PikaPods](https://pikapods.com) (PocketBase app, ~$1–2/mo) or a $4/mo DigitalOcean Droplet:

**Option A — PikaPods (recommended for beginners)**
1. Go to [pikapods.com](https://pikapods.com) and sign in.
2. Click **Add Pod**, search for **PocketBase**, and deploy.
3. Note your pod URL, e.g. `https://yourapp.pikapods.net`.

**Option B — DigitalOcean Droplet**
```bash
# SSH into your Droplet, then:
wget https://github.com/pocketbase/pocketbase/releases/latest/download/pocketbase_linux_amd64.zip
unzip pocketbase_linux_amd64.zip
./pocketbase serve --http="0.0.0.0:8090"
```
Point a subdomain at the Droplet IP and proxy port `8090` with Nginx + Let's Encrypt.

### Step 2 — Create your collections

1. Open the PocketBase admin UI at `https://yourapp.pikapods.net/_/` (or `:8090/_/`).
2. Create an admin account on first run.
3. Go to **Collections → New collection** and create the following:

**`users` collection** (Auth type — PocketBase handles auth natively):
PocketBase's built-in Auth collection already provides `email`, `password`, `name`, and `role` fields. Just enable it.

**`site_settings` collection** (Base type):
| Field | Type |
|---|---|
| `key` | Text (unique) |
| `value` | Text |

**`tech_tools` collection** (Base type):
| Field | Type |
|---|---|
| `name` | Text |
| `icon` | Text |
| `logo` | Text |
| `category` | Text |
| `url` | URL |
| `sort_order` | Number |

**`blog_posts` collection** (Base type):
| Field | Type |
|---|---|
| `slug` | Text (unique) |
| `title` | Text |
| `excerpt` | Text |
| `category` | Text |
| `date` | Text |
| `read_time` | Text |
| `content` | Editor |
| `published` | Bool |

### Step 3 — Install the PocketBase SDK

```bash
npm install pocketbase
```

### Step 4 — Update `src/lib/db.ts`

Replace the Supabase/SQLite data layer with PocketBase:

```ts
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL!);

// Example: fetch all blog posts
export async function getAllDbPosts() {
  const records = await pb.collection("blog_posts").getFullList({
    filter: "published = true",
    sort: "-date",
  });
  return records;
}

// Example: create a contact form submission
export async function createSubmission(data: { email: string; message: string; category: string }) {
  return await pb.collection("submissions").create(data);
}
```

> The collection and field names mirror what you set up in Step 2 — rename as needed.

### Step 5 — Add environment variables

In `.env.local` (local) and your Vercel project settings (production):

| Variable | Value |
|---|---|
| `POCKETBASE_URL` | Your PocketBase URL, e.g. `https://yourapp.pikapods.net` |

### Step 6 — Deploy to Vercel (same as Options A/B)

Follow **Steps 5–10** from Option A above. The only difference is the environment variable — replace Supabase/Turso vars with `POCKETBASE_URL`.

---

## Option D — Cloudflare Pages + Worker (Contact Form)

> Best if you want to move away from Vercel entirely **or** just need a zero-backend solution for the contact form. Cloudflare Pages has a generous free tier (100k requests/day) and supports GitHub import just like Vercel. Pages Functions (scoped Workers) let you handle form submissions server-side without any separate service.

### Step 1 — Create a Cloudflare Pages project

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com) and sign in (free).
2. Click **Create a project → Connect to Git**.
3. Authorize GitHub and select `OpenTechnology14/OpenTechnologyTest`.
4. Set the following build settings:

| Setting | Value |
|---|---|
| **Framework preset** | Next.js |
| **Build command** | `npm run build` |
| **Build output directory** | `.vercel/output/static` |
| **Node.js version** | 22 |

> Cloudflare Pages uses `@cloudflare/next-on-pages` for Next.js. Add it first:
> ```bash
> npm install --save-dev @cloudflare/next-on-pages
> ```
> Update `package.json` build script: `"build": "next build && npx vercel-build"` — or follow the [official guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/).

5. Click **Save and Deploy**.

### Step 2 — Create the contact form Pages Function

Create the file `functions/api/contact.ts` in the project root:

```ts
interface Env {
  DISCORD_WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json<{ email: string; message: string; category: string }>();

  // --- Option A: Discord webhook ---
  if (env.DISCORD_WEBHOOK_URL) {
    await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: null,
        embeds: [
          {
            title: "New Contact Form Submission",
            color: 0x5865f2,
            fields: [
              { name: "Email",    value: body.email,    inline: true },
              { name: "Category", value: body.category, inline: true },
              { name: "Message",  value: body.message },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  }

  // --- Option B: Resend email ---
  if (env.RESEND_API_KEY && env.CONTACT_EMAIL) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "contact@yourdomain.com",
        to:   env.CONTACT_EMAIL,
        subject: `New message from ${body.email} — ${body.category}`,
        text: body.message,
      }),
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
```

### Step 3 — Update `ContactForm.tsx` to POST to the Worker

Open `src/components/ContactForm.tsx` and replace the `handleSubmit` function:

```ts
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message: comment, category }),
    });
    if (!res.ok) throw new Error("Request failed");
    toast.success("Message sent! Thanks for reaching out.");
    setEmail(""); setComment(""); setCategory("");
  } catch {
    toast.error("Something went wrong — please try again.");
  }
};
```

### Step 4 — Configure environment variables in Cloudflare

1. In the Cloudflare Pages dashboard, go to your project → **Settings → Environment variables**.
2. Add one or both of the following depending on which notification method you want:

**For Discord webhook notifications:**
| Variable | Value |
|---|---|
| `DISCORD_WEBHOOK_URL` | Your Discord webhook URL (Server → Edit Channel → Integrations → Webhooks) |

**For Resend email notifications:**
| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Your Resend API key from [resend.com](https://resend.com) (free tier: 3k emails/mo) |
| `CONTACT_EMAIL` | The email address to send submissions to |

3. Redeploy for the variables to take effect.

### Step 5 — Set auth environment variables

Add these same variables that you'd normally set in Vercel:

| Variable | Value |
|---|---|
| `NEXTAUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Your Cloudflare Pages URL, e.g. `https://yourapp.pages.dev` |
| `NEXT_PUBLIC_APP_URL` | Same as `NEXTAUTH_URL` |

And add whichever database variable applies (Option A/B/C above).

### Step 6 — Custom domain (optional)

1. In Cloudflare Pages → **Custom domains → Add a custom domain**.
2. Enter your domain — Cloudflare auto-provisions DNS and SSL if your domain is on Cloudflare.
3. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to the custom domain and redeploy.

---

### Custom Domain (optional — applies to both options)

1. In the Vercel dashboard go to **Settings → Domains**.
2. Type your domain and click **Add**.
3. Vercel shows the DNS records to add at your registrar (usually a CNAME or A record).
4. Once DNS propagates, update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to the custom domain and redeploy.

### Automatic re-deploys

Every `git push` to `main` triggers a new Vercel deployment automatically — no dashboard action needed after the initial setup.

---

## Adding Blog Posts

### Via Admin Panel (recommended)

1. Sign in as admin.
2. Go to **Admin Settings → Blog Posts → New Post**.
3. Fill in the title, category, date, and Markdown content.
4. Toggle **Published** and click **Save**.

### Via MDX files

Drop a `.mdx` file in `/content/blog/` with the following frontmatter:

```mdx
---
title: "Your Post Title"
excerpt: "One sentence description."
category: "App + API Dev"
date: "2026-03-13"
readTime: "5 min"
---

## Your content here
```

Valid categories: `App + API Dev` | `App + API Hosting` | `Workflow Management` | `Asset Management`

The site rebuilds automatically. No code changes needed.

---

## Environment Variable Reference

| Variable | Required | Description |
|---|---|---|
| `NEXTAUTH_SECRET` | Yes | Random secret for signing JWTs. Generate with `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | Yes | Full URL of the app (e.g. `http://localhost:3000` or `https://your-app.vercel.app`). |
| `NEXT_PUBLIC_APP_URL` | Yes | Same as `NEXTAUTH_URL`. Used to build invite links. |
| `DATABASE_URL` | Option A | PostgreSQL connection string (Supabase). |
| `SUPABASE_URL` | Option A | Supabase project URL. |
| `SUPABASE_ANON_KEY` | Option A | Supabase anonymous API key. |
| `TURSO_DATABASE_URL` | Option B | Turso `libsql://...` connection URL. |
| `TURSO_AUTH_TOKEN` | Option B | Turso auth token. |
| `POCKETBASE_URL` | Option C | PocketBase instance URL (e.g. `https://yourapp.pikapods.net`). |
| `DISCORD_WEBHOOK_URL` | Option D | Discord webhook URL for contact form notifications. |
| `RESEND_API_KEY` | Option D | Resend API key for email notifications from contact form. |
| `CONTACT_EMAIL` | Option D | Destination email for Resend contact form notifications. |

---

## User Roles

| Role | Access |
|---|---|
| **Admin** | Full access — admin settings, user management, blog editing, site config |
| **Viewer** | Read-only — can view the blog and home page |

The first account is always admin, created at `/setup`. All self-sign-ups become viewers. Admins can generate invite links for new viewers.

---

## Project Structure

```
├── content/blog/          MDX blog posts
├── public/logos/          Tool logo assets (SVG/PNG)
├── src/
│   ├── app/
│   │   ├── page.tsx                  Home page
│   │   ├── blog/page.tsx             Blog listing
│   │   ├── blog/[slug]/page.tsx      Individual post
│   │   ├── setup/page.tsx            First-run admin setup
│   │   ├── signup/page.tsx           Invite-link signup
│   │   ├── admin/settings/           Admin panel
│   │   └── api/                      API routes (auth, admin)
│   ├── auth.ts                       NextAuth config (Node.js)
│   ├── auth.config.ts                Edge-compatible auth config
│   ├── middleware.ts                  Route protection
│   ├── components/
│   │   ├── Header.tsx                Sticky nav + auth buttons
│   │   ├── AuthModal.tsx             Sign in / sign up dialog
│   │   ├── TechBullets.tsx           Tool icon grid
│   │   └── ContactForm.tsx           Contact form
│   ├── data/content.ts               Default tool list + categories
│   └── lib/
│       ├── db.ts                     SQLite database layer
│       └── blog.ts                   MDX + DB blog reader
└── .env.local                        Local environment variables
```

---

## License

MIT

---

## Performance & Caching

These improvements are already applied to the codebase.

### What was done

| File | Change | Effect |
|---|---|---|
| `next.config.ts` | Added 7 security response headers | Applied on every request via Next.js `headers()` |
| `next.config.ts` | Added `Cache-Control` for `/logos/*` and `/fonts/*` | Logos cached 24 h, fonts cached 1 year |
| `src/app/page.tsx` | Replaced `force-dynamic` with `revalidate = 300` | Home page now ISR — rebuilt every 5 min, not on every request |
| `src/app/blog/page.tsx` | Added `revalidate = 300` | Blog listing rebuilt every 5 min |
| `src/lib/blog.ts` | Wrapped MDX file reads in `unstable_cache` | MDX posts read from disk once per deploy, not per request |

### Future caching to consider

- **Rate limiting on auth routes** — use [Upstash Ratelimit](https://github.com/upstash/ratelimit) or Vercel's built-in edge rate limiting to throttle `/api/auth/signup`, `/api/setup`, and login attempts to ~5 req/min per IP
- **Cache invalidation on admin save** — call `revalidatePath("/")` and `revalidatePath("/blog")` from admin API routes after successful writes so changes appear instantly without waiting for the 5-min window
- **React `cache()`** — wrap `getAllTools()` and `getSetting()` with `import { cache } from "react"` to deduplicate calls within a single render pass

---

## Security

These improvements are already applied to the codebase.

### What was done

| File | Change |
|---|---|
| `next.config.ts` | `X-Content-Type-Options: nosniff` — prevents MIME-type sniffing attacks |
| `next.config.ts` | `X-Frame-Options: DENY` — blocks clickjacking via iframes |
| `next.config.ts` | `X-XSS-Protection: 1; mode=block` — legacy XSS filter for older browsers |
| `next.config.ts` | `Strict-Transport-Security` — forces HTTPS for 2 years once deployed |
| `next.config.ts` | `Referrer-Policy: strict-origin-when-cross-origin` — limits referrer leakage |
| `next.config.ts` | `Permissions-Policy` — disables camera, mic, geolocation access |
| `next.config.ts` | `Content-Security-Policy` — restricts script, style, font, and image sources |
| `api/admin/site/route.ts` | Settings POST now validates against an `ALLOWED_KEYS` whitelist |
| `api/admin/tools/route.ts` | Tools PUT now only writes fields in an `ALLOWED_FIELDS` list |
| `api/admin/blog/route.ts` | Blog PUT now only writes fields in an `ALLOWED_FIELDS` list |
| `api/auth/signup/route.ts` | Added email format regex check + requires letter + number in password |

### Remaining recommendations

- **Rate limiting** — highest priority remaining item; no rate limiting exists on auth endpoints. Add with Upstash or a simple in-memory map for self-hosted deployments.
- **Upgrade NextAuth from beta** — currently on `5.0.0-beta.30`. Pin to a stable release once available.
- **`.env.local` rotation** — if `NEXTAUTH_SECRET` was ever committed to git, generate a new one (`openssl rand -base64 32`) and rotate it in Vercel → Settings → Environment Variables. Signing out all existing sessions is automatic.
- **NEXTAUTH_URL in production** — ensure this is set to your exact production domain (including `https://`) to prevent open redirect attacks.

---

## Feature Suggestions

Ideas for extending the project — none are implemented yet.

### Content & Blog
- **Post drafts** — add a `status` field (`draft` | `published` | `archived`); admin sees all, public only sees `published`
- **Post scheduling** — add a `publish_at` timestamp; a Vercel cron job checks and flips status at the right time
- **Tags / series** — add a `tags` array to blog posts for cross-category grouping and a tag cloud on the blog listing page
- **Reading progress bar** — a thin progress indicator at the top of individual post pages
- **Related posts** — show 2–3 posts with matching category at the bottom of each post

### Auth & Users
- **Magic link sign-in** — send a one-time login link by email instead of requiring a password; works well with Resend or Nodemailer
- **OAuth login** — add GitHub or Google sign-in via NextAuth providers alongside the existing credentials flow
- **User profile page** — let viewers update their display name and avatar
- **Invite expiry** — add an `expires_at` column to the `invitations` table; reject stale tokens after 7 days

### Admin Panel
- **Bulk publish / unpublish** — checkbox selection on the blog post list with a bulk action dropdown
- **Image upload** — attach a cover image per post using Vercel Blob or Supabase Storage
- **Analytics dashboard** — embed a Plausible or Umami iframe for privacy-friendly page view stats
- **Tool category management** — let admins add/rename categories from the UI instead of editing code

### Site & UX
- **RSS feed** — generate `/feed.xml` from `getAllPosts()` at build time for subscribers
- **Open Graph images** — dynamic `opengraph-image.tsx` per blog post using `@vercel/og`
- **Full-text search** — add a search bar using Pagefind (static, no server needed) or Algolia DocSearch
- **Dark mode persistence** — save the user's theme preference to `localStorage` so it survives page reloads
- **Contact form backend** — wire `ContactForm` to actually send email via Resend or Nodemailer instead of just toasting

---

## Data Management — Templated Automations & Dashboards

> Linked to the [Data Management Item List Template Proposals](#data-management-item-list-templates) below.

This section covers the four automation and dashboard pillars for the Data Management template category. Each pillar maps directly to a line item in the template proposals list.

---

### 1. Doc Generation + Visualization

Automatically generate and publish documentation alongside visual data lineage diagrams whenever a build or deploy runs.

| Automation | Tool / Trigger | Output |
|---|---|---|
| Schema docs auto-build | CI pipeline (GitHub Actions) | HTML/Markdown schema reference |
| Lineage graph render | dbt + `dbt docs generate` | Interactive DAG in browser |
| ER diagram export | `schemaspy` or `tbls` on build | SVG/PNG committed to `docs/` |
| Dashboard embed | Metabase / Evidence.dev iframe | Linked from blog post or admin panel |

**Starter workflow** (`/.github/workflows/docs.yml`):
```yaml
name: Generate Data Docs
on:
  push:
    branches: [main]
jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dbt
        run: pip install dbt-core dbt-postgres
      - name: Generate docs
        run: dbt docs generate --profiles-dir .
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./target
```

---

### 2. DBT Docs

Keep dbt documentation in sync with your data models automatically.

| Item | Description |
|---|---|
| **Auto-publish on merge** | GitHub Action runs `dbt docs generate` + deploys `target/` to GitHub Pages or Vercel on every merge to `main` |
| **Source freshness checks** | `dbt source freshness` runs on a schedule; failures post to Slack / Discord webhook |
| **Model test gate** | `dbt test` must pass before docs are published (CI gate) |
| **Catalog JSON artifact** | `catalog.json` committed to repo for version-controlled schema history |

**Recommended project layout**:
```
dbt_project/
├── models/
│   ├── staging/        # Raw source cleaning
│   ├── intermediate/   # Business logic joins
│   └── marts/          # Final reporting tables
├── tests/
├── docs/               # Custom overview docs (.md)
└── dbt_project.yml
```

> Add `Data Management > DBT Docs` as a blog category and link posts here using the existing MDX blog pipeline.

---

### 3. Modular Data Model

Template for building a composable, layer-based data model that can be extended without breaking downstream consumers.

| Layer | Purpose | Example models |
|---|---|---|
| **Staging** | 1-to-1 with raw sources; light renaming only | `stg_orders`, `stg_users` |
| **Intermediate** | Cross-source joins; no metrics yet | `int_orders_with_customers` |
| **Marts** | Business-facing aggregates; used by dashboards | `fct_revenue`, `dim_customers` |
| **Metrics** | Semantic layer definitions (dbt Metrics / MetricFlow) | `metric: monthly_revenue` |

**Automation hooks**:
- Tag models by layer (`+tags: [staging]`) so CI only re-runs affected layers on PR
- Use `dbt ls --select tag:marts` to scope dashboard refresh jobs to final models only
- Schema contracts (`contract: {enforced: true}`) prevent breaking column changes from merging

---

### 4. Automate at Buildups

Trigger data pipeline actions at key build or deployment milestones.

| Event | Automation | How |
|---|---|---|
| `git push` to `main` | Run `dbt build` (compile + test + run) | GitHub Actions |
| PR opened | Run `dbt test` on changed models only | `dbt ls --select state:modified` |
| New deploy to Vercel | Invalidate dashboard cache | Vercel deploy hook → Metabase API |
| Scheduled (nightly) | Full refresh of incremental models | GitHub Actions `schedule: cron` |
| Source schema change | Alert + auto-open GitHub Issue | `dbt source freshness` + `gh issue create` |

**Example nightly cron** (`/.github/workflows/nightly_build.yml`):
```yaml
name: Nightly dbt Build
on:
  schedule:
    - cron: '0 3 * * *'   # 03:00 UTC daily
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install dbt-core dbt-postgres
      - run: dbt build --full-refresh --target prod
        env:
          DBT_PROFILES_DIR: .
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## Data Management Item List Templates

> Template proposals for admin panel item lists and blog categories under the **Data Management** domain.

| # | Template Name | Description | Linked Automation |
|---|---|---|---|
| 1 | **Doc Generation + Visualization** | Auto-publish schema docs and lineage graphs on each build | [§ Doc Generation + Visualization](#1-doc-generation--visualization) |
| 2 | **DBT Docs** | Sync dbt catalog and test results to a hosted docs site | [§ DBT Docs](#2-dbt-docs) |
| 3 | **Modular Data Model** | Staging → Intermediate → Marts layer template | [§ Modular Data Model](#3-modular-data-model) |
| 4 | **Automate at Buildups** | CI/CD hooks for dbt build, test, refresh, and alerting | [§ Automate at Buildups](#4-automate-at-buildups) |

### Adding a Data Management template to the admin panel

1. Sign in as admin → **Admin Settings → Tech Tools → Add Tool**.
2. Set **Category** to `Data Management`.
3. Use the template name from the table above as the **Tool Name**.
4. Add a **URL** pointing to the relevant section anchor above (e.g. `#1-doc-generation--visualization`) or to an external tool.
5. Save — the tool appears in the icon grid under the Data Management category heading.

### Adding Data Management blog posts

Use category `Data Management` in your MDX frontmatter or admin panel post form:

```mdx
---
title: "Building a Modular dbt Data Model"
excerpt: "A layer-by-layer walkthrough of staging, intermediate, and mart models."
category: "Data Management"
date: "2026-03-19"
readTime: "8 min"
---
```

