import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ikeduru",
  description:
    "History, statistics, leadership, and economic activities of Ikeduru LGA, Imo State, Nigeria.",
};

/**
 * Content for every section below requires a named external source
 * (LGA records, a local historian, etc.) per Content Outline Section 3 —
 * this is the one section of the site where accuracy and neutral framing
 * matter most given IEDF's apolitical charter. Structure is complete;
 * content is intentionally placeholder pending that sourcing, per the
 * Development Roadmap's Milestone 3 decoupling note.
 */
const sections = [
  { id: "history", title: "History of Ikeduru" },
  { id: "statistics", title: "Statistics" },
  { id: "lga-leadership", title: "LGA Headquarters & Leadership" },
  { id: "communities", title: "Autonomous Communities" },
  { id: "economic-activities", title: "Economic Activities" },
];

export default function AboutIkeduruPage() {
  return (
    <div className="mx-auto max-w-[880px] px-6 py-14">
      <h1 className="mb-2 text-3xl">About Ikeduru</h1>
      <p className="mb-10 text-[15px] text-[var(--color-soil)]">
        The place — distinct from IEDF, the organization.
      </p>

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="mb-10">
          <h2 className="mb-3 text-lg">{section.title}</h2>
          <div className="rounded-[7px] border border-dashed border-black/20 bg-black/[0.02] p-5 text-sm text-[var(--color-soil)]">
            Pending sourced, dated content — see Content Outline Section 3
            and Development Roadmap risk notes.
          </div>
        </section>
      ))}
    </div>
  );
}
