import { cn } from "~/lib/utils";

const STATUS_COLORS: Record<string, string> = {
	new: "bg-blue-50 text-blue-700 border-blue-200",
	reviewed: "bg-yellow-50 text-yellow-700 border-yellow-200",
	resolved: "bg-green-50 text-green-700 border-green-200",
	draft: "bg-gray-50 text-gray-700 border-gray-200",
	published: "bg-green-50 text-green-700 border-green-200",
	archived: "bg-gray-50 text-gray-500 border-gray-200",
};

interface StatusBadgeProps {
	status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
				STATUS_COLORS[status] ?? "bg-gray-50 text-gray-700 border-gray-200",
			)}
		>
			{status}
		</span>
	);
}
