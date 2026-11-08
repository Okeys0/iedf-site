import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { PhoneIncoming, Route, ShieldCheck, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with IEDF — routed by inquiry type to the right team.",
};

const infoCards = [
  {
    icon: Route,
    title: "Smart routing",
    text: "Investor, partner, press, volunteer or general — your message reaches the people it was meant for.",
  },
  {
    icon: PhoneIncoming,
    title: "Personal follow-up",
    text: "Real people, not bots. The committee aims to respond within a few working days.",
  },
  {
    icon: Globe2,
    title: "Three continents",
    text: "Members across Nigeria, the USA and Australia — in whatever time zone matters to you.",
  },
  {
    icon: ShieldCheck,
    title: "Handled with care",
    text: "Submissions are stored securely and used solely to respond to your inquiry.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <em className="text-gold-grad">Ikeduru</em>
          </>
        }
        subline="Tell us why you're reaching out — we'll make sure it lands with the right hands."
      />

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-10 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
        {/* Info column */}
        <div className="space-y-4">
          {infoCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <SpotlightCard className="glass-hover flex items-start gap-4 rounded-2xl p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold-bright">
                  <card.icon size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h2 className="mb-1 text-[15px] font-semibold text-ink">{card.title}</h2>
                  <p className="text-[13px] leading-relaxed text-ink-muted">{card.text}</p>
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
