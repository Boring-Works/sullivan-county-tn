export interface Employer {
  name: string;
  sector: string;
  employees?: string;
  revenue?: string;
  notes: string;
}

export const topEmployers: Employer[] = [
  {
    name: "Eastman Chemical Company",
    sector: "Specialty chemicals",
    employees: "~14,000 worldwide",
    revenue: "~$9.4B",
    notes: "Global headquarters in Kingsport; Fortune 500; founded 1920",
  },
  {
    name: "Ballad Health",
    sector: "Healthcare",
    notes:
      "Regional system; 3 hospitals in Sullivan County; formed 2018 from Wellmont–Mountain States merger",
  },
  {
    name: "BAE Systems / HSAAP",
    sector: "Defense manufacturing",
    notes: "Holston Army Ammunition Plant; $8.8B contract awarded 2023",
  },
  {
    name: "Sullivan County Schools",
    sector: "Public education",
    employees: "~1,500",
    notes: "15 schools, ~8,082 students",
  },
  {
    name: "Kingsport City Schools",
    sector: "Public education",
    notes: "13 schools, 7,600+ students; TVAAS Level 5 eight consecutive years",
  },
  {
    name: "K-VA-T Food Stores (Food City)",
    sector: "Retail",
    notes: "Regional grocery chain",
  },
  {
    name: "Domtar",
    sector: "Linerboard manufacturing",
    notes: "Paper products",
  },
  {
    name: "Bell Textron",
    sector: "Aerospace services",
    notes: "Aircraft maintenance and modification",
  },
  {
    name: "Bristol Motor Speedway",
    sector: "Motorsports / entertainment",
    notes: "146,000 seats; NASCAR race weekends",
  },
  {
    name: "Pal's Sudden Service",
    sector: "Quick-service restaurants",
    notes: "Headquarters in Kingsport; Malcolm Baldrige National Quality Award 2001",
  },
  {
    name: "Bank of Tennessee",
    sector: "Financial services",
    notes: "Headquartered in Sullivan County",
  },
];

export const sectorEmployment = [
  { sector: "Healthcare & Social Assistance", employees: "~10,666" },
  { sector: "Retail Trade", employees: "~10,006" },
  { sector: "Manufacturing", employees: "~9,861" },
];
