import { createFileRoute, Link } from "@tanstack/react-router";

import { HeritageHero } from "~/components/history/HeritageHero";
import { HeritageSiteCard } from "~/components/history/HeritageSiteCard";
import { HistoryNarrative } from "~/components/history/HistoryNarrative";
import { MountainDivider, MountainDividerInverted } from "~/components/shared/MountainDivider";
import { getTrailStops } from "~/data/heritage-sites";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/history/")({
  component: HistoryPage,
  head: () => ({
    meta: seo({
      title: "The Founding Story — Sullivan County: Where Tennessee Began and Begins",
      description:
        "Sullivan County is where Tennessee's government began. Explore the founding story from Cherokee homeland to Southwest Territory capital to modern Appalachian community.",
      url: "/history",
    }),
    links: seoLinks("/history"),
  }),
});

function HistoryPage() {
  const trailStops = getTrailStops();

  return (
    <main id="main-content">
      <HeritageHero
        title="The Founding Story"
        subtitle="How a frontier county became the birthplace of Tennessee's government — and never stopped starting."
      />

      <HistoryNarrative
        eyebrow="Before European Settlement"
        title="Cherokee Homeland"
        id="cherokee"
      >
        <p>
          Long before Sullivan County bore its name, this land was Cherokee homeland. The Long
          Island of the Holston — at the confluence of the North and South Forks of the Holston
          River — was sacred ground: a council site, a gathering place, and a point on the Great
          Indian Warrior Path that connected Cherokee settlements across the Southeast.
        </p>
        <p>
          The island was designated a <strong>National Historic Landmark in 1960</strong>,
          recognizing its significance in Cherokee and American frontier history. In 1976, the City
          of Kingsport returned 3.61 acres of the island, described as "sacred Cherokee ground," to
          the Eastern Band of Cherokee Indians.
        </p>
        <p>
          "Where Tennessee Began" is a claim about governmental origins. But that government was
          established on land that had been Cherokee homeland for thousands of years. This story
          comes first, not last.
        </p>
      </HistoryNarrative>

      <MountainDivider fill="var(--color-brand-parchment)" />

      <HistoryNarrative
        eyebrow="1769–1779"
        title="Settlement and Formation"
        id="settlement"
        background="parchment"
      >
        <p>
          In 1769, William Bean built a cabin on Boone Creek, becoming one of the first permanent
          European settlers in what is now Tennessee. Other settlers followed quickly — Evan Shelby
          established Shelby's Fort at Sapling Grove (present-day Bristol) in 1771, and by 1772 the
          frontier settlers had formed the <strong>Watauga Association</strong>, one of the earliest
          attempts at self-government west of the Appalachian Mountains.
        </p>
        <p>
          Sullivan County was established by act of the{" "}
          <strong>North Carolina General Assembly in October 1779</strong>, named for General John
          Sullivan of the Continental Army. It is the second-oldest county in Tennessee. The
          county's first court was organized on February 7, 1780, establishing civil governance on
          the frontier.
        </p>
      </HistoryNarrative>

      <MountainDividerInverted fill="var(--color-brand-parchment)" className="bg-white" />

      <HistoryNarrative eyebrow="1780" title="The Overmountain Men" id="overmountain">
        <p>
          On <strong>September 25, 1780</strong>, frontier militia from Sullivan and surrounding
          counties mustered at Sycamore Shoals for the march to Kings Mountain. These "Overmountain
          Men" crossed the mountains and on <strong>October 7, 1780</strong>, defeated Major Patrick
          Ferguson's Loyalist forces at the Battle of Kings Mountain, South Carolina — a turning
          point of the Revolutionary War.
        </p>
        <p>
          Isaac Shelby, who led the Sullivan County militia, would later become the first governor
          of Kentucky. The Overmountain Victory National Historic Trail, designated in 1980,
          commemorates their march.
        </p>
      </HistoryNarrative>

      <MountainDivider fill="var(--color-brand-parchment)" />

      <HistoryNarrative
        eyebrow="1790–1796"
        title="The Southwest Territory"
        id="territory"
        background="parchment"
      >
        <p>
          In <strong>October 1790</strong>, Governor William Blount — a signer of the U.S.
          Constitution, appointed by President George Washington — established the Southwest
          Territory's capital at <strong>Rocky Mount</strong>, the home of William Cobb near
          present-day Piney Flats. Blount administered the territory from this site until relocating
          the capital to Knoxville in early 1792.
        </p>
        <p>
          The first territorial census, conducted in 1791, counted <strong>35,691 residents</strong>
          , including 3,417 enslaved people and 361 free people of color. The Southwest Territory
          was the political entity from which the State of Tennessee was born — admitted as the 16th
          state on <strong>June 1, 1796</strong>.
        </p>
        <p>
          The territorial government operated from a home sustained by enslaved labor. Rocky Mount's
          interpretive buildings include a slave cabin, acknowledging this foundational reality.
        </p>
      </HistoryNarrative>

      <MountainDividerInverted fill="var(--color-brand-parchment)" className="bg-white" />

      <HistoryNarrative eyebrow="1800s" title="The Stagecoach Era" id="antebellum">
        <p>
          As Blountville became the county seat in 1795, the <strong>Great Stage Road</strong>{" "}
          (present-day TN-126) transformed the village into a corridor of commerce and travel.
          Samuel Deery acquired the property that would become the <strong>Old Deery Inn</strong> in
          1801 — by 1821, the inn hosted eight coaches and fifty-three teams of horses. Three
          sitting or future U.S. presidents — Andrew Jackson, James K. Polk, and Andrew Johnson —
          are documented as having visited.
        </p>
        <p>
          On the Holston River, William King's boatyard evolved into the{" "}
          <strong>Netherland Inn</strong> after Richard Netherland purchased the property at
          sheriff's auction in 1818. The inn received 14 stagecoach visits per week and hosted the
          signing of the petition for Kingsport's city charter, which the Tennessee General Assembly
          passed on <strong>August 21, 1822</strong>.
        </p>
        <p>
          At <strong>Exchange Place</strong> on Orebank Road, John A. Gaines — a War of 1812 veteran
          — operated a plantation and stagecoach exchange from 1816 to 1845. These sites
          collectively tell the story of Sullivan County as a crossroads of frontier commerce.
        </p>
      </HistoryNarrative>

      <MountainDivider fill="var(--color-brand-parchment)" />

      <HistoryNarrative
        eyebrow="1861–1865"
        title="The Civil War"
        id="civil-war"
        background="parchment"
      >
        <p>
          Sullivan County stood apart from much of East Tennessee during the Civil War. On June 8,
          1861, the county voted for secession <strong>1,586 to 627</strong> — one of the few East
          Tennessee counties to support the Confederacy, earning it the nickname{" "}
          <strong>"The Little Confederacy."</strong>
        </p>
        <p>
          On September 22, 1863, Union and Confederate forces clashed at the{" "}
          <strong>Battle of Blountville</strong>. The courthouse was burned during the engagement.
          The present courthouse, built in 1853, was subsequently rebuilt and remains in use today —
          the oldest courthouse in continuous use in northeast Tennessee.
        </p>
      </HistoryNarrative>

      <MountainDividerInverted fill="var(--color-brand-parchment)" className="bg-white" />

      <HistoryNarrative eyebrow="1900s–Present" title="The Modern Era" id="modern">
        <p>
          In 1917, Kingsport was incorporated as a planned industrial city designed by{" "}
          <strong>John Nolen</strong> — one of America's first "Model Cities."{" "}
          <strong>Tennessee Eastman Corporation</strong> was founded on July 17, 1920, beginning the
          city's transformation into a major chemical manufacturing center. Today, Eastman Chemical
          Company is a Fortune 500 corporation with approximately 14,000 employees worldwide and
          ~$9.4 billion in revenue, headquartered in Kingsport.
        </p>
        <p>
          On July 25, 1927, Ralph Peer of the Victor Talking Machine Company began the{" "}
          <strong>Bristol Sessions</strong> — recording Jimmie Rodgers, the Carter Family, and other
          artists in what has become known as the "Big Bang of Country Music." The U.S. Congress
          officially designated Bristol as the <strong>"Birthplace of Country Music"</strong> in
          1998.
        </p>
        <p>
          Sullivan County continues to build on its legacy. Bristol Motor Speedway draws hundreds of
          thousands of fans annually. BAE Systems was awarded an{" "}
          <strong>$8.8 billion contract</strong> to operate the Holston Army Ammunition Plant in
          2023. Tri-Cities Airport set a passenger record of <strong>448,514</strong> in 2023. The
          county's population stands at approximately <strong>158,163</strong> (2020 Census) — the
          most populous county in the Tri-Cities region.
        </p>
      </HistoryNarrative>

      {/* Heritage Sites grid */}
      <section className="bg-brand-parchment py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
              Heritage Trail
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
              Explore the Sites
            </h2>
            <div className="mt-4 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-brand-copper to-transparent" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trailStops.map((site, i) => (
              <HeritageSiteCard key={site.slug} site={site} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/history/timeline"
              className="inline-flex items-center gap-2 rounded-sm bg-brand-copper px-6 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-brand-copper-light hover:shadow-lg"
            >
              View Full Timeline
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
