"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Tag } from "./Tag";
import { SpotlightCard } from "./SpotlightCard";
import { clamp } from "@/lib/clamp";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  status: "active" | "planned";
  /**
   * Optional real photo. If omitted, falls back to an emerald tint slot
   * with a wait motif.
   */
  image?: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
  };
};

type ProjectCardProps = {
  project: Project;
  /** Translated title/summary (passed by server pages from messages).
   *  When omitted, the English content values render. */
  titleOverride?: string;
  summaryOverride?: string;
};

/**
 * Premium glass project card: spotlight cursor glow, cinematic image
 * zoom, gold rim on hover, and an arrow affordance that slides in.
 */
export function ProjectCard({ project, titleOverride, summaryOverride }: ProjectCardProps) {
  const t = useTranslations("tags");
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    el.style.setProperty("--spot-x", `${x * 100}%`);
    el.style.setProperty("--spot-y", `${y * 100}%`);
  }

  return (
    <SpotlightCard className="glass-hover group rounded-3xl" glow>
      <div onMouseMove={handleMove} className="relative flex h-full flex-col">
        <div className="relative h-44 w-full overflow-hidden rounded-t-3xl">
          {project.image ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              className={`transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] ${
                project.image.fit === "contain" ? "object-contain p-6" : "object-cover"
              }`}
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full items-center justify-center"
              style={{ background: "linear-gradient(140deg, rgba(47,158,99,0.15), rgba(26,74,46,0.1))" }}
            />
          )}
          {/* Cinematic gradient fade into the card body */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1712] via-[#0a1712]/60 to-transparent"
          />
          <div className="absolute left-4 top-4">
            <Tag variant={project.status}>
              {t(project.status)}
            </Tag>
          </div>
        </div>

        <div className="relative z-[1] flex flex-1 flex-col p-6 pt-1">
          <h3 className="mb-2 font-display text-[22px] leading-snug text-ink transition-colors duration-300 group-hover:text-gold-pale">
            {titleOverride ?? project.title}
          </h3>
          <p className="mb-5 flex-1 text-[13.5px] leading-relaxed text-ink-muted">
            {summaryOverride ?? project.summary}
          </p>
          <div className="flex items-center gap-2 font-data text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-bright opacity-0 transition-all duration-500 group-hover:opacity-100">
            {t("explore")}
            <ArrowRight size={13} className="transition-transform duration-500 group-hover:translate-x-1.5" />
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
