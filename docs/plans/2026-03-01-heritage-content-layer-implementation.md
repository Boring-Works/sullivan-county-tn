# Heritage Content Layer — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build 20 new content pages (heritage, communities, civic, people, visit) + update 8 existing pages to make the Sullivan County government site the definitive Sullivan County resource on the internet.

**Architecture:** Static data files (`src/data/*.ts`) hold all fact-checked content from the master reference document. Reusable components render that data. File-based routes compose components into pages. Same design system (Libre Caslon + Outfit, navy/copper/brass/sage palette, MountainDivider, scroll-reveal). No database needed — content is relatively static.

**Tech Stack:** TanStack Start, TanStack Router (file-based), React 19, Tailwind v4, Biome, Cloudflare Workers, existing shadcn/ui components.

**Content Source:** All historical claims from `compass_artifact_wf-e7361f8f-d40b-4bcd-8d42-4ba9245a7028_text_markdown.md` (triple fact-checked master reference). No unverified claims.

---

## Phase 1: Data Layer + History Hub (Foundation)

### Task 1: Create Heritage Sites Data File

**Files:**
- Create: `src/data/heritage-sites.ts`

**Step 1: Create the data file with types and all heritage site entries**

```typescript
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
		coordinates: { lat: 36.5500, lng: -82.5400 },
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
		location: "Near Long Island of the Holston, Kingsport, TN (original site under Eastman Chemical Company)",
		community: "Kingsport",
		coordinates: { lat: 36.5450, lng: -82.5350 },
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
```

**Step 2: Verify no TypeScript errors**

Run: `cd "/Users/codyboring/CodyML/projects/Sullivan County/site" && npx tsc --noEmit src/data/heritage-sites.ts`

**Step 3: Commit**

```bash
git add src/data/heritage-sites.ts
git commit -m "feat: add heritage sites data file with 8 fact-checked sites"
```

---

### Task 2: Create Timeline Data File

**Files:**
- Create: `src/data/timeline.ts`

**Step 1: Create the timeline data file**

