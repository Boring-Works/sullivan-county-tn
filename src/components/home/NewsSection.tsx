import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "~/components/shared/NewsCard";
import { news } from "~/data/news";

export function NewsSection() {
  const latestNews = [...news]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-blue sm:text-4xl">
              County News
            </h2>
            <p className="mt-3 text-base text-brand-slate-light sm:text-lg">
              Stay informed about Sullivan County government updates and announcements
            </p>
          </div>
          <Link
            to="/news"
            className="hidden items-center gap-1.5 text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange-light sm:flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>

        {/* Mobile "View All" link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange-light"
          >
            View All News
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
