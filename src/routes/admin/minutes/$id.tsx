import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "~/components/admin/AdminLayout";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { COMMITTEES } from "~/data/meeting-minutes";
import { listMinutes, updateMinutesEntry } from "~/server/admin-minutes";
import { validateAdmin } from "~/server/auth";

export const Route = createFileRoute("/admin/minutes/$id")({
  beforeLoad: async () => {
    const result = await validateAdmin();
    if (!result.valid) throw redirect({ to: "/admin/login" });
  },
  component: EditMinutesPage,
});

function EditMinutesPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [committee, setCommittee] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">("published");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const all = await listMinutes();
      const item = all.find((m) => m.id === id);
      if (item) {
        setCommittee(item.committee);
        setDate(item.date);
        setTitle(item.title);
        setSummary(item.summary ?? "");
        setPdfUrl(item.pdfUrl ?? "");
        setStatus(item.status as "draft" | "published" | "archived");
      }
    } catch {
      setError("Failed to load");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await updateMinutesEntry({
        data: {
          id,
          committee,
          date,
          title,
          summary: summary || undefined,
          pdfUrl: pdfUrl || undefined,
          status,
        },
      });
      navigate({ to: "/admin/minutes" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Edit Minutes">
        <p className="text-sm text-brand-warm-gray">Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Minutes">
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="committee" className="block text-sm font-medium text-brand-slate mb-1">
              Committee
            </label>
            <select
              id="committee"
              value={committee}
              onChange={(e) => setCommittee(e.target.value)}
              required
              className="w-full rounded-md border border-brand-surface px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
            >
              {COMMITTEES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-brand-slate mb-1">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-md border border-brand-surface px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-brand-slate mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-md border border-brand-surface px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-brand-slate mb-1">
            Summary
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="w-full rounded-md border border-brand-surface px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="pdfUrl" className="block text-sm font-medium text-brand-slate mb-1">
              PDF URL
            </label>
            <input
              id="pdfUrl"
              type="text"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="w-full rounded-md border border-brand-surface px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-brand-slate mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as "draft" | "published" | "archived")}
              className="w-full rounded-md border border-brand-surface px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        {error && (<Alert variant="destructive"><AlertCircle /><AlertDescription>{error}</AlertDescription></Alert>)}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-brand-navy px-6 py-2 text-sm font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/admin/minutes" })}
            className="rounded-md border border-brand-surface px-6 py-2 text-sm font-medium text-brand-slate hover:bg-brand-cream"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
