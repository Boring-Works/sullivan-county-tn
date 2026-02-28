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
		pdfUrl: "/documents/blountville-little-league-volunteers.pdf",
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
		pdfUrl: "/documents/affidavit-sullivan-co-public-notice.pdf",
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
		url: "https://sullivancountytn.gov/county-news/",
		content: [
			"A new law regarding hotel and motel tax has taken effect as of July 1, 2025. All hospitality businesses operating in Sullivan County should be aware of the updated requirements.",
			"The updated legislation affects how hotel/motel taxes are collected, reported, and remitted to the county. Business owners in the hospitality industry should review the changes to ensure compliance.",
			"Sullivan County's hotel/motel tax supports tourism development, convention facilities, and related economic development activities throughout the county.",
			"For detailed information about the new requirements and how they affect your business, contact the Sullivan County Clerk's office at (423) 323-6428 or visit the County Clerk's website.",
			"The County Clerk's office is available to assist hospitality business owners with understanding the new filing procedures and tax rate adjustments.",
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
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
	return news.find((n) => n.slug === slug);
}
