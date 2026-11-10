import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { AccentLine } from "@/lib/accent";
import { DonationForm } from "@/components/DonationForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Heart, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Donate · Support IEDF",
  description:
    "Support IEDF's work toward a self-sustaining Ikeduru. Your donation powers economic development initiatives, infrastructure projects, and community programs.",
};

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donate" });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <AccentLine text={t("heroTitle")} accent={t("heroTitleAccent")} />
        }
        subline={t("heroSubline")}
      />

      <div className="mx-auto max-w-6xl px-6 pb-28">
        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Left: Impact info */}
          <div className="space-y-12 lg:col-span-3">
            <Reveal>
              <SectionHeading
                eyebrow={t("impactEyebrow")}
                align="left"
                title={
                  <AccentLine
                    text={t("impactTitle")}
                    accent={t("impactAccent")}
                  />
                }
              />
              <div className="mt-6 space-y-4 text-ink-muted">
                <p>{t("impactP1")}</p>
                <p>{t("impactP2")}</p>
              </div>
            </Reveal>

            {/* Impact areas */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="glass space-y-3 rounded-2xl p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15">
                    <Target className="h-6 w-6 text-gold-bright" />
                  </div>
                  <h3 className="font-display text-lg text-ink">
                    {t("areaProjectsTitle")}
                  </h3>
                  <p className="text-sm text-ink-muted">
                    {t("areaProjectsText")}
                  </p>
                </div>

                <div className="glass space-y-3 rounded-2xl p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/15">
                    <Users className="h-6 w-6 text-mint" />
                  </div>
                  <h3 className="font-display text-lg text-ink">
                    {t("areaCommunityTitle")}
                  </h3>
                  <p className="text-sm text-ink-muted">
                    {t("areaCommunityText")}
                  </p>
                </div>

                <div className="glass space-y-3 rounded-2xl p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15">
                    <Heart className="h-6 w-6 text-gold-bright" />
                  </div>
                  <h3 className="font-display text-lg text-ink">
                    {t("areaCapacityTitle")}
                  </h3>
                  <p className="text-sm text-ink-muted">
                    {t("areaCapacityText")}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Transparency note */}
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-gold/15 bg-forest/10 p-6">
                <h3 className="mb-3 font-display text-lg text-ink">
                  {t("transparencyTitle")}
                </h3>
                <p className="text-sm text-ink-muted">
                  {t("transparencyText")}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: Donation form */}
          <div className="lg:col-span-2">
            <Reveal delay={0.3}>
              <div className="lg:sticky lg:top-24">
                <DonationForm locale={locale} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
