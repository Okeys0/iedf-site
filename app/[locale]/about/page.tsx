import type { Metadata } from "next";
import Image from "next/image";
import { MilestoneLine } from "@/components/MilestoneLine";
import { ExpandableText } from "@/components/ExpandableText";

export const metadata: Metadata = {
  title: "About IEDF",
  description:
    "The story of IEDF — from a founding meeting in Umuoziri Inyishi to a governed institution driving Ikeduru's economic development.",
};

type Leader = {
  name: string;
  role: string;
  bio?: string;
  bioSecondParagraph?: string;
  photo?: string;
};

const leaders: Leader[] = [
  {
    name: "Dr. Pedus Eweama",
    role: "President",
    photo: "/images/leadership/pedus-eweama.jpg",
    bio: "Dr. Pedus Eweama serves as President of IEDF, having been the vision bearer for its formation. A medical practitioner from Umuofor Autonomous Community, Amaimo, he is an award-winning leader in the Nigerian diaspora community, having led various diaspora organisations in Australia.",
    bioSecondParagraph:
      "He is Founder and CEO of G-Prest Imperial Limited, makers of Ginika Feed products in Inyishi, Ikeduru — Imo State's only fully automated fish and poultry feed factory. In 2025, NIDCOM honored him with Nigeria's National Diaspora Merit Award.",
  },
  {
    name: "Leadership bio placeholder",
    role: "Vice President — pending content",
  },
  {
    name: "Okeys Ononiwu",
    role: "Secretary",
    photo: "/images/leadership/okeys-ononiwu.jpg",
    bio: "Okeys Ononiwu serves as Secretary of IEDF. An accomplished technology executive and business transformation leader with extensive international experience, he hails from Amatta, Ikeduru.",
    bioSecondParagraph:
      "He is Founder and Chairman of the Okeys Ononiwu Youth Empowerment Foundation (OOYEF), supporting young people through education, scholarships, and mentorship.",
  },
];

export default function AboutPage() {
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

      <section className="mb-14">
        <h2 className="mb-5 text-lg">Leadership &amp; Governance</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {leaders.map((leader, i) => (
            <div key={i} className="text-center">
              {leader.photo ? (
                <div className="relative mx-auto mb-3 h-[90px] w-[90px] overflow-hidden rounded-full">
                  <Image
                    src={leader.photo}
                    alt={`${leader.name}, ${leader.role}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="mx-auto mb-3 h-[90px] w-[90px] rounded-full bg-[var(--color-forest-tint)]"
                  aria-hidden="true"
                />
              )}
              <div className="text-sm font-semibold">{leader.name}</div>
              <div className="text-xs text-[var(--color-soil)]">{leader.role}</div>
              {leader.bio && (
                <p className="mt-2 text-left text-xs text-[var(--color-soil)]">{leader.bio}</p>
              )}
              {leader.bioSecondParagraph && (
                <p className="mt-2 text-left text-xs text-[var(--color-soil)]">
                  {leader.bioSecondParagraph}
                </p>
              )}
            </div>
          ))}
        </div>
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
