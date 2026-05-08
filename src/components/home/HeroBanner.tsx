import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CountySeal } from "~/components/shared/CountySeal";
import { MountainDivider } from "~/components/shared/MountainDivider";
import { WeatherBadge } from "~/components/shared/WeatherBadge";
import { COMMISSION_REGULAR_SESSION_RULE } from "~/data/meetings";
import { getTodayInHistory } from "~/data/today-in-history";
import { useOpenStatus } from "~/hooks/useOpenStatus";
import { formatNyDateShort, formatNyTime, nextOccurrence } from "~/lib/recurrence";

const COUNTY_OFFICE_HOURS = "Monday-Friday, 8am-4:30pm";
const PARALLAX_SPEED = 0.5;

function openSearch(query?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("sullivan:open-search", { detail: query ? { query } : undefined }),
  );
}

/**
 * HeroBanner — Phase 1 of the homepage redesign.
 *
 * Calm civic-newspaper masthead. One photo, one identity statement, one
 * search box, one quiet almanac line, one rotating today-in-history fact.
 *
 * What's intentionally NOT here (vs the prior iteration):
 *   - 5 task chips (citizens reach the same destinations via verb mega-nav)
 *   - 5 suggested-search pills (the search box does this work)
 *   - Identity stats (158k / 430 / 25) — moved to "Live in Sullivan" tile (Phase 2)
 *   - Loud almanac strip with multiple lines (now one line + a fact)
 *
 * What stays:
 *   - Boone Lake aerial photo (real local photography per blueprint S2.2.1)
 *   - Identity eyebrow ("Sullivan County, Tennessee · Established 1779")
 *   - Single H1 ("Where Tennessee Began and Begins")
 *   - Single center search box
 *   - Live weather pill (already-shipped <WeatherBadge>)
 *   - Open-Now + Next-Meeting consolidated into one quiet sentence
 *   - Mountain divider transition to cream
 *
 * Above-the-fold interactive count drops from 31 → ~7.
 */
export function HeroBanner() {
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const status = useOpenStatus(COUNTY_OFFICE_HOURS);
  const { t } = useTranslation();

  // Computed once so the date renders during SSR. Stable across server/client
  // because the meeting is always days+ in the future.
  const meetingDate = useMemo(() => nextOccurrence(COMMISSION_REGULAR_SESSION_RULE), []);
  // Also stable: today's date doesn't change during a single render pass.
  const todayFact = useMemo(() => getTodayInHistory(), []);

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
      className="relative min-h-[80vh] flex flex-col overflow-hidden bg-brand-navy"
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

      <div className="relative z-10 flex-1 flex items-center px-6 pt-24 pb-40 sm:px-8 sm:pb-48 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            {/* Identity eyebrow */}
            <div className="mb-5 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-flex items-center gap-2 font-body text-[11px] font-medium tracking-[0.2em] uppercase text-brand-brass-light">
                {t("home.heroEyebrow")}
                <span className="inline-block size-1 rounded-full bg-brand-brass-light/60" />
                {t("home.heroEyebrowEst")}
              </span>
            </div>

            {/* Single focused message — Caslon serif, civic restraint */}
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

            {/* Single search box — center search drives 2.1x the usage of top-left
                placement per blueprint S2.1.3. */}
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

            {/* Today-in-history line — newspaper voice, civic restraint.
                Renders only when we have a fact for today's date. */}
            {todayFact && (
              <p
                className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-white/75 italic opacity-0 animate-fade-up sm:text-base"
                style={{ animationDelay: "0.65s" }}
              >
                <span className="not-italic font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-brass-light mr-2">
                  {t("home.heroToday")}
                </span>
                {todayFact.text}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Almanac strip — single quiet line + weather pill. */}
      <div className="absolute bottom-[28px] sm:bottom-[40px] lg:bottom-[55px] left-0 right-0 z-30">
        <div
          className="mx-auto max-w-5xl px-4 sm:px-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.85s" }}
        >
          <div className="rounded-sm border border-white/10 bg-brand-navy/55 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-3.5">
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
              <WeatherBadge className="ml-0 lg:ml-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <MountainDivider fill="var(--color-brand-cream)" />
      </div>
    </section>
  );
}
