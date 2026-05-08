import { Link } from "@tanstack/react-router";
import { Users } from "lucide-react";

import type { Community, CommunityType } from "~/data/communities";

const TYPE_LABELS: Record<CommunityType, string> = {
  city: "City",
  town: "Town",
  cdp: "Census-Designated Place",
  unincorporated: "Unincorporated",
};

interface CommunityCardProps {
  community: Community;
  index?: number;
}

export function CommunityCard({ community, index = 0 }: CommunityCardProps) {
  const img = community.image;
  return (
    <Link
      to="/communities/$slug"
      params={{ slug: community.slug }}
      data-reveal
      data-reveal-delay={index * 100}
      className="card-lift group relative flex flex-col rounded-sm border border-brand-surface bg-white overflow-hidden"
    >
      {img ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-brand-navy">
          <picture>
            {img.webp1024 ? (
              <source media="(min-width: 768px)" srcSet={img.webp1024} type="image/webp" />
            ) : null}
            {img.webp ? <source srcSet={img.webp} type="image/webp" /> : null}
            {img.src1024 ? <source media="(min-width: 768px)" srcSet={img.src1024} /> : null}
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </picture>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-transparent to-transparent"
          />
        </div>
      ) : (
        <div className="h-1 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
      )}
      <div className="flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display text-lg font-bold text-brand-navy group-hover:text-brand-copper transition-colors">
            {community.name}
          </h3>
          <span className="shrink-0 inline-flex items-center rounded-full bg-brand-navy/5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-brand-navy/80">
            {TYPE_LABELS[community.type]}
          </span>
        </div>

        {community.population && (
          <div className="flex items-center gap-1.5 mb-3 text-brand-stone">
            <Users className="size-3.5" />
            <span className="font-body text-xs">
              ~{community.population.toLocaleString()} residents
            </span>
          </div>
        )}

        <p className="font-body text-sm leading-relaxed text-brand-slate-light line-clamp-3 mb-2">
          {community.tagline}
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {community.highlights.map((h) => (
            <span
              key={h.label}
              className="inline-flex items-center gap-1 rounded-full bg-brand-parchment px-2 py-0.5 text-[10px] font-medium text-brand-stone"
            >
              <span className="font-semibold text-brand-navy">{h.value}</span>
            </span>
          ))}
        </div>

        <div className="mt-4 font-body text-xs font-semibold text-brand-copper group-hover:text-brand-copper-light transition-colors">
          Explore {community.name} &rarr;
        </div>
      </div>
    </Link>
  );
}
