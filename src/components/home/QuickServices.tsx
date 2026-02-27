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
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-brand-blue sm:text-4xl">
            Quick Services
          </h2>
          <p className="mt-3 text-base text-brand-slate-light sm:text-lg">
            Access the most-used Sullivan County services and resources
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickServices.map((service) => {
            const Icon = ICON_MAP[service.icon];
            const content = (
              <div className="group flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-l-brand-orange hover:border-l-4 hover:shadow-md">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/5 text-brand-blue transition-colors group-hover:bg-brand-orange/10 group-hover:text-brand-orange">
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </div>
                  {service.external ? (
                    <ExternalLink className="h-3.5 w-3.5 text-brand-slate-light/60" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-brand-slate-light/40 transition-transform group-hover:translate-x-1 group-hover:text-brand-orange" />
                  )}
                </div>
                <h3 className="text-sm font-semibold text-brand-slate group-hover:text-brand-blue">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-brand-slate-light">
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
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={service.title} to={service.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
