import { cn } from "~/lib/utils";

interface CountySealProps {
  /** Visible size in px (square). Defaults to 64. */
  size?: number;
  className?: string;
  /**
   * Whether to use the SVG (crisp at any size, larger on disk) or the rastered
   * PNG (smaller for tiny placements like the footer mark). Defaults to "svg".
   */
  variant?: "svg" | "raster";
  /** Hide from assistive tech if the seal is decorative. Defaults to true. */
  decorative?: boolean;
}

const RASTER_SIZES = [64, 128, 256, 512] as const;

function pickRasterSize(targetPx: number): number {
  // Pick the smallest size ≥ 2× target (for HiDPI). Cap at 512.
  for (const s of RASTER_SIZES) {
    if (s >= targetPx * 2) return s;
  }
  return 512;
}

export function CountySeal({
  size = 64,
  className,
  variant = "svg",
  decorative = true,
}: CountySealProps) {
  const ariaProps = decorative
    ? { "aria-hidden": true as const }
    : { role: "img" as const, "aria-label": "Great Seal of Sullivan County, Tennessee" };

  if (variant === "svg") {
    return (
      <img
        src="/images/seal/sullivan-seal.svg"
        width={size}
        height={size}
        className={cn("inline-block", className)}
        loading="lazy"
        decoding="async"
        alt={decorative ? "" : "Great Seal of Sullivan County, Tennessee"}
        {...ariaProps}
      />
    );
  }

  const rasterSize = pickRasterSize(size);
  return (
    <img
      src={`/images/seal/sullivan-seal-${rasterSize}.png`}
      width={size}
      height={size}
      className={cn("inline-block", className)}
      loading="lazy"
      decoding="async"
      alt={decorative ? "" : "Great Seal of Sullivan County, Tennessee"}
      {...ariaProps}
    />
  );
}
