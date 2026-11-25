// WhatsApp deep links. Every contact action on the site ends here.
// There is no cart, checkout or online payment anywhere in this product.

import type { Lang } from "./i18n";

export const WA_HOST = "https://wa.me/";

const WA_NUMBER = "966500000000";

/** Builds a wa.me deep link with a URL-encoded prefilled message. */
export function waUrl(message: string): string {
  return WA_HOST + WA_NUMBER + "?text=" + encodeURIComponent(message);
}

export const GREETING: Record<Lang, string> = {
  en: "Assalamu alaikum, I would like to request a tour or experience with Sakina Tours.",
  ar: "\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064a\u0643\u0645\u060c \u0623\u0631\u063a\u0628 \u0641\u064a \u0637\u0644\u0628 \u0631\u062d\u0644\u0629 \u0623\u0648 \u062a\u062c\u0631\u0628\u0629 \u0645\u0639 \u0633\u0643\u064a\u0646\u0629.",
};

/** Header / footer / hero CTA: a plain greeting with no form data. */
export function generalRequestUrl(lang: Lang): string {
  return waUrl(GREETING[lang]);
}

export type ProductKey = "aliyah" | "madinah";

export const productNames: Record<ProductKey, Record<Lang, string>> = {
  aliyah: {
    en: "Ajwa Al-Aliyah Dates",
    ar: "\u0639\u062c\u0648\u0629 \u0627\u0644\u0639\u0627\u0644\u064a\u0629",
  },
  madinah: {
    en: "Ajwa Madinah Dates",
    ar: "\u0639\u062c\u0648\u0629 \u0627\u0644\u0645\u062f\u064a\u0646\u0629",
  },
};

const PRODUCT_PROMPTS: Record<Lang, { size: string; extra: string }> = {
  en: {
    size: "Preferred pack size or quantity:",
    extra: "Additional questions:",
  },
  ar: {
    size: "\u0627\u0644\u0648\u0632\u0646 \u0623\u0648 \u0627\u0644\u0643\u0645\u064a\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:",
    extra: "\u0627\u0633\u062a\u0641\u0633\u0627\u0631\u0627\u062a \u0625\u0636\u0627\u0641\u064a\u0629:",
  },
};

/** Product card enquiry — names the exact product the visitor tapped. */
export function productInquiryUrl(key: ProductKey, lang: Lang): string {
  const name = productNames[key][lang];
  const prompts = PRODUCT_PROMPTS[lang];
  const opening =
    lang === "ar"
      ? `\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064a\u0643\u0645\u060c \u0623\u0648\u062f \u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0639\u0646 ${name} \u0645\u0646 \u0633\u0643\u064a\u0646\u0629.`
      : `Assalamu alaikum, I would like to ask about ${name} from Sakina Tours.`;
  return waUrl(`${opening}\n${prompts.size}\n${prompts.extra}`);
}

/** Products page CTA — no specific product selected. */
export function productsGeneralUrl(lang: Lang): string {
  const message =
    lang === "ar"
      ? "\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064a\u0643\u0645\u060c \u0623\u0648\u062f \u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0639\u0646 \u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0639\u062c\u0648\u0629 \u0645\u0646 \u0633\u0643\u064a\u0646\u0629."
      : "Assalamu alaikum, I would like to ask about the Ajwa date products from Sakina Tours.";
  return waUrl(message);
}

/** Tour card enquiry — carries the localized experience title. */
export function tourInquiryUrl(title: string, lang: Lang): string {
  const message =
    lang === "ar"
      ? `\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064a\u0643\u0645\u060c \u0623\u0648\u062f \u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0639\u0646 \u062a\u062c\u0631\u0628\u0629 \u00ab${title}\u00bb \u0645\u0639 \u0633\u0643\u064a\u0646\u0629.`
      : `Assalamu alaikum, I would like to ask about the “${title}” experience with Sakina Tours.`;
  return waUrl(message);
}

/** Values collected by the Plan Your Experience form. */
export type RequestValues = {
  name: string;
  phone: string;
  email?: string;
  arrival: string;
  departure: string;
  adults: number | string;
  children?: number | string;
  language: string;
  duration: string;
  interests: string[];
  places?: string;
  pickup: string;
  transport: string;
  accessibility?: string;
  budget?: string;
  notes?: string;
};

