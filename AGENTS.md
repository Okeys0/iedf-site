# AGENTS.md — IEDF Website

Living context file for any AI agent (or human) resuming work on this repo.
**Read this first — it tells you what was done, how things work, and where to
pick up next.** Keep it updated at the end of every work session.

> Last session completed: **2026-11-08/09 — "Emerald Luxe" full visual overhaul**
> (commit `adcffa5` on `main`). Site verified: build ✓, lint ✓, all 10 routes 200.

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
app/globals.css               → ENTIRE design system: tokens, .glass/.glass-strong,
                                .glass-hover, .spotlight-card, .text-gold-grad,
                                .text-shimmer, .hairline-gold, glow classes,
                                aurora/shimmer/marquee/float/pulse/scroll-cue
                                keyframes, scrollbar/selection, reduced-motion killswitch
app/[locale]/layout.tsx       → fonts (Instrument Serif display + Work Sans body +
                                IBM Plex Mono data), NextIntlClientProvider,
                                global ArnoraBackground + ScrollProgress + Header + Footer
app/[locale]/page.tsx         → Home (hero, marquee, projects, pillars, counters,
                                milestone beam, newsletter slab)
app/[locale]/about/           → About (editorial story + V/M + apolitical band)
app/[locale]/about/leadership → 9 exec-committee cards
app/[locale]/about-ikeduru    → The place: gallery, 29 communities, pending sections
app/[locale]/projects         → Active projects + glowing roadmap band + CTA cards
app/[locale]/join-us          → Member/volunteer + giving-intent forms
app/[locale]/contact|news|privacy
app/api/{contact,member-signup,newsletter}/route.ts  → form handlers (worked, production-tested)
proxy.ts                      → next-intl locale proxy (Next 16 renamed middleware→proxy; do not
                                recreate middleware.ts)
components/motion/Reveal.tsx    → Reveal / RevealGroup / RevealItem (scroll+load reveals)
components/motion/Counter.tsx   → animated count-up (renders raw value if non-numeric)
components/motion/AuroraBackground.tsx → fixed ambient orbs + grain + vignette
components/motion/ScrollProgress.tsx   → gold top progress beam + useScrolled() hook
components/Header.tsx         → CLIENT comp using useTranslations/useLocale (floating glass pill
                                nav, About dropdown, scroll state, full-screen mobile drawer)
