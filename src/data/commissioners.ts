export interface Commissioner {
  name: string;
  district: number;
  address: string;
  phone?: string;
  email?: string;
}

export const commissioners: Commissioner[] = [
  // District 1
  {
    name: "David Hayes",
    district: 1,
    address: "1005 Flatwoods Rd, Bluff City, TN 37618",
    phone: "423-276-4296",
    email: "David.Hayes@sullivancountytn.gov",
  },

  // District 2
  {
    name: "David Akard III",
    district: 2,
    address: "215 Donegal Way, Bristol, TN 37620",
    phone: "423-797-1704",
    email: "David.Akard@sullivancountytn.gov",
  },
  {
    name: "Cheryl Harvey",
    district: 2,
    address: "1108 Mountain Vist Dr, Bristol, TN 37620",
    email: "Cheryl.Harvey@sullivancountytn.gov",
  },
  {
    name: "Barry Hopper",
    district: 2,
    address: "133 Spanish Oak Rd, Bristol, TN 37620",
    phone: "423-341-3331",
    email: "Barry.Hopper@sullivancountytn.gov",
  },

  // District 3
  {
    name: "Andrew Cross",
    district: 3,
    address: "300 Maple Tree Dr, Bristol, TN 37620",
    phone: "423-341-3383",
    email: "Andrew.Cross@sullivancountytn.gov",
  },

  // District 4
  {
    name: "Michael Cole",
    district: 4,
    address: "743 Big Hollow Road, Blountville, TN 37617",
    phone: "423-360-0079",
    email: "Michael.Cole@sullivancountytn.gov",
  },
  {
    name: "Joyce Crosswhite",
    district: 4,
    address: "PO Box 77, Blountville, TN 37617",
    phone: "423-323-9338",
    email: "Joyce.Crosswhite@sullivancountytn.gov",
  },
  {
    name: "Tony Leonard",
    district: 4,
    address: "417 Garden Grove Dr, Bristol, TN 37620",
    phone: "423-340-0614",
    email: "Tony.Leonard@sullivancountytn.gov",
  },

  // District 5
  {
    name: "Hershel Glover",
    district: 5,
    address: "488 Possum Creek Rd, Bluff City, TN 37618",
    phone: "423-502-1781",
    email: "Hershel.Glover@sullivancountytn.gov",
  },
  {
    name: "Dwight King",
    district: 5,
    address: "1665 Weaver Branch Rd, Piney Flats, TN 37686",
    phone: "423-335-0850",
    email: "Dwight.King@sullivancountytn.gov",
  },

  // District 6
  {
    name: "Daniel Horne",
    district: 6,
    address: "840 Island Rd, Kingsport, TN 37660",
    phone: "423-212-0289",
    email: "Daniel.Horne@sullivancountytn.gov",
  },
  {
    name: "Jessica Means",
    district: 6,
    address: "277 Spurgeon Rd, Blountville, TN 37617",
    phone: "423-384-5813",
    email: "Jessica.Means@sullivancountytn.gov",
  },
  {
    name: "Zane Vanover",
    district: 6,
    address: "1101 New Beason Well Rd, Kingsport, TN 37660",
    phone: "423-817-0589",
    email: "Zane.Vanover@sullivancountytn.gov",
  },

  // District 7
  {
    name: "Samuel Jones",
    district: 7,
    address: "6329 Heatherwood Ln, Kingsport, TN 37663",
    phone: "423-956-3197",
    email: "Sam.Jones@sullivancountytn.gov",
  },
  {
    name: "Travis Ward",
    district: 7,
    address: "530 Dogwood Ln, Kingsport, TN 37663",
    phone: "423-292-0248",
    email: "TWard@scsotn.com",
  },

  // District 8
  {
    name: "Darlene Calton",
    district: 8,
    address: "759 Summerville Rd, Kingsport, TN 37663",
    phone: "423-239-5363",
    email: "Darlene.Calton@sullivancountytn.gov",
  },
  {
    name: "Mark Ireson",
    district: 8,
    address: "400 Wagon Wheel Ln, Kingsport, TN 37663",
    phone: "423-239-3905",
    email: "Mark.Ireson@sullivancountytn.gov",
  },

  // District 9
  {
    name: "Joe Carr",
    district: 9,
    address: "408 Berkeley Rd, Kingsport, TN 37660",
    email: "Joe.Carr@sullivancountytn.gov",
  },
  {
    name: "Joe McMurray",
    district: 9,
    address: "2105 Heatherly Rd, Kingsport, TN 37660",
    phone: "423-482-1506",
    email: "Joseph.McMurray@sullivancountytn.gov",
  },

  // District 10
  {
    name: "Larry Crawford",
    district: 10,
    address: "1609 Forest View Dr, Kingsport, TN 37660",
    phone: "423-245-1754",
    email: "Larry.Crawford@sullivancountytn.gov",
  },
  {
    name: "Gary Stidham",
    district: 10,
    address: "4810 Silver Ct, Kingsport, TN 37664",
    phone: "423-914-2990",
    email: "Gary.Stidham@sullivancountytn.gov",
  },

  // District 11
  {
    name: "John Gardner",
    district: 11,
    address: "2120 Montrose Ave, Kingsport, TN 37664",
    phone: "423-361-0092",
    email: "John.Gardner@sullivancountytn.gov",
  },
  {
    name: "Hunter Locke",
    district: 11,
    address: "PO Box 917, Kingsport, TN 37662",
    email: "Hunter.Locke@sullivancountytn.gov",
  },
  {
    name: "Archie Pierce",
    district: 11,
    address: "1504 Bridwell, Kingsport, TN 37664",
    phone: "(423) 247-5330",
  },
];

export function getCommissionersByDistrict(district: number): Commissioner[] {
  return commissioners.filter((c) => c.district === district);
}
