import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Scale } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { MilestoneLine } from "@/components/MilestoneLine";
import { ExpandableText } from "@/components/ExpandableText";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { AccentLine } from "@/lib/accent";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";

export const metadata: Metadata = {
  title: "About IEDF",
  description:
    "The story of IEDF — from a founding meeting in Umuoziri Inyishi to a governed institution driving Ikeduru's economic development.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const storyParagraphs = ["storyP1", "storyP2", "storyP3", "storyP4", "storyP5"] as const;

  const facts = [
    ["formedLabel", "formedValue"],
    ["meetingLabel", "meetingValue"],
    ["hostLabel", "hostValue"],
    ["attendeesLabel", "attendeesValue"],
    ["statusLabel", "statusValue"],
  ] as const;

  const milestones = [
    { date: t("formedValue"), label: t("milestoneFoundedLabel") },
    { date: tHome("milestoneInauguratedDate"), label: t("milestoneInauguratedLabel") },
    { date: tHome("milestoneToday"), label: t("milestoneTodayLabel"), variant: "future" as const },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <AccentLine text={t("heroTitle")} accent={t("heroTitleAccent")} />
        }
        subline={t("heroSubline")}
      />

      {/* Milestone beam */}
      <section className="mx-auto mb-16 max-w-4xl px-6">
        <Reveal>
          <MilestoneLine size="full" points={milestones} />
        </Reveal>
      </section>

      {/* Founding narrative — editorial two-column feel */}
      <section className="mx-auto mb-20 grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_280px]">
        <Reveal>
          <div className="[&>div>p:first-child]:first-letter:float-left [&>div>p:first-child]:first-letter:mr-3 [&>div>p:first-child]:first-letter:font-display [&>div>p:first-child]:first-letter:text-[4.4rem] [&>div>p:first-child]:first-letter:leading-[0.85] [&>div>p:first-child]:first-letter:text-gold-grad">
            <ExpandableText
              initiallyShown={2}
              paragraphs={storyParagraphs.map((key) => t(key))}
              readMoreLabel={t("readMore")}
              showLessLabel={t("showLess")}
            />
          </div>
        </Reveal>

        {/* Sidebar: founding facts */}
        <Reveal delay={0.15}>
          <SpotlightCard className="glass-hover sticky top-28 rounded-3xl p-6">
            <div className="mb-4 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
              {t("factsTitle")}
            </div>
            <dl className="space-y-4 text-[13px]">
              {facts.map(([dt, dd]) => (
                <div key={dt} className="border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                  <dt className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    {t(dt)}
                  </dt>
                  <dd className="leading-relaxed text-ink">{t(dd)}</dd>
                </div>
              ))}
            </dl>
          </SpotlightCard>
        </Reveal>
      </section>

      {/* Vision & Mission — glass twin cards */}
      <section id="vision-mission" className="mx-auto mb-20 max-w-6xl scroll-mt-28 px-6">
        <SectionHeading
          eyebrow={t("vmEyebrow")}
          title={
            <AccentLine text={t("vmTitle")} accent={t("vmAccent")} />
          }
        />
        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <RevealItem>
            <SpotlightCard className="glass-hover h-full rounded-3xl p-8 sm:p-10">
              <div className="mb-4 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
                {t("visionLabel")}
              </div>
              <p className="font-display text-[21px] italic leading-relaxed text-ink">
                {t("visionText")}
              </p>
            </SpotlightCard>
          </RevealItem>
          <RevealItem>
            <SpotlightCard className="glass-hover h-full rounded-3xl p-8 sm:p-10">
              <div className="mb-4 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
                {t("missionLabel")}
              </div>
              <p className="text-[15px] leading-[1.9] text-ink-muted">
                {t("missionText")}
              </p>
            </SpotlightCard>
          </RevealItem>
        </RevealGroup>

        {/* Mission infographic in a glass frame */}
        <Reveal className="mt-12">
          <div className="glass relative overflow-hidden rounded-[2rem] p-4 sm:p-8">
            <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-px" />
            <div className="relative mx-auto aspect-square w-full max-w-[620px] overflow-hidden rounded-2xl">
              <Image
                src="/images/mission-visual.jpg"
                alt={t("missionImageAlt")}
                fill
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 rounded-2xl shadow-[inset_0_0_80px_rgba(5,11,8,0.55)]" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Leadership CTA band */}
      <section className="mx-auto mb-20 max-w-6xl px-6">
        <Reveal>
          <Link
            href={`/${locale}/about/leadership`}
            className="glass-strong glass-hover group relative block overflow-hidden rounded-[2rem] p-8 sm:p-12"
          >
            <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-px" />
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-25 blur-[80px] transition-opacity duration-700 group-hover:opacity-50"
              style={{ background: "radial-gradient(circle, rgba(201,152,47,0.5), transparent 70%)" }}
            />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
                  {t("lLeadEyebrow")}
                </div>
                <h2 className="mb-2 text-3xl sm:text-4xl">
                  <AccentLine text={t("lLeadTitle")} accent={t("lLeadAccent")} />
                </h2>
                <p className="max-w-md text-[14.5px] text-ink-muted">
                  {t("lLeadText")}
                </p>
              </div>
              <span className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-gold-pale transition-all duration-300 group-hover:border-gold/50">
                {t("lLeadCta")}
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Apolitical statement */}
      <section className="mx-auto mb-4 max-w-3xl px-6">
        <Reveal>
          <div className="glass flex items-start gap-4 rounded-3xl border-gold/20 p-7 sm:p-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold-bright">
              <Scale size={20} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="mb-1.5 text-xl">{t("apoliticalTitle")}</h2>
              <p className="text-[14.5px] leading-relaxed text-ink-muted">
                {t("apoliticalText")}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
