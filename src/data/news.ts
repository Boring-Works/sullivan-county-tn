export interface NewsItem {
  title: string;
  date: string;
  author: string;
  slug: string;
  summary: string;
  url: string;
  pdfUrl?: string;
  content?: string[];
}

export const news: NewsItem[] = [
  {
    title: "Sullivan County Employee Food Drive",
    date: "2025-11-18",
    author: "Nick Johnson",
    slug: "sullivan-county-employee-food-drive",
    summary:
      "Sullivan County employees organize a food drive to support the local community during the holiday season.",
    url: "https://sullivancountytn.gov/sullivan-county-employee-food-drive/",
    content: [
      "Sullivan County employees are coming together to organize a county-wide food drive to support local families during the holiday season.",
      "The initiative, coordinated across multiple county departments, aims to collect non-perishable food items for distribution through local food banks and community organizations serving Sullivan County residents.",
      "Employees across all departments are encouraged to participate by bringing donations to designated collection points in county buildings throughout Blountville, Bristol, and Kingsport.",
      "Collection boxes are available at the Sullivan County Courthouse, Financial Administration Building, Justice Centers in Blountville and Bristol, and the Kingsport City Hall county offices.",
      "For more information about how to participate or to coordinate a department collection, contact your department head or the County Mayor's office at (423) 323-6417.",
    ],
  },
  {
    title: "Blountville Little League Volunteers Needed",
    date: "2025-10-31",
    author: "Nick Johnson",
    slug: "blountville-little-league-volunteers-needed",
    summary:
      "Blountville Little League is seeking volunteers for the upcoming season. Community members are encouraged to get involved.",
    url: "https://sullivancountytn.gov/407097-2/",
    pdfUrl: "/documents/public-documents/blountville-little-league-volunteers.pdf",
    content: [
      "Blountville Little League is actively seeking volunteers for the upcoming baseball and softball season. The league depends on community involvement to provide a positive experience for young athletes across Sullivan County.",
      "Volunteer positions include coaches, assistant coaches, team parents, concession stand workers, field maintenance crew, and scorekeepers. No prior coaching experience is required — training will be provided for all coaching volunteers.",
      "The league serves children ages 4 through 16 in the Blountville area and surrounding communities. Registration for the upcoming season is currently open.",
      "Interested volunteers can download the volunteer application form attached to this announcement or contact Blountville Little League directly for more information.",
      "Community members who want to get involved but cannot commit to a full season are welcome to help with individual events, field prep days, and opening day ceremonies.",
    ],
  },
  {
    title: "Affidavit Sullivan Co Public Notice",
    date: "2025-10-02",
    author: "Nick Johnson",
    slug: "affidavit-sullivan-co-public-notice",
    summary: "Public notice affidavit issued by Sullivan County for official county business.",
    url: "https://sullivancountytn.gov/407069-2/",
    pdfUrl: "/documents/public-documents/affidavit-sullivan-co-public-notice.pdf",
    content: [
      "Sullivan County has issued a public notice affidavit in accordance with Tennessee state law requirements for official county business proceedings.",
      "This notice is published to inform Sullivan County residents of official county actions requiring public notification under Tennessee Code Annotated.",
      "The full text of the public notice is available in the attached PDF document. Residents are encouraged to review the document for complete details.",
      "Questions regarding this public notice may be directed to the Sullivan County Attorney's office at (423) 323-6481.",
    ],
  },
  {
    title: "Hotel/Motel Tax Law Update",
    date: "2025-07-10",
    author: "Nick Johnson",
    slug: "hotel-motel-tax-law-update",
    summary:
      "New law regarding hotel/motel tax effective July 1, 2025. Important update for hospitality businesses in Sullivan County.",
    url: "https://sullivancountytn.gov/406826-2/",
    content: [
      "A new law regarding hotel and motel tax has taken effect as of July 1, 2025. All hospitality businesses operating in Sullivan County should be aware of the updated requirements.",
      "Previous law required hotel operators to refund or provide credit to a person who maintained occupancy in a hotel for 30 continuous days for the tax previously collected. Effective July 1, 2025, hotels are now required to collect occupancy tax for the first 30 days a person has maintained occupancy.",
      "The occupancy tax collected for the first 30 days must be remitted by the hotel to the Sullivan County Clerk's office no later than the twentieth day of each month for the preceding month, as outlined in Tenn. Code Ann. § 67-4-1405.",
      "When a person has maintained occupancy for thirty continuous days, the operator shall remit the tax for such period and cease collecting the tax from the person for the remainder of their stay, per Public Chapter 364 (2025).",
      "For detailed information about the new requirements and how they affect your business, contact the Sullivan County Clerk's office at (423) 323-6428.",
    ],
  },
  {
    title: "Building Inspector & Code Enforcement Job Opening",
    date: "2025-06-05",
    author: "Nick Johnson",
    slug: "building-inspector-code-enforcement-job-opening",
    summary:
      "Sullivan County is hiring a Building Inspector and Code Enforcement Officer. Qualified candidates are encouraged to apply.",
    url: "https://sullivancountytn.gov/406750-2/",
    content: [
      "Sullivan County is accepting applications for the position of Building Inspector and Code Enforcement Officer in the Planning and Codes department.",
      "The Building Inspector is responsible for reviewing construction plans, conducting site inspections, enforcing building codes, and ensuring compliance with the 2018 International Residential Code adopted by Sullivan County.",
      "Qualified candidates should have knowledge of residential and commercial building codes, construction methods, and inspection procedures. Relevant certifications and experience are preferred.",
      "This is a full-time position with competitive salary and benefits including medical, vision, and dental insurance through the county's employee benefits program.",
      "To apply, submit a completed Sullivan County employment application to the Human Resources office. Applications are available on the Employee Services page or at the Financial Administration Building, 155 School Ave., Blountville, TN 37617.",
      "Sullivan County is an equal opportunity employer. For questions about this position, contact the Planning and Codes department at (423) 323-6440.",
    ],
  },
  {
    title: "Household Hazardous Waste Collection Event",
    date: "2024-08-30",
    author: "Sullivan County",
    slug: "household-hazardous-waste-collection",
    summary:
      "Free household hazardous waste collection event at Sullivan Central Middle School. Residents can safely dispose of hazardous materials.",
    url: "https://sullivancountytn.gov/7455/",
    content: [
      "Sullivan County is hosting a free Household Hazardous Waste Collection event for county residents to safely dispose of hazardous materials from their homes.",
      "The event took place on Saturday, September 28, 2024 at Sullivan Central Middle School, 131 Shipley Ferry Rd, Blountville, TN.",
      "Acceptable items include old paint, pesticides, cleaning chemicals, automotive fluids, batteries, and other household hazardous materials that should not be placed in regular trash.",
      "This event is part of Sullivan County's ongoing commitment to environmental protection and responsible waste management for the community.",
    ],
  },
  {
    title: "GIS Interactive Zoning Map Now Available",
    date: "2022-05-17",
    author: "Sullivan County",
    slug: "gis-interactive-zoning-map",
    summary:
      "Sullivan County's interactive GIS zoning map is now available online. Search by address and view zoning designations.",
    url: "https://sullivancountytn.gov/gis-interactive-zoning-map/",
    content: [
      "Sullivan County's GIS Analyst Jonathan Hamic has launched an interactive zoning map for public use, making it easier for residents and developers to access zoning information.",
      "The interactive map allows users to view zoning designations across Sullivan County. Users can toggle zoning layers on and off and adjust transparency to see topographic details underneath.",
      "The map features an address search function, making it simple to look up zoning information for specific properties throughout the county.",
      "For questions about zoning designations or the interactive map, contact the Sullivan County Planning and Codes department at (423) 323-6440.",
    ],
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug);
}
