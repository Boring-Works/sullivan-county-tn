import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "~/components/admin/AdminLayout";
import { StatusBadge } from "~/components/admin/StatusBadge";
import { deleteNewsArticle, listNews } from "~/server/admin-news";
import { validateAdmin } from "~/server/auth";

export const Route = createFileRoute("/admin/news/")({
  beforeLoad: async () => {
    const result = await validateAdmin();
    if (!result.valid) throw redirect({ to: "/admin/login" });
  },
  component: NewsListPage,
});

function NewsListPage() {
  const [articles, setArticles] = useState<Awaited<ReturnType<typeof listNews>>>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await listNews();
      setArticles(data);
    } catch {
      // D1 unavailable
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;
    await deleteNewsArticle({ data: { id } });
    load();
  }

  return (
    <AdminLayout title="News Articles">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-brand-warm-gray">
          {articles.length} {articles.length === 1 ? "article" : "articles"}
        </p>
        <Link
          to="/admin/news/new"
          className="flex items-center gap-1.5 rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy/90 transition-colors"
        >
          <Plus className="size-4" />
          New Article
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-brand-warm-gray">Loading...</p>
      ) : articles.length === 0 ? (
        <div className="rounded-lg border border-dashed border-brand-surface p-8 text-center">
          <p className="text-sm text-brand-warm-gray mb-3">No news articles in the database.</p>
          <p className="text-xs text-brand-warm-gray">
            Run the seed script to import from static data, or create articles manually.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-brand-surface bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-brand-surface bg-brand-cream">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-brand-warm-gray">Title</th>
                <th className="hidden sm:table-cell px-4 py-3 text-left font-medium text-brand-warm-gray">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-brand-warm-gray">Status</th>
                <th className="px-4 py-3 text-right font-medium text-brand-warm-gray">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-surface">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-brand-cream">
                  <td className="px-4 py-3">
                    <Link
                      to="/admin/news/$id"
                      params={{ id: article.id }}
                      className="font-medium text-brand-navy hover:text-brand-navy"
                    >
                      {article.title}
                    </Link>
                  </td>
                  <td className="hidden sm:table-cell px-4 py-3 text-brand-warm-gray">
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={article.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(article.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
