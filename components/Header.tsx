"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useScrolled } from "@/components/motion/ScrollProgress";
import { routing } from "@/i18n/routing";

type DropdownItem = { href: string; label: string };

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const scrolled = useScrolled(24);
  const reduced = useReducedMotion();

  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: `/${locale}/about-ikeduru`, label: t("aboutIkeduru") },
    { href: `/${locale}/projects`, label: t("projects") },
    { href: `/${locale}/news`, label: t("news") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const aboutItems: DropdownItem[] = [
    { href: `/${locale}/about`, label: "Our Story" },
    { href: `/${locale}/about#vision-mission`, label: "Vision & Mission" },
    { href: `/${locale}/about/leadership`, label: "Leadership & Governance" },
  ];

  // Close dropdown on outside click / Escape
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAboutOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkCls =
    "relative text-[13.5px] font-medium text-ink-muted hover:text-ink transition-colors duration-200 after:absolute after:-bottom-1 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 hover:after:w-full";

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-[80] flex justify-center px-4">
        <div
          className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "glass-strong shadow-[0_16px_50px_-12px_rgba(0,0,0,0.8)]"
              : "border border-white/[0.06] bg-white/[0.03] backdrop-blur-md"
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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {/* About + dropdown */}
            <div ref={aboutRef} className="relative flex items-center">
              <Link href={`/${locale}/about`} className={linkCls}>
                {t("about")}
              </Link>
              <button
                type="button"
                onClick={() => setAboutOpen((v) => !v)}
                aria-expanded={aboutOpen}
                aria-haspopup="true"
                aria-label={`Show ${t("about")} submenu`}
                className="ml-0.5 p-1 text-ink-muted hover:text-gold-bright"
              >
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-strong absolute left-1/2 top-full z-20 mt-3 min-w-[230px] -translate-x-1/2 rounded-2xl p-1.5"
                  >
                    {aboutItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setAboutOpen(false)}
                        className="block rounded-xl px-4 py-2.5 text-[13px] text-ink-muted transition-colors hover:bg-white/5 hover:text-gold-pale"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkCls}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2.5">
            {/* Language switcher */}
            <div
              className="hidden items-center rounded-full border border-white/10 bg-black/20 p-0.5 sm:flex"
              aria-label="Language switcher"
            >
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  aria-current={loc === locale ? "true" : undefined}
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

            {/* CTA */}
            <Link
              href={`/${locale}/join-us`}
              className="hidden rounded-full bg-[linear-gradient(115deg,#e8c76a,#c9982f)] px-4 py-2 text-[13px] font-bold text-night shadow-[0_6px_24px_-6px_rgba(201,152,47,0.6)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_32px_-6px_rgba(201,152,47,0.8)] sm:block"
            >
              {t("joinUs")}
            </Link>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-ink hover:border-gold/30 hover:text-gold-bright lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — full-screen cinematic glass */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col bg-night/90 backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="font-display text-xl text-ink">
                IEDF<span className="text-gold-grad">.</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-ink hover:text-gold-bright"
              >
                <X size={20} />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col justify-center gap-2 px-8"
              aria-label="Mobile primary"
            >
              {[
                { href: `/${locale}/about`, label: t("about") },
                ...links,
                { href: `/${locale}/join-us`, label: t("joinUs") },
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-baseline gap-4 py-2.5"
                  >
                    <span className="font-data text-xs text-gold/60">0{i + 1}</span>
                    <span className="font-display text-4xl text-ink transition-colors group-hover:text-gold-pale">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-between border-t border-white/10 px-8 py-6">
              <div className="flex gap-2" aria-label="Language switcher">
                {routing.locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}`}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-full border px-4 py-1.5 font-data text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      loc === locale ? "border-gold/60 text-gold-bright" : "border-white/10 text-ink-faint"
                    }`}
                  >
                    {loc}
                  </Link>
                ))}
              </div>
              <span className="font-data text-[10px] uppercase tracking-[0.25em] text-ink-faint">
                Imo State · Nigeria
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
