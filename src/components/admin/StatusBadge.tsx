import { Badge } from "~/components/ui/badge";

/**
 * Admin status indicator. Uses brand palette where possible (sage for success
 * states, stone for archived) and standard semantic blue/amber for the others
 * — these are functional indicators, not brand moments.
 */
const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-50",
  reviewed: "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-50",
  resolved: "bg-brand-sage/10 text-brand-sage border-brand-sage/30 hover:bg-brand-sage/15",
  draft: "bg-brand-parchment text-brand-stone border-brand-surface hover:bg-brand-parchment",
  published: "bg-brand-sage/10 text-brand-sage border-brand-sage/30 hover:bg-brand-sage/15",
  archived: "bg-brand-parchment text-brand-warm-gray border-brand-surface hover:bg-brand-parchment",
};

const FALLBACK =
  "bg-brand-parchment text-brand-stone border-brand-surface hover:bg-brand-parchment";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`capitalize font-body ${STATUS_STYLES[status] ?? FALLBACK}`}
    >
      {status}
    </Badge>
  );
}
