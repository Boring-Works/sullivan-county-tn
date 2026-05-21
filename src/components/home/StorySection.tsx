import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, FileText, MapPin, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { notablePeople } from "~/data/notable-people";
import { CATEGORY_COLORS, type TimelineEvent, timelineEvents } from "~/data/timeline";
import { useScrollReveal } from "~/hooks/useScrollReveal";

/**
 * StorySection — Phase 4 of the homepage redesign.
 *
 * The heritage / connective-tissue section. Pulls from data/timeline.ts and
 * data/notable-people.ts to surface a 5-event timeline preview + 3 notable
 * figures, anchored by an 80-word founding-story paragraph.
 *
 * Civic newspaper voice. Three eras of the county's story in one section:
 *   - Founding (1779–1796): Sullivan County → State of Franklin → statehood
 *   - Cultural birthplace (1927): Bristol Sessions / country music
 *   - Modern (2025): MLB Speedway Classic / current era
 *
 * CTAs route to the existing /history route hub:
 *   - Read the founding story → /history
 *   - See full timeline → /history/timeline (48 events, 6 eras)
 *   - Meet notable people → /people (full 7-person roster)
 *
 * Mounts between CommunityMap (geography) and AboutSection (institutional
 * close) so the page arcs: utility → audiences → today → communities →
 * heritage narrative → about.
 */

// 5 timeline highlights — chosen to span the county's full arc.
const HIGHLIGHT_YEARS = [1779, 1796, 1927] as const;

// 3 notable figures spanning founding-era, cultural-birthplace, and modern eras.
const HIGHLIGHT_PEOPLE_NAMES = ["Isaac Shelby", "Tennessee Ernie Ford", "Harry Coover"] as const;

const HIGHLIGHT_EVENTS: TimelineEvent[] = HIGHLIGHT_YEARS.map((year) => {
  // Pick the canonical event for each year (first match by year, prefer events
  // with no month/day if multiple exist for that year).
  const candidates = timelineEvents.filter((e) => e.year === year);
  if (candidates.length === 0) {
    throw new Error(`StorySection: no timeline event found for year ${year}`);
  }
  // Prefer the more notable / first-of-year event by simple title match where
  // possible, else the first.
  const preferred = candidates.find(
    (e) =>
      e.title.includes("Sullivan County created") ||
      e.title.includes("Battle of Kings Mountain") ||
      e.title.includes("Tennessee statehood") ||
      e.title.includes("Bristol Sessions begin") ||
      e.title.includes("MLB Speedway Classic"),
  );
  return preferred ?? candidates[0];
});

const HIGHLIGHT_PEOPLE = HIGHLIGHT_PEOPLE_NAMES.map((name) => {
  const person = notablePeople.find((p) => p.name === name);
  if (!person) {
    throw new Error(`StorySection: notable person '${name}' not found`);
  }
  return person;
});

