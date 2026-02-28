import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ExternalLink, FileText, Search } from "lucide-react";
import { useState } from "react";
import { VideoEmbed } from "~/components/shared/VideoEmbed";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/documents")({
	component: DocumentsPage,
	head: () => ({
		meta: seo({
			title: "Document Library — Sullivan County, TN",
			description:
				"Access county documents, forms, agendas, court dockets, and public records from Sullivan County.",
			url: "/documents",
		}),
	}),
});

const DOCUMENT_LIBRARY_URL = "https://sullivancountytn.gov/document-library/";

interface DocumentItem {
	name: string;
	description: string;
	href: string;
	type: "PDF" | "DOCX" | "DOC";
	size?: string;
	category: string;
}

const documents: DocumentItem[] = [
	// ADA Documents
	{
		name: "Accommodation or Barrier Removal Request Form",
		description: "Request reasonable accommodations or barrier removal for county facilities and services",
		href: "/documents/ada-accommodation-request-form.docx",
		type: "DOCX",
		size: "52 KB",
		category: "ADA Documents",
	},
	{
		name: "Accommodation or Barrier Removal Request Form (Courts)",
		description: "Request modifications to access judicial programs for qualified persons with disabilities",
		href: "/documents/ada-accommodation-request-form-courts.pdf",
		type: "PDF",
		size: "12 KB",
		category: "ADA Documents",
	},
	{
		name: "Employee ADA Grievance Policy",
		description: "Policy and procedures for filing ADA-related grievances as a county employee",
		href: "/documents/ada-grievance-policy.docx",
		type: "DOCX",
		size: "61 KB",
		category: "ADA Documents",
	},
	{
		name: "ADA Notice for Courts",
		description: "Notice regarding ADA compliance in Sullivan County judicial programs",
		href: "/documents/ada-notice-courts.doc",
		type: "DOC",
		size: "29 KB",
		category: "ADA Documents",
	},
	// Employee Services
	{
		name: "Employment Application",
		description: "Official Sullivan County employment application for all open positions",
		href: "/documents/employment-application.pdf",
		type: "PDF",
		size: "162 KB",
		category: "Employee Services",
	},
	{
		name: "Open Enrollment Flyer",
		description: "Current open enrollment information and deadlines for county employees",
		href: "/documents/open-enrollment-flyer.pdf",
		type: "PDF",
		size: "104 KB",
		category: "Employee Services",
	},
	{
		name: "Health Plan Comparison (2025)",
		description: "Side-by-side comparison of available health plans for the 2025 plan year",
		href: "/documents/health-plan-comparison-2025.pdf",
		type: "PDF",
		size: "735 KB",
		category: "Employee Services",
	},
	{
		name: "Medical and Vision Rates (2025)",
		description: "Premium rates for medical and vision coverage in the 2025 plan year",
		href: "/documents/medical-vision-rates-2025.pdf",
		type: "PDF",
		size: "307 KB",
		category: "Employee Services",
	},
];

const externalCategories = [
	"Agendas",
	"County Commission",
	"Court Dockets",
	"Court Forms",
	"Emergency Management Documents",
	"Finance Documents",
	"Planning and Codes",
	"Property Assessor",
	"Public Documents",
	"Purchasing Documents",
	"Sanitation",
	"Sullivan County FMS 2020",
	"Veterans Service Officer",
];

const typeBadgeStyles: Record<DocumentItem["type"], string> = {
	PDF: "bg-red-50 text-red-700",
	DOCX: "bg-blue-50 text-blue-700",
	DOC: "bg-blue-50 text-blue-700",
};