```typescript
export type TimelineCategory = "settlement" | "government" | "military" | "commerce" | "culture" | "modern";

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
	{ year: 1761, title: "Fort Robinson and the Island Road", description: "Colonel William Byrd's troops build Fort Robinson and the Island Road at Long Island of the Holston.", category: "military", siteSlug: "long-island" },
	{ year: 1769, title: "First permanent settlement", description: "William Bean builds a cabin on Boone Creek, becoming one of the first permanent European settlers in what is now Tennessee.", category: "settlement" },
	{ year: 1771, title: "Shelby's Fort established", description: "Evan Shelby establishes Shelby's Fort at Sapling Grove, the site of present-day Bristol.", category: "settlement" },
	{ year: 1772, title: "Watauga Association formed", description: "Frontier settlers form the Watauga Association, one of the earliest attempts at self-government west of the Appalachian Mountains.", category: "government" },
	{ year: 1775, title: "Treaty of Sycamore Shoals", description: "The Transylvania Purchase — Richard Henderson negotiates the purchase of vast tracts of Cherokee land. Not all Cherokee leaders agreed to the sale.", category: "government" },
	{ year: 1776, month: 7, day: 20, title: "Battle of Island Flats", description: "Settlers defend against a Cherokee siege near Long Island of the Holston. Fort Patrick Henry is subsequently established.", category: "military", siteSlug: "fort-patrick-henry" },
	{ year: 1777, title: "Treaty of Long Island", description: "The Avery Treaty is signed on Long Island of the Holston following the Cherokee War, ceding large portions of Cherokee land.", category: "government", siteSlug: "long-island" },
	{ year: 1779, month: 10, title: "Sullivan County created", description: "Sullivan County is established by act of the North Carolina General Assembly, named for General John Sullivan. It is the second-oldest county in Tennessee.", category: "government" },
	{ year: 1779, month: 12, day: 22, title: "Donelson departs for Cumberland", description: "Colonel John Donelson assembles settlers at Long Island and departs for the voyage that would establish Nashville.", category: "settlement", siteSlug: "long-island" },
	{ year: 1780, month: 2, day: 7, title: "First county court organized", description: "Sullivan County's first court is organized, establishing civil governance on the frontier.", category: "government" },
	{ year: 1780, month: 9, day: 25, title: "Overmountain Men muster", description: "Frontier militia from Sullivan and surrounding counties muster at Sycamore Shoals for the march to Kings Mountain.", category: "military" },
	{ year: 1780, month: 10, day: 7, title: "Battle of Kings Mountain", description: "The Overmountain Men defeat Major Patrick Ferguson's Loyalist forces at Kings Mountain, South Carolina — a turning point of the Revolutionary War.", category: "military" },
	{ year: 1784, title: "State of Franklin period begins", description: "Western North Carolina counties attempt to form an independent state, the State of Franklin (1784–1788). The effort ultimately fails.", category: "government" },
	{ year: 1790, month: 10, title: "Southwest Territory capital established", description: "Governor William Blount — a signer of the U.S. Constitution, appointed by President George Washington — establishes the Southwest Territory's capital at Rocky Mount.", category: "government", siteSlug: "rocky-mount" },
	{ year: 1791, title: "First territorial census", description: "The first census of the Southwest Territory counts 35,691 residents, including 3,417 enslaved people and 361 free people of color.", category: "government" },
	{ year: 1792, title: "Capital moves to Knoxville", description: "Governor Blount relocates the territorial capital to White's Fort (Knoxville). The Blountville site is donated for the county seat.", category: "government" },
	{ year: 1795, title: "Blountville established", description: "Blountville is officially established as the county seat of Sullivan County, a role it holds to this day as Tennessee's only unincorporated county seat.", category: "government", siteSlug: "blountville-historic-district" },
	{ year: 1796, month: 6, day: 1, title: "Tennessee statehood", description: "Tennessee is admitted as the 16th state of the United States.", category: "government" },
	{ year: 1801, title: "Deery Inn acquisition", description: "Samuel Deery acquires the inn property in Blountville that would become the principal stagecoach stop on the Great Stage Road.", category: "commerce", siteSlug: "old-deery-inn" },
	{ year: 1818, title: "Netherland purchases inn", description: "Richard Netherland purchases King's Boatyard property at sheriff's auction and transforms it into the Netherland Inn.", category: "commerce", siteSlug: "netherland-inn" },
	{ year: 1822, month: 8, day: 21, title: "Kingsport chartered", description: "The Tennessee General Assembly charters the City of Kingsport. The petition was signed at the Netherland Inn.", category: "government", siteSlug: "netherland-inn" },
	{ year: 1853, title: "Courthouse and Bristol founding", description: "The present Sullivan County Courthouse is built in Blountville. Bristol is laid out by Joseph R. Anderson.", category: "government" },
	{ year: 1856, month: 2, day: 22, title: "Bristol incorporated", description: "Bristol, Tennessee is officially incorporated.", category: "government" },
	{ year: 1861, month: 6, day: 8, title: "Sullivan County votes for secession", description: "Sullivan County votes for secession 1,586 to 627 — one of few East Tennessee counties to support the Confederacy, earning it the nickname 'The Little Confederacy.'", category: "military" },
	{ year: 1863, month: 9, day: 22, title: "Battle of Blountville", description: "Union and Confederate forces clash in Blountville. The courthouse is burned during the engagement.", category: "military", siteSlug: "blountville-historic-district" },
	{ year: 1909, title: "Railroad reaches Kingsport", description: "The Carolina, Clinchfield and Ohio Railway reaches Kingsport, opening the region to industrial development.", category: "commerce" },
	{ year: 1917, title: "Kingsport Model City", description: "Kingsport is incorporated as a planned industrial city designed by John Nolen — one of America's first planned 'Model Cities.'", category: "modern" },
	{ year: 1920, month: 7, day: 17, title: "Tennessee Eastman founded", description: "Tennessee Eastman Corporation is founded in Kingsport, beginning the city's transformation into a major chemical manufacturing center.", category: "commerce" },
	{ year: 1927, month: 7, day: 25, title: "Bristol Sessions begin", description: "Ralph Peer of the Victor Talking Machine Company begins recording sessions in Bristol — the 'Big Bang of Country Music.' Artists include Jimmie Rodgers and the Carter Family.", category: "culture" },
	{ year: 1937, month: 11, day: 5, title: "Tri-Cities Airport dedicated", description: "McKellar Tri-City Airport (later Tri-Cities Airport) is dedicated in Blountville.", category: "modern" },
	{ year: 1942, title: "Holston Ordnance Works established", description: "Holston Ordnance Works is established near Kingsport to produce RDX explosive for the war effort. Tennessee Eastman operates the facility under contract.", category: "military" },
	{ year: 1950, title: "South Holston Dam completed", description: "The Tennessee Valley Authority completes South Holston Dam, creating the 7,580-acre South Holston Lake.", category: "modern" },
	{ year: 1952, title: "Warriors' Path State Park established", description: "Warriors' Path State Park opens on the shores of Patrick Henry Lake, named for the Great Indian Warrior Path.", category: "modern", siteSlug: "warriors-path" },
	{ year: 1960, title: "Long Island designated NHL", description: "Long Island of the Holston is designated a National Historic Landmark, recognizing its significance in Cherokee and American frontier history.", category: "culture", siteSlug: "long-island" },
	{ year: 1961, month: 7, title: "Bristol Motor Speedway opens", description: "Bristol International Raceway (later Bristol Motor Speedway) opens, beginning the region's association with NASCAR and motorsports.", category: "culture" },
	{ year: 1962, title: "Rocky Mount opens to public", description: "Rocky Mount State Historic Site opens to the public for tours and living history interpretation.", category: "culture", siteSlug: "rocky-mount" },
	{ year: 1971, title: "Bays Mountain Park opens", description: "Bays Mountain Park and Planetarium opens in Kingsport — at 3,550 acres, it becomes the largest city-owned park in Tennessee.", category: "modern" },
	{ year: 1975, month: 8, title: "I-81 completed through Sullivan County", description: "Interstate 81 is officially completed through Sullivan County, connecting the region to the national interstate highway system.", category: "modern" },
	{ year: 1976, title: "Long Island land returned", description: "The City of Kingsport returns 3.61 acres of Long Island, described as 'sacred Cherokee ground,' to the Eastern Band of Cherokee Indians.", category: "culture", siteSlug: "long-island" },
	{ year: 1980, title: "Overmountain Victory Trail designated", description: "The Overmountain Victory National Historic Trail is designated, commemorating the 1780 march to Kings Mountain.", category: "culture" },
	{ year: 1994, month: 1, day: 1, title: "Eastman Chemical spun off", description: "Eastman Chemical Company is spun off from Eastman Kodak as an independent Fortune 500 company, headquartered in Kingsport.", category: "commerce" },
	{ year: 1998, month: 10, day: 12, title: "Bristol designated Birthplace of Country Music", description: "The U.S. Congress officially designates Bristol as the 'Birthplace of Country Music.'", category: "culture" },
	{ year: 2014, month: 8, day: 1, title: "Birthplace of Country Music Museum opens", description: "The Birthplace of Country Music Museum opens in Bristol, Virginia, adjacent to Sullivan County.", category: "culture" },
	{ year: 2016, month: 9, day: 10, title: "Battle at Bristol", description: "Tennessee vs. Virginia Tech college football game at Bristol Motor Speedway draws 156,990 fans, the largest crowd to ever watch a college football game.", category: "culture" },
	{ year: 2018, title: "Ballad Health formed", description: "Ballad Health is formed from the merger of Wellmont Health System and Mountain States Health Alliance, becoming the dominant regional healthcare system.", category: "modern" },
	{ year: 2023, title: "BAE Systems $8.8B contract", description: "BAE Systems is awarded an $8.8 billion contract to operate the Holston Army Ammunition Plant.", category: "modern" },
	{ year: 2023, title: "TRI Airport record", description: "Tri-Cities Airport sets a passenger record of 448,514 passengers.", category: "modern" },
	{ year: 2025, title: "MLB Speedway Classic", description: "Major League Baseball holds the Speedway Classic at Bristol Motor Speedway.", category: "culture" },
];

export function getEventsByCategory(category: TimelineCategory): TimelineEvent[] {
	return timelineEvents.filter((e) => e.category === category);
}

export function getEventsByCentury(century: number): TimelineEvent[] {
	const start = (century - 1) * 100;
	const end = century * 100;
	return timelineEvents.filter((e) => e.year >= start && e.year < end);
}
```

**Step 2: Commit**

```bash
git add src/data/timeline.ts
git commit -m "feat: add timeline data file with 47 fact-checked events"
```

---

### Task 3: Create Communities Data File

**Files:**
- Create: `src/data/communities.ts`

**Step 1: Create the communities data file**

```typescript
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
		landmarks: [
			"Overmountain Victory Trail crossing at Choates Ford",
			"Boone Lake access",
		],
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
		landmarks: [
			"Rocky Mount State Historic Site",
		],
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
```

**Step 2: Commit**

```bash
git add src/data/communities.ts
git commit -m "feat: add communities data file with 6 Sullivan County communities"
```

---

### Task 4: Create Notable People Data File

**Files:**
- Create: `src/data/notable-people.ts`

**Step 1: Create the data file**

