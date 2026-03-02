export type DepartmentCategory =
  | "administrative"
  | "courts"
  | "public-safety"
  | "finance"
  | "operations"
  | "community";

export interface ContactInfo {
  phone: string;
  fax?: string;
  email?: string;
  address: string;
  hours: string;
}

export interface StaffMember {
  name: string;
  title: string;
  phone?: string;
  email?: string;
}

export interface Office {
  name: string;
  address: string;
  phone: string;
  fax?: string;
}

export interface ExternalLink {
  label: string;
  url: string;
}

export interface KeyDocument {
  name: string;
  url?: string;
  description?: string;
}

export interface MeetingSchedule {
  name: string;
  schedule: string;
  location?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BidThreshold {
  range: string;
  process: string;
}

export interface Publication {
  name: string;
  url?: string;
}

export interface Department {
  slug: string;
  name: string;
  category: DepartmentCategory;
  head: { name: string; title: string; photo?: string };
  contact: ContactInfo;
  description: string;
  services: string[];
  additionalOffices?: Office[];
  staff?: StaffMember[];
  externalLinks?: ExternalLink[];
  keyDocuments?: KeyDocument[];
  meetingSchedule?: MeetingSchedule[];
  faqItems?: FaqItem[];
  bidThresholds?: BidThreshold[];
  importantNotes?: string[];
  publications?: Publication[];
}

export const departments: Department[] = [
  // ─── Administrative ──────────────────────────────────────────────────
  {
    slug: "county-mayor",
    name: "County Mayor",
    category: "administrative",
    head: { name: "Richard S. Venable", title: "County Mayor", photo: "/images/officials/richard-venable.jpg" },
    contact: {
      phone: "(423) 323-6417",
      fax: "(423) 279-2897",
      email: "mayor@sullivancountytn.gov",
      address:
        "Financial Administration Building, 155 School Ave. Suite 233, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "Sullivan County is the second oldest county in Tennessee, established in 1779 with a population over 156,000 spanning 430+ square miles. The County Mayor serves as chief executive officer, welcoming residents and visitors and overseeing county operations.",
    services: [
      "County executive leadership",
      "Interdepartmental coordination",
      "Community engagement and constituent services",
      "Budget oversight",
      "Policy development",
    ],
  },
  {
    slug: "county-attorney",
    name: "County Attorney",
    category: "administrative",
    head: { name: "Dan Street", title: "County Attorney" },
    contact: {
      phone: "(423) 323-6481",
      fax: "(423) 279-2728",
      address: "3411 Hwy. 126 Suite 209, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "The County Attorney provides legal counsel to county leadership, commissioners, elected officials, and all county departments. The office reviews contracts, policies, ordinances, and resolutions for legal compliance.",
    services: [
      "Approve the form of county contracts",
      "Determine compliance of proposed policies with applicable laws",
      "Provide legal guidance to county leadership, commissioners, elected officials, and all departments",
      "Represent Sullivan County in legal proceedings",
      "Review and draft ordinances, resolutions, and state legislation relevant to county operations",
    ],
  },
  {
    slug: "county-clerk",
    name: "County Clerk",
    category: "administrative",
    head: { name: "Teresa Jacobs", title: "County Clerk" },
    contact: {
      phone: "(423) 323-6428",
      fax: "(423) 279-2725",
      address: "3258 Highway 126, Suite 101, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (Driver's License & Handgun Permits: 8am-4pm)",
    },
    description:
      "The County Clerk's office provides a wide range of services including vehicle and boat registration, marriage licenses, business licenses, driver's license renewals, REAL ID processing, and public records management. Marriage records date back to 1863.",
    services: [
      "Vehicle and boat registration",
      "Marriage licenses",
      "Business licenses",
      "Driver's License renewals and REAL ID processing",
      "Handgun permit renewal",
      "Notary Public applications",
      "County beer license applications",
      "County Commission secretary duties",
      "Public records management",
      "Online tag renewal",
      "Online business tax filing",
      "Online marriage applications",
      "Online notary applications",
      "In-house vehicle title printing",
    ],
    additionalOffices: [
      {
        name: "Kingsport Office",
        address: "408 Clay St, Kingsport, TN 37660",
        phone: "(423) 224-1790",
        fax: "(423) 224-1791",
      },
      {
        name: "Bristol Office",
        address: "801 Anderson Street, Bristol, TN 37621",
        phone: "(423) 989-4366",
        fax: "(423) 968-2080",
      },
    ],
    externalLinks: [
      { label: "County Clerk Website", url: "https://www.sullivancountyclerktn.com/" },
      { label: "Facebook", url: "https://www.facebook.com/JacobsforClerk" },
    ],
    keyDocuments: [
      {
        name: "Business Tax Notice #23-08",
        description: "Filing threshold increased to $100,000",
      },
      {
        name: "Hotel/Motel Tax Notice",
        description: "Hotel/motel tax requirements and filing information",
      },
    ],
  },

  // ─── Courts ──────────────────────────────────────────────────────────
  {
    slug: "chancery-court",
    name: "Chancery Court",
    category: "courts",
    head: { name: "Katharine Jennelle", title: "Chancellor" },
    contact: {
      phone: "(423) 323-6483",
      fax: "(423) 989-4362",
      address: "140 Blountville Bypass, P.O. Box 327, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "The Clerk and Master holds the dual role of Clerk of the Chancery Court and Master in Chancery, handling probate matters and related court functions. The Chancery Court also publishes the Sullivan County Rules of Local Practice.",
    services: [
      "Probate matters",
      "Chancery Court filings",
      "Clerk and Master services",
      "Court records management",
    ],
    additionalOffices: [
      {
        name: "Bristol Office",
        address: "801 Anderson Street, Room 239, Bristol, TN 37621",
        phone: "(423) 989-4363",
        fax: "(423) 989-4362",
      },
      {
        name: "Kingsport Office",
        address: "225 West Center Street, Kingsport, TN 37660",
        phone: "(423) 224-1726",
        fax: "(423) 224-1736",
      },
    ],
    externalLinks: [{ label: "Chancery Court Website", url: "https://sullivantnchancery.com/" }],
  },
  {
    slug: "circuit-court",
    name: "Circuit Court",
    category: "courts",
    head: { name: "Bobby L. Russell", title: "Circuit Court Clerk" },
    contact: {
      phone: "(423) 279-2752",
      fax: "(423) 323-3741",
      address: "Sullivan County Justice Center, 140 Blountville Bypass, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "The Circuit Court Clerk's Office manages all complaints, petitions, summonses, orders, and other documents relating to lawsuits or criminal actions filed in the court. Additional duties include collecting court fees, issuing warrants, maintaining jury records, and processing grand jury work.",
    services: [
      "Civil and criminal case management",
      "Court fees collection",
      "Warrant issuance",
      "Jury records maintenance",
      "Grand jury processing",
      "Docket publication for Blountville, Bristol, and Kingsport",
    ],
    additionalOffices: [
      {
        name: "Bristol Office (Law, General Sessions, Juvenile Courts)",
        address: "801 Anderson Street, Bristol, TN 37621",
        phone: "(423) 652-1030",
        fax: "(423) 968-1138",
      },
      {
        name: "Kingsport City Hall (Law Court)",
        address: "225 West Center Street, Kingsport, TN 37660",
        phone: "(423) 224-1724",
        fax: "(423) 246-1924",
      },
      {
        name: "Kingsport Justice Center (General Sessions & Juvenile)",
        address: "200 Shelby Street, Kingsport, TN 37660",
        phone: "(423) 224-1711",
        fax: "(423) 224-1766",
      },
    ],
  },
  {
    slug: "district-attorney",
    name: "District Attorney",
    category: "courts",
    head: { name: "Barry Staubus", title: "District Attorney" },
    contact: {
      phone: "(423) 279-3278",
      fax: "(423) 279-3290",
      address: "140 Blountville Bypass, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "The District Attorney serves as chief prosecutor for Sullivan County, representing the government in criminal prosecutions, reviewing evidence, filing charges, presenting cases in court, and collaborating with law enforcement and victims.",
    services: [
      "Criminal prosecution",
      "Evidence review and charge filing",
      "Court case presentation",
      "Law enforcement collaboration",
      "Victim advocacy coordination",
    ],
    externalLinks: [{ label: "District Attorney Website", url: "https://sullivancountyda.com/" }],
  },
  {
    slug: "public-defender",
    name: "Public Defender",
    category: "courts",
    head: { name: "Andrew J. Gibbons", title: "Public Defender" },
    contact: {
      phone: "(423) 323-1220",
      fax: "(423) 323-7172",
      address: "1329 Suite B Hwy. 394, Blountville, TN 37617",
      hours: "Monday-Friday, 8:00 AM-4:30 PM (closed designated holidays)",
    },
    description:
      "The Public Defender's office represents individuals who cannot afford private legal counsel, ensuring fair trials regardless of financial status. Services include legal advice, case investigation, plea negotiations, and court advocacy.",
    services: [
      "Represent individuals who cannot afford private legal counsel",
      "Ensure fair trials regardless of financial status",
      "Provide legal advice and case investigation",
      "Negotiate plea agreements",
      "Court advocacy for clients",
    ],
  },

  // ─── Public Safety ───────────────────────────────────────────────────
  {
    slug: "sheriff",
    name: "Sheriff",
    category: "public-safety",
    head: { name: "Jeff Cassidy", title: "Sheriff" },
    contact: {
      phone: "(423) 279-7500",
      address: "3411 TN-126, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays). Emergencies: 911",
    },
    description:
      "The Sheriff is the chief law enforcement officer responsible for maintaining public safety and upholding the law, protecting the community, overseeing law enforcement operations, and ensuring the fair and effective administration of justice.",
    services: [
      "Law enforcement and patrol",
      "Criminal investigations",
      "Public safety and community protection",
      "Court security",
      "Warrant service",
      "Emergency response (911)",
    ],
    externalLinks: [{ label: "Sheriff's Office Website", url: "https://www.scsotn.com/" }],
  },
  {
    slug: "emergency-management",
    name: "Emergency Management",
    category: "public-safety",
    head: { name: "Jim Bean", title: "Director" },
    contact: {
      phone: "(423) 323-6912",
      fax: "(423) 279-2816",
      email: "EMA@sullivancountytn.gov",
      address: "3193 Highway 126, Suite 101, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding holidays)",
    },
    description:
      "The Emergency Management Agency prepares and educates citizens while coordinating an integrated emergency management system across all emergency response organizations. Operations follow four phases: Mitigation, Preparedness, Response, and Recovery.",
    services: [
      "Emergency preparedness planning and education",
      "Disaster mitigation coordination",
      "Emergency response coordination",
      "Disaster recovery operations",
      "LEPC (Local Emergency Preparedness Council) facilitation",
      "Hazard Mitigation Plan management (multi-jurisdictional with Bluff City, Bristol, Kingsport)",
      "WebEOC system management",
      "Tier II Reporting",
    ],
    externalLinks: [
      { label: "TEMA", url: "https://www.tn.gov/tema.html" },
      { label: "FEMA Independent Study", url: "https://training.fema.gov/is/" },
      { label: "CDC Emergency Preparedness", url: "https://www.cdc.gov/prepyourhealth/" },
      { label: "National Weather Service (Morristown)", url: "https://www.weather.gov/mrx/" },
      { label: "Ready.gov", url: "https://www.ready.gov/" },
    ],
    meetingSchedule: [
      {
        name: "LEPC (Local Emergency Preparedness Council)",
        schedule: "3rd Wednesday of each month at 7:30 AM (except December)",
        location: "Blountville office",
      },
    ],
    keyDocuments: [
      {
        name: "Sullivan Hazard Mitigation Plan",
        description: "Multi-jurisdictional plan with Bluff City, Bristol, and Kingsport",
      },
      {
        name: "Sullivan LEPC By-Laws",
        description: "Governing by-laws for the Local Emergency Preparedness Council",
      },
    ],
  },
  {
    slug: "ems",
    name: "Emergency Medical Services",
    category: "public-safety",
    head: { name: "Sullivan County EMS", title: "Emergency Medical Services" },
    contact: {
      phone: "(423) 279-2812",
      fax: "(423) 279-2813",
      address: "3411 Hwy. 126, Suite 204, Blountville, TN 37617",
      hours: "24/7 dispatch. Administrative office: Monday-Friday, 8am-5pm. Emergencies: 911",
    },
    description:
      "Sullivan County EMS provides Advanced Life Support prehospital care, medically directed Technical Rescue, and transportation of the ill and injured throughout Sullivan County.",
    services: [
      "Advanced Life Support prehospital care",
      "Medically directed Technical Rescue",
      "Transportation of the ill and injured",
      "24/7 emergency dispatch",
    ],
    externalLinks: [{ label: "Pay Ambulance Bill", url: "https://sullivan.payambulance.com/" }],
  },
  {
    slug: "medical-examiner",
    name: "Medical Examiner / Coroner",
    category: "public-safety",
    head: { name: "William D. Hudson", title: "Chief Medical Examiner" },
    contact: {
      phone: "(423) 470-0325",
      email: "Coroner@sullivancountytn.gov",
      address: "3411 Hwy. 126, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "The Medical Examiner conducts medicolegal investigations of unattended, violent, unexpected, and suspicious deaths. Autopsy reports are typically completed within 75 days, with complex cases taking 90+ days. The office collaborates with law enforcement and the William L. Jenkins Forensic Center.",
    services: [
      "Medicolegal death investigations",
      "Autopsy reports",
      "Law enforcement collaboration",
      "Forensic analysis coordination with William L. Jenkins Forensic Center",
      "Death certificate guidance (obtained through Office of Vital Statistics or funeral home)",
    ],
  },

  // ─── Finance ─────────────────────────────────────────────────────────
  {
    slug: "finance-department",
    name: "Finance Department",
    category: "finance",
    head: { name: "Larry G. Bailey", title: "Director of Finance" },
    contact: {
      phone: "(423) 323-6409",
      email: "Larry.Bailey@sullivancountytn.gov",
      address: "Sullivan County Administration, 155 School Ave., Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (closed designated holidays)",
    },
    description:
      "The Finance Department maintains accounting records compliant with state/federal laws, GAAP, and GASB standards. The department has saved taxpayers $2.5M+ over four years through strategic debt management and maintains an 'AA' credit rating from Moody's.",
    services: [
      "County accounting records management (GAAP/GASB compliant)",
      "County department budget development (six-month process)",
      "Debt issuance, retirement, and refinancing",
      "Annual financial statement preparation (audited by Tennessee Comptroller)",
      "Bi-weekly payroll processing via direct deposit",
      "Payroll and benefits administration",
    ],
    staff: [
      {
        name: "Larry G. Bailey",
        title: "Director of Finance",
        phone: "(423) 323-6409",
        email: "Larry.Bailey@sullivancountytn.gov",
      },
      { name: "Payroll/Benefits Office", title: "Payroll & Benefits", phone: "(423) 323-6413" },
    ],
  },
  {
    slug: "fms-2020",
    name: "Financial Management System 2020",
    category: "finance",
    head: { name: "Larry G. Bailey", title: "Director" },
    contact: {
      phone: "(423) 323-6409",
      fax: "(423) 279-2899",
      email: "Larry.Bailey@sullivancountytn.gov",
      address:
        "Sullivan County Financial Administration Building, 155 School Ave., Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "The Finance Committee oversees budgeting, revenue forecasting, expenditure monitoring, and fiscal policy review under Sullivan County's Private Act (SB2937). The system emphasizes transparency and accountability in use of public funds.",
    services: [
      "Budgeting oversight",
      "Revenue forecasting",
      "Expenditure monitoring",
      "Fiscal policy review",
      "Public fund transparency and accountability",
    ],
  },
  {
    slug: "property-assessor",
    name: "Property Assessor",
    category: "finance",
    head: { name: "Donna Whitaker", title: "Property Assessor" },
    contact: {
      phone: "(423) 323-6455",
      fax: "(423) 279-2808",
      email: "donna.whitaker@sullivancountytn.gov",
      address: "3411 Hwy. 126, Suite 103, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "The Property Assessor discovers, lists, classifies, and values all real and personal property in Sullivan County. The office conducts statewide reappraisals, maintains ownership records, edits assessment maps, and prepares tax rolls for county and municipalities. Note: The Assessor does not set tax rates, send tax bills, or collect property taxes.",
    services: [
      "Discover, list, classify, and value all real and personal property",
      "Conduct statewide reappraisals",
      "Maintain ownership records",
      "Edit assessment maps",
      "Prepare tax rolls for county and municipalities",
      "Report to equalization boards",
      "Manage Greenbelt and Forestry assessments",
      "Property appeal and exemption filing guidance",
    ],
    externalLinks: [
      {
        label: "State of Tennessee Real Estate Assessment Data",
        url: "https://www.assessment.cot.tn.gov/",
      },
    ],
    faqItems: [
      {
        question: "Does the Property Assessor set tax rates?",
        answer:
          "No. The Assessor does not set tax rates, send tax bills, or collect property taxes. Those functions are handled by other offices.",
      },
      {
        question: "When is the next reappraisal?",
        answer: "The most recent statewide reappraisal was completed in 2025. Tennessee conducts reappraisals on a cycle set by the State Board of Equalization.",
      },
    ],
    importantNotes: [
      "The Property Assessor does NOT set tax rates",
      "The Property Assessor does NOT send tax bills",
      "The Property Assessor does NOT collect property taxes",
      "Educational videos on property assessments and tax rates are available through the State Board of Equalization",
    ],
  },
  {
    slug: "register-of-deeds",
    name: "Register of Deeds",
    category: "finance",
    head: { name: "Sheena Tinsley", title: "Register of Deeds" },
    contact: {
      phone: "(423) 323-6420",
      fax: "(423) 279-2771",
      address: "3411 Hwy. 126, Suite 101, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-4:30pm (excluding designated holidays)",
    },
    description:
      "The Register of Deeds maintains legal document records for real property as established by the Tennessee State Constitution. The office provides public access to property records and deeds.",
    services: [
      "Real property document recording",
      "Legal document maintenance",
      "Public property records access",
      "Deed recording and retrieval",
    ],
    externalLinks: [
      { label: "Register of Deeds Records Search", url: "https://ustitlesearch.net/" },
    ],
  },

  // ─── Operations ──────────────────────────────────────────────────────
  {
    slug: "highway",
    name: "Highway Department",
    category: "operations",
    head: { name: "Scott Murray", title: "Highway Commissioner" },
    contact: {
      phone: "(423) 279-2820",
      fax: "(423) 279-2876",
      address: "147 County Hill Road, Blountville, TN 37617",
      hours: "Monday-Thursday by appointment (excluding designated holidays)",
    },
    description:
      "The Highway Department provides a safe, continuously-improving, cost effective system of roads, bridges, and drainage supporting regional economic vitality throughout Sullivan County.",
    services: [
      "Road maintenance and repair",
      "Bridge infrastructure management",
      "Drainage system maintenance",
      "Safe vehicle and goods movement",
      "Regional transportation support",
    ],
  },
  {
    slug: "maintenance",
    name: "Maintenance Department",
    category: "operations",
    head: { name: "Cindy Stewart", title: "Director" },
    contact: {
      phone: "(423) 323-6405",
      fax: "(423) 279-7592",
      email: "cindy.stewart@sullivancountytn.gov",
      address:
        "Sullivan County Courthouse, 3419 Hwy 126, Blountville, TN 37617 (Mailing: 3411 Hwy. 126, Suite 202)",
      hours: "Monday-Friday, 8:00 AM-4:30 PM. After hours: (423) 341-6207",
    },
    description:
      "The Maintenance Department provides custodial cleaning for county buildings and coordinates the Community Service Program for grounds maintenance. Facilities maintained include the Sullivan County Courthouse Complex, Office Building, Blountville and Bristol Justice Centers, and Health Department. School facilities, highways, and jail maintenance fall under separate departments.",
    services: [
      "Full-time and part-time custodial cleaning for private offices",
      "Community Service Program work details for public area cleaning and grounds",
      "Day worker program coordination with General Sessions Courts",
      "Vehicle maintenance for department fleets and EMS ambulances",
    ],
  },
  {
    slug: "solid-waste",
    name: "Solid Waste / Sanitation",
    category: "operations",
    head: { name: "Mark Torbett", title: "Director" },
    contact: {
      phone: "(423) 323-6439",
      email: "mark.torbett@sullivancountytn.gov",
      address: "3411 Hwy. 126, Suite 30, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "The Solid Waste department manages household waste disposal, recyclables processing, and select hazardous materials for Sullivan County residents through two transfer stations.",
    services: [
      "Household waste disposal",
      "Recyclables processing (mixed paper, cardboard, aluminum cans, tin cans)",
      "Select hazardous materials disposal",
      "Old appliance and electronics recycling",
    ],
    additionalOffices: [
      {
        name: "Kingsport Transfer Station",
        address: "1921 Brookside Lane, Kingsport, TN 37660",
        phone: "(423) 224-1719",
      },
      {
        name: "Bristol Transfer Station",
        address: "804 Raytheon Road, Bristol, TN 37620",
        phone: "(423) 878-1880",
      },
    ],
  },
  {
    slug: "planning-and-codes",
    name: "Planning and Codes",
    category: "operations",
    head: { name: "Luke Meade", title: "Planning Director" },
    contact: {
      phone: "(423) 323-6440",
      email: "Permits@sullivancountytn.gov",
      address: "3425 Highway 126, Suite 101, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (closed designated holidays)",
    },
    description:
      "The Planning and Codes department manages building permits, zoning, and development for Sullivan County. Adopted 2018 International Residential Code and 2018 Energy Code effective April 1, 2018. Sullivan County adopted zoning in 1988. Board meetings are held at the Historic Courthouse Commission Room (2nd floor).",
    services: [
      "Building permits for residential construction (homes, mobile homes, modular homes)",
      "Permits for additions, carports, garages, storage buildings",
      "Permits for gazebos, pools, decks, roofs, interior remodeling",
      "Zoning and development review",
      "Site plan review for non-residential and multi-family improvements",
      "Septic system permits",
      "Sewer fee administration",
      "Stormwater management",
      "Floodplain permits",
      "Driveway connection permits",
    ],
    keyDocuments: [
      { name: "Zoning Code 2025" },
      { name: "Zoning Title and Index 2025" },
      { name: "Subdivision Regulations 2024" },
      { name: "Appendices 2024" },
      { name: "Permit Form (August 2024)" },
    ],
    importantNotes: [
      "Sullivan County adopted zoning in 1988",
      "2018 International Residential Code and 2018 Energy Code adopted effective April 1, 2018",
      "Electrical permits are issued by the State of Tennessee via the CORE online system",
      "Board meetings are held at the Historic Courthouse Commission Room (2nd floor) and are open to the public",
    ],
  },
  {
    slug: "purchasing",
    name: "Purchasing",
    category: "operations",
    head: { name: "Kristinia Davis", title: "Purchasing Agent" },
    contact: {
      phone: "(423) 323-6400",
      email: "kris.davis@sullivancountytn.gov",
      address: "155 School Ave, Suite 308, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "The Purchasing Department manages procurement for all county departments. Bid thresholds range from micro purchases (under $10,000) to large sealed bids ($50,000+). All vendors must register before purchase order issuance. Records are retained a minimum of 10 years (infinite for construction). Solicitations transitioned from Vendor Registry to BidNet effective September 1, 2025.",
    services: [
      "County procurement management",
      "Competitive bidding administration",
      "Vendor registration",
      "Purchase order processing",
      "Bid solicitation posting on BidNet",
      "Records retention (10 years minimum, infinite for construction)",
    ],
    staff: [
      {
        name: "Kristinia Davis",
        title: "Purchasing Agent",
        phone: "(423) 323-6400",
        email: "kris.davis@sullivancountytn.gov",
      },
      { name: "Michelle Ramey", title: "Chief Deputy Purchasing Agent", phone: "(423) 323-6480" },
      { name: "Alan Mahaffey", title: "Assistant Purchasing Agent", phone: "(423) 323-6404" },
      { name: "Christine Lawson", title: "Senior Buyer", phone: "(423) 323-6408" },
      { name: "Stephanie Walker", title: "Buyer", phone: "(423) 323-6401" },
      { name: "Holly Gebhardt", title: "Buyer", phone: "(423) 323-6400" },
    ],
    externalLinks: [
      {
        label: "BidNet (Current Solicitations)",
        url: "https://www.bidnetdirect.com/tennessee/sullivancountytn",
      },
    ],
    bidThresholds: [
      { range: "$0 – $9,999.99 (Micro)", process: "Open market, quote/receipt submission" },
      { range: "$10,000 – $19,999.99 (Small)", process: "One quote + two informal quotes" },
      { range: "$20,000 – $49,999.99 (Mid-range)", process: "Minimum 3 competitive formal quotes" },
      {
        range: "$50,000+ (Large)",
        process:
          "Written, sealed competitive proposals; advertised in newspaper 5 days prior; public opening",
      },
    ],
    importantNotes: [
      "All vendors must register before purchase order issuance",
      "Records retained minimum 10 years (infinite for construction projects)",
      "Awards based on 'lowest and best bidder' considering quality, specs, suitability, and delivery",
      "Splitting requisitions to avoid competitive bidding thresholds is prohibited",
      "Department heads must authorize all requisitions",
      "Solicitations transitioned from Vendor Registry to BidNet effective September 1, 2025",
    ],
  },
  {
    slug: "risk-management",
    name: "Risk Management",
    category: "operations",
    head: { name: "Larry Bailey", title: "Risk Manager" },
    contact: {
      phone: "(423) 323-6499",
      fax: "(423) 279-2887",
      email: "larry.bailey@sullivancountytn.gov",
      address: "3411 Hwy. 126, Suite 205, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "Risk Management eliminates or reduces causes for losses, secures insurance utilizing deductibles and self-insurance retentions, coordinates defense for county claims, manages the County Diabetes Program, and manages Sullivan County's 800 MHz radio communication system.",
    services: [
      "Loss prevention and risk reduction",
      "Insurance procurement with deductibles and self-insurance retentions",
      "County claims defense coordination",
      "County Diabetes Program management (employees, dependents, retirees)",
      "800 MHz radio communication system management",
    ],
    staff: [
      {
        name: "Larry Bailey",
        title: "Risk Manager",
        phone: "(423) 323-6499",
        email: "larry.bailey@sullivancountytn.gov",
      },
      {
        name: "Andrea Hills",
        title: "Claims Adjuster (Tri-State Claims)",
        phone: "(423) 230-2247",
      },
    ],
  },

  // ─── Community ───────────────────────────────────────────────────────
  {
    slug: "archives-and-tourism",
    name: "Archives and Tourism",
    category: "community",
    head: { name: "Matthew Johnson", title: "Director" },
    contact: {
      phone: "(423) 323-4660",
      fax: "(423) 323-4635",
      email: "info@sullivancountytn.gov",
      address: "3425 Hwy. 126, Suite 100, Blountville, TN 37617 (P.O. Box 3179)",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "The Archives and Tourism department preserves Sullivan County's past, shares its heritage, and showcases attractions. The department describes the region as 'a Museum of Masterpieces, both old and new.' Highlights include the Old Deery Inn in Blountville (18 rooms, 2 attics, 3 cellars, 10 outbuildings) and the Sunnyside Trail.",
    services: [
      "Historic archives preservation",
      "Tourism promotion and visitor services",
      "Heritage education and outreach",
      "Old Deery Inn tours and events",
      "Sunnyside Trail management",
      "Northeast Tennessee historic site coordination",
    ],
    externalLinks: [{ label: "Historic Sullivan", url: "https://www.historicsullivan.com/" }],
    importantNotes: [
      "The Old Deery Inn in Blountville features 18 rooms, 2 attics, 3 cellars, and 10 outbuildings",
      "The inn was home to Mrs. Virginia Byers Caldwell and Judge Joseph Anderson Caldwell",
      "The Sunnyside Trail offers walking access to Northeast Tennessee historic sites",
      "The department describes the region as 'a Museum of Masterpieces, both old and new'",
    ],
  },
  {
    slug: "election-office",
    name: "Election Office",
    category: "community",
    head: {
      name: "Jason C. Booher",
      title: "Administrator of Elections",
    },
    contact: {
      phone: "(423) 323-6444",
      fax: "(423) 323-6443",
      address: "3258 Highway 126, Suite 103, Blountville, TN 37617",
      hours: "Monday-Friday, 8am-5pm (excluding designated holidays)",
    },
    description:
      "The Election Office administers all elections in Sullivan County. The Administrator also serves as Secretary of the Tennessee Association of County Election Officials. Voter registration, early voting, and election day operations are coordinated through this office.",
    services: [
      "Election administration",
      "Voter registration",
      "Early voting coordination",
      "Election day operations",
      "Candidate filing",
      "Election results reporting",
    ],
    externalLinks: [{ label: "Sullivan County Election Office", url: "https://www.scelect.org/" }],
  },
  {
    slug: "soil-water-conservation",
    name: "Soil & Water Conservation",
    category: "community",
    head: { name: "Dwight King", title: "Chairman, Board of Supervisors" },
    contact: {
      phone: "(423) 323-7431 Extension 3",
      email: "Sullivancountyswcd905@gmail.com",
      address: "2942 Highway 394, Suite 1, Blountville, TN 37617",
      hours: "Monday-Friday, 8:00 am-4:30 pm (excluding holidays)",
    },
    description:
      "The Soil & Water Conservation District protects and enhances soil, water, and agricultural resources for long-term sustainability. The Board of Supervisors meets monthly at the Blountville office. Programs include technical assistance, cost-share, conservation planning, and education outreach.",
    services: [
      "Technical assistance and cost-share programs",
      "Conservation planning",
      "Education and outreach (schools, contests, workshops, community events)",
      "Soil health programs (cover crops, filter strips)",
      "Water quality improvement (stream buffers, sediment control)",
      "Livestock management (exclusion fencing, grazing systems)",
      "Infrastructure improvement programs",
    ],
    staff: [
      { name: "Dwight King", title: "Chairman" },
      { name: "Chris Widener", title: "Vice Chairman" },
      { name: "Zane Vanover", title: "Secretary/Treasurer" },
      { name: "Maggie Malone", title: "Member" },
      { name: "Forrest Ramsey", title: "Member" },
    ],
    externalLinks: [
      {
        label: "Tennessee Soil and Water Conservation Commission",
        url: "https://www.tn.gov/agriculture/farms/conservation.html",
      },
      { label: "USDA NRCS Tennessee", url: "https://www.nrcs.usda.gov/tennessee" },
      { label: "Tennessee Department of Agriculture", url: "https://www.tn.gov/agriculture.html" },
    ],
    publications: [{ name: "SCSWCD Brochure" }, { name: "FY 2025 Annual Report" }],
    importantNotes: [
      "Best Management Practices include: cover crops, filter strips, stream buffers, sediment control, exclusion fencing, and grazing systems",
      "NASDA Foundation EPA Gulf of America Farmer-to-Farmer Grants available",
    ],
  },
  {
    slug: "veterans-office",
    name: "Veterans Office",
    category: "community",
    head: { name: "Hunter Woodall", title: "Veterans' Service Officer" },
    contact: {
      phone: "(423) 279-2879",
      email: "hunter.woodall@sullivancountytn.gov",
      address: "125 Anderson Rd., Blountville, TN 37617",
      hours: "Monday-Friday, 8am-4:30pm (excluding designated holidays)",
    },
    description:
      "The Veterans Office counsels, advises, and assists military service veterans, survivors, and dependents in obtaining earned benefits including compensation, pension, burial, health, education, and dependency and indemnity compensation.",
    services: [
      "Compensation benefits assistance",
      "Pension benefits guidance",
      "Burial benefits coordination",
      "Health benefits enrollment",
      "Education benefits assistance",
      "Dependency and indemnity compensation",
      "Survivor and dependent services",
    ],
    externalLinks: [
      { label: "U.S. Department of Veterans Affairs", url: "https://www.va.gov/" },
      {
        label: "Tennessee Department of Veterans Affairs",
        url: "https://www.tn.gov/veteran.html",
      },
    ],
  },
];

export const DEPARTMENT_CATEGORIES: Record<
  DepartmentCategory,
  { label: string; description: string }
> = {
  administrative: {
    label: "Administrative",
    description: "County leadership, legal counsel, and clerk services",
  },
  courts: {
    label: "Courts",
    description: "Judicial system, prosecution, and public defense",
  },
  "public-safety": {
    label: "Public Safety",
    description: "Law enforcement, emergency services, and medical examiner",
  },
  finance: {
    label: "Finance & Property",
    description: "County finances, property assessment, and deed recording",
  },
  operations: {
    label: "Operations",
    description: "Roads, maintenance, waste management, planning, and procurement",
  },
  community: {
    label: "Community",
    description: "Archives, tourism, elections, conservation, and veteran services",
  },
};

export function getDepartmentBySlug(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug);
}

export function getDepartmentsByCategory(category: DepartmentCategory): Department[] {
  return departments.filter((d) => d.category === category);
}
