import { createFileRoute, redirect } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "~/components/admin/AdminLayout";
import { validateAdmin } from "~/server/auth";
import { deletePageFeedback, listPageFeedback } from "~/server/page-feedback";

export const Route = createFileRoute("/admin/feedback")({
  beforeLoad: async () => {
    const result = await validateAdmin();
    if (!result.valid) throw redirect({ to: "/admin/login" });
  },
  component: FeedbackPage,
});

function FeedbackPage() {
  const [feedback, setFeedback] = useState<Awaited<ReturnType<typeof listPageFeedback>>>([]);
  const [filter, setFilter] = useState<"all" | "helpful" | "problem">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await listPageFeedback();
      setFeedback(data);
    } catch {
      setError("Could not load page feedback.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deletePageFeedback({ data: { id } });
      await load();
    } catch {
      setError("Could not delete that feedback item.");
    } finally {
      setDeletingId(null);
    }
  }

  const filteredFeedback = feedback.filter((item) => {
    if (filter === "helpful") return item.helpful;
    if (filter === "problem") return !item.helpful;
    return true;
  });
  const helpfulCount = feedback.filter((item) => item.helpful).length;
  const problemCount = feedback.length - helpfulCount;

  return (
    <AdminLayout title="Page Feedback">
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <SummaryCard label="Total" value={feedback.length} />
        <SummaryCard label="Helpful" value={helpfulCount} tone="good" />
        <SummaryCard label="Needs review" value={problemCount} tone="warning" />
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {[
          ["all", "All feedback"],
          ["helpful", "Helpful"],
          ["problem", "Needs review"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value as typeof filter)}
            className={`rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === value
                ? "bg-brand-navy text-white"
                : "border border-brand-surface bg-white text-brand-stone hover:text-brand-navy"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-brand-warm-gray">Loading...</p>
      ) : filteredFeedback.length === 0 ? (
        <p className="rounded-sm border border-brand-surface bg-white p-5 text-sm text-brand-warm-gray">
          No page feedback matches this filter.
        </p>
      ) : (
        <div className="space-y-3">
          {filteredFeedback.map((item) => (
            <article key={item.id} className="rounded-lg border border-brand-surface bg-white p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        item.helpful ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {item.helpful ? "Helpful" : "Needs review"}
                    </span>
                    {item.receiptId && (
                      <span className="rounded-full bg-brand-cream px-2.5 py-1 text-xs font-medium text-brand-stone">
                        {item.receiptId}
                      </span>
                    )}
                  </div>
                  <h2 className="break-words font-display text-base font-bold text-brand-navy">
                    {item.page}
                  </h2>
                  <p className="text-xs text-brand-warm-gray">
                    Submitted {new Date(item.createdAt).toLocaleString()}
                  </p>
                  {item.comment ? (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-brand-slate">
                      {item.comment}
                    </p>
                  ) : (
                    <p className="text-sm text-brand-warm-gray">No comment provided.</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="inline-flex items-center gap-2 rounded-sm border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  {deletingId === item.id ? "Deleting" : "Delete"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

function SummaryCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "neutral" | "good" | "warning";
}) {
  const toneClass = {
    neutral: "text-brand-navy",
    good: "text-green-700",
    warning: "text-yellow-700",
  }[tone];

  return (
    <div className="rounded-sm border border-brand-surface bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-warm-gray">{label}</p>
      <p className={`mt-1 font-display text-3xl font-bold ${toneClass}`}>{value}</p>
    </div>
  );
}
