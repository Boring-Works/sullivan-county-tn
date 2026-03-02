import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

import type { HeritageSite } from "~/data/heritage-sites";

interface HeritageSiteCardProps {
  site: HeritageSite;
  index?: number;
}

export function HeritageSiteCard({ site, index = 0 }: HeritageSiteCardProps) {
  return (
    <Link
      to="/history/$slug"
      params={{ slug: site.slug }}
      data-reveal
      data-reveal-delay={index * 100}
      className="card-lift group relative flex flex-col rounded-sm border border-brand-surface bg-white overflow-hidden"
    >
      <div className="h-1 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
      <div className="flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display text-lg font-bold text-brand-navy group-hover:text-brand-copper transition-colors">
            {site.name}
          </h3>
          {site.nrhp && (
            <span className="shrink-0 inline-flex items-center rounded-full bg-brand-sage/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-brand-sage">
              NRHP {site.nrhp.year}
            </span>
          )}
          {site.nhl && (
            <span className="shrink-0 inline-flex items-center rounded-full bg-brand-brass/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-brand-brass">
              NHL {site.nhl.year}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mb-3 text-brand-stone">
          <MapPin className="size-3.5" />
          <span className="font-body text-xs">{site.community}</span>
        </div>
        <p className="font-body text-sm leading-relaxed text-brand-slate-light line-clamp-3">
          {site.historicalSignificance}
        </p>
        <div className="mt-4 font-body text-xs font-semibold text-brand-copper group-hover:text-brand-copper-light transition-colors">
          Read the full story &rarr;
        </div>
      </div>
    </Link>
  );
}
