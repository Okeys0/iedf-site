import type { Metadata } from "next";
import { SubmitForm } from "@/components/SubmitForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Users, Gift, Sparkles, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "Become a member or volunteer, register your interest in giving, or subscribe for updates.",
};

/** Shared glass input styling */
const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-all duration-300 focus:border-gold/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-gold/25";
const labelCls =
  "mb-1.5 block font-data text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted";

export default function JoinUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title={
          <>
            Add your hands to the <em className="text-gold-grad">work</em>
          </>
        }
        subline="Whether you're in Ikeduru or ten thousand kilometers away, there's a place for you in this mission — as a member, a volunteer, or a future supporter."
      />

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Membership form */}
          <Reveal>
            <SpotlightCard className="glass-hover h-full rounded-[2rem] p-8 sm:p-10">
              <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-px" />
              <div className="mb-6 flex items-center gap-3 text-gold-bright">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10">
                  <Users size={20} strokeWidth={1.6} />
                </div>
                <span className="font-data text-[10px] font-semibold uppercase tracking-[0.25em]">
                  Become a Member / Volunteer
                </span>
              </div>
              <h2 className="mb-2.5 text-3xl">
                Join the <em className="text-gold-grad">forum</em>
              </h2>
              <p className="mb-7 text-[14px] leading-relaxed text-ink-muted">
                IEDF draws committed Ikeduru sons and daughters — professionals, founders, and
                community leaders at home and abroad. Tell us who you are and where your
                passion lies; the executive committee follows up personally.
              </p>
              <SubmitForm
                action="/api/member-signup"
                submitLabel="Submit application"
                successMessage="Thank you — we've received your interest and will be in touch soon."
              >
                <div>
                  <label htmlFor="member-name" className={labelCls}>
                    Full name
                  </label>
                  <input id="member-name" name="name" required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="member-email" className={labelCls}>
                    Email
                  </label>
                  <input id="member-email" name="email" type="email" required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="member-interest" className={labelCls}>
                    Area of interest
                  </label>
                  <select id="member-interest" name="interest" className={`${inputCls} appearance-none`}>
                    <option value="member" className="bg-night">Become a member</option>
                    <option value="volunteer" className="bg-night">Volunteer</option>
                    <option value="both" className="bg-night">Both</option>
                  </select>
                </div>
              </SubmitForm>
            </SpotlightCard>
          </Reveal>

          {/* Giving intent */}
          <Reveal delay={0.12}>
            <SpotlightCard className="glass-hover h-full rounded-[2rem] p-8 sm:p-10">
              <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-px" />
              <div className="mb-6 flex items-center gap-3 text-gold-bright">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10">
                  <Gift size={20} strokeWidth={1.6} />
                </div>
                <span className="font-data text-[10px] font-semibold uppercase tracking-[0.25em]">
                  Support IEDF
                </span>
              </div>
              <h2 className="mb-2.5 text-3xl">
                Fuel the <em className="text-gold-grad">momentum</em>
              </h2>
              <p className="mb-7 text-[14px] leading-relaxed text-ink-muted">
                Giving goes live the moment the forum&apos;s bank account and payment processor are
                finalized. Register below and you&apos;ll be first to know — your early intent
                directly shapes how we prioritize the roadmap:{" "}
                <span className="text-gold-pale">healthcare, security, industrialization, education.</span>
              </p>
              <SubmitForm
                action="/api/member-signup"
                submitLabel="Register my interest"
                successMessage="Thank you — we'll reach out the moment live giving is available."
                variant="secondary"
              >
                <input type="hidden" name="interest" value="giving-intent" />
                <div>
                  <label htmlFor="support-email" className={labelCls}>
                    Email
                  </label>
                  <input
                    id="support-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>
              </SubmitForm>

              {/* Live-giving notice */}
              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                <Sparkles size={16} className="mt-0.5 shrink-0 text-gold-bright" />
                <p className="text-[12.5px] leading-relaxed text-ink-faint">
                  Every naira, dollar, and euro goes to projects — not overhead. Financial
                  oversight rests with the Treasurer, an internationally affiliated chartered
                  accountant.
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>

        {/* Other ways to help */}
        <Reveal className="mt-12">
          <div className="glass rounded-[2rem] p-8 text-center sm:p-10">
            <HeartHandshake size={22} strokeWidth={1.5} className="mx-auto mb-4 text-gold-bright" />
            <h2 className="mb-2 text-2xl">
              There are more ways to <em className="text-gold-grad">move</em> Ikeduru
            </h2>
            <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-ink-muted">
              Investor introductions, press inquiries, or skills-based volunteering — start
              from the contact page and we&apos;ll route you to the right hands.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