```typescript
export type PersonCategory = "politics" | "military" | "music" | "science" | "sports" | "industry";

export interface NotablePerson {
	name: string;
	years: string;
	connection: string;
	achievement: string;
	category: PersonCategory;
}

export const PERSON_CATEGORY_LABELS: Record<PersonCategory, string> = {
	politics: "Politics & Government",
	military: "Military",
	music: "Music & Arts",
	science: "Science & Innovation",
	sports: "Sports",
	industry: "Industry & Commerce",
};

export const notablePeople: NotablePerson[] = [
	{
		name: "Isaac Shelby",
		years: "1750–1826",
		connection: "Led Sullivan County militia at Kings Mountain; later first governor of Kentucky",
		achievement: "Revolutionary War hero; first and fifth Governor of Kentucky",
		category: "military",
	},
	{
		name: "Tennessee Ernie Ford",
		years: "1919–1991",
		connection: "Born in Fordtown (Bristol area), Sullivan County",
		achievement: "Country and gospel singer; 'Sixteen Tons'; Presidential Medal of Freedom",
		category: "music",
	},
	{
		name: "Harry Coover",
		years: "1917–2011",
		connection: "Invented Super Glue (cyanoacrylate) at Tennessee Eastman in Kingsport",
		achievement: "Inventor of Super Glue; National Medal of Technology and Innovation; National Inventors Hall of Fame",
		category: "science",
	},
	{
		name: "Bobby Dodd",
		years: "1908–1988",
		connection: "From Kingsport, Sullivan County",
		achievement: "College Football Hall of Fame (player at University of Tennessee; head coach at Georgia Tech, 165-64-8 record)",
		category: "sports",
	},
	{
		name: "Brownie McGhee",
		years: "1915–1996",
		connection: "Born Walter McGhee in Kingsport",
		achievement: "Piedmont blues guitarist; partner of Sonny Terry; Blues Foundation Hall of Fame",
		category: "music",
	},
	{
		name: "George L. Carter",
		years: "1857–1936",
		connection: "Built the Carolina, Clinchfield and Ohio Railway into Kingsport",
		achievement: "Railroad builder; founder of Milligan College; instrumental in Kingsport's industrial development",
		category: "industry",
	},
	{
		name: "Joseph R. Anderson",
		years: "1813–1892",
		connection: "Bluff City native",
		achievement: "Head of Tredegar Iron Works in Richmond, Virginia — the Confederacy's primary iron manufacturer",
		category: "industry",
	},
];
```

**Step 2: Commit**

```bash
git add src/data/notable-people.ts
git commit -m "feat: add notable people data file with 7 verified historical figures"
```

---

### Task 5: Create Employers and Education Data Files

**Files:**
- Create: `src/data/employers.ts`
- Create: `src/data/education.ts`

**Step 1: Create employers data**

```typescript
export interface Employer {
	name: string;
	sector: string;
	employees?: string;
	revenue?: string;
	notes: string;
}

export const topEmployers: Employer[] = [
	{ name: "Eastman Chemical Company", sector: "Specialty chemicals", employees: "~14,000 worldwide", revenue: "~$9.4B", notes: "Global headquarters in Kingsport; Fortune 500; founded 1920" },
	{ name: "Ballad Health", sector: "Healthcare", notes: "Regional system; 3 hospitals in Sullivan County; formed 2018 from Wellmont–Mountain States merger" },
	{ name: "BAE Systems / HSAAP", sector: "Defense manufacturing", notes: "Holston Army Ammunition Plant; $8.8B contract awarded 2023" },
	{ name: "Sullivan County Schools", sector: "Public education", employees: "~1,500", notes: "15 schools, ~8,082 students" },
	{ name: "Kingsport City Schools", sector: "Public education", notes: "13 schools, 7,600+ students; TVAAS Level 5 eight consecutive years" },
	{ name: "K-VA-T Food Stores (Food City)", sector: "Retail", notes: "Regional grocery chain" },
	{ name: "Domtar", sector: "Linerboard manufacturing", notes: "Paper products" },
	{ name: "Bell Textron", sector: "Aerospace services", notes: "Aircraft maintenance and modification" },
	{ name: "Bristol Motor Speedway", sector: "Motorsports / entertainment", notes: "146,000 seats; NASCAR race weekends" },
	{ name: "Pal's Sudden Service", sector: "Quick-service restaurants", notes: "Headquarters in Kingsport; Malcolm Baldrige National Quality Award 2001" },
	{ name: "Bank of Tennessee", sector: "Financial services", notes: "Headquartered in Sullivan County" },
];

export const sectorEmployment = [
	{ sector: "Healthcare & Social Assistance", employees: "~10,666" },
	{ sector: "Retail Trade", employees: "~10,006" },
	{ sector: "Manufacturing", employees: "~9,861" },
];
```

**Step 2: Create education data**

```typescript
export type SchoolType = "k12" | "community-college" | "university" | "extension";

export interface SchoolSystem {
	name: string;
	type: SchoolType;
	schools?: number;
	enrollment: string;
	website?: string;
	notes: string;
}

export const schoolSystems: SchoolSystem[] = [
	{
		name: "Sullivan County Schools",
		type: "k12",
		schools: 15,
		enrollment: "~8,082",
		website: "https://www.sullivank12.net",
		notes: "County-wide school system serving unincorporated areas and smaller municipalities",
	},
	{
		name: "Kingsport City Schools",
		type: "k12",
		schools: 13,
		enrollment: "7,600+",
		website: "https://www.k12k.com",
		notes: "TVAAS Level 5 for eight consecutive years; nationally recognized",
	},
	{
		name: "Bristol Tennessee City Schools",
		type: "k12",
		schools: 9,
		enrollment: "4,082",
		website: "https://www.btcs.org",
		notes: "City school system for Bristol, Tennessee",
	},
	{
		name: "Northeast State Community College",
		type: "community-college",
		schools: 6,
		enrollment: "5,400–6,600",
		website: "https://www.northeaststate.edu",
		notes: "95-acre main campus in Blountville; 6 locations across the region",
	},
	{
		name: "King University",
		type: "university",
		enrollment: "~1,300–2,900",
		website: "https://www.king.edu",
		notes: "Presbyterian-affiliated; Bristol, Tennessee; NCAA Division II athletics",
	},
	{
		name: "UT-TSU Extension / Ron Ramsey Regional Agriculture Center",
		type: "extension",
		enrollment: "N/A",
		notes: "Agricultural extension services and 4-H programming for Sullivan County",
	},
];
```

**Step 3: Commit**

```bash
git add src/data/employers.ts src/data/education.ts
git commit -m "feat: add employers and education data files"
```

---

### Task 6: Build History Page Components

**Files:**
- Create: `src/components/history/HeritageHero.tsx`
- Create: `src/components/history/HistoryNarrative.tsx`

**Step 1: Create HeritageHero component**

The hero for `/history` — uses same patterns as HeroBanner (parallax, gradient overlays, fade-up animations) but with brand tagline.

