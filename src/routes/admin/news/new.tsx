import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "~/components/admin/AdminLayout";
import { validateAdmin } from "~/server/auth";
import { createNewsArticle } from "~/server/admin-news";

export const Route = createFileRoute("/admin/news/new")({
	beforeLoad: async () => {
		const result = await validateAdmin();
		if (!result.valid) throw redirect({ to: "/admin/login" });
	},
	component: NewArticlePage,
});

function NewArticlePage() {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("Sullivan County");
	const [summary, setSummary] = useState("");
	const [content, setContent] = useState("");
	const [status, setStatus] = useState("draft");
	const [url, setUrl] = useState("");
	const [pdfUrl, setPdfUrl] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function generateSlug(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "")
			.slice(0, 80);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitting(true);
		setError(null);

		try {
			// Content is stored as JSON array of paragraphs
			const paragraphs = content
				.split("\n\n")
				.map((p) => p.trim())
				.filter(Boolean);

			await createNewsArticle({
				data: {
					title,
					slug: generateSlug(title),
					author,
					summary,
					content: JSON.stringify(paragraphs),
					status,
					url: url || undefined,
					pdfUrl: pdfUrl || undefined,
					publishedAt: status === "published" ? new Date().toISOString() : undefined,
				},
			});

			navigate({ to: "/admin/news" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to create article");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<AdminLayout title="New Article">
			<form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
						Title
					</label>
					<input
						id="title"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
					/>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
							Author
						</label>
						<input
							id="author"
							type="text"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
						/>
					</div>
					<div>
						<label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
							Status
						</label>
						<select
							id="status"
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
						>
							<option value="draft">Draft</option>
							<option value="published">Published</option>
						</select>
					</div>
				</div>

				<div>
					<label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
						Summary
					</label>
					<textarea
						id="summary"
						value={summary}
						onChange={(e) => setSummary(e.target.value)}
						required
						rows={2}
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
					/>
				</div>

				<div>
					<label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
						Content <span className="text-gray-400 font-normal">(separate paragraphs with blank lines)</span>
					</label>
					<textarea
						id="content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
						rows={10}
						className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
					/>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
							Source URL <span className="text-gray-400 font-normal">(optional)</span>
						</label>
						<input
							id="url"
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
						/>
					</div>
					<div>
						<label htmlFor="pdfUrl" className="block text-sm font-medium text-gray-700 mb-1">
							PDF URL <span className="text-gray-400 font-normal">(optional)</span>
						</label>
						<input
							id="pdfUrl"
							type="text"
							value={pdfUrl}
							onChange={(e) => setPdfUrl(e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none"
						/>
					</div>
				</div>

				{error && (
					<p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
				)}

				<div className="flex gap-3 pt-2">
					<button
						type="submit"
						disabled={submitting}
						className="rounded-md bg-brand-navy px-6 py-2 text-sm font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-50"
					>
						{submitting ? "Creating..." : "Create Article"}
					</button>
					<button
						type="button"
						onClick={() => navigate({ to: "/admin/news" })}
						className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Cancel
					</button>
				</div>
			</form>
		</AdminLayout>
	);
}
