// Product catalogue — exactly two Ajwa date selections.
//
// TEMPORARY CONTENT: pack sizes, packaging notes and indicative prices are
// examples for client review. Confirmed values replace them before launch.
// Every product action is a WhatsApp enquiry: there is no cart or checkout.

import type { ProductKey } from "../lib/whatsapp";
import type { Localized } from "./tours";

export type Product = {
  key: ProductKey;
  slugId: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  weight: Localized;
  packaging: Localized;
  availability: Localized;
  /** Indicative only — confirmed on WhatsApp per pack size. */
  priceFrom: number;
  notes: Localized;
  specs: Record<"en" | "ar", string[]>;
  image: string;
  imageAlt: Localized;
};

export const products: Product[] = [
  {
    key: "aliyah",
    slugId: "ajwa-al-aliyah",
    name: {
      en: "Ajwa Al-Aliyah Dates",
      ar: "\u0639\u062c\u0648\u0629 \u0627\u0644\u0639\u0627\u0644\u064a\u0629",
    },
    tagline: {
      en: "Our premium selection",
      ar: "\u0627\u062e\u062a\u064a\u0627\u0631\u0646\u0627 \u0627\u0644\u0645\u0645\u064a\u0632",
    },
    description: {
      en: "A hand-sorted premium selection of Ajwa grown in the Al-Aliyah area of Madinah, chosen for even size, soft texture and a deep, balanced sweetness. Suited to gifting and special occasions.",
      ar: "\u0627\u062e\u062a\u064a\u0627\u0631 \u0645\u0645\u064a\u0632 \u0645\u0646 \u0639\u062c\u0648\u0629 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0639\u0627\u0644\u064a\u0629 \u0628\u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629\u060c \u064a\u064f\u0641\u0631\u0632 \u064a\u062f\u0648\u064a\u064b\u0627 \u0628\u062d\u0633\u0628 \u062a\u0646\u0627\u0633\u0642 \u0627\u0644\u062d\u062c\u0645 \u0648\u0644\u064a\u0646 \u0627\u0644\u0642\u0648\u0627\u0645 \u0648\u062d\u0644\u0627\u0648\u0629 \u0645\u062a\u0648\u0627\u0632\u0646\u0629 \u0639\u0645\u064a\u0642\u0629. \u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u0625\u0647\u062f\u0627\u0621 \u0648\u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062a.",
    },
    weight: {
      en: "500 g \u00b7 1 kg \u00b7 3 kg",
      ar: "500 \u062c\u0631\u0627\u0645 \u00b7 1 \u0643\u062c\u0645 \u00b7 3 \u0643\u062c\u0645",
    },
    packaging: {
      en: "Gift box with inner tray, or sealed pouch",
      ar: "\u0639\u0644\u0628\u0629 \u0647\u062f\u0627\u064a\u0627 \u0645\u0639 \u0637\u0628\u0642 \u062f\u0627\u062e\u0644\u064a\u060c \u0623\u0648 \u0643\u064a\u0633 \u0645\u062d\u0643\u0645 \u0627\u0644\u0625\u063a\u0644\u0627\u0642",
    },
    availability: {
      en: "Available in limited quantities",
      ar: "\u0645\u062a\u0648\u0641\u0631 \u0628\u0643\u0645\u064a\u0627\u062a \u0645\u062d\u062f\u0648\u062f\u0629",
    },
    priceFrom: 120,
    notes: {
      en: "Keep in a cool, dry place or refrigerate in warm weather. Best served at room temperature.",
      ar: "\u064a\u064f\u062d\u0641\u0638 \u0641\u064a \u0645\u0643\u0627\u0646 \u0628\u0627\u0631\u062f \u0648\u062c\u0627\u0641\u060c \u0623\u0648 \u0641\u064a \u0627\u0644\u0645\u0628\u0631\u062f \u0641\u064a \u0627\u0644\u0623\u062c\u0648\u0627\u0621 \u0627\u0644\u062d\u0627\u0631\u0629\u060c \u0648\u064a\u064f\u0642\u062f\u0645 \u0641\u064a \u062f\u0631\u062c\u0629 \u062d\u0631\u0627\u0631\u0629 \u0627\u0644\u063a\u0631\u0641\u0629.",
    },
    specs: {
      en: [
        "Hand-sorted, even grading",
        "Soft texture, deep flavour",
        "Gift-ready packaging",
      ],
      ar: [
        "\u0641\u0631\u0632 \u064a\u062f\u0648\u064a \u0648\u062a\u0635\u0646\u064a\u0641 \u0645\u062a\u0646\u0627\u0633\u0642",
        "\u0642\u0648\u0627\u0645 \u0644\u064a\u0646 \u0648\u0645\u0630\u0627\u0642 \u0639\u0645\u064a\u0642",
        "\u062a\u0639\u0628\u0626\u0629 \u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0625\u0647\u062f\u0627\u0621",
      ],
    },
    image: "/products/ajwa-al-aliyah.jpg",
    imageAlt: {
      en: "Ajwa Al-Aliyah dates arranged in a dark gift tray",
      ar: "\u062a\u0645\u0648\u0631 \u0639\u062c\u0648\u0629 \u0627\u0644\u0639\u0627\u0644\u064a\u0629 \u0645\u0631\u062a\u0628\u0629 \u0641\u064a \u0637\u0628\u0642 \u0647\u062f\u0627\u064a\u0627 \u062f\u0627\u0643\u0646",
    },
  },
  {
    key: "madinah",
    slugId: "ajwa-madinah",
    name: {
      en: "Ajwa Madinah Dates",
      ar: "\u0639\u062c\u0648\u0629 \u0627\u0644\u0645\u062f\u064a\u0646\u0629",
    },
    tagline: {
      en: "Our everyday selection",
      ar: "\u0627\u062e\u062a\u064a\u0627\u0631\u0646\u0627 \u0627\u0644\u064a\u0648\u0645\u064a",
    },
    description: {
      en: "Classic Madinah Ajwa with a familiar dark colour and gentle sweetness. A dependable everyday selection for family use and larger quantities.",
      ar: "\u0639\u062c\u0648\u0629 \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0643\u0644\u0627\u0633\u064a\u0643\u064a\u0629 \u0628\u0644\u0648\u0646\u0647\u0627 \u0627\u0644\u062f\u0627\u0643\u0646 \u0627\u0644\u0645\u0639\u0631\u0648\u0641 \u0648\u062d\u0644\u0627\u0648\u062a\u0647\u0627 \u0627\u0644\u0647\u0627\u062f\u0626\u0629\u060c \u0627\u062e\u062a\u064a\u0627\u0631 \u064a\u0648\u0645\u064a \u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0639\u0627\u0626\u0644\u064a \u0648\u0627\u0644\u0643\u0645\u064a\u0627\u062a \u0627\u0644\u0623\u0643\u0628\u0631.",
    },
    weight: {
      en: "500 g \u00b7 1 kg \u00b7 5 kg",
      ar: "500 \u062c\u0631\u0627\u0645 \u00b7 1 \u0643\u062c\u0645 \u00b7 5 \u0643\u062c\u0645",
    },
    packaging: {
      en: "Sealed pouch, or bulk carton for larger orders",
      ar: "\u0643\u064a\u0633 \u0645\u062d\u0643\u0645 \u0627\u0644\u0625\u063a\u0644\u0627\u0642\u060c \u0623\u0648 \u0643\u0631\u062a\u0648\u0646 \u0644\u0644\u0643\u0645\u064a\u0627\u062a \u0627\u0644\u0643\u0628\u064a\u0631\u0629",
    },
    availability: {
      en: "Available year-round, subject to season",
      ar: "\u0645\u062a\u0648\u0641\u0631 \u0639\u0644\u0649 \u0645\u062f\u0627\u0631 \u0627\u0644\u0639\u0627\u0645 \u0628\u062d\u0633\u0628 \u0627\u0644\u0645\u0648\u0633\u0645",
    },
    priceFrom: 75,
    notes: {
      en: "Store sealed away from direct sunlight. Suitable for daily use and larger household quantities.",
      ar: "\u064a\u064f\u062d\u0641\u0638 \u0645\u063a\u0644\u0642\u064b\u0627 \u0628\u0639\u064a\u062f\u064b\u0627 \u0639\u0646 \u0623\u0634\u0639\u0629 \u0627\u0644\u0634\u0645\u0633 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629\u060c \u0648\u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u0627\u0633\u062a\u0647\u0644\u0627\u0643 \u0627\u0644\u064a\u0648\u0645\u064a \u0648\u0627\u0644\u0643\u0645\u064a\u0627\u062a \u0627\u0644\u0645\u0646\u0632\u0644\u064a\u0629 \u0627\u0644\u0643\u0628\u064a\u0631\u0629.",
    },
    specs: {
      en: [
        "Classic Madinah Ajwa",
        "Balanced, gentle sweetness",
        "Bulk quantities on request",
      ],
      ar: [
        "\u0639\u062c\u0648\u0629 \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0643\u0644\u0627\u0633\u064a\u0643\u064a\u0629",
        "\u062d\u0644\u0627\u0648\u0629 \u0647\u0627\u062f\u0626\u0629 \u0648\u0645\u062a\u0648\u0627\u0632\u0646\u0629",
        "\u0643\u0645\u064a\u0627\u062a \u0643\u0628\u064a\u0631\u0629 \u0639\u0646\u062f \u0627\u0644\u0637\u0644\u0628",
      ],
    },
    image: "/products/ajwa-madinah.jpg",
    imageAlt: {
      en: "Close view of Ajwa Madinah dates in a woven bowl",
      ar: "\u0645\u0646\u0638\u0631 \u0642\u0631\u064a\u0628 \u0644\u062a\u0645\u0648\u0631 \u0639\u062c\u0648\u0629 \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0641\u064a \u0648\u0639\u0627\u0621 \u0645\u0646\u0633\u0648\u062c",
    },
  },
];
