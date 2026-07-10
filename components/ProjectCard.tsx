import { Tag } from "./Tag";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  status: "active" | "planned";
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-[7px] border border-black/10 bg-white">
      <div className="h-[100px] bg-[var(--color-forest-tint)]" aria-hidden="true" />
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
