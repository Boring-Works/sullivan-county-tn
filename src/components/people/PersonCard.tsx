import { type NotablePerson, PERSON_CATEGORY_LABELS } from "~/data/notable-people";

interface PersonCardProps {
  person: NotablePerson;
  index?: number;
}

export function PersonCard({ person, index = 0 }: PersonCardProps) {
  return (
    <div
      data-reveal
      data-reveal-delay={index * 100}
      className="rounded-sm border border-brand-surface bg-white p-6"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display text-lg font-bold text-brand-navy">{person.name}</h3>
        <span className="shrink-0 inline-flex items-center rounded-full bg-brand-navy/5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-brand-navy/60">
          {PERSON_CATEGORY_LABELS[person.category]}
        </span>
      </div>
      <p className="font-body text-xs text-brand-stone mb-2">{person.years}</p>
      <p className="font-body text-sm leading-relaxed text-brand-slate-light mb-2">
        {person.achievement}
      </p>
      <p className="font-body text-xs text-brand-copper italic">{person.connection}</p>
    </div>
  );
}
