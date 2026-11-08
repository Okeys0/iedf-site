import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { Tag } from "@/components/Tag";
import { activeProjects, roadmapAreas } from "@/lib/content/projects";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Compass, FileDown } from "lucide-react";

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
    <>
      <PageHero
        eyebrow="Projects & Initiatives"
        title={
          <>
            What&apos;s <em className="text-gold-grad">active</em> — and where the strategy heads
          </>
        }
        subline="Initiatives already in motion, and the 1–3 year horizon we are steering toward."
      />

      {/* Active initiatives */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <SectionHeading
          eyebrow="Active today"
          align="left"
          title={
            <>
              In <em className="text-gold-grad">motion</em>
            </>
          }
        />
        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeProjects.map((project) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
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
            eyebrow="2026 – 2029"
            title={
              <>
                The strategic <em className="text-gold-grad">roadmap</em>
              </>
            }
            subline="Where we're headed — directional targets, clearly distinguished from active commitments above."
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
                    <Tag variant="planned">Planned</Tag>
                  </div>
                  <div className="font-display text-2xl italic text-ink">{area.title}</div>
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
                  For investors
                </span>
              </div>
              <p className="font-display text-2xl italic leading-snug text-ink">
               Interested in investing in Ikeduru?
              </p>
              <p className="flex-1 text-[13.5px] leading-relaxed text-ink-muted">
                IEDF acts as a think tank and resource entity for investors interested in
                Ikeduru — we&apos;ll connect you to the right opportunity and people.
              </p>
              <div>
                <Button href={`/${locale}/contact`}>Contact the forum</Button>
              </div>
            </SpotlightCard>
          </RevealItem>
          <RevealItem>
            <SpotlightCard className="glass-hover flex flex-col gap-4 rounded-3xl border-dashed p-8 sm:p-10">
              <div className="flex items-center gap-3 text-gold-bright">
                <FileDown size={18} strokeWidth={1.6} />
                <span className="font-data text-[10px] font-semibold uppercase tracking-[0.25em]">
                  Resource pack
                </span>
              </div>
              <p className="font-display text-2xl italic leading-snug text-ink">
                Project overview PDF
              </p>
              <p className="flex-1 text-[13.5px] leading-relaxed text-ink-muted">
                A downloadable investor briefing covering the industrial cluster, power
                corridor, and OKOBI partnership — arriving post-launch.
              </p>
              <span className="font-data text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                Coming soon
              </span>
            </SpotlightCard>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
