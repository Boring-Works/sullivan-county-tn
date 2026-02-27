import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Dog,
  DollarSign,
  ExternalLink,
  Heart,
  Medal,
  Scale,
  Siren,
  Vote,
} from "lucide-react";
import { quickServices } from "~/data/quick-services";
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
};

export function QuickServices() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative bg-brand-cream py-20 sm:py-24">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading — editorial left-aligned with decorative line */}
        <div className="mb-14 max-w-2xl" data-reveal>
          <div className="mb-4 h-px w-12 bg-brand-copper" />
          <h2 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
            Quick Services
          </h2>
          <p className="mt-3 font-body text-base text-brand-slate-light leading-relaxed sm:text-lg">
            Access the most-used Sullivan County services and resources
          </p>
        </div>

        {/* Grid — refined card treatment */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickServices.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            const content = (
              <div className="card-lift group relative flex h-full flex-col rounded-sm border border-brand-surface bg-white p-6 overflow-hidden">
                {/* Accent top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />

                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-brand-navy/5 text-brand-navy transition-colors duration-300 group-hover:bg-brand-copper/10 group-hover:text-brand-copper">
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </div>
                  {service.external ? (
                    <ExternalLink className="h-3.5 w-3.5 text-brand-warm-gray/60" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-brand-warm-gray/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-copper" />
                  )}
                </div>
                <h3 className="font-display text-sm font-bold text-brand-slate group-hover:text-brand-navy transition-colors">
                  {service.title}
                </h3>
                <p className="mt-1.5 font-body text-xs leading-relaxed text-brand-slate-light">
                  {service.description}
                </p>
              </div>
            );

            if (service.external) {
              return (
                <a
                  key={service.title}
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
