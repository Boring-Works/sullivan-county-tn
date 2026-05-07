import { useOpenStatus } from "~/hooks/useOpenStatus";
import { cn } from "~/lib/utils";

interface OpenStatusPillProps {
  hours: string | undefined;
  variant?: "light" | "dark";
  className?: string;
}

export function OpenStatusPill({ hours, variant = "dark", className }: OpenStatusPillProps) {
  const status = useOpenStatus(hours);

  // No usable hours data — render nothing rather than a useless "See hours" pill.
  if (status.label === "See hours") return null;

  const isLight = variant === "light";
  const dotClass =
    status.isOpen === true
      ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]"
      : status.isOpen === false
        ? isLight
          ? "bg-brand-stone"
          : "bg-white/50"
        : isLight
          ? "bg-brand-stone/50"
          : "bg-white/30";
  const wrap = isLight
    ? "border-brand-surface bg-white text-brand-slate"
    : "border-white/20 bg-white/10 text-white";

  return (
    <span
      suppressHydrationWarning
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-body text-xs font-medium",
        wrap,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="relative inline-flex shrink-0 items-center justify-center"
      >
        {/* Pulse halo always rendered so the SSR and client DOM trees match;
            visibility is toggled via data-attr to avoid hydration mismatches. */}
        <span
          data-pulse={status.isOpen === true ? "on" : "off"}
          aria-hidden="true"
          className="absolute inline-block size-3 rounded-full bg-emerald-500/40 motion-safe:animate-status-pulse data-[pulse=off]:hidden"
        />
        <span className={cn("relative block size-1.5 rounded-full", dotClass)} />
      </span>
      <span className="sr-only">Office hours: </span>
      {status.label}
    </span>
  );
}
