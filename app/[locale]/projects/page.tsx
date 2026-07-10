import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { Tag } from "@/components/Tag";
import { activeProjects, roadmapAreas } from "@/lib/content/projects";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Projects & Initiatives",
  description:
    "IEDF's active initiatives — the Atta-Inyishi-Amaimo industrial cluster, gas-to-power project, and OKOBI collaboration — plus our 1–3 year strategic roadmap.",
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <div className="mx-auto max-w-[880px] px-6 py-14">
        <h1 className="mb-2 text-3xl">Projects &amp; Initiatives</h1>
        <p className="mb-10 text-[15px] text-[var(--color-soil)]">
          What&apos;s active today, and where the strategy is headed.
        </p>

        <section className="mb-14">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-[var(--color-soil)]">
            Active Initiatives
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {activeProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </div>

      {/*
        Strategic Roadmap — deliberately styled as a distinct dark band
        (forest green, matching the logo) so visitors never confuse
        "happening now" with "where we're headed." Tone requirement per
        Content Outline Section 4.5: this is directional, not promised.
      */}
      <section className="bg-[var(--color-forest)] px-6 py-14 text-white">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-1.5 text-2xl text-white">1–3 Year Strategic Roadmap</h2>
          <p className="mb-8 text-sm text-white/70">
            Where we&apos;re headed, 2026–2029 — clearly distinguished from active
            initiatives above.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {roadmapAreas.map((area) => (
              <div
                key={area.slug}
                className="rounded-[7px] border border-white/25 p-4 text-center"
              >
                <div className="mb-2 flex justify-center">
                  <Tag variant="planned">Planned</Tag>
                </div>
                <div className="text-sm font-semibold">{area.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[880px] px-6 py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-[7px] border border-black/10 bg-white p-5">
            <p className="mb-3 text-sm">Interested in investing?</p>
            <Button href={`/${locale}/contact`} variant="primary">
              Contact Us
            </Button>
          </div>
          <div className="rounded-[7px] border border-black/10 bg-white p-5">
            <p className="text-sm text-[var(--color-soil)]">
              Downloadable project overview (PDF) — to be added post-launch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
