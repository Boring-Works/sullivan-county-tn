import { useTranslation } from "react-i18next";
import { COMMITTEES } from "~/data/meeting-minutes";
import { cn } from "~/lib/utils";

interface MinutesFilterProps {
  selected: string | null;
  onSelect: (committee: string | null) => void;
}

export function MinutesFilter({ selected, onSelect }: MinutesFilterProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "rounded-full px-4 py-1.5 font-body text-sm font-medium transition-colors",
          !selected
            ? "bg-brand-navy text-white"
            : "bg-brand-surface text-brand-slate hover:bg-brand-navy/10",
        )}
      >
        {t("minutes.allCommittees")}
      </button>
      {COMMITTEES.map((committee) => (
        <button
          key={committee}
          type="button"
          onClick={() => onSelect(committee === selected ? null : committee)}
          className={cn(
            "rounded-full px-4 py-1.5 font-body text-sm font-medium transition-colors",
            committee === selected
              ? "bg-brand-navy text-white"
              : "bg-brand-surface text-brand-slate hover:bg-brand-navy/10",
          )}
        >
          {committee}
        </button>
      ))}
    </div>
  );
}
