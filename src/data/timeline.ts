export type TimelineCategory =
  | "settlement"
  | "government"
  | "military"
  | "commerce"
  | "culture"
  | "modern";

export interface TimelineEvent {
  year: number;
  month?: number;
  day?: number;
  title: string;
  description: string;
  category: TimelineCategory;
  siteSlug?: string;
}

export const CATEGORY_LABELS: Record<TimelineCategory, string> = {
  settlement: "Settlement & Frontier",
  government: "Government & Law",
  military: "Military & Conflict",
  commerce: "Commerce & Industry",
  culture: "Culture & Society",
  modern: "Modern Era",
};

export const CATEGORY_COLORS: Record<TimelineCategory, string> = {
  settlement: "brand-copper",
  government: "brand-navy",
  military: "brand-safety",
  commerce: "brand-sage",
  culture: "brand-brass",
  modern: "brand-community",
};

export const timelineEvents: TimelineEvent[] = [
  {
    year: 1761,
    title: "Fort Robinson and the Island Road",
    description:
      "Colonel William Byrd's troops build Fort Robinson and the Island Road at Long Island of the Holston.",
    category: "military",
    siteSlug: "long-island",
  },
  {
    year: 1769,
    title: "First permanent settlement",
    description:
      "William Bean builds a cabin on Boone Creek, becoming one of the first permanent European settlers in what is now Tennessee.",
    category: "settlement",
  },
  {
    year: 1771,
    title: "Shelby's Fort established",
    description:
      "Evan Shelby establishes Shelby's Fort at Sapling Grove, the site of present-day Bristol.",
    category: "settlement",
  },
  {
    year: 1772,
    title: "Watauga Association formed",
    description:
      "Frontier settlers form the Watauga Association, one of the earliest attempts at self-government west of the Appalachian Mountains.",
    category: "government",
  },
  {
    year: 1775,
    title: "Treaty of Sycamore Shoals",
    description:
      "The Transylvania Purchase — Richard Henderson negotiates the purchase of vast tracts of Cherokee land. Not all Cherokee leaders agreed to the sale.",
    category: "government",
  },
  {
    year: 1776,
    month: 7,
    day: 20,
    title: "Battle of Island Flats",
    description:
      "Settlers defend against a Cherokee siege near Long Island of the Holston. Fort Patrick Henry is subsequently established.",
    category: "military",
    siteSlug: "fort-patrick-henry",
  },
  {
    year: 1777,
    title: "Treaty of Long Island",
    description:
      "The Avery Treaty is signed on Long Island of the Holston following the Cherokee War, ceding large portions of Cherokee land.",
    category: "government",
    siteSlug: "long-island",
  },
  {
    year: 1779,
    month: 10,
    title: "Sullivan County created",
    description:
      "Sullivan County is established by act of the North Carolina General Assembly, named for General John Sullivan. It is the second-oldest county in Tennessee.",
    category: "government",
  },
  {
    year: 1779,
    month: 12,
    day: 22,
    title: "Donelson departs for Cumberland",
    description:
      "Colonel John Donelson assembles settlers at Long Island and departs for the voyage that would establish Nashville.",
    category: "settlement",
    siteSlug: "long-island",
  },
  {
    year: 1780,
    month: 2,
    day: 7,
    title: "First county court organized",
    description:
      "Sullivan County's first court is organized, establishing civil governance on the frontier.",
    category: "government",
  },
  {
    year: 1780,
    month: 9,
    day: 25,
    title: "Overmountain Men muster",
    description:
      "Frontier militia from Sullivan and surrounding counties muster at Sycamore Shoals for the march to Kings Mountain.",
    category: "military",
  },
  {
    year: 1780,
    month: 10,
    day: 7,
    title: "Battle of Kings Mountain",
    description:
      "The Overmountain Men defeat Major Patrick Ferguson's Loyalist forces at Kings Mountain, South Carolina — a turning point of the Revolutionary War.",
    category: "military",
  },
  {
    year: 1784,
    title: "State of Franklin period begins",
    description:
      "Western North Carolina counties attempt to form an independent state, the State of Franklin (1784–1788). The effort ultimately fails.",
    category: "government",
  },
  {
    year: 1790,
    month: 10,
    title: "Southwest Territory capital established",
    description:
      "Governor William Blount — a signer of the U.S. Constitution, appointed by President George Washington — establishes the Southwest Territory's capital at Rocky Mount.",
    category: "government",
    siteSlug: "rocky-mount",
  },
  {
    year: 1791,
    title: "First territorial census",
    description:
      "The first census of the Southwest Territory counts 35,691 residents, including 3,417 enslaved people and 361 free people of color.",
    category: "government",
  },
  {
    year: 1792,
    title: "Capital moves to Knoxville",
    description:
      "Governor Blount relocates the territorial capital to White's Fort (Knoxville). The Blountville site is donated for the county seat.",
    category: "government",
  },
  {
    year: 1795,
    title: "Blountville established",
    description:
      "Blountville is officially established as the county seat of Sullivan County, a role it holds to this day as Tennessee's only unincorporated county seat.",
    category: "government",
    siteSlug: "blountville-historic-district",
  },
  {
    year: 1796,
    month: 6,
    day: 1,
    title: "Tennessee statehood",
    description: "Tennessee is admitted as the 16th state of the United States.",
    category: "government",
  },
  {
    year: 1801,
    title: "Deery Inn acquisition",
    description:
      "Samuel Deery acquires the inn property in Blountville that would become the principal stagecoach stop on the Great Stage Road.",
    category: "commerce",
    siteSlug: "old-deery-inn",
  },
  {
    year: 1818,
    title: "Netherland purchases inn",
    description:
      "Richard Netherland purchases King's Boatyard property at sheriff's auction and transforms it into the Netherland Inn.",
    category: "commerce",
    siteSlug: "netherland-inn",
  },
  {
    year: 1822,
    month: 8,
    day: 21,
    title: "Kingsport chartered",
    description:
      "The Tennessee General Assembly charters the City of Kingsport. The petition was signed at the Netherland Inn.",
    category: "government",
    siteSlug: "netherland-inn",
  },
  {
    year: 1853,
    title: "Courthouse and Bristol founding",
    description:
      "The present Sullivan County Courthouse is built in Blountville. Bristol is laid out by Joseph R. Anderson.",
    category: "government",
  },
  {
    year: 1856,
    month: 2,
    day: 22,
    title: "Bristol incorporated",
    description: "Bristol, Tennessee is officially incorporated.",
    category: "government",
  },
  {
    year: 1861,
    month: 6,
    day: 8,
    title: "Sullivan County votes for secession",
    description:
      "Sullivan County votes for secession 1,586 to 627 — one of few East Tennessee counties to support the Confederacy, earning it the nickname 'The Little Confederacy.'",
    category: "military",
  },
  {
    year: 1863,
    month: 9,
    day: 22,
    title: "Battle of Blountville",
    description:
      "Union and Confederate forces clash in Blountville. The courthouse is burned during the engagement.",
    category: "military",
    siteSlug: "blountville-historic-district",
  },
  {
    year: 1909,
    title: "Railroad reaches Kingsport",
    description:
      "The Carolina, Clinchfield and Ohio Railway reaches Kingsport, opening the region to industrial development.",
    category: "commerce",
  },
  {
    year: 1917,
    title: "Kingsport Model City",
    description:
      "Kingsport is incorporated as a planned industrial city designed by John Nolen — one of America's first planned 'Model Cities.'",
    category: "modern",
  },
  {
    year: 1920,
    month: 7,
    day: 17,
    title: "Tennessee Eastman founded",
    description:
      "Tennessee Eastman Corporation is founded in Kingsport, beginning the city's transformation into a major chemical manufacturing center.",
    category: "commerce",
  },
  {
    year: 1927,
    month: 7,
    day: 25,
    title: "Bristol Sessions begin",
    description:
      "Ralph Peer of the Victor Talking Machine Company begins recording sessions in Bristol — the 'Big Bang of Country Music.' Artists include Jimmie Rodgers and the Carter Family.",
    category: "culture",
  },
  {
    year: 1937,
    month: 11,
    day: 5,
    title: "Tri-Cities Airport dedicated",
    description:
      "McKellar Tri-City Airport (later Tri-Cities Airport) is dedicated in Blountville.",
    category: "modern",
  },
  {
    year: 1942,
    title: "Holston Ordnance Works established",
    description:
      "Holston Ordnance Works is established near Kingsport to produce RDX explosive for the war effort. Tennessee Eastman operates the facility under contract.",
    category: "military",
  },
  {
    year: 1950,
    title: "South Holston Dam completed",
    description:
      "The Tennessee Valley Authority completes South Holston Dam, creating the 7,580-acre South Holston Lake.",
    category: "modern",
  },
  {
    year: 1952,
    title: "Warriors' Path State Park established",
    description:
      "Warriors' Path State Park opens on the shores of Patrick Henry Lake, named for the Great Indian Warrior Path.",
    category: "modern",
    siteSlug: "warriors-path",
  },
  {
    year: 1960,
    title: "Long Island designated NHL",
    description:
      "Long Island of the Holston is designated a National Historic Landmark, recognizing its significance in Cherokee and American frontier history.",
    category: "culture",
    siteSlug: "long-island",
  },
  {
    year: 1961,
    month: 7,
    title: "Bristol Motor Speedway opens",
    description:
      "Bristol International Raceway (later Bristol Motor Speedway) opens, beginning the region's association with NASCAR and motorsports.",
    category: "culture",
  },
  {
    year: 1962,
    title: "Rocky Mount opens to public",
    description:
      "Rocky Mount State Historic Site opens to the public for tours and living history interpretation.",
    category: "culture",
    siteSlug: "rocky-mount",
  },
  {
    year: 1971,
    title: "Bays Mountain Park opens",
    description:
      "Bays Mountain Park and Planetarium opens in Kingsport — at 3,550 acres, it becomes the largest city-owned park in Tennessee.",
    category: "modern",
  },
  {
    year: 1975,
    month: 8,
    title: "I-81 completed through Sullivan County",
    description:
      "Interstate 81 is officially completed through Sullivan County, connecting the region to the national interstate highway system.",
    category: "modern",
  },
  {
    year: 1976,
    title: "Long Island land returned",
    description:
      "The City of Kingsport returns 3.61 acres of Long Island, described as 'sacred Cherokee ground,' to the Eastern Band of Cherokee Indians.",
    category: "culture",
    siteSlug: "long-island",
  },
  {
    year: 1980,
    title: "Overmountain Victory Trail designated",
    description:
      "The Overmountain Victory National Historic Trail is designated, commemorating the 1780 march to Kings Mountain.",
    category: "culture",
  },
  {
    year: 1994,
    month: 1,
    day: 1,
    title: "Eastman Chemical spun off",
    description:
      "Eastman Chemical Company is spun off from Eastman Kodak as an independent Fortune 500 company, headquartered in Kingsport.",
    category: "commerce",
  },
  {
    year: 1998,
    month: 10,
    day: 12,
    title: "Bristol designated Birthplace of Country Music",
    description:
      "The U.S. Congress officially designates Bristol as the 'Birthplace of Country Music.'",
    category: "culture",
  },
  {
    year: 2014,
    month: 8,
    day: 1,
    title: "Birthplace of Country Music Museum opens",
    description:
      "The Birthplace of Country Music Museum opens in Bristol, Virginia, adjacent to Sullivan County.",
    category: "culture",
  },
  {
    year: 2016,
    month: 9,
    day: 10,
    title: "Battle at Bristol",
    description:
      "Tennessee vs. Virginia Tech college football game at Bristol Motor Speedway draws 156,990 fans, the largest crowd to ever watch a college football game.",
    category: "culture",
  },
  {
    year: 2018,
    title: "Ballad Health formed",
    description:
      "Ballad Health is formed from the merger of Wellmont Health System and Mountain States Health Alliance, becoming the dominant regional healthcare system.",
    category: "modern",
  },
  {
    year: 2023,
    title: "BAE Systems $8.8B contract",
    description:
      "BAE Systems is awarded an $8.8 billion contract to operate the Holston Army Ammunition Plant.",
    category: "modern",
  },
  {
    year: 2023,
    title: "TRI Airport record",
    description: "Tri-Cities Airport sets a passenger record of 448,514 passengers.",
    category: "modern",
  },
  {
    year: 2025,
    title: "MLB Speedway Classic",
    description: "Major League Baseball holds the Speedway Classic at Bristol Motor Speedway.",
    category: "culture",
  },
];

export function getEventsByCategory(category: TimelineCategory): TimelineEvent[] {
  return timelineEvents.filter((e) => e.category === category);
}

export function getEventsByCentury(century: number): TimelineEvent[] {
  const start = (century - 1) * 100;
  const end = century * 100;
  return timelineEvents.filter((e) => e.year >= start && e.year < end);
}
