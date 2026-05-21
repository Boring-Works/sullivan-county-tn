import { Clock, Contact, Mail, MapPin, Phone, Printer } from "lucide-react";
import { useState } from "react";
import { TelLink } from "~/components/shared/TelLink";
import type { ContactInfo, DepartmentCategory } from "~/data/departments";
import { buildVCard, vCardDataHref } from "~/lib/vcard";

const categoryAccents: Record<DepartmentCategory, string> = {
  administrative: "bg-brand-navy",
  courts: "bg-brand-courts",
  "public-safety": "bg-brand-safety",
  finance: "bg-brand-sage",
  operations: "bg-brand-brass",
  community: "bg-brand-community",
};

interface ContactCardProps {
  head: { name: string; title: string; photo?: string };
  contact: ContactInfo;
  category?: DepartmentCategory;
}

export function ContactCard({ head, contact, category }: ContactCardProps) {
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "shared">("idle");
  const vcardHref = vCardDataHref(
    buildVCard({
      fullName: head.name,
      title: head.title,
      organization: "Sullivan County, Tennessee",
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
    }),
  );
  const vcardFile = `${head.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.vcf`;
  const shareText = [head.name, head.title, contact.phone, contact.email, contact.address]
    .filter(Boolean)
    .join("\n");

  async function handleShareContact() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${head.name} — Sullivan County Contact`,
          text: shareText,
        });
        setShareStatus("shared");
        return;
      }
      await navigator.clipboard.writeText(shareText);
      setShareStatus("copied");
    } catch {
      // User cancelled share or clipboard is unavailable.
      setShareStatus("idle");
    }
  }

  return (
    <div className="group rounded-sm border border-brand-surface bg-white overflow-hidden shadow-md ring-1 ring-black/5">
      {/* Category accent line */}
      {category && <div className={`h-1 ${categoryAccents[category]}`} />}

      {/* Header with navy bg */}
      <div className="bg-brand-navy px-6 py-5">
        <div className="flex items-center gap-4">
          {head.photo && (
            <div className="relative size-16 shrink-0 rounded-sm overflow-hidden border-2 border-brand-brass/30">
              <img
                src={head.photo}
                alt={head.name}
                className="size-full object-cover object-top official-headshot"
                loading="lazy"
                width={128}
                height={128}
              />
              <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.15)] pointer-events-none" />
            </div>
          )}
          <div>
            <h3 className="font-display text-base font-bold text-brand-cream">{head.name}</h3>
            <p className="font-body text-sm text-brand-cream/60">{head.title}</p>
          </div>
        </div>
      </div>

      {/* Contact details */}
      <div className="p-6 flex flex-col gap-4 font-body text-sm">
        <div className="flex items-start gap-2.5">
          <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-copper" />
          <TelLink phone={contact.phone} className="hover:text-brand-navy hover:underline" />
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
          <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-copper" />
          <span>{contact.hours}</span>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <a
            href={vcardHref}
            download={vcardFile}
            className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/15 bg-brand-parchment px-3 py-1.5 font-body text-xs font-medium text-brand-navy hover:border-brand-copper/40 hover:text-brand-copper transition-colors"
          >
            <Contact aria-hidden="true" className="size-3.5" />
            Save contact
          </a>
          <button
            type="button"
            onClick={handleShareContact}
            className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/15 bg-white px-3 py-1.5 font-body text-xs font-medium text-brand-navy hover:border-brand-copper/40 hover:text-brand-copper transition-colors"
          >
            Share details
          </button>
          {shareStatus !== "idle" && (
            <span className="font-body text-[11px] text-brand-stone">
              {shareStatus === "shared" ? "Shared" : "Copied to clipboard"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
