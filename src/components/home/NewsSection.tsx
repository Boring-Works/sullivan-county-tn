import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
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

export function NewsSection() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const { t } = useTranslation();
  const [latestNews, setLatestNews] = useState<NewsItem[]>(STATIC_FALLBACK);

  useEffect(() => {
    let cancelled = false;
    listPublicNews()
      .then((d1Items) => {
        if (!cancelled && d1Items.length > 0) {
          setLatestNews(mergeLatest(d1Items));
        }
      })
      .catch(() => {
        // D1 unavailable — static fallback already showing.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading — editorial with decorative line + "View All" link */}
        <div className="mb-14 flex items-end justify-between" data-reveal>
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
              {t("home.newsSection.heading")}
            </h2>
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

        {/* Grid — featured first item */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {latestNews.map((item, index) => (
            <div
              key={item.slug}
              className={index === 0 ? "lg:col-span-2" : ""}
              data-reveal
              data-reveal-delay={index * 80}
            >
              <NewsCard item={item} featured={index === 0} />
            </div>
          ))}
        </div>

        {/* Mobile "View All" link */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-copper transition-colors hover:text-brand-copper-light"
          >
            {t("home.newsSection.viewAllMobile")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
