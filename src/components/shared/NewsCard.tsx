import { Link } from "@tanstack/react-router";
import { ExternalLink, FileDown } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import type { NewsItem } from "~/data/news";

interface NewsCardProps {
	item: NewsItem;
	featured?: boolean;
}

function formatDate(dateStr: string): string {
	const [year, month, day] = dateStr.split("-").map(Number);
	const date = new Date(year, month - 1, day);
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}

export function NewsCard({ item, featured = false }: NewsCardProps) {
	return (
		<div className="card-lift group relative flex h-full flex-col rounded-sm border border-brand-surface bg-white overflow-hidden">
			{/* Accent bar */}
			<div className="h-0.5 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />

			<div className={`flex-1 flex flex-col ${featured ? "p-8" : "p-6"}`}>
				{/* Date + Author */}
				<p className="font-body text-xs text-brand-stone mb-2.5 tracking-wide">
					{formatDate(item.date)} &middot; {item.author}
				</p>

				{/* Title — links to internal article page */}
				<h3 className={`font-display font-bold mb-3 ${featured ? "text-2xl" : "text-lg"}`}>
					<Link
						to="/news/$slug"
						params={{ slug: item.slug }}
						className="text-brand-navy hover:text-brand-copper transition-colors"
					>
						{item.title}
					</Link>
				</h3>

				{/* Summary */}
				<p
					className={`font-body leading-relaxed text-brand-slate-light flex-1 ${featured ? "text-base" : "text-sm"}`}
				>
					{item.summary}
				</p>

				{/* Actions row */}
				<div className="mt-4 flex items-center gap-3">
					{item.pdfUrl && (
						<Badge
							asChild
							variant="secondary"
							className="rounded-sm bg-brand-parchment text-brand-navy font-body"
						>
							<a href={item.pdfUrl} download>
								<FileDown className="size-3" />
								Download PDF
							</a>
						</Badge>
					)}
					{item.url && (
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 font-body text-xs text-brand-stone hover:text-brand-copper transition-colors"
						>
							<ExternalLink className="size-3" />
							Source
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
