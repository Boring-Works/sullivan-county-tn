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
    achievement:
      "Inventor of Super Glue; National Medal of Technology and Innovation; National Inventors Hall of Fame",
    category: "science",
  },
  {
    name: "Bobby Dodd",
    years: "1908–1988",
    connection: "From Kingsport, Sullivan County",
    achievement:
      "College Football Hall of Fame (player at University of Tennessee; head coach at Georgia Tech, 165-64-8 record)",
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
    achievement:
      "Railroad builder; founder of Milligan College; instrumental in Kingsport's industrial development",
    category: "industry",
  },
  {
    name: "Joseph R. Anderson",
    years: "1813–1892",
    connection: "Bluff City native",
    achievement:
      "Head of Tredegar Iron Works in Richmond, Virginia — the Confederacy's primary iron manufacturer",
    category: "industry",
  },
];
