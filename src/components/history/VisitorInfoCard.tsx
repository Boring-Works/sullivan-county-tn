import { Clock, DollarSign, ExternalLink, MapPin } from "lucide-react";

import type { HeritageSite } from "~/data/heritage-sites";

interface VisitorInfoCardProps {
  site: HeritageSite;
}

export function VisitorInfoCard({ site }: VisitorInfoCardProps) {
  return (
    <div className="rounded-sm border border-brand-surface bg-brand-parchment p-6">
      <h3 className="font-display text-lg font-bold text-brand-navy mb-4">Visitor Information</h3>
      <dl className="space-y-3 font-body text-sm">
        <div className="flex items-start gap-3">
          <MapPin className="size-4 text-brand-copper mt-0.5 shrink-0" />
          <div>
            <dt className="font-semibold text-brand-navy">Location</dt>
            <dd className="text-brand-slate-light">{site.location}</dd>
          </div>
        </div>
        {site.hours && (
          <div className="flex items-start gap-3">
            <Clock className="size-4 text-brand-copper mt-0.5 shrink-0" />
            <div>
              <dt className="font-semibold text-brand-navy">Hours</dt>
              <dd className="text-brand-slate-light">{site.hours}</dd>
            </div>
          </div>
        )}
        {site.admission && (
          <div className="flex items-start gap-3">
            <DollarSign className="size-4 text-brand-copper mt-0.5 shrink-0" />
            <div>
              <dt className="font-semibold text-brand-navy">Admission</dt>
              <dd className="text-brand-slate-light">{site.admission}</dd>
            </div>
          </div>
        )}
        {site.website && (
          <div className="flex items-start gap-3">
            <ExternalLink className="size-4 text-brand-copper mt-0.5 shrink-0" />
            <div>
              <dt className="font-semibold text-brand-navy">Website</dt>
              <dd>
                <a
                  href={site.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-copper hover:text-brand-copper-light transition-colors"
                >
                  {site.website.replace(/^https?:\/\//, "")}
                </a>
              </dd>
            </div>
          </div>
        )}
        {site.operator && (
          <div className="mt-3 pt-3 border-t border-brand-surface">
            <p className="text-xs text-brand-stone">Operated by {site.operator}</p>
          </div>
        )}
      </dl>
    </div>
  );
}
