import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Scale } from "lucide-react";
import { MilestoneLine } from "@/components/MilestoneLine";
import { ExpandableText } from "@/components/ExpandableText";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";

export const metadata: Metadata = {
  title: "About IEDF",
  description:
    "The story of IEDF — from a founding meeting in Umuoziri Inyishi to a governed institution driving Ikeduru's economic development.",
};

export default async function AboutPage({
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
            From a living-room meeting to a <em className="text-gold-grad">governed</em> institution.
          </>
        }
        subline="How a handful of Ikeduru&apos;s sons and daughters turned conviction into a working forum for economic development."
      />

      {/* Milestone beam */}
      <section className="mx-auto mb-16 max-w-4xl px-6">
        <Reveal>
          <MilestoneLine
            size="full"
            points={[
              { date: "JAN 2025", label: "Founded in Umuoziri Inyishi" },
              { date: "APR 2026", label: "Executives inaugurated" },
              { date: "TODAY", label: "Active initiatives underway", variant: "future" },
            ]}
          />
        </Reveal>
      </section>

      {/* Founding narrative — editorial two-column feel */}
      <section className="mx-auto mb-20 grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_280px]">
        <Reveal>
          <div className="[&>div>p:first-child]:first-letter:float-left [&>div>p:first-child]:first-letter:mr-3 [&>div>p:first-child]:first-letter:font-display [&>div>p:first-child]:first-letter:text-[4.4rem] [&>div>p:first-child]:first-letter:leading-[0.85] [&>div>p:first-child]:first-letter:text-gold-grad">
            <ExpandableText
              initiallyShown={2}
              paragraphs={[
                "Despite its proximity to Owerri, the Imo State capital, Ikeduru Local Government Area (LGA) has remained sleepy economically with no meaningful development in the last thirty years. The economic neglect of Ikeduru and lack of local opportunities despite its potential has led to mass urban migration of young people in search of greener pasture. The rising poverty, poor educational amenities, lack of health and security infrastructure among other challenges have remained evident across Ikeduru for decades.",
                "IEDF is a non-governmental, non-profit, apolitical community development organisation made up of select Ikeduru sons and daughters who are genuinely committed to the development of the locality through incubation of ideas, collaboration, promotion of innovation and building investment capacity.",
                "Realising the dwindling fortunes of Ikeduru LGA, lack of government presence and poor government and private sector infrastructure investment in the locality, men and women of Ikeduru LGA came together to chart a new developmental course for the LGA with emphasis on private sector led investment and advocacy for government attention in areas of need. This led to the formation of IEDF on 4th January 2025. The inaugural meeting was held at Umuoziri Inyishi at the country home of Mr. Decency Nwokedi, and in attendance were the following Ikeduru indigenes: Rt. Hon. Justice Nze (Ikeduru LGA Chairman), Mr. Decency Nwokedi (USA), Mr. Evan Agunanne (USA), Dr. Goddy Ike (USA), Mr. Bede Anunne (USA), and Dr. Pedus Eweama (Australia). It has since then attracted major Ikeduru stakeholders at home and in the diaspora.",
                "Ikeduru Economic Development Forum since inception has acted as a think tank and resource entity for investors interested in Ikeduru. It has continued to engage people from Ikeduru resident across the world who are genuinely and apolitically committed to the advancement of important developmental priorities across Ikeduru. It seeks to continue to engage well-meaning Ikeduru sons and daughters to think of and invest in Ikeduru, with the conviction that only Ikeduru people can champion its development. Ultimately, IEDF will continue to collaborate with government and private sector investors in seeking opportunities for investment in various areas of economic endeavour, including agro-allied industries, small scale food processing centres, and investment in health, security, and education.",
                "With the support of the current leadership of Ikeduru LGA under the chairmanship of Rt. Hon. Justice Nze, parts of the Atta-Inyishi-Amaimo axis have been designated an industrial cluster for Ikeduru, which will amplify economic activities within this corridor. Courtesy of IEDF, a startup electricity generating company is exploring ways of using gas to generate electricity to feed the emerging businesses within the newly approved industrial cluster and beyond. IEDF aims to collaborate with Imo State government through the Office of the Chief Economic Advisor to advance One Kindred, One Business Initiative (OKOBI), a home grown, Imo State government backed economic model that can drive economic growth through support for small and medium scale group and community owned enterprises.",
              ]}
            />
          </div>
        </Reveal>

        {/* Sidebar: founding facts */}
        <Reveal delay={0.15}>
          <SpotlightCard className="glass-hover sticky top-28 rounded-3xl p-6">
            <div className="mb-4 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
              Founding facts
            </div>
            <dl className="space-y-4 text-[13px]">
              {[
                ["Formed", "4 January 2025"],
                ["First meeting", "Umuoziri Inyishi"],
                ["Host", "Mr. Decency Nwokedi"],
                ["Attendees", "6 Ikeduru indigenes — Nigeria, USA, Australia"],
                ["Status", "Non-governmental · Non-profit · Apolitical"],
              ].map(([dt, dd]) => (
                <div key={dt} className="border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                  <dt className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    {dt}
                  </dt>
                  <dd className="leading-relaxed text-ink">{dd}</dd>
                </div>
              ))}
            </dl>
          </SpotlightCard>
        </Reveal>
      </section>

      {/* Vision & Mission — glass twin cards */}
      <section id="vision-mission" className="mx-auto mb-20 max-w-6xl scroll-mt-28 px-6">
        <SectionHeading
          eyebrow="Vision & Mission"
          title={
            <>
              Where we&apos;re <em className="text-gold-grad">going</em>
            </>
          }
        />
        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <RevealItem>
            <SpotlightCard className="glass-hover h-full rounded-3xl p-8 sm:p-10">
              <div className="mb-4 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
                Vision
              </div>
              <p className="font-display text-[21px] italic leading-relaxed text-ink">
                An economically and socially vibrant, prosperous, and self-sustaining Ikeduru,
                where the collective expertise, resources, and commitment of its people drive
                transformative and inclusive development.
              </p>
            </SpotlightCard>
          </RevealItem>
          <RevealItem>
            <SpotlightCard className="glass-hover h-full rounded-3xl p-8 sm:p-10">
              <div className="mb-4 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
                Mission
              </div>
              <p className="text-[15px] leading-[1.9] text-ink-muted">
                To mobilize the collective expertise, resources, and partnerships of Ikeduru
                people and stakeholders to advance sustainable economic growth, attract
                investment, strengthen communities, and improve the quality of life through
                innovative, inclusive, and collaborative development initiatives.
              </p>
            </SpotlightCard>
          </RevealItem>
        </RevealGroup>

        {/* Mission infographic in a glass frame */}
        <Reveal className="mt-12">
          <div className="glass relative overflow-hidden rounded-[2rem] p-4 sm:p-8">
            <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-px" />
            <div className="relative mx-auto aspect-square w-full max-w-[620px] overflow-hidden rounded-2xl">
              <Image
                src="/images/mission-visual.jpg"
                alt="IEDF Mission infographic illustrating five pillars: Mobilize, Advance, Attract Investment, Strengthen Communities, and Improve Quality of Life, under the theme Collaborate, Innovate, Invest, Prosper"
                fill
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 rounded-2xl shadow-[inset_0_0_80px_rgba(5,11,8,0.55)]" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Leadership CTA band */}
      <section className="mx-auto mb-20 max-w-6xl px-6">
        <Reveal>
          <Link
            href={`/${locale}/about/leadership`}
            className="glass-strong glass-hover group relative block overflow-hidden rounded-[2rem] p-8 sm:p-12"
          >
            <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-px" />
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-25 blur-[80px] transition-opacity duration-700 group-hover:opacity-50"
              style={{ background: "radial-gradient(circle, rgba(201,152,47,0.5), transparent 70%)" }}
            />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 font-data text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
                  Leadership & Governance
                </div>
                <h2 className="mb-2 text-3xl sm:text-4xl">
                  Meet the people driving the <em className="text-gold-grad">mission</em>
                </h2>
                <p className="max-w-md text-[14.5px] text-ink-muted">
                  The executive committee — professionals from medicine, law, accountancy,
                  technology and industry, spanning three continents.
                </p>
              </div>
              <span className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-gold-pale transition-all duration-300 group-hover:border-gold/50">
                View the committee
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Apolitical statement */}
      <section className="mx-auto mb-4 max-w-3xl px-6">
        <Reveal>
          <div className="glass flex items-start gap-4 rounded-3xl border-gold/20 p-7 sm:p-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold-bright">
              <Scale size={20} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="mb-1.5 text-xl">Apolitical &amp; Non-Profit Statement</h2>
              <p className="text-[14.5px] leading-relaxed text-ink-muted">
                IEDF is a non-governmental, non-profit, and apolitical organization. Our work
                is guided solely by the economic development interests of Ikeduru — independent
                of any political party or affiliation.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
