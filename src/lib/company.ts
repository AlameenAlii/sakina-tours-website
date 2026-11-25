// Single source of truth for brand, legal and contact details.
// Values marked TODO(client) must be confirmed by the client before launch.

import type { Lang } from "./i18n";

export const brand = {
  nameEn: "Sakina Tours",
  nameAr: "\u0633\u0643\u064a\u0646\u0629",
  lineEn: "People of Madinah",
  lineAr: "\u0623\u0647\u0644 \u0627\u0644\u0645\u062f\u064a\u0646\u0629",
  legalNameAr: "\u0645\u0623\u0633\u0633\u0629 \u0633\u0643\u064a\u0646\u0629",
  /** TODO(client): confirm the official English legal name before launch. */
  legalNameEn: null as string | null,
  unifiedNationalNumber: "7000000000",
  /** TODO(client): commercial registration number, if applicable. */
  commercialRegistration: null as string | null,
  /** TODO(client): tourism licence number — publish only once verified. */
  tourismLicence: null as string | null,
  domain: "example.com",
} as const;

export const contact = {
  cityEn: "Madinah",
  cityAr: "\u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
  countryEn: "Saudi Arabia",
  countryAr: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629",
  whatsappDisplay: "+966 50 000 0000",
  whatsappDigits: "966500000000",
  /** TODO(client): replace with the real business inbox. */
  email: "hello@example.com",
  /** TODO(client): replace "#" with the live profile URLs. */
  instagram: "#",
  tiktok: "#",
  /** TODO(client): published response hours, once agreed. */
  responseHours: null as string | null,
} as const;

export const telHref = `tel:+${contact.whatsappDigits}`;

export const mapEmbed =
  "https://www.openstreetmap.org/export/embed.html?bbox=39.49%2C24.38%2C39.70%2C24.55&layer=mapnik";

export const mapLink = "https://www.openstreetmap.org/#map=12/24.4686/39.6142";

export type LegalLine = { label: string; value: string };

export type LegalLabels = {
  legalNameLabel: string;
  unifiedNumberLabel: string;
  crLabel: string;
  tourismLicenceLabel: string;
};

/** Footer legal block. Unverified values are omitted rather than faked. */
export function legalLines(lang: Lang, labels: LegalLabels): LegalLine[] {
  const legalName = lang === "ar" ? brand.legalNameAr : brand.legalNameEn;
  const lines: Array<LegalLine | null> = [
    legalName ? { label: labels.legalNameLabel, value: legalName } : null,
    { label: labels.unifiedNumberLabel, value: brand.unifiedNationalNumber },
    brand.commercialRegistration
      ? { label: labels.crLabel, value: brand.commercialRegistration }
      : null,
    brand.tourismLicence
      ? { label: labels.tourismLicenceLabel, value: brand.tourismLicence }
      : null,
  ];
  return lines.filter((line): line is LegalLine => line !== null);
}

export function locationLine(lang: Lang): string {
  return lang === "ar"
    ? `${contact.cityAr}\u060c ${contact.countryAr}`
    : `${contact.cityEn}, ${contact.countryEn}`;
}

export function brandName(lang: Lang): string {
  return lang === "ar" ? brand.nameAr : brand.nameEn;
}

export function brandLine(lang: Lang): string {
  return lang === "ar" ? brand.lineAr : brand.lineEn;
}
