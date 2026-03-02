export type CommunityType = "city" | "town" | "cdp" | "unincorporated";

export interface Community {
  slug: string;
  name: string;
  type: CommunityType;
  population?: number;
  populationYear?: number;
  incorporated?: number;
  tagline: string;
  description: string;
  landmarks: string[];
  keyFacts: string[];
  highlights: { label: string; value: string }[];
}

export const communities: Community[] = [
  {
    slug: "kingsport",
    name: "Kingsport",
    type: "city",
    population: 55442,
    populationYear: 2020,
    incorporated: 1917,
    tagline: "America's Model City",
    description:
      "Sullivan County's largest city and one of America's first planned industrial cities. Designed by John Nolen in 1917, Kingsport is home to Eastman Chemical Company's global headquarters and Bays Mountain Park — the largest city-owned park in Tennessee at 3,550 acres. The city's origins trace to William King's boatyard on the Holston River, where the Netherland Inn still stands.",
    landmarks: [
      "Eastman Chemical Company (global headquarters, Fortune 500)",
      "Bays Mountain Park and Planetarium (3,550 acres)",
      "Netherland Inn (NRHP 1969)",
      "Exchange Place Living History Farm (NRHP 1971)",
      "Warriors' Path State Park (950 acres)",
      "Long Island of the Holston (National Historic Landmark 1960)",
    ],
    keyFacts: [
      "Largest city in Sullivan County",
      "One of America's first planned 'Model Cities' (John Nolen, 1917)",
      "Eastman Chemical Company global HQ (~14,000 employees worldwide, ~$9.4B revenue)",
      "BTES 10-gigabit community fiber network",
      "I-81 and I-26 junction within city limits",
      "Named for William King, who operated a boatyard at Long Island",
    ],
    highlights: [
      { label: "Population", value: "~55,442" },
      { label: "Incorporated", value: "1917" },
      { label: "Largest Employer", value: "Eastman Chemical" },
    ],
  },
  {
    slug: "bristol",
    name: "Bristol",
    type: "city",
    population: 27147,
    populationYear: 2020,
    incorporated: 1856,
    tagline: "Birthplace of Country Music",
    description:
      "A twin city straddling the Tennessee-Virginia border, with State Street marking the state line. Bristol earned its official designation as the 'Birthplace of Country Music' from the U.S. Congress in 1998, honoring the legendary Bristol Sessions of 1927 when Ralph Peer recorded Jimmie Rodgers and the Carter Family. Home to Bristol Motor Speedway — 'The Last Great Colosseum' — and King University.",
    landmarks: [
      "Bristol Motor Speedway (146,000 seats)",
      "State Street (TN-VA state line)",
      "Birthplace of Country Music Museum (Bristol, VA — adjacent)",
      "King University (NCAA Division II)",
      "Steele Creek Park (2,200+ acres, third-largest municipal park in TN)",
    ],
    keyFacts: [
      "U.S. Congress designated 'Birthplace of Country Music' (October 12, 1998)",
      "Bristol Sessions recorded July 25–August 5, 1927",
      "Bristol Motor Speedway: 146,000 seats, NASCAR race weekends",
      "Battle at Bristol (2016): 156,990 fans — largest college football crowd ever",
      "Bristol Rhythm and Roots Reunion: 30,000–45,000 annual attendees",
      "Twin city with Bristol, Virginia — State Street is the state line",
    ],
    highlights: [
      { label: "Population", value: "~27,147" },
      { label: "Incorporated", value: "1856" },
      { label: "BMS Capacity", value: "146,000" },
    ],
  },
  {
    slug: "blountville",
    name: "Blountville",
    type: "unincorporated",
    tagline: "Tennessee's Only Unincorporated County Seat",
    description:
      "Sullivan County's seat of government since 1795, Blountville is Tennessee's only unincorporated county seat. Named for William Blount, the territorial governor who administered the Southwest Territory from nearby Rocky Mount. The village is home to the Sullivan County Courthouse (1853), the Old Deery Inn, and the Blountville Historic District along the Great Stage Road (TN-126).",
    landmarks: [
      "Sullivan County Courthouse (1853, oldest in continuous use in NE TN)",
      "Old Deery Inn (NRHP 1973, No. 73001838)",
      "Anderson Townhouse (believed oldest frame house in Tennessee)",
      "Blountville Historic District",
      "Northeast State Community College (95-acre campus)",
      "Tri-Cities Airport (TRI)",
    ],
    keyFacts: [
      "Tennessee's only unincorporated county seat",
      "County seat since 1795",
      "Named for William Blount, territorial governor",
      "On the Great Stage Road (TN-126)",
      "Home to Tri-Cities Airport (448,514 passengers, 2023 record)",
      "Northeast State Community College (5,400–6,600 students)",
    ],
    highlights: [
      { label: "Status", value: "County Seat" },
      { label: "Since", value: "1795" },
      { label: "Airport", value: "TRI" },
    ],
  },
  {
    slug: "bluff-city",
    name: "Bluff City",
    type: "city",
    population: 1756,
    populationYear: 2020,
    tagline: "Gateway to the Overmountain Trail",
    description:
      "A small city in southeastern Sullivan County where the Overmountain Victory National Historic Trail crosses at Choates Ford. Bluff City provides access to Boone Lake and serves as a gateway between Sullivan and Washington Counties.",
    landmarks: ["Overmountain Victory Trail crossing at Choates Ford", "Boone Lake access"],
    keyFacts: [
      "Overmountain Victory National Historic Trail crossing at Choates Ford",
      "Boone Lake recreational access",
      "Gateway between Sullivan and Washington Counties",
    ],
    highlights: [
      { label: "Population", value: "~1,756" },
      { label: "Trail", value: "Overmountain Victory" },
    ],
  },
  {
    slug: "piney-flats",
    name: "Piney Flats",
    type: "unincorporated",
    tagline: "Home of Tennessee's First Capital",
    description:
      "An unincorporated community in south-central Sullivan County, best known as the location of Rocky Mount State Historic Site — the first capitol of the Southwest Territory. The surrounding area preserves the rural agricultural character of Sullivan County's frontier heritage, including Century Farms documented as far back as 1775.",
    landmarks: ["Rocky Mount State Historic Site"],
    keyFacts: [
      "Location of Rocky Mount State Historic Site",
      "Rural agricultural heritage",
      "Century Farms (Cobb farm documented 1775)",
      "South-central Sullivan County",
    ],
    highlights: [
      { label: "Known For", value: "Rocky Mount" },
      { label: "Character", value: "Rural Heritage" },
    ],
  },
  {
    slug: "colonial-heights",
    name: "Colonial Heights",
    type: "cdp",
    tagline: "Commerce Between Cities",
    description:
      "A census-designated place along the US-11W commercial corridor between Kingsport and Bristol. Colonial Heights serves as a retail and commercial hub for the surrounding Sullivan County area.",
    landmarks: [],
    keyFacts: [
      "Census-designated place",
      "Commercial corridor along US-11W",
      "Between Kingsport and Bristol",
    ],
    highlights: [
      { label: "Type", value: "Census-Designated Place" },
      { label: "Corridor", value: "US-11W" },
    ],
  },
];

export function getCommunityBySlug(slug: string): Community | undefined {
  return communities.find((c) => c.slug === slug);
}
