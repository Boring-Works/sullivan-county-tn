import { createFileRoute, Link } from "@tanstack/react-router";
import { NewsDetail } from "~/components/news/NewsDetail";
import { Button } from "~/components/ui/button";
import { getNewsBySlug } from "~/data/news";
import { getPublicNewsArticle } from "~/server/public-news";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    // Static articles take precedence (existing URLs remain stable).
    const staticArticle = getNewsBySlug(params.slug);
    if (staticArticle) return { article: staticArticle };

    // Fall through to D1 for admin-published articles.
    try {
      const d1Article = await getPublicNewsArticle({ data: { slug: params.slug } });
      return { article: d1Article ?? null };
    } catch {
      return { article: null };
    }
  },
  component: NewsArticlePage,
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    return {
      meta: article
        ? seo({
            title: `${article.title} — Sullivan County, TN`,
            description: article.summary,
            image: "/images/og/og-courthouse.jpg",
            url: `/news/${article.slug}`,
            type: "article",
            publishedTime: article.date,
          })
        : [],
      links: article ? seoLinks(`/news/${article.slug}`) : [],
    };
  },
});

function NewsArticlePage() {
  const { article } = Route.useLoaderData();

  if (!article) {
    return (
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-brand-navy">Article not found</h1>
        <p className="mt-2 text-brand-slate">
          The news article you're looking for doesn't exist or may have been moved.
        </p>
        <Button asChild variant="copper" className="mt-6">
          <Link to="/news">Back to News</Link>
        </Button>
      </main>
    );
  }

  return <NewsDetail article={article} />;
}
