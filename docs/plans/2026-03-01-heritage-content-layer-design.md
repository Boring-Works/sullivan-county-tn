# Sullivan County Website — Heritage Content Layer Design

**Date:** 2026-03-01
**Brand Thesis:** Where Tennessee Began and Begins
**Scope:** 20 new routes + 8 existing page updates
**Source of Truth:** Fact-checked master reference document (3 phases of verification)

---

## 1. Architecture Overview

The existing government portal gains three new content wings (Heritage, Communities, Civic) plus a visitor-facing hub. All new pages use the existing design system (Libre Caslon + Outfit, navy/copper/brass/sage palette, mountain dividers, scroll-reveal animations, editorial card patterns).

### Content Source

All historical claims are sourced exclusively from:
- `compass_artifact_wf-e7361f8f-d40b-4bcd-8d42-4ba9245a7028_text_markdown.md` (master reference, 3x fact-checked)
- Phase 3 additions verified through dual-methodology fact-checking

No unverified claims. No marketing superlatives. Factual, editorial, authoritative tone.

---

## 2. New Routes

### 2.1 Heritage & History Wing

#### `/history` — The Founding Story
Long-form authority page. The SEO engine for "where did Tennessee start" and "Sullivan County history."

**Content sections:**
1. Hero with "Where Tennessee Began and Begins" tagline + 1790 | 2026 device
2. Pre-contact narrative — Cherokee homeland, Great Indian Warrior Path, Long Island as sacred ground
3. European settlement — William Bean (1769), James Robertson, Watauga Association (1772)
4. County formation — October 1779, named for General John Sullivan, NC General Assembly
5. Overmountain Men — Sycamore Shoals muster (Sept 25, 1780), Kings Mountain (Oct 7, 1780)
6. Southwest Territory — Rocky Mount as first capital (Oct 1790–early 1792), William Blount, territorial census 35,691
7. Statehood — Tennessee admitted June 1, 1796
8. Antebellum era — stagecoach culture, Old Deery Inn, Netherland Inn, Great Stage Road (TN-126)
9. Civil War — "The Little Confederacy," Battle of Blountville (Sept 22, 1863), Union sentiment
10. Industrialization — Kingsport Model City (1917), Tennessee Eastman (1920), Bristol Sessions (1927)
11. Modern era — BAE Systems, Ballad Health, Bristol Motor Speedway
12. "The ground is the artifact" — closing section linking past to present

**SEO targets:** "Sullivan County history," "where did Tennessee start," "Southwest Territory capital," "Overmountain Men Tennessee"

**JSON-LD:** HistoricalEvent schema for territorial capital period

#### `/history/rocky-mount` — Rocky Mount State Historic Site
**Content:** William Cobb settlement (~1770), building dates to 1820s, Southwest Territory capital (Oct 1790–early 1792), Blount's letters describing the house, living history interpretation set in 1791, enslaved labor narrative, Barsheba Cobb. NRHP info, visitor details.

#### `/history/blountville` — Blountville & Old Deery Inn
**Content:** County seat since 1795, Tennessee's only unincorporated county seat, courthouse (1853), Old Deery Inn (Samuel Deery acquired 1801, 19 rooms, 8 coaches/53 teams by 1821, hosted Jackson/Polk/Andrew Johnson), Great Stage Road (TN-126), Battle of Blountville 1863. NRHP #73001838, 1973. HABS TN-167.

#### `/history/long-island` — Long Island of the Holston
**Content:** Cherokee sacred ground, council site on Great Indian Warrior Path, confluence of North and South Forks. Treaty of Long Island (1777, Avery Treaty). Donelson departure Dec 22, 1779. National Historic Landmark 1960. Kingsport returned 3.61 acres to Eastern Band of Cherokee Indians in 1976. Current industrial use by Eastman. Honest Cherokee narrative per brand plan Part 12.

#### `/history/netherland-inn` — Netherland Inn & Kingsport Origins
**Content:** Gilbert Christian bought land 1775 (Walnut Hill, 850 acres). William King acquired 3.5 acres + boatyard. Richard Netherland purchased at sheriff's auction 1818. 14 stagecoach visits/week. Kingsport charter petition signed at inn; TN General Assembly passed charter Aug 21, 1822. Jordan and Jane (enslaved people). 814-acre Long Island plantation (Margaret Woods inheritance, Dearborn Treaty 1806). NRHP 1969. Complex: inn, Bank Barn, replica flatboat, relocated log cabins. Volunteer-run, seasonal hours May–Dec.

