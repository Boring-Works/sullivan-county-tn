import { ExternalLink } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";
import { type ExternalHandoffId, externalHandoffs } from "~/data/external-handoffs";
import { cn } from "~/lib/utils";

interface ExternalHandoffLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  handoffId: ExternalHandoffId;
  label?: string;
  showNote?: boolean;
}

export function ExternalHandoffLink({
  handoffId,
  label,
  showNote = false,
  className,
  children,
  ...props
}: ExternalHandoffLinkProps) {
  const handoff = externalHandoffs[handoffId];
  return (
    <a
      href={handoff.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label ?? handoff.label}. ${handoff.handoffNote}`}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      {children ?? label ?? handoff.label}
      <ExternalLink aria-hidden="true" className="size-3.5 shrink-0 opacity-70" />
      {showNote ? <span className="sr-only"> {handoff.handoffNote}</span> : null}
    </a>
  );
}
