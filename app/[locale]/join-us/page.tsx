import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SubmitForm } from "@/components/SubmitForm";
import { PageHero } from "@/components/PageHero";
import { AccentLine } from "@/lib/accent";
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
  "w-full rounded-xl border border-gold/15 bg-forest/20 px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-all duration-300 focus:border-gold/50 focus:bg-forest/35 focus:outline-none focus:ring-2 focus:ring-gold/25";
const labelCls =
  "mb-1.5 block font-data text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted";

export default async function JoinUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "joinUs" });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <AccentLine text={t("heroTitle")} accent={t("heroTitleAccent")} />
        }
        subline={t("heroSubline")}
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
                  {t("memberLabel")}
                </span>
              </div>
              <h2 className="mb-2.5 text-3xl">
                <AccentLine text={t("memberTitle")} accent={t("memberAccent")} />
              </h2>
              <p className="mb-7 text-[14px] leading-relaxed text-ink-muted">
                {t("memberText")}
              </p>
              <SubmitForm
                action="/api/member-signup"
                submitLabel={t("memberSubmit")}
                successMessage={t("memberSuccess")}
              >
                <div>
                  <label htmlFor="member-name" className={labelCls}>
                    {t("nameLabel")}
                  </label>
                  <input id="member-name" name="name" required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="member-email" className={labelCls}>
                    {t("emailLabel")}
                  </label>
                  <input id="member-email" name="email" type="email" required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="member-interest" className={labelCls}>
                    {t("interestLabel")}
                  </label>
                  <select id="member-interest" name="interest" className={`${inputCls} appearance-none`}>
                    <option value="member" className="bg-night">{t("interestMember")}</option>
                    <option value="volunteer" className="bg-night">{t("interestVolunteer")}</option>
                    <option value="both" className="bg-night">{t("interestBoth")}</option>
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
                  {t("givingLabel")}
                </span>
              </div>
              <h2 className="mb-2.5 text-3xl">
                <AccentLine text={t("givingTitle")} accent={t("givingAccent")} />
              </h2>
              <p className="mb-7 text-[14px] leading-relaxed text-ink-muted">
                {t("givingTextA")}{" "}
                <span className="text-gold-pale">{t("givingRoadmap")}</span>
              </p>
              <SubmitForm
                action="/api/member-signup"
                submitLabel={t("givingSubmit")}
                successMessage={t("givingSuccess")}
                variant="secondary"
              >
                <input type="hidden" name="interest" value="giving-intent" />
                <div>
                  <label htmlFor="support-email" className={labelCls}>
                    {t("givingEmail")}
                  </label>
                  <input
                    id="support-email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("givingPlaceholder")}
                    className={inputCls}
                  />
                </div>
              </SubmitForm>

              {/* Live-giving notice */}
              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                <Sparkles size={16} className="mt-0.5 shrink-0 text-gold-bright" />
                <p className="text-[12.5px] leading-relaxed text-ink-faint">
                  {t("trustNote")}
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
              <AccentLine text={t("moreTitle")} accent={t("moreAccent")} />
            </h2>
            <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-ink-muted">
              {t("moreText")}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
