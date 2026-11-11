/**
 * "Ikeduru in Pictures" gallery — shown near the top of the About Ikeduru
 * page. Prefer photos that are actually of Ikeduru specifically over
 * generic/stock imagery. Until more arrive, the page renders whatever
 * entries exist here (or placeholder tiles if the array is empty).
 */

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export const ikeduruGalleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/ogboachara-monument.jpg",
    alt: "Ogboachara Bush Burning Masquerade cultural heritage monument, Ground Festival of Iho Dimeze Ancient Kingdom, Ikeduru LGA, Imo State, Nigeria",
    caption: "Ogboachara Monument, Iho Dimeze Ancient Kingdom",
  },
  {
    src: "/images/gallery/staff-of-office-ceremony.jpg",
    alt: "Traditional ruler receiving a staff of office",
    caption: "Staff of office presentation ceremony",
  },
];
