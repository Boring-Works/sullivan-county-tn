import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "~/components/admin/AdminLayout";
import {
  createAnnouncement,
  deleteAnnouncement,
  listAnnouncements,
  updateAnnouncement,
} from "~/server/admin-announcements";
import { validateAdmin } from "~/server/auth";

export const Route = createFileRoute("/admin/announcements")({
  beforeLoad: async () => {
    const result = await validateAdmin();
    if (!result.valid) throw redirect({ to: "/admin/login" });
  },
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const [items, setItems] = useState<Awaited<ReturnType<typeof listAnnouncements>>>([]);
  const [loading, setLoading] = useState(true);

  // New form state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [severity, setSeverity] = useState<"info" | "urgent">("info");
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await listAnnouncements();
      setItems(data);
    } catch {
      // D1 unavailable
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      await createAnnouncement({
        data: { title, body, linkUrl: linkUrl || undefined, severity },
      });
      setTitle("");
      setBody("");
      setLinkUrl("");
      setSeverity("info");
      load();
    } finally {
      setCreating(false);
    }
  }

  async function handleToggle(id: string, active: boolean) {
    await updateAnnouncement({ data: { id, active: !active } });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this announcement?")) return;
    await deleteAnnouncement({ data: { id } });
    load();
  }

  return (
    <AdminLayout title="Announcements">
      {/* Create form */}
      <form onSubmit={handleCreate} className="mb-8 rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">New Announcement</h2>
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            placeholder="Body text"
            rows={2}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
          />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Link URL (optional)"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
          />
          <fieldset className="flex items-center gap-4">
            <legend className="sr-only">Severity</legend>
            <span className="text-xs font-semibold text-gray-700">Severity:</span>
            <label className="inline-flex items-center gap-1.5 text-sm">
              <input
                type="radio"
                name="severity"
                value="info"
                checked={severity === "info"}
                onChange={() => setSeverity("info")}
              />
              Info (navy)
            </label>
            <label className="inline-flex items-center gap-1.5 text-sm">
              <input
                type="radio"
                name="severity"
                value="urgent"
                checked={severity === "urgent"}
                onChange={() => setSeverity("urgent")}
              />
              Urgent (copper)
            </label>
          </fieldset>
          <button
            type="submit"
            disabled={creating}
            className="rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>
      </form>

      {/* List */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">No announcements.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${item.active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}
                  >
                    {item.active ? "Active" : "Inactive"}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${item.severity === "urgent" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}
                  >
                    {item.severity === "urgent" ? "Urgent" : "Info"}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">{item.body}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle(item.id, item.active)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  {item.active ? "Deactivate" : "Activate"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
