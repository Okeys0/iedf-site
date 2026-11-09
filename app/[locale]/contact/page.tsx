import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { AccentLine } from "@/lib/accent";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { PhoneIncoming, Route, ShieldCheck, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with IEDF — routed by inquiry type to the right team.",
};

/** Info cards: icon pairs with the translated card1..card4 title/text keys. */
const infoCards = [
  { icon: Route, titleKey: "card1Title", textKey: "card1Text" },
  { icon: PhoneIncoming, titleKey: "card2Title", textKey: "card2Text" },
  { icon: Globe2, titleKey: "card3Title", textKey: "card3Text" },
  { icon: ShieldCheck, titleKey: "card4Title", textKey: "card4Text" },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <AccentLine text={t("heroTitle")} accent={t("heroTitleAccent")} />
        }
        subline={t("heroSubline")}
      />

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-10 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
        {/* Info column */}
        <div className="space-y-4">
          {infoCards.map((card, i) => (
            <Reveal key={card.titleKey} delay={i * 0.08}>
              <SpotlightCard className="glass-hover flex items-start gap-4 rounded-2xl p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold-bright">
                  <card.icon size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h2 className="mb-1 text-[15px] font-semibold text-ink">{t(card.titleKey)}</h2>
                  <p className="text-[13px] leading-relaxed text-ink-muted">{t(card.textKey)}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Form */}
        <Reveal delay={0.15}>
          <SpotlightCard className="glass-strong rounded-[2rem] p-8 sm:p-10">
            <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-px" />
            <ContactForm />
          </SpotlightCard>
        </Reveal>
      </section>
    </>
  );
}