#### `/history/exchange-place` — Exchange Place Living History Farm
**Content:** Saddle-bag style farmstead, 4812 Orebank Road. John A. Gaines operated 1816–1845 (War of 1812 veteran). Preston family followed. Donated 1970 to Netherland Inn Association. NRHP 1971. Living history interpretation, seasonal events. Enslaved labor context (plantation-scale operation, specific documentation not yet located).

#### `/history/timeline` — Interactive Sullivan County Timeline
**Content:** 30+ dated events from master document timeline appendix:
- 1769: William Bean settles on Boone Creek
- 1772: Watauga Association formed
- 1775: Treaty of Sycamore Shoals
- 1776: Battle of Island Flats (July 20)
- 1777: Treaty of Long Island (Avery Treaty)
- 1779: Sullivan County established (October); Donelson departs Long Island (Dec 22)
- 1780: Overmountain Men muster at Sycamore Shoals (Sept 25); Battle of Kings Mountain (Oct 7)
- 1790: Southwest Territory created; Rocky Mount becomes capital (October)
- 1791: First territorial census (35,691); Treaty of Holston
- 1795: County seat moves to Blountville
- 1796: Tennessee statehood (June 1)
- 1801: Samuel Deery acquires Deery Inn
- 1818: Netherland purchases inn at sheriff's auction
- 1822: Kingsport charter (Aug 21)
- 1853: Sullivan County Courthouse built
- 1863: Battle of Blountville (Sept 22)
- 1917: Kingsport Model City design by John Nolen
- 1920: Tennessee Eastman founded
- 1927: Bristol Sessions (July 25–Aug 5)
- 1960: Long Island designated National Historic Landmark
- 1961: Bristol Motor Speedway opens
- 1969: Netherland Inn listed on NRHP
- 1971: Exchange Place listed on NRHP
- 1973: Old Deery Inn listed on NRHP
- 1976: Kingsport returns 3.61 acres of Long Island to Eastern Band of Cherokee Indians
- 1994: Bristol Motor Speedway expanded to 146,000 seats
- 1996: Tennessee statehood bicentennial
- 2023: BAE Systems $8.8B Holston AAP contract; TRI Airport record 448,514 passengers

**Component:** Vertical alternating timeline with era groupings, color-coded categories (settlement, government, military, commerce, modern), mountain dividers between eras, scroll-reveal entry animations.

### 2.2 Communities Wing

#### `/communities` — Hub Page
Grid of community cards (like department cards) with population, incorporation date, and key identifier. Links to individual pages.

#### `/communities/kingsport`
**Content:** Pop ~55,442. "Model City" — John Nolen's 1917 planned industrial city. Eastman Chemical HQ (Fortune 500, ~14,000 employees worldwide). Bays Mountain Park (3,550 acres, largest city-owned park in TN). Netherland Inn. Warriors' Path State Park. BTES 10-gigabit fiber. I-81/I-26 junction. Named for William King's boatyard at Long Island.

#### `/communities/bristol`
**Content:** Pop ~27,147. Twin city straddling TN-VA border (State Street). "Birthplace of Country Music" — Bristol Sessions (July 25–Aug 5, 1927, Ralph Peer, Victor Talking Machine Co, Jimmie Rodgers, Carter Family). Bristol Motor Speedway (146,000 seats). King University. Steele Creek Park (2,200+ acres). Bristol Rhythm and Roots Reunion (30,000–45,000 attendees).

#### `/communities/blountville`
**Content:** Tennessee's only unincorporated county seat. Named for William Blount. County seat since 1795. Sullivan County Courthouse (1853, oldest courthouse in continuous use in NE TN). Northeast State Community College (95-acre campus). Tri-Cities Airport (TRI). Old Deery Inn. Anderson Townhouse (NRHP, oldest frame house in TN, moved from original location). Blountville Historic District.

#### `/communities/bluff-city`
**Content:** Pop ~1,756. Overmountain Victory National Historic Trail crossing at Choates Ford. Boone Lake access. Rural character. Gateway to South Holston Lake area.

#### `/communities/piney-flats`
**Content:** Unincorporated community. Home to Rocky Mount State Historic Site. Rural agricultural heritage. Century Farms presence (Cobb farm documented 1775).

#### `/communities/colonial-heights`
**Content:** Census-designated place. Commercial corridor along US-11W. Gateway between Kingsport and Bristol.

### 2.3 Civic & Economic Pages

