import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NewsCard } from "~/components/shared/NewsCard";
import { type NewsItem, news } from "~/data/news";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { listPublicNews } from "~/server/public-news";

const STATIC_FALLBACK = [...news]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

function mergeLatest(d1Items: NewsItem[]): NewsItem[] {
  const d1Slugs = new Set(d1Items.map((a) => a.slug));
  const staticItems = news.filter((a) => !d1Slugs.has(a.slug));
  return [...d1Items, ...staticItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
}

const NEWS_ACTIONS: Record<string, { label: string; to: string }> = {
  "memorial-day-2026-office-closures": {
    label: "Plan your office visit",
    to: "/contact",
  },
  "blountville-athletic-park-grand-opening-2026": {
    label: "Explore communities",
    to: "/communities/blountville",
  },
  "fy-2027-budget-hearing-may-21": {
    label: "See meeting schedule",
    to: "/calendar",
  },
  "burn-permit-season-ends-may-15-2026": {
    label: "Check weather alerts",
    to: "/weather",
  },
  "sr-126-memorial-boulevard-project-update-2026": {
    label: "Transportation updates",
    to: "/transportation",
  },
  "april-2026-commission-meeting-recap": {
    label: "Read meeting minutes",
    to: "/minutes",
  },
  "spring-severe-weather-preparedness-2026": {
    label: "Prepare for weather",
    to: "/weather",
  },
};

export interface NewsSectionProps {
  /** h2 by default; pass "h3" when nested under another section's h2. */
  headingLevel?: "h2" | "h3";
  /** "embedded" drops the outer <section bg-white py-20> for composition. */
  variant?: "standalone" | "embedded";
  maxItems?: 2 | 3;
  compact?: boolean;
  showHeader?: boolean;
}

export function NewsSection({
  headingLevel = "h2",
  variant = "standalone",
  maxItems = 3,
  compact = false,
  showHeader = true,
}: NewsSectionProps = {}) {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const { t } = useTranslation();
  const [latestNews, setLatestNews] = useState<NewsItem[]>(STATIC_FALLBACK);
  const Heading = headingLevel;
  const isEmbedded = variant === "embedded";

  useEffect(() => {
    let cancelled = false;
    listPublicNews()
      .then((d1Items) => {
        if (!cancelled && d1Items.length > 0) {
          setLatestNews(mergeLatest(d1Items).slice(0, maxItems));
        }
      })
      .catch(() => {
        // D1 unavailable — static fallback already showing.
      });
    return () => {
      cancelled = true;
    };
  }, [maxItems]);

  const Wrapper = isEmbedded
    ? ({ children }: { children: ReactNode }) => <div>{children}</div>
    : ({ children }: { children: ReactNode }) => (
        <section className="bg-white py-20 sm:py-24">{children}</section>
      );

  return (
    <Wrapper>
      <div
        ref={containerRef}
        className={isEmbedded ? "" : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}
      >
        {/* Heading — editorial with decorative line + "View All" link */}
        {showHeader && (
          <div
            className={
              isEmbedded
                ? "mb-8 flex items-end justify-between"
                : "mb-14 flex items-end justify-between"
            }
            data-reveal
          >
            <div>
              <Heading
                className={
                  isEmbedded
                    ? "font-display text-2xl font-bold text-brand-navy sm:text-3xl"
                    : "font-display text-3xl font-bold text-brand-navy sm:text-4xl"
                }
              >
                {t("home.newsSection.heading")}
              </Heading>
              <p className="mt-3 font-body text-base text-brand-slate-light leading-relaxed sm:text-lg">
                {t("home.newsSection.description")}
              </p>
            </div>
            <Link
              to="/news"
              className="hidden items-center gap-2 font-body text-sm font-semibold tracking-wide text-brand-copper transition-colors hover:text-brand-copper-light sm:flex"
            >
              {t("home.newsSection.viewAll")}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Grid — featured first item */}
        <div
          className={
            compact
              ? "grid grid-cols-1 gap-3 md:grid-cols-2"
              : "grid grid-cols-1 gap-6 lg:grid-cols-3"
          }
        >
          {latestNews.slice(0, maxItems).map((item, index) => (
            <div
              key={item.slug}
              className={!compact && index === 0 ? "lg:col-span-2" : ""}
              data-reveal
              data-reveal-delay={index * 80}
            >
              <NewsCard
                item={item}
                featured={!compact && index === 0}
                compact={compact}
                action={compact ? NEWS_ACTIONS[item.slug] : undefined}
              />
            </div>
          ))}
        </div>

        {/* Mobile "View All" link */}
        {showHeader && (
          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-copper transition-colors hover:text-brand-copper-light"
            >
              {t("home.newsSection.viewAllMobile")}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
