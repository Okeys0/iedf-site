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
| About Ikeduru page | **Structural only** — content intentionally deferred pending named external sourcing (see Content Outline Section 3; Development Roadmap risk notes) |
| Join Us page | **Real forms**, placeholder body copy |
| News page | **Structural only** — populates once Sanity `newsPost` documents exist |
| Contact page | **Real** — full dynamic form, inquiry-type routing, working API route |
| Forms backend | **Validates and logs only** — Postgres + Resend wiring is a clearly marked `TODO` in each route handler (Milestone 4 per roadmap) |
| Sanity CMS | **Schema only** — not yet connected to a live Sanity project (see below) |
| Igbo translations | **Machine-assisted draft** — flagged for native-speaker review before launch, see note below |

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
