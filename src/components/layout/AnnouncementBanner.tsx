import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface Announcement {
	id: string;
	message: string;
	link?: { text: string; href: string };
	type: "info" | "urgent";
}

// Add announcements here when needed (tax deadlines, weather alerts, etc.)
// Example: { id: "tax-2026", message: "Property taxes due March 1.", link: { text: "Pay online", href: "https://sullivantntrustee.gov/" }, type: "urgent" }
const announcements: Announcement[] = [];

export function AnnouncementBanner() {
	const [dismissed, setDismissed] = useState<Set<string>>(() => {
		if (typeof window === "undefined") return new Set();
		const stored = localStorage.getItem("dismissed-announcements");
		return stored ? new Set(JSON.parse(stored)) : new Set();
	});

	const active = announcements.filter((a) => !dismissed.has(a.id));
	if (active.length === 0) return null;

	function dismiss(id: string) {
		setDismissed((prev) => {
			const next = new Set(prev).add(id);
			localStorage.setItem("dismissed-announcements", JSON.stringify([...next]));
			return next;
		});
	}

	return (
		<div className="fixed top-0 left-0 right-0 z-[60]">
			{active.map((a) => (
				<div
					key={a.id}
					className={`${
						a.type === "urgent"
							? "bg-brand-copper text-white"
							: "bg-brand-navy text-brand-cream"
					}`}
				>
					<div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
						<div className="flex items-center gap-2.5 font-body text-sm">
							{a.type === "urgent" && <AlertTriangle className="size-4 shrink-0" />}
							<span>{a.message}</span>
							{a.link && (
								<a
									href={a.link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="font-semibold underline underline-offset-2 hover:no-underline"
								>
									{a.link.text} &rarr;
								</a>
							)}
						</div>
						<button
							type="button"
							onClick={() => dismiss(a.id)}
							className="shrink-0 rounded p-1 hover:bg-white/20 transition-colors"
							aria-label="Dismiss announcement"
						>
							<X className="size-4" />
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
