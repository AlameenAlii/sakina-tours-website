// Locale plumbing: locale-addressable routes, direction, dictionaries and hooks.
// Routes are /:lang/... so every page has a stable bilingual twin.

import { useRouterState } from "@tanstack/react-router";

import ar from "./i18n/ar";
import en, { type Translations } from "./i18n/en";

export const LANGS = ["en", "ar"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";
export const LANG_STORAGE_KEY = "sakina-tours-lang";

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
};

export const LANG_SHORT: Record<Lang, string> = {
  en: "EN",
  ar: "\u0639\u0631\u0628\u064a",
};

/** Used for the html lang attribute and hreflang. */
export const LANG_TAGS: Record<Lang, string> = { en: "en", ar: "ar-SA" };

export const OG_LOCALES: Record<Lang, string> = { en: "en_US", ar: "ar_SA" };

export const DICTIONARIES: Record<Lang, Translations> = { en, ar };

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

export function dirFor(lang: Lang): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr";
}

export function otherLang(lang: Lang): Lang {
  return lang === "ar" ? "en" : "ar";
}

/** The six pages of the site. Keys are stable; slugs are localizable. */
export const PAGE_KEYS = [
  "home",
  "tours",
  "products",
  "plan",
  "cancellation",
  "privacy",
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

/**
 * Slugs are intentionally identical across locales: the language switcher can
 * then map any URL to its twin by swapping the locale segment only, and future
 * localized slugs only need this one table changed.
 */
export const PAGE_SLUGS: Record<PageKey, string> = {
  home: "",
  tours: "tours-experiences",
  products: "our-products",
  plan: "plan-your-experience",
  cancellation: "cancellation-changes-refunds",
  privacy: "privacy-policy",
};

export function pagePath(lang: Lang, key: PageKey): string {
  const slug = PAGE_SLUGS[key];
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

export function pageKeyFromPath(pathname: string): PageKey {
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments.length > 1 ? segments.slice(1).join("/") : "";
  const match = PAGE_KEYS.find((key) => PAGE_SLUGS[key] === slug);
  return match ?? "home";
}

/** Same page, other language — used by the persistent language switcher. */
export function equivalentPath(pathname: string, target: Lang): string {
  return pagePath(target, pageKeyFromPath(pathname));
}

/** All locale variants of a page, for hreflang tags. */
export function alternatePaths(key: PageKey): Array<{ lang: Lang; path: string }> {
  return LANGS.map((lang) => ({ lang, path: pagePath(lang, key) }));
}

/** Stored choice first, then browser preference, then English. */
export function detectInitialLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    // localStorage can be unavailable in private modes; fall through.
  }
  const candidates = window.navigator.languages ?? [window.navigator.language];
  for (const candidate of candidates) {
    if (candidate?.toLowerCase().startsWith("ar")) return "ar";
    if (candidate?.toLowerCase().startsWith("en")) return "en";
  }
  return DEFAULT_LANG;
}

export function applyHtmlLangAttrs(lang: Lang): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("lang", LANG_TAGS[lang]);
  root.setAttribute("dir", dirFor(lang));
}

/** Persists the active language and syncs the document attributes. */
export function applyRouteLang(lang: Lang): void {
  applyHtmlLangAttrs(lang);
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Ignore storage failures — the URL remains the source of truth.
  }
}

export function usePathname(): string {
  return useRouterState({ select: (state) => state.location.pathname });
}

export function useLang(): Lang {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLang(segment) ? segment : DEFAULT_LANG;
}

export function useDict(): Translations {
  return DICTIONARIES[useLang()];
}

export function useIsRtl(): boolean {
  return useLang() === "ar";
}

/** Builds an in-site path for the active locale. */
export function useLocalizedPath(): (key: PageKey) => string {
  const lang = useLang();
  return (key: PageKey) => pagePath(lang, key);
}

export type { Translations };
