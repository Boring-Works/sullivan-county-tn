import { Link } from "@tanstack/react-router";
import {
  Calendar,
  DollarSign,
  ExternalLink,
  FileText,
  type LucideIcon,
  Map as MapIcon,
  Phone,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CountySeal } from "~/components/shared/CountySeal";
import { MountainDivider } from "~/components/shared/MountainDivider";
import { COMMISSION_REGULAR_SESSION_RULE } from "~/data/meetings";
import { useOpenStatus } from "~/hooks/useOpenStatus";
import { formatNyDateShort, formatNyTime, nextOccurrence } from "~/lib/recurrence";

const SUGGESTED_HERO_QUERIES = [
  "pay taxes",
  "marriage license",
  "trash pickup",
  "pothole",
  "voter registration",
] as const;

const COUNTY_OFFICE_HOURS = "Monday-Friday, 8am-4:30pm";

type ChipKey = "payTaxes" | "forms" | "propertyLookup" | "meetings" | "contact";

interface ExternalTask {
  kind: "external";
  labelKey: ChipKey;
  href: string;
  icon: LucideIcon;
}

interface InternalTask {
  kind: "internal";
  labelKey: ChipKey;
  to: "/forms" | "/calendar" | "/contact" | "/property-taxes";
  icon: LucideIcon;
}

type TopTask = ExternalTask | InternalTask;

const TOP_TASKS: TopTask[] = [
  {
    kind: "internal",
    labelKey: "payTaxes",
    to: "/property-taxes",
    icon: DollarSign,
  },
  { kind: "internal", labelKey: "forms", to: "/forms", icon: FileText },
  {
    kind: "external",
    labelKey: "propertyLookup",
    href: "https://gis.sullivancountytn.gov/",
    icon: MapIcon,
  },
  { kind: "internal", labelKey: "meetings", to: "/calendar", icon: Calendar },
  { kind: "internal", labelKey: "contact", to: "/contact", icon: Phone },
];

function StatItem({ value, label }: { value: string; label: string }) {
  // Static render — no count-up animation. The blueprint's civic-restraint rule
  // wins here; an animating "0+ Residents" was a real correctness bug during
  // hydration on slow clients and with prefers-reduced-motion.
  return (
    <div className="text-center sm:text-left">
      <div className="font-display text-base font-bold text-white sm:text-xl leading-none">
        {value}
      </div>
      <div className="font-body text-[9px] font-medium tracking-widest uppercase text-white/50 sm:text-[10px]">
        {label}
      </div>
    </div>
  );
}

