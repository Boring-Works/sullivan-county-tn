export interface MinutesItem {
	committee: string;
	date: string;
	title: string;
	summary?: string;
	pdfUrl: string;
}

export const COMMITTEES = [
	"County Commission",
	"Planning Commission",
	"Beer Board",
	"Board of Zoning Appeals",
	"Budget Committee",
	"Education Committee",
] as const;

export type Committee = (typeof COMMITTEES)[number];

export const meetingMinutes: MinutesItem[] = [
	// ── County Commission 2026 ────────────────────────────────────
	{
		committee: "County Commission",
		date: "2026-02-19",
		title: "County Commission Regular Meeting — February 19, 2026",
		summary: "Regular monthly meeting of the Sullivan County Commission.",
		pdfUrl: "/documents/agendas/commission-meeting-packet-february-19-2026.pdf",
	},
	{
		committee: "County Commission",
		date: "2026-02-12",
		title: "Rezoning Hearing and Work Session — February 12, 2026",
		summary: "Rezoning hearing and commission work session.",
		pdfUrl: "/documents/agendas/rezoning-hearing-and-work-session-agenda-february-12-2026.pdf",
	},
	{
		committee: "County Commission",
		date: "2026-01-08",
		title: "Work Session — January 8, 2026",
		summary: "Commission work session agenda and materials.",
		pdfUrl: "/documents/agendas/work-session-agenda-january-8-2026.pdf",
	},

	// ── County Commission 2025 ────────────────────────────────────
	{
		committee: "County Commission",
		date: "2025-12-01",
		title: "County Commission Monthly Meeting — December 2025",
		summary: "Regular monthly meeting of the Sullivan County Commission.",
		pdfUrl: "/documents/agendas/commission-monthly-meeting-agenda-december-2025.pdf",
	},
	{
		committee: "County Commission",
		date: "2025-11-13",
		title: "Rezoning and Work Session — November 13, 2025",
		summary: "Commission rezoning hearing and work session.",
		pdfUrl: "/documents/agendas/commission-rezoning-and-work-session-order-of-business-november-13-2025.pdf",
	},
	{
		committee: "County Commission",
		date: "2025-09-18",
		title: "County Commission Meeting — September 18, 2025",
		summary: "Regular monthly meeting of the Sullivan County Commission.",
		pdfUrl: "/documents/agendas/commission-meeting-agenda-september-18-2025.pdf",
	},
	{
		committee: "County Commission",
		date: "2025-09-11",
		title: "Rezoning Hearing and Work Session — September 11, 2025",
		summary: "Rezoning hearing and commission work session.",
		pdfUrl: "/documents/agendas/rezoning-hearing-and-work-session-agenda-september-11-2025.pdf",
	},
	{
		committee: "County Commission",
		date: "2025-04-17",
		title: "County Commission Meeting — April 17, 2025",
		summary: "Regular monthly meeting of the Sullivan County Commission.",
		pdfUrl: "/documents/agendas/commission-meeting-agenda-april-17-2025.pdf",
	},
	{
		committee: "County Commission",
		date: "2025-04-10",
		title: "Work Session — April 10, 2025",
		summary: "Commission work session.",
		pdfUrl: "/documents/agendas/work-session-agenda-april-10.pdf",
	},
	{
		committee: "County Commission",
		date: "2025-03-20",
		title: "County Commission Meeting — March 20, 2025 (Draft)",
		summary: "Draft agenda for March 2025 commission meeting.",
		pdfUrl: "/documents/agendas/commission-meeting-agenda-march-20-2025-draft.pdf",
	},
	{
		committee: "County Commission",
		date: "2025-02-20",
		title: "County Commission Meeting — February 20, 2025",
		summary: "Regular monthly meeting of the Sullivan County Commission.",
		pdfUrl: "/documents/agendas/commission-meeting-agenda-february-20-2025.pdf",
	},
	{
		committee: "County Commission",
		date: "2025-02-13",
		title: "Work Session — February 13, 2025 (First Draft)",
		summary: "Draft work session agenda.",
		pdfUrl: "/documents/agendas/work-session-agenda-february-13-2025-first-draft.pdf",
	},
	{
		committee: "County Commission",
		date: "2025-01-16",
		title: "County Commission Meeting — January 16, 2025",
		summary: "Regular monthly meeting of the Sullivan County Commission.",
		pdfUrl: "/documents/agendas/commission-meeting-agenda-january-16-2025.pdf",
	},

	// ── County Commission 2024 ────────────────────────────────────
	{
		committee: "County Commission",
		date: "2024-12-19",
		title: "County Commission Meeting — December 19, 2024",
		summary: "Regular monthly meeting of the Sullivan County Commission.",
		pdfUrl: "/documents/agendas/commission-meeting-agenda-december-19-2024.pdf",
	},
	{
		committee: "County Commission",
		date: "2024-12-12",
		title: "County Commission Meeting — December 12, 2024 (First Draft)",
		summary: "Draft agenda for December 2024 commission meeting.",
		pdfUrl: "/documents/agendas/commission-meeting-agenda-december-12-2024-first-draft.pdf",
	},
	{
		committee: "County Commission",
		date: "2024-11-21",
		title: "County Commission Monthly Meeting — November 21, 2024 (Draft)",
		summary: "Draft agenda for November 2024 commission meeting.",
		pdfUrl: "/documents/agendas/commission-monthly-meeting-agenda-november-21-2024-draft.pdf",
	},
	{
		committee: "County Commission",
		date: "2024-07-10",
		title: "Rezoning Hearing and Work Session — July 10, 2024",
		summary: "Rezoning hearing and commission work session.",
		pdfUrl: "/documents/agendas/rezoning-hearing-and-work-session-agenda-july-10.pdf",
	},

	// ── Planning Commission ───────────────────────────────────────
	{
		committee: "Planning Commission",
		date: "2025-09-11",
		title: "Planning Commission Meeting — September 2025",
		summary: "Regular meeting of the Sullivan County Planning Commission including rezoning requests.",
		pdfUrl: "/documents/planning-codes/zoning-resolution-updated-december-12-2024.pdf",
	},

	// ── Budget Committee ──────────────────────────────────────────
	{
		committee: "Budget Committee",
		date: "2025-08-01",
		title: "Budget Committee Review — FY 2025-2026",
		summary: "Review and discussion of the fiscal year 2025-2026 county budget.",
		pdfUrl: "/documents/finance/budget-2025-2026-final.pdf",
	},
];

export function getMinutesByCommittee(committee: string): MinutesItem[] {
	return meetingMinutes.filter((m) => m.committee === committee);
}

export function getMinutesByYear(year: number): MinutesItem[] {
	return meetingMinutes.filter((m) => m.date.startsWith(String(year)));
}
