// Plan Your Experience — the custom request form.
//
// The form never posts anywhere: on a valid submit it builds a URL-encoded
// WhatsApp message in the active language containing every entered detail and
// opens it. No booking, cart, checkout or payment.

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DICTIONARIES, pagePath, useDict, useLang, type Lang } from "@/lib/i18n";
import { images } from "@/lib/images";
import {
  breadcrumbJsonLd,
  seoLinks,
  seoMeta,
  seoScripts,
  webPageJsonLd,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import { requestUrl, type RequestValues } from "@/lib/whatsapp";

export const Route = createFileRoute("/$lang/plan-your-experience")({
  head: ({ params }) => {
    const lang = (params.lang === "ar" ? "ar" : "en") as Lang;
    const d = DICTIONARIES[lang];

    return {
      meta: seoMeta({
        lang,
        title: d.plan.meta.title,
        description: d.plan.meta.description,
        path: pagePath(lang, "plan"),
        imageAlt: d.plan.hero.title,
      }),
      links: seoLinks("plan", lang),
      scripts: seoScripts([
        webPageJsonLd({
          lang,
          key: "plan",
          title: d.plan.meta.title,
          description: d.plan.meta.description,
        }),
        breadcrumbJsonLd(lang, [
          { name: d.nav.home, key: "home" },
          { name: d.nav.plan, key: "plan" },
        ]),
      ]),
    };
  },
  component: PlanPage,
});

type Validation = (typeof DICTIONARIES)["en"]["plan"]["validation"];

const todayIso = () => new Date().toISOString().slice(0, 10);

/** Phone: digits, spaces and the usual separators, 8–18 digits once cleaned. */
const phonePattern = /^[+()\-\s\d]{8,24}$/;
const digitsOf = (value: string) => value.replace(/\D/g, "");

function buildSchema(v: Validation) {
  return z
    .object({
      name: z.string().trim().min(1, v.nameRequired).min(3, v.nameShort),
      phone: z
        .string()
        .trim()
        .min(1, v.phoneRequired)
        .refine(
          (value) => phonePattern.test(value) && digitsOf(value).length >= 8,
          v.phoneInvalid,
        ),
      email: z
        .string()
        .trim()
        .optional()
        .refine(
          (value) => !value || z.string().email().safeParse(value).success,
          v.emailInvalid,
        ),
      arrival: z
        .string()
        .min(1, v.arrivalRequired)
        .refine((value) => value >= todayIso(), v.arrivalPast),
      departure: z.string().min(1, v.departureRequired),
      adults: z.coerce
        .number({ invalid_type_error: v.adultsRequired })
        .int()
        .min(1, v.adultsMin)
        .max(40, v.adultsMax),
      children: z.coerce
        .number({ invalid_type_error: v.childrenInvalid })
        .int()
        .min(0, v.childrenInvalid)
        .max(40, v.adultsMax)
        .optional(),
      language: z.string().min(1, v.languageRequired),
      duration: z.string().min(1, v.durationRequired),
      interests: z.array(z.string()).min(1, v.interestsRequired),
      places: z.string().trim().optional(),
      pickup: z.string().trim().min(1, v.pickupRequired),
      transport: z.string().min(1, v.transportRequired),
      accessibility: z.string().trim().optional(),
      budget: z.string().trim().optional(),
      notes: z.string().trim().optional(),
      consent: z.literal(true, { errorMap: () => ({ message: v.consentRequired }) }),
    })
    .refine((values) => values.departure >= values.arrival, {
      path: ["departure"],
      message: v.departureOrder,
    });
}

type FormValues = z.input<ReturnType<typeof buildSchema>>;

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-gold/45";

function PlanPage() {
  const d = useDict();
  const lang = useLang();
  const schema = useMemo(() => buildSchema(d.plan.validation), [d]);
  const [sentHref, setSentHref] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      arrival: "",
      departure: "",
      adults: 2,
      children: 0,
      language: "",
      duration: "",
      interests: [],
      places: "",
      pickup: "",
      transport: "",
      accessibility: "",
      budget: "",
      notes: "",
    },
  });

  const languageOptions = Object.values(d.plan.form.languageOptions);
  const durationOptions = Object.values(d.plan.form.durationOptions);
  const interestOptions = Object.entries(d.plan.form.interestOptions);
  const transportOptions = Object.values(d.plan.form.transportOptions);

  const onSubmit = (values: FormValues) => {
    const href = requestUrl(values as RequestValues, lang);
    setSentHref(href);
    window.open(href, "_blank", "noopener,noreferrer");
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const errorFor = (message?: string, id?: string) =>
    message ? (
      <p id={id} className="mt-2 text-sm font-medium text-destructive">
        {message}
      </p>
    ) : null;

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden" data-on-dark="true">
        <img
          src={images.planHero}
          alt={d.plan.hero.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-basalt/50 to-primary-deep/65"
        />
        <div className="shell relative py-24 text-white lg:py-28">
          <p className="eyebrow text-gold-soft">{d.plan.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {d.plan.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">
            {d.plan.hero.lead}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Form */}
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* About you */}
            <fieldset className="ring-soft rounded-2xl bg-white p-6 sm:p-8">
              <legend className="px-2 font-display text-xl font-semibold text-primary-deep">
                {d.plan.form.sections.about}
              </legend>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.name} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder={d.plan.form.placeholders.name}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass}
                    {...register("name")}
                  />
                  {errorFor(errors.name?.message, "name-error")}
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.phone} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    dir="ltr"
                    autoComplete="tel"
                    placeholder={d.plan.form.placeholders.phone}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={cn("phone-hint", errors.phone && "phone-error")}
                    className={fieldClass}
                    {...register("phone")}
                  />
                  <p id="phone-hint" className="mt-2 text-xs text-muted-foreground">
                    {d.plan.form.hints.phone}
                  </p>
                  {errorFor(errors.phone?.message, "phone-error")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.email}{" "}
                    <span className="text-xs text-muted-foreground">({d.common.optional})</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    placeholder={d.plan.form.placeholders.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass}
                    {...register("email")}
                  />
                  {errorFor(errors.email?.message, "email-error")}
                </div>
              </div>
            </fieldset>

            {/* Your visit */}
            <fieldset className="ring-soft rounded-2xl bg-white p-6 sm:p-8">
              <legend className="px-2 font-display text-xl font-semibold text-primary-deep">
                {d.plan.form.sections.visit}
              </legend>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="arrival" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.arrival} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="arrival"
                    type="date"
                    min={todayIso()}
                    dir="ltr"
                    aria-invalid={Boolean(errors.arrival)}
                    aria-describedby={errors.arrival ? "arrival-error" : undefined}
                    className={fieldClass}
                    {...register("arrival")}
                  />
                  {errorFor(errors.arrival?.message, "arrival-error")}
                </div>
                <div>
                  <label htmlFor="departure" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.departure} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="departure"
                    type="date"
                    min={todayIso()}
                    dir="ltr"
                    aria-invalid={Boolean(errors.departure)}
                    aria-describedby={errors.departure ? "departure-error" : undefined}
                    className={fieldClass}
                    {...register("departure")}
                  />
                  {errorFor(errors.departure?.message, "departure-error")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="pickup" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.pickup} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="pickup"
                    type="text"
                    placeholder={d.plan.form.placeholders.pickup}
                    aria-invalid={Boolean(errors.pickup)}
                    aria-describedby={errors.pickup ? "pickup-error" : undefined}
                    className={fieldClass}
                    {...register("pickup")}
                  />
                  {errorFor(errors.pickup?.message, "pickup-error")}
                </div>
              </div>
            </fieldset>

            {/* Your group */}
            <fieldset className="ring-soft rounded-2xl bg-white p-6 sm:p-8">
              <legend className="px-2 font-display text-xl font-semibold text-primary-deep">
                {d.plan.form.sections.group}
              </legend>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="adults" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.adults} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="adults"
                    type="number"
                    min={1}
                    max={40}
                    step={1}
                    inputMode="numeric"
                    dir="ltr"
                    aria-invalid={Boolean(errors.adults)}
                    aria-describedby={errors.adults ? "adults-error" : undefined}
                    className={fieldClass}
                    {...register("adults")}
                  />
                  {errorFor(errors.adults?.message, "adults-error")}
                </div>
                <div>
                  <label htmlFor="children" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.children}
                  </label>
                  <input
                    id="children"
                    type="number"
                    min={0}
                    max={40}
                    step={1}
                    inputMode="numeric"
                    dir="ltr"
                    aria-invalid={Boolean(errors.children)}
                    aria-describedby={cn("children-hint", errors.children && "children-error")}
                    className={fieldClass}
                    {...register("children")}
                  />
                  <p id="children-hint" className="mt-2 text-xs text-muted-foreground">
                    {d.plan.form.hints.children}
                  </p>
                  {errorFor(errors.children?.message, "children-error")}
                </div>
              </div>
            </fieldset>

            {/* Preferences */}
            <fieldset className="ring-soft rounded-2xl bg-white p-6 sm:p-8">
              <legend className="px-2 font-display text-xl font-semibold text-primary-deep">
                {d.plan.form.sections.preferences}
              </legend>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="language" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.language} <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="language"
                    aria-invalid={Boolean(errors.language)}
                    aria-describedby={errors.language ? "language-error" : undefined}
                    className={fieldClass}
                    {...register("language")}
                  >
                    <option value="">{d.plan.form.placeholders.select}</option>
                    {languageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errorFor(errors.language?.message, "language-error")}
                </div>
                <div>
                  <label htmlFor="duration" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.duration} <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="duration"
                    aria-invalid={Boolean(errors.duration)}
                    aria-describedby={errors.duration ? "duration-error" : undefined}
                    className={fieldClass}
                    {...register("duration")}
                  >
                    <option value="">{d.plan.form.placeholders.select}</option>
                    {durationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errorFor(errors.duration?.message, "duration-error")}
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.interests} <span aria-hidden="true">*</span>
                  </legend>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {d.plan.form.hints.interests}
                  </p>
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {interestOptions.map(([key, label]) => (
                      <label
                        key={key}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-foreground/85 transition hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <input
                          type="checkbox"
                          value={label}
                          className="h-4 w-4 shrink-0 accent-[var(--primary)]"
                          {...register("interests")}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  {errorFor(errors.interests?.message, "interests-error")}
                </fieldset>

                <div className="sm:col-span-2">
                  <label htmlFor="places" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.places}{" "}
                    <span className="text-xs text-muted-foreground">({d.common.optional})</span>
                  </label>
                  <input
                    id="places"
                    type="text"
                    placeholder={d.plan.form.placeholders.places}
                    className={fieldClass}
                    {...register("places")}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="transport" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.transport} <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="transport"
                    aria-invalid={Boolean(errors.transport)}
                    aria-describedby={errors.transport ? "transport-error" : undefined}
                    className={fieldClass}
                    {...register("transport")}
                  >
                    <option value="">{d.plan.form.placeholders.select}</option>
                    {transportOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errorFor(errors.transport?.message, "transport-error")}
                </div>
              </div>
            </fieldset>

            {/* Anything else */}
            <fieldset className="ring-soft rounded-2xl bg-white p-6 sm:p-8">
              <legend className="px-2 font-display text-xl font-semibold text-primary-deep">
                {d.plan.form.sections.extra}
              </legend>
              <div className="mt-4 grid gap-6">
                <div>
                  <label htmlFor="accessibility" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.accessibility}{" "}
                    <span className="text-xs text-muted-foreground">({d.common.optional})</span>
                  </label>
                  <input
                    id="accessibility"
                    type="text"
                    placeholder={d.plan.form.placeholders.accessibility}
                    className={fieldClass}
                    {...register("accessibility")}
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.budget}{" "}
                    <span className="text-xs text-muted-foreground">({d.common.optional})</span>
                  </label>
                  <input
                    id="budget"
                    type="text"
                    placeholder={d.plan.form.placeholders.budget}
                    className={fieldClass}
                    {...register("budget")}
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="text-sm font-medium text-foreground">
                    {d.plan.form.labels.notes}{" "}
                    <span className="text-xs text-muted-foreground">({d.common.optional})</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    placeholder={d.plan.form.placeholders.notes}
                    className={cn(fieldClass, "resize-y")}
                    {...register("notes")}
                  />
                </div>
              </div>
            </fieldset>

            {/* Consent + submit */}
            <div className="ring-soft rounded-2xl bg-ivory p-6 sm:p-8">
              <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground/85">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  {...register("consent")}
                />
                <span>
                  {d.plan.form.labels.consent}{" "}
                  <Link
                    to={pagePath(lang, "privacy")}
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {d.nav.privacy}
                  </Link>
                </span>
              </label>
              {errorFor(errors.consent?.message, "consent-error")}

              {isSubmitted && hasErrors ? (
                <p role="alert" className="mt-5 text-sm font-semibold text-destructive">
                  {d.plan.form.errorSummary}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {d.plan.form.submit}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setSentHref(null);
                  }}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-foreground/70 ring-1 ring-border transition hover:bg-muted"
                >
                  {d.plan.form.reset}
                </button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{d.plan.form.submitHint}</p>

              <div
                ref={statusRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className={cn("mt-5", !sentHref && "sr-only")}
              >
                {sentHref ? (
                  <p className="flex flex-wrap items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-foreground/85">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {d.plan.form.opened}{" "}
                    <a
                      href={sentHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {d.plan.form.openManually}
                    </a>
                  </p>
                ) : null}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-foreground/75">
                {d.plan.form.notice}
              </p>
            </div>
          </form>

          {/* Aside */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="ring-soft rounded-2xl bg-white p-6">
              <h2 className="font-display text-xl font-semibold text-primary-deep">
                {d.plan.aside.title}
              </h2>
              <ol className="mt-4 space-y-4">
                {Object.values(d.plan.aside.steps).map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/8 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="ring-soft rounded-2xl bg-ivory p-6">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-primary-deep">
                <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-gold" aria-hidden="true" />
                {d.plan.aside.privacyTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {d.plan.aside.privacyBody}
              </p>
              <Link
                to={pagePath(lang, "privacy")}
                className="mt-4 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {d.plan.aside.privacyLink}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
