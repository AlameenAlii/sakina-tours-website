// Privacy Policy — five sections, wording taken verbatim from the dictionary.

import { Link, createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

import { DICTIONARIES, pagePath, useDict, useLang, type Lang } from "@/lib/i18n";
import {
  breadcrumbJsonLd,
  seoLinks,
  seoMeta,
  seoScripts,
  webPageJsonLd,
} from "@/lib/seo";
import { generalRequestUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/$lang/privacy-policy")({
  head: ({ params }) => {
    const lang = (params.lang === "ar" ? "ar" : "en") as Lang;
    const d = DICTIONARIES[lang];

    return {
      meta: seoMeta({
        lang,
        title: d.privacy.meta.title,
        description: d.privacy.meta.description,
        path: pagePath(lang, "privacy"),
      }),
      links: seoLinks("privacy", lang),
      scripts: seoScripts([
        webPageJsonLd({
          lang,
          key: "privacy",
          title: d.privacy.meta.title,
          description: d.privacy.meta.description,
        }),
        breadcrumbJsonLd(lang, [
          { name: d.nav.home, key: "home" },
          { name: d.nav.privacy, key: "privacy" },
        ]),
      ]),
    };
  },
  component: PrivacyPage,
});

const SECTION_KEYS = ["collect", "use", "share", "whatsapp", "rights"] as const;

function PrivacyPage() {
  const d = useDict();
  const lang = useLang();

  return (
    <>
      <section className="wash-green pt-24 pb-20 text-primary-foreground lg:pt-28">
        <div className="shell">
          <p className="eyebrow text-gold-soft">{d.privacy.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {d.privacy.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/85">
            {d.privacy.hero.lead}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-10">
            {SECTION_KEYS.map((key) => (
              <div key={key}>
                <h2 className="font-display text-2xl font-semibold text-primary-deep">
                  {d.privacy.sections[key].title}
                </h2>
                <span className="rule-gold mt-4 block" aria-hidden="true" />
                <p className="mt-5 text-sm leading-relaxed text-foreground/85 sm:text-base">
                  {d.privacy.sections[key].body}
                </p>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="ring-soft rounded-2xl bg-ivory p-6">
              <h2 className="font-display text-xl font-semibold text-primary-deep">
                {d.privacy.aside.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {d.privacy.aside.body}
              </p>
              <a
                href={generalRequestUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                {d.privacy.aside.cta}
              </a>
              <Link
                to={pagePath(lang, "cancellation")}
                className="mt-5 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {d.nav.cancellationShort}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
