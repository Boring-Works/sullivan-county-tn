import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { NewsCard } from "~/components/shared/NewsCard";
import { news } from "~/data/news";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/news/")({
  component: NewsPage,
  head: () => ({
    meta: seo({
      title: "County News — Sullivan County, TN",
      description:
        "Latest announcements, events, and public notices from Sullivan County government.",
      image: "/images/og/og-courthouse.jpg",
      url: "/news",
    }),
    links: seoLinks("/news"),
  }),
});

const sortedNews = [...news].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

function NewsPage() {
  const { t } = useTranslation();
  return (
    <main id="main-content" className="pt-24 pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          {t("news.title")}
        </h1>
        <p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
          {t("news.description")}
        </p>
        <div className="flex flex-col gap-6 max-w-3xl">
          {sortedNews.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
