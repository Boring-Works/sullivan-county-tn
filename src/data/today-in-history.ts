/**
 * Sullivan County / Tennessee historical facts keyed by month-day (MM-DD).
 *
 * Surfaced as a quiet fact line on the homepage hero — newspaper "almanac"
 * voice, civic-restraint by design. Pure facts, no marketing language. When
 * the date has multiple entries, the renderer picks one deterministically.
 *
 * To add an entry: confirm the date and source. Civic restraint applies —
 * "On this day in 1779, …" beats "Did you know?" or other consultant phrasing.
 */

export interface HistoryFact {
  /** Month-day in MM-DD format (e.g. "05-07"). 02-29 entries are skipped in non-leap years. */
  date: string;
  /** Year of the event. Used in the rendered text. */
  year: number;
  /** One-sentence fact in newspaper voice. */
  text: string;
}

export const TODAY_IN_HISTORY: HistoryFact[] = [
  // ── January ────────────────────────────────────────────────────
  {
    date: "01-01",
    year: 1786,
    text: "The State of Franklin was officially recognized by its own legislature; Sullivan County, established in 1779, became one of its earliest counties before the experiment ended in 1788.",
  },
  {
    date: "01-15",
    year: 1786,
    text: "John Sevier was inaugurated governor of the State of Franklin, the short-lived republic that briefly governed Sullivan County.",
  },

  // ── February ───────────────────────────────────────────────────
  {
    date: "02-01",
    year: 1869,
    text: "The Eastern Tennessee, Virginia and Georgia Railroad reached Bristol, transforming the town into Sullivan County's commercial gateway.",
  },
  {
    date: "02-28",
    year: 2026,
    text: "Sullivan County property taxes are due without penalty by February 28; payments postmarked after this date are subject to interest.",
  },

  // ── March ──────────────────────────────────────────────────────
  {
    date: "03-15",
    year: 1781,
    text: "Sullivan County militiamen returned home from the King's Mountain campaign, having marched to South Carolina to help defeat Major Patrick Ferguson's Loyalist forces.",
  },
  {
    date: "03-30",
    year: 1796,
    text: "Tennessee's constitutional convention concluded in Knoxville, days before statehood; Sullivan County had been part of the Southwest Territory since 1790.",
  },

  // ── April ──────────────────────────────────────────────────────
  {
    date: "04-15",
    year: 1791,
    text: "William Blount, governor of the Southwest Territory, met with Cherokee leaders at White's Fort to negotiate the Treaty of Holston, which followed the Long Island talks held in Sullivan County.",
  },
  {
    date: "04-26",
    year: 2027,
    text: "WCAG 2.1 AA compliance becomes mandatory for U.S. counties over 50,000 population under the Department of Justice's Title II final rule.",
  },

  // ── May ────────────────────────────────────────────────────────
  {
    date: "05-07",
    year: 1779,
    text: "The North Carolina General Assembly established Sullivan County, named for Major General John Sullivan of the Continental Army; Sullivan County is Tennessee's second-oldest county.",
  },
  {
    date: "05-15",
    year: 2026,
    text: "Tennessee's burn-permit season ended; from May 16 through October 14, debris burning does not require a state Division of Forestry permit.",
  },
  {
    date: "05-25",
    year: 2026,
    text: "Memorial Day — Sullivan County government offices are closed in observance of Americans who died while serving in the U.S. military.",
  },

  // ── June ───────────────────────────────────────────────────────
  {
    date: "06-01",
    year: 1796,
    text: "Tennessee was admitted to the Union as the 16th state; Sullivan County had been a county for seventeen years prior, under North Carolina, the State of Franklin, and the Southwest Territory in succession.",
  },
  {
    date: "06-30",
    year: 2026,
    text: "The Sullivan County fiscal year ends; the Commission must adopt a balanced FY 2026–2027 budget before July 1.",
  },

  // ── July ───────────────────────────────────────────────────────
  {
    date: "07-01",
    year: 2025,
    text: "Tennessee's revised hotel/motel occupancy tax law took effect statewide, changing how Sullivan County collects and refunds the tax.",
  },
  {
    date: "07-04",
    year: 1776,
    text: "On the date the Continental Congress adopted the Declaration of Independence, Sullivan County was three years from existing — but the militiamen who would later march to King's Mountain were already establishing settlements along the Holston River.",
  },

  // ── August ─────────────────────────────────────────────────────
  {
    date: "08-01",
    year: 1927,
    text: "The Bristol Sessions began in Bristol, Tennessee — Ralph Peer's recordings of Jimmie Rodgers and the Carter Family that would later be called the 'Big Bang of Country Music.'",
  },
  {
    date: "08-26",
    year: 1920,
    text: "The 19th Amendment was ratified after Tennessee became the 36th state to approve it; women in Sullivan County could now vote.",
  },

  // ── September ──────────────────────────────────────────────────
  {
    date: "09-25",
    year: 1780,
    text: "The Overmountain Men — including militiamen from Sullivan County — gathered at Sycamore Shoals on the Watauga River to begin the march to King's Mountain.",
  },
  {
    date: "09-26",
    year: 1780,
    text: "The Overmountain Men set out from Sycamore Shoals; nine days later they would defeat Major Patrick Ferguson at the Battle of King's Mountain, a turning point in the Southern campaign of the American Revolution.",
  },

  // ── October ────────────────────────────────────────────────────
  {
    date: "10-07",
    year: 1780,
    text: "The Battle of King's Mountain was won in 65 minutes by patriot militia from the Overmountain region, including Sullivan County volunteers.",
  },
  {
    date: "10-15",
    year: 2025,
    text: "Tennessee's burn-permit season opened; from October 15 through May 15, anyone burning debris within 500 feet of a forest must obtain a free permit at BurnSafeTN.org.",
  },

  // ── November ───────────────────────────────────────────────────
  {
    date: "11-04",
    year: 1791,
    text: "The Treaty of Holston was signed at Knoxville with the Cherokee, building on talks held earlier on Long Island of the Holston in Sullivan County.",
  },
  {
    date: "11-11",
    year: 1918,
    text: "World War I ended; Sullivan County would later honor its veterans with a courthouse memorial in Blountville.",
  },

  // ── December ───────────────────────────────────────────────────
  {
    date: "12-15",
    year: 1791,
    text: "The Bill of Rights was ratified; the protections it secured were already familiar to Sullivan County, organized under North Carolina's Constitution of 1776.",
  },
  {
    date: "12-25",
    year: 1779,
    text: "Sullivan County observed its first Christmas as a county; it had been established by the North Carolina General Assembly seven months earlier.",
  },
];

/**
 * Returns the appropriate fact for a given date, or undefined if no entry
 * exists for that month-day. Falls back to no fact rather than picking a
 * random one — silence is preferable to filler.
 */
export function getTodayInHistory(now: Date = new Date()): HistoryFact | undefined {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "2-digit",
    day: "2-digit",
  });
  // en-US 2-digit-month + 2-digit-day formats as "MM/DD"; convert to MM-DD.
  const parts = fmt.formatToParts(now);
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  if (!month || !day) return undefined;
  const key = `${month}-${day}`;
  return TODAY_IN_HISTORY.find((f) => f.date === key);
}
