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

export function QuickServices() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const { t } = useTranslation();

  return (
    <section className="relative bg-brand-cream py-20 sm:py-24">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl" data-reveal>
          <h2 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            {t("home.services.heading")}
          </h2>
          <p className="mt-3 font-body text-base text-brand-slate-light leading-relaxed sm:text-lg">
            {t("home.services.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickServices.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            const content = (
              <div className="card-lift group relative flex h-full flex-col rounded-sm border border-brand-surface bg-white p-6 overflow-hidden transition-colors hover:border-brand-navy/15">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-brand-navy/5 text-brand-navy transition-colors duration-300 group-hover:bg-brand-copper/10 group-hover:text-brand-copper">
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
                <h3 className="font-display text-sm font-bold text-brand-slate group-hover:text-brand-navy transition-colors">
                  {service.title}
                </h3>
                <p className="mt-1.5 font-body text-xs leading-relaxed text-brand-slate-light">
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
    </section>
  );
}
