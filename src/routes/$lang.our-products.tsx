// Our Products — exactly two Ajwa selections. Enquiries only: each product
// opens WhatsApp with a product-specific prefilled message. No cart, no
// checkout, no payment.

import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Box, Check, MessageCircle, Package } from "lucide-react";

import { Ltr } from "@/components/site-chrome";
import { products } from "@/content/products";
import { DICTIONARIES, pagePath, useDict, useLang, type Lang } from "@/lib/i18n";
import { images, productImage } from "@/lib/images";
import {
  breadcrumbJsonLd,
  seoLinks,
  seoMeta,
  seoScripts,
  webPageJsonLd,
} from "@/lib/seo";
import { productInquiryUrl, productsGeneralUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/$lang/our-products")({
  head: ({ params }) => {
    const lang = (params.lang === "ar" ? "ar" : "en") as Lang;
    const d = DICTIONARIES[lang];

    return {
      meta: seoMeta({
        lang,
        title: d.products.meta.title,
        description: d.products.meta.description,
        path: pagePath(lang, "products"),
        imageAlt: products[0].imageAlt[lang],
      }),
      links: seoLinks("products", lang),
      scripts: seoScripts([
        webPageJsonLd({
          lang,
          key: "products",
          title: d.products.meta.title,
          description: d.products.meta.description,
        }),
        breadcrumbJsonLd(lang, [
          { name: d.nav.home, key: "home" },
          { name: d.nav.products, key: "products" },
        ]),
      ]),
    };
  },
  component: ProductsPage,
});

const ASSURANCE_ICONS = [BadgeCheck, Package, Box] as const;

function ProductsPage() {
  const d = useDict();
  const lang = useLang();
  const assurance = [
    d.products.assurance.items.one,
    d.products.assurance.items.two,
    d.products.assurance.items.three,
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden" data-on-dark="true">
        <img
          src={images.productsHero}
          alt={products[0].imageAlt[lang]}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-basalt/50 to-primary-deep/65"
        />
        <div className="shell relative py-24 text-white lg:py-28">
          <p className="eyebrow text-gold-soft">{d.products.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {d.products.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">
            {d.products.hero.lead}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="shell mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.key}
              className="ring-soft flex flex-col overflow-hidden rounded-3xl bg-white"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={productImage(product.key)}
                  alt={product.imageAlt[lang]}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow text-gold">{product.tagline[lang]}</p>
                <h2 className="mt-2.5 font-display text-xl font-semibold text-primary-deep">
                  {product.name[lang]}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {product.description[lang]}
                </p>

                <dl className="mt-5 space-y-2.5 text-sm">
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-foreground">{d.products.labels.weight}:</dt>
                    <dd className="text-muted-foreground">
                      <Ltr>{product.weight[lang]}</Ltr>
                    </dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-foreground">
                      {d.products.labels.packaging}:
                    </dt>
                    <dd className="text-muted-foreground">{product.packaging[lang]}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-foreground">
                      {d.products.labels.availability}:
                    </dt>
                    <dd className="text-muted-foreground">{product.availability[lang]}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-foreground">{d.products.labels.notes}:</dt>
                    <dd className="text-muted-foreground">{product.notes[lang]}</dd>
                  </div>
                </dl>

                <h3 className="mt-6 text-sm font-semibold text-foreground">
                  {d.products.labels.specs}
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {product.specs[lang].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">
                    {d.products.labels.price}{" "}
                    <span className="font-display text-xl font-semibold text-primary-deep">
                      <Ltr>{product.priceFrom}</Ltr> {d.common.sar}
                    </span>
                  </p>
                  <a
                    href={productInquiryUrl(product.key, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {d.products.labels.enquire}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Assurance */}
      <section className="section wash-ivory">
        <div className="shell">
          <h2 className="font-display text-2xl font-semibold text-primary-deep sm:text-3xl">
            {d.products.assurance.title}
          </h2>
          <ul className="mt-8 grid gap-6 lg:grid-cols-3">
            {assurance.map((item, index) => {
              const Icon = ASSURANCE_ICONS[index];
              return (
                <li key={item} className="ring-soft flex gap-4 rounded-2xl bg-white p-6">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/80">{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section wash-green text-primary-foreground">
        <div className="shell flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              {d.products.cta.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
              {d.products.cta.lead}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={productsGeneralUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {d.products.cta.button}
            </a>
            <Link
              to={pagePath(lang, "plan")}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/20"
            >
              {d.common.planExperience}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" data-flip-rtl="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
