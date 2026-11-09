# AGENTS.md — IEDF Website

Living context file for any AI agent (or human) resuming work on this repo.
**Read this first — it tells you what was done, how things work, and where to
pick up next.** Keep it updated at the end of every work session.

> Last session completed: **2026-11-09 — Launch-completion pass**
> (Privacy, News, About Ikeduru sourced sections, full Igbo rewrite, admin
> console, OG image, polish). Verified: `npm run build` ✓, `npm run lint` ✓
> (0 errors / 0 warnings).

---

## 1. What this project is

Production codebase for the **Ikeduru Economic Development Forum (IEDF)** — a
diaspora-home founded, apolitical non-profit driving economic development in
Ikeduru LGA, Imo State, Nigeria. Production site: `www.iedf.org.ng`.
Prepared by Okeys Ononiwu Consulting.

- **Vibe direction (confirmed by owner):** premium, modern, glassy,
  breathtaking — dark **"Emerald Luxe"** theme, editorial typography,
  full cinematic motion. "WOW factor" is an explicit requirement.
- Brand DNA: **forest green + gold** (from the IEDF logo). Do not scheme-hop
  away from emerald/gold; deepen and refine within it.

## 2. Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) + TypeScript |
| Styling | Tailwind CSS v4 (tokens + glass system in `app/globals.css`) |
| i18n | next-intl — `en` (default) / `ig`; dynamic `[locale]` segment |
| Motion | `motion` (Framer Motion for React 19) — import from `motion/react` |
| Icons | `lucide-react` |
| Forms/DB | Zod validation; Postgres (Neon) via `pg`; Resend email |
| CMS | Sanity — schema only in `/sanity`, **not yet connected** |
| Class utils | `clsx` + `tailwind-merge` installed (available, not yet systematic) |

## 3. Where things live (architecture map)

```
app/globals.css               → ENTIRE design system: tokens, glass, spotlight,
                                gold/glow, aurora/marquee keyframes, reduced-motion
app/layout.tsx                → root html/body, fonts, site metadata + OG image
app/[locale]/layout.tsx       → NextIntlClientProvider, Aurora, ScrollProgress,
                                Header, Footer (sets content lang via Header)
app/[locale]/page.tsx         → Home (hero, marquee, projects, pillars, counters,
                                milestone beam, newsletter slab)
app/[locale]/about/           → About (editorial story + V/M + apolitical band)
app/[locale]/about/leadership → 9 exec-committee cards
app/[locale]/about-ikeduru    → Gallery, history, sourced stats, HQ (apolitical),
                                29 communities, economic activities + sources
app/[locale]/projects         → Active projects + roadmap band + CTA cards
app/[locale]/join-us          → Member/volunteer + giving-intent forms
app/[locale]/news             → News index (local posts)
app/[locale]/news/[slug]      → News article
app/[locale]/contact|privacy
app/admin                     → Internal submissions console (ADMIN_SECRET)
app/api/{contact,member-signup,newsletter,admin/submissions}
app/robots.ts, app/sitemap.ts
proxy.ts                      → next-intl locale proxy (do NOT recreate middleware.ts)
components/motion/*           → Reveal, Counter, AuroraBackground, ScrollProgress
components/Header.tsx         → floating glass nav + About dropdown + mobile drawer
lib/content/*                 → projects, leadership, communities, gallery, news, statistics
lib/email/client.ts           → Resend + escapeHtml helper
messages/en.json, ig.json     → FULL UI copy for both locales (keep keys in sync)
sanity/schemaTypes            → CMS schemas (community aligned to local stub fields)
```

## 4. How to compose UI here (design-system rules)

- Page containers: `mx-auto max-w-6xl px-6`; vertical rhythm `py-24`–`py-28`.
- Cards: `<SpotlightCard className="glass-hover rounded-3xl ...">`.
- Section headers: `<SectionHeading eyebrow="…" title={<>… <em className="text-gold-grad">word</em></>} />`.
- Page openers: `<PageHero eyebrow title subline />` (clears the fixed header via pt-36/pt-44).
- CTAs: `<Button href variant="primary|secondary|ghost" size="md|lg">`.
- Gold accent inside headings: `AccentLine` / `<em className="text-gold-grad">`.
- Data/eyebrow labels: `font-data text-[10px] uppercase tracking-[0.25em] text-gold-bright`.
- Escape apostrophes in JSX (`Let&apos;s`) — ESLint enforces `react/no-unescaped-entities`.
- **All page copy goes through `messages/{en,ig}.json`** via `getTranslations` /
  `useTranslations`. Keep both files key-parity locked. Proper nouns may stay
  identical across locales.
