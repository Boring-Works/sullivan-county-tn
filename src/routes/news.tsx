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
    <main className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-brand-blue mb-4">County News</h1>
        <p className="text-brand-slate-light mb-12 max-w-2xl">
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
