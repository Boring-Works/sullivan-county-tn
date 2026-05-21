import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Dog,
  DollarSign,
  ExternalLink,
  Heart,
  Map as MapIcon,
  Medal,
  Scale,
  Siren,
  Vote,
} from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { quickServices, type ServiceSubmissionMode } from "~/data/quick-services";
import { useScrollReveal } from "~/hooks/useScrollReveal";

const ICON_MAP: Record<string, LucideIcon> = {
  DollarSign,
  Heart,
  Building2,
  Scale,
  Dog,
  Siren,
  Vote,
  Medal,
  Map: MapIcon,
};

const SUBMISSION_LABELS: Record<ServiceSubmissionMode, string> = {
  online: "Online",
  "in-person": "In person",
  hybrid: "Online or in person",
};

const SUBMISSION_STYLES: Record<ServiceSubmissionMode, string> = {
  online: "bg-brand-sage/10 text-brand-sage",
  "in-person": "bg-brand-brass/10 text-[#7a6534]",
  hybrid: "bg-brand-navy/10 text-brand-navy",
};

function SubmissionBadge({ mode }: { mode: ServiceSubmissionMode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 font-body text-[10px] font-medium tracking-wide ${SUBMISSION_STYLES[mode]}`}
    >
      {SUBMISSION_LABELS[mode]}
    </span>
  );
}

export interface QuickServicesProps {
  /**
   * h2 by default. Pass "h3" when this component is nested under another
   * section's h2 (e.g., inside TodaySection). Single-h1-per-page semantics.
   */
  headingLevel?: "h2" | "h3";
  /** When true, the outer <section> bg-cream and big py-20 are dropped — for
   *  composition inside another section. Defaults to false (standalone use). */
  variant?: "standalone" | "embedded";
}

export function QuickServices({
  headingLevel = "h2",
  variant = "standalone",
}: QuickServicesProps = {}) {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const { t } = useTranslation();
  const Heading = headingLevel;
  const isEmbedded = variant === "embedded";

  const Wrapper = isEmbedded
    ? ({ children }: { children: ReactNode }) => <div className="relative">{children}</div>
    : ({ children }: { children: ReactNode }) => (
        <section className="relative bg-brand-cream py-20 sm:py-24">{children}</section>
      );

  return (
    <Wrapper>
      <div
        ref={containerRef}
        className={isEmbedded ? "" : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}
      >
        <div className={isEmbedded ? "mb-5 max-w-2xl sm:mb-8" : "mb-14 max-w-2xl"} data-reveal>
          <Heading
            className={
              isEmbedded
                ? "font-display text-2xl font-bold text-brand-navy sm:text-3xl"
                : "font-display text-3xl font-bold text-brand-navy sm:text-4xl"
            }
          >
            {t("home.services.heading")}
          </Heading>
          <p className="mt-3 hidden font-body text-base leading-relaxed text-brand-slate-light sm:block sm:text-lg">
            {t("home.services.description")}
          </p>
        </div>

        <div
          className={
            isEmbedded
              ? "grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3"
              : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {quickServices.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            const content = (
              <div
                className={`card-lift group relative flex h-full flex-col overflow-hidden rounded-sm border border-brand-surface bg-white transition-colors hover:border-brand-navy/15 ${isEmbedded ? "p-3.5 sm:p-4" : "p-6"}`}
              >
                <div
                  className={
                    isEmbedded
                      ? "mb-3 flex items-start justify-between"
                      : "mb-4 flex items-start justify-between"
                  }
                >
                  <div className="flex size-9 items-center justify-center rounded-sm bg-brand-navy/5 text-brand-navy transition-colors duration-300 group-hover:bg-brand-copper/10 group-hover:text-brand-copper sm:size-11">
                    {Icon ? <Icon aria-hidden="true" className="h-5 w-5" /> : null}
                  </div>
                  {service.external ? (
                    <ExternalLink
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-brand-warm-gray/60"
                    />
                  ) : (
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 text-brand-warm-gray/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-copper"
                    />
                  )}
                </div>
                <h3 className="font-display text-sm font-bold leading-tight text-brand-slate transition-colors group-hover:text-brand-navy">
                  {service.title}
                </h3>
                <p className="mt-1.5 hidden font-body text-xs leading-relaxed text-brand-slate-light sm:line-clamp-3 sm:block">
                  {service.description}
                </p>
                {service.submission && (
                  <div className="mt-3">
                    <SubmissionBadge mode={service.submission} />
                  </div>
                )}
              </div>
            );

            if (service.external) {
              return (
                <a
                  key={service.title}
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${service.title} ${t("home.opensInNewTab")}`}
                  data-reveal
                  data-reveal-delay={index * 60}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={service.title}
                to={service.href}
                data-reveal
                data-reveal-delay={index * 60}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}
