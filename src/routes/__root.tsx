import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { MessageCircle, RotateCcw } from "lucide-react";

import { I18nDocAttrs } from "@/components/site-chrome";
import { useDict, useLang } from "@/lib/i18n";
import en from "@/lib/i18n/en";
import {
  localBusinessJsonLd,
  organizationJsonLd,
  seoLinks,
  seoMeta,
  seoScripts,
} from "@/lib/seo";
import { generalRequestUrl } from "@/lib/whatsapp";
import appCss from "../styles.css?url";

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110";
const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-foreground/75 ring-1 ring-border transition hover:bg-muted hover:text-foreground";

function NotFoundComponent() {
  const d = useDict();
  const lang = useLang();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-display text-[5rem] font-semibold leading-none text-primary">
          {d.root.notFound.code}
        </p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">{d.root.notFound.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {d.root.notFound.lead}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <a href={`/${lang}`} className={btnPrimary}>
            {d.root.notFound.home}
          </a>
          <a
            href={generalRequestUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className={btnGhost}
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {d.common.whatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const d = useDict();
  const lang = useLang();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {d.root.error.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.root.error.lead}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={btnPrimary}
          >
            <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
            {d.root.error.retry}
          </button>
          <a href={`/${lang}`} className={btnGhost}>
            {d.root.error.home}
          </a>
          <a
            href={generalRequestUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className={btnGhost}
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {d.common.whatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#075440" },
      // Per-page routes override these with their own localized meta.
      ...seoMeta({
        lang: "en",
        title: en.home.meta.title,
        description: en.home.meta.description,
        path: "/en",
      }),
    ],
    links: [
      ...seoLinks("home", "en"),
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      // Inter carries every Latin text; Noto Kufi Arabic carries every Arabic
      // text, headings included. Two families, no mixing.
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: seoScripts([organizationJsonLd("en"), localBusinessJsonLd("en")]),
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/**
 * The document shell renders during SSR/prerender before the active locale is
 * known to the client, so it ships the English default and `I18nDocAttrs`
 * re-syncs `lang`/`dir` from the route on hydration.
 */
function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nDocAttrs />
      <Outlet />
    </QueryClientProvider>
  );
}
