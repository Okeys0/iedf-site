import type { Metadata } from "next";
import Link from "next/link";
import { MilestoneLine } from "@/components/MilestoneLine";
import { ExpandableText } from "@/components/ExpandableText";

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
        Full founding narrative — provided directly by IEDF (founding
        members' account), July 2026. Per Content Outline Section 2.1,
        this is the credibility-anchor content for diaspora visitors.
        Minor copyedits made for web readability (e.g. "chat a new
        developmental course" -> "chart", a stray comma spacing fix) —
        no factual/substantive changes to names, dates, or events.
      */}
      <section className="mb-14">
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
      </section>

      <section className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg">Mission</h2>
          <p className="text-sm text-[var(--color-soil)]">
            To mobilize the collective expertise, resources, and partnerships of
            Ikeduru people and stakeholders to advance sustainable economic growth,
            attract investment, strengthen communities, and improve the quality of
            life through innovative, inclusive, and collaborative development
            initiatives.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg">Vision</h2>
          <p className="text-sm text-[var(--color-soil)]">
            Ikeduru Economic Development Forum (IEDF) envisions an economically and
            socially vibrant, prosperous, and self-sustaining Ikeduru, where the
            collective expertise, resources, and commitment of its people drive
            transformative and inclusive development.
          </p>
        </div>
      </section>

      <section className="mb-14 rounded-[7px] border border-black/10 bg-[var(--color-forest-tint)] p-6 text-center">
        <h2 className="mb-2 text-lg">Leadership &amp; Governance</h2>
        <p className="mb-4 text-sm text-[var(--color-soil)]">
          Meet the executive committee driving IEDF&apos;s mission forward.
        </p>
        <Link
          href={`/${locale}/about/leadership`}
          className="inline-block rounded-[7px] bg-[var(--color-forest)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#153d26]"
        >
          View Leadership &amp; Governance →
        </Link>
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
