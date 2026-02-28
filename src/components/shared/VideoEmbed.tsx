import { Play } from "lucide-react";
import { useState } from "react";

interface VideoEmbedProps {
	videoId: string;
	title: string;
	description?: string;
}

export function VideoEmbed({ videoId, title, description }: VideoEmbedProps) {
	const [playing, setPlaying] = useState(false);
	const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

	return (
		<div className="rounded-sm border border-brand-surface bg-white overflow-hidden shadow-sm">
			<div className="relative aspect-video bg-brand-navy">
				{playing ? (
					<iframe
						src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
						title={title}
						allow="autoplay; encrypted-media"
						allowFullScreen
						className="absolute inset-0 size-full"
					/>
				) : (
					<button
						type="button"
						onClick={() => setPlaying(true)}
						className="group absolute inset-0 size-full cursor-pointer"
					>
						<img
							src={thumbnailUrl}
							alt={title}
							className="size-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
							loading="lazy"
						/>
						{/* Dark overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-brand-navy/40" />
						{/* Play button */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="flex size-16 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:bg-white group-hover:scale-110 transition-all duration-300">
								<Play className="size-7 text-brand-navy ml-1" fill="currentColor" />
							</div>
						</div>
						{/* Title overlay */}
						<div className="absolute bottom-0 left-0 right-0 p-5">
							<p className="font-display text-base font-bold text-white">{title}</p>
							{description && (
								<p className="font-body text-xs text-white/70 mt-1">{description}</p>
							)}
						</div>
					</button>
				)}
			</div>
		</div>
	);
}
