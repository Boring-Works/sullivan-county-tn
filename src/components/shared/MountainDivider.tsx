import { cn } from "~/lib/utils";

interface MountainDividerProps {
  className?: string;
  /** The NEXT section's background color (foreground silhouette). */
  fill?: string;
}

/**
 * Three-layer mountain silhouette: a deep haze ridge in back, a mid ridge,
 * and the foreground ridge that matches the next section's background.
 * Reads as real Appalachian parallax depth at zero motion cost. Peaks point
 * DOWN — place at the bottom of a section.
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
        {/* Deepest layer — broad, gentle peaks, lowest opacity. */}
        <path
          d="M0,120 L0,90 Q140,55 280,72 T580,60 Q740,40 900,68 T1200,56 Q1320,50 1440,64 L1440,120 Z"
          fill={fill}
          opacity="0.18"
        />
        {/* Mid layer — sharper peaks, more contrast. */}
        <path
          d="M0,120 L0,82 Q90,40 200,60 T420,45 Q560,18 700,50 T960,30 Q1100,20 1230,52 T1440,38 L1440,120 Z"
          fill={fill}
          opacity="0.4"
        />
        {/* Foreground ridge — solid, matches next section. */}
        <path
          d="M0,120 L0,70 Q120,30 240,60 T480,45 Q600,20 720,55 T960,35 Q1080,25 1200,55 T1440,40 L1440,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/**
 * Three-layer inverted divider — peaks point UP. Place at the top of a section.
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
          d="M0,0 L0,30 Q140,65 280,48 T580,60 Q740,80 900,52 T1200,64 Q1320,70 1440,56 L1440,0 Z"
          fill={fill}
          opacity="0.18"
        />
        <path
          d="M0,0 L0,38 Q90,80 200,60 T420,75 Q560,102 700,70 T960,90 Q1100,100 1230,68 T1440,82 L1440,0 Z"
          fill={fill}
          opacity="0.4"
        />
        <path
          d="M0,0 L0,50 Q120,90 240,60 T480,75 Q600,100 720,65 T960,80 Q1080,95 1200,65 T1440,80 L1440,0 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
