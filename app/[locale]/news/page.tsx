import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Newspaper, PenLine, Rss } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { AccentLine } from "@/lib/accent";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { newsPosts } from "@/lib/content/news";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Announcements, events, and press mentions from IEDF.",
};

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });

  const categoryLabel = (category: string) => {
    if (category === "event") return t("catEvent");
    if (category === "press") return t("catPress");
    return t("catAnnouncement");
  };

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <AccentLine text={t("heroTitle")} accent={t("heroTitleAccent")} />
        }
        subline={t("heroSubline")}
      />

      {newsPosts.length === 0 ? (
        <section className="mx-auto max-w-3xl px-6 pb-10">
          <Reveal>
            <div className="glass-strong relative overflow-hidden rounded-[2rem] px-8 py-16 text-center sm:px-14">
              <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-px" />
              <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold-bright">
                <Newspaper size={24} strokeWidth={1.4} />
              </div>
              <h2 className="mx-auto mb-3 max-w-md text-3xl">
                <AccentLine text={t("emptyTitle")} accent={t("emptyAccent")} />
              </h2>
              <p className="mx-auto mb-8 max-w-md text-[14.5px] leading-relaxed text-ink-muted">
                {t("emptyText")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button href={`/${locale}/join-us`} variant="secondary">
                  {t("ctaSubscribe")}
                  <Rss size={14} />
                </Button>
                <Button href={`/${locale}/contact`} variant="secondary">
                  {t("ctaPress")}
                  <PenLine size={14} />
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      ) : (
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <RevealGroup className="space-y-4" stagger={0.1}>
            {newsPosts.map((post) => (
              <RevealItem key={post.slug}>
                <SpotlightCard as="article" className="glass-hover rounded-3xl p-6 sm:p-8">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 font-data text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-bright">
                      {categoryLabel(post.category)}
                    </span>
                    <time
                      dateTime={post.date}
                      className="font-data text-[11px] uppercase tracking-[0.16em] text-ink-faint"
                    >
                      {new Date(post.date).toLocaleDateString(
                        locale === "ig" ? "en-GB" : locale,
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </time>
                  </div>
                  <h2 className="mb-2 text-2xl sm:text-3xl">
                    {t(`${post.messageKey}Title`)}
                  </h2>
                  <p className="mb-5 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-muted">
                    {t(`${post.messageKey}Summary`)}
                  </p>
                  <Link
                    href={`/${locale}/news/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-bright transition-colors hover:text-gold-pale"
                  >
                    {t("readArticle")}
                    <ArrowUpRight size={15} />
                  </Link>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12 flex flex-wrap items-center gap-3">
            <Button href={`/${locale}/join-us`} variant="secondary">
              {t("ctaSubscribe")}
              <Rss size={14} />
            </Button>
            <Button href={`/${locale}/contact`} variant="ghost">
              {t("ctaPress")}
              <PenLine size={14} />
            </Button>
          </Reveal>
        </section>
      )}
    </>
  );
}
