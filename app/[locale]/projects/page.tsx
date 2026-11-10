import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProjectCard } from "@/components/ProjectCard";
import { Tag } from "@/components/Tag";
import {
  activeProjects,
  projectMessageKeys,
  roadmapAreas,
} from "@/lib/content/projects";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { AccentLine } from "@/lib/accent";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Compass, FileDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Initiatives",
  description:
    "IEDF's active initiatives — the Atta-Inyishi-Amaimo industrial cluster, gas-to-power project, OKOBI collaboration, Ama Nwaozuzu Motor Park, and American Cancer Hospital — plus our 1–3 year strategic roadmap.",
};

/** roadmap slug → message key (labels for the strategic-horizon band). */
const areaKeys: Record<string, string> = {
  healthcare: "areaHealthcare",
  security: "areaSecurity",
  industrialization: "areaIndustrialization",
  education: "areaEducation",
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const tTags = await getTranslations({ locale, namespace: "tags" });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <AccentLine text={t("heroTitle")} accent={t("heroTitleAccent")} />
        }
        subline={t("heroSubline")}
      />

      {/* Active initiatives */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <SectionHeading
          eyebrow={t("activeEyebrow")}
          align="left"
          title={
            <AccentLine text={t("activeTitle")} accent={t("activeAccent")} />
          }
        />
        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeProjects.map((project) => {
            const keys = projectMessageKeys[project.slug];
            return (
              <RevealItem key={project.slug}>
                <ProjectCard
                  project={project}
                  titleOverride={keys ? t(keys[0]) : undefined}
                  summaryOverride={keys ? t(keys[1]) : undefined}
                />
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* Strategic Roadmap — glowing emerald band */}
      <section className="relative overflow-hidden px-6 py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(26,74,46,0.16) 30%, rgba(15,45,29,0.28) 55%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-96 w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(47,158,99,0.35), transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={t("roadmapEyebrow")}
            title={
              <AccentLine text={t("roadmapTitle")} accent={t("roadmapAccent")} />
            }
            subline={t("roadmapSubline")}
          />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.13}>
            {roadmapAreas.map((area, i) => (
              <RevealItem key={area.slug}>
                <SpotlightCard className="glass group relative h-full rounded-3xl p-7 text-center sm:p-8">
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-4 h-px w-10 -translate-x-1/2 opacity-40 transition-all duration-500 group-hover:w-16 group-hover:opacity-90"
                    style={{ background: "var(--grad-gold)" }}
                  />
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-data text-lg font-semibold text-gold-bright">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mb-4 flex justify-center">
                    <Tag variant="planned">{tTags("planned")}</Tag>
                  </div>
                  <div className="font-display text-2xl italic text-ink">
                    {areaKeys[area.slug] ? t(areaKeys[area.slug]) : area.title}
                  </div>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA cards */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-16">
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <RevealItem>
            <SpotlightCard className="glass-hover flex flex-col gap-4 rounded-3xl p-8 sm:p-10">
              <div className="flex items-center gap-3 text-gold-bright">
                <Compass size={18} strokeWidth={1.6} />
                <span className="font-data text-[10px] font-semibold uppercase tracking-[0.25em]">
                  {t("investLabel")}
                </span>
              </div>
              <p className="font-display text-2xl italic leading-snug text-ink">
                {t("investTitle")}
              </p>
              <p className="flex-1 text-[13.5px] leading-relaxed text-ink-muted">
                {t("investText")}
              </p>
              <div>
                <Button href={`/${locale}/contact`}>{t("investCta")}</Button>
              </div>
            </SpotlightCard>
          </RevealItem>
          <RevealItem>
            <SpotlightCard className="glass-hover flex flex-col gap-4 rounded-3xl border-dashed p-8 sm:p-10">
              <div className="flex items-center gap-3 text-gold-bright">
                <FileDown size={18} strokeWidth={1.6} />
                <span className="font-data text-[10px] font-semibold uppercase tracking-[0.25em]">
                  {t("resourceLabel")}
                </span>
              </div>
              <p className="font-display text-2xl italic leading-snug text-ink">
                {t("resourceTitle")}
              </p>
              <p className="flex-1 text-[13.5px] leading-relaxed text-ink-muted">
                {t("resourceText")}
              </p>
              <span className="font-data text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                {t("resourceNote")}
              </span>
            </SpotlightCard>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
