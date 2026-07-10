import { getTranslations } from "next-intl/server";
import { Button } from "@/components/Button";
import { MilestoneLine } from "@/components/MilestoneLine";
import { ProjectCard } from "@/components/ProjectCard";
import { activeProjects } from "@/lib/content/projects";

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
    { date: t("milestoneToday"), label: t("milestoneTodayLabel") },
  ];

  const stats = [
    { value: t("milestoneFoundedDate"), label: "Founded" },
    { value: t("milestoneInauguratedDate"), label: "Executives Inaugurated" },
    { value: String(activeProjects.length), label: "Active Initiatives" },
    { value: "Growing", label: "Diaspora Reach" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-black/10 px-6 py-16 text-center">
        <div className="mx-auto max-w-[720px]">
          <h1 className="mb-3 text-3xl sm:text-4xl">{t("heroHeadline")}</h1>
          <p className="mb-7 text-[15px] text-[var(--color-soil)]">{t("heroSubhead")}</p>
          <div className="mb-10 flex justify-center gap-3">
            <Button href={`/${locale}/join-us`} variant="primary">
              {t("ctaJoin")}
            </Button>
            <Button href={`/${locale}/about`} variant="secondary">
              {t("ctaLearnMore")}
            </Button>
          </div>
          <div className="mx-auto max-w-[480px]">
            <MilestoneLine points={milestones} />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="border-b border-black/10 px-6 py-12">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-[var(--color-soil)]">
            {t("featuredProjectsTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {activeProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Momentum Highlights */}
      <section className="border-b border-black/10 px-6 py-12">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-[var(--color-soil)]">
            {t("momentumTitle")}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[7px] border border-black/10 bg-white p-4 text-center"
              >
                <div className="font-mono text-lg font-medium text-[var(--color-forest)]">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-[var(--color-soil)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-b border-black/10 bg-[var(--color-forest-tint)] px-6 py-12">
        <div className="mx-auto max-w-[560px] text-center">
          <h2 className="mb-1.5 text-xl">{t("newsletterTitle")}</h2>
          <p className="mb-5 text-sm text-[var(--color-soil)]">{t("newsletterSubtitle")}</p>
          {/* Client component handles submission — see components/NewsletterForm.tsx */}
          <form
            action="/api/newsletter"
            method="post"
            className="flex flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder={t("newsletterPlaceholder")}
              className="flex-1 rounded-[7px] border border-[var(--color-soil)] bg-white px-3 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-forest)]"
            />
            <button
              type="submit"
              className="rounded-[7px] bg-[var(--color-forest)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#153d26]"
            >
              {t("newsletterButton")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
