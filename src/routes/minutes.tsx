import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MinutesFilter } from "~/components/minutes/MinutesFilter";
import { MinutesList } from "~/components/minutes/MinutesList";
import { meetingMinutes } from "~/data/meeting-minutes";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/minutes")({
	component: MinutesPage,
	head: () => ({
		meta: seo({
			title: "Meeting Minutes — Sullivan County, TN",
			description:
				"Archive of Sullivan County commission meetings, planning commission, and committee minutes with downloadable documents.",
			image: "/images/og/og-courthouse.jpg",
			url: "/minutes",
		}),
		links: seoLinks("/minutes"),
	}),
});

function MinutesPage() {
	const { t } = useTranslation();
	const [search, setSearch] = useState("");
	const [committeeFilter, setCommitteeFilter] = useState<string | null>(null);

	const filtered = useMemo(() => {
		let items = [...meetingMinutes];

		if (committeeFilter) {
			items = items.filter((m) => m.committee === committeeFilter);
		}

		if (search.trim()) {
			const q = search.toLowerCase();
			items = items.filter(
				(m) =>
					m.title.toLowerCase().includes(q) ||
					m.committee.toLowerCase().includes(q) ||
					(m.summary && m.summary.toLowerCase().includes(q)),
			);
		}

		return items.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);
	}, [search, committeeFilter]);

	return (
		<main id="main-content" className="pt-24 pb-14">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-4 h-px w-12 bg-brand-copper" />
				<h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
					{t("minutes.title")}
				</h1>
				<p className="font-body text-brand-slate-light mb-10 max-w-2xl leading-relaxed">
					{t("minutes.description")}
				</p>

				{/* Search + Filter */}
				<div className="space-y-4 mb-8">
					<div className="relative max-w-md">
						<svg
							className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-stone"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<title>Search</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder={t("minutes.searchPlaceholder")}
							className="w-full rounded-sm border border-brand-surface bg-white pl-10 pr-4 py-2.5 font-body text-sm text-brand-slate placeholder:text-brand-stone/50 focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none transition-colors"
						/>
					</div>
					<MinutesFilter selected={committeeFilter} onSelect={setCommitteeFilter} />
				</div>

				<div className="text-right mb-3">
					<span className="font-body text-xs text-brand-stone">
						{filtered.length} {filtered.length === 1 ? t("minutes.record") : t("minutes.records")}
					</span>
				</div>

				<MinutesList items={filtered} />
			</div>
		</main>
	);
}
