import { FileDown } from "lucide-react";
import { useState } from "react";
import type { MinutesItem } from "~/data/meeting-minutes";
import { cn } from "~/lib/utils";

interface MinutesListProps {
	items: MinutesItem[];
}

function groupByYear(items: MinutesItem[]): Record<number, MinutesItem[]> {
	const groups: Record<number, MinutesItem[]> = {};
	for (const item of items) {
		const year = Number.parseInt(item.date.slice(0, 4), 10);
		if (!groups[year]) groups[year] = [];
		groups[year].push(item);
	}
	return groups;
}

function formatDate(dateStr: string): string {
	const d = new Date(`${dateStr}T12:00:00`);
	return d.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

export function MinutesList({ items }: MinutesListProps) {
	const grouped = groupByYear(items);
	const years = Object.keys(grouped)
		.map(Number)
		.sort((a, b) => b - a);

	const [expanded, setExpanded] = useState<Set<number>>(
		new Set(years.slice(0, 2)),
	);

	function toggleYear(year: number) {
		setExpanded((prev) => {
			const next = new Set(prev);
			if (next.has(year)) {
				next.delete(year);
			} else {
				next.add(year);
			}
			return next;
		});
	}

	if (items.length === 0) {
		return (
			<p className="font-body text-brand-stone py-8 text-center">
				No meeting minutes found matching your search.
			</p>
		);
	}

	return (
		<div className="space-y-4">
			{years.map((year) => {
				const yearItems = grouped[year].sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
				);
				const isOpen = expanded.has(year);

				return (
					<div key={year} className="rounded-md border border-brand-surface bg-white">
						<button
							type="button"
							onClick={() => toggleYear(year)}
							className="flex w-full items-center justify-between px-5 py-4 text-left"
						>
							<span className="font-display text-lg font-bold text-brand-navy">
								{year}
								<span className="ml-2 font-body text-sm font-normal text-brand-stone">
									({yearItems.length} {yearItems.length === 1 ? "record" : "records"})
								</span>
							</span>
							<svg
								className={cn(
									"size-5 text-brand-stone transition-transform",
									isOpen && "rotate-180",
								)}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<title>Toggle</title>
								<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</button>

						{isOpen && (
							<div className="border-t border-brand-surface">
								{yearItems.map((item, i) => (
									<div
										key={`${item.date}-${item.title}`}
										className={cn(
											"flex items-start gap-4 px-5 py-4",
											i > 0 && "border-t border-brand-surface/50",
										)}
									>
										<div className="min-w-0 flex-1">
											<h3 className="font-body text-sm font-semibold text-brand-navy">
												{item.title}
											</h3>
											<div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
												<span className="font-body text-xs text-brand-stone">
													{formatDate(item.date)}
												</span>
												<span className="inline-flex items-center rounded-full bg-brand-surface px-2.5 py-0.5 font-body text-[11px] font-medium text-brand-slate">
													{item.committee}
												</span>
											</div>
											{item.summary && (
												<p className="mt-1.5 font-body text-xs text-brand-slate-light leading-relaxed">
													{item.summary}
												</p>
											)}
										</div>
										<a
											href={item.pdfUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex shrink-0 items-center gap-1.5 rounded-sm border border-brand-surface px-3 py-1.5 font-body text-xs font-medium text-brand-copper hover:bg-brand-copper/5 hover:border-brand-copper/30 transition-colors"
										>
											<FileDown className="size-3.5" />
											PDF
										</a>
									</div>
								))}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
