import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Phone,
  Receipt,
  Search,
  Siren,
} from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MountainDivider } from "~/components/shared/MountainDivider";
import { WeatherBadge } from "~/components/shared/WeatherBadge";
import { COMMISSION_REGULAR_SESSION_RULE } from "~/data/meetings";
import { useOpenStatus } from "~/hooks/useOpenStatus";
import { formatNyDateShort, formatNyTime, nextOccurrence } from "~/lib/recurrence";

const COUNTY_OFFICE_HOURS = "Monday-Friday, 8am-4:30pm";
const PARALLAX_SPEED = 0.22;

const PRIMARY_TASKS = [
  {
    key: "taxes",
    icon: Receipt,
    to: "/property-taxes",
  },
  {
    key: "departments",
    icon: Building2,
    to: "/departments",
  },
  {
    key: "forms",
    icon: FileText,
    to: "/forms",
  },
  {
    key: "meetings",
    icon: CalendarDays,
    to: "/calendar",
  },
] as const;

const SECONDARY_LINKS = [
  { key: "contact", to: "/contact" },
  { key: "documents", to: "/documents" },
  { key: "commissioners", to: "/commissioners" },
] as const;

function openSearch(query?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("sullivan:open-search", { detail: query ? { query } : undefined }),
  );
}