```tsx
import { useEffect, useRef } from "react";
import { MountainDivider } from "~/components/shared/MountainDivider";

interface HeritageHeroProps {
	title: string;
	subtitle?: string;
	tagline?: string;
	backgroundImage?: string;
	backgroundAlt?: string;
}

export function HeritageHero({
	title,
	subtitle,
	tagline = "Where Tennessee Began and Begins",
	backgroundImage = "/images/hero/boone-lake-1920.jpg",
	backgroundAlt = "Sullivan County, Tennessee landscape",
}: HeritageHeroProps) {
	const heroRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		function handleScroll() {
			if (heroRef.current) {
				heroRef.current.style.setProperty("--scroll-y", `${window.scrollY}`);
			}
		}
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const currentYear = new Date().getFullYear();

	return (
		<section
			ref={heroRef}
			className="relative min-h-[70vh] flex flex-col overflow-hidden bg-brand-navy"
		>
			<img
				src={backgroundImage}
				alt={backgroundAlt}
				width={1920}
				height={1080}
				fetchPriority="high"
				decoding="async"
				className="absolute inset-0 w-full h-full object-cover"
				style={{ transform: "translateY(calc(var(--scroll-y, 0) * 0.3px))" }}
			/>

			<div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/30" />
			<div className="absolute inset-0 bg-gradient-to-r from-brand-navy/60 via-brand-navy/30 to-transparent" />

			<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-brass to-transparent opacity-40" />

			<div className="relative z-10 flex-1 flex items-center px-6 pt-24 pb-32 sm:px-8 lg:px-12">
				<div className="mx-auto w-full max-w-7xl">
					<div className="max-w-3xl">
						{/* Two Dates device */}
						<div className="mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
							<span className="inline-flex items-center gap-3 font-display text-sm font-bold tracking-widest text-brand-brass/80">
								1790 <span className="h-px w-6 bg-brand-brass/40" /> {currentYear}
							</span>
						</div>

						<h1
							className="font-display text-4xl font-bold tracking-tight text-white leading-[1.1] opacity-0 animate-fade-up sm:text-6xl lg:text-7xl"
							style={{ animationDelay: "0.2s" }}
						>
							{title}
						</h1>

						<div
							className="mt-5 h-0.5 w-16 origin-left bg-gradient-to-r from-brand-copper via-brand-brass to-brand-brass/20 opacity-0 animate-line-grow sm:w-24"
							style={{ animationDelay: "0.35s" }}
						/>

						{subtitle && (
							<p
								className="mt-5 max-w-xl font-accent text-base italic leading-relaxed text-white/70 opacity-0 animate-fade-up sm:text-xl"
								style={{ animationDelay: "0.55s" }}
							>
								{subtitle}
							</p>
						)}

						<p
							className="mt-4 font-body text-sm tracking-widest uppercase text-brand-brass/60 opacity-0 animate-fade-up"
							style={{ animationDelay: "0.7s" }}
						>
							{tagline}
						</p>
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 z-20">
				<MountainDivider fill="#ffffff" />
			</div>
		</section>
	);
}
```

**Step 2: Create HistoryNarrative component**

```tsx
import { useScrollReveal } from "~/hooks/useScrollReveal";

interface HistoryNarrativeProps {
	eyebrow?: string;
	title: string;
	children: React.ReactNode;
	id?: string;
	background?: "white" | "parchment";
}

export function HistoryNarrative({
	eyebrow,
	title,
	children,
	id,
	background = "white",
}: HistoryNarrativeProps) {
	const containerRef = useScrollReveal<HTMLElement>();
	const bg = background === "parchment" ? "bg-brand-parchment" : "bg-white";

	return (
		<section id={id} ref={containerRef} className={`${bg} py-16 sm:py-20`}>
			<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
				<div data-reveal>
					{eyebrow && (
						<span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
							{eyebrow}
						</span>
					)}
					<h2 className="font-display text-2xl font-bold text-brand-navy leading-tight sm:text-3xl lg:text-4xl">
						{title}
					</h2>
					<div className="mt-4 h-px w-20 bg-gradient-to-r from-brand-copper to-brand-brass/40" />
				</div>
				<div
					data-reveal
					data-reveal-delay={120}
					className="mt-8 font-body text-base leading-relaxed text-brand-slate-light space-y-5 sm:text-lg [&_strong]:text-brand-navy [&_strong]:font-semibold"
				>
					{children}
				</div>
			</div>
		</section>
	);
}
```

**Step 3: Commit**

```bash
git add src/components/history/HeritageHero.tsx src/components/history/HistoryNarrative.tsx
git commit -m "feat: add HeritageHero and HistoryNarrative components"
```

---

### Task 7: Build Heritage Site Card and Visitor Info Components

**Files:**
- Create: `src/components/history/HeritageSiteCard.tsx`
- Create: `src/components/history/VisitorInfoCard.tsx`

**Step 1: Create HeritageSiteCard**

```tsx
import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import type { HeritageSite } from "~/data/heritage-sites";

interface HeritageSiteCardProps {
	site: HeritageSite;
	index?: number;
}

export function HeritageSiteCard({ site, index = 0 }: HeritageSiteCardProps) {
	return (
		<Link
			to="/history/$slug"
			params={{ slug: site.slug }}
			data-reveal
			data-reveal-delay={index * 100}
			className="card-lift group relative flex flex-col rounded-sm border border-brand-surface bg-white overflow-hidden"
		>
			<div className="h-1 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
			<div className="flex-1 p-6">
				<div className="flex items-start justify-between gap-3 mb-3">
					<h3 className="font-display text-lg font-bold text-brand-navy group-hover:text-brand-copper transition-colors">
						{site.name}
					</h3>
					{site.nrhp && (
						<span className="shrink-0 inline-flex items-center rounded-full bg-brand-sage/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-brand-sage">
							NRHP {site.nrhp.year}
						</span>
					)}
					{site.nhl && (
						<span className="shrink-0 inline-flex items-center rounded-full bg-brand-brass/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-brand-brass">
							NHL {site.nhl.year}
						</span>
					)}
				</div>
				<div className="flex items-center gap-1.5 mb-3 text-brand-stone">
					<MapPin className="size-3.5" />
					<span className="font-body text-xs">{site.community}</span>
				</div>
				<p className="font-body text-sm leading-relaxed text-brand-slate-light line-clamp-3">
					{site.historicalSignificance}
				</p>
				<div className="mt-4 font-body text-xs font-semibold text-brand-copper group-hover:text-brand-copper-light transition-colors">
					Read the full story &rarr;
				</div>
			</div>
		</Link>
	);
}
```

**Step 2: Create VisitorInfoCard**

