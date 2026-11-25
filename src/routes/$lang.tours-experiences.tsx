// Tours & Experiences — mock example experiences, filterable by theme.
// Every action is a WhatsApp enquiry: no booking, cart or checkout anywhere.

import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Clock,
  Languages,
  MapPin,
  MessageCircle,
  Minus,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Ltr } from "@/components/site-chrome";
import { tourThemes, tours, type TourTheme } from "@/content/tours";
import { DICTIONARIES, pagePath, useDict, useLang, type Lang } from "@/lib/i18n";
import { images, tourImage } from "@/lib/images";
import {
  breadcrumbJsonLd,
  seoLinks,
  seoMeta,
  seoScripts,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { generalRequestUrl, tourInquiryUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/$lang/tours-experiences")({
  head: ({ params }) => {
    const lang = (params.lang === "ar" ? "ar" : "en") as Lang;
    const d = DICTIONARIES[lang];

    return {
      meta: seoMeta({
        lang,
        title: d.tours.meta.title,
        description: d.tours.meta.description,
        path: pagePath(lang, "tours"),
        imageAlt: d.tours.hero.imageAlt,
      }),
      links: seoLinks("tours", lang),
      scripts: seoScripts([
        webPageJsonLd({
          lang,
          key: "tours",
          title: d.tours.meta.title,
          description: d.tours.meta.description,
        }),
        serviceJsonLd({
          lang,
          name: d.tours.hero.title,
          description: d.tours.meta.description,
        }),
        breadcrumbJsonLd(lang, [
          { name: d.nav.home, key: "home" },
          { name: d.nav.tours, key: "tours" },
        ]),
      ]),
    };
  },
  component: ToursPage,
});

function ToursPage() {
  const d = useDict();
  const lang = useLang();
  const [theme, setTheme] = useState<TourTheme | "all">("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visible = useMemo(
    () => (theme === "all" ? tours : tours.filter((tour) => tour.theme === theme)),
    [theme],
  );

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden" data-on-dark="true">
        <img
          src={images.toursHero}
          alt={d.tours.hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-basalt/50 to-primary-deep/65"
        />
        <div className="shell relative py-24 text-white lg:py-28">
          <p className="eyebrow text-gold-soft">{d.tours.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {d.tours.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">
            {d.tours.hero.lead}
          </p>
        </div>
      </section>

      {/* Theme filter */}
      <section className="border-b border-border bg-ivory">
        <div className="shell flex flex-wrap items-center gap-2 py-6">
          <span className="me-2 text-sm font-medium text-muted-foreground">
            {d.tours.filters.label}
          </span>
          <button
            type="button"
            onClick={() => setTheme("all")}
            aria-pressed={theme === "all"}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium ring-1 transition",
              theme === "all"
                ? "bg-primary text-primary-foreground ring-primary"
                : "bg-white text-foreground/75 ring-border hover:bg-muted",
            )}
          >
            {d.tours.filters.all}
          </button>
          {tourThemes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTheme(item)}
              aria-pressed={theme === item}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium ring-1 transition",
                theme === item
                  ? "bg-primary text-primary-foreground ring-primary"
                  : "bg-white text-foreground/75 ring-border hover:bg-muted",
              )}
            >
              {d.tours.themes[item]}
            </button>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="section">
        <div className="shell grid gap-8 lg:grid-cols-2">
          {visible.map((tour) => {
            const open = openSlug === tour.slug;
            return (
              <article
                key={tour.slug}
                className="ring-soft flex flex-col overflow-hidden rounded-3xl bg-white"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={tourImage(tour.slug)}
                    alt={tour.imageAlt[lang]}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <p className="eyebrow text-gold">{d.tours.themes[tour.theme]}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-primary-deep">
                    {tour.title[lang]}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {tour.summary[lang]}
                  </p>

                  <dl className="mt-6 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <dt className="sr-only">{d.tours.labels.duration}</dt>
                      <dd className="text-foreground/80">
                        <Ltr>{tour.durationHours}</Ltr> {d.tours.labels.hours}
                      </dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <dt className="sr-only">{d.tours.labels.groupSize}</dt>
                      <dd className="text-foreground/80">{tour.groupSize[lang]}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <dt className="sr-only">{d.tours.labels.startPoint}</dt>
                      <dd className="text-foreground/80">{tour.startPoint[lang]}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <dt className="sr-only">{d.tours.labels.languages}</dt>
                      <dd className="text-foreground/80">{tour.languages[lang]}</dd>
                    </div>
                  </dl>

                  {/* Details disclosure keeps cards scannable without hiding facts. */}
                  <div id={`details-${tour.slug}`} hidden={!open} className="mt-6 space-y-5">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {d.tours.labels.highlights}
                      </h3>
                      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                        {tour.highlights[lang].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {d.tours.labels.includes}
                        </h3>
                        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                          {tour.includes[lang].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                                aria-hidden="true"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {d.tours.labels.excludes}
                        </h3>
                        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                          {tour.excludes[lang].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Minus
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/35"
                                aria-hidden="true"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {d.tours.labels.pickup}:
                      </span>{" "}
                      {tour.pickup[lang]}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                    <p className="text-sm text-muted-foreground">
                      {d.tours.labels.priceFrom}{" "}
                      <span className="font-display text-xl font-semibold text-primary-deep">
                        <Ltr>{tour.priceFrom}</Ltr> {d.common.sar}
                      </span>{" "}
                      <span className="text-xs">{d.common.perPerson}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setOpenSlug(open ? null : tour.slug)}
                        aria-expanded={open}
                        aria-controls={`details-${tour.slug}`}
                        className="rounded-full px-4 py-2.5 text-sm font-semibold text-foreground/80 ring-1 ring-border transition hover:bg-muted"
                      >
                        {open ? d.tours.labels.detailsHide : d.tours.labels.details}
                      </button>
                      <a
                        href={tourInquiryUrl(tour.title[lang], lang)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {d.tours.labels.enquire}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="shell">
          <p className="ring-soft mt-10 rounded-2xl bg-ivory px-5 py-4 text-sm leading-relaxed text-foreground/80">
            {d.common.requestNotice}
          </p>
        </div>
      </section>

      {/* Custom request CTA */}
      <section className="section wash-green text-primary-foreground">
        <div className="shell flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              {d.tours.cta.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
              {d.tours.cta.lead}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={pagePath(lang, "plan")}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105"
            >
              {d.tours.cta.button}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" data-flip-rtl="true" />
            </Link>
            <a
              href={generalRequestUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {d.common.sendRequest}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