components/Footer.tsx         → server comp (footer with gold hairline + ember glow)
components/SpotlightCard.tsx  → glass card w/ cursor-tracked highlight (sets --spot-x/--spot-y)
components/PageHero.tsx, SectionHeading.tsx, Marquee.tsx, Button.tsx, Tag.tsx,
components/MilestoneLine.tsx, ProjectCard.tsx, NewsletterForm.tsx, ContactForm.tsx,
components/SubmitForm.tsx, ExpandableText.tsx, NavDropdown.tsx (legacy, superseded by Header)
lib/content/*.ts              → local content shaped like future Sanity schemas
lib/clamp.ts                  → used by spotlight tracking
lib/db/schema.sql             → Neon submissions table (paste into Neon SQL editor once)
messages/en.json, ig.json     → nav/home/footer/tags strings. Most page copy is
                                hardcoded English (matches pre-existing pattern)
```

## 4. How to compose UI here (design-system rules)

- Page containers: `mx-auto max-w-6xl px-6`; vertical rhythm `py-24`–`py-28`.
- Cards: `<SpotlightCard className="glass-hover rounded-3xl ...">`.
- Section headers: `<SectionHeading eyebrow="…" title={<>… <em className="text-gold-grad">word</em></>} />`.
- Page openers: `<PageHero eyebrow title subline />` (clears the fixed header via pt-36/pt-44).
- CTAs: `<Button href variant="primary|secondary|ghost" size="md|lg">`.
- Gold accent inside headings: wrap word in `<em className="text-gold-grad">`.
- Data/eyebrow labels: `font-data text-[10px] uppercase tracking-[0.25em] text-gold-bright`.
- Escape apostrophes in JSX (`Let&apos;s`) — ESLint enforces `react/no-unescaped-entities`.
- Narrative pages (About, Projects, Contact) are hardcoded English by design;
  use `useTranslations` (client) / `getTranslations` (server) only for
  nav/home/footer/tags namespaces or new translatable dashes (keep both en+ig in sync).
- Motion: wrap sections in `<Reveal>` / grids in `<RevealGroup>+<RevealItem>`;
  never add raw entrance animations without a reduced-motion guard.
- The old parchment/white-card look is intentionally retired; don't reintroduce
  `--color-parchment`, forest-tint panels, or `rounded-[7px]` springs from pre-overhaul code.

## 5. Verified status (as of last commit `adcffa5`)

- `npm run build` — clean (24 pages, no warnings; `turbopack.root` pinned,
  `proxy.ts` convention in place).
- `npm run lint` — 0 errors, 0 warnings.
- All routes 200 on prod server incl. `/ig`: en, ig, about, leadership,
  projects, about-ikeduru, join-us, contact, news, privacy.
- Forms: API routes compile and ran end-to-end against Neon in earlier testing
  (see README). Local form runs need `.env.local` (copy `.env.example`).

## 6. Environment quirks learned (do not rediscover the hard way)

1. **`next dev` (Turbopack) can hang on this Windows machine**: accepts TCP
   connections but never writes responses (verified via netstat ESTABLISHED
   with zero bytes). If `next dev` won't serve, don't rabbit-hole — run the
   production server instead:
   `npm run build` then `npm run start -- -H 0.0.0.0` (background, port 3000).
   Bind 0.0.0.0 so `localhost` works over IPv6 *and* IPv4.
2. **curl on this box sometimes returns `000` to `localhost`** even when the
   server is fine — prefer `Invoke-WebRequest` or curl against `127.0.0.1`
   when probing.
3. `.gitignore` was originally saved UTF-16, so git ignored the ignore and
   almost committed `node_modules/`. Now rewritten UTF-8 with standard
   Next.js entries. Keep it UTF-8.
4. Workspace-root inference: the parent dirs also contain `package-lock.json`
   files, hence `turbopack.root: __dirname` in `next.config.ts`. Leave it.
5. Kill stray dev servers via the PID from
   `Get-NetTCPConnection -LocalPort 3000` — then verify port is free.
6. Repo has no remote set up locally beyond origin (github.com/Okeys0/iedf-site);
   pushes should be confirmed with the owner.

## 7. Where to continue next (priority order)

**Polish & assets (design phase, effort ~S)**
1. Real photography: swap placeholder images in `lib/content/projects.ts`
   (Industrial Cluster + Gas-to-Power are *not confirmed* to show the real
   sites — README caveat) and populate `lib/content/gallery.ts` for About Ikeduru.
2. Generate a branded OG image (dark emerald + gold IEDF lockup) and set it in
   `layout.tsx` metadata; wire `NEXT_PUBLIC_SITE_URL` once domain is confirmed.
3. Real stats for the Momentum counters (replace founding-date-as-year
   hack: `t("milestoneFoundedDate")` used as a stat currently shows "2025").

**Content & features (roadmap, effort ~M–L)**
4. Milestone 2: About narrative + leadership bios are in; fill remaining
   placeholders (Join Us copy, News posts).
5. Milestone 3: About-Ikeduru History/Statistics/LGA Leadership sections still
   need named external sourcing (apolitical charter requirement).
6. Wire Sanity: studio scaffold → copy `/sanity/schemaTypes` → set
   `NEXT_PUBLIC_SANITY_*` envs → swap `lib/content/*` for `sanityClient.fetch`.
7. Milestone 4: admin view for form submissions (instead of raw Neon SQL);
   departmental email routing for Contact once real inboxes exist.
8. Igbo translations: `messages/ig.json` is machine-drafted — needs a native
   speaker review before launch (flagged in README).
9. Legal: privacy-policy content (Milestone 5), accessibility audit pass,
   performance pass on throttled network.

**If the owner reports design issues** — check `messages/en.json` for home copy,
`lib/content/*` for projects/leadership/communities data, and `app/globals.css`
tokens before touching component markup.

## 8. Command cheat sheet

```bash
npm run build                 # production build (clean, verified)
npm run start -- -H 0.0.0.0   # serve the built app on port 3000 (recommended locally)
npm run dev                   # dev server — see quirk #6.1 if it hangs
npm run lint                  # must stay 0 errors
cp .env.example .env.local    # then fill DATABASE_URL (Neon), RESEND_API_KEY, admin email
```

## 9. Session log

- **2026-11-08/09 — Emerald Luxe overhaul (commit `adcffa5`).** Complete visual
  redesign: dark-gradient glass system, Instrument Serif editorial type, motion
  primitives (`components/motion/*`), floating glass header + mobile drawer,
  cinematic hero + marquee + spotlight cards + counters on Home, every page
  restyled, forms re-skinned (logic untouched). Infra fixes: `middleware.ts` →
  `proxy.ts`, `turbopack.root`, `.gitignore` UTF-8 rewrite, multiple lockfiles
  warning resolved. Prod server verified serving all routes on localhost:3000.
- *(add one bullet here at the end of every future session)*