export function StorySection() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const { t } = useTranslation();

  return (
    <section aria-labelledby="story-heading" className="relative bg-brand-cream py-10 sm:py-16">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end" data-reveal>
          <div>
            <span className="inline-block font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-brass">
              {t("storySection.eyebrow")}
            </span>
            <h2
              id="story-heading"
              className="mt-3 font-display text-3xl font-bold text-brand-navy text-balance sm:text-4xl"
            >
              {t("storySection.heading")}
            </h2>
            <p className="mt-4 line-clamp-4 font-body text-base leading-relaxed text-brand-slate text-pretty sm:text-lg lg:line-clamp-none">
              {t("storySection.body")}
            </p>
          </div>
          <div className="rounded-sm border border-brand-surface bg-white p-5">
            <h3 className="font-display text-sm font-bold text-brand-navy">Why it matters today</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-brand-slate-light">
              The story is here for orientation, not decoration: it explains the courthouse,
              communities, records, and public places residents still use.
            </p>
            <div className="mt-4 hidden grid-cols-3 gap-2 sm:grid lg:grid-cols-1 xl:grid-cols-3">
              <Link
                to="/departments/$slug"
                params={{ slug: "register-of-deeds" }}
                className="rounded-sm bg-brand-cream px-2.5 py-2 font-body text-[11px] font-semibold leading-tight text-brand-navy transition-colors hover:bg-brand-parchment sm:text-xs"
              >
                <FileText aria-hidden="true" className="mb-1 size-3.5 text-brand-copper" />
                Deeds and records
              </Link>
              <Link
                to="/documents"
                className="rounded-sm bg-brand-cream px-2.5 py-2 font-body text-[11px] font-semibold leading-tight text-brand-navy transition-colors hover:bg-brand-parchment sm:text-xs"
              >
                <BookOpen aria-hidden="true" className="mb-1 size-3.5 text-brand-copper" />
                Public documents
              </Link>
              <Link
                to="/visit"
                className="rounded-sm bg-brand-cream px-2.5 py-2 font-body text-[11px] font-semibold leading-tight text-brand-navy transition-colors hover:bg-brand-parchment sm:text-xs"
              >
                <MapPin aria-hidden="true" className="mb-1 size-3.5 text-brand-copper" />
                Visit heritage sites
              </Link>
            </div>
          </div>
        </div>

        {/* Timeline preview — 5 highlight events as a horizontal newspaper-style
            row. Stacks on mobile. */}
        <div className="mb-8" data-reveal data-reveal-delay={100}>
          <h3 className="mb-4 font-display text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-brass">
            {t("storySection.timelineHeading")}
          </h3>
          <ol className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-3">
            {HIGHLIGHT_EVENTS.map((event, i) => {
              const colorVar = CATEGORY_COLORS[event.category];
              return (
                <li
                  key={`${event.year}-${event.title}`}
                  data-reveal
                  data-reveal-delay={120 + i * 80}
                  className="relative rounded-sm border border-brand-surface bg-white p-3 sm:p-4"
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-sm"
                    style={{ backgroundColor: `var(--color-${colorVar})` }}
                  />
                  <p className="font-display text-2xl font-bold text-brand-navy leading-none sm:text-3xl">
                    <span className="sr-only">Year </span>
                    {event.year}
                  </p>
                  <p className="mt-2 font-body text-xs font-semibold leading-snug text-brand-slate sm:text-sm">
                    {event.title}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Notable figures — compact homepage preview. */}
        <div className="mb-8 hidden md:block" data-reveal data-reveal-delay={200}>
          <h3 className="mb-5 font-display text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-brass">
            {t("storySection.peopleHeading")}
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {HIGHLIGHT_PEOPLE.map((person) => (
              <Link
                key={person.name}
                to="/people"
                className="rounded-sm border border-brand-surface bg-white p-4 transition-colors hover:border-brand-copper/40 hover:bg-brand-parchment/60"
              >
                <p className="font-display text-base font-bold text-brand-navy">{person.name}</p>
                <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wide text-brand-brass">
                  {person.category}
                </p>
                <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-brand-slate-light">
                  {person.achievement}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3"
          data-reveal
          data-reveal-delay={300}
        >
          <Link
            to="/history"
            className="group inline-flex min-h-[44px] sm:min-h-0 items-center gap-2 font-body text-sm font-semibold text-brand-copper transition-colors hover:text-brand-copper-light"
          >
            <BookOpen aria-hidden="true" className="size-4" />
            {t("storySection.linkFoundingStory")}
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            to="/history/timeline"
            className="group inline-flex min-h-[44px] sm:min-h-0 items-center gap-2 font-body text-sm font-semibold text-brand-copper transition-colors hover:text-brand-copper-light"
          >
            <Clock aria-hidden="true" className="size-4" />
            {t("storySection.linkTimeline")}
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            to="/people"
            className="group inline-flex min-h-[44px] sm:min-h-0 items-center gap-2 font-body text-sm font-semibold text-brand-copper transition-colors hover:text-brand-copper-light"
          >
            <Users aria-hidden="true" className="size-4" />
            {t("storySection.linkPeople")}
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
