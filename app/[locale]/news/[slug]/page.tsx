import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { AccentLine } from "@/lib/accent";
import { Reveal } from "@/components/motion/Reveal";
import { getNewsPost, newsPosts } from "@/lib/content/news";

export function generateStaticParams() {
  return newsPosts.flatMap((post) =>
    ["en", "ig"].map((locale) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return { title: "News" };
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: t(`${post.messageKey}Title`),
    description: t(`${post.messageKey}Summary`),
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "news" });
  const bodyKeys = [`${post.messageKey}P1`, `${post.messageKey}P2`, `${post.messageKey}P3`] as const;

  const categoryLabel =
    post.category === "event"
      ? t("catEvent")
      : post.category === "press"
        ? t("catPress")
        : t("catAnnouncement");

  return (
    <>
      <PageHero
        eyebrow={categoryLabel}
        title={
          <AccentLine
            text={t(`${post.messageKey}Title`)}
            accent={t(`${post.messageKey}Accent`)}
          />
        }
        subline={new Date(post.date).toLocaleDateString(
          locale === "ig" ? "en-GB" : locale,
          { year: "numeric", month: "long", day: "numeric" }
        )}
      />

      <article className="mx-auto max-w-3xl px-6 pb-20">
        <Reveal className="space-y-6 text-[15.5px] leading-[1.85] text-ink-muted">
          {bodyKeys.map((key) => {
            const text = t(key);
            if (!text || text === key) return null;
            return <p key={key}>{text}</p>;
          })}
        </Reveal>

        <Reveal className="mt-12">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-sm text-gold-bright hover:text-gold-pale"
          >
            <ArrowLeft size={15} />
            {t("backToNews")}
          </Link>
        </Reveal>
      </article>
    </>
  );
}
