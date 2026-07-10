import type { Metadata } from "next";
import { MilestoneLine } from "@/components/MilestoneLine";

export const metadata: Metadata = {
  title: "About IEDF",
  description:
    "The story of IEDF — from a founding meeting in Umuoziri Inyishi to a governed institution driving Ikeduru's economic development.",
};

const leaders = [
  { name: "Leadership bio placeholder", role: "Executive role — pending content, see Content Outline Section 2.3" },
  { name: "Leadership bio placeholder", role: "Executive role — pending content" },
  { name: "Leadership bio placeholder", role: "Executive role — pending content" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[880px] px-6 py-14">
      <h1 className="mb-2 text-3xl">Our Story</h1>
      <p className="mb-10 text-[15px] text-[var(--color-soil)]">
        From a living-room meeting to a governed institution.
      </p>

      <section className="mb-14">
        <MilestoneLine
          size="full"
          points={[
            { date: "JAN 2025", label: "Founded in Umuoziri Inyishi" },
            { date: "APR 2026", label: "Executives inaugurated" },
            { date: "TODAY", label: "Active initiatives underway" },
          ]}
        />
      </section>

      {/*
        Full narrative (400–600 words per Content Outline Section 2.1) goes here.
        Content owner: founding members — this page needs first-person
        institutional memory, not just facts, so it's intentionally left
        as a placeholder pending that content.
      */}
      <section className="mb-14 rounded-[7px] border border-dashed border-black/20 bg-black/[0.02] p-6 text-sm text-[var(--color-soil)]">
        Full founding narrative pending — content owner: founding members
        (see Content Outline, Section 2.1).
      </section>

      <section className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg">Mission</h2>
          <p className="text-sm text-[var(--color-soil)]">
            Mission statement pending exec committee sign-off (Content Outline, Section 2.2).
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg">Vision</h2>
          <p className="text-sm text-[var(--color-soil)]">
            Vision statement pending exec committee sign-off (Content Outline, Section 2.2).
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-5 text-lg">Leadership &amp; Governance</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {leaders.map((leader, i) => (
            <div key={i} className="text-center">
              <div
                className="mx-auto mb-3 h-[90px] w-[90px] rounded-full bg-[var(--color-forest-tint)]"
                aria-hidden="true"
              />
              <div className="text-sm font-semibold">{leader.name}</div>
              <div className="text-xs text-[var(--color-soil)]">{leader.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg">Apolitical &amp; Non-Profit Statement</h2>
        <div className="rounded-r-[7px] border-l-[3px] border-[var(--color-forest)] bg-[var(--color-forest-tint)] p-5 text-sm">
          IEDF is a non-governmental, non-profit, and apolitical organization. Our work
          is guided solely by the economic development interests of Ikeduru — independent
          of any political party or affiliation.
        </div>
      </section>
    </div>
  );
}