#### `/about` — About Sullivan County
**Content:** County overview, geography (413 sq mi, 3 physiographic regions), demographics snapshot (pop 158,163 / 2020 Census, ~162,700 / 2024 est), median age 45.4, median household income $56,802, racial composition. Tri-Cities regional context (MSA 307,613, CSA 508,260). FIPS 47163. Named for General John Sullivan.

#### `/education` — Education
**Content:** Three school systems: Sullivan County Schools (15 schools, ~8,082 students), Bristol TN City Schools (9 schools, 4,082), Kingsport City Schools (13 schools, 7,600+, TVAAS Level 5 eight consecutive years). Higher ed: Northeast State Community College (5,400–6,600 students), King University (NCAA Division II). UT-TSU Extension / Ron Ramsey Regional Agriculture Center.

#### `/economic-development` — Economic Development
**Content:** Top employers table (Eastman $9.4B revenue, BAE Systems $8.8B contract, Ballad Health 3 hospitals, Holston AAP). Sector employment data (healthcare ~10,666, retail ~10,006, manufacturing ~9,861). NETWORKS Sullivan Partnership. BTES 10-gigabit community. I-81/I-26 logistics corridor. Tri-Cities Airport within county borders. Median household income and workforce data.

#### `/transportation` — Transportation & Infrastructure
**Content:** Tri-Cities Airport (record 448,514 passengers 2023, Allegiant/American/Delta/United). Interstate access (I-81, I-26). Major highways (US-11W, US-421, US-19W, TN-126 Great Stage Road). Public transit (KATS, Bristol Transit, NET Trans). BTES fiber infrastructure.

