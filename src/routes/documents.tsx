import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, FileText } from "lucide-react";
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

const documentCategories = [
  "ADA Documents",
  "Agendas",
  "County Commission",
  "Court Dockets",
  "Court Forms",
  "Emergency Management Documents",
  "Employee Services",
  "Finance Documents",
  "Planning and Codes",
  "Property Assessor",
  "Public Documents",
  "Purchasing Documents",
  "Sanitation",
  "Sullivan County FMS 2020",
  "Veterans Service Officer",
];

function DocumentsPage() {
  return (
    <main className="pt-24 pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          Document Library
        </h1>
        <p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
          Access county documents, forms, and public records. Documents are hosted on the Sullivan
          County document management system.
        </p>

        {/* Document category grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {documentCategories.map((category) => (
            <a
              key={category}
              href={DOCUMENT_LIBRARY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="card-lift group flex items-center gap-3 rounded-sm border border-brand-surface bg-white p-4 transition-colors hover:border-brand-copper/30"
            >
              <FileText className="size-5 shrink-0 text-brand-navy/60 group-hover:text-brand-copper transition-colors" />
              <span className="font-body text-sm font-medium text-brand-slate group-hover:text-brand-navy transition-colors">
                {category}
              </span>
              <ExternalLink className="ml-auto size-3.5 shrink-0 text-brand-warm-gray opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-14 text-center">
          <p className="font-body text-sm text-brand-slate-light">
            Visit the{" "}
            <a
              href={DOCUMENT_LIBRARY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-copper hover:text-brand-copper-light hover:underline font-medium"
            >
              full document library
            </a>{" "}
            for downloads and forms.
          </p>
        </div>
      </div>
    </main>
  );
}
