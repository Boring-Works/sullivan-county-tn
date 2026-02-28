import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "~/hooks/useScrollReveal";

const accentClasses = {
	"brand-copper": "bg-brand-copper",
	"brand-sage": "bg-brand-sage",
	"brand-navy": "bg-brand-navy",
} as const;

const HIGHLIGHTS = [
	{
		title: "Birthplace of Country Music",
		description:
			"Explore the rich history and vibrant culture of Sullivan County — the Birthplace of Country Music. Visit the museum in Bristol to experience the captivating exhibits and fascinating stories behind the genre's origins.",
		url: "https://birthplaceofcountrymusic.org/",
		icon: "🎵",
		accent: "brand-copper" as const,
	},
	{
		title: "Outdoor Recreation",
		description:
			"From Boone Lake and South Holston Lake to scenic parks and the Appalachian Trail corridor, Sullivan County offers endless opportunities for boating, fishing, hiking, and camping across 430 square miles of highlands.",
		url: "https://www.historicsullivan.com/",
		icon: "🏔️",
		accent: "brand-sage" as const,
	},
	{
		title: "Bristol Motor Speedway",
		description:
			'Known as "The Last Great Colosseum," Bristol Motor Speedway is one of the most iconic tracks in NASCAR. This high-banked, half-mile oval delivers heart-pounding action and an electric atmosphere.',
		url: "https://www.bristolmotorspeedway.com/",
		icon: "🏁",
		accent: "brand-navy" as const,
	},
];

export function CommunityHighlights() {
	const containerRef = useScrollReveal<HTMLElement>();

	return (
		<section ref={containerRef} className="relative bg-white py-20 sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div data-reveal className="mb-12 text-center">
					<span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
						Explore the Region
					</span>
					<h2 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
						Discover Sullivan County
					</h2>
					<div className="mt-4 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-brand-copper to-transparent" />
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{HIGHLIGHTS.map((item, i) => (
						<a
							key={item.title}
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							data-reveal
							data-reveal-delay={i * 100}
							className="card-lift group relative flex flex-col rounded-sm border border-brand-surface bg-brand-parchment overflow-hidden"
						>
							{/* Top accent bar */}
							<div
								className={`h-1 ${accentClasses[item.accent]} scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100`}
							/>

							<div className="flex-1 p-7">
								{/* Icon */}
								<div className="mb-4 text-3xl">{item.icon}</div>

								<h3 className="font-display text-lg font-bold text-brand-navy mb-3 group-hover:text-brand-copper transition-colors">
									{item.title}
								</h3>
								<p className="font-body text-sm leading-relaxed text-brand-slate-light flex-1">
									{item.description}
								</p>

								<div className="mt-5 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-brand-copper group-hover:text-brand-copper-light transition-colors">
									Learn more
									<ExternalLink className="size-3" />
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
