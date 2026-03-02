import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { VideoEmbed } from "~/components/shared/VideoEmbed";
import { CATEGORIES, documents } from "~/data/documents";
import type { DocumentFileType } from "~/data/documents";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/documents")({
  component: DocumentsPage,
  head: () => ({
    meta: seo({
      title: "Document Library — Sullivan County, TN",
      description:
        "Access county documents, forms, agendas, court dockets, and public records from Sullivan County.",
      url: "/documents",
    }),
    links: seoLinks("/documents"),
  }),
});

const typeBadgeStyles: Record<DocumentFileType, string> = {
  PDF: "bg-red-50 text-red-700",
  DOCX: "bg-blue-50 text-blue-700",
  DOC: "bg-blue-50 text-blue-700",
  MP4: "bg-purple-50 text-purple-700",
  TIF: "bg-amber-50 text-amber-700",
};

function DocumentsPage() {
  const [filter, setFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let results = documents;
    if (activeCategory) {
      results = results.filter((d) => d.category === activeCategory);
    }
    if (filter) {
      const q = filter.toLowerCase();
      results = results.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q),
      );
    }
    return results;
  }, [filter, activeCategory]);

  const visibleCategories = useMemo(() => {
    const catNames = [...new Set(filtered.map((d) => d.category))];
    return CATEGORIES.filter((c) => catNames.includes(c.name));
  }, [filtered]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const doc of documents) {
      counts.set(doc.category, (counts.get(doc.category) || 0) + 1);
    }
    return counts;
  }, []);

  const toggleSection = (categoryName: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  return (
    <main id="main-content" className="pt-24 pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          Document Library
        </h1>
        <p className="font-body text-brand-slate-light mb-8 max-w-2xl leading-relaxed">
          Download forms, policies, and resources. All {documents.length} documents are available
          for immediate download.
        </p>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-brand-stone" />
          <input
            type="text"
            placeholder="Search all documents..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-sm border border-brand-surface bg-white py-2.5 pl-10 pr-4 font-body text-sm text-brand-slate placeholder:text-brand-warm-gray focus:outline-none focus:border-brand-copper/50 focus:ring-1 focus:ring-brand-copper/20"
          />
        </div>

        {/* Category Pills */}
        <div className="mb-6 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 font-body text-xs font-medium transition-colors ${
                activeCategory === null
                  ? "bg-brand-copper text-white"
                  : "bg-brand-navy/5 text-brand-slate hover:bg-brand-navy/10"
              }`}
            >
              All
              <span className="ml-1.5 opacity-70">{documents.length}</span>
            </button>
            {CATEGORIES.map((cat) => {
              const count = categoryCounts.get(cat.name) || 0;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 font-body text-xs font-medium transition-colors ${
                    activeCategory === cat.name
                      ? "bg-brand-copper text-white"
                      : "bg-brand-navy/5 text-brand-slate hover:bg-brand-navy/10"
                  }`}
                >
                  {cat.name}
                  <span className="ml-1.5 opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        <p className="font-body text-xs text-brand-warm-gray mb-8">
          Showing {filtered.length} document{filtered.length !== 1 ? "s" : ""} in{" "}
          {visibleCategories.length} categor{visibleCategories.length !== 1 ? "ies" : "y"}
        </p>

        {/* Category Sections */}
        <div className="space-y-8 mb-16">
          {visibleCategories.map((category) => {
            const categoryDocs = filtered.filter((d) => d.category === category.name);
            const isCollapsed = collapsedSections.has(category.name);
            return (
              <section key={category.slug}>
                <button
                  type="button"
                  onClick={() => toggleSection(category.name)}
                  className="flex items-center gap-3 mb-4 w-full text-left group"
                >
                  <ChevronDown
                    className={`size-4 text-brand-stone transition-transform ${
                      isCollapsed ? "-rotate-90" : ""
                    }`}
                  />
                  <h2 className="font-display text-lg font-bold text-brand-navy group-hover:text-brand-copper transition-colors">
                    {category.name}
                  </h2>
                  <span className="rounded-full bg-brand-navy/5 px-2 py-0.5 font-body text-xs text-brand-slate-light">
                    {categoryDocs.length}
                  </span>
                </button>
                {!isCollapsed && (
                  <div className="space-y-2 ml-7">
                    {categoryDocs.map((doc) => (
                      <a
                        key={doc.href}
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
                          <span className="font-body text-[10px] text-brand-warm-gray">
                            {doc.size}
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wider ${typeBadgeStyles[doc.type]}`}
                          >
                            {doc.type}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 mb-16">
            <p className="font-body text-sm text-brand-slate-light">
              No documents found matching your search. Try a different term.
            </p>
          </div>
        )}

        {/* Training Videos */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display text-lg font-bold text-brand-navy">Training Videos</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 max-w-3xl">
            <VideoEmbed
              videoId="NIGQe15IZlo"
              title="Title VI Nondiscrimination Training"
              description="Required for all county employees"
            />
          </div>
        </section>

        {/* Related Pages */}
        <div className="rounded-sm border border-brand-surface bg-brand-parchment p-6">
          <h3 className="font-display text-base font-bold text-brand-navy mb-3">Related Pages</h3>
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
