export interface Commissioner {
  name: string;
  district: number;
  address: string;
  phone?: string;
  email?: string;
  photo?: string;
}

export const commissioners: Commissioner[] = [
  // District 1
  {
    name: "David Hayes",
    district: 1,
    address: "1005 Flatwoods Rd, Bluff City, TN 37618",
    phone: "423-276-4296",
    email: "David.Hayes@sullivancountytn.gov",
    photo: "/images/commissioners/david-hayes.jpg",
  },

  // District 2
  {
    name: "David Akard III",
    district: 2,
    address: "215 Donegal Way, Bristol, TN 37620",
    phone: "423-797-1704",
    email: "David.Akard@sullivancountytn.gov",
    photo: "/images/commissioners/david-akard.png",
  },
  {
    name: "Cheryl Harvey",
    district: 2,
    address: "1108 Mountain Vista Dr, Bristol, TN 37620",
    email: "Cheryl.Harvey@sullivancountytn.gov",
    photo: "/images/commissioners/cheryl-harvey.jpg",
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
    photo: "/images/commissioners/andrew-cross.jpg",
  },

  // District 4
  {
    name: "Michael Cole",
    district: 4,
    address: "743 Big Hollow Road, Blountville, TN 37617",
    phone: "423-360-0079",
    email: "Michael.Cole@sullivancountytn.gov",
    photo: "/images/commissioners/michael-cole.jpg",
  },
  {
    name: "Joyce Crosswhite",
    district: 4,
    address: "PO Box 77, Blountville, TN 37617",
    phone: "423-323-9338",
    email: "Joyce.Crosswhite@sullivancountytn.gov",
    photo: "/images/commissioners/joyce-crosswhite.jpg",
  },
  {
    name: "Tony Leonard",
    district: 4,
    address: "417 Garden Grove Dr, Bristol, TN 37620",
    phone: "423-340-0614",
    email: "Tony.Leonard@sullivancountytn.gov",
    photo: "/images/commissioners/tony-leonard.jpg",
  },

  // District 5
  {
    name: "Hershel Glover",
    district: 5,
    address: "488 Possum Creek Rd, Bluff City, TN 37618",
    phone: "423-502-1781",
    email: "Hershel.Glover@sullivancountytn.gov",
    photo: "/images/commissioners/hershel-glover.jpg",
  },
  {
    name: "Dwight King",
    district: 5,
    address: "1665 Weaver Branch Rd, Piney Flats, TN 37686",
    phone: "423-335-0850",
    email: "Dwight.King@sullivancountytn.gov",
    photo: "/images/commissioners/dwight-king.jpg",
  },

  // District 6
  {
    name: "Daniel Horne",
    district: 6,
    address: "840 Island Rd, Kingsport, TN 37660",
    phone: "423-212-0289",
    email: "Daniel.Horne@sullivancountytn.gov",
    photo: "/images/commissioners/daniel-horne.jpg",
  },
  {
    name: "Jessica Means",
    district: 6,
    address: "277 Spurgeon Rd, Blountville, TN 37617",
    phone: "423-384-5813",
    email: "Jessica.Means@sullivancountytn.gov",
    photo: "/images/commissioners/jessica-means.jpg",
  },
  {
    name: "Zane Vanover",
    district: 6,
    address: "1101 New Beason Well Rd, Kingsport, TN 37660",
    phone: "423-817-0589",
    email: "Zane.Vanover@sullivancountytn.gov",
    photo: "/images/commissioners/zane-vanover.jpg",
  },

  // District 7
  {
    name: "Samuel Jones",
    district: 7,
    address: "6329 Heatherwood Ln, Kingsport, TN 37663",
    phone: "423-956-3197",
    email: "Sam.Jones@sullivancountytn.gov",
    photo: "/images/commissioners/samuel-jones.jpg",
  },
  {
    name: "Travis Ward",
    district: 7,
    address: "530 Dogwood Ln, Kingsport, TN 37663",
    phone: "423-292-0248",
    email: "TWard@scsotn.com",
    photo: "/images/commissioners/travis-ward.jpg",
  },

  // District 8
  {
    name: "Darlene Calton",
    district: 8,
    address: "759 Summerville Rd, Kingsport, TN 37663",
    phone: "423-239-5363",
    email: "Darlene.Calton@sullivancountytn.gov",
    photo: "/images/commissioners/darlene-calton.jpg",
  },
  {
    name: "Mark Ireson",
    district: 8,
    address: "400 Wagon Wheel Ln, Kingsport, TN 37663",
    phone: "423-239-3905",
    email: "Mark.Ireson@sullivancountytn.gov",
    photo: "/images/commissioners/mark-ireson.jpg",
  },

  // District 9
  {
    name: "Joe Carr",
    district: 9,
    address: "408 Berkeley Rd, Kingsport, TN 37660",
    email: "Joe.Carr@sullivancountytn.gov",
    photo: "/images/commissioners/joe-carr.jpg",
  },
  {
    name: "Joe McMurray",
    district: 9,
    address: "2105 Heatherly Rd, Kingsport, TN 37660",
    phone: "423-482-1506",
    email: "Joseph.McMurray@sullivancountytn.gov",
    photo: "/images/commissioners/joe-mcmurray.jpg",
  },

  // District 10
  {
    name: "Larry Crawford",
    district: 10,
    address: "1609 Forest View Dr, Kingsport, TN 37660",
    phone: "423-245-1754",
    email: "Larry.Crawford@sullivancountytn.gov",
    photo: "/images/commissioners/larry-crawford.jpg",
  },
  {
    name: "Gary Stidham",
    district: 10,
    address: "4810 Silver Ct, Kingsport, TN 37664",
    phone: "423-914-2990",
    email: "Gary.Stidham@sullivancountytn.gov",
    photo: "/images/commissioners/gary-stidham.jpg",
  },

  // District 11
  {
    name: "John Gardner",
    district: 11,
    address: "2120 Montrose Ave, Kingsport, TN 37664",
    phone: "423-361-0092",
    email: "John.Gardner@sullivancountytn.gov",
    photo: "/images/commissioners/john-gardner.jpg",
  },
  {
    name: "Hunter Locke",
    district: 11,
    address: "PO Box 917, Kingsport, TN 37662",
    email: "Hunter.Locke@sullivancountytn.gov",
    photo: "/images/commissioners/hunter-locke.jpg",
  },
  {
    name: "Archie Pierce",
    district: 11,
    address: "1504 Bridwell, Kingsport, TN 37664",
    phone: "(423) 247-5330",
    photo: "/images/commissioners/archie-pierce.jpg",
  },
];

export function getCommissionersByDistrict(district: number): Commissioner[] {
  return commissioners.filter((c) => c.district === district);
}
