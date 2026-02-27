import { cn } from "~/lib/utils";

interface MountainDividerProps {
  className?: string;
  fill?: string;
}

/**
 * Peaks point DOWN — place at the bottom of a section.
 * fill should match the NEXT section's background color.
 */
export function MountainDivider({
  className,
  fill = "var(--color-brand-cream)",
}: MountainDividerProps) {
  return (
    <div className={cn("relative w-full overflow-hidden leading-[0]", className)}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-[80px] sm:h-[100px] lg:h-[120px]"
        aria-hidden="true"
      >
        <path
          d="M0,120 L0,60 Q120,10 240,50 T480,30 Q600,0 720,40 T960,20 Q1080,5 1200,45 T1440,25 L1440,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/**
 * Peaks point UP — place at the top of a section.
 * fill should match the PREVIOUS section's background color.
 */
export function MountainDividerInverted({
  className,
  fill = "var(--color-brand-cream)",
}: MountainDividerProps) {
  return (
    <div className={cn("relative w-full overflow-hidden leading-[0]", className)}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-[80px] sm:h-[100px] lg:h-[120px]"
        aria-hidden="true"
      >
        <path
          d="M0,0 L0,60 Q120,110 240,70 T480,90 Q600,120 720,80 T960,100 Q1080,115 1200,75 T1440,95 L1440,0 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
