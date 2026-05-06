import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, FileSearch, HardHat, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FORM_DEFINITIONS } from "~/data/form-definitions";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/forms/")({
  component: FormsPage,
  head: () => ({
    meta: seo({
      title: "Online Forms — Sullivan County, TN",
      description:
        "Submit building permits, code complaints, public records requests, and feedback to Sullivan County government.",
      image: "/images/og/og-courthouse.jpg",
      url: "/forms",
    }),
    links: seoLinks("/forms"),
  }),
});

const ICONS: Record<string, typeof HardHat> = {
  "hard-hat": HardHat,
  "alert-triangle": AlertTriangle,
  "file-search": FileSearch,
  "message-square": MessageSquare,
};

function FormsPage() {
  const { t } = useTranslation();
  return (
    <main id="main-content" className="pt-24 pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          {t("forms.title")}
        </h1>
        <p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
          {t("forms.description")}
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {FORM_DEFINITIONS.map((form) => {
            const Icon = ICONS[form.icon] ?? MessageSquare;
            return (
              <Link
                key={form.type}
                to="/forms/$type"
                params={{ type: form.type }}
                className="group rounded-md border border-brand-surface bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-copper/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-brand-navy/5 text-brand-copper group-hover:bg-brand-copper/10 transition-colors">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-brand-navy mb-1 group-hover:text-brand-copper transition-colors">
                      {form.title}
                    </h2>
                    <p className="font-body text-sm text-brand-slate-light leading-relaxed">
                      {form.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 font-body text-sm font-semibold text-brand-copper">
                      {t("forms.startForm")}
                      <svg
                        className="size-3.5 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <title>Arrow</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
