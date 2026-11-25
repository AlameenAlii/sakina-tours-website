// Site chrome: header, language switcher, mobile drawer, fixed mobile
// WhatsApp bar, and footer. Every page composes these.

import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

import { brand, contact, legalLines, locationLine } from "@/lib/company";
import {
  LANG_SHORT,
  PAGE_KEYS,
  applyHtmlLangAttrs,
  applyRouteLang,
  equivalentPath,
  otherLang,
  pagePath,
  useDict,
  useLang,
  usePathname,
  type PageKey,
} from "@/lib/i18n";
import { generalRequestUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Keeps Latin/numeric runs (phone numbers, EN labels) correct inside RTL text. */
export function Ltr({ children }: { children: React.ReactNode }) {
  return <bdi dir="ltr">{children}</bdi>;
}

/** Syncs `lang`/`dir` on the client after hydration. */
export function I18nDocAttrs() {
  const lang = useLang();
  useEffect(() => {
    applyRouteLang(lang);
  }, [lang]);
  return null;
}

/**
 * The supplied brand mark already carries the bilingual wordmark, so no text is
 * ever set beside it. `white` is the ivory knock-out used on dark bands.
 */
export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "white";
  className?: string;
}) {
  const d = useDict();
  const src = variant === "white" ? "/brand/logo-white.png" : "/brand/logo-dark.png";
  return (
    <img
      src={src}
      alt={d.brand.logoAlt}
      width={377}
      height={104}
      className={cn("h-10 w-auto object-contain sm:h-11", className)}
    />
  );
}

const NAV_KEYS: PageKey[] = ["home", "tours", "products", "plan"];

function navLabel(d: ReturnType<typeof useDict>, key: PageKey): string {
  switch (key) {
    case "home":
      return d.nav.home;
    case "tours":
      return d.nav.tours;
    case "products":
      return d.nav.products;
    case "plan":
      return d.nav.plan;
    case "cancellation":
      return d.nav.cancellationShort;
    case "privacy":
      return d.nav.privacy;
  }
}

/**
 * Language switch stays on the equivalent page: /en/our-products swaps to
 * /ar/our-products rather than dropping the visitor on the home page.
 */
export function LangSwitcher({ className }: { className?: string }) {
  const d = useDict();
  const lang = useLang();
  const pathname = usePathname();
  const navigate = useNavigate();
  const target = otherLang(lang);

  return (
    <button
      type="button"
      onClick={() => {
        applyRouteLang(target);
        applyHtmlLangAttrs(target);
        void navigate({ to: equivalentPath(pathname, target) });
      }}
      aria-label={d.nav.switchLanguage}
      title={d.nav.switchLanguage}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ring-1 ring-border transition hover:bg-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="text-foreground/50">
        {LANG_SHORT[lang]}
      </span>
      <span aria-hidden="true" className="text-border">
        /
      </span>
      <span aria-hidden="true">{LANG_SHORT[target]}</span>
    </button>
  );
}

function WhatsAppButton({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  const lang = useLang();
  return (
    <a
      href={generalRequestUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110",
        className,
      )}
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {label}
    </a>
  );
}

