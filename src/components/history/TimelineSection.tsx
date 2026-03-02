import { Link } from "@tanstack/react-router";
import { CATEGORY_COLORS, CATEGORY_LABELS, type TimelineEvent } from "~/data/timeline";
import { useScrollReveal } from "~/hooks/useScrollReveal";

interface TimelineSectionProps {
  events: TimelineEvent[];
  title?: string;
}

export function TimelineSection({ events, title }: TimelineSectionProps) {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={containerRef} className="relative">
      {title && (
        <h3
          data-reveal
          className="font-display text-xl font-bold text-brand-navy mb-8 text-center sm:text-2xl"
        >
          {title}
        </h3>
      )}

      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-brand-brass/40 via-brand-copper/30 to-brand-brass/40 sm:left-1/2" />

      <div className="space-y-8">
        {events.map((event, i) => {
          const isLeft = i % 2 === 0;
          const colorClass = CATEGORY_COLORS[event.category];

          return (
            <div
              key={`${event.year}-${event.title}`}
              data-reveal
              data-reveal-delay={Math.min(i * 60, 300)}
              className={`relative flex items-start gap-4 sm:gap-0 ${
                isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              {/* Dot on line */}
              <div className="absolute left-4 top-2 sm:left-1/2 -translate-x-1/2 z-10">
                <div
                  className={`h-3 w-3 rounded-full ring-4 ring-white`}
                  style={{
                    backgroundColor: `var(--color-${colorClass})`,
                  }}
                />
              </div>

              {/* Content */}
              <div
                className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                  isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8"
                }`}
              >
                <div className="rounded-sm border border-brand-surface bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-display text-lg font-bold text-brand-navy">
                      {event.year}
                    </span>
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
                      style={{
                        backgroundColor: `color-mix(in srgb, var(--color-${colorClass}) 10%, transparent)`,
                        color: `var(--color-${colorClass})`,
                      }}
                    >
                      {CATEGORY_LABELS[event.category]}
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-brand-navy mb-1">
                    {event.title}
                  </h4>
                  <p className="font-body text-xs leading-relaxed text-brand-slate-light">
                    {event.description}
                  </p>
                  {event.siteSlug && (
                    <Link
                      to="/history/$slug"
                      params={{
                        slug: event.siteSlug,
                      }}
                      className="mt-2 inline-block font-body text-[11px] font-semibold text-brand-copper hover:text-brand-copper-light transition-colors"
                    >
                      Visit site &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
