import { Mail, MapPin, Phone, User } from "lucide-react";
import type { Commissioner } from "~/data/commissioners";

interface CommissionerCardProps {
	commissioner: Commissioner;
}

export function CommissionerCard({ commissioner }: CommissionerCardProps) {
	return (
		<div className="card-lift group relative rounded-sm border border-brand-surface bg-white overflow-hidden">
			{/* Accent on hover */}
			<div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-brass scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />

			<div className="flex gap-4 p-5">
				{/* Photo */}
				<div className="shrink-0">
					<div className="relative size-20 rounded-sm overflow-hidden border-2 border-brand-surface group-hover:border-brand-brass/40 transition-colors duration-300">
						{commissioner.photo ? (
							<img
								src={commissioner.photo}
								alt={commissioner.name}
								className="size-full object-cover object-top official-headshot"
								loading="lazy"
							/>
						) : (
							<div className="size-full bg-brand-parchment flex items-center justify-center">
								<User className="size-8 text-brand-stone/40" />
							</div>
						)}
						{/* Subtle vignette overlay */}
						<div className="absolute inset-0 rounded-sm shadow-[inset_0_0_12px_rgba(12,30,51,0.08)] pointer-events-none" />
					</div>
				</div>

				{/* Info */}
				<div className="flex-1 min-w-0">
					<h3 className="font-display text-base font-bold text-brand-navy mb-1.5 truncate">
						{commissioner.name}
					</h3>
					<div className="flex items-start gap-1.5 font-body text-xs text-brand-slate-light mb-2.5">
						<MapPin className="mt-0.5 size-3 shrink-0 text-brand-stone" />
						<span className="line-clamp-2">{commissioner.address}</span>
					</div>

					<div className="flex flex-col gap-1.5 font-body text-xs">
						{commissioner.phone && (
							<div className="flex items-center gap-1.5">
								<Phone className="size-3 shrink-0 text-brand-navy/40" />
								<a
									href={`tel:${commissioner.phone}`}
									className="text-brand-slate hover:text-brand-navy hover:underline"
								>
									{commissioner.phone}
								</a>
							</div>
						)}
						{commissioner.email && (
							<div className="flex items-center gap-1.5">
								<Mail className="size-3 shrink-0 text-brand-navy/40" />
								<a
									href={`mailto:${commissioner.email}`}
									className="truncate text-brand-slate hover:text-brand-navy hover:underline"
								>
									{commissioner.email}
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
