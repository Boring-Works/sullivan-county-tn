export interface NewsItem {
  title: string;
  date: string;
  author: string;
  slug: string;
  summary: string;
  url: string;
  pdfUrl?: string;
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
  },
  {
    title: "Blountville Little League Volunteers Needed",
    date: "2025-10-31",
    author: "Nick Johnson",
    slug: "blountville-little-league-volunteers-needed",
    summary:
      "Blountville Little League is seeking volunteers for the upcoming season. Community members are encouraged to get involved.",
    url: "https://sullivancountytn.gov/407097-2/",
    pdfUrl:
      "https://sullivancountytn.gov/wp-content/uploads/Blountville-Little-League-Call-for-Volunteers-Press-Release.pdf",
  },
  {
    title: "Affidavit Sullivan Co Public Notice",
    date: "2025-10-02",
    author: "Nick Johnson",
    slug: "affidavit-sullivan-co-public-notice",
    summary: "Public notice affidavit issued by Sullivan County for official county business.",
    url: "https://sullivancountytn.gov/407069-2/",
    pdfUrl:
      "https://sullivancountytn.gov/wp-content/uploads/Affidavit-Sullivan-Co-Public-Notice-1.pdf",
  },
  {
    title: "Hotel/Motel Tax Law Update",
    date: "2025-07-10",
    author: "Nick Johnson",
    slug: "hotel-motel-tax-law-update",
    summary:
      "New law regarding hotel/motel tax effective July 1, 2025. Important update for hospitality businesses in Sullivan County.",
    url: "https://sullivancountytn.gov/county-news/",
  },
  {
    title: "Building Inspector & Code Enforcement Job Opening",
    date: "2025-06-05",
    author: "Nick Johnson",
    slug: "building-inspector-code-enforcement-job-opening",
    summary:
      "Sullivan County is hiring a Building Inspector and Code Enforcement Officer. Qualified candidates are encouraged to apply.",
    url: "https://sullivancountytn.gov/406750-2/",
  },
];
