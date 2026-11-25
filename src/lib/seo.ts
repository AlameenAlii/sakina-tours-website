// SEO helpers: locale-aware meta, canonical, hreflang and JSON-LD.
// Every page composes its head from `seoMeta` + `seoLinks` so the bilingual
// pair always stays consistent.

import { brand, contact } from "./company";
import {
  LANG_TAGS,
  LANGS,
  OG_LOCALES,
  PAGE_SLUGS,
  pagePath,
  type Lang,
  type PageKey,
} from "./i18n";

export const siteName = "Sakina Tours";

/** Override at build time with VITE_SITE_URL when the domain changes. */
export const siteUrl = (
  import.meta.env?.VITE_SITE_URL ?? `https://${brand.domain}`
).replace(/\/$/, "");

export const logoImagePath = "/brand/logo-square.png";

/**
 * Social share cards, one per locale, sized for WhatsApp / Facebook /
 * X link previews (1200x630, JPEG, well under the 300 KB that WhatsApp
 * will fetch for a rich preview).
 */
export const ogImageWidth = 1200;
export const ogImageHeight = 630;
export const ogImageType = "image/jpeg";

export function ogImagePath(lang: Lang): string {
  return `/og/og-${lang}.jpg`;
}

export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.length > 1 ? withLeading.replace(/\/$/, "") : withLeading;
}

export function absoluteUrl(path: string): string {
  return `${siteUrl}${normalizePath(path)}`;
}

export function pageUrl(lang: Lang, key: PageKey): string {
  return absoluteUrl(pagePath(lang, key));
}

export function ogImageUrl(lang: Lang): string {
  return absoluteUrl(ogImagePath(lang));
}

type MetaTag = Record<string, string | boolean>;

/** Localized title/description/OG/Twitter tags for one page. */
export function seoMeta(args: {
  lang: Lang;
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}): MetaTag[] {
  const url = absoluteUrl(args.path);
  const image = absoluteUrl(args.image ?? ogImagePath(args.lang));
  const tags: MetaTag[] = [
    { title: args.title },
    { name: "description", content: args.description },
    { property: "og:site_name", content: siteName },
    { property: "og:title", content: args.title },
    { property: "og:description", content: args.description },
    { property: "og:type", content: args.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:type", content: ogImageType },
    { property: "og:image:width", content: String(ogImageWidth) },
    { property: "og:image:height", content: String(ogImageHeight) },
    { property: "og:locale", content: OG_LOCALES[args.lang] },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: args.title },
    { name: "twitter:description", content: args.description },
    { name: "twitter:image", content: image },
  ];

  const imageAlt = args.imageAlt ?? args.title;
  tags.push({ property: "og:image:alt", content: imageAlt });
  tags.push({ name: "twitter:image:alt", content: imageAlt });

  for (const alternate of LANGS.filter((l) => l !== args.lang)) {
    tags.push({ property: "og:locale:alternate", content: OG_LOCALES[alternate] });
  }

  if (args.noIndex) {
    tags.push({ name: "robots", content: "noindex, nofollow" });
  }

  return tags;
}

type LinkTag = Record<string, string>;

/** Canonical plus the full hreflang set, including x-default. */
export function seoLinks(key: PageKey, lang: Lang): LinkTag[] {
  const links: LinkTag[] = [{ rel: "canonical", href: pageUrl(lang, key) }];
  for (const alternate of LANGS) {
    links.push({
      rel: "alternate",
      hrefLang: LANG_TAGS[alternate],
      href: pageUrl(alternate, key),
    });
  }
  links.push({
    rel: "alternate",
    hrefLang: "x-default",
    href: pageUrl("en", key),
  });
  return links;
}

export function seoScripts(jsonLd: object | object[]): Array<{
  type: string;
  children: string;
}> {
  const payload = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return payload.map((entry) => ({
    type: "application/ld+json",
    children: JSON.stringify(entry),
  }));
}

export function organizationJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: lang === "ar" ? brand.nameAr : brand.nameEn,
    alternateName: lang === "ar" ? brand.nameEn : brand.nameAr,
    url: absoluteUrl(pagePath(lang, "home")),
    logo: absoluteUrl(logoImagePath),
    telephone: `+${contact.whatsappDigits}`,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: lang === "ar" ? contact.cityAr : contact.cityEn,
      addressCountry: "SA",
    },
    identifier: brand.unifiedNationalNumber,
  };
}

export function localBusinessJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: lang === "ar" ? brand.nameAr : brand.nameEn,
    url: absoluteUrl(pagePath(lang, "home")),
    image: ogImageUrl(lang),
    telephone: `+${contact.whatsappDigits}`,
    areaServed: lang === "ar" ? contact.cityAr : contact.cityEn,
    address: {
      "@type": "PostalAddress",
      addressLocality: lang === "ar" ? contact.cityAr : contact.cityEn,
      addressCountry: "SA",
    },
  };
}

export function webPageJsonLd(args: {
  lang: Lang;
  key: PageKey;
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: args.title,
    description: args.description,
    url: pageUrl(args.lang, args.key),
    inLanguage: LANG_TAGS[args.lang],
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function serviceJsonLd(args: {
  lang: Lang;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: args.name,
    description: args.description,
    provider: {
      "@type": "Organization",
      name: args.lang === "ar" ? brand.nameAr : brand.nameEn,
      url: siteUrl,
    },
    areaServed: args.lang === "ar" ? contact.cityAr : contact.cityEn,
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(
  lang: Lang,
  trail: Array<{ name: string; key: PageKey }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: pageUrl(lang, entry.key),
    })),
  };
}

/** All twelve localized paths — used by prerender config and the sitemap. */
export const allLocalizedPaths: string[] = LANGS.flatMap((lang) =>
  (Object.keys(PAGE_SLUGS) as PageKey[]).map((key) => pagePath(lang, key)),
);
