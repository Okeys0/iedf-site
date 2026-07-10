import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import logoMark from "@/public/images/logo-mark.png";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  const links = [
    { href: `/${locale}/about`, label: nav("about") },
    { href: `/${locale}/about-ikeduru`, label: nav("aboutIkeduru") },
    { href: `/${locale}/projects`, label: nav("projects") },
    { href: `/${locale}/join-us`, label: nav("joinUs") },
    { href: `/${locale}/news`, label: nav("news") },
    { href: `/${locale}/contact`, label: nav("contact") },
  ];

  return (
    <footer className="mt-16 border-t border-black/10 bg-black/[0.02]">
      <div className="mx-auto max-w-[1080px] px-6 py-10 text-sm text-[var(--color-soil)]">
        <div className="mb-6 flex items-center gap-2.5">
          <Image
            src={logoMark}
            alt="IEDF — Ikeduru Economic Development Forum"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-display text-sm font-bold text-[var(--color-forest)]">
            IEDF
          </span>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-forest)]">
              Sitemap
            </div>
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[var(--color-forest)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-forest)]">
              Connect
            </div>
            {/* Social channel links — to be added once confirmed (Brief, Open Question 4) */}
            <p className="text-xs">Social channels — coming soon</p>
          </div>
        </div>

        <p className="border-t border-black/10 pt-4 text-xs">
          {t("apolitical")}
          {" · "}
          <Link href={`/${locale}/privacy`} className="underline hover:text-[var(--color-forest)]">
            {t("privacy")}
          </Link>
          {" · © "}
          {new Date().getFullYear()} IEDF. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
