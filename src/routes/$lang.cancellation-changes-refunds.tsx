// Cancellation, Changes and Refunds — policy page.
// All eleven clauses are rendered in their original order, grouped for
// readability. Wording comes from the dictionary and must not be paraphrased.

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

export const Route = createFileRoute("/$lang/cancellation-changes-refunds")({
  head: ({ params }) => {
    const lang = (params.lang === "ar" ? "ar" : "en") as Lang;
    const d = DICTIONARIES[lang];

    return {
      meta: seoMeta({
        lang,
        title: d.cancellation.meta.title,
        description: d.cancellation.meta.description,
        path: pagePath(lang, "cancellation"),
      }),
      links: seoLinks("cancellation", lang),
      scripts: seoScripts([
        webPageJsonLd({
          lang,
          key: "cancellation",
          title: d.cancellation.meta.title,
          description: d.cancellation.meta.description,
        }),
        breadcrumbJsonLd(lang, [
          { name: d.nav.home, key: "home" },
          { name: d.nav.cancellation, key: "cancellation" },
        ]),
      ]),
    };
  },
  component: CancellationPage,
});

/** Clause order is fixed; grouping is presentational only. */
const GROUPS = [
  { group: "requests", terms: ["one", "two"] },
  { group: "cancelling", terms: ["three", "four", "five", "six"] },
  { group: "thirdParty", terms: ["seven", "eight", "nine"] },
  { group: "refunds", terms: ["ten", "eleven"] },
] as const;

function CancellationPage() {
  const d = useDict();
  const lang = useLang();
  let clauseNumber = 0;

  return (
    <>
      <section className="wash-green pt-24 pb-20 text-primary-foreground lg:pt-28">
        <div className="shell">
          <p className="eyebrow text-gold-soft">{d.cancellation.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {d.cancellation.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/85">
            {d.cancellation.hero.intro}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-12">
            {GROUPS.map(({ group, terms }) => (
              <div key={group}>
                <h2 className="font-display text-2xl font-semibold text-primary-deep">
                  {d.cancellation.groups[group]}
                </h2>
                <span className="rule-gold mt-4 block" aria-hidden="true" />
                <ol className="mt-6 space-y-5">
                  {terms.map((term) => {
                    clauseNumber += 1;
                    const value = clauseNumber;
                    return (
                      <li key={term} className="flex gap-4">
                        <span
                          className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/8 text-xs font-semibold text-primary"
                          dir="ltr"
                        >
                          {value}
                        </span>
                        <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                          {d.cancellation.terms[term]}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="ring-soft rounded-2xl bg-ivory p-6">
              <h2 className="font-display text-xl font-semibold text-primary-deep">
                {d.cancellation.aside.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {d.cancellation.aside.body}
              </p>
              <a
                href={generalRequestUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                {d.cancellation.aside.cta}
              </a>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                {d.cancellation.aside.note}
              </p>
              <Link
                to={pagePath(lang, "privacy")}
                className="mt-5 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {d.nav.privacy}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
