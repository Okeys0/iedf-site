"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useScrolled } from "@/components/motion/ScrollProgress";
import { routing } from "@/i18n/routing";

export function Header() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const locale = useLocale();
  const scrolled = useScrolled(24);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/about-ikeduru`, label: t("aboutIkeduru") },
    { href: `/${locale}/projects`, label: t("projects") },
    { href: `/${locale}/donate`, label: t("donate") },
    { href: `/${locale}/news`, label: t("news") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  // Keep <html lang> in sync with the active locale (root layout defaults to en).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Close mobile drawer on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Locale switcher keeps the current page: swap the leading /{locale}
  // segment of the active pathname (root falls back to the new root).
  function localeHref(loc: string) {
    const path = pathname ?? "/";
    const seg = new RegExp(`^/${locale}(?=/|$)`);
    return seg.test(path) ? path.replace(seg, `/${loc}`) : `/${loc}`;
  }

  const linkCls =
    "relative text-[13.5px] font-medium text-ink-muted hover:text-ink transition-colors duration-200 after:absolute after:-bottom-1 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 hover:after:w-full";

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-[80] flex justify-center px-4">
        <div
          className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "glass-strong shadow-[0_16px_50px_-12px_rgba(8,28,18,0.75)]"
              : "border border-gold/15 bg-forest/25 backdrop-blur-md"
          }`}
        >
          {/* Brand */}
          <Link href={`/${locale}`} className="group flex items-center gap-2.5" aria-label="IEDF home">
            <span className="relative">
              <Image
                src="/images/logo-mark.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
              />
            </span>
            <span className="font-display text-xl tracking-wide text-ink">
              IEDF
              <span className="text-gold-grad">.</span>
            </span>
          </Link>

          {/* Desktop nav — flat links only, no dropdowns */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkCls}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2.5">
            <div
              className="hidden items-center rounded-full border border-gold/20 bg-forest-deep/50 p-0.5 sm:flex"
              aria-label="Language switcher"
            >
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={localeHref(loc)}
                  aria-current={loc === locale ? "true" : undefined}
                  aria-label={loc === "en" ? t("langToEn") : t("langToIg")}
                  className={`rounded-full px-3 py-1 font-data text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                    loc === locale
                      ? "bg-[linear-gradient(115deg,#f6e7b2,#e8c76a_30%,#c9982f_100%)] text-night"
                      : "text-ink-faint hover:text-ink"
                  }`}
                >
                  {loc}
                </Link>
              ))}
            </div>

            <Link
              href={`/${locale}/join-us`}
              className="hidden rounded-full bg-[linear-gradient(115deg,#e8c76a,#c9982f)] px-4 py-2 text-[13px] font-bold text-night shadow-[0_6px_24px_-6px_rgba(201,152,47,0.6)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_32px_-6px_rgba(201,152,47,0.8)] sm:block"
            >
              {t("joinUs")}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t("menuOpen")}
              aria-expanded={mobileOpen}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-ink hover:border-gold/30 hover:text-gold-bright lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col bg-forest-deep/95 backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-5 pt-5">
              <span className="font-display text-lg text-ink">
                IEDF<span className="text-gold-grad">.</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t("menuClose")}
                className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-ink hover:text-gold-bright"
              >
                <X size={18} />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col justify-center gap-0.5 px-5"
              aria-label="Mobile primary"
            >
              {[...links, { href: `/${locale}/join-us`, label: t("joinUs") }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.035, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-baseline gap-3 rounded-xl px-2 py-2.5 active:bg-white/[0.04]"
                  >
                    <span className="font-data w-5 text-[10px] text-gold/55">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.35rem] leading-none text-ink transition-colors group-hover:text-gold-pale">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
              <div className="flex gap-1.5" aria-label="Language switcher">
                {routing.locales.map((loc) => (
                  <Link
                    key={loc}
                    href={localeHref(loc)}
                    onClick={() => setMobileOpen(false)}
                    aria-label={loc === "en" ? t("langToEn") : t("langToIg")}
                    className={`rounded-full border px-3 py-1 font-data text-[10px] font-semibold uppercase tracking-[0.16em] ${
                      loc === locale ? "border-gold/60 text-gold-bright" : "border-white/10 text-ink-faint"
                    }`}
                  >
                    {loc}
                  </Link>
                ))}
              </div>
              <span className="font-data text-[9px] uppercase tracking-[0.22em] text-ink-faint">
                {tf("location")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
