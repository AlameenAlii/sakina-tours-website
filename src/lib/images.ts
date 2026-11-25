// Imagery source of truth.
//
// Every path below points at a real file in /public, so nothing depends on a
// remote image host. Client-supplied photography can be dropped in place under
// the same filename and no component changes are needed.
//
// public/home/      hero, about, custom-request band
// public/heroes/    page heroes for tours, products, plan
// public/tours/     one file per tour slug
// public/products/  one file per product slug

export const images = {
  homeHero: "/home/hero.jpg",
  homeAbout: "/home/about.jpg",
  homeCustom: "/home/custom.jpg",
  toursHero: "/heroes/tours.jpg",
  productsHero: "/heroes/products.jpg",
  planHero: "/heroes/plan.jpg",
  dates: "/products/ajwa-al-aliyah.jpg",
} as const;

export type ImageKey = keyof typeof images;

/** Per-experience imagery, keyed by tour slug. */
const tourImages: Record<string, string> = {
  "heritage-morning": "/tours/heritage-morning.jpg",
  "palm-groves": "/tours/palm-groves.jpg",
  "crafts-and-markets": "/tours/crafts-and-markets.jpg",
  "family-day": "/tours/family-day.jpg",
  "golden-hour-viewpoints": "/tours/golden-hour-viewpoints.jpg",
};

/** Per-product imagery, keyed by product key. */
const productImages: Record<string, string> = {
  aliyah: "/products/ajwa-al-aliyah.jpg",
  madinah: "/products/ajwa-madinah.jpg",
};

export function tourImage(slug: string): string {
  return tourImages[slug] ?? images.dates;
}

export function productImage(key: string): string {
  return productImages[key] ?? images.dates;
}
