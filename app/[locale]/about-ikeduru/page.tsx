import type { Metadata } from "next";
import Image from "next/image";
import { autonomousCommunities } from "@/lib/content/communities";
import { ikeduruGalleryImages } from "@/lib/content/gallery";

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
 * section now has real, sourced content (see lib/content/communities.ts);
 * the remaining sections are still placeholder pending that sourcing,
 * per the Development Roadmap's Milestone 3 decoupling note.
 */
const placeholderSections = [
  { id: "history", title: "History of Ikeduru" },
  { id: "statistics", title: "Statistics" },
  { id: "lga-leadership", title: "LGA Headquarters & Leadership" },
];

export default function AboutIkeduruPage() {
  return (
    <div className="mx-auto max-w-[880px] px-6 py-14">
      <h1 className="mb-2 text-3xl">About Ikeduru</h1>
      <p className="mb-10 text-[15px] text-[var(--color-soil)]">
        The place — distinct from IEDF, the organization.
      </p>

      {/*
        "Ikeduru in Pictures" — wide gallery strip. Renders real photos
        from lib/content/gallery.ts once populated; falls back to
        placeholder tiles so the layout/structure is visible and ready
        before real images arrive.
      */}
      <section className="mb-10">
        <h2 className="mb-3 text-lg">Ikeduru in Pictures</h2>
        {ikeduruGalleryImages.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ikeduruGalleryImages.map((img, i) => (
              <div key={i} className="relative h-32 overflow-hidden rounded-[7px] border border-black/10">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
                {img.caption && (
                  <span className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1 text-[10px] text-white">
                    {img.caption}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex h-32 items-center justify-center rounded-[7px] border border-dashed border-black/20 bg-black/[0.02] p-2 text-center text-xs text-[var(--color-soil)]"
              >
                Photo pending
              </div>
            ))}
          </div>
        )}
      </section>

      {placeholderSections.map((section) => (
        <section key={section.id} id={section.id} className="mb-10">
          <h2 className="mb-3 text-lg">{section.title}</h2>
          <div className="rounded-[7px] border border-dashed border-black/20 bg-black/[0.02] p-5 text-sm text-[var(--color-soil)]">
            Pending sourced, dated content — see Content Outline Section 3
            and Development Roadmap risk notes.
          </div>
        </section>
      ))}

      <section id="communities" className="mb-10">
        <h2 className="mb-1 text-lg">Autonomous Communities</h2>
        <p className="mb-5 text-xs text-[var(--color-soil)]">
          Source: provided directly by IEDF · Last updated July 2026
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {autonomousCommunities.map((c) => (
            <div
              key={c.order}
              className="rounded-[7px] border border-black/10 bg-white p-4"
            >
              <div className="mb-1 flex items-baseline gap-2">
                <span className="font-mono text-[11px] text-[var(--color-forest)]">
                  {String(c.order).padStart(2, "0")}
                </span>
                <h3 className="text-[15px] font-semibold text-[var(--color-loam)]">
                  {c.name}
                </h3>
                {c.context && (
                  <span className="text-xs text-[var(--color-soil)]">({c.context})</span>
                )}
              </div>
              <p className="text-[13px] text-[var(--color-soil)]">{c.ruler}</p>
              {c.note && (
                <p className="mt-1 text-[11px] italic text-[var(--color-soil)]">{c.note}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="economic-activities" className="mb-10">
        <h2 className="mb-3 text-lg">Economic Activities</h2>
        <div className="rounded-[7px] border border-dashed border-black/20 bg-black/[0.02] p-5 text-sm text-[var(--color-soil)]">
          Pending sourced, dated content — see Content Outline Section 3
          and Development Roadmap risk notes.
        </div>
      </section>
    </div>
  );
}
