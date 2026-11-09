import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, ArrowUpRight } from "lucide-react";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  const explore = [
    { href: `/${locale}/about`, label: nav("about") },
    { href: `/${locale}/about-ikeduru`, label: nav("aboutIkeduru") },
    { href: `/${locale}/news`, label: nav("news") },
  ];
  const getInvolved = [
    { href: `/${locale}/projects`, label: nav("projects") },
    { href: `/${locale}/join-us`, label: nav("joinUs") },
    { href: `/${locale}/contact`, label: nav("contact") },
  ];

  return (
    <footer className="relative mt-28 overflow-hidden">
      {/* Gold gradient hairline */}
      <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-px" />
      {/* Glow ember */}
      <div
        aria-hidden="true"
        className="absolute -bottom-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(212,167,52,0.4), transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-16">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand block — logo-forward */}
          <div>
            <Link href={`/${locale}`} className="group mb-5 inline-flex flex-col items-start gap-4">
              <span className="relative">
                <span
                  aria-hidden="true"
                  className="absolute inset-[-10px] rounded-full opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-90"
                  style={{ background: "radial-gradient(circle, rgba(212,167,52,0.5), transparent 70%)" }}
                />
                <span className="glass-strong relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl sm:h-[5.25rem] sm:w-[5.25rem]">
                  <Image
                    src="/images/logo-mark.png"
                    alt="IEDF logo mark"
                    width={72}
                    height={72}
                    className="h-14 w-14 sm:h-16 sm:w-16"
                  />
                </span>
              </span>
              <span>
                <span className="block font-display text-2xl text-ink sm:text-3xl">
                  IEDF<span className="text-gold-grad">.</span>
                </span>
                <span className="mt-1 block max-w-[18ch] font-display text-[15px] leading-snug italic text-ink-muted sm:max-w-[22ch] sm:text-base">
                  {t("orgName")}
                </span>
              </span>
            </Link>
            <p className="mb-1 font-data text-[10px] uppercase tracking-[0.22em] text-gold-bright">
              {t("tagline")}
            </p>
            <p className="mt-3 max-w-[36ch] text-[13px] leading-relaxed text-ink-faint">
              {t("blurb")}
            </p>
          </div>

          <nav aria-label="Footer — explore">
            <div className="mb-3 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
              {t("explore")}
            </div>
            <ul className="space-y-2">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13.5px] text-ink-muted transition-colors hover:text-gold-pale">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — get involved">
            <div className="mb-3 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
              {t("getInvolved")}
            </div>
            <ul className="space-y-2">
              {getInvolved.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13.5px] text-ink-muted transition-colors hover:text-gold-pale">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <div className="mb-3 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
              {t("connect")}
            </div>
            <p className="mb-4 text-[13px] leading-relaxed text-ink-faint">
              {t("connectText")}
            </p>
            <a
              href={`/${locale}/contact`}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-ink-muted transition-all duration-300 hover:border-gold/40 hover:text-gold-pale"
            >
              <Mail size={14} />
              {t("ctaReach")}
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Legal strip */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-gold/15 pt-6 text-[12px] text-ink-faint sm:flex-row sm:items-center">
          <p className="max-w-[70ch]">
            {t("apolitical")}
          </p>
          <p className="flex items-center gap-4">
            <Link href={`/${locale}/privacy`} className="transition-colors hover:text-gold-pale">
              {t("privacy")}
            </Link>
            <span aria-hidden="true" className="h-3 w-px bg-white/10" />
            <span>
              © {new Date().getFullYear()} IEDF. {t("rights")}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
