import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { leaders } from "@/lib/content/leadership";
import { PageHero } from "@/components/PageHero";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";

export const metadata: Metadata = {
  title: "Leadership & Governance",
  description:
    "Meet the executive committee of the Ikeduru Economic Development Forum (IEDF).",
};

export default async function LeadershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <PageHero
        eyebrow="About IEDF"
        title={
          <>
            Leadership &amp; <em className="text-gold-grad">Governance</em>
          </>
        }
        subline="The executive committee — seasoned professionals across medicine, law, accountancy, technology and industry, united by a single purpose."
      />

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {leaders.map((leader) => (
            <RevealItem key={leader.name}>
              <SpotlightCard className="glass-hover group h-full rounded-3xl p-7">
                {/* Portrait — conic gold ring on hover */}
                <div className="relative mx-auto mb-5 h-[104px] w-[104px]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-[-3px] rounded-full opacity-0 blur-[6px] transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "conic-gradient(from 120deg, #2f9e63, #e8c76a, #a97e1f, #2f9e63)" }}
                  />
                  <div className="glass relative h-full w-full overflow-hidden rounded-full p-1">
                    {leader.photo ? (
                      <Image
                        src={leader.photo}
                        alt={`${leader.name}, ${leader.role}`}
                        width={104}
                        height={104}
                        className="h-full w-full rounded-full object-cover saturate-[0.85] transition-all duration-700 group-hover:saturate-100"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center rounded-full"
                        style={{ background: "linear-gradient(140deg, rgba(47,158,99,0.2), rgba(26,74,46,0.12))" }}
                      />
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="mb-1 font-display text-[21px] leading-snug text-ink">{leader.name}</h3>
                  <div className="mb-4 font-data text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-bright">
                    {leader.role}
                  </div>
                  <div className="mx-auto mb-4 h-px w-10 transition-all duration-500 group-hover:w-16" style={{ background: "var(--grad-gold)" }} />
                  {leader.bio && (
                    <p className="text-left text-[12.5px] leading-relaxed text-ink-muted">{leader.bio}</p>
                  )}
                  {leader.bioSecondParagraph && (
                    <p className="mt-2.5 text-left text-[12.5px] leading-relaxed text-ink-faint">
                      {leader.bioSecondParagraph}
                    </p>
                  )}
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-14 text-center">
          <Link
            href={`/${locale}/about`}
            className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-ink-muted transition-all duration-300 hover:border-gold/40 hover:text-gold-pale"
          >
            <ArrowLeft size={14} />
            Back to Our Story
          </Link>
        </p>
      </section>
    </>
  );
}