- Motion: wrap sections in `<Reveal>` / grids in `<RevealGroup>+<RevealItem>`;
  never add raw entrance animations without a reduced-motion guard.
- The old parchment/white-card look is intentionally retired.

## 5. Verified status (as of 2026-11-09 launch-completion pass)

- `npm run build` — clean (34 routes incl. news slugs, admin, robots, sitemap).
- `npm run lint` — 0 errors, 0 warnings.
- Forms: Zod → Neon → Resend (email HTML escaped); admin console at `/admin`.
- i18n: 362 keys parity en↔ig; Igbo rewritten for sense/orthography (still worth
  a native-speaker polish pass before public marketing push).

## 6. Environment quirks learned (do not rediscover the hard way)

1. **`next dev` (Turbopack) can hang on this Windows machine**: if it won't
   serve, run `npm run build` then `npm run start -- -H 0.0.0.0`.
2. Prefer `Invoke-WebRequest` or curl against `127.0.0.1` when probing locally.
3. Keep `.gitignore` UTF-8.
4. Leave `turbopack.root: __dirname` in `next.config.ts`.
5. Kill stray servers via `Get-NetTCPConnection -LocalPort 3000`.
6. Pushes to origin (github.com/Okeys0/iedf-site) need owner confirmation.

## 7. Where to continue next (remaining external / owner items)

**Blocked on owner assets or credentials (cannot invent):**
1. Real site photography for Industrial Cluster + Gas-to-Power cards
   (`lib/content/projects.ts` still flags illustrative images).
2. More Ikeduru-specific gallery photos (`lib/content/gallery.ts` has 2).
3. Wire production envs: `DATABASE_URL`, `RESEND_*`, `ADMIN_NOTIFICATION_EMAIL`,
   `ADMIN_SECRET`, `NEXT_PUBLIC_SITE_URL=https://www.iedf.org.ng`.
4. Verify Resend sending domain; enable departmental Contact routing once real
   inboxes exist (`inquiryRoutingMap` in `lib/validations/forms.ts`).
5. Live giving / payment processor → flip Join Us from intent to donate.
6. Sanity studio + project IDs → replace `lib/content/*` fetches.
7. Optional: Cloudflare Turnstile + newsletter ESP (`NEWSLETTER_API_KEY`).
8. Native Igbo speaker final review of `messages/ig.json`.
9. Formal counsel sign-off on Privacy if required; accessibility / perf audit
   on throttled network; investor PDF for Projects resource card; social URLs.

## 8. Command cheat sheet

```bash
npm run build                 # production build
npm run start -- -H 0.0.0.0   # serve on port 3000 (recommended locally)
npm run dev                   # see quirk #6.1 if it hangs
npm run lint                  # must stay 0 errors
cp .env.example .env.local    # DATABASE_URL, RESEND_*, ADMIN_*, SITE_URL
```

## 9. Session log

- **2026-11-08/09 — Emerald Luxe overhaul (commit `adcffa5`).** Complete visual
  redesign: dark-gradient glass system, Instrument Serif editorial type, motion
  primitives, floating glass header, cinematic Home, every page restyled.
  Infra: `middleware.ts` → `proxy.ts`, `turbopack.root`, `.gitignore` UTF-8.
- **2026-11-09 — Launch-completion pass.** Full Privacy Policy; News index +
  3 milestone articles (`lib/content/news.ts`); About Ikeduru Statistics /
  Headquarters / Economic Activities with named sources; home Momentum counters
  fixed to real numerics (2025 / 9 execs / 3 initiatives / 29 communities);
  home ProjectCard i18n; mobile About submenu; branded OG (`public/images/og-iedf.jpg`);
  `/admin` submissions console + `ADMIN_SECRET`; robots/sitemap; email HTML
  escaping; Sanity `community` schema aligned; complete Igbo rewrite (362 keys
  parity); removed obsolete `igbuild/` + `NavDropdown.tsx`; root `app/layout.tsx`
  for fonts/metadata. Build + lint clean.
