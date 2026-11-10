import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, Handshake, Lightbulb, TrendingUp, Sprout } from "lucide-react";
import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { MilestoneLine } from "@/components/MilestoneLine";
import { ProjectCard } from "@/components/ProjectCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionHeading } from "@/components/SectionHeading";
import { AccentLine } from "@/lib/accent";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { SpotlightCard } from "@/components/SpotlightCard";
import { activeProjects, projectMessageKeys } from "@/lib/content/projects";
import { autonomousCommunities } from "@/lib/content/communities";
import { leaders } from "@/lib/content/leadership";

/** Pillars are icon + translation-key pairs (en/ig in messages/*.json). */
const pillarDefs = [
  { icon: Handshake, titleKey: "pillarCollaborate", textKey: "pillarCollaborateText" },
  { icon: Lightbulb, titleKey: "pillarInnovate", textKey: "pillarInnovateText" },
  { icon: TrendingUp, titleKey: "pillarInvest", textKey: "pillarInvestText" },
  { icon: Sprout, titleKey: "pillarProsper", textKey: "pillarProsperText" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });

  const milestones = [
    { date: t("milestoneFoundedDate"), label: t("milestoneFounded") },
    { date: t("milestoneInauguratedDate"), label: t("milestoneInaugurated") },
    { date: t("milestoneToday"), label: t("milestoneTodayLabel"), variant: "future" as const },
  ];

  const stats = [
    { value: "2025", label: t("statFounded") },
    { value: String(leaders.length), label: t("statExecutives") },
    { value: String(activeProjects.length), label: t("statInitiatives") },
    { value: String(autonomousCommunities.length), label: t("statCommunities") },
  ];

  return (
    <>
      {/* ═══════════ HERO — phone-first, glassy, brand-forward ═══════════ */}
      <section className="relative flex min-h-[100svh] flex-col px-5 pb-6 pt-[6.75rem] sm:px-6 sm:pb-14 sm:pt-36">
        {/* Local atmosphere — gold + emerald washes behind the type */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[22%] h-[16rem] w-[16rem] -translate-x-1/2 rounded-full opacity-55 blur-[80px] sm:top-[28%] sm:h-[26rem] sm:w-[26rem]"
          style={{ background: "radial-gradient(circle, rgba(201,152,47,0.32), transparent 68%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[22%] right-[-6%] h-36 w-36 rounded-full opacity-45 blur-[60px] sm:bottom-[18%] sm:left-[8%] sm:right-auto sm:h-56 sm:w-56"
          style={{ background: "radial-gradient(circle, rgba(47,158,99,0.38), transparent 70%)" }}
        />

        <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center text-center">
          <Reveal when="load">
            <div className="mb-5 flex flex-col items-center gap-3 sm:mb-8 sm:gap-4">
              <span aria-hidden="true" className="hairline-gold h-px w-14 sm:w-20" />
              <span className="relative inline-flex">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[-14%] rounded-full blur-xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(255,248,230,0.38) 0%, rgba(255,248,230,0.12) 55%, transparent 74%)",
                  }}
                />
                <Image
                  src="/images/logo-mark.png"
                  alt="Ikeduru Economic Development Forum"
                  width={280}
                  height={280}
                  priority
                  className="relative h-auto w-44 sm:w-56 md:w-64"
                />
              </span>
              <p className="font-data text-[9px] font-medium uppercase tracking-[0.22em] text-gold-bright sm:text-[10px] sm:tracking-[0.34em]">
                {t("motto1")} · {t("motto2")} · {t("motto3")} · {t("motto4")}
              </p>
            </div>
          </Reveal>

          <Reveal when="load" delay={0.08}>
            <h1 className="mx-auto max-w-[13ch] text-[clamp(2.15rem,9.5vw,4.25rem)] leading-[1.05] tracking-tight text-ink-muted sm:max-w-4xl sm:text-ink">
              <AccentLine text={t("heroHeadline")} accent={t("heroAccent")} />
            </h1>
          </Reveal>

          <Reveal when="load" delay={0.18}>
            <p className="mx-auto mt-4 max-w-[28ch] text-[14.5px] leading-snug text-ink-muted sm:mt-6 sm:hidden">
              {t("heroSubheadMobile")}
            </p>
            <p className="mx-auto mt-6 hidden max-w-xl text-lg leading-relaxed text-ink-muted sm:block">
              {t("heroSubhead")}
            </p>
          </Reveal>

          <Reveal when="load" delay={0.28}>
            <div className="mt-7 flex w-full flex-col gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3.5">
              <Button href={`/${locale}/join-us`} size="lg" className="w-full shadow-[0_12px_40px_-10px_rgba(201,152,47,0.55)] sm:w-auto">
                {t("ctaJoin")}
                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
              <Button
                href={`/${locale}/about`}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t("ctaLearnMore")}
              </Button>
            </div>
          </Reveal>

          <Reveal when="load" delay={0.4} className="mt-7 sm:mt-12">
            <div className="glass-strong mx-auto flex w-full max-w-md items-stretch justify-between rounded-2xl border border-white/10 px-1.5 py-2.5 sm:max-w-xl sm:rounded-full sm:px-2 sm:py-2">
              {[
                { value: t("chipEst"), label: t("milestoneFoundedDate") },
                { value: String(autonomousCommunities.length), label: t("chipCommunities") },
                { value: t("chipContinentsValue"), label: t("chipContinents") },
              ].map((chip, i) => (
                <div key={chip.label} className="flex min-w-0 flex-1 items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="h-7 w-px shrink-0 bg-white/10" />
                  )}
                  <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1.5 sm:flex-row sm:justify-center sm:gap-2 sm:px-4">
                    <span className="font-data text-[12px] font-semibold text-gold-bright sm:text-sm">
                      {chip.value}
                    </span>
                    <span className="truncate text-[9px] leading-tight text-ink-faint sm:text-[12px] sm:text-ink-muted">
                      {chip.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div
          aria-hidden="true"
          className="relative mt-5 hidden flex-col items-center gap-2 text-ink-faint sm:mt-8 sm:flex"
        >
          <span className="font-data text-[9px] uppercase tracking-[0.3em]">{t("scroll")}</span>
          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
            <span
              className="h-2 w-0.5 rounded-full bg-gold-bright"
              style={{ animation: "scroll-cue 1.8s ease-in-out infinite" }}
            />
          </span>
        </div>
      </section>

      {/* ═══════════ Brand marquee ═══════════ */}
      <Marquee />

      {/* ═══════════ Featured projects ═══════════ */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <SectionHeading
          eyebrow={t("featuredProjectsTitle")}
          title={
            <AccentLine text={t("featuredTitle")} accent={t("featuredAccent")} />
          }
          subline={t("featuredSubline")}
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeProjects.map((project) => {
            const keys = projectMessageKeys[project.slug];
            return (
              <RevealItem key={project.slug}>
                <ProjectCard
                  project={project}
                  locale={locale}
                  titleOverride={keys ? tProjects(keys[0]) : undefined}
                  summaryOverride={keys ? tProjects(keys[1]) : undefined}
                />
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-10 text-center">
          <Button href={`/${locale}/projects`} variant="ghost">
            {t("viewProjects")}
          </Button>
        </Reveal>
      </section>

      {/* ═══════════ How the forum works ═══════════ */}
      <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-28">
        <SectionHeading
          eyebrow={t("approachEyebrow")}
          title={
            <AccentLine text={t("approachTitle")} accent={t("approachAccent")} />
          }
          subline={t("approachSubline")}
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.14}>
          {pillarDefs.map((pillar) => (
            <RevealItem key={pillar.titleKey}>
              <SpotlightCard className="glass-hover group h-full rounded-3xl p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold-bright transition-all duration-500 group-hover:scale-110 group-hover:bg-gold/20">
                  <pillar.icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mb-2 font-display text-2xl italic text-ink">{t(pillar.titleKey)}</h3>
                <p className="text-[13px] leading-relaxed text-ink-muted">{t(pillar.textKey)}</p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ═══════════ Momentum counters ═══════════ */}
      <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-28">
        <SectionHeading
          eyebrow={t("momentumTitle")}
          title={
            <AccentLine text={t("numbersTitle")} accent={t("numbersAccent")} />
          }
        />
        <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4" stagger={0.12}>
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <SpotlightCard className="glass-hover rounded-3xl px-5 py-8 text-center">
                <Counter
                  value={stat.value}
                  className="font-data text-4xl font-semibold text-gold-grad sm:text-[42px]"
                />
                <div className="mt-2.5 text-[12px] font-medium uppercase tracking-[0.16em] text-ink-faint">
                  {stat.label}
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ═══════════ Milestones beam ═══════════ */}
      <section className="mx-auto max-w-4xl px-6 pb-24 sm:pb-28">
        <Reveal>
          <MilestoneLine points={milestones} />
        </Reveal>
      </section>

      {/* ═══════════ Newsletter CTA — glass slab ═══════════ */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-16">
            <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-px" />
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-[90px]"
              style={{ background: "radial-gradient(circle, rgba(201,152,47,0.4), transparent 70%)" }}
            />
            <h2 className="mx-auto max-w-xl text-4xl leading-tight sm:text-5xl">
              {t("newsletterTitle")}
            </h2>
            <p className="mx-auto mb-8 mt-4 max-w-md text-ink-muted">{t("newsletterSubtitle")}</p>
            <NewsletterForm
              placeholder={t("newsletterPlaceholder")}
              buttonLabel={t("newsletterButton")}
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
