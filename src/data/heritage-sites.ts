export interface HeritageSite {
  slug: string;
  name: string;
  location: string;
  community: string;
  coordinates: { lat: number; lng: number };
  established: string;
  nrhp?: { number: string; year: number };
  nhl?: { year: number };
  habs?: string;
  hours?: string;
  admission?: string;
  website?: string;
  operator?: string;
  description: string;
  keyFacts: string[];
  historicalSignificance: string;
  image?: string;
  trailStop: boolean;
}

export const heritageSites: HeritageSite[] = [
  {
    slug: "rocky-mount",
    name: "Rocky Mount State Historic Site",
    location: "200 Hyder Hill Road, Piney Flats, TN 37686",
    community: "Piney Flats",
    coordinates: { lat: 36.4464, lng: -82.3419 },
    established: "Site settled ~1770; building dates to 1820s; opened to public 1962",
    hours: "Seasonal hours — check website",
    admission: "$8-10 adults",
    website: "https://www.rockymountmuseum.com",
    operator: "Rocky Mount Historical Association",
    description:
      "The first capitol of the Southwest Territory (October 1790 to early 1792). Governor William Blount — a signer of the U.S. Constitution, appointed by President George Washington — administered the territory from the home of William Cobb. The site offers living history interpretation set in 1791.",
    keyFacts: [
      "First capitol of the Southwest Territory (1790–1792)",
      "Governor William Blount administered territory from this site",
      "William Cobb settled the site ~1770; Century Farms documented 1775",
      "Building dates to the 1820s based on architectural analysis",
      "Living history interpretation set in 1791",
      "Includes a slave cabin among interpretive buildings",
      "First territorial census (1791) counted 35,691 residents and 3,417 enslaved people",
    ],
    historicalSignificance:
      "Rocky Mount is where Tennessee's government began. The Southwest Territory — the political entity from which the State of Tennessee was born — operated its first capital here under Governor William Blount.",
    trailStop: true,
  },
  {
    slug: "old-deery-inn",
    name: "Old Deery Inn",
    location: "Blountville, TN",
    community: "Blountville",
    coordinates: { lat: 36.5313, lng: -82.3278 },
    established: "Samuel Deery acquired property 1801",
    nrhp: { number: "73001838", year: 1973 },
    habs: "TN-167",
    website: "https://www.historicsullivan.com",
    operator: "Sullivan County Historical Preservation Association; owned by Sullivan County",
    description:
      "A 19-room stagecoach inn on the Great Stage Road (TN-126) through Blountville. By 1821, the inn hosted eight coaches and fifty-three teams of horses. Three sitting or future U.S. presidents — Andrew Jackson, James K. Polk, and Andrew Johnson — are documented as having visited. French Prince Louis Philippe also stayed during his American exile.",
    keyFacts: [
      "19 rooms; Samuel Deery acquired 1801",
      "8 coaches and 53 teams of horses by 1821",
      "Hosted presidents Jackson, Polk, and Andrew Johnson",
      "French Prince Louis Philippe stayed during American exile",
      "National Register of Historic Places, May 7, 1973 (No. 73001838)",
      "HABS TN-167 (Library of Congress federal record)",
      "Located on Great Stage Road (TN-126)",
      "Owned by Sullivan County; managed by Sullivan County Historical Preservation Association",
    ],
    historicalSignificance:
      "The Old Deery Inn was the principal stagecoach stop in Blountville, the county seat, during the antebellum era. Its guest register reads as a roll call of early American leaders.",
    trailStop: true,
  },
  {
    slug: "netherland-inn",
    name: "Netherland Inn",
    location: "2144 Netherland Inn Road, Kingsport, TN 37660",
    community: "Kingsport",
    coordinates: { lat: 36.5486, lng: -82.5614 },
    established: "Site established 1802 as King's Boatyard; inn from 1818",
    nrhp: { number: "69000162", year: 1969 },
    hours: "Seasonal: May through December (volunteer-run)",
    website: "https://netherlandinnhistoricsite.com",
    operator: "Netherland Inn Association (volunteer-run)",
    description:
      "The only site on the National Register of Historic Places that served as both a boatyard and a stagecoach stop. Gilbert Christian bought 850 acres (Walnut Hill) in 1775. William King later acquired 3.5 acres and established a boatyard. Richard Netherland purchased the property at sheriff's auction in 1818 and transformed it into a three-story inn receiving 14 stagecoach visits per week. The Kingsport charter petition was signed at the inn; the Tennessee General Assembly passed the charter on August 21, 1822.",
    keyFacts: [
      "Only NRHP site serving as both boatyard and stagecoach stop",
      "Gilbert Christian purchased 850 acres (Walnut Hill) in 1775",
      "William King established boatyard on 3.5 acres",
      "Richard Netherland purchased at sheriff's auction, 1818",
      "14 stagecoach visits per week",
      "Kingsport charter petition signed at inn; TN General Assembly passed charter Aug 21, 1822",
      "Jordan and Jane — enslaved people documented at the inn",
      "Netherland family operated 814-acre Long Island plantation (Margaret Woods inheritance, Dearborn Treaty of 1806)",
      "National Register of Historic Places, 1969",
      "Complex includes inn, Bank Barn museum, replica flatboat, relocated log cabins",
    ],
    historicalSignificance:
      "The Netherland Inn connects river commerce, stagecoach travel, and the founding of Kingsport into a single site. It is where the petition for Kingsport's city charter was signed.",
    trailStop: true,
  },
  {
    slug: "exchange-place",
    name: "Exchange Place Living History Farm",
    location: "4812 Orebank Road, Kingsport, TN 37664",
    community: "Kingsport",
    coordinates: { lat: 36.4958, lng: -82.4872 },
    established: "John A. Gaines operated 1816–1845",
    nrhp: { number: "71000818", year: 1971 },
    website: "https://exchangeplacetn.org",
    operator: "Netherland Inn Association",
    description:
      "A saddle-bag style farmstead that served as a plantation and stagecoach exchange during the antebellum era. John A. Gaines, a War of 1812 veteran, operated the property from 1816 to 1845. The Preston family followed. Donated to the Netherland Inn Association in 1970, the site offers living history interpretation and seasonal events.",
    keyFacts: [
      "Saddle-bag style farmstead on Orebank Road",
      "John A. Gaines operated 1816–1845 (War of 1812 veteran)",
      "Preston family followed the Gaines family",
      "Donated 1970 to Netherland Inn Association",
      "National Register of Historic Places, 1971",
      "Living history interpretation and seasonal events",
      "Plantation-scale operation implying enslaved labor",
    ],
    historicalSignificance:
      "Exchange Place preserves the antebellum agricultural landscape of Sullivan County and the stagecoach exchange system that connected frontier communities.",
    trailStop: true,
  },
  {
    slug: "long-island",
    name: "Long Island of the Holston",
    location: "Kingsport, TN (at confluence of North and South Forks of the Holston River)",
    community: "Kingsport",
    coordinates: { lat: 36.55, lng: -82.54 },
    established: "Sacred Cherokee ground — council site for centuries",
    nhl: { year: 1960 },
    description:
      "Sacred Cherokee ground — a council site, gathering place, and point on the Great Indian Warrior Path. The island sits at the confluence of the North and South Forks of the Holston River. The 1777 Treaty of Long Island (Avery Treaty) was signed here. Colonel John Donelson assembled settlers at Long Island in December 1779 for the voyage that would establish Nashville. In 1976, Kingsport returned 3.61 acres to the Eastern Band of Cherokee Indians.",
    keyFacts: [
      "Sacred Cherokee council site on the Great Indian Warrior Path",
      "Confluence of North and South Forks of the Holston River",
      "Treaty of Long Island (Avery Treaty) signed 1777",
      "Donelson departure for Cumberland settlements, December 22, 1779",
      "National Historic Landmark, 1960",
      "Kingsport returned 3.61 acres to Eastern Band of Cherokee Indians, 1976",
      "Much of island developed for industrial use by Eastman Chemical Company",
    ],
    historicalSignificance:
      "Long Island is the oldest and deepest layer of Sullivan County's story. It was Cherokee homeland for centuries before it became a treaty ground, a departure point, and eventually an industrial site. The brand tells this story first, not last.",
    trailStop: true,
  },
  {
    slug: "blountville-historic-district",
    name: "Blountville Historic District",
    location: "Blountville, TN",
    community: "Blountville",
    coordinates: { lat: 36.5316, lng: -82.3275 },
    established: "County seat since 1795",
    description:
      "Tennessee's only unincorporated county seat. Named for William Blount. Home to the Sullivan County Courthouse (1853) — the oldest courthouse in continuous use in northeast Tennessee — and the Anderson Townhouse, believed to be the oldest frame house in Tennessee (relocated from original location).",
    keyFacts: [
      "Tennessee's only unincorporated county seat",
      "Named for William Blount, territorial governor",
      "County seat since 1795",
      "Sullivan County Courthouse built 1853, oldest in continuous use in NE TN",
      "Anderson Townhouse — believed oldest frame house in Tennessee",
      "Located on Great Stage Road (TN-126)",
    ],
    historicalSignificance:
      "Blountville has served as Sullivan County's seat of government for over 230 years, making it one of the longest continuously operating county seats in Tennessee.",
    trailStop: true,
  },
  {
    slug: "warriors-path",
    name: "Warriors' Path State Park",
    location: "490 Hemlock Road, Kingsport, TN 37663",
    community: "Kingsport",
    coordinates: { lat: 36.5028, lng: -82.5889 },
    established: "1952",
    hours: "Open daily, dawn to dusk",
    website: "https://tnstateparks.com/parks/warriors-path",
    operator: "Tennessee State Parks",
    description:
      "A 950-acre state park on the shores of Patrick Henry Lake, named for the Great Indian Warrior Path that Cherokee and other Indigenous peoples used for centuries. Features hiking, camping, golfing, marina, and swimming.",
    keyFacts: [
      "950 acres on Patrick Henry Lake",
      "Named for the Great Indian Warrior Path",
      "Established 1952",
      "National Recreation Trail designation",
      "Hiking, camping, golf course, marina, swimming pool",
    ],
    historicalSignificance:
      "The park's name honors the ancient trail system that connected Cherokee settlements across the Southeast, a reminder of the deep Indigenous history of this land.",
    trailStop: false,
  },
  {
    slug: "fort-patrick-henry",
    name: "Fort Patrick Henry",
    location:
      "Near Long Island of the Holston, Kingsport, TN (original site under Eastman Chemical Company)",
    community: "Kingsport",
    coordinates: { lat: 36.545, lng: -82.535 },
    established: "1776",
    description:
      "Built after the Battle of Island Flats (July 20, 1776), Fort Patrick Henry served as the primary military fortification on the Holston River frontier. Colonel John Donelson departed from near this fort in December 1779 for the voyage to the Cumberland settlements. The original site is now under Eastman Chemical Company property. A THC highway marker is the only physical commemoration.",
    keyFacts: [
      "Built 1776 after Battle of Island Flats",
      "Primary military fortification on Holston River frontier",
      "Donelson departed from near here for Cumberland voyage, December 22, 1779",
      "Original site now under Eastman Chemical Company",
      "THC highway marker only — no physical remains",
    ],
    historicalSignificance:
      "Fort Patrick Henry was the military anchor of the frontier during the Revolutionary era. Its story is told in heritage trail materials though no physical site remains for visitors.",
    trailStop: false,
  },
];

export function getHeritageSiteBySlug(slug: string): HeritageSite | undefined {
  return heritageSites.find((s) => s.slug === slug);
}

export function getTrailStops(): HeritageSite[] {
  return heritageSites.filter((s) => s.trailStop);
}
