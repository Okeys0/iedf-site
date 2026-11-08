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
        style={{ background: "radial-gradient(circle, rgba(201,152,47,0.25), transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-16">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand block */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image src="/images/logo-mark.png" alt="IEDF logo mark" width={40} height={40} className="h-10 w-10" />
              <span className="font-display text-2xl text-ink">
                IEDF<span className="text-gold-grad">.</span>
              </span>
            </div>
            <p className="mb-1 font-display text-sm italic text-ink-muted">
              Collaborate. Innovate. Invest. Prosper.
            </p>
            <p className="max-w-[36ch] text-[13px] leading-relaxed text-ink-faint">
              A diaspora-home founded, apolitical forum working toward a self-sustaining Ikeduru,
              Imo State, Nigeria.
            </p>
          </div>

          <nav aria-label="Footer — explore">
            <div className="mb-3 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
              Explore
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
              Get involved
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
              Connect
            </div>
            <p className="mb-4 text-[13px] leading-relaxed text-ink-faint">
              Follow our momentum — social channels launch soon.
            </p>
            <a
              href={`/${locale}/contact`}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-ink-muted transition-all duration-300 hover:border-gold/40 hover:text-gold-pale"
            >
              <Mail size={14} />
              Reach the forum
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Legal strip */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/[0.07] pt-6 text-[12px] text-ink-faint sm:flex-row sm:items-center">
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
