import { createFileRoute } from "@tanstack/react-router";
import { NewsCard } from "~/components/shared/NewsCard";
import { news } from "~/data/news";

export const Route = createFileRoute("/news")({
  component: NewsPage,
});

const sortedNews = [...news].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

function NewsPage() {
  return (
    <main className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          County News
        </h1>
        <p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
          Stay up to date with the latest announcements, events, and public notices from Sullivan
          County government.
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
