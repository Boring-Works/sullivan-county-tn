/**
 * Audience pathways for the homepage — Phase 2 of the redesign.
 *
 * Three tiles below the hero acknowledging the five distinct audiences a
 * county website serves (current citizens, potential citizens, current
 * businesses, potential businesses, tourists) per the
 * `County_Government_Website_Blueprint_2026` Section 2.3.1 + 3.2.2 hybrid IA
 * recommendation. Brunswick County NC + Greenville County SC are the
 * canonical implementations.
 *
 * The "Live in Sullivan" tile collapses both current AND potential residents.
 * The "Do Business" tile collapses both current AND potential businesses.
 * Tourists get their own dedicated "Visit" tile.
 *
 * Numbers in this file are static — they reflect verified facts about
 * Sullivan County (2020 Census, USACE, NRHP, etc.) and update only when a
 * source publication updates. Keep them honest.
 */

export interface PathwayStat {
  /** The headline number — kept short for visual prominence. */
  value: string;
  /** Plain-language label beneath the number. */
  labelKey: string;
}

export interface PathwayLink {
  labelKey: string;
  to: string;
  /** Optional /departments?category=foo type query. */
  search?: { category: string };
}

export interface AudiencePathway {
  key: "live" | "visit" | "business";
  /** Icon name imported in the component (kept as string here). */
  iconKey: "home" | "compass" | "briefcase";
  /** Tile heading + subheading i18n keys. */
  headingKey: string;
  subheadingKey: string;
  /** One-sentence body copy. */
  bodyKey: string;
  /** Three featured stats (number + label). */
  stats: PathwayStat[];
  /** Up to 3 deep links surfaced on the tile. */
  links: PathwayLink[];
  /** Photo background — currently uses existing assets; Phase 5 will replace with a curated set. */
  photo: {
    src: string;
    srcSet?: { src: string; minWidth: number }[];
    alt: string;
  };
}

export const AUDIENCE_PATHWAYS: AudiencePathway[] = [
  {
    key: "live",
    iconKey: "home",
    headingKey: "audiencePathways.live.heading",
    subheadingKey: "audiencePathways.live.subheading",
    bodyKey: "audiencePathways.live.body",
    stats: [
      { value: "158,163", labelKey: "audiencePathways.live.statResidents" },
      { value: "3", labelKey: "audiencePathways.live.statSchools" },
      { value: "6", labelKey: "audiencePathways.live.statCommunities" },
    ],
    links: [
      { labelKey: "audiencePathways.live.linkCommunities", to: "/communities" },
      { labelKey: "audiencePathways.live.linkEducation", to: "/education" },
      { labelKey: "audiencePathways.live.linkAbout", to: "/about" },
    ],
    photo: {
      src: "/images/about/courthouse-960.jpg",
      srcSet: [
        { src: "/images/about/courthouse-640.jpg", minWidth: 0 },
        { src: "/images/about/courthouse-960.jpg", minWidth: 768 },
      ],
      alt: "Sullivan County Court House in Blountville — brick building with white columns and an American flag",
    },
  },
  {
    key: "visit",
    iconKey: "compass",
    headingKey: "audiencePathways.visit.heading",
    subheadingKey: "audiencePathways.visit.subheading",
    bodyKey: "audiencePathways.visit.body",
    stats: [
      { value: "8", labelKey: "audiencePathways.visit.statHeritageSites" },
      { value: "146,000", labelKey: "audiencePathways.visit.statBmsCapacity" },
      { value: "1779", labelKey: "audiencePathways.visit.statFounded" },
    ],
    links: [
      { labelKey: "audiencePathways.visit.linkVisit", to: "/visit" },
      { labelKey: "audiencePathways.visit.linkHistory", to: "/history" },
      { labelKey: "audiencePathways.visit.linkTimeline", to: "/history/timeline" },
    ],
    photo: {
      src: "/images/hero/boone-lake-1024.jpg",
      srcSet: [
        { src: "/images/hero/boone-lake-640.jpg", minWidth: 0 },
        { src: "/images/hero/boone-lake-1024.jpg", minWidth: 768 },
      ],
      alt: "Aerial view of Boone Lake in Sullivan County, Tennessee — forested islands and Appalachian mountains",
    },
  },
  {
    key: "business",
    iconKey: "briefcase",
    headingKey: "audiencePathways.business.heading",
    subheadingKey: "audiencePathways.business.subheading",
    bodyKey: "audiencePathways.business.body",
    stats: [
      { value: "30,000+", labelKey: "audiencePathways.business.statJobs" },
      { value: "11", labelKey: "audiencePathways.business.statTopEmployers" },
      { value: "$8.8B", labelKey: "audiencePathways.business.statBaeContract" },
    ],
    links: [
      { labelKey: "audiencePathways.business.linkEconDev", to: "/economic-development" },
      { labelKey: "audiencePathways.business.linkPermits", to: "/forms" },
      {
        labelKey: "audiencePathways.business.linkPlanning",
        to: "/departments/planning-and-codes",
      },
    ],
    photo: {
      // Phase 5 will introduce a business-specific photo (Eastman, BMS plant,
      // or Tri-Cities Airport). For now we use the OG courthouse asset which
      // visually distinguishes from the Live tile's narrower courthouse crop.
      src: "/images/og/og-courthouse.jpg",
      alt: "Sullivan County Court House at dusk — civic and business hub of the county seat in Blountville",
    },
  },
];
