export interface NewsItem {
  title: string;
  date: string;
  author: string;
  slug: string;
  summary: string;
  url?: string;
  pdfUrl?: string;
  content?: string[];
  /** Sanitized HTML content from admin-managed D1 articles. */
  htmlContent?: string;
}

export const news: NewsItem[] = [
  {
    title: "County Offices Closed Monday, May 25 for Memorial Day",
    date: "2026-05-07",
    author: "County Mayor's Office",
    slug: "memorial-day-2026-office-closures",
    summary:
      "All Sullivan County government offices will be closed Monday, May 25, 2026 in observance of Memorial Day. Offices reopen Tuesday, May 26 at 8:00 AM. Emergency services and 911 dispatch are not affected.",
    content: [
      "All Sullivan County government offices will be closed on Monday, May 25, 2026 in observance of Memorial Day. This includes the historic courthouse in Blountville and the County Clerk's offices in Blountville, Bristol, and Kingsport.",
      "Offices will reopen at 8:00 AM on Tuesday, May 26. Emergency services, including 911 dispatch and the Sheriff's Office, are not affected and remain available 24 hours a day.",
      "Memorial Day is a federal holiday honoring American service members who died while serving in the United States military. Local Memorial Day ceremonies are typically held at veterans' memorials and cemeteries throughout the county.",
      "If you have a routine matter that needs to be handled in person, please plan to visit the courthouse before Friday, May 22 or after Tuesday, May 26.",
      "For non-emergency Sheriff matters, call (423) 279-7500. For emergency management questions, call (423) 323-6912. For all other county business, contact the County Mayor's office at (423) 323-6417.",
    ],
  },
  {
    title: "Grand Opening: Blountville Athletic Park Opens Saturday, May 9",
    date: "2026-05-04",
    author: "Sullivan County Communications",
    slug: "blountville-athletic-park-grand-opening-2026",
    summary:
      "Sullivan County will officially open the new Blountville Athletic Park to the public on Saturday, May 9, 2026. The County Mayor's office invites residents to attend the ribbon-cutting ceremony and family activities.",
    content: [
      "Sullivan County will officially open the new Blountville Athletic Park to the public on Saturday, May 9, 2026. The County Mayor's office invites all residents to attend the ribbon-cutting ceremony and the family activities scheduled to follow.",
      "The park serves as a home field for Blountville Little League and as a recreational space for surrounding neighborhoods. It includes ball fields, walking paths, picnic areas, and family-friendly amenities.",
      "A full schedule for opening day, including the ribbon-cutting time and event details, will be posted at sullivancountytn.gov in the days leading up to the event.",
      "Volunteers from Blountville Little League will be on-site to answer questions about the upcoming youth baseball and softball season for ages 4 through 16. Coaches, scorekeepers, and field-prep helpers are still needed.",
      "For questions about the event or directions, contact the County Mayor's office at (423) 323-6417.",
    ],
  },
  {
    title: "Public Hearing on the 2026-2027 County Budget Set for May 21",
    date: "2026-05-01",
    author: "County Mayor's Office",
    slug: "fy-2027-budget-hearing-may-21",
    summary:
      "The Sullivan County Board of Commission will hear public comment on the proposed Fiscal Year 2026-2027 budget at its regular May session on Thursday, May 21 at 6:00 PM at the historic courthouse in Blountville.",
    content: [
      "The Sullivan County Board of Commission will receive public comment on the proposed Fiscal Year 2026-2027 county budget at its regular May session, scheduled for Thursday, May 21, 2026 at 6:00 PM at the historic courthouse in Blountville (3411 TN-126).",
      "Tennessee counties operate on a fiscal year that runs July 1 through June 30. The Commission must adopt a balanced budget before the new fiscal year begins on July 1, 2026. The proposed budget covers operations of all county offices, the Sheriff's Department, the Highway Department, the local match for the school system, and capital projects.",
      "Residents who wish to speak should sign in at the Clerk's table when they arrive. Written comments may be submitted to the County Mayor's office in advance at (423) 323-6417 or in person at the courthouse during business hours.",
      "The proposed budget document and proposed property tax rate are posted at sullivancountytn.gov in the days leading up to the hearing, in keeping with state notice requirements.",
      "Final adoption of the FY 2026-2027 budget is scheduled for the June 2026 regular session.",
    ],
  },
  {
    title: "Outdoor Burn Permits Required Through May 15",
    date: "2026-04-28",
    author: "Sullivan County Communications",
    slug: "burn-permit-season-ends-may-15-2026",
    summary:
      "Anyone planning to burn leaves, brush, or yard debris in Sullivan County must obtain a free burn permit from the Tennessee Division of Forestry through May 15, 2026. Permits take about a minute to obtain at BurnSafeTN.org or in the MyTN app.",
    content: [
      "Anyone planning to burn leaves, brush, or yard debris outdoors in Sullivan County must obtain a free burn permit from the Tennessee Division of Forestry through May 15, 2026. State law requires a permit for any open-air fire within 500 feet of a forest, grassland, or woodland during burn-permit season (October 15 through May 15).",
      "Permits are free. Apply online at BurnSafeTN.org or through the MyTN mobile app. Each permit expires at midnight on the day it is issued, so apply on the day you plan to burn.",
      "After May 15, permits are not required from the Division of Forestry through the summer months. However, basic fire-safety rules still apply: never burn on a windy day, keep a water source nearby, and stay with the fire until it is fully extinguished.",
      "Burning household trash, tires, plastics, or treated wood is illegal at all times under state environmental rules and may result in a citation.",
      "For broadcast burning (forestry, agricultural, or land-clearing applications), call the state burn line at 877-350-BURN (2876).",
      "Local volunteer fire departments, including East Sullivan County Volunteer Fire Department, can answer questions about safe burning practices and respond to escaped fires. In an emergency, always call 911.",
    ],
  },
  {
    title: "Memorial Boulevard (SR 126) Improvement Project: What to Expect This Spring",
    date: "2026-04-21",
    author: "Sullivan County Communications",
    slug: "sr-126-memorial-boulevard-project-update-2026",
    summary:
      "Phase 1 of the long-planned Memorial Boulevard (SR 126) improvement project began in March 2026. The 8.3-mile project runs from East Center Street in Kingsport to Interstate 81. Drivers should expect daytime lane closures through the spring.",
    content: [
      "The Tennessee Department of Transportation (TDOT) began Phase 1 of the Memorial Boulevard (State Route 126) improvement project in March 2026. The 8.3-mile project will reshape the corridor between East Center Street in Kingsport and Interstate 81.",
      "Drivers should expect possible lane closures between East Center Street and John B. Dennis Highway daily between 9:00 AM and 3:00 PM. Plan extra travel time during peak shopping, school, and commute hours.",
      "A separate signal upgrade is underway at SR 93 and Bloomingdale Road. Drivers in that area should also expect possible lane closures at various times.",
      "Sullivan County government does not directly manage state route construction. For project specifics, schedules, and detour information, visit tn.gov/tdot or call the TDOT Region 1 office. For local routing questions, contact the Sullivan County Highway Department.",
      "Citizens are encouraged to check the weekly TDOT East Tennessee construction reports before long trips on SR 93, SR 126, I-26, or I-81. Reports are published every Thursday at tn.gov/tdot.",
    ],
  },
  {
    title: "April Commission Meeting: 2026 Budget Discussions, Road Project Updates",
    date: "2026-04-17",
    author: "County Mayor's Office",
    slug: "april-2026-commission-meeting-recap",
    summary:
      "The Sullivan County Board of Commission held its regular April session Thursday at the historic courthouse in Blountville. Commissioners reviewed the proposed 2026-2027 budget, received road project updates, and approved routine measures. The next regular session is scheduled for May 21.",
    content: [
      "The Sullivan County Board of Commission held its regular April session on Thursday, April 16, 2026 at 6:00 PM at the historic courthouse in Blountville (3411 TN-126). The meeting was open to the public and recorded for the official record.",
      "The proposed Fiscal Year 2026-2027 budget was the main topic of discussion. Commissioners reviewed department-level requests, debated several line items, and heard from the County Mayor's office about expected revenue. No final vote was taken; budget adoption is scheduled for the June regular session.",
      "The Highway Department reported on ongoing state and county road projects in Sullivan County, including the Memorial Boulevard (SR 126) improvement project now in Phase 1 between East Center Street in Kingsport and I-81.",
      "Commissioners approved routine consent items, including monthly financial reports and minor administrative resolutions.",
      "The next regular session is scheduled for Thursday, May 21, 2026 at 6:00 PM at the historic courthouse. Meetings are open to the public; final agendas are posted at sullivancountyclerktn.com one week before each meeting.",
      "Citizens with questions about the meeting or the budget process may contact the County Mayor's office at (423) 323-6417.",
    ],
  },
  {
    title: "Spring Severe Weather: How Sullivan County Residents Can Prepare",
    date: "2026-04-10",
    author: "Sullivan County Emergency Management",
    slug: "spring-severe-weather-preparedness-2026",
    summary:
      "April and May are the peak months for severe thunderstorms and tornadoes in Tennessee. Sullivan County Emergency Management urges every household to have a plan, a kit, and a way to receive warnings before the next storm arrives.",
    content: [
      "Spring is the most active severe-weather season in East Tennessee. Strong thunderstorms, hail, and tornadoes are most common in April and May. Sullivan County Emergency Management urges every household to be ready before a warning is issued.",
      "Have a plan. Decide where everyone in your home will go if a tornado warning is issued. The safest place is an interior room on the lowest floor — a bathroom, closet, or hallway with no windows. Mobile homes are not safe; identify a sturdy nearby structure in advance and know how you will reach it.",
      "Have a kit. Keep at least three days of water, non-perishable food, medications, a flashlight, extra batteries, a battery- or hand-crank radio, and copies of important documents in a waterproof bag. Check it twice a year and replace anything that has expired.",
      "Have a way to receive warnings. A NOAA weather radio is the most reliable; smartphone weather apps are a strong second line. Outdoor sirens are designed to be heard outdoors and may not wake you indoors at night.",
      "If a tornado warning is issued for your area, take shelter immediately. Do not wait to see the storm. Most fatal injuries from tornadoes occur to people who were in mobile homes or vehicles.",
      "For local emergency information, contact Sullivan County Emergency Management at (423) 323-6912. For life-threatening emergencies, always call 911. Free preparedness guides are available at ready.gov and tn.gov/tema.",
    ],
  },
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