```tsx
import { Clock, DollarSign, ExternalLink, MapPin } from "lucide-react";
import type { HeritageSite } from "~/data/heritage-sites";

interface VisitorInfoCardProps {
	site: HeritageSite;
}

export function VisitorInfoCard({ site }: VisitorInfoCardProps) {
	return (
		<div className="rounded-sm border border-brand-surface bg-brand-parchment p-6">
			<h3 className="font-display text-lg font-bold text-brand-navy mb-4">Visitor Information</h3>
			<dl className="space-y-3 font-body text-sm">
				<div className="flex items-start gap-3">
					<MapPin className="size-4 text-brand-copper mt-0.5 shrink-0" />
					<div>
						<dt className="font-semibold text-brand-navy">Location</dt>
						<dd className="text-brand-slate-light">{site.location}</dd>
					</div>
				</div>
				{site.hours && (
					<div className="flex items-start gap-3">
						<Clock className="size-4 text-brand-copper mt-0.5 shrink-0" />
						<div>
							<dt className="font-semibold text-brand-navy">Hours</dt>
							<dd className="text-brand-slate-light">{site.hours}</dd>
						</div>
					</div>
				)}
				{site.admission && (
					<div className="flex items-start gap-3">
						<DollarSign className="size-4 text-brand-copper mt-0.5 shrink-0" />
						<div>
							<dt className="font-semibold text-brand-navy">Admission</dt>
							<dd className="text-brand-slate-light">{site.admission}</dd>
						</div>
					</div>
				)}
				{site.website && (
					<div className="flex items-start gap-3">
						<ExternalLink className="size-4 text-brand-copper mt-0.5 shrink-0" />
						<div>
							<dt className="font-semibold text-brand-navy">Website</dt>
							<dd>
								<a
									href={site.website}
									target="_blank"
									rel="noopener noreferrer"
									className="text-brand-copper hover:text-brand-copper-light transition-colors"
								>
									{site.website.replace(/^https?:\/\//, "")}
								</a>
							</dd>
						</div>
					</div>
				)}
				{site.operator && (
					<div className="mt-3 pt-3 border-t border-brand-surface">
						<p className="text-xs text-brand-stone">Operated by {site.operator}</p>
					</div>
				)}
			</dl>
		</div>
	);
}
```

**Step 3: Commit**

```bash
git add src/components/history/HeritageSiteCard.tsx src/components/history/VisitorInfoCard.tsx
git commit -m "feat: add HeritageSiteCard and VisitorInfoCard components"
```

---

### Task 8: Build Timeline Component

**Files:**
- Create: `src/components/history/TimelineSection.tsx`

**Step 1: Create the timeline component**

