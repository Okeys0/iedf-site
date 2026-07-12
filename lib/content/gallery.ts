/**
 * "Ikeduru in Pictures" gallery — shown near the top of the About Ikeduru
 * page. Empty for now; add entries here as real photos become available
 * (landscapes, markets, cultural events, the industrial cluster site,
 * etc.). Until populated, the page renders placeholder tiles instead.
 *
 * Per Content Outline Section 3, prefer photos that are actually of
 * Ikeduru specifically over generic/stock imagery — this section is
 * exactly the kind of place-level content where that distinction matters
 * most for the site's credibility goal.
 */

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export const ikeduruGalleryImages: GalleryImage[] = [];
