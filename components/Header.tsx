import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import logoMark from "@/public/images/logo-mark.png";

export async function Header({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "nav" });

  const links = [
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/about-ikeduru`, label: t("aboutIkeduru") },
    { href: `/${locale}/projects`, label: t("projects") },
    { href: `/${locale}/join-us`, label: t("joinUs") },
    { href: `/${locale}/news`, label: t("news") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-4 px-6 py-3">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <Image
            src={logoMark}
            alt="IEDF — Ikeduru Economic Development Forum"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="font-display text-base font-bold leading-tight text-[var(--color-forest)]">
            IEDF
          </span>
        </Link>

        <nav className="flex flex-wrap gap-5 text-sm font-semibold" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-loam)] hover:text-[var(--color-forest)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2 text-xs font-semibold" aria-label="Language switcher">
          {routing.locales.map((loc) => (
            <Link
              key={loc}
              href={`/${loc}`}
              className={`rounded-[7px] border px-2 py-1 ${
                loc === locale
                  ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                  : "border-[var(--color-soil)] text-[var(--color-loam)]"
              }`}
            >
              {loc.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