```tsx
import { Link } from "@tanstack/react-router";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { CATEGORY_COLORS, CATEGORY_LABELS, type TimelineEvent } from "~/data/timeline";

interface TimelineSectionProps {
	events: TimelineEvent[];
	title?: string;
}

export function TimelineSection({ events, title }: TimelineSectionProps) {
	const containerRef = useScrollReveal<HTMLDivElement>();

	return (
		<div ref={containerRef} className="relative">
			{title && (
				<h3
					data-reveal
					className="font-display text-xl font-bold text-brand-navy mb-8 text-center sm:text-2xl"
				>
					{title}
				</h3>
			)}

			{/* Vertical line */}
			<div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-brand-brass/40 via-brand-copper/30 to-brand-brass/40 sm:left-1/2" />

			<div className="space-y-8">
				{events.map((event, i) => {
					const isLeft = i % 2 === 0;
					const colorClass = CATEGORY_COLORS[event.category];

					return (
						<div
							key={`${event.year}-${event.title}`}
							data-reveal
							data-reveal-delay={Math.min(i * 60, 300)}
							className={`relative flex items-start gap-4 sm:gap-0 ${
								isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
							}`}
						>
							{/* Dot on line */}
							<div className="absolute left-4 top-2 sm:left-1/2 -translate-x-1/2 z-10">
								<div className={`h-3 w-3 rounded-full bg-${colorClass} ring-4 ring-white`} />
							</div>

							{/* Content */}
							<div
								className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${
									isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8"
								}`}
							>
								<div className="rounded-sm border border-brand-surface bg-white p-4 shadow-sm">
									<div className="flex items-center gap-2 mb-1 flex-wrap">
										<span className="font-display text-lg font-bold text-brand-navy">
											{event.year}
										</span>
										<span className={`inline-flex items-center rounded-full bg-${colorClass}/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-${colorClass}`}>
											{CATEGORY_LABELS[event.category]}
										</span>
									</div>
									<h4 className="font-display text-sm font-bold text-brand-navy mb-1">
										{event.title}
									</h4>
									<p className="font-body text-xs leading-relaxed text-brand-slate-light">
										{event.description}
									</p>
									{event.siteSlug && (
										<Link
											to="/history/$slug"
											params={{ slug: event.siteSlug }}
											className="mt-2 inline-block font-body text-[11px] font-semibold text-brand-copper hover:text-brand-copper-light transition-colors"
										>
											Visit site &rarr;
										</Link>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
```

**Step 2: Commit**

```bash
git add src/components/history/TimelineSection.tsx
git commit -m "feat: add TimelineSection component with alternating layout"
```

---

### Task 9: Build `/history` Route

**Files:**
- Create: `src/routes/history/index.tsx`

**Step 1: Create the history index route**

This is the long-form founding story page — the SEO authority page for "where did Tennessee start."

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { HeritageHero } from "~/components/history/HeritageHero";
import { HeritageSiteCard } from "~/components/history/HeritageSiteCard";
import { HistoryNarrative } from "~/components/history/HistoryNarrative";
import { MountainDivider, MountainDividerInverted } from "~/components/shared/MountainDivider";
import { getTrailStops } from "~/data/heritage-sites";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/history/")({
	component: HistoryPage,
	head: () => ({
		meta: seo({
			title: "The Founding Story — Sullivan County: Where Tennessee Began and Begins",
			description:
				"Sullivan County is where Tennessee's government began. Explore the founding story from Cherokee homeland to Southwest Territory capital to modern Appalachian community.",
			url: "/history",
		}),
		links: seoLinks("/history"),
	}),
});

function HistoryPage() {
	const trailStops = getTrailStops();

	return (
		<main id="main-content">
			<HeritageHero
				title="The Founding Story"
				subtitle="How a frontier county became the birthplace of Tennessee's government — and never stopped starting."
			/>

			<HistoryNarrative eyebrow="Before European Settlement" title="Cherokee Homeland" id="cherokee">
				<p>
					Long before Sullivan County bore its name, this land was Cherokee homeland. The Long Island of the Holston — at the confluence of the North and South Forks of the Holston River — was sacred ground: a council site, a gathering place, and a point on the Great Indian Warrior Path that connected Cherokee settlements across the Southeast.
				</p>
				<p>
					The island was designated a <strong>National Historic Landmark in 1960</strong>, recognizing its significance in Cherokee and American frontier history. In 1976, the City of Kingsport returned 3.61 acres of the island, described as "sacred Cherokee ground," to the Eastern Band of Cherokee Indians.
				</p>
				<p>
					"Where Tennessee Began" is a claim about governmental origins. But that government was established on land that had been Cherokee homeland for thousands of years. This story comes first, not last.
				</p>
			</HistoryNarrative>

			<MountainDivider fill="var(--color-brand-parchment)" />

			<HistoryNarrative eyebrow="1769–1779" title="Settlement and Formation" id="settlement" background="parchment">
				<p>
					In 1769, William Bean built a cabin on Boone Creek, becoming one of the first permanent European settlers in what is now Tennessee. Other settlers followed quickly — Evan Shelby established Shelby's Fort at Sapling Grove (present-day Bristol) in 1771, and by 1772 the frontier settlers had formed the <strong>Watauga Association</strong>, one of the earliest attempts at self-government west of the Appalachian Mountains.
				</p>
				<p>
					Sullivan County was established by act of the <strong>North Carolina General Assembly in October 1779</strong>, named for General John Sullivan of the Continental Army. It is the second-oldest county in Tennessee. The county's first court was organized on February 7, 1780, establishing civil governance on the frontier.
				</p>
			</HistoryNarrative>

			<MountainDividerInverted fill="var(--color-brand-parchment)" className="bg-white" />

			<HistoryNarrative eyebrow="1780" title="The Overmountain Men" id="overmountain">
				<p>
					On <strong>September 25, 1780</strong>, frontier militia from Sullivan and surrounding counties mustered at Sycamore Shoals for the march to Kings Mountain. These "Overmountain Men" crossed the mountains and on <strong>October 7, 1780</strong>, defeated Major Patrick Ferguson's Loyalist forces at the Battle of Kings Mountain, South Carolina — a turning point of the Revolutionary War.
				</p>
				<p>
					Isaac Shelby, who led the Sullivan County militia, would later become the first governor of Kentucky. The Overmountain Victory National Historic Trail, designated in 1980, commemorates their march.
				</p>
			</HistoryNarrative>

			<MountainDivider fill="var(--color-brand-parchment)" />

			<HistoryNarrative eyebrow="1790–1796" title="The Southwest Territory" id="territory" background="parchment">
				<p>
					In <strong>October 1790</strong>, Governor William Blount — a signer of the U.S. Constitution, appointed by President George Washington — established the Southwest Territory's capital at <strong>Rocky Mount</strong>, the home of William Cobb near present-day Piney Flats. Blount administered the territory from this site until relocating the capital to Knoxville in early 1792.
				</p>
				<p>
					The first territorial census, conducted in 1791, counted <strong>35,691 residents</strong>, including 3,417 enslaved people and 361 free people of color. The Southwest Territory was the political entity from which the State of Tennessee was born — admitted as the 16th state on <strong>June 1, 1796</strong>.
				</p>
				<p>
					The territorial government operated from a home sustained by enslaved labor. Rocky Mount's interpretive buildings include a slave cabin, acknowledging this foundational reality.
				</p>
			</HistoryNarrative>

			<MountainDividerInverted fill="var(--color-brand-parchment)" className="bg-white" />

			<HistoryNarrative eyebrow="1800s" title="The Stagecoach Era" id="antebellum">
				<p>
					As Blountville became the county seat in 1795, the <strong>Great Stage Road</strong> (present-day TN-126) transformed the village into a corridor of commerce and travel. Samuel Deery acquired the property that would become the <strong>Old Deery Inn</strong> in 1801 — by 1821, the inn hosted eight coaches and fifty-three teams of horses. Three sitting or future U.S. presidents — Andrew Jackson, James K. Polk, and Andrew Johnson — are documented as having visited.
				</p>
				<p>
					On the Holston River, William King's boatyard evolved into the <strong>Netherland Inn</strong> after Richard Netherland purchased the property at sheriff's auction in 1818. The inn received 14 stagecoach visits per week and hosted the signing of the petition for Kingsport's city charter, which the Tennessee General Assembly passed on <strong>August 21, 1822</strong>.
				</p>
				<p>
					At <strong>Exchange Place</strong> on Orebank Road, John A. Gaines — a War of 1812 veteran — operated a plantation and stagecoach exchange from 1816 to 1845. These sites collectively tell the story of Sullivan County as a crossroads of frontier commerce.
				</p>
			</HistoryNarrative>

			<MountainDivider fill="var(--color-brand-parchment)" />

			<HistoryNarrative eyebrow="1861–1865" title="The Civil War" id="civil-war" background="parchment">
				<p>
					Sullivan County stood apart from much of East Tennessee during the Civil War. On June 8, 1861, the county voted for secession <strong>1,586 to 627</strong> — one of the few East Tennessee counties to support the Confederacy, earning it the nickname <strong>"The Little Confederacy."</strong>
				</p>
				<p>
					On September 22, 1863, Union and Confederate forces clashed at the <strong>Battle of Blountville</strong>. The courthouse was burned during the engagement. The present courthouse, built in 1853, was subsequently rebuilt and remains in use today — the oldest courthouse in continuous use in northeast Tennessee.
				</p>
			</HistoryNarrative>

			<MountainDividerInverted fill="var(--color-brand-parchment)" className="bg-white" />

			<HistoryNarrative eyebrow="1900s–Present" title="The Modern Era" id="modern">
				<p>
					In 1917, Kingsport was incorporated as a planned industrial city designed by <strong>John Nolen</strong> — one of America's first "Model Cities." <strong>Tennessee Eastman Corporation</strong> was founded on July 17, 1920, beginning the city's transformation into a major chemical manufacturing center. Today, Eastman Chemical Company is a Fortune 500 corporation with approximately 14,000 employees worldwide and ~$9.4 billion in revenue, headquartered in Kingsport.
				</p>
				<p>
					On July 25, 1927, Ralph Peer of the Victor Talking Machine Company began the <strong>Bristol Sessions</strong> — recording Jimmie Rodgers, the Carter Family, and other artists in what has become known as the "Big Bang of Country Music." The U.S. Congress officially designated Bristol as the <strong>"Birthplace of Country Music"</strong> in 1998.
				</p>
				<p>
					Sullivan County continues to build on its legacy. Bristol Motor Speedway draws hundreds of thousands of fans annually. BAE Systems was awarded an <strong>$8.8 billion contract</strong> to operate the Holston Army Ammunition Plant in 2023. Tri-Cities Airport set a passenger record of <strong>448,514</strong> in 2023. The county's population stands at approximately <strong>158,163</strong> (2020 Census) — the most populous county in the Tri-Cities region.
				</p>
			</HistoryNarrative>

			{/* Heritage Sites grid */}
			<section className="bg-brand-parchment py-16 sm:py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-12 text-center">
						<span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
							Heritage Trail
						</span>
						<h2 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
							Explore the Sites
						</h2>
						<div className="mt-4 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-brand-copper to-transparent" />
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{trailStops.map((site, i) => (
							<HeritageSiteCard key={site.slug} site={site} index={i} />
						))}
					</div>
					<div className="mt-10 text-center">
						<Link
							to="/history/timeline"
							className="inline-flex items-center gap-2 rounded-sm bg-brand-copper px-6 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-brand-copper-light hover:shadow-lg"
						>
							View Full Timeline
							<span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
```

**Step 2: Verify build**

Run: `cd "/Users/codyboring/CodyML/projects/Sullivan County/site" && npm run build`

**Step 3: Commit**

```bash
git add src/routes/history/index.tsx
git commit -m "feat: add /history route — founding story with heritage trail"
```

---

### Task 10: Build `/history/timeline` Route

**Files:**
- Create: `src/routes/history/timeline.tsx`

**Step 1: Create the timeline route**

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { HeritageHero } from "~/components/history/HeritageHero";
import { TimelineSection } from "~/components/history/TimelineSection";
import { timelineEvents } from "~/data/timeline";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/history/timeline")({
	component: TimelinePage,
	head: () => ({
		meta: seo({
			title: "Sullivan County Timeline — 1761 to Present",
			description:
				"An interactive timeline of Sullivan County, Tennessee from Cherokee homeland through frontier settlement, the Southwest Territory, Civil War, industrialization, and the modern era.",
			url: "/history/timeline",
		}),
		links: seoLinks("/history/timeline"),
	}),
});

