import { Clock, Mail, MapPin, Phone, Printer } from "lucide-react";
import type { ContactInfo, DepartmentCategory } from "~/data/departments";

const categoryAccents: Record<DepartmentCategory, string> = {
  administrative: "bg-brand-navy",
  courts: "bg-brand-courts",
  "public-safety": "bg-brand-safety",
  finance: "bg-brand-sage",
  operations: "bg-brand-brass",
  community: "bg-brand-community",
};

interface ContactCardProps {
  head: { name: string; title: string };
  contact: ContactInfo;
  category?: DepartmentCategory;
}

export function ContactCard({ head, contact, category }: ContactCardProps) {
  return (
    <div className="rounded-sm border border-brand-surface bg-white overflow-hidden shadow-md ring-1 ring-black/5">
      {/* Category accent line */}
      {category && <div className={`h-1 ${categoryAccents[category]}`} />}

      {/* Header with navy bg */}
      <div className="bg-brand-navy px-6 py-5">
        <h3 className="font-display text-base font-bold text-brand-cream">{head.name}</h3>
        <p className="font-body text-sm text-brand-cream/60">{head.title}</p>
      </div>

      {/* Contact details */}
      <div className="p-6 flex flex-col gap-4 font-body text-sm">
        <div className="flex items-start gap-2.5">
          <Phone className="mt-0.5 size-4 shrink-0 text-brand-copper" />
          <a href={`tel:${contact.phone}`} className="hover:text-brand-navy hover:underline">
            {contact.phone}
          </a>
        </div>

        {contact.fax && (
          <div className="flex items-start gap-2.5">
            <Printer className="mt-0.5 size-4 shrink-0 text-brand-stone" />
            <span className="text-brand-slate-light">{contact.fax}</span>
          </div>
        )}

        {contact.email && (
          <div className="flex items-start gap-2.5">
            <Mail className="mt-0.5 size-4 shrink-0 text-brand-copper" />
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-brand-navy hover:underline break-all"
            >
              {contact.email}
            </a>
          </div>
        )}

        <div className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand-copper" />
          <span>{contact.address}</span>
        </div>

        <div className="flex items-start gap-2.5">
          <Clock className="mt-0.5 size-4 shrink-0 text-brand-copper" />
          <span>{contact.hours}</span>
        </div>
      </div>
    </div>
  );
}
