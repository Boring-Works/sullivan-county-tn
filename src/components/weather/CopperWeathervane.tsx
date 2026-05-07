/**
 * Animated copper weathervane.
 *
 * Adapted from the Rocky Mount/Tennessee-Starts-Here component, themed for
 * Sullivan County's copper/brass civic palette. Pure CSS — no framer-motion.
 *
 * Wind direction: degrees (0=N, 90=E, 180=S, 270=W). Vane points INTO the wind.
 */

interface CopperWeathervaneProps {
  windDirection: number; // degrees
  windSpeed?: number; // mph (informational only)
  size?: number; // px width (also defines height)
  className?: string;
}

const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;

function describeWind(speedMph: number): string {
  if (speedMph < 1) return "Calm";
  if (speedMph < 8) return "Light breeze";
  if (speedMph < 15) return "Moderate breeze";
  if (speedMph < 25) return "Fresh wind";
  if (speedMph < 40) return "Strong wind";
  return "Gale";
}

export function CopperWeathervane({
  windDirection,
  windSpeed,
  size = 220,
  className,
}: CopperWeathervaneProps) {
  const dirIdx = Math.round(windDirection / 45) % 8;
  const directionName = DIRECTIONS[dirIdx];

  // Compass-rose label radius scales with size.
  const labelRadius = size * 0.4;

  return (
    <div
      className={`relative mx-auto ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-label={`Wind from ${directionName}${windSpeed !== undefined ? `, ${windSpeed} mph (${describeWind(windSpeed)})` : ""}`}
      role="img"
    >
      {/* Outer compass ring */}
      <div
        className="absolute inset-0 rounded-full border-2 border-brand-copper/30"
        aria-hidden="true"
      />
      {/* Inner ring */}
      <div
        className="absolute rounded-full border border-brand-copper/20"
        style={{ inset: size * 0.18 }}
        aria-hidden="true"
      />

      {/* Cardinal & ordinal direction letters */}
      <div className="absolute inset-0" aria-hidden="true">
        {DIRECTIONS.map((dir, i) => {
          const angle = i * 45;
          const x = Math.sin((angle * Math.PI) / 180) * labelRadius;
          const y = -Math.cos((angle * Math.PI) / 180) * labelRadius;
          const isCardinal = i % 2 === 0;
          return (
            <div
              key={dir}
              className={`absolute font-display font-bold ${
                isCardinal ? "text-brand-copper" : "text-brand-copper/60"
              }`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                fontSize: isCardinal ? size * 0.07 : size * 0.05,
              }}
            >
              {dir}
            </div>
          );
        })}
      </div>

      {/* Vane — rotates with wind direction */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{ transform: `rotate(${windDirection}deg)` }}
        aria-hidden="true"
      >
        {/* Arrow head (points INTO wind, top of element) */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: size * 0.06 }}>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: size * 0.04,
              borderRightWidth: size * 0.04,
              borderBottomWidth: size * 0.08,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "var(--color-brand-copper, #a44d2a)",
              borderStyle: "solid",
              filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.3))",
            }}
          />
        </div>

        {/* Shaft */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-brand-copper via-brand-copper to-brand-brass shadow-md"
          style={{
            top: size * 0.14,
            bottom: size * 0.28,
            width: size * 0.018,
          }}
        />

        {/* Tail (decorative finial) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-brass-light via-brand-copper to-brand-copper-light shadow-lg"
          style={{
            bottom: size * 0.12,
            width: size * 0.13,
            height: size * 0.13,
          }}
        />

        {/* Center hub */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-copper to-brand-navy border-2 border-brand-copper shadow-md"
          style={{ width: size * 0.05, height: size * 0.05 }}
        />
      </div>

      {/* Direction readout (bottom) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-3 text-center">
        <div className="font-display text-2xl font-bold text-brand-navy leading-none">
          {directionName}
        </div>
        {windSpeed !== undefined && (
          <div className="mt-1 font-body text-xs uppercase tracking-widest text-brand-stone">
            {windSpeed} mph · {describeWind(windSpeed)}
          </div>
        )}
      </div>
    </div>
  );
}
