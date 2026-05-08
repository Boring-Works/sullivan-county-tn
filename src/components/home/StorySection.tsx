import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PersonCard } from "~/components/people/PersonCard";
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
const HIGHLIGHT_YEARS = [1779, 1780, 1796, 1927, 2025] as const;

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
    <section aria-labelledby="story-heading" className="relative bg-brand-cream py-20 sm:py-24">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16" data-reveal>
          <span className="inline-block font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-brass">
            {t("storySection.eyebrow")}
          </span>
          <h2
            id="story-heading"
            className="mt-3 font-display text-3xl font-bold text-brand-navy text-balance sm:text-4xl"
          >
            {t("storySection.heading")}
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-brand-slate sm:text-lg text-pretty">
            {t("storySection.body")}
          </p>
        </div>

        {/* Timeline preview — 5 highlight events as a horizontal newspaper-style
            row. Stacks on mobile. */}
        <div className="mb-14 sm:mb-16" data-reveal data-reveal-delay={100}>
          <h3 className="mb-5 font-display text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-brass">
            {t("storySection.timelineHeading")}
          </h3>
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {HIGHLIGHT_EVENTS.map((event, i) => {
              const colorVar = CATEGORY_COLORS[event.category];
              return (
                <li
                  key={`${event.year}-${event.title}`}
                  data-reveal
                  data-reveal-delay={120 + i * 80}
                  className="relative rounded-sm border border-brand-surface bg-white p-5"
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-sm"
                    style={{ backgroundColor: `var(--color-${colorVar})` }}
                  />
                  <p
                    className="font-display text-3xl font-bold text-brand-navy leading-none"
                    aria-label={`Year ${event.year}`}
                  >
                    {event.year}
                  </p>
                  <p className="mt-2 font-body text-sm font-semibold text-brand-slate">
                    {event.title}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Notable figures — 3 cards from PersonCard component */}
        <div className="mb-12" data-reveal data-reveal-delay={200}>
          <h3 className="mb-5 font-display text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-brass">
            {t("storySection.peopleHeading")}
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {HIGHLIGHT_PEOPLE.map((person, i) => (
              <PersonCard key={person.name} person={person} index={i} />
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
