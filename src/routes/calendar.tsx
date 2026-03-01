import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, ExternalLink, MapPin } from "lucide-react";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/calendar")({
	component: CalendarPage,
	head: () => ({
		meta: seo({
			title: "Calendar & Meetings — Sullivan County, TN",
			description:
				"Upcoming county meetings, commission sessions, and public events in Sullivan County, Tennessee.",
			url: "/calendar",
		}),
	}),
});

const recurringMeetings = [
	{
		name: "County Commission Regular Session",
		schedule: "3rd Thursday of each month",
		time: "6:30 PM",
		location: "Sullivan County Courthouse, Blountville",
		notes: "Streamed live on YouTube",
		link: "https://www.youtube.com/@sullivancountycommission",
	},
	{
		name: "County Commission Work Session",
		schedule: "1st Thursday of each month",
		time: "6:30 PM",
		location: "Sullivan County Courthouse, Blountville",
	},
	{
		name: "Budget Committee",
		schedule: "As scheduled during budget season (May–June)",
		time: "Varies",
		location: "Sullivan County Courthouse, Blountville",
	},
	{
		name: "Beer Board",
		schedule: "As needed",
		time: "Varies",
		location: "Sullivan County Courthouse, Blountville",
	},
	{
		name: "Planning Commission",
		schedule: "2nd Tuesday of each month",
		time: "6:00 PM",
		location: "Sullivan County Courthouse, Blountville",
	},
	{
		name: "Board of Zoning Appeals",
		schedule: "4th Tuesday of each month (as needed)",
		time: "6:00 PM",
		location: "Sullivan County Courthouse, Blountville",
	},
];

function CalendarPage() {
	return (
		<main id="main-content" className="pt-24 pb-14">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-4 h-px w-12 bg-brand-copper" />
				<h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
					Calendar &amp; Meetings
				</h1>
				<p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
					Sullivan County government meeting schedules, public hearings, and community events.
				</p>

				{/* Recurring Meetings */}
				<section className="mb-14">
					<h2 className="font-display text-xl font-bold text-brand-navy mb-6">
						Recurring Meeting Schedule
					</h2>
					<div className="space-y-3">
						{recurringMeetings.map((meeting) => (
							<div
								key={meeting.name}
								className="group rounded-sm border border-brand-surface bg-white p-5 hover:border-brand-copper/20 transition-colors"
							>
								<div className="flex flex-col sm:flex-row sm:items-start gap-4">
									<div className="flex size-10 shrink-0 items-center justify-center rounded bg-brand-navy/5">
										<Calendar className="size-5 text-brand-navy/60" />
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="font-display text-base font-bold text-brand-navy mb-2">
											{meeting.name}
										</h3>
										<div className="flex flex-col gap-1.5 font-body text-sm text-brand-slate-light">
											<div className="flex items-center gap-2">
												<Clock className="size-3.5 shrink-0 text-brand-stone" />
												<span>
													{meeting.schedule} — {meeting.time}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<MapPin className="size-3.5 shrink-0 text-brand-stone" />
												<span>{meeting.location}</span>
											</div>
										</div>
										{meeting.link && (
											<a
												href={meeting.link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-1.5 mt-3 font-body text-xs text-brand-copper hover:text-brand-copper-light hover:underline"
											>
												<ExternalLink className="size-3" />
												Watch Live on YouTube
											</a>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Upcoming Events */}
				<section className="mb-14">
					<h2 className="font-display text-xl font-bold text-brand-navy mb-6">
						Upcoming Events
					</h2>
					<div className="rounded-sm border border-brand-surface bg-brand-parchment p-8 text-center">
						<Calendar className="mx-auto size-10 text-brand-stone/40 mb-4" />
						<p className="font-display text-base font-bold text-brand-navy mb-2">
							No upcoming events scheduled
						</p>
						<p className="font-body text-sm text-brand-slate-light max-w-md mx-auto">
							Check back for upcoming community events, public hearings, and special sessions.
							Meeting agendas are published before each session.
						</p>
					</div>
				</section>

				{/* Resources */}
				<div className="rounded-sm border border-brand-surface bg-brand-parchment p-7">
					<h2 className="font-display text-lg font-bold text-brand-navy mb-4">
						Meeting Resources
					</h2>
					<div className="flex flex-wrap gap-3">
						<a
							href="https://www.youtube.com/@sullivancountycommission"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-sm bg-white border border-brand-surface px-4 py-2 font-body text-sm text-brand-slate hover:border-brand-copper/30 hover:text-brand-navy transition-colors"
						>
							<ExternalLink className="size-3.5" />
							Commission YouTube Channel
						</a>
						<Link
							to="/documents"
							className="rounded-sm bg-white border border-brand-surface px-4 py-2 font-body text-sm text-brand-slate hover:border-brand-copper/30 hover:text-brand-navy transition-colors"
						>
							Meeting Agendas &amp; Minutes
						</Link>
						<Link
							to="/commissioners"
							className="rounded-sm bg-white border border-brand-surface px-4 py-2 font-body text-sm text-brand-slate hover:border-brand-copper/30 hover:text-brand-navy transition-colors"
						>
							Commissioner Directory
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
