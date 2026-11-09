import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Landmark, ScrollText, Sprout } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { autonomousCommunities } from "@/lib/content/communities";
import { ikeduruGalleryImages } from "@/lib/content/gallery";
import { placeStatistics } from "@/lib/content/statistics";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { AccentLine } from "@/lib/accent";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";

export const metadata: Metadata = {
  title: "About Ikeduru",
  description:
    "History, statistics, headquarters, communities, and economic life of Ikeduru LGA, Imo State, Nigeria.",
};

export default async function AboutIkeduruPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutIkeduru" });

  const historyParagraphs = [
    "historyP1",
    "historyP2",
    "historyP3",
    "historyP4",
    "historyP5",
    "historyP6",
    "historyP7",
    "historyP8",
  ] as const;

  const sourceKeys = [
    "srcUnion",
    "srcWiki",
    "srcIedf",
    "srcCityPop",
    "srcLgaPortal",
  ] as const;

  const economicKeys = [
    "econP1",
    "econP2",
    "econP3",
    "econP4",
  ] as const;

  const hqKeys = ["hqP1", "hqP2", "hqP3"] as const;

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <AccentLine text={t("heroTitle")} accent={t("heroTitleAccent")} />
        }
        subline={t("heroSubline")}
      />

      {/* Gallery */}
      <section className="mx-auto mb-20 max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow={t("galleryEyebrow")}
          title={
            <AccentLine
              text={t("galleryTitle")}
              accent={t("galleryAccent")}
            />
          }
        />
        {ikeduruGalleryImages.length > 0 ? (
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.14}>
            {ikeduruGalleryImages.map((img, i) => (
              <RevealItem key={i}>
                <figure className="glass group relative overflow-hidden rounded-3xl">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
                    {img.caption && (
                      <figcaption className="absolute bottom-4 left-5 right-5 text-sm italic text-ink">
                        {i === 1 ? t("galleryCaptionCeremony") : img.caption}
                      </figcaption>
                    )}
                  </div>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <Reveal className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="glass flex h-32 items-center justify-center rounded-2xl text-xs text-ink-faint"
              >
                {t("photoPending")}
              </div>
            ))}
          </Reveal>
        )}
      </section>

      {/* History */}
      <section id="history" className="mx-auto mb-20 max-w-3xl scroll-mt-28 px-6">
        <SectionHeading
          align="left"
          eyebrow={t("historyEyebrow")}
          title={
            <AccentLine text={t("historyTitle")} accent={t("historyAccent")} />
          }
        />
        <Reveal className="mt-10 space-y-6 text-[15px] leading-[1.85] text-ink-muted [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:font-display [&>p:first-child]:first-letter:text-[4.4rem] [&>p:first-child]:first-letter:leading-[0.85] [&>p:first-child]:first-letter:text-gold-grad">
          {historyParagraphs.map((key) => (
            <p key={key}>{t(key)}</p>
          ))}
        </Reveal>
      </section>

      {/* Statistics — sourced */}
      <section id="statistics" className="mx-auto mb-20 max-w-6xl scroll-mt-28 px-6">
        <SectionHeading
          align="left"
          eyebrow={t("statsEyebrow")}
          title={
            <AccentLine text={t("statsTitle")} accent={t("statsAccent")} />
          }
          subline={t("statsSubline")}
        />
        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {placeStatistics.map((stat) => (
            <RevealItem key={stat.id}>
              <SpotlightCard className="glass-hover h-full rounded-3xl p-6">
                <div className="font-data text-3xl font-semibold text-gold-grad sm:text-4xl">
                  {stat.value}
                </div>
                <h3 className="mt-3 text-[15px] font-semibold text-ink">
                  {t(stat.labelKey)}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-faint">
                  {t(stat.sourceKey)}
                </p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* LGA Headquarters — apolitical (no elected office-holders) */}
      <section id="lga-leadership" className="mx-auto mb-20 max-w-3xl scroll-mt-28 px-6">
        <SectionHeading
          align="left"
          eyebrow={t("hqEyebrow")}
          title={
            <AccentLine text={t("lgaTitle")} accent={t("lgaAccent")} />
          }
        />
        <Reveal className="mt-10">
          <SpotlightCard className="rounded-[2rem] p-8 sm:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold-bright">
              <Landmark size={22} strokeWidth={1.6} />
            </div>
            <div className="space-y-5 text-[15px] leading-[1.85] text-ink-muted">
              {hqKeys.map((key) => (
                <p key={key}>{t(key)}</p>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </section>

      {/* Autonomous communities */}
      <section id="communities" className="mx-auto mb-20 max-w-6xl scroll-mt-28 px-6">
        <SectionHeading
          align="left"
          eyebrow={t("communitiesEyebrow")}
          title={
            <AccentLine
              text={t("communitiesTitle")}
              accent={t("communitiesAccent")}
            />
          }
          subline={t("communitiesSubline")}
        />
        <RevealGroup className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.045}>
          {autonomousCommunities.map((c) => (
            <RevealItem key={c.order}>
              <SpotlightCard className="glass-hover group h-full rounded-2xl border-dashed p-4.5 xl:p-5">
                <div className="mb-1.5 flex items-baseline gap-2.5">
                  <span className="font-data text-[11px] font-semibold text-gold-bright/70 transition-colors group-hover:text-gold-bright">
                    {String(c.order).padStart(2, "0")}
                  </span>
                  <h3 className="text-[15px] font-semibold text-ink transition-colors group-hover:text-gold-pale">
                    {c.name}
                  </h3>
                  {c.context && <span className="text-[11px] text-ink-faint">({c.context})</span>}
                  {(c.ruler.startsWith("Vacant") || c.note) && (
                    <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 rounded-full bg-ink-faint/50" />
                  )}
                </div>
                <p className="text-[12.5px] leading-relaxed text-ink-muted">
                  {c.ruler.startsWith("Vacant") ? t("vacant") : c.ruler}
                </p>
                {c.note && (
                  <p className="mt-1 text-[11px] italic text-ink-faint">
                    {t("noteIkembara")}
                  </p>
                )}
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Economic activities */}
      <section id="economic-activities" className="mx-auto mb-16 max-w-3xl scroll-mt-28 px-6">
        <SectionHeading
          align="left"
          eyebrow={t("econEyebrow")}
          title={
            <AccentLine text={t("economicTitle")} accent={t("econAccent")} />
          }
        />
        <Reveal className="mt-10">
          <SpotlightCard className="rounded-[2rem] p-8 sm:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald/30 bg-emerald/10 text-mint">
              <Sprout size={22} strokeWidth={1.6} />
            </div>
            <div className="space-y-5 text-[15px] leading-[1.85] text-ink-muted">
              {economicKeys.map((key) => (
                <p key={key}>{t(key)}</p>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </section>

      {/* Sources */}
      <section className="mx-auto mb-8 max-w-3xl px-6 pb-12">
        <Reveal>
          <div className="glass rounded-3xl p-7">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold-bright">
                <ScrollText size={16} strokeWidth={1.6} />
              </div>
              <span className="font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
                {t("sourcesLabel")}
              </span>
            </div>
            <ul className="space-y-3 text-[13px] leading-relaxed text-ink-muted">
              {sourceKeys.map((key) => (
                <li key={key} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold/60" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2 text-[12px] leading-relaxed text-ink-faint">
              <Building2 size={14} className="mt-0.5 shrink-0" />
              {t("apoliticalNote")}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
