import { Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, FileDown } from "lucide-react";
import { DetailBreadcrumb } from "~/components/shared/DetailBreadcrumb";
import { Badge } from "~/components/ui/badge";
import type { NewsItem } from "~/data/news";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

interface NewsDetailProps {
  article: NewsItem;
}

export function NewsDetail({ article }: NewsDetailProps) {
  return (
    <main id="main-content" className="pt-24 pb-14">
      {/* Header */}
      <div className="bg-brand-parchment border-b border-brand-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <DetailBreadcrumb
            className="mb-4"
            items={[
              { label: "Home", to: "/" },
              { label: "News", to: "/news" },
              { label: article.title },
            ]}
          />
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 font-body text-sm text-brand-copper hover:text-brand-copper-light transition-colors mb-6"
          >
            <ArrowLeft className="size-3.5" />
            Back to News
          </Link>
          <p className="font-body text-xs text-brand-stone mb-3 tracking-wide uppercase">
            {formatDate(article.date)} &middot; {article.author}
          </p>
          <h1 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 font-body text-brand-slate-light max-w-2xl leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      {/* Article body */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        {article.htmlContent ? (
          <div
            className="prose prose-slate max-w-none font-body text-base leading-relaxed text-brand-slate [&_p]:mb-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-brand-navy [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-brand-copper [&_a]:underline [&_a]:hover:text-brand-copper-light"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: pre-sanitized by sanitize-html on ingest
            dangerouslySetInnerHTML={{ __html: article.htmlContent }}
          />
        ) : article.content && article.content.length > 0 ? (
          <div className="space-y-5">
            {article.content.map((paragraph) => (
              <p
                key={`para-${paragraph.slice(0, 40)}`}
                className="font-body text-base leading-relaxed text-brand-slate"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="font-body text-base leading-relaxed text-brand-slate-light italic">
            Full article content is available at the original source below.
          </p>
        )}

        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-3 border-t border-brand-surface pt-8">
          {article.pdfUrl && (
            <Badge
              asChild
              variant="secondary"
              className="rounded-sm bg-brand-parchment text-brand-navy font-body px-4 py-2 text-sm"
            >
              <a href={article.pdfUrl} download>
                <FileDown className="size-3.5" />
                Download PDF
              </a>
            </Badge>
          )}
          {article.url && (
            <Badge
              asChild
              variant="outline"
              className="rounded-sm text-brand-slate font-body px-4 py-2 text-sm"
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-3.5" />
                View Original Source
              </a>
            </Badge>
          )}
        </div>
      </div>
    </main>
  );
}
