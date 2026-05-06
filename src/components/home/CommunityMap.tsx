import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "~/hooks/useScrollReveal";

interface Pin {
  slug: "kingsport" | "bristol" | "blountville" | "bluff-city" | "piney-flats" | "colonial-heights";
  name: string;
  x: number;
  y: number;
}

/**
 * County boundary derived from US Census TIGER/Line cartographic file (FIPS
 * 47163). Equirectangular projection at the county's center latitude. Path
 * generated once and committed; no runtime GeoJSON parsing.
 */
const COUNTY_PATH =
  "M468.9,66.8 522.4,66.8 539.8,66.8 540.8,66.8 543.2,66.8 545.0,66.7 556.2,66.6 556.8,66.7 579.9,67.5 588.0,67.8 591.7,68.0 595.1,68.2 619.6,68.2 621.8,68.1 624.5,68.1 847.1,68.8 859.2,40.0 960.0,42.6 910.5,61.0 909.2,76.5 853.6,103.1 849.7,123.7 814.8,150.7 794.9,181.1 791.7,178.0 780.1,201.4 737.4,210.1 695.8,247.3 673.9,245.5 665.1,257.7 579.7,322.1 533.7,306.6 524.9,294.0 513.3,296.3 475.2,328.8 462.9,327.2 389.8,318.6 371.3,332.6 384.4,296.4 348.6,288.3 352.4,274.9 335.5,260.9 145.9,292.3 137.3,283.9 86.6,272.1 62.7,281.1 40.0,250.1 119.3,197.9 118.4,174.1 136.8,166.7 130.3,87.9 147.5,90.9 137.8,68.9 188.4,68.0 189.7,68.0 195.5,67.9 266.0,66.7 275.0,67.0 287.6,68.4 465.9,66.8 468.9,66.8 Z";

const VIEW_BOX = "0 0 1000 373";

const PINS: Pin[] = [
  { slug: "bristol", name: "Bristol", x: 579.7, y: 67.6 },
  { slug: "blountville", name: "Blountville", x: 437.4, y: 150.3 },
  { slug: "kingsport", name: "Kingsport", x: 187.6, y: 128.6 },
  { slug: "colonial-heights", name: "Colonial Heights", x: 247.7, y: 221.2 },
  { slug: "piney-flats", name: "Piney Flats", x: 344.3, y: 262.2 },
  { slug: "bluff-city", name: "Bluff City", x: 500.5, y: 232.4 },
];

export function CommunityMap() {
  const containerRef = useScrollReveal<HTMLElement>();
  const { t } = useTranslation();

  return (
    <section
      ref={containerRef}
      aria-labelledby="community-map-heading"
      className="relative bg-brand-parchment py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12" data-reveal>
          <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
            {t("home.communityMap.eyebrow")}
          </span>
          <h2
            id="community-map-heading"
            className="font-display text-3xl font-bold text-brand-navy sm:text-4xl"
          >
            {t("home.communityMap.heading")}
          </h2>
          <p className="mt-3 font-body text-base text-brand-slate-light leading-relaxed sm:text-lg">
            {t("home.communityMap.description")}
          </p>
        </div>

        <div data-reveal className="relative">
          <svg
            viewBox={VIEW_BOX}
            className="block w-full h-auto"
            role="img"
            aria-label={t("home.communityMap.svgAria")}
          >
            <title>{t("home.communityMap.svgAria")}</title>

            {/* Faint topo grid behind the county shape. */}
            <defs>
              <pattern id="county-topo" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="var(--color-brand-stone)"
                  strokeOpacity="0.08"
                  strokeWidth="0.5"
                />
              </pattern>
              <filter id="pin-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* County shape — solid cream fill with a brass outline. */}
            <path
              d={COUNTY_PATH}
              fill="var(--color-brand-cream)"
              stroke="var(--color-brand-brass)"
              strokeWidth="1.4"
              strokeLinejoin="round"
              filter="url(#pin-glow)"
            />
            {/* Topo overlay clipped to the shape via second path. */}
            <path d={COUNTY_PATH} fill="url(#county-topo)" />

            {/* Community pins. */}
            {PINS.map((pin) => (
              <g key={pin.slug} className="map-pin">
                {/* Wide invisible hit target for tap accessibility. */}
                <Link to="/communities/$slug" params={{ slug: pin.slug }}>
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="22"
                    fill="transparent"
                    className="map-pin-hit"
                    aria-label={`${pin.name} — ${t("home.communityMap.viewCommunity")}`}
                  />
                  {/* Visible pin: outer ring + inner dot. */}
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="11"
                    fill="var(--color-brand-cream)"
                    stroke="var(--color-brand-copper)"
                    strokeWidth="2"
                    className="map-pin-ring"
                  />
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="5"
                    fill="var(--color-brand-copper)"
                    className="map-pin-dot"
                  />
                  {/* Label — sits below the pin. */}
                  <text
                    x={pin.x}
                    y={pin.y + 26}
                    textAnchor="middle"
                    className="map-pin-label"
                    fill="var(--color-brand-navy)"
                    fontFamily="var(--font-display)"
                    fontWeight="700"
                    fontSize="13"
                  >
                    {pin.name}
                  </text>
                </Link>
              </g>
            ))}
          </svg>

          {/* Legend / quick-list on small screens where the map is too small to tap. */}
          <ul className="mt-6 grid grid-cols-2 gap-2 sm:hidden">
            {PINS.map((pin) => (
              <li key={pin.slug}>
                <Link
                  to="/communities/$slug"
                  params={{ slug: pin.slug }}
                  className="flex items-center gap-2 rounded-sm border border-brand-surface bg-white px-3 py-2 font-body text-sm text-brand-navy transition-colors hover:border-brand-copper/40"
                >
                  <span aria-hidden="true" className="block size-2 rounded-full bg-brand-copper" />
                  {pin.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-center font-body text-xs text-brand-stone">
          {t("home.communityMap.boundarySource")}
        </p>
      </div>
    </section>
  );
}
