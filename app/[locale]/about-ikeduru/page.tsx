import type { Metadata } from "next";
import Image from "next/image";
import { autonomousCommunities } from "@/lib/content/communities";
import { ikeduruGalleryImages } from "@/lib/content/gallery";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Hourglass } from "lucide-react";

export const metadata: Metadata = {
  title: "About Ikeduru",
  description:
    "History, statistics, leadership, and economic activities of Ikeduru LGA, Imo State, Nigeria.",
};

/**
 * Content for most sections below requires a named external source
 * (LGA records, a local historian, etc.) per Content Outline Section 3 —
 * this is the one section of the site where accuracy and neutral framing
 * matter most given IEDF's apolitical charter. The Autonomous Communities
 * section has real, sourced content (see lib/content/communities.ts);
 * the remaining sections await that sourcing, per the Development
 * Roadmap's Milestone 3 decoupling note.
 */
const placeholderSections = [
  { id: "history", title: "History of Ikeduru" },
  { id: "statistics", title: "Statistics" },
  { id: "lga-leadership", title: "LGA Headquarters & Leadership" },
];

/** Styled "awaiting sourced content" panel — honest and beautiful. */
function PendingPanel() {
  return (
    <div className="glass flex items-start gap-4 rounded-3xl border-dashed p-7">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-ink-faint">
        <Hourglass size={17} strokeWidth={1.6} />
      </div>
      <div>
        <div className="mb-1 font-data text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-bright">
          Content forthcoming
        </div>
        <p className="max-w-[60ch] text-[13.5px] leading-relaxed text-ink-muted">
          This section requires named external sourcing (LGA records or a local historian)
          before publication — IEDF&apos;s apolitical charter treats place-level accuracy as
          non-negotiable. Fact-checked content will appear here first.
        </p>
      </div>
    </div>
  );
}

export default function AboutIkeduruPage() {
  return (
    <>
      <PageHero
        eyebrow="The place"
        title={
          <>
            About <em className="text-gold-grad">Ikeduru</em>
          </>
        }
        subline="The heartland — distinct from IEDF, the organization. History, people, and economic life across Ikeduru LGA, Imo State."
      />

      {/* Gallery */}
      <section className="mx-auto mb-20 max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow="Ikeduru in pictures"
          title={
            <>
              A place worth <em className="text-gold-grad">investing</em> in
            </>
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
                        {img.caption}
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
                Photo pending
              </div>
            ))}
          </Reveal>
        )}
      </section>

      {/* Pending sourced sections */}
      <section className="mx-auto mb-20 max-w-4xl space-y-6 px-6">
        {placeholderSections.map((section) => (
          <Reveal key={section.id}>
            <div id={section.id} className="mb-6 scroll-mt-28">
              <h2 className="mb-5 text-3xl">{section.title}</h2>
              <PendingPanel />
            </div>
          </Reveal>
        ))}
      </section>

      {/* Autonomous communities */}
      <section id="communities" className="mx-auto mb-20 max-w-6xl scroll-mt-28 px-6">
        <SectionHeading
          align="left"
          eyebrow="The 29 autonomous communities"
          title={
            <>
              Its people, its <em className="text-gold-grad">throne</em>
            </>
          }
          subline="Each community, its traditional ruler. Source: provided directly by IEDF · Last updated 26 October 2026."
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
                <p className="text-[12.5px] leading-relaxed text-ink-muted">{c.ruler}</p>
                {c.note && <p className="mt-1 text-[11px] italic text-ink-faint">{c.note}</p>}
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Economic activities */}
      <section id="economic-activities" className="mx-auto mb-4 max-w-4xl scroll-mt-28 px-6">
        <Reveal>
          <h2 className="mb-5 text-3xl">Economic Activities</h2>
          <PendingPanel />
        </Reveal>
      </section>
    </>
  );
}