function TimelinePage() {
	// Group events into era ranges
	const frontier = timelineEvents.filter((e) => e.year < 1790);
	const territory = timelineEvents.filter((e) => e.year >= 1790 && e.year < 1800);
	const antebellum = timelineEvents.filter((e) => e.year >= 1800 && e.year < 1861);
	const civilWar = timelineEvents.filter((e) => e.year >= 1861 && e.year < 1866);
	const industrial = timelineEvents.filter((e) => e.year >= 1866 && e.year < 1950);
	const modern = timelineEvents.filter((e) => e.year >= 1950);

	return (
		<main id="main-content">
			<HeritageHero
				title="Sullivan County Timeline"
				subtitle="From Cherokee homeland to modern Appalachian community — over 250 years of history."
			/>

			<section className="bg-white py-16 sm:py-20">
				<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-20">
					<TimelineSection events={frontier} title="Frontier Era (1761–1789)" />
					<TimelineSection events={territory} title="Southwest Territory (1790–1799)" />
					<TimelineSection events={antebellum} title="Antebellum Era (1800–1860)" />
					<TimelineSection events={civilWar} title="Civil War (1861–1865)" />
					<TimelineSection events={industrial} title="Industrialization (1866–1949)" />
					<TimelineSection events={modern} title="Modern Era (1950–Present)" />
				</div>
			</section>
		</main>
	);
}
```

**Step 2: Commit**

```bash
git add src/routes/history/timeline.tsx
git commit -m "feat: add /history/timeline route with 47 events across 6 eras"
```

---

### Task 11: Build `/history/$slug` Route (Heritage Site Detail)

**Files:**
- Create: `src/routes/history/$slug.tsx`

**Step 1: Create the dynamic heritage site route**

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { HeritageHero } from "~/components/history/HeritageHero";
import { VisitorInfoCard } from "~/components/history/VisitorInfoCard";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { getHeritageSiteBySlug } from "~/data/heritage-sites";
import { timelineEvents } from "~/data/timeline";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/history/$slug")({
	component: HeritageSitePage,
	head: ({ params }) => {
		const site = getHeritageSiteBySlug(params.slug);
		return {
			meta: site
				? seo({
						title: `${site.name} — Sullivan County History`,
						description: site.historicalSignificance,
						url: `/history/${params.slug}`,
					})
				: [],
			links: site ? seoLinks(`/history/${params.slug}`) : [],
		};
	},
});

function HeritageSitePage() {
	const { slug } = Route.useParams();
	const site = getHeritageSiteBySlug(slug);
	const containerRef = useScrollReveal<HTMLDivElement>();

	if (!site) {
		return (
			<main id="main-content" className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
				<h1 className="text-2xl font-bold text-brand-navy">Site not found</h1>
				<p className="mt-2 text-brand-slate">This heritage site doesn't exist or may have been moved.</p>
				<Link
					to="/history"
					className="mt-6 inline-block rounded-sm bg-brand-copper px-6 py-2 text-sm font-medium text-white hover:bg-brand-copper-light transition-colors"
				>
					Back to History
				</Link>
			</main>
		);
	}

	const relatedEvents = timelineEvents.filter((e) => e.siteSlug === slug);

	return (
		<main id="main-content">
			<HeritageHero title={site.name} subtitle={site.historicalSignificance} />

			<section className="bg-white py-16 sm:py-20">
				<div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
						{/* Main content */}
						<div className="lg:col-span-2" data-reveal>
							<span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
								{site.established}
							</span>
							<h2 className="font-display text-2xl font-bold text-brand-navy mb-4 sm:text-3xl">
								About {site.name}
							</h2>
							<div className="h-px w-20 bg-gradient-to-r from-brand-copper to-brand-brass/40 mb-6" />
							<div className="font-body text-base leading-relaxed text-brand-slate-light space-y-4 sm:text-lg">
								<p>{site.description}</p>
							</div>

							{/* Key Facts */}
							<div className="mt-10">
								<h3 className="font-display text-xl font-bold text-brand-navy mb-4">Key Facts</h3>
								<ul className="space-y-2">
									{site.keyFacts.map((fact) => (
										<li key={fact} className="flex items-start gap-3 font-body text-sm text-brand-slate-light">
											<span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-brand-copper shrink-0" />
											{fact}
										</li>
									))}
								</ul>
							</div>

							{/* Related Timeline Events */}
							{relatedEvents.length > 0 && (
								<div className="mt-10">
									<h3 className="font-display text-xl font-bold text-brand-navy mb-4">Timeline</h3>
									<div className="space-y-3">
										{relatedEvents.map((event) => (
											<div key={`${event.year}-${event.title}`} className="flex gap-4 rounded-sm border border-brand-surface bg-brand-parchment p-4">
												<span className="font-display text-lg font-bold text-brand-copper shrink-0">{event.year}</span>
												<div>
													<h4 className="font-body text-sm font-semibold text-brand-navy">{event.title}</h4>
													<p className="font-body text-xs text-brand-slate-light mt-1">{event.description}</p>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Sidebar */}
						<div data-reveal data-reveal-delay={120} className="space-y-6">
							<VisitorInfoCard site={site} />

							<div className="rounded-sm border border-brand-surface bg-white p-6">
								<h3 className="font-display text-sm font-bold text-brand-navy mb-3">Explore More</h3>
								<div className="space-y-2">
									<Link to="/history" className="block font-body text-sm text-brand-copper hover:text-brand-copper-light transition-colors">
										&larr; The Founding Story
									</Link>
									<Link to="/history/timeline" className="block font-body text-sm text-brand-copper hover:text-brand-copper-light transition-colors">
										Full Timeline
									</Link>
									<Link to="/visit" className="block font-body text-sm text-brand-copper hover:text-brand-copper-light transition-colors">
										Plan Your Visit
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
```

**Step 2: Verify build**

Run: `cd "/Users/codyboring/CodyML/projects/Sullivan County/site" && npm run build`

**Step 3: Commit**

```bash
git add src/routes/history/\$slug.tsx
git commit -m "feat: add /history/\$slug dynamic route for heritage site detail pages"
```

---

### Task 12: Update Homepage

**Files:**
- Modify: `src/components/home/HeroBanner.tsx` (update population stat, add tagline)
- Modify: `src/components/home/AboutSection.tsx` (enrich content, link to /history)
- Modify: `src/components/home/CommunityHighlights.tsx` (replace with internal heritage links)

