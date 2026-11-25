// Home — carries the complete About, How It Works, FAQ (8 items) and Contact
// sections on the page itself, as required by the information architecture.

import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  Compass,
  Languages,
  MapPin,
  MessageCircle,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import RevealText from "@/components/RevealText";
import { Ltr } from "@/components/site-chrome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { products } from "@/content/products";
import { tours } from "@/content/tours";
import { contact, mapEmbed, mapLink } from "@/lib/company";
import { DICTIONARIES, pagePath, useDict, useLang, type Lang } from "@/lib/i18n";
import { images, productImage, tourImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import {
  faqJsonLd,
  localBusinessJsonLd,
  seoLinks,
  seoMeta,
  seoScripts,
  webPageJsonLd,
} from "@/lib/seo";
import { generalRequestUrl, productsGeneralUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const lang = (params.lang === "ar" ? "ar" : "en") as Lang;
    const d = DICTIONARIES[lang];
    const faqItems = Object.values(d.home.faq.items).map((item) => ({
      q: item.q,
      a: item.a,
    }));

    return {
      meta: seoMeta({
        lang,
        title: d.home.meta.title,
        description: d.home.meta.description,
        path: pagePath(lang, "home"),
        imageAlt: d.home.hero.imageAlt,
      }),
      links: seoLinks("home", lang),
      scripts: seoScripts([
        webPageJsonLd({
          lang,
          key: "home",
          title: d.home.meta.title,
          description: d.home.meta.description,
        }),
        localBusinessJsonLd(lang),
        faqJsonLd(faqItems),
      ]),
    };
  },
  component: HomePage,
});

const MARK_ICONS = [MapPin, Languages, Clock, MessageCircle] as const;
const PILLAR_ICONS = [Sparkles, ShieldCheck, Compass] as const;
const WHY_ICONS = [MapPin, Languages, CalendarCheck, MessageCircle] as const;

