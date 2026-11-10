import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { activeProjects, projectMessageKeys } from "@/lib/content/projects";
import { PageHero } from "@/components/PageHero";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ExternalLink, ArrowLeft } from "lucide-react";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return activeProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = activeProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} · IEDF Projects`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const project = activeProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "projects" });
  const tTags = await getTranslations({ locale, namespace: "tags" });

  // Get translated title/summary if available
  const keys = projectMessageKeys[project.slug];
  const title = keys ? t(keys[0]) : project.title;
  const summary = keys ? t(keys[1]) : project.summary;

  return (
    <>
      {/* Hero image section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className={`${
              project.image.fit === "contain" 
                ? "object-contain p-12" 
                : "object-cover"
            }`}
            priority
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(140deg, rgba(47,158,99,0.2), rgba(26,74,46,0.15))",
            }}
          />
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(12,31,22,0.4) 60%, var(--color-night) 100%)",
          }}
        />

        {/* Back button */}
        <div className="absolute left-6 top-6 z-10">
          <Button
            href={`/${locale}/projects`}
            variant="ghost"
            className="glass-strong"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Button>
        </div>

        {/* Tag */}
        {project.status && (
          <div className="absolute bottom-6 left-6 z-10">
            <Tag variant={project.status}>{tTags(project.status)}</Tag>
          </div>
        )}
      </div>

      {/* Content section */}
      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <Reveal>
          <h1 className="mb-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-ink-muted">
            {summary}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="prose prose-invert max-w-none">
            {project.description?.split("\n\n").map((paragraph, idx) => (
              <p
                key={idx}
                className="mb-6 text-[15px] leading-relaxed text-ink-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Website link if available */}
        {project.website && (
          <Reveal delay={0.2}>
            <div className="mt-12 glass-strong rounded-2xl border border-gold/20 p-6">
              <h3 className="mb-3 font-display text-lg text-ink">
                Visit Project Website
              </h3>
              <p className="mb-4 text-sm text-ink-muted">
                Learn more about this project and its current activities.
              </p>
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(115deg,#f6e7b2,#ecc76a_30%,#d4a734_100%)] px-6 py-3 text-sm font-bold text-night transition-all duration-300 hover:brightness-110"
              >
                Visit Website
                <ExternalLink size={16} />
              </a>
            </div>
          </Reveal>
        )}

        {/* CTA to see all projects */}
        <Reveal delay={0.3}>
          <div className="mt-16 border-t border-gold/15 pt-12 text-center">
            <Button href={`/${locale}/projects`} variant="secondary" size="lg">
              View All Projects
            </Button>
          </div>
        </Reveal>
      </article>
    </>
  );
}