**Step 1: Update HeroBanner**
- Change `end={156000}` to `end={158000}` for Residents stat
- Change the italic tagline from "Second oldest county..." to "Where Tennessee Began and Begins"
- Change the "Where Tennessee Began" external link to internal `/history`

**Step 2: Update AboutSection**
- Update population from "over 156,000" to "over 158,000"
- Add brief heritage hook and Link to `/history`

**Step 3: Update CommunityHighlights**
- Replace external-only cards with internal-linking heritage/community cards
- Remove emojis, use Lucide icons instead
- Link to `/history/rocky-mount`, `/communities/kingsport`, `/communities/bristol`, `/history`, `/visit`

**Step 4: Verify build and commit**

```bash
npm run build
git add src/components/home/HeroBanner.tsx src/components/home/AboutSection.tsx src/components/home/CommunityHighlights.tsx
git commit -m "feat: update homepage with heritage branding and internal links"
```

---

## Phase 2: Communities Wing

### Task 13: Build `/communities` Hub Route

**Files:**
- Create: `src/components/communities/CommunityCard.tsx`
- Create: `src/routes/communities/index.tsx`

Pattern: Follow DepartmentCard / departments index.tsx patterns. CommunityCard shows name, type badge (city/town/cdp/unincorporated), population, tagline. Links to `/communities/$slug`.

**Commit:** `feat: add /communities hub route with community cards`

---

### Task 14: Build `/communities/$slug` Route

**Files:**
- Create: `src/routes/communities/$slug.tsx`

Pattern: Follow `/departments/$slug` pattern. Uses `getCommunityBySlug()`. Shows community detail with landmarks list, key facts, highlights grid. Links to related heritage sites.

**Commit:** `feat: add /communities/$slug dynamic route for community detail pages`

---

## Phase 3: Civic & People Pages

### Task 15: Build `/about` Route

**Files:**
- Create: `src/routes/about.tsx`

Content: County overview, geography (413 sq mi, 3 physiographic regions), demographics snapshot, Tri-Cities MSA context, FIPS code. Uses HeritageHero + HistoryNarrative pattern. Links to `/history`, `/communities`, `/economic-development`.

**Commit:** `feat: add /about route with county overview and demographics`

---

### Task 16: Build `/economic-development` Route

**Files:**
- Create: `src/routes/economic-development.tsx`

Content: Top employers table from `data/employers.ts`, sector employment breakdown, NETWORKS Sullivan Partnership, BTES 10-gigabit, I-81/I-26 logistics. Uses HeritageHero + table layout.

**Commit:** `feat: add /economic-development route with employer data`

---

### Task 17: Build `/education` Route

**Files:**
- Create: `src/routes/education.tsx`

Content: Three K-12 school systems + higher ed from `data/education.ts`. Card layout for each system. Links to external school websites.

**Commit:** `feat: add /education route with school systems and higher ed`

---

### Task 18: Build `/transportation` Route

**Files:**
- Create: `src/routes/transportation.tsx`

Content: Tri-Cities Airport (448,514 passengers), I-81/I-26, highways, public transit (KATS, Bristol Transit, NET Trans), BTES fiber.

**Commit:** `feat: add /transportation route with airport and transit info`

---

### Task 19: Build `/people` Route

**Files:**
- Create: `src/components/people/PersonCard.tsx`
- Create: `src/routes/people.tsx`

Content: Notable people grid from `data/notable-people.ts`. Card shows name, years, achievement, category badge. Grouped by category.

**Commit:** `feat: add /people route with 7 notable historical figures`

---

### Task 20: Build `/visit` Route

**Files:**
- Create: `src/routes/visit.tsx`

Content: Heritage Trail site cards, parks & recreation (South Holston Lake, Boone Lake, Warriors' Path, Bays Mountain, Steele Creek), outdoor activities, Bristol events, practical visitor info (airport, directions).

**Commit:** `feat: add /visit route with heritage trail and recreation info`

---

## Phase 4: Existing Page Updates

### Task 21: Update Navigation

**Files:**
- Modify: `src/components/layout/SiteNav.tsx` — Add About, History, Communities dropdowns to mega-menu
- Modify: `src/components/layout/SiteFooter.tsx` — Add History, Communities, Visit, About links

**Commit:** `feat: update navigation with heritage and community links`

---

### Task 22: Update Search Index

**Files:**
- Modify: `src/data/search-index.ts` — Add all new pages (history, communities, about, education, economic-dev, transportation, people, visit) to staticPages array

**Commit:** `feat: add new pages to search index`

---

### Task 23: Update Sitemap and RSS

**Files:**
- Run: `npx tsx scripts/generate-sitemap.ts` — Regenerate sitemap with new routes
- Run: `npx tsx scripts/generate-rss.ts` — Regenerate RSS if needed

**Commit:** `chore: regenerate sitemap with new routes`

---

### Task 24: Update Contact and Calendar Pages

**Files:**
- Modify: `src/routes/contact.tsx` — Add Trustee quick-contact card
- Modify: `src/routes/calendar.tsx` — Add county holiday closures data
- Modify: `src/data/quick-services.ts` — Add GIS/Property Lookup link

**Commit:** `feat: update contact with trustee card, calendar with holidays, add GIS quick link`

---

## Phase 5: Verify and Ship

### Task 25: Full Build and Link Audit

**Step 1:** Run `npm run build` — verify zero errors
**Step 2:** Run `npm run dev` — manually navigate every new route
**Step 3:** Check all internal links resolve (no 404s)
**Step 4:** Run `npm run lint` — verify Biome passes

**Commit:** `chore: verify build, fix any lint issues`

---

### Task 26: Deploy

**Step 1:** Run `npm run deploy` — deploy to Cloudflare Workers
**Step 2:** Verify deployed site at `https://sullivan-county-tn.codyboring.workers.dev`
**Step 3:** Spot-check `/history`, `/communities/kingsport`, `/history/timeline`, `/visit`

**Commit:** N/A (deploy only)

---

### Task 27: Update CLAUDE.md

**Files:**
- Modify: `/Users/codyboring/CodyML/projects/Sullivan County/site/CLAUDE.md`

Add all new routes, data files, and components to the project memory.

**Commit:** `docs: update CLAUDE.md with heritage content layer`

---

## Summary

| Phase | Tasks | New Files | What's Built |
|-------|-------|-----------|--------------|
| 1 | Tasks 1–12 | 6 data files, 5 components, 4 routes | Data layer, history hub, timeline, homepage updates |
| 2 | Tasks 13–14 | 1 component, 2 routes | Communities hub + 6 community pages |
| 3 | Tasks 15–20 | 1 component, 6 routes | About, econ dev, education, transportation, people, visit |
| 4 | Tasks 21–24 | 0 new (modify 6 existing) | Nav, search, sitemap, contact, calendar updates |
| 5 | Tasks 25–27 | 0 new | Build verify, deploy, project memory |

**Total:** 27 tasks, ~20 new files, 20 new routes, 8 existing page updates.
