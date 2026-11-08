import type { Metadata } from "next";
import { Newspaper, Rss, PenLine } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Announcements, events, and press mentions from IEDF.",
};

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title={
          <>
            News &amp; <em className="text-gold-grad">updates</em>
          </>
        }
        subline="Announcements, milestones, events, and press mentions. Cadence: one to two posts a month."
      />

      <section className="mx-auto max-w-3xl px-6 pb-10">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-[2rem] px-8 py-16 text-center sm:px-14">
            <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-px" />
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 h-56 w-[30rem] -translate-x-1/2 rounded-full opacity-25 blur-[90px]"
              style={{ background: "radial-gradient(circle, rgba(201,152,47,0.45), transparent 70%)" }}
            />
            <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold-bright">
              <Newspaper size={24} strokeWidth={1.4} />
            </div>
            <h2 className="mx-auto mb-3 max-w-md text-3xl">
              The presses warm up <em className="text-gold-grad">soon</em>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-[14.5px] leading-relaxed text-ink-muted">
              This listing populates automatically as the content team publishes the first
              entries — milestone reports, community spotlights, and investor briefings.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href={`/${locale}/join-us`} variant="secondary">
                Subscribe via newsletter
                <Rss size={14} />
              </Button>
              <Button href={`/${locale}/contact`} variant="secondary">
                Press inquiries
                <PenLine size={14} />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
