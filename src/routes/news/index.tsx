import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { NewsCard } from "~/components/shared/NewsCard";
import { type NewsItem, news } from "~/data/news";
import { listPublicNews } from "~/server/public-news";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/news/")({
  loader: async () => {
    try {
      const d1News = await listPublicNews();
      return { d1News };
    } catch {
      return { d1News: [] as NewsItem[] };
    }
  },
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

function mergeAndSort(d1Items: NewsItem[]): NewsItem[] {
  const d1Slugs = new Set(d1Items.map((a) => a.slug));
  const staticItems = news.filter((a) => !d1Slugs.has(a.slug));
  return [...d1Items, ...staticItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function NewsPage() {
  const { t } = useTranslation();
  const { d1News } = Route.useLoaderData();
  const allNews = mergeAndSort(d1News);

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
          {allNews.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
