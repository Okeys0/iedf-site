# IEDF Website

Production codebase for the Ikeduru Economic Development Forum website.
Prepared by Okeys Ononiwu Consulting.

This implements **Milestone 1 (Foundations) + a working start on Milestone 2
(Core Pages)** from the Development Roadmap — the project shell, design
system, i18n routing, content model, and form architecture are all in place
and functioning; several pages carry clearly-marked placeholder content
pending real copy (see "What's Real vs. Placeholder" below).

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-based theme — design tokens live in `app/globals.css`)
- **next-intl** for English/Igbo routing (`/en`, `/ig`)
- **Zod** for form validation
- **Sanity** (schema defined in `/sanity`, not yet connected to a live project)

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in real values as services are provisioned
npm run dev
```

Visit `http://localhost:3000` (redirects to `/en`).

## What's Real vs. Placeholder

| Area | Status |
|---|---|
| Design tokens (color, type, spacing) | **Real** — matches Visual Design System doc exactly |
| Home page | **Real** — fully built: hero, Milestone Line, featured projects, stats, newsletter CTA |
| About page | **Structurally real**, narrative/bio content placeholder (needs founding members / exec committee input per Content Outline) |
| Projects & Initiatives page | **Real** — active initiatives + Strategic Roadmap band, using local content stub. ⚠️ Industrial Cluster and Gas-to-Power cards both have placeholder photos that are **not confirmed to depict the actual Ikeduru sites** — swap before launch (see `lib/content/projects.ts`) |
| About Ikeduru page | **Partially real** — Autonomous Communities section has real, sourced content (all 29 communities + traditional rulers, provided directly by IEDF). History, Statistics, and LGA Leadership sections still structural-only pending named sourcing (see Content Outline Section 3) |
| Join Us page | **Real forms**, placeholder body copy |
| News page | **Structural only** — populates once Sanity `newsPost` documents exist |
| Contact page | **Real** — full dynamic form, inquiry-type routing, working API route |
| Forms backend | **Real** — all three forms (Contact, Member Signup, Newsletter) write to Postgres (Neon) AND send an internal notification email via Resend. Tested end-to-end against a real database; email-sending code is correct per Resend's current SDK but untested against a real Resend account/API key (that requires signing up, which I can't do on your behalf) |
| Sanity CMS | **Schema only** — not yet connected to a live Sanity project (see below) |
| Igbo translations | **Machine-assisted draft** — flagged for native-speaker review before launch, see note below |

## Connecting Resend (email notifications)

Without this, forms still work (data saves to Postgres) — you just won't get an email telling you a submission came in.

1. Create a free account at [resend.com](https://resend.com)
2. Create an API key (Resend dashboard → API Keys)
3. Set two environment variables in `.env.local` (local dev) and **Vercel → Settings → Environment Variables** (production):
   ```
   RESEND_API_KEY=re_your_key_here
   ADMIN_NOTIFICATION_EMAIL=your-real-email@example.com
   ```
4. **Important limitation until you verify a domain:** without verifying `iedf.org.ng` (or another domain) in Resend's dashboard, you can only receive notification emails at the exact email address you used to sign up for Resend — not any arbitrary address. This is a Resend anti-spam restriction, not a bug in this code. To send to other addresses (e.g., a real IEDF group inbox), verify your domain in Resend first (Resend dashboard → Domains → Add Domain, then add the DNS records it gives you — same kind of process as the Vercel domain setup).
5. Redeploy (or restart `npm run dev`) so the new environment variables take effect

**Design note:** all three forms currently send their notification to one single `ADMIN_NOTIFICATION_EMAIL` address, rather than routing Contact-form inquiries to different departmental addresses (investors@, press@, etc.) as originally sketched in the Technical Architecture doc. Those departmental addresses were placeholders and may not be real, checked mailboxes yet — the email body still tells you which department it *would* route to, so whoever receives it can forward internally. Once real departmental inboxes exist, this is a quick change to make it route to multiple addresses instead of one.

## Connecting Postgres (Neon)

Forms will fail (return a 500 error) until this is set up.

1. Create a free account at [neon.tech](https://neon.tech) — no credit card required
2. Create a new project (any name/region is fine)
3. Copy the connection string it gives you (starts with `postgresql://...`)
4. Set it as `DATABASE_URL` in `.env.local` (local dev) and in **Vercel → Settings → Environment Variables** (production)
5. Run the schema once — paste the contents of `lib/db/schema.sql` into Neon's SQL Editor (in their dashboard) and run it. This creates the `submissions` table that all three forms write to.
6. Redeploy (or restart `npm run dev` locally) so the new environment variable takes effect

Once this is done, Contact, Member Signup, and Newsletter form submissions are saved permanently. To view them, use Neon's built-in SQL Editor:
```sql
SELECT * FROM submissions ORDER BY created_at DESC;
```

**Still missing:** email notifications when someone submits (Resend integration — see TODO comments in `app/api/*/route.ts`), and a friendlier internal admin view instead of writing raw SQL. Both are Milestone 4 follow-ups.

## Connecting Sanity

1. Run `npm create sanity@latest` in a separate folder to scaffold a Studio project
2. Copy the schema objects from `/sanity/schemaTypes/*.ts` into that Studio's `schemaTypes`
3. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`
4. Replace the imports in `lib/content/*.ts` with `sanityClient.fetch(...)` calls — component code does not need to change, since local stubs are shaped identically to the Sanity schema

## ⚠️ Igbo Translations Need Native Review

The Igbo strings in `messages/ig.json` were drafted to demonstrate the i18n
architecture working end-to-end — they are **not** a substitute for review by
a native Igbo speaker before launch. Please have someone from the founding/
executive team (or a professional translator) review and correct these
before they go live.

## Project Structure

```
app/
  [locale]/          → all user-facing routes, locale-aware
  api/               → form Route Handlers (contact, member-signup, newsletter)
components/          → shared UI (Header, Footer, MilestoneLine, Button, Tag, ProjectCard, ContactForm)
i18n/                → next-intl routing + request config
messages/            → en.json, ig.json translation strings
lib/
  content/           → temporary local content, shaped to match Sanity schema
  validations/       → Zod schemas shared by all forms
  sanity/            → Sanity client stub
sanity/
  schemaTypes/       → Sanity Studio schema definitions (see "Connecting Sanity")
```

## Next Steps (per Development Roadmap)

- **Milestone 2:** finish full page content (About narrative, leadership bios)
- **Milestone 3:** About Ikeduru content (pending sourcing), Join Us copy, full
  Support IEDF giving-intent flow
- **Milestone 4:** wire Postgres + Resend into the three form routes, add
  Igbo translations for launch-scope pages once reviewed, News post template
- **Milestone 5:** QA, accessibility audit, performance testing on throttled
  network, legal review pass
