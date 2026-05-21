import { CountySeal } from "~/components/shared/CountySeal";
import type { Department } from "~/data/departments";
import { SITE_URL } from "~/utils/seo";

interface PrintableContactCardProps {
  department: Department;
}

/**
 * Print-only block that takes over the entire printed page for /departments/$slug.
 * Hidden on screen via `hidden print:block`. Citizens print this, stick it on
 * the fridge, and have department contact info at hand without a screen.
 */
export function PrintableContactCard({ department }: PrintableContactCardProps) {
  const url = `${SITE_URL}/departments/${department.slug}`;

  return (
    <aside className="hidden print:block print:fixed print:inset-0 print:m-0 print:bg-white print:text-black print:p-8">
      <header className="flex items-start gap-4 border-b border-black/30 pb-4">
        <CountySeal size={64} variant="raster" decorative={false} />
        <div className="flex-1">
          <p className="font-display text-[10pt] font-bold uppercase tracking-widest">
            Sullivan County, Tennessee
          </p>
          <h1 className="font-display text-[22pt] font-bold leading-tight mt-1">
            {department.name}
          </h1>
          <p className="font-body text-[10pt] mt-1">
            {department.head.name} — {department.head.title}
          </p>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-[1fr_auto] gap-8">
        <dl className="font-body text-[11pt] space-y-3">
          <div>
            <dt className="font-semibold uppercase tracking-wide text-[9pt]">Phone</dt>
            <dd>{department.contact.phone}</dd>
          </div>
          {department.contact.fax && (
            <div>
              <dt className="font-semibold uppercase tracking-wide text-[9pt]">Fax</dt>
              <dd>{department.contact.fax}</dd>
            </div>
          )}
          {department.contact.email && (
            <div>
              <dt className="font-semibold uppercase tracking-wide text-[9pt]">Email</dt>
              <dd>{department.contact.email}</dd>
            </div>
          )}
          <div>
            <dt className="font-semibold uppercase tracking-wide text-[9pt]">Address</dt>
            <dd>{department.contact.address}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wide text-[9pt]">Hours</dt>
            <dd>{department.contact.hours}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wide text-[9pt]">Services</dt>
            <dd>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                {department.services.slice(0, 6).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="flex max-w-[180px] flex-col items-center gap-2 rounded-sm border border-black/30 p-3 text-center">
          <p className="font-display text-[11pt] font-bold">Live page</p>
          <p className="break-all font-body text-[8pt] leading-snug">{url}</p>
        </div>
      </div>

      <footer className="absolute bottom-8 left-8 right-8 border-t border-black/30 pt-3 flex justify-between font-body text-[8pt]">
        <span>{url}</span>
        <span>Sullivan County Government — sullivancountytn.gov — Established 1779</span>
      </footer>
    </aside>
  );
}
