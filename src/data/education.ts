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