function HomePage() {
  const d = useDict();
  const lang = useLang();
  const waHref = generalRequestUrl(lang);
  const featuredTours = tours.slice(0, 3);
  const marks = [
    d.home.marks.local,
    d.home.marks.bilingual,
    d.home.marks.flexible,
    d.home.marks.whatsapp,
  ];
  const pillars = [
    d.home.about.pillars.hospitality,
    d.home.about.pillars.clarity,
    d.home.about.pillars.coordination,
  ];
  const steps = [d.home.how.steps.one, d.home.how.steps.two, d.home.how.steps.three];
  const whyItems = [
    d.home.why.items.local,
    d.home.why.items.bilingual,
    d.home.why.items.flexible,
    d.home.why.items.direct,
  ];
  const testimonials = [
    d.home.testimonials.items.one,
    d.home.testimonials.items.two,
    d.home.testimonials.items.three,
  ];
  const faqEntries = Object.entries(d.home.faq.items);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden" data-on-dark="true">
        <img
          src={images.homeHero}
          alt={d.home.hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
          loading="eager"
          fetchPriority="high"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-basalt/55 via-basalt/35 to-primary-deep/65"
        />
        <div className="shell relative flex min-h-[86svh] flex-col justify-center py-24 text-white">
          <p className="eyebrow text-gold-soft">{d.home.hero.eyebrow}</p>
          <RevealText
            as="h1"
            text={d.home.hero.title}
            className="mt-5 max-w-3xl font-display text-4xl leading-[1.12] font-semibold sm:text-5xl lg:text-6xl"
          />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {d.home.hero.lead}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {d.home.hero.ctaPrimary}
            </a>
            <Link
              to={pagePath(lang, "plan")}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/35 backdrop-blur transition hover:bg-white/20"
            >
              {d.home.hero.ctaSecondary}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" data-flip-rtl="true" />
            </Link>
          </div>
          <p className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white/85 ring-1 ring-white/20">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {d.home.hero.badge}
          </p>
        </div>
      </section>

      {/* Trust marks */}
      <section className="border-b border-border bg-ivory">
        <div className="shell grid grid-cols-2 gap-x-4 gap-y-3 py-6 sm:gap-6 sm:py-8 lg:grid-cols-4">
          {marks.map((mark, index) => {
            const Icon = MARK_ICONS[index];
            const isLast = index === marks.length - 1;
            return (
              <div
                key={mark}
                className={cn(
                  "flex items-center gap-2.5 sm:gap-3",
                  // Odd item out sits on its own row on mobile instead of leaving a gap.
                  isLast && marks.length % 2 === 1 && "col-span-2 lg:col-span-1",
                )}
              >
                <span className="ring-soft inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-primary sm:h-9 sm:w-9">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-xs leading-snug font-medium text-foreground/80 sm:text-sm">
                  {mark}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">{d.home.about.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-primary-deep sm:text-4xl">
              {d.home.about.title}
            </h2>
            <span className="rule-gold mt-5 block" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {d.home.about.body}
            </p>
            <dl className="mt-9 grid gap-6 sm:grid-cols-3">
              {pillars.map((pillar, index) => {
                const Icon = PILLAR_ICONS[index];
                return (
                  <div key={pillar.title}>
                    <dt className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Icon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      {pillar.title}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {pillar.body}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
          <div className="ring-soft overflow-hidden rounded-3xl">
            <img
              src={images.homeAbout}
              alt={d.home.about.imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section wash-ivory">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold">{d.home.how.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-primary-deep sm:text-4xl">
              {d.home.how.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {d.home.how.lead}
            </p>
          </div>
          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="ring-soft rounded-2xl bg-white p-7 transition hover:-translate-y-0.5"
              >
                <span className="font-display text-3xl font-semibold text-gold">
                  <Ltr>{`0${index + 1}`}</Ltr>
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="ring-soft mt-8 rounded-2xl bg-white/70 px-5 py-4 text-sm leading-relaxed text-foreground/80">
            {d.home.how.notice}
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold">{d.home.why.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-primary-deep sm:text-4xl">
              {d.home.why.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {d.home.why.lead}
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyItems.map((item, index) => {
              const Icon = WHY_ICONS[index];
              return (
                <div key={item.title} className="ring-soft rounded-2xl bg-white p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/8 text-primary">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tours preview */}
      <section className="section wash-ivory">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold">{d.home.tours.eyebrow}</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-primary-deep sm:text-4xl">
                {d.home.tours.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {d.home.tours.lead}
              </p>
            </div>
            <Link
              to={pagePath(lang, "tours")}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary ring-1 ring-primary/25 transition hover:bg-primary/5"
            >
              {d.home.tours.cta}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" data-flip-rtl="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <article
                key={tour.slug}
                className="ring-soft group overflow-hidden rounded-2xl bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={tourImage(tour.slug)}
                    alt={tour.imageAlt[lang]}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="eyebrow text-gold">{d.tours.themes[tour.theme]}</p>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {tour.title[lang]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tour.summary[lang]}
                  </p>
                  <p className="mt-4 flex items-center gap-2 text-sm text-foreground/70">
                    <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <Ltr>{tour.durationHours}</Ltr> {d.tours.labels.hours}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Products teaser */}
      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <div className="ring-soft order-last overflow-hidden rounded-3xl lg:order-first">
            <img
              src={productImage(products[0].key)}
              alt={products[0].imageAlt[lang]}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow text-gold">{d.home.products.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-primary-deep sm:text-4xl">
              {d.home.products.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {d.home.products.lead}
            </p>
            <ul className="mt-7 space-y-3">
              {products.map((product) => (
                <li key={product.key} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-semibold text-foreground">{product.name[lang]}</span>
                    <span className="text-muted-foreground"> — {product.tagline[lang]}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={pagePath(lang, "products")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                {d.home.products.cta}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" data-flip-rtl="true" />
              </Link>
              <a
                href={productsGeneralUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-foreground/80 ring-1 ring-border transition hover:bg-muted"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                {d.common.askProducts}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section wash-ivory">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold">{d.home.testimonials.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-primary-deep sm:text-4xl">
              {d.home.testimonials.title}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="ring-soft rounded-2xl bg-white p-7">
                <Quote className="h-5 w-5 text-gold" aria-hidden="true" data-flip-rtl="true" />
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-foreground">{item.name}</span>
                  <span className="text-muted-foreground"> · {item.origin}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Custom experience CTA */}
      <section className="section">
        <div className="shell">
          <div className="relative isolate overflow-hidden rounded-3xl" data-on-dark="true">
            <img
              src={images.homeCustom}
              alt={d.home.hero.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-primary-deep/80 via-primary/62 to-primary/40"
            />
            <div className="relative px-7 py-14 text-white sm:px-12 lg:py-20">
              <p className="eyebrow text-gold-soft">{d.home.custom.eyebrow}</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
                {d.home.custom.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                {d.home.custom.lead}
              </p>
              <Link
                to={pagePath(lang, "plan")}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105"
              >
                {d.home.custom.cta}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" data-flip-rtl="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section wash-ivory">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-gold">{d.home.faq.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-primary-deep sm:text-4xl">
              {d.home.faq.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {d.home.faq.lead}
            </p>
            <Link
              to={pagePath(lang, "cancellation")}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              {d.home.faq.policyLink}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" data-flip-rtl="true" />
            </Link>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqEntries.map(([key, item]) => (
              <AccordionItem key={key} value={key} className="border-b border-border/70">
                <AccordionTrigger className="text-start text-base font-semibold text-foreground">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">{d.home.contact.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-primary-deep sm:text-4xl">
              {d.home.contact.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {d.home.contact.body}
            </p>
            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="font-semibold text-foreground">
                  {d.home.contact.whatsappLabel}
                </dt>
                <dd className="mt-1">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    <Ltr>{contact.whatsappDisplay}</Ltr>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">{d.home.contact.emailLabel}</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    <Ltr>{contact.email}</Ltr>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  {d.home.contact.locationLabel}
                </dt>
                <dd className="mt-1 text-muted-foreground">{d.home.contact.locationValue}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">{d.home.contact.socialLabel}</dt>
                <dd className="mt-1 flex gap-4">
                  {/* TEMPORARY: placeholder links until profiles are supplied. */}
                  <a href={contact.instagram} className="text-primary hover:underline">
                    {d.common.instagram}
                  </a>
                  <a href={contact.tiktok} className="text-primary hover:underline">
                    {d.common.tiktok}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                {d.home.contact.cta}
              </a>
              <Link
                to={pagePath(lang, "plan")}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-foreground/80 ring-1 ring-border transition hover:bg-muted"
              >
                {d.home.contact.formLink}
              </Link>
            </div>
          </div>
          <div className="ring-soft overflow-hidden rounded-3xl bg-ivory">
            <iframe
              src={mapEmbed}
              title={d.common.mapTitle}
              loading="lazy"
              className="h-80 w-full border-0 lg:h-full"
            />
            <div className="px-5 py-4">
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {d.common.openMap}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
