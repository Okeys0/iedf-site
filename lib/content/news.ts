/**
 * Local news stubs — shaped like the Sanity `newsPost` schema so a later
 * CMS fetch can replace this export without rewriting the News UI.
 *
 * Only milestone-true posts belong here (founding, inauguration, cluster
 * designation). Do not invent press coverage.
 */

export type NewsCategory = "announcement" | "press" | "event";

export type NewsPost = {
  slug: string;
  date: string; // ISO date
  category: NewsCategory;
  /** Message-key suffixes under the `news` namespace (title/summary/body). */
  messageKey: string;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "executives-inaugurated",
    date: "2026-04-01",
    category: "event",
    messageKey: "postInauguration",
  },
  {
    slug: "industrial-cluster-designated",
    date: "2025-06-01",
    category: "announcement",
    messageKey: "postCluster",
  },
  {
    slug: "iedf-founded",
    date: "2025-01-04",
    category: "announcement",
    messageKey: "postFounded",
  },
];

export function getNewsPost(slug: string) {
  return newsPosts.find((p) => p.slug === slug);
}
