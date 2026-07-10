import { Project } from "@/components/ProjectCard";

/**
 * TEMPORARY local content.
 *
 * Shaped to match the `Project` Sanity schema (see sanity/schemaTypes/project.ts)
 * so that swapping this for a real Sanity query later is a drop-in change:
 *
 *   const projects = await sanityClient.fetch(projectsQuery)
 *
 * rather than a rewrite of any component that consumes this data.
 */
export const activeProjects: Project[] = [
  {
    slug: "industrial-cluster",
    title: "Atta-Inyishi-Amaimo Industrial Cluster",
    summary: "Government-designated development site for agro-allied industry.",
    status: "active",
    // NOTE: placeholder/illustrative image, not confirmed to depict the
    // actual Atta-Inyishi-Amaimo site — see README caveat. Swap for real
    // site photography before launch.
    image: {
      src: "/images/project-industrial-cluster.jpg",
      alt: "Illustrative industrial cluster imagery — not confirmed to depict the actual Atta-Inyishi-Amaimo site",
    },
  },
  {
    slug: "gas-to-power",
    title: "Gas-to-Power Project",
    summary: "Startup gas-to-electricity generation for the cluster.",
    status: "active",
    // NOTE: placeholder/illustrative image, not confirmed to depict the
    // actual Ikeduru gas-to-power equipment — same caveat as the
    // Industrial Cluster image above. Swap for real site photography
    // before launch.
    image: {
      src: "/images/project-gas-to-power.jpg",
      alt: "Illustrative gas-to-power equipment imagery — not confirmed to depict the actual Ikeduru project site",
    },
  },
  {
    slug: "okobi-collaboration",
    title: "OKOBI Collaboration",
    summary: "With Imo State's Office of the Chief Economic Advisor.",
    status: "active",
    // Genuine sourcing note: this is the official OKOBI (One Kindred, One
    // Business Initiative) program logo/branding — authentic, no "not
    // confirmed" caveat needed, unlike the two placeholder photos above.
    image: {
      src: "/images/project-okobi.jpg",
      alt: "OKOBI — One Kindred, One Business Initiative — official program logo",
    },
  },
];

export const roadmapAreas = [
  { slug: "healthcare", title: "Healthcare" },
  { slug: "security", title: "Security" },
  { slug: "industrialization", title: "Industrialization" },
  { slug: "education", title: "Education" },
];
