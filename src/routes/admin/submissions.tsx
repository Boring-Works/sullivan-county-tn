import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "~/components/admin/AdminLayout";
import { StatusBadge } from "~/components/admin/StatusBadge";
import { getFormDefinition } from "~/data/form-definitions";
import { listSubmissions, updateSubmissionStatus } from "~/server/admin-submissions";
import { validateAdmin } from "~/server/auth";

export const Route = createFileRoute("/admin/submissions")({
  beforeLoad: async () => {
    const result = await validateAdmin();
    if (!result.valid) throw redirect({ to: "/admin/login" });
  },
  component: SubmissionsPage,
});

function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Awaited<ReturnType<typeof listSubmissions>>>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await listSubmissions();
      setSubmissions(data);
    } catch {
      // D1 unavailable
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleStatusChange(id: string, status: "new" | "reviewed" | "resolved") {
    await updateSubmissionStatus({ data: { id, status } });
    load();
  }

  return (
    <AdminLayout title="Form Submissions">
      {loading ? (
        <p className="text-sm text-brand-warm-gray">Loading...</p>
      ) : submissions.length === 0 ? (
        <p className="text-sm text-brand-warm-gray">No submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => {
            const form = getFormDefinition(sub.formType);
            const isExpanded = expandedId === sub.id;
            let parsedData: Record<string, string> = {};
            try {
              parsedData = JSON.parse(sub.data);
            } catch {
              /* ignore */
            }

            return (
              <div key={sub.id} className="rounded-lg border border-brand-surface bg-white">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-brand-navy">
                        {form?.title ?? sub.formType}
                      </span>
                      <StatusBadge status={sub.status} />
                    </div>
                    <p className="mt-0.5 text-xs text-brand-warm-gray">
                      {sub.name} &middot; {new Date(sub.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <svg
                    className={`size-4 text-brand-warm-gray transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <title>Toggle</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="border-t border-brand-surface px-5 py-4 space-y-3">
                    <div className="grid gap-2 sm:grid-cols-2 text-sm">
                      <div>
                        <span className="text-brand-warm-gray">Name:</span>{" "}
                        <span className="text-brand-navy">{sub.name}</span>
                      </div>
                      <div>
                        <span className="text-brand-warm-gray">Email:</span>{" "}
                        <span className="text-brand-navy">{sub.email}</span>
                      </div>
                      {sub.phone && (
                        <div>
                          <span className="text-brand-warm-gray">Phone:</span>{" "}
                          <span className="text-brand-navy">{sub.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      {Object.entries(parsedData).map(([key, val]) => (
                        <div key={key} className="text-sm">
                          <span className="text-brand-warm-gray capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </span>{" "}
                          <span className="text-brand-navy">{val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      {sub.status !== "reviewed" && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(sub.id, "reviewed")}
                          className="rounded-md bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-700 hover:bg-yellow-100"
                        >
                          Mark Reviewed
                        </button>
                      )}
                      {sub.status !== "resolved" && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(sub.id, "resolved")}
                          className="rounded-md bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}