function DocumentsPage() {
	const [filter, setFilter] = useState("");

	const categories = [...new Set(documents.map((d) => d.category))];
	const filtered = filter
		? documents.filter(
				(d) =>
					d.name.toLowerCase().includes(filter.toLowerCase()) ||
					d.description.toLowerCase().includes(filter.toLowerCase()) ||
					d.category.toLowerCase().includes(filter.toLowerCase()),
			)
		: documents;

	const filteredCategories = filter
		? categories.filter((cat) => filtered.some((d) => d.category === cat))
		: categories;

	return (
		<main className="pt-24 pb-14">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-4 h-px w-12 bg-brand-copper" />
				<h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
					Document Library
				</h1>
				<p className="font-body text-brand-slate-light mb-8 max-w-2xl leading-relaxed">
					Download forms, policies, and resources. All documents are available for immediate
					download.
				</p>

				{/* Search */}
				<div className="relative mb-10 max-w-md">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-stone" />
					<input
						type="text"
						placeholder="Filter documents..."
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="w-full rounded-sm border border-brand-surface bg-white py-2.5 pl-10 pr-4 font-body text-sm text-brand-slate placeholder:text-brand-warm-gray focus:outline-none focus:border-brand-copper/50 focus:ring-1 focus:ring-brand-copper/20"
					/>
				</div>

				{/* Direct Downloads by Category */}
				<div className="space-y-10 mb-16">
					{filteredCategories.map((category) => {
						const categoryDocs = filtered.filter((d) => d.category === category);
						return (
							<section key={category}>
								<div className="flex items-center gap-3 mb-4">
									<h2 className="font-display text-lg font-bold text-brand-navy">
										{category}
									</h2>
									<span className="rounded-full bg-brand-navy/5 px-2 py-0.5 font-body text-xs text-brand-slate-light">
										{categoryDocs.length}
									</span>
								</div>
								<div className="space-y-2">
									{categoryDocs.map((doc) => (
										<a
											key={doc.name}
											href={doc.href}
											download
											className="group flex items-start gap-4 rounded-sm border border-brand-surface bg-white p-4 transition-all hover:border-brand-copper/30 hover:shadow-sm"
										>
											<div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded bg-brand-parchment group-hover:bg-brand-copper/10 transition-colors">
												<Download className="size-4 text-brand-copper" />
											</div>
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-0.5">
													<span className="font-body text-sm font-semibold text-brand-slate group-hover:text-brand-navy transition-colors truncate">
														{doc.name}
													</span>
												</div>
												<p className="font-body text-xs text-brand-slate-light leading-relaxed line-clamp-1">
													{doc.description}
												</p>
											</div>
											<div className="flex items-center gap-2 shrink-0 mt-1">
												{doc.size && (
													<span className="font-body text-[10px] text-brand-warm-gray">
														{doc.size}
													</span>
												)}
												<span
													className={`rounded px-1.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wider ${typeBadgeStyles[doc.type]}`}
												>
													{doc.type}
												</span>
											</div>
										</a>
									))}
								</div>
							</section>
						);
					})}
				</div>

				{/* Training Videos */}
				<section className="mb-16">
					<div className="flex items-center gap-3 mb-4">
						<h2 className="font-display text-lg font-bold text-brand-navy">
							Training Videos
						</h2>
					</div>
					<div className="grid gap-4 sm:grid-cols-2 max-w-3xl">
						<VideoEmbed
							videoId="NIGQe15IZlo"
							title="Title VI Nondiscrimination Training"
							description="Required for all county employees"
						/>
					</div>
				</section>

				{/* Additional Categories — links to WordPress document library */}
				<div className="border-t border-brand-surface pt-10">
					<h2 className="font-display text-lg font-bold text-brand-navy mb-2">
						Additional Document Categories
					</h2>
					<p className="font-body text-sm text-brand-slate-light mb-6">
						These categories are available in the county document management system.
					</p>
					<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
						{externalCategories.map((category) => (
							<a
								key={category}
								href={DOCUMENT_LIBRARY_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-center gap-3 rounded-sm border border-brand-surface bg-white p-3.5 transition-colors hover:border-brand-copper/30"
							>
								<FileText className="size-4 shrink-0 text-brand-navy/40 group-hover:text-brand-copper transition-colors" />
								<span className="font-body text-sm text-brand-slate group-hover:text-brand-navy transition-colors flex-1">
									{category}
								</span>
								<ExternalLink className="size-3 shrink-0 text-brand-warm-gray opacity-0 transition-opacity group-hover:opacity-100" />
							</a>
						))}
					</div>
				</div>

				{/* Related Pages */}
				<div className="mt-12 rounded-sm border border-brand-surface bg-brand-parchment p-6">
					<h3 className="font-display text-base font-bold text-brand-navy mb-3">
						Related Pages
					</h3>
					<div className="flex flex-wrap gap-3">
						<Link
							to="/ada-compliance"
							className="rounded-sm bg-white border border-brand-surface px-4 py-2 font-body text-sm text-brand-slate hover:border-brand-copper/30 hover:text-brand-navy transition-colors"
						>
							ADA Compliance &amp; Forms
						</Link>
						<Link
							to="/employee-services"
							className="rounded-sm bg-white border border-brand-surface px-4 py-2 font-body text-sm text-brand-slate hover:border-brand-copper/30 hover:text-brand-navy transition-colors"
						>
							Employee Services
						</Link>
						<Link
							to="/contact"
							className="rounded-sm bg-white border border-brand-surface px-4 py-2 font-body text-sm text-brand-slate hover:border-brand-copper/30 hover:text-brand-navy transition-colors"
						>
							Contact Us
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
