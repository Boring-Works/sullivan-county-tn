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
        className="block w-full h-[50px] sm:h-[65px] lg:h-[80px]"
        aria-hidden="true"
      >
        <path
          d="M0,120 L0,70 Q120,30 240,60 T480,45 Q600,20 720,55 T960,35 Q1080,25 1200,55 T1440,40 L1440,120 Z"
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
        className="block w-full h-[50px] sm:h-[65px] lg:h-[80px]"
        aria-hidden="true"
      >
        <path
          d="M0,0 L0,50 Q120,90 240,60 T480,75 Q600,100 720,65 T960,80 Q1080,95 1200,65 T1440,80 L1440,0 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
