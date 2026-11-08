import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <em className="text-gold-grad">Policy</em></>}
      />

      <section className="mx-auto max-w-3xl px-6 pb-10">
        <Reveal>
          <div className="glass flex items-start gap-4 rounded-3xl border-dashed p-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-ink-faint">
              <ShieldCheck size={17} strokeWidth={1.6} />
            </div>
            <div>
              <div className="mb-1 font-data text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-bright">
                Regional — content forthcoming
              </div>
              <p className="max-w-[62ch] text-[14px] leading-relaxed text-ink-muted">
                Privacy policy content pending legal review — required given form data
                collection across Member Signup, Newsletter, and Contact (see Content
                Outline, Global/Utility Content; Development Roadmap, Milestone 5).
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
