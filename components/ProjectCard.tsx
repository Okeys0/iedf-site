import Image from "next/image";
import { Tag } from "./Tag";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  status: "active" | "planned";
  /**
   * Optional real photo. If omitted, falls back to the tint-colored
   * placeholder — see Content Outline note on sourcing real photography
   * before labeling images as depicting a specific, named project.
   */
  image?: {
    src: string;
    alt: string;
    /**
     * "cover" (default) fills the slot, cropping edges as needed —
     * good for photographic content. "contain" shows the whole image
     * with no cropping — use for logos/lockups where every part
     * (e.g. a tagline strip) must always stay visible.
     */
    fit?: "cover" | "contain";
  };
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-[7px] border border-black/10 bg-white">
      {project.image ? (
        <div
          className="relative h-[100px] w-full"
          style={project.image.fit === "contain" ? { background: "rgb(5, 10, 48)" } : undefined}
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className={project.image.fit === "contain" ? "object-contain" : "object-cover"}
          />
        </div>
      ) : (
        <div className="h-[100px] bg-[var(--color-forest-tint)]" aria-hidden="true" />
      )}
      <div className="p-4">
        <div className="mb-2">
          <Tag variant={project.status}>
            {project.status === "active" ? "Active" : "Planned"}
          </Tag>
        </div>
        <h3 className="mb-1.5 font-sans text-[15px] font-semibold text-[var(--color-loam)]">
          {project.title}
        </h3>
        <p className="text-[13px] text-[var(--color-soil)]">{project.summary}</p>
      </div>
    </div>
  );
}