const PARALLAX_SPEED = 0.5;

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
  // Computed once so the date renders during SSR. Stable across server/client
  // because the meeting is always days+ in the future.
  const [meetingDate] = useState<Date>(() => nextOccurrence(COMMISSION_REGULAR_SESSION_RULE));

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
      className="relative min-h-screen flex flex-col overflow-hidden bg-brand-navy"
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
          alt="Aerial view of Boone Lake in Sullivan County, Tennessee — forested islands surrounded by blue water with Appalachian mountains in the background"
          width={640}
          height={480}
          fetchPriority="high"
          decoding="sync"
          className="absolute -inset-x-[15%] -top-[15%] -bottom-[15%] w-[130%] h-[130%] max-w-none object-cover"
          style={{
            transform: "translate3d(0, calc(var(--scroll-y, 0px)), 0)",
            willChange: "transform",
          }}
        />
      </picture>

      {/* One cohesive treatment: diagonal masthead + soft inner-shadow vignette. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(12,30,51,0.94) 0%, rgba(12,30,51,0.72) 38%, rgba(12,30,51,0.32) 70%, rgba(12,30,51,0) 100%), linear-gradient(to top, rgba(12,30,51,0.55) 0%, rgba(12,30,51,0) 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 180px 40px rgba(8,22,36,0.55)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-topo-pattern opacity-30" />

      {/* Seal watermark — quiet, decorative, top-right corner of the hero. */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-24 right-12 z-10 opacity-[0.08] mix-blend-screen pointer-events-none"
      >
        <CountySeal size={180} className="invert" />
      </div>

      <div className="relative z-10 flex-1 flex items-center px-6 pt-24 pb-44 sm:px-8 sm:pb-52 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-5 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-flex items-center gap-2 font-body text-[11px] font-medium tracking-[0.2em] uppercase text-brand-brass-light">
                {t("home.heroEyebrow")}
                <span className="inline-block size-1 rounded-full bg-brand-brass-light/60" />
                {t("home.heroEyebrowEst")}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="font-display font-bold tracking-tight text-white leading-[1.02] opacity-0 animate-fade-up"
              style={{
                animationDelay: "0.2s",
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
              }}
            >
              {t("home.heroH1")}
            </h1>

            {/* Search trigger — opens the existing SiteNav-mounted SearchDialog. */}
            <div className="mt-7 opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <button
                type="button"
                onClick={() => openSearch()}
                className="group flex w-full items-center gap-3 rounded-sm border border-white/15 bg-white px-4 py-3.5 text-left shadow-lg shadow-brand-navy/30 transition-all hover:bg-white sm:px-5 sm:py-4 sm:max-w-xl"
                aria-label={t("home.heroSearchAria")}
              >
                <Search aria-hidden="true" className="size-4 shrink-0 text-brand-stone sm:size-5" />
                <span className="flex-1 font-body text-sm text-brand-stone sm:text-base">
                  {t("home.heroSearchPlaceholder")}
                </span>
                <kbd className="hidden sm:inline-flex items-center rounded border border-brand-surface bg-brand-parchment px-1.5 py-0.5 font-mono text-[10px] font-semibold text-brand-slate">
                  &#8984; K
                </kbd>
              </button>
            </div>

            {/* Top-task chips — citizens come hunting; these are the answers. */}
            <nav
              aria-label={t("home.topTasksLabel")}
              className="mt-5 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.65s" }}
            >
              <ul className="flex flex-wrap gap-2 sm:gap-2.5">
                {TOP_TASKS.map((task) => {
                  const Icon = task.icon;
                  const chipClass =
                    "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 font-body text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-brand-brass-light/70 hover:bg-white/15 hover:text-brand-brass-light min-h-[44px]";
                  const label = t(`home.heroChips.${task.labelKey}`);
                  if (task.kind === "external") {
                    return (
                      <li key={task.labelKey}>
                        <a
                          href={task.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${label} ${t("home.opensInNewTab")}`}
                          className={chipClass}
                        >
                          <Icon aria-hidden className="size-4" />
                          {label}
                          <ExternalLink aria-hidden className="size-3 opacity-60" />
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={task.labelKey}>
                      <Link to={task.to} className={chipClass}>
                        <Icon aria-hidden className="size-4" />
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Suggested searches — converts "I don't know what I'm looking for"
                into a one-tap completed task. Each chip prefills SearchDialog. */}
            <div
              className="mt-4 flex flex-wrap items-center gap-2 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.8s" }}
            >
              <span className="font-body text-[11px] font-medium tracking-widest uppercase text-white/50">
                {t("home.heroSuggestionsLabel")}
              </span>
              {SUGGESTED_HERO_QUERIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => openSearch(q)}
                  className="font-body text-xs text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-brand-brass-light"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Almanac strip — leads with the readable "open until / next meeting"
          line, falls back to identity stats below for visual reinforcement. */}
      <div className="absolute bottom-[40px] sm:bottom-[55px] lg:bottom-[70px] left-0 right-0 z-30">
        <div
          className="mx-auto max-w-5xl px-4 sm:px-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.95s" }}
        >
          <div className="rounded-sm border border-white/10 bg-brand-navy/55 backdrop-blur-md px-4 py-3.5 sm:px-6 sm:py-4">
            {/* Top: human-readable status line. */}
            <Link
              to="/calendar"
              className="group flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center lg:justify-start lg:text-left"
            >
              <span
                aria-hidden="true"
                className={`block size-2 rounded-full ${
                  status.isOpen === true
                    ? "bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                    : status.isOpen === false
                      ? "bg-white/50"
                      : "bg-white/30"
                }`}
              />
              <span
                suppressHydrationWarning
                className="font-display text-sm font-bold text-white sm:text-base"
              >
                {t("home.heroAlmanac.officesPrefix")} {status.label}.
              </span>
              <span
                suppressHydrationWarning
                className="font-body text-xs text-white/75 sm:text-sm group-hover:text-brand-brass-light"
              >
                {t("home.heroAlmanac.nextMeeting")}: {formatNyDateShort(meetingDate)}{" "}
                {t("home.heroAlmanac.at")} {formatNyTime(meetingDate)}.
              </span>
            </Link>

            {/* Bottom: identity stats — quieter, reinforcement only. */}
            <div className="mt-3 grid grid-cols-3 gap-3 border-t border-white/10 pt-3 sm:gap-6 items-center justify-items-center">
              <StatItem value="158,000+" label={t("home.heroAlmanac.residents")} />
              <StatItem value="430" label={t("home.heroAlmanac.squareMiles")} />
              <StatItem value="25" label={t("home.heroAlmanac.departments")} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <MountainDivider fill="var(--color-brand-cream)" />
      </div>
    </section>
  );
}
