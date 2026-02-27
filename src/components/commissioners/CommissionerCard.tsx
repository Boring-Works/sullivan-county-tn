import { Mail, MapPin, Phone } from "lucide-react";
import type { Commissioner } from "~/data/commissioners";

interface CommissionerCardProps {
  commissioner: Commissioner;
}

export function CommissionerCard({ commissioner }: CommissionerCardProps) {
  return (
    <div className="card-lift group relative rounded-sm border border-brand-surface bg-white overflow-hidden">
      {/* Accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-brass scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />

      <div className="p-6">
        <h3 className="font-display text-base font-bold text-brand-navy mb-2">
          {commissioner.name}
        </h3>
        <div className="flex items-start gap-2 font-body text-sm text-brand-slate-light mb-3">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-brand-stone" />
          <span>{commissioner.address}</span>
        </div>

        <div className="flex flex-col gap-2 font-body text-sm">
          {commissioner.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-3.5 shrink-0 text-brand-navy/50" />
              <a
                href={`tel:${commissioner.phone}`}
                className="hover:text-brand-navy hover:underline"
              >
                {commissioner.phone}
              </a>
            </div>
          )}
          {commissioner.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-3.5 shrink-0 text-brand-navy/50" />
              <a
                href={`mailto:${commissioner.email}`}
                className="break-all hover:text-brand-navy hover:underline"
              >
                {commissioner.email}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
