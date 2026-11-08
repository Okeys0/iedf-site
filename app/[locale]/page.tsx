import { getTranslations } from "next-intl/server";
import { Handshake, Lightbulb, TrendingUp, Sprout } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { MilestoneLine } from "@/components/MilestoneLine";
import { ProjectCard } from "@/components/ProjectCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { SpotlightCard } from "@/components/SpotlightCard";
import { activeProjects } from "@/lib/content/projects";
import { autonomousCommunities } from "@/lib/content/communities";

/** Highlights the given keyword inside a translated heading with the
 *  italic-gold editorial treatment (falls back to plain if absent). */
function accentHeadline(text: string, keyword: string) {
  const idx = text.indexOf(keyword);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <em className="italic text-gold-grad">{keyword}</em>
      {text.slice(idx + keyword.length)}
    </>
  );
}

const pillars = [
  {
    icon: Handshake,
    title: "Collaborate",
    text: "Uniting Ikeduru's sons and daughters — at home and across the diaspora — around a shared development agenda.",
  },
  {
    icon: Lightbulb,
    title: "Innovate",
    text: "Incubating ideas and promoting innovation that turns Ikeduru's latent potential into real opportunity.",
  },
  {
    icon: TrendingUp,
    title: "Invest",
    text: "Building investment capacity for private-sector led growth — from agro-allied industry to power.",
  },
  {
    icon: Sprout,
    title: "Prosper",
    text: "Growing a socially vibrant, prosperous, and self-sustaining Ikeduru for generations to come.",
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const milestones = [
    { date: t("milestoneFoundedDate"), label: t("milestoneFounded") },
    { date: t("milestoneInauguratedDate"), label: t("milestoneInaugurated") },
    { date: t("milestoneToday"), label: t("milestoneTodayLabel"), variant: "future" as const },
  ];

  const stats = [
    { value: t("milestoneFoundedDate"), label: "Founded" },
    { value: t("milestoneInauguratedDate"), label: "Executives Inaugurated" },
    { value: String(activeProjects.length), label: "Active Initiatives" },
    { value: String(autonomousCommunities.length), label: "Autonomous Communities" },
  ];

  return (
    <>
      {/* ═══════════ HERO — cinematic, centered, auroral ═══════════ */}
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center px-6 pt-32 pb-16 text-center">
        {/* Floating logo badge */}
        <Reveal when="load">
          <div
            className="relative mb-8 h-[86px] w-[86px]"
            style={{ animation: "float-slow 7s ease-in-out infinite" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-[-14px] rounded-full opacity-70 blur-xl"
              style={{ background: "radial-gradient(circle, rgba(201,152,47,0.4), transparent 70%)" }}
            />
            <div className="glass-strong absolute inset-0 flex items-center justify-center rounded-full">
              <Image
                src="/images/logo-mark.png"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11"
              />
            </div>
          </div>
        </Reveal>

        <Reveal when="load" delay={0.12}>
          <p className="mb-6 font-data text-[11px] font-medium uppercase tracking-[0.34em] text-ink-muted">
            Ikeduru Economic Development Forum
          </p>
        </Reveal>

        <Reveal when="load" delay={0.22}>
          <h1 className="mx-auto max-w-4xl text-[13.5vw] leading-[1.04] sm:text-6xl md:text-7xl">
            {accentHeadline(t("heroHeadline"), "self-sustaining")}
          </h1>
        </Reveal>

        <Reveal when="load" delay={0.34}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {t("heroSubhead")}
          </p>
        </Reveal>

        <Reveal when="load" delay={0.46}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Button href={`/${locale}/join-us`} size="lg">
              {t("ctaJoin")}
            </Button>
            <Button href={`/${locale}/about`} variant="secondary" size="lg">
              {t("ctaLearnMore")}
            </Button>
          </div>
        </Reveal>

        {/* Glass fact chips */}
        <Reveal when="load" delay={0.58}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {[
              { value: "Est.", label: t("milestoneFoundedDate") },
              { value: String(autonomousCommunities.length), label: "Communities" },
              { value: "3", label: "Continents" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px]"
              >
                <span className="font-data font-semibold text-gold-bright">{chip.value}</span>
                <span className="text-ink-muted">{chip.label}</span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* Scroll cue */}
        <Reveal when="load" delay={0.75}>
          <div
            aria-hidden="true"
            className="mt-14 flex flex-col items-center gap-2 text-ink-faint"
          >
            <span className="font-data text-[9px] uppercase tracking-[0.3em]">Scroll</span>
            <span
              className="flex h-9 w-6 items-start justify-center rounded-full border border-white/15 p-1.5"
            >
              <span
                className="h-2 w-0.5 rounded-full bg-gold-bright"
                style={{ animation: "scroll-cue 1.8s ease-in-out infinite" }}
              />
            </span>
          </div>
        </Reveal>
      </section>

      {/* ═══════════ Brand marquee ═══════════ */}
      <Marquee />

      {/* ═══════════ Featured projects ═══════════ */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <SectionHeading
          eyebrow={t("featuredProjectsTitle")}
          title={
            <>
              Momentum is <em className="text-gold-grad">building</em>
            </>
          }
          subline="Active initiatives already moving Ikeduru's economy — each one chosen for catalytic impact."
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeProjects.map((project) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 text-center">
          <Button href={`/${locale}/projects`} variant="ghost">
            View all projects &amp; the roadmap →
          </Button>
        </Reveal>
      </section>

      {/* ═══════════ How the forum works ═══════════ */}
      <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-28">
        <SectionHeading
          eyebrow="Our approach"
          title={
            <>
              Four words. One <em className="text-gold-grad">mission</em>.
            </>
          }
          subline="The ethos on our pledge — carried into everything we do."
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.14}>
          {pillars.map((pillar) => (
            <RevealItem key={pillar.title}>
              <SpotlightCard className="glass-hover group h-full rounded-3xl p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold-bright transition-all duration-500 group-hover:scale-110 group-hover:bg-gold/20">
                  <pillar.icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mb-2 font-display text-2xl italic text-ink">{pillar.title}</h3>
                <p className="text-[13px] leading-relaxed text-ink-muted">{pillar.text}</p>
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
            <>
              The numbers <em className="text-gold-grad">tell it</em>
            </>
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
