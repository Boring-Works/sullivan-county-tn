import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, FileText } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

export const Route = createFileRoute("/documents")({
  component: DocumentsPage,
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
    <main className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-brand-blue mb-4">Document Library</h1>
        <p className="text-brand-slate-light mb-12 max-w-2xl">
          Access county documents, forms, and public records. Documents are hosted on the Sullivan
          County document management system.
        </p>

        {/* Document category grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documentCategories.map((category) => (
            <a
              key={category}
              href={DOCUMENT_LIBRARY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full transition-colors group-hover:border-brand-blue/40">
                <CardContent className="flex items-center gap-3 p-4">
                  <FileText className="size-5 shrink-0 text-brand-blue" />
                  <span className="text-sm font-medium group-hover:text-brand-blue">
                    {category}
                  </span>
                  <ExternalLink className="ml-auto size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-brand-slate">
            Visit the{" "}
            <a
              href={DOCUMENT_LIBRARY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue hover:underline font-medium"
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
