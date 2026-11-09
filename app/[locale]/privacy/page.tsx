import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { AccentLine } from "@/lib/accent";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How IEDF collects, stores, and uses information submitted through our website forms.",
};

const sections = [
  "intro",
  "collect",
  "use",
  "store",
  "share",
  "retain",
  "rights",
  "children",
  "changes",
  "contactUs",
] as const;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <AccentLine text={t("heroTitle")} accent={t("heroTitleAccent")} />
        }
        subline={t("heroSubline")}
      />

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <Reveal>
          <p className="mb-10 font-data text-[11px] uppercase tracking-[0.22em] text-ink-faint">
            {t("updated")}
          </p>
        </Reveal>

        <div className="space-y-10">
          {sections.map((key) => (
            <Reveal key={key}>
              <section className="scroll-mt-28">
                <h2 className="mb-3 text-2xl">{t(`${key}Title`)}</h2>
                <div className="space-y-3 text-[15px] leading-[1.85] text-ink-muted">
                  {t(`${key}Text`)
                    .split("\n\n")
                    .map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
