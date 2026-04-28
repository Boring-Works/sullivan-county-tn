import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "~/components/admin/AdminLayout";
import { StatusBadge } from "~/components/admin/StatusBadge";
import { validateAdmin } from "~/server/auth";
import { deleteMinutesEntry, listMinutes } from "~/server/admin-minutes";

export const Route = createFileRoute("/admin/minutes/")({
	beforeLoad: async () => {
		const result = await validateAdmin();
		if (!result.valid) throw redirect({ to: "/admin/login" });
	},
	component: MinutesListPage,
});

function MinutesListPage() {
	const [minutes, setMinutes] = useState<Awaited<ReturnType<typeof listMinutes>>>([]);
	const [loading, setLoading] = useState(true);

	const load = useCallback(async () => {
		try {
			const data = await listMinutes();
			setMinutes(data);
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
		if (!confirm("Delete this entry?")) return;
		await deleteMinutesEntry({ data: { id } });
		load();
	}

	return (
		<AdminLayout title="Meeting Minutes">
			<div className="mb-4 flex items-center justify-between">
				<p className="text-sm text-gray-500">
					{minutes.length} {minutes.length === 1 ? "entry" : "entries"}
				</p>
				<Link
					to="/admin/minutes/new"
					className="flex items-center gap-1.5 rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy/90 transition-colors"
				>
					<Plus className="size-4" />
					New Entry
				</Link>
			</div>

			{loading ? (
				<p className="text-sm text-gray-500">Loading...</p>
			) : minutes.length === 0 ? (
				<div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
					<p className="text-sm text-gray-500">No minutes in the database.</p>
				</div>
			) : (
				<div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
					<table className="w-full text-sm">
						<thead className="border-b border-gray-200 bg-gray-50">
							<tr>
								<th className="px-4 py-3 text-left font-medium text-gray-500">Title</th>
								<th className="hidden sm:table-cell px-4 py-3 text-left font-medium text-gray-500">Committee</th>
								<th className="hidden sm:table-cell px-4 py-3 text-left font-medium text-gray-500">Date</th>
								<th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
								<th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{minutes.map((item) => (
								<tr key={item.id} className="hover:bg-gray-50">
									<td className="px-4 py-3">
										<Link
											to="/admin/minutes/$id"
											params={{ id: item.id }}
											className="font-medium text-gray-900 hover:text-brand-navy"
										>
											{item.title}
										</Link>
									</td>
									<td className="hidden sm:table-cell px-4 py-3 text-gray-500">{item.committee}</td>
									<td className="hidden sm:table-cell px-4 py-3 text-gray-500">{item.date}</td>
									<td className="px-4 py-3">
										<StatusBadge status={item.status} />
									</td>
									<td className="px-4 py-3 text-right">
										<button
											type="button"
											onClick={() => handleDelete(item.id)}
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
