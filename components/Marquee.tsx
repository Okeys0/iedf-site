"use client";

import { useTranslations } from "next-intl";

/**
 * Decorative marquee band — brand tagline motifs gliding past behind a
 * frosted glass strip. Pure CSS (marquee keyframes), duplicated track
 * for a seamless loop. Hidden from assistive tech (decorative).
 * Motto words come from the home namespace so they localize.
 */

function Track({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {[...items, ...items, ...items].map((word, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-2xl italic text-white/25 sm:text-3xl">{word}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold/50" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  const t = useTranslations("home");
  const items = [t("motto1"), t("motto2"), t("motto3"), t("motto4")];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-5 backdrop-blur-sm"
    >
      <div className="flex w-max" style={{ animation: "marquee 38s linear infinite" }}>
        <Track items={items} />
        <Track items={items} />
      </div>
      {/* Edge fades */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-night to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-night to-transparent" />
    </div>
  );
}
