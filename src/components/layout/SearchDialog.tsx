import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate } from "@tanstack/react-router";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildSearchIndex, type SearchItem } from "~/data/search-index";
import { cn } from "~/lib/utils";

const TYPE_LABELS: Record<SearchItem["type"], string> = {
	department: "Department",
	news: "News",
	commissioner: "Commissioner",
	document: "Documents",
	page: "Page",
};

const TYPE_COLORS: Record<SearchItem["type"], string> = {
	department: "bg-brand-navy/10 text-brand-navy",
	news: "bg-brand-copper/10 text-brand-copper",
	commissioner: "bg-brand-sage/10 text-brand-sage",
	document: "bg-brand-stone/10 text-brand-stone",
	page: "bg-brand-brass/10 text-brand-brass",
};

interface SearchDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
	const [query, setQuery] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const searchIndex = useMemo(() => buildSearchIndex(), []);
	const fuse = useMemo(
		() =>
			new Fuse(searchIndex, {
				keys: [
					{ name: "title", weight: 2 },
					{ name: "description", weight: 1 },
					{ name: "category", weight: 0.5 },
				],
				threshold: 0.3,
				includeScore: true,
			}),
		[searchIndex],
	);

	const results = useMemo(() => {
		if (!query.trim()) return [];
		return fuse.search(query, { limit: 8 });
	}, [fuse, query]);

	// Reset on open/close
	useEffect(() => {
		if (open) {
			setQuery("");
			setSelectedIndex(0);
		}
	}, [open]);

	const navigateToResult = useCallback(
		(item: SearchItem) => {
			onOpenChange(false);
			navigate({ to: item.url });
		},
		[navigate, onOpenChange],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				setSelectedIndex((i) => Math.max(i - 1, 0));
			} else if (e.key === "Enter" && results[selectedIndex]) {
				e.preventDefault();
				navigateToResult(results[selectedIndex].item);
			}
		},
		[results, selectedIndex, navigateToResult],
	);

	// Reset selection when results change
	useEffect(() => {
		setSelectedIndex(0);
	}, [results.length]);

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-brand-navy/40 backdrop-blur-sm animate-in fade-in-0" />
				<Dialog.Content
					className="fixed left-1/2 top-[15%] z-50 w-full max-w-lg -translate-x-1/2 rounded-md border border-brand-surface bg-white shadow-2xl shadow-brand-navy/10 animate-in fade-in-0 slide-in-from-top-4"
					onOpenAutoFocus={(e) => {
						e.preventDefault();
						inputRef.current?.focus();
					}}
				>
					{/* Search input */}
					<div className="flex items-center gap-3 border-b border-brand-surface px-4 py-3">
						<Search className="size-4 shrink-0 text-brand-stone" />
						<input
							ref={inputRef}
							type="text"
							placeholder="Search departments, services, people..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={handleKeyDown}
							className="flex-1 bg-transparent font-body text-sm text-brand-slate placeholder:text-brand-stone outline-none"
							role="combobox"
							aria-expanded={results.length > 0}
							aria-controls="search-results-list"
							aria-activedescendant={results.length > 0 ? `search-result-${selectedIndex}` : undefined}
							aria-label="Search Sullivan County"
						/>
						<Dialog.Close asChild>
							<button
								type="button"
								className="rounded-sm p-1 text-brand-stone hover:bg-brand-surface hover:text-brand-slate transition-colors"
								aria-label="Close search"
							>
								<X className="size-4" />
							</button>
						</Dialog.Close>
					</div>

					{/* Results */}
					<div className="max-h-80 overflow-y-auto p-2">
						{query.trim() && results.length === 0 && (
							<div className="px-3 py-8 text-center">
								<p className="font-body text-sm text-brand-stone">
									No results found for "{query}"
								</p>
							</div>
						)}

						{results.length > 0 && (
							<ul id="search-results-list" role="listbox">
								{results.map((result, index) => (
									<li
										key={`${result.item.type}-${result.item.url}-${result.item.title}`}
										id={`search-result-${index}`}
										role="option"
										aria-selected={index === selectedIndex}
									>
										<button
											type="button"
											onClick={() => navigateToResult(result.item)}
											onMouseEnter={() => setSelectedIndex(index)}
											className={cn(
												"w-full text-left rounded-sm px-3 py-2.5 transition-colors",
												index === selectedIndex
													? "bg-brand-parchment"
													: "hover:bg-brand-surface/50",
											)}
										>
											<div className="flex items-center gap-2 mb-0.5">
												<span className="font-display text-sm font-bold text-brand-navy">
													{result.item.title}
												</span>
												<span
													className={cn(
														"inline-flex items-center rounded-full px-1.5 py-0.5 font-body text-[10px] font-medium",
														TYPE_COLORS[result.item.type],
													)}
												>
													{TYPE_LABELS[result.item.type]}
												</span>
											</div>
											<p className="font-body text-xs text-brand-stone line-clamp-1">
												{result.item.description}
											</p>
										</button>
									</li>
								))}
							</ul>
						)}

						{!query.trim() && (
							<div className="px-3 py-6 text-center">
								<p className="font-body text-xs text-brand-stone">
									Start typing to search Sullivan County services, departments, and more
								</p>
							</div>
						)}
					</div>

					{/* Footer hint */}
					{results.length > 0 && (
						<div className="border-t border-brand-surface px-4 py-2 flex items-center gap-4">
							<span className="font-body text-[10px] text-brand-stone">
								<kbd className="rounded border border-brand-surface px-1 py-0.5 font-mono text-[10px]">
									↑↓
								</kbd>{" "}
								to navigate
							</span>
							<span className="font-body text-[10px] text-brand-stone">
								<kbd className="rounded border border-brand-surface px-1 py-0.5 font-mono text-[10px]">
									↵
								</kbd>{" "}
								to select
							</span>
							<span className="font-body text-[10px] text-brand-stone">
								<kbd className="rounded border border-brand-surface px-1 py-0.5 font-mono text-[10px]">
									esc
								</kbd>{" "}
								to close
							</span>
						</div>
					)}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
