import { defineRouting } from "next-intl/routing";

/**
 * IEDF supports English (default) and Igbo.
 * Per the Content Outline / Technical Architecture, Igbo translations
 * are scoped to key pages at launch (Home, About: Our Story & Mission,
 * Contact) — untranslated fields fall back to English automatically,
 * they are never a broken/missing page.
 */
export const routing = defineRouting({
  locales: ["en", "ig"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