type FieldLabels = Record<Lang, string>;

type Field = {
  labels: FieldLabels;
  value: (v: RequestValues) => string;
};

const A = {
  name: "\u0627\u0644\u0627\u0633\u0645",
  phone: "\u0631\u0642\u0645 \u0648\u0627\u062a\u0633\u0627\u0628",
  arrival: "\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0648\u0635\u0648\u0644",
  departure: "\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0645\u063a\u0627\u062f\u0631\u0629",
  adults: "\u0639\u062f\u062f \u0627\u0644\u0628\u0627\u0644\u063a\u064a\u0646",
  children: "\u0639\u062f\u062f \u0627\u0644\u0623\u0637\u0641\u0627\u0644",
  language: "\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0645\u0641\u0636\u0644\u0629",
  duration: "\u0645\u062f\u0629 \u0627\u0644\u0631\u062d\u0644\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629",
  pickup: "\u0645\u0643\u0627\u0646 \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645",
  interests: "\u0627\u0644\u0627\u0647\u062a\u0645\u0627\u0645\u0627\u062a",
  places: "\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0645\u0631\u063a\u0648\u0628\u0629",
  transport: "\u0647\u0644 \u0623\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u0648\u0633\u064a\u0644\u0629 \u0646\u0642\u0644\u061f",
  accessibility:
    "\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u062d\u0631\u0643\u0629 \u0623\u0648 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u062c\u0627\u062a \u0627\u0644\u062e\u0627\u0635\u0629",
  email: "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)",
  budget: "\u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629 \u0627\u0644\u062a\u0642\u0631\u064a\u0628\u064a\u0629 (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)",
  notes: "\u0645\u0644\u0627\u062d\u0638\u0627\u062a \u0625\u0636\u0627\u0641\u064a\u0629",
} as const;

const str = (value: unknown): string =>
  value === undefined || value === null ? "" : String(value).trim();

/** Message order is fixed so every enquiry reads the same way on our side. */
const fields: Field[] = [
  { labels: { en: "Name", ar: A.name }, value: (v) => str(v.name) },
  { labels: { en: "WhatsApp number", ar: A.phone }, value: (v) => str(v.phone) },
  { labels: { en: "Arrival date", ar: A.arrival }, value: (v) => str(v.arrival) },
  {
    labels: { en: "Departure date", ar: A.departure },
    value: (v) => str(v.departure),
  },
  { labels: { en: "Adults", ar: A.adults }, value: (v) => str(v.adults) },
  { labels: { en: "Children", ar: A.children }, value: (v) => str(v.children) },
  {
    labels: { en: "Preferred language", ar: A.language },
    value: (v) => str(v.language),
  },
  {
    labels: { en: "Preferred duration", ar: A.duration },
    value: (v) => str(v.duration),
  },
  {
    labels: { en: "Pickup location", ar: A.pickup },
    value: (v) => str(v.pickup),
  },
  {
    labels: { en: "Interests", ar: A.interests },
    value: (v) => (v.interests ?? []).filter(Boolean).join(", "),
  },
  { labels: { en: "Desired places", ar: A.places }, value: (v) => str(v.places) },
  {
    labels: { en: "Transport needed", ar: A.transport },
    value: (v) => str(v.transport),
  },
  {
    labels: { en: "Mobility or accessibility needs", ar: A.accessibility },
    value: (v) => str(v.accessibility),
  },
  {
    labels: { en: "Email (optional)", ar: A.email },
    value: (v) => str(v.email),
  },
  {
    labels: { en: "Approximate budget (optional)", ar: A.budget },
    value: (v) => str(v.budget),
  },
  { labels: { en: "Additional notes", ar: A.notes }, value: (v) => str(v.notes) },
];

/** Full request message. Empty optional fields are dropped entirely. */
export function requestUrl(values: RequestValues, lang: Lang): string {
  const lines = [GREETING[lang]];
  for (const field of fields) {
    const value = field.value(values);
    if (value) lines.push(`${field.labels[lang]}: ${value}`);
  }
  return waUrl(lines.join("\n"));
}