export function HeroBanner() {
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const status = useOpenStatus(COUNTY_OFFICE_HOURS);
  const { t } = useTranslation();
  const meetingDate = useMemo(() => nextOccurrence(COMMISSION_REGULAR_SESSION_RULE), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleScroll() {
      if (!heroRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        heroRef.current?.style.setProperty("--scroll-y", `${window.scrollY * PARALLAX_SPEED}px`);
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[88vh] overflow-hidden bg-brand-navy"
    >
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet="/images/hero/boone-lake-1920.webp"
          type="image/webp"
          width={1920}
          height={1440}
        />
        <source
          media="(min-width: 640px)"
          srcSet="/images/hero/boone-lake-1024.webp"
          type="image/webp"
          width={1024}
          height={768}
        />
        <source
          srcSet="/images/hero/boone-lake-640.webp"
          type="image/webp"
          width={640}
          height={480}
        />
        <source
          media="(min-width: 1024px)"
          srcSet="/images/hero/boone-lake-1920.jpg"
          width={1920}
          height={1440}
        />
        <source
          media="(min-width: 640px)"
          srcSet="/images/hero/boone-lake-1024.jpg"
          width={1024}
          height={768}
        />
        <img
          src="/images/hero/boone-lake-640.jpg"
          alt="Aerial view of Boone Lake in Sullivan County, Tennessee, with forested islands and Appalachian mountains"
          width={640}
          height={480}
          fetchPriority="high"
          decoding="sync"
          className="absolute -inset-x-[12%] -top-[12%] -bottom-[12%] -z-20 h-[124%] w-[124%] max-w-none object-cover"
          style={{
            transform: "translate3d(0, calc(var(--scroll-y, 0px)), 0)",
            willChange: "transform",
          }}
        />
      </picture>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 78% 24%, rgba(201,168,76,0.22), transparent 28%), linear-gradient(115deg, rgba(7,20,35,0.96) 0%, rgba(12,30,51,0.9) 40%, rgba(12,30,51,0.48) 74%, rgba(12,30,51,0.28) 100%), linear-gradient(to top, rgba(7,20,35,0.8), rgba(7,20,35,0.08) 45%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-topo-pattern opacity-25" />

      <div className="mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 items-center gap-6 px-4 pb-28 pt-24 sm:gap-8 sm:px-6 sm:pt-32 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8 lg:pb-44">
        <div className="max-w-4xl">
          <div className="mb-5 opacity-0 animate-fade-up" style={{ animationDelay: "0.08s" }}>
            <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-brass-light backdrop-blur-md">
              <span>{t("home.heroEyebrow")}</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-brand-brass-light/70" />
              <span>{t("home.heroEyebrowEst")}</span>
            </span>
          </div>

          <h1
            id="hero-heading"
            className="max-w-3xl font-display font-bold leading-[0.98] tracking-tight text-white text-balance opacity-0 animate-fade-up"
            style={{ animationDelay: "0.18s", fontSize: "clamp(3.25rem, 7vw, 6.75rem)" }}
          >
            {t("home.heroH1")}
          </h1>
          <p
            className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/82 text-balance opacity-0 animate-fade-up sm:mt-5 sm:text-xl"
            style={{ animationDelay: "0.28s" }}
          >
            {t("home.heroIntro")}
          </p>

          <div
            className="mt-6 max-w-2xl opacity-0 animate-fade-up sm:mt-8"
            style={{ animationDelay: "0.38s" }}
          >
            <button
              type="button"
              onClick={() => openSearch()}
              className="group flex min-h-[58px] w-full items-center gap-3 rounded-sm border border-white/20 bg-white px-4 text-left shadow-2xl shadow-brand-navy-deep/25 transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-copper sm:px-5"
              aria-label={t("home.heroSearchAria")}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-brand-copper text-white">
                <Search aria-hidden="true" className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block font-body text-base font-semibold text-brand-navy">
                  {t("home.heroSearchPrompt")}
                </span>
                <span className="block font-body text-sm text-brand-stone">
                  {t("home.heroSearchPlaceholder")}
                </span>
              </span>
              <kbd className="hidden rounded border border-brand-surface bg-brand-parchment px-1.5 py-0.5 font-mono text-[10px] font-semibold text-brand-slate sm:inline-flex">
                &#8984; K
              </kbd>
            </button>
          </div>

          <div
            className="mt-5 grid max-w-4xl grid-cols-2 gap-2.5 opacity-0 animate-fade-up sm:mt-7 sm:gap-3 xl:grid-cols-4"
            style={{ animationDelay: "0.48s" }}
            role="group"
            aria-label={t("home.topTasksLabel")}
          >
            {PRIMARY_TASKS.map((task) => {
              const Icon = task.icon;
              return (
                <Link
                  key={task.key}
                  to={task.to}
                  className="group rounded-sm border border-white/14 bg-white/[0.13] p-3 text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-brand-brass-light/60 hover:bg-white/[0.18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-copper sm:p-4"
                >
                  <span className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
                    <span className="flex size-9 items-center justify-center rounded-sm bg-white text-brand-navy sm:size-10">
                      <Icon aria-hidden="true" className="size-4 sm:size-5" />
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 text-white/45 transition-transform group-hover:translate-x-1 group-hover:text-brand-brass-light"
                    />
                  </span>
                  <span className="block font-display text-base font-bold leading-tight sm:text-lg">
                    {t(`home.heroTasks.${task.key}.title`)}
                  </span>
                  <span className="mt-1.5 hidden font-body text-xs leading-relaxed text-white/72 sm:block">
                    {t(`home.heroTasks.${task.key}.body`)}
                  </span>
                </Link>
              );
            })}
          </div>

          <div
            className="mt-4 flex flex-wrap items-center gap-2 opacity-0 animate-fade-up sm:mt-5"
            style={{ animationDelay: "0.58s" }}
          >
            <span className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              {t("home.heroAlso")}
            </span>
            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.key}
                to={link.to}
                className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 font-body text-xs font-medium text-white/80 transition-colors hover:border-brand-brass-light/50 hover:text-brand-brass-light"
              >
                {t(`home.heroSecondary.${link.key}`)}
              </Link>
            ))}
          </div>
        </div>

        <aside
          aria-label={t("home.heroTodayPanel.label")}
          className="opacity-0 animate-fade-up lg:justify-self-end"
          style={{ animationDelay: "0.42s" }}
        >
          <div className="overflow-hidden rounded-sm border border-white/16 bg-brand-cream/95 shadow-2xl shadow-brand-navy-deep/30 backdrop-blur-xl">
            <div className="border-b border-brand-surface bg-white px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-brass">
                    {t("home.heroTodayPanel.eyebrow")}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-brand-navy">
                    {t("home.heroTodayPanel.heading")}
                  </h2>
                </div>
                <ClipboardCheck aria-hidden="true" className="size-8 text-brand-copper" />
              </div>
            </div>

            <div className="space-y-1 p-3">
              <StatusRow
                tone={
                  status.isOpen === true ? "open" : status.isOpen === false ? "closed" : "neutral"
                }
                label={t("home.heroTodayPanel.offices")}
                value={`${status.label}.`}
              />
              <Link
                to="/calendar"
                suppressHydrationWarning
                className="group flex items-start gap-3 rounded-sm px-3 py-3 transition-colors hover:bg-brand-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-copper"
              >
                <span className="mt-1 flex size-2.5 shrink-0 rounded-full bg-brand-copper" />
                <span className="min-w-0 flex-1">
                  <span className="block font-body text-xs font-semibold uppercase tracking-[0.14em] text-brand-stone">
                    {t("home.heroTodayPanel.meeting")}
                  </span>
                  <span className="mt-0.5 block font-display text-base font-bold leading-tight text-brand-navy">
                    {formatNyDateShort(meetingDate)} {t("home.heroAlmanac.at")}{" "}
                    {formatNyTime(meetingDate)}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-brand-warm-gray transition-transform group-hover:translate-x-1 group-hover:text-brand-copper"
                />
              </Link>
              <div className="rounded-sm bg-brand-navy px-3 py-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-white/58">
                    {t("home.heroTodayPanel.weather")}
                  </span>
                  <Link
                    to="/weather"
                    className="font-body text-xs font-semibold text-brand-brass-light hover:text-white"
                  >
                    {t("home.heroTodayPanel.forecast")}
                  </Link>
                </div>
                <WeatherBadge className="w-full justify-center border-white/15 bg-white/10" />
              </div>
            </div>

            <div className="border-t border-brand-surface bg-white px-5 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch">
                <div className="flex items-center gap-2 text-brand-safety">
                  <Siren aria-hidden="true" className="size-4" />
                  <span className="font-display text-sm font-bold">
                    {t("home.heroTodayPanel.emergency")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="tel:911"
                    className="inline-flex items-center gap-1.5 rounded-sm bg-brand-safety px-3 py-2 font-body text-xs font-bold text-white hover:bg-brand-safety/90"
                  >
                    <Phone aria-hidden="true" className="size-3.5" />
                    911
                  </a>
                  <Link
                    to="/departments/$slug"
                    params={{ slug: "emergency-management" }}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-brand-surface px-3 py-2 font-body text-xs font-semibold text-brand-slate hover:border-brand-copper hover:text-brand-copper"
                  >
                    {t("home.heroTodayPanel.preparedness")}
                    <ArrowRight aria-hidden="true" className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <MountainDivider fill="var(--color-brand-cream)" />
      </div>
    </section>
  );
}

function StatusRow({
  tone,
  label,
  value,
}: {
  tone: "open" | "closed" | "neutral";
  label: string;
  value: string;
}) {
  const color =
    tone === "open"
      ? "bg-brand-sage shadow-[0_0_8px_rgba(61,107,86,0.45)]"
      : tone === "closed"
        ? "bg-brand-brass"
        : "bg-brand-warm-gray/40";

  return (
    <div className="flex items-start gap-3 rounded-sm px-3 py-3">
      <span aria-hidden="true" className={`mt-1 flex size-2.5 shrink-0 rounded-full ${color}`} />
      <span suppressHydrationWarning>
        <span className="block font-body text-xs font-semibold uppercase tracking-[0.14em] text-brand-stone">
          {label}
        </span>
        <span className="mt-0.5 block font-display text-base font-bold leading-tight text-brand-navy">
          {value}
        </span>
      </span>
    </div>
  );
}
