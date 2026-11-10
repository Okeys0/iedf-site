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
    description: "The Atta-Inyishi-Amaimo Industrial Cluster is a government-designated development site in Ikeduru Local Government Area, earmarked for agro-allied and light manufacturing industry. This strategic corridor along the Owerri road represents a major opportunity for industrial investment and economic transformation in the area.\n\nIEDF is actively working to facilitate infrastructure development, attract investors, and coordinate stakeholder engagement to bring this industrial vision to life. The cluster is positioned to create jobs, add value to local agricultural produce, and establish Ikeduru as a manufacturing hub in Imo State.",
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
    description: "The Gas-to-Power Project is a pioneering initiative to establish reliable electricity generation infrastructure to power the Atta-Inyishi-Amaimo Industrial Cluster and surrounding areas. Leveraging Nigeria's natural gas resources, this project aims to provide consistent, affordable power to anchor tenants and businesses in the cluster.\n\nIEDF is working with technical partners, potential investors, and relevant government agencies to advance feasibility studies and project structuring. Reliable power is critical to industrial competitiveness, and this initiative addresses one of the most significant infrastructure gaps facing businesses in the region.",
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
    description: "IEDF collaborates with Imo State's Office of the Chief Economic Advisor on the One Kindred, One Business Initiative (OKOBI) — a community-based enterprise model designed to stimulate local economic activity by mobilizing kindreds and communities to establish sustainable businesses.\n\nThrough this partnership, IEDF supports capacity building, business planning, and coordination for participating communities in Ikeduru. OKOBI represents an opportunity to leverage social capital, indigenous knowledge, and communal structures to create shared prosperity and economic resilience across Ikeduru's 29 autonomous communities.",
    status: "active",
    // Genuine sourcing note: this is the official OKOBI (One Kindred, One
    // Business Initiative) program logo/branding — authentic, no "not
    // confirmed" caveat needed, unlike the two placeholder photos above.
    image: {
      src: "/images/project-okobi.jpg",
      alt: "OKOBI — One Kindred, One Business Initiative — official program logo",
      fit: "contain",
    },
  },
  {
    slug: "ama-nwaozuzu-motor-park",
    title: "Ama Nwaozuzu Motor Park, Iho",
    summary: "Major transport hub supporting commerce and connectivity in Ikeduru.",
    description: "Ama Nwaozuzu Motor Park is a major transport hub in Iho, Ikeduru Local Government Area, Imo State. Located around the busy Ama Nwaozuzu Junction on the Owerri–Okigwe Road, it serves residents, traders, students, and travellers moving between Ikeduru, Owerri, and other parts of Imo State and the South-East.\n\nThe motor park supports daily commercial activity by providing boarding and drop-off points for buses, minibuses, taxis, and tricycles. It also creates livelihoods for transport operators, food vendors, traders, loaders, and other small businesses around the junction.\n\nAs a key access point for Iho and surrounding communities, Ama Nwaozuzu Motor Park remains important to local mobility, commerce, and connectivity within Ikeduru.",
    status: "active",
    image: {
      src: "/images/project-motor-park.jpg",
      alt: "Ama Nwaozuzu Motor Park transport hub",
    },
  },
  {
    slug: "ikeduru-cancer-hospital",
    title: "American Cancer Hospital, Iho, Ikeduru",
    summary: "Specialist oncology facility bringing cancer care closer to the community.",
    description: "The American Cancer Hospital, commonly referred to as the Ikeduru Cancer Hospital, is a specialist healthcare facility located at Km 13, Owerri–Okigwe Road, Iho, Ikeduru Local Government Area, Imo State. It is operated by Imo International Health Systems and provides cancer treatment and related medical services to patients from Ikeduru, Owerri, and beyond.\n\nThe hospital offers oncology services including radiotherapy, chemotherapy, surgery, and palliative care. It also provides primary care, laboratory, obstetrics and gynaecology, paediatrics, radiology, and surgical services, making it an important healthcare destination for the community.\n\nThe facility represents a major health investment in Ikeduru, bringing specialised cancer-care services closer to residents and reducing the need for patients to travel outside the state for treatment. It also contributes to employment, skills development, and improved access to quality healthcare in the area.",
    website: "https://www.imocare.com",
    status: "active",
    image: {
      src: "/images/project-cancer-hospital.jpg",
      alt: "American Cancer Hospital Ikeduru",
    },
  },
  {
    slug: "ginika-feeds",
    title: "G-Prest Imperial Limited (Ginika Feeds)",
    summary: "Agro-allied manufacturing producing high-quality animal feeds for Nigeria's agricultural sector.",
    description: "G-Prest Imperial Limited is an agro-allied manufacturing company based in Ikeduru, Imo State, producing Ginika Feeds—high-quality animal feeds for Nigeria's agricultural sector. The company operates an automated feed mill and focuses on quality production, sustainable practices, and support for livestock farmers.\n\nGinika Feeds contributes to food security, employment creation, and local economic development by adding value within the agricultural value chain. Its operations support farmers and livestock producers with dependable animal-feed products, while also creating opportunities in production, logistics, marketing, and related services.\n\nAs an agro-industrial investment in Ikeduru, G-Prest Imperial Limited strengthens the area's role in agricultural processing and manufacturing, helping to build a more self-reliant local economy.",
    status: "active",
    image: {
      src: "/images/project-ginika-feeds.jpg",
      alt: "Ginika Feeds animal feed production facility",
    },
  },
];

export const roadmapAreas = [
  { slug: "healthcare", title: "Healthcare" },
  { slug: "security", title: "Security" },
  { slug: "industrialization", title: "Industrialization" },
  { slug: "education", title: "Education" },
];

/** slug → message keys for translated title/summary (home + projects pages). */
export const projectMessageKeys: Record<string, [string, string]> = {
  "industrial-cluster": ["industrialClusterTitle", "industrialClusterSummary"],
  "gas-to-power": ["gasToPowerTitle", "gasToPowerSummary"],
  "okobi-collaboration": ["okobiTitle", "okobiSummary"],
  "ama-nwaozuzu-motor-park": ["motorParkTitle", "motorParkSummary"],
  "ikeduru-cancer-hospital": ["cancerHospitalTitle", "cancerHospitalSummary"],
  "ginika-feeds": ["ginikaFeedsTitle", "ginikaFeedsSummary"],
};
