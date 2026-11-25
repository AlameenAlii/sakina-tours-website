// Mock tour catalogue for the client demo.
//
// TEMPORARY CONTENT: these five experiences are illustrative examples so the
// client can approve layout, density and tone. Facts, durations and indicative
// prices must be replaced with confirmed operational data before launch.
// The record shape is deliberately CMS-shaped: swapping this file for an API or
// database query later requires no component changes.

import type { Lang } from "../lib/i18n";

export type TourTheme = "heritage" | "nature" | "culture" | "family";

export type Localized = Record<Lang, string>;

export type Tour = {
  slug: string;
  theme: TourTheme;
  title: Localized;
  summary: Localized;
  /** Hours, shown with the localized "hours" label. */
  durationHours: number;
  groupSize: Localized;
  startPoint: Localized;
  pickup: Localized;
  languages: Localized;
  highlights: Record<Lang, string[]>;
  includes: Record<Lang, string[]>;
  excludes: Record<Lang, string[]>;
  /** Indicative only — final pricing is always confirmed on WhatsApp. */
  priceFrom: number;
  image: string;
  imageAlt: Localized;
};

export const tours: Tour[] = [
  {
    slug: "heritage-morning",
    theme: "heritage",
    title: {
      en: "Madinah Heritage Morning",
      ar: "\u0635\u0628\u0627\u062d \u0627\u0644\u062a\u0631\u0627\u062b \u0641\u064a \u0627\u0644\u0645\u062f\u064a\u0646\u0629",
    },
    summary: {
      en: "A calm early-morning route through the historic heart of the city, with time to walk, listen and take photographs before the day warms.",
      ar: "\u0645\u0633\u0627\u0631 \u0647\u0627\u062f\u0626 \u0641\u064a \u0627\u0644\u0635\u0628\u0627\u062d \u0627\u0644\u0628\u0627\u0643\u0631 \u062f\u0627\u062e\u0644 \u0642\u0644\u0628 \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u060c \u0645\u0639 \u0648\u0642\u062a \u0643\u0627\u0641\u064d \u0644\u0644\u0645\u0634\u064a \u0648\u0627\u0644\u0627\u0633\u062a\u0645\u0627\u0639 \u0648\u0627\u0644\u062a\u0635\u0648\u064a\u0631 \u0642\u0628\u0644 \u0627\u0631\u062a\u0641\u0627\u0639 \u0627\u0644\u062d\u0631\u0627\u0631\u0629.",
    },
    durationHours: 4,
    groupSize: { en: "1\u20136 guests", ar: "\u0645\u0646 1 \u0625\u0644\u0649 6 \u0623\u0634\u062e\u0627\u0635" },
    startPoint: {
      en: "Central Madinah",
      ar: "\u0648\u0633\u0637 \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
    },
    pickup: {
      en: "From your hotel in Madinah",
      ar: "\u0645\u0646 \u0641\u0646\u062f\u0642\u0643 \u0641\u064a \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
    },
    languages: {
      en: "Arabic, English",
      ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629\u060c \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629",
    },
    highlights: {
      en: [
        "Historic districts at first light",
        "Stories of the city told by a local host",
        "Unhurried photography stops",
      ],
      ar: [
        "\u0627\u0644\u0623\u062d\u064a\u0627\u0621 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629 \u0645\u0639 \u0623\u0648\u0644 \u0627\u0644\u0636\u0648\u0621",
        "\u062d\u0643\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0645\u0646 \u0645\u0631\u0627\u0641\u0642 \u0645\u062d\u0644\u064a",
        "\u0645\u062d\u0637\u0627\u062a \u062a\u0635\u0648\u064a\u0631 \u062f\u0648\u0646 \u0627\u0633\u062a\u0639\u062c\u0627\u0644",
      ],
    },
    includes: {
      en: ["Local host", "Private car within the city", "Bottled water"],
      ar: [
        "\u0645\u0631\u0627\u0641\u0642 \u0645\u062d\u0644\u064a",
        "\u0633\u064a\u0627\u0631\u0629 \u062e\u0627\u0635\u0629 \u062f\u0627\u062e\u0644 \u0627\u0644\u0645\u062f\u064a\u0646\u0629",
        "\u0645\u064a\u0627\u0647 \u0645\u0639\u0628\u0623\u0629",
      ],
    },
    excludes: {
      en: ["Meals", "Personal purchases"],
      ar: [
        "\u0627\u0644\u0648\u062c\u0628\u0627\u062a",
        "\u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629",
      ],
    },
    priceFrom: 450,
    image: "/tours/heritage-morning.jpg",
    imageAlt: {
      en: "Narrow basalt-paved lane in old Madinah in soft morning light",
      ar: "\u0645\u0645\u0631 \u0636\u064a\u0642 \u0645\u0631\u0635\u0648\u0641 \u0628\u0627\u0644\u062d\u062c\u0631 \u0627\u0644\u0628\u0627\u0632\u0644\u062a\u064a \u0641\u064a \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0642\u062f\u064a\u0645\u0629 \u0641\u064a \u0636\u0648\u0621 \u0627\u0644\u0635\u0628\u0627\u062d",
    },
  },
  {
    slug: "palm-groves",
    theme: "nature",
    title: {
      en: "Palm Groves & Date Farms",
      ar: "\u0628\u0633\u0627\u062a\u064a\u0646 \u0627\u0644\u0646\u062e\u064a\u0644 \u0648\u0645\u0632\u0627\u0631\u0639 \u0627\u0644\u062a\u0645\u0648\u0631",
    },
    summary: {
      en: "Visit working date farms on the edge of the city, learn how Ajwa is grown and graded, and taste the difference between selections.",
      ar: "\u0632\u064a\u0627\u0631\u0629 \u0645\u0632\u0627\u0631\u0639 \u062a\u0645\u0648\u0631 \u0639\u0627\u0645\u0644\u0629 \u0639\u0644\u0649 \u0623\u0637\u0631\u0627\u0641 \u0627\u0644\u0645\u062f\u064a\u0646\u0629\u060c \u0648\u0627\u0644\u062a\u0639\u0631\u0641 \u0639\u0644\u0649 \u0632\u0631\u0627\u0639\u0629 \u0627\u0644\u0639\u062c\u0648\u0629 \u0648\u062a\u0635\u0646\u064a\u0641\u0647\u0627\u060c \u0645\u0639 \u062a\u0630\u0648\u0642 \u0627\u0644\u0641\u0631\u0648\u0642 \u0628\u064a\u0646 \u0627\u0644\u0623\u0635\u0646\u0627\u0641.",
    },
    durationHours: 3,
    groupSize: { en: "1\u20138 guests", ar: "\u0645\u0646 1 \u0625\u0644\u0649 8 \u0623\u0634\u062e\u0627\u0635" },
    startPoint: {
      en: "North-west Madinah",
      ar: "\u0634\u0645\u0627\u0644 \u063a\u0631\u0628 \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
    },
    pickup: {
      en: "From your hotel in Madinah",
      ar: "\u0645\u0646 \u0641\u0646\u062f\u0642\u0643 \u0641\u064a \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
    },
    languages: {
      en: "Arabic, English",
      ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629\u060c \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629",
    },
    highlights: {
      en: [
        "Walk among mature date palms",
        "Guided tasting of Ajwa selections",
        "Meet the growers and packers",
      ],
      ar: [
        "\u062a\u062c\u0648\u0644 \u0628\u064a\u0646 \u0623\u0634\u062c\u0627\u0631 \u0627\u0644\u0646\u062e\u064a\u0644 \u0627\u0644\u0645\u0639\u0645\u0631\u0629",
        "\u062a\u0630\u0648\u0642 \u0645\u0648\u062c\u0651\u0647 \u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0639\u062c\u0648\u0629",
        "\u0644\u0642\u0627\u0621 \u0627\u0644\u0645\u0632\u0627\u0631\u0639\u064a\u0646 \u0648\u0627\u0644\u0639\u0627\u0645\u0644\u064a\u0646 \u0641\u064a \u0627\u0644\u062a\u0639\u0628\u0626\u0629",
      ],
    },
    includes: {
      en: ["Local host", "Farm visit", "Date tasting"],
      ar: [
        "\u0645\u0631\u0627\u0641\u0642 \u0645\u062d\u0644\u064a",
        "\u0632\u064a\u0627\u0631\u0629 \u0627\u0644\u0645\u0632\u0631\u0639\u0629",
        "\u062a\u0630\u0648\u0642 \u0627\u0644\u062a\u0645\u0648\u0631",
      ],
    },
    excludes: {
      en: ["Date purchases", "Meals"],
      ar: [
        "\u0634\u0631\u0627\u0621 \u0627\u0644\u062a\u0645\u0648\u0631",
        "\u0627\u0644\u0648\u062c\u0628\u0627\u062a",
      ],
    },
    priceFrom: 380,
    image: "/tours/palm-groves.jpg",
    imageAlt: {
      en: "Rows of date palms heavy with fruit on a Madinah farm",
      ar: "\u0635\u0641\u0648\u0641 \u0645\u0646 \u0623\u0634\u062c\u0627\u0631 \u0627\u0644\u0646\u062e\u064a\u0644 \u0627\u0644\u0645\u062d\u0645\u0644\u0629 \u0628\u0627\u0644\u062a\u0645\u0631 \u0641\u064a \u0645\u0632\u0631\u0639\u0629 \u0628\u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
    },
  },
  {
    slug: "crafts-and-markets",
    theme: "culture",
    title: {
      en: "Crafts, Markets & Local Flavours",
      ar: "\u0627\u0644\u062d\u0631\u0641 \u0648\u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0648\u0627\u0644\u0645\u0623\u0643\u0648\u0644\u0627\u062a \u0627\u0644\u0645\u062d\u0644\u064a\u0629",
    },
    summary: {
      en: "An evening among market stalls, traditional crafts and local flavours, guided by someone who knows which corners are worth your time.",
      ar: "\u0645\u0633\u0627\u0621 \u0628\u064a\u0646 \u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0648\u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u062a\u0642\u0644\u064a\u062f\u064a\u0629 \u0648\u0627\u0644\u0645\u0623\u0643\u0648\u0644\u0627\u062a \u0627\u0644\u0645\u062d\u0644\u064a\u0629\u060c \u0628\u0631\u0641\u0642\u0629 \u0645\u0646 \u064a\u0639\u0631\u0641 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u062a\u064a \u062a\u0633\u062a\u062d\u0642 \u0648\u0642\u062a\u0643.",
    },
    durationHours: 3,
    groupSize: { en: "2\u201310 guests", ar: "\u0645\u0646 2 \u0625\u0644\u0649 10 \u0623\u0634\u062e\u0627\u0635" },
    startPoint: {
      en: "Central Madinah",
      ar: "\u0648\u0633\u0637 \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
    },
    pickup: {
      en: "Hotel pickup on request",
      ar: "\u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645 \u0645\u0646 \u0627\u0644\u0641\u0646\u062f\u0642 \u0639\u0646\u062f \u0627\u0644\u0637\u0644\u0628",
    },
    languages: {
      en: "Arabic, English",
      ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629\u060c \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629",
    },
    highlights: {
      en: [
        "Traditional crafts and workshops",
        "Local produce and spice stalls",
        "Gift ideas chosen with a local eye",
      ],
      ar: [
        "\u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u062a\u0642\u0644\u064a\u062f\u064a\u0629 \u0648\u0627\u0644\u0648\u0631\u0634",
        "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0645\u062d\u0644\u064a\u0629 \u0648\u0623\u0643\u0634\u0627\u0643 \u0627\u0644\u0628\u0647\u0627\u0631\u0627\u062a",
        "\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0647\u062f\u0627\u064a\u0627 \u0628\u0639\u064a\u0646 \u0645\u062d\u0644\u064a\u0629",
      ],
    },
    includes: {
      en: ["Local host", "Tasting stops"],
      ar: [
        "\u0645\u0631\u0627\u0641\u0642 \u0645\u062d\u0644\u064a",
        "\u0645\u062d\u0637\u0627\u062a \u062a\u0630\u0648\u0642",
      ],
    },
    excludes: {
      en: ["Transport between districts", "Personal purchases"],
      ar: [
        "\u0627\u0644\u062a\u0646\u0642\u0644 \u0628\u064a\u0646 \u0627\u0644\u0623\u062d\u064a\u0627\u0621",
        "\u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629",
      ],
    },
    priceFrom: 320,
    image: "/tours/crafts-and-markets.jpg",
    imageAlt: {
      en: "Market stall displaying dates, nuts and spices in the evening",
      ar: "\u0628\u0633\u0637\u0629 \u0641\u064a \u0627\u0644\u0633\u0648\u0642 \u062a\u0639\u0631\u0636 \u0627\u0644\u062a\u0645\u0648\u0631 \u0648\u0627\u0644\u0645\u0643\u0633\u0631\u0627\u062a \u0648\u0627\u0644\u0628\u0647\u0627\u0631\u0627\u062a \u0641\u064a \u0627\u0644\u0645\u0633\u0627\u0621",
    },
  },
  {
    slug: "family-day",
    theme: "family",
    title: {
      en: "Family Day at an Easy Pace",
      ar: "\u064a\u0648\u0645 \u0639\u0627\u0626\u0644\u064a \u0628\u0625\u064a\u0642\u0627\u0639 \u0645\u0631\u064a\u062d",
    },
    summary: {
      en: "A gentle full day designed around children and older guests, with short walks, shaded stops and flexible rest breaks.",
      ar: "\u064a\u0648\u0645 \u0643\u0627\u0645\u0644 \u0647\u0627\u062f\u0626 \u0645\u0635\u0645\u0645 \u0644\u0644\u0623\u0637\u0641\u0627\u0644 \u0648\u0643\u0628\u0627\u0631 \u0627\u0644\u0633\u0646\u060c \u0645\u0639 \u0645\u0633\u0627\u0641\u0627\u062a \u0645\u0634\u064a \u0642\u0635\u064a\u0631\u0629 \u0648\u0645\u062d\u0637\u0627\u062a \u0645\u0638\u0644\u0644\u0629 \u0648\u0641\u062a\u0631\u0627\u062a \u0631\u0627\u062d\u0629 \u0645\u0631\u0646\u0629.",
    },
    durationHours: 7,
    groupSize: { en: "3\u201312 guests", ar: "\u0645\u0646 3 \u0625\u0644\u0649 12 \u0634\u062e\u0635\u064b\u0627" },
    startPoint: {
      en: "Your hotel in Madinah",
      ar: "\u0641\u0646\u062f\u0642\u0643 \u0641\u064a \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
    },
    pickup: {
      en: "Included, with child seats on request",
      ar: "\u0645\u0634\u0645\u0648\u0644\u060c \u0648\u0645\u0642\u0627\u0639\u062f \u0623\u0637\u0641\u0627\u0644 \u0639\u0646\u062f \u0627\u0644\u0637\u0644\u0628",
    },
    languages: {
      en: "Arabic, English",
      ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629\u060c \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629",
    },
    highlights: {
      en: [
        "Short, shaded walking segments",
        "Stops chosen for children",
        "Flexible rest and prayer breaks",
      ],
      ar: [
        "\u0645\u0633\u0627\u0631\u0627\u062a \u0645\u0634\u064a \u0642\u0635\u064a\u0631\u0629 \u0648\u0645\u0638\u0644\u0644\u0629",
        "\u0645\u062d\u0637\u0627\u062a \u0645\u062e\u062a\u0627\u0631\u0629 \u0644\u0644\u0623\u0637\u0641\u0627\u0644",
        "\u0641\u062a\u0631\u0627\u062a \u0631\u0627\u062d\u0629 \u0648\u0635\u0644\u0627\u0629 \u0645\u0631\u0646\u0629",
      ],
    },
    includes: {
      en: ["Local host", "Private vehicle for the day", "Water and snacks"],
      ar: [
        "\u0645\u0631\u0627\u0641\u0642 \u0645\u062d\u0644\u064a",
        "\u0633\u064a\u0627\u0631\u0629 \u062e\u0627\u0635\u0629 \u0644\u0643\u0627\u0645\u0644 \u0627\u0644\u064a\u0648\u0645",
        "\u0645\u064a\u0627\u0647 \u0648\u0648\u062c\u0628\u0627\u062a \u062e\u0641\u064a\u0641\u0629",
      ],
    },
    excludes: {
      en: ["Lunch", "Entry fees where applicable"],
      ar: [
        "\u0627\u0644\u063a\u062f\u0627\u0621",
        "\u0631\u0633\u0648\u0645 \u0627\u0644\u062f\u062e\u0648\u0644 \u0625\u0646 \u0648\u062c\u062f\u062a",
      ],
    },
    priceFrom: 900,
    image: "/tours/family-day.jpg",
    imageAlt: {
      en: "Family walking along a shaded path lined with palm trees",
      ar: "\u0639\u0627\u0626\u0644\u0629 \u062a\u0633\u064a\u0631 \u0641\u064a \u0645\u0645\u0634\u0649 \u0645\u0638\u0644\u0644 \u062a\u062d\u064a\u0637 \u0628\u0647 \u0623\u0634\u062c\u0627\u0631 \u0627\u0644\u0646\u062e\u064a\u0644",
    },
  },
  {
    slug: "golden-hour-viewpoints",
    theme: "nature",
    title: {
      en: "Golden Hour Viewpoints",
      ar: "\u0645\u0637\u0644\u0627\u062a \u0627\u0644\u0633\u0627\u0639\u0629 \u0627\u0644\u0630\u0647\u0628\u064a\u0629",
    },
    summary: {
      en: "A short late-afternoon drive to volcanic viewpoints outside the city, timed for the light photographers travel for.",
      ar: "\u062c\u0648\u0644\u0629 \u0642\u0635\u064a\u0631\u0629 \u0628\u0639\u062f \u0627\u0644\u0639\u0635\u0631 \u0625\u0644\u0649 \u0645\u0637\u0644\u0627\u062a \u0628\u0631\u0643\u0627\u0646\u064a\u0629 \u062e\u0627\u0631\u062c \u0627\u0644\u0645\u062f\u064a\u0646\u0629\u060c \u0641\u064a \u062a\u0648\u0642\u064a\u062a \u0645\u062e\u062a\u0627\u0631 \u0644\u0644\u0625\u0636\u0627\u0621\u0629 \u0627\u0644\u062a\u064a \u064a\u0628\u062d\u062b \u0639\u0646\u0647\u0627 \u0627\u0644\u0645\u0635\u0648\u0631\u0648\u0646.",
    },
    durationHours: 3,
    groupSize: { en: "1\u20136 guests", ar: "\u0645\u0646 1 \u0625\u0644\u0649 6 \u0623\u0634\u062e\u0627\u0635" },
    startPoint: {
      en: "Madinah outskirts",
      ar: "\u0623\u0637\u0631\u0627\u0641 \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
    },
    pickup: {
      en: "From your hotel in Madinah",
      ar: "\u0645\u0646 \u0641\u0646\u062f\u0642\u0643 \u0641\u064a \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
    },
    languages: {
      en: "Arabic, English",
      ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629\u060c \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629",
    },
    highlights: {
      en: [
        "Volcanic landscapes and open horizons",
        "Photography stops at golden hour",
        "Quiet tea break at the viewpoint",
      ],
      ar: [
        "\u0645\u0634\u0627\u0647\u062f \u0628\u0631\u0643\u0627\u0646\u064a\u0629 \u0648\u0623\u0641\u0642 \u0645\u0641\u062a\u0648\u062d",
        "\u0645\u062d\u0637\u0627\u062a \u062a\u0635\u0648\u064a\u0631 \u0641\u064a \u0627\u0644\u0633\u0627\u0639\u0629 \u0627\u0644\u0630\u0647\u0628\u064a\u0629",
        "\u0627\u0633\u062a\u0631\u0627\u062d\u0629 \u0634\u0627\u064a \u0647\u0627\u062f\u0626\u0629 \u0639\u0646\u062f \u0627\u0644\u0645\u0637\u0644",
      ],
    },
    includes: {
      en: ["Local host", "Private car", "Tea and water"],
      ar: [
        "\u0645\u0631\u0627\u0641\u0642 \u0645\u062d\u0644\u064a",
        "\u0633\u064a\u0627\u0631\u0629 \u062e\u0627\u0635\u0629",
        "\u0634\u0627\u064a \u0648\u0645\u064a\u0627\u0647",
      ],
    },
    excludes: {
      en: ["Meals", "Photography equipment"],
      ar: [
        "\u0627\u0644\u0648\u062c\u0628\u0627\u062a",
        "\u0645\u0639\u062f\u0627\u062a \u0627\u0644\u062a\u0635\u0648\u064a\u0631",
      ],
    },
    priceFrom: 400,
    image: "/tours/golden-hour-viewpoints.jpg",
    imageAlt: {
      en: "Dark volcanic rock field near Madinah glowing at sunset",
      ar: "\u062d\u0642\u0644 \u0645\u0646 \u0627\u0644\u0635\u062e\u0648\u0631 \u0627\u0644\u0628\u0631\u0643\u0627\u0646\u064a\u0629 \u0642\u0631\u0628 \u0627\u0644\u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629 \u0639\u0646\u062f \u0627\u0644\u063a\u0631\u0648\u0628",
    },
  },
];

export const tourThemes: TourTheme[] = ["heritage", "nature", "culture", "family"];
