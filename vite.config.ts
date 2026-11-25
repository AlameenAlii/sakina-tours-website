// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const siteUrl =
  process.env.VITE_SITE_URL?.replace(/\/+$/, "") || "https://example.com";

// Keep these in sync with PAGE_SLUGS in src/lib/i18n.ts.
const langs = ["en", "ar"] as const;
const slugs = [
  "",
  "tours-experiences",
  "our-products",
  "plan-your-experience",
  "cancellation-changes-refunds",
  "privacy-policy",
] as const;

// All twelve localized pages, plus the `/` locale resolver.
const localizedPaths = langs.flatMap((lang) =>
  slugs.map((slug) => (slug ? `/${lang}/${slug}` : `/${lang}`)),
);
const prerenderPaths = ["/", ...localizedPaths];

const priorityFor = (path: string) => {
  if (path === "/" || /^\/(en|ar)$/.test(path)) return 1;
  if (path.includes("privacy-policy") || path.includes("cancellation-changes-refunds"))
    return 0.4;
  return 0.8;
};

const pages = prerenderPaths.map((path) => ({
  path,
  sitemap: {
    changefreq: priorityFor(path) === 1 ? "weekly" : "monthly",
    priority: priorityFor(path),
  },
}));

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
    pages,
    prerender: {
      enabled: true,
      crawlLinks: true,
      concurrency: 4,
      failOnError: true,
    },
    spa: {
      enabled: false,
    },
    sitemap: {
      enabled: true,
      host: siteUrl,
    },
  },
  vite: {
    build: {
      copyPublicDir: true,
    },
  },
});
