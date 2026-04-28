import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { FileText, Inbox, Megaphone, Newspaper } from "lucide-react";
import { AdminLayout } from "~/components/admin/AdminLayout";
import { validateAdmin } from "~/server/auth";

export const Route = createFileRoute("/admin/")({
	beforeLoad: async () => {
		const result = await validateAdmin();
		if (!result.valid) {
			throw redirect({ to: "/admin/login" });
		}
	},
	component: AdminDashboard,
});

const QUICK_LINKS = [
	{
		label: "News Articles",
		href: "/admin/news",
		icon: Newspaper,
		description: "Create and manage county news",
		color: "bg-blue-50 text-blue-600",
	},
	{
		label: "Meeting Minutes",
		href: "/admin/minutes",
		icon: FileText,
		description: "Manage meeting records",
		color: "bg-purple-50 text-purple-600",
	},
	{
		label: "Announcements",
		href: "/admin/announcements",
		icon: Megaphone,
		description: "Manage site-wide banners",
		color: "bg-amber-50 text-amber-600",
	},
	{
		label: "Form Submissions",
		href: "/admin/submissions",
		icon: Inbox,
		description: "Review citizen submissions",
		color: "bg-green-50 text-green-600",
	},
];

function AdminDashboard() {
	return (
		<AdminLayout title="Dashboard">
			<div className="grid gap-4 sm:grid-cols-2">
				{QUICK_LINKS.map((item) => (
					<Link
						key={item.href}
						to={item.href}
						className="group flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
					>
						<div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
							<item.icon className="size-5" />
						</div>
						<div>
							<h2 className="text-sm font-semibold text-gray-900 group-hover:text-brand-navy">
								{item.label}
							</h2>
							<p className="mt-0.5 text-xs text-gray-500">{item.description}</p>
						</div>
					</Link>
				))}
			</div>
		</AdminLayout>
	);
}