export function SiteHeader() {
  const d = useDict();
  const lang = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        {d.common.skipToContent}
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-colors duration-300",
          scrolled
            ? "border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
            : "border-transparent bg-background",
        )}
      >
        <div className="shell flex h-[var(--header-height)] items-center justify-between gap-4">
          <Link
            to={pagePath(lang, "home")}
            className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <Logo />
            <span className="sr-only">{d.brand.name}</span>
          </Link>

          <nav aria-label={d.nav.menu} className="hidden items-center gap-1 lg:flex">
            {NAV_KEYS.map((key) => (
              <Link
                key={key}
                to={pagePath(lang, key)}
                activeOptions={{ exact: key === "home" }}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition hover:bg-muted hover:text-foreground data-[status=active]:text-primary"
              >
                {navLabel(d, key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitcher />
            <WhatsAppButton className="hidden md:inline-flex" label={d.common.whatsapp} />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? d.nav.closeMenu : d.nav.toggleMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-border transition hover:bg-muted lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-40 lg:hidden"
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label={d.nav.closeMenu}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-basalt/45 backdrop-blur-sm"
        />
        <div className="absolute inset-x-0 top-[var(--header-height)] mx-3 overflow-hidden rounded-2xl bg-background p-4 shadow-xl ring-1 ring-border">
          <nav aria-label={d.nav.menu} className="flex flex-col">
            {PAGE_KEYS.map((key) => (
              <Link
                key={key}
                to={pagePath(lang, key)}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground/85 transition hover:bg-muted data-[status=active]:text-primary"
              >
                {navLabel(d, key)}
              </Link>
            ))}
          </nav>
          <div className="mt-3 border-t border-border pt-3">
            <WhatsAppButton className="w-full" label={d.common.sendRequest} />
          </div>
        </div>
      </div>
    </>
  );
}

/** Fixed WhatsApp bar on small screens. Pages use `.pb-mobile-bar` to clear it. */
export function MobileWhatsAppBar() {
  const d = useDict();
  const lang = useLang();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
      <a
        href={generalRequestUrl(lang)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
      >
        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        {d.common.sendRequest}
      </a>
    </div>
  );
}

export function SiteFooter() {
  const d = useDict();
  const lang = useLang();
  const year = new Date().getFullYear();
  const legal = legalLines(lang, {
    legalNameLabel: d.footer.legalNameLabel,
    unifiedNumberLabel: d.footer.unifiedNumberLabel,
    crLabel: d.footer.crLabel,
    tourismLicenceLabel: d.footer.tourismLicenceLabel,
  });

  return (
    <footer className="wash-green lattice mt-20 text-primary-foreground">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="white" className="h-11 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/80">
              {d.footer.tagline}
            </p>
            <a
              href={generalRequestUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {d.footer.whatsappCta}
            </a>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-soft">
              {d.footer.pagesTitle}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    to={pagePath(lang, key)}
                    className="text-primary-foreground/80 transition hover:text-primary-foreground"
                  >
                    {navLabel(d, key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-soft">
              {d.footer.policiesTitle}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to={pagePath(lang, "cancellation")}
                  className="text-primary-foreground/80 transition hover:text-primary-foreground"
                >
                  {d.nav.cancellation}
                </Link>
              </li>
              <li>
                <Link
                  to={pagePath(lang, "privacy")}
                  className="text-primary-foreground/80 transition hover:text-primary-foreground"
                >
                  {d.nav.privacy}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-soft">
              {d.footer.contactTitle}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              <li>
                <a
                  href={generalRequestUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-primary-foreground"
                >
                  {d.common.whatsapp}: <Ltr>{contact.whatsappDisplay}</Ltr>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition hover:text-primary-foreground"
                >
                  <Ltr>{contact.email}</Ltr>
                </a>
              </li>
              <li>{locationLine(lang)}</li>
              <li className="flex gap-4 pt-1">
                {/* TEMPORARY: placeholder links until the client shares profiles. */}
                <a href={contact.instagram} className="transition hover:text-primary-foreground">
                  {d.common.instagram}
                </a>
                <a href={contact.tiktok} className="transition hover:text-primary-foreground">
                  {d.common.tiktok}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/15 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-soft">
            {d.footer.legalTitle}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-primary-foreground/75">
            {legal.map((line) => (
              <li key={line.label}>
                {line.label}: <Ltr>{line.value}</Ltr>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-primary-foreground/70">{d.footer.noBooking}</p>
          <p className="mt-2 text-sm text-primary-foreground/70">
            {d.footer.rights.replace("%YEAR%", String(year))}
          </p>
          <p className="sr-only">{brand.nameEn}</p>
        </div>
      </div>
    </footer>
  );
}