#### `/visit` — Plan Your Visit
**Content:** Heritage site directory with hours/admission/directions. Heritage Trail concept (Rocky Mount → Blountville → Netherland Inn → Exchange Place → Long Island). Parks & recreation (South Holston Lake, Boone Lake, Warriors' Path, Bays Mountain, Steele Creek, Appalachian Caverns). Outdoor activities. Bristol events (BMS, Rhythm and Roots). Practical info (airport, hotels, driving directions).

### 2.4 People

#### `/people` — Notable People of Sullivan County
**Content from master doc Section 11:**
- Isaac Shelby — first governor of Kentucky, Sullivan County militia commander at Kings Mountain
- Tennessee Ernie Ford — born Fordtown (Bristol area), "Sixteen Tons," Presidential Medal of Freedom
- Harry Coover — invented Super Glue at Tennessee Eastman, Kingsport
- Bobby Dodd — College Football Hall of Fame, from Kingsport
- Brownie McGhee — blues musician, born Walter McGhee in Kingsport
- George L. Carter — railroad builder, Kingsport founder, established Milligan College
- Joseph Rogers Anderson — Tredegar Iron Works, Bluff City native
- Hank Williams — performed at Bristol, connected to country music heritage

---

## 3. Existing Page Updates

### Homepage (`/`)
1. **HeroBanner**: Update population stat from 156,000 to 158,000+. Add "Where Tennessee Began and Begins" as secondary tagline (replace current italic subtitle). Change "Where Tennessee Began" button from external link to internal `/history`.
2. **AboutSection**: Enrich with heritage context. Add link to `/history`. Update population reference.
3. **CommunityHighlights**: Replace 3 emoji cards with 4–5 internal-linking heritage/community cards (Rocky Mount, Kingsport, Bristol, Heritage Trail, BMS). Remove external-only links.
4. **Add HeritageHighlight section**: New section between About and QuickServices showcasing the "Began and Begins" duality.

### Commissioners (`/commissioners`)
- Add district structure explanation (24 members, 11 districts)
- Add committee assignment info if available
- Note missing contact info for commissioners without phones/emails

### Calendar (`/calendar`)
- Add county holiday closure dates for 2026
- Add election dates
- Add LEPC meeting schedule (from EMA department data)

### Contact (`/contact`)
- Add Trustee quick-contact card (Angela Taylor)
- Add Public Library quick-contact
- Add TTY/relay service number

### QuickServices (homepage)
- Add GIS/Property Lookup link
- Consider adding Court Records link

### News (`/news`)
- Add 6–10 articles based on verifiable county milestones:
  - BAE Systems $8.8B Holston AAP contract (2023)
  - Tri-Cities Airport passenger record (2023)
  - Ballad Health operations update
  - Sullivan County property reappraisal (2025)
  - Heritage site seasonal openings

---

## 4. New Data Files

### `src/data/heritage-sites.ts`
```typescript
interface HeritageSite {
  name: string;
  slug: string;
  location: string;
  community: string;
  coordinates: { lat: number; lng: number };
  nrhp?: { number: string; year: number };
  nhl?: { year: number };
  hours?: string;
  admission?: string;
  description: string;
  keyFacts: string[];
  image?: string;
}
```

### `src/data/timeline.ts`
```typescript
interface TimelineEvent {
  year: number;
  month?: number;
  day?: number;
  title: string;
  description: string;
  category: 'settlement' | 'government' | 'military' | 'commerce' | 'culture' | 'modern';
  siteSlug?: string;
}
```

### `src/data/communities.ts`
```typescript
interface Community {
  name: string;
  slug: string;
  type: 'city' | 'town' | 'cdp' | 'unincorporated';
  population?: number;
  populationYear?: number;
  incorporated?: number;
  tagline: string;
  description: string;
  landmarks: string[];
  keyFacts: string[];
}
```

### `src/data/notable-people.ts`
```typescript
interface NotablePerson {
  name: string;
  years: string;
  connection: string;
  achievement: string;
  category: 'politics' | 'military' | 'music' | 'science' | 'sports' | 'industry';
}
```

### `src/data/employers.ts`
```typescript
interface Employer {
  name: string;
  employees: string;
  sector: string;
  notes: string;
}
```

### `src/data/education.ts`
```typescript
interface SchoolSystem {
  name: string;
  type: 'k12' | 'community-college' | 'university' | 'extension';
  schools?: number;
  enrollment: string;
  website?: string;
  notes: string;
}
```

---

## 5. New Components

| Component | Pattern Based On | Purpose |
|-----------|-----------------|---------|
| `HeritageHero` | HeroBanner | History page hero with brand tagline + 1790/2026 device |
| `TimelineSection` | Custom | Vertical alternating timeline with era dividers |
| `TimelineEvent` | Custom | Individual timeline entry (left/right alternating) |
| `HeritageSiteCard` | DepartmentCard | Heritage site card with NRHP badge, location, hours |
| `HistoryNarrative` | Custom | Long-form editorial content with pull quotes + citations |
| `CommunityCard` | DepartmentCard | Community card with population, type badge |
| `CommunityDetail` | DepartmentDetail | Community page with banner, facts sidebar, narrative |
| `PersonCard` | CommissionerCard | Notable person card with achievement + era |
| `EmployerTable` | Custom | Sortable employer table |
| `VisitorInfoCard` | ContactCard | Heritage site visitor info (hours, admission, map link) |
| `StatsSidebar` | StatItem | Demographics/data sidebar for about pages |

---

## 6. Navigation Updates

### SiteNav mega-menu additions:
- **About** dropdown: About Sullivan County, Communities, People, Education, Economic Development, Transportation
- **History** dropdown: The Founding Story, Rocky Mount, Blountville, Netherland Inn, Exchange Place, Long Island, Timeline
- **Visit** link: Plan Your Visit (heritage trail, parks, events)

### SiteFooter: Add History, Communities, Visit links

### Search Index: Add all new pages to `data/search-index.ts`

---

## 7. Build Phases

### Phase 1: Data Layer + History Hub (Foundation)
- Create all 6 new data files
- Build `/history` main page
- Build `/history/timeline`
- Update homepage hero + AboutSection

### Phase 2: Heritage Site Pages
- Build 5 individual history pages (rocky-mount, blountville, long-island, netherland-inn, exchange-place)
- Build HeritageHero, HeritageSiteCard, HistoryNarrative, VisitorInfoCard components

### Phase 3: Communities Wing
- Build `/communities` hub + 6 individual community pages
- Build CommunityCard, CommunityDetail components

### Phase 4: Civic Pages + People
- Build `/about`, `/education`, `/economic-development`, `/transportation`
- Build `/people` notable people page
- Build `/visit` visitor hub

### Phase 5: Existing Page Updates
- Homepage enhancements (hero, about, community highlights)
- Commissioner, calendar, contact, news updates
- Navigation + search index updates
- Sitemap + SEO metadata

---

## 8. Content Integrity

All content flows from the triple-verified master reference document. The content pipeline is:

```
Master Reference Doc (3x fact-checked)
  → Data files (src/data/*.ts)
    → Components (render verified facts)
      → Routes (compose into pages)
```

No content is written ad-hoc in components. Every historical claim traces back to the master document and its 40+ APA references.
