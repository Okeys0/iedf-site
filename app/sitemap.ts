import type { MetadataRoute } from "next";
import { newsPosts } from "@/lib/content/news";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://iedf-site.vercel.app";
const locales = ["en", "ig"] as const;

const staticPaths = [
  "",
  "/about",
  "/about/leadership",
  "/about-ikeduru",
  "/projects",
  "/join-us",
  "/contact",
  "/news",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const post of newsPosts) {
      entries.push({
        url: `${siteUrl}/${locale}/news/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
