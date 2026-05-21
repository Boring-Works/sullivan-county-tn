# Weather Upgrade Options

Last updated: 2026-05-21

AI-generated research synthesis. Review before publishing or using as official policy.

## Current Baseline

The `/weather` page is already better than a generic embedded forecast because it combines official National Weather Service forecasts and alerts, USGS river gauges, TVA lake-level links, TDOT/TN 511 road links, edge caching, and local trend archiving. The highest-value next work should make the page more decision-oriented for residents, emergency managers, commuters, lake users, and older mobile users.

## Ranked Options

| Rank | Option | Citizen Value | Effort | Reliability | Recommendation |
| --- | --- | --- | --- | --- | --- |
| 1 | Situation summary card | Very high | Low | High | Implemented |
| 2 | County-specific hazard guidance | Very high | Low | High | Implemented |
| 3 | Weather timeline by daypart | High | Medium | High | Do after summary |
| 4 | Commuter and school-morning panel | High | Medium | High | Good civic fit |
| 5 | Air quality card from AirNow | Medium-high | Medium | Medium | Add if API/token terms fit |
| 6 | Radar link or static radar embed | Medium | Medium | Medium | Link first, embed later |
| 7 | Better charts with a chart library | Medium | Medium | High | Nice, not urgent |

## 1. Situation Summary Card

Add a plain-language card above the detailed sections that answers: "Is there anything I need to act on right now?" It should combine alerts, rain chance, wind, current forecast phrase, river trend count, and road/lake links into one short status.

Recommended output examples:

- `No active NWS alerts. Rain chance is 20%. River gauges are steady. Roads: check TDOT before mountain or interstate travel.`
- `Severe Thunderstorm Warning active. Move indoors now. Check NWS alert details and avoid flooded roads.`

Why this is the top option:

- Residents do not need a meteorology dashboard first. They need an action answer.
- Uses existing cached data, so no new dependency or external source.
- Improves mobile first-fold comprehension immediately.

Implementation notes:

- Add a helper that derives a `WeatherSituation` object from `PublicWeatherSnapshot` and `RiverGauge[]`.
- Unit test the helper with alert/no-alert/rising-river/high-wind cases.
- Render after the navy page header and before active alerts.

## 2. County-Specific Hazard Guidance

Add reusable guidance blocks for Sullivan County hazards: thunderstorms, flooding, winter weather, heat, high wind, lake/boating, and mountain travel. Show only the relevant guidance based on active alert event names, forecast text, wind speed, precipitation chance, and river trends.

Why it matters:

- NWS alert text can be long and technical.
- A county site can translate official conditions into local action without replacing NWS.
- This is especially useful for older residents and mobile users.

Implementation notes:

- Keep guidance static and conservative.
- Label official source boundaries clearly: "Use this with official NWS alerts, not instead of them."
- Avoid making medical, evacuation, or road-closure claims unless sourced.

## 3. Weather Timeline By Daypart

Replace or augment the horizontal hourly strip with grouped dayparts: morning, afternoon, evening, overnight. Each group should show temperature range, rain chance, wind, and a short planning note.

Why it matters:

- `Next 12 hours` is useful but visually dense on phones.
- Dayparts map better to resident decisions: school drop-off, commute, outdoor work, evening events, overnight storms.

Implementation notes:

- Use existing NWS hourly periods.
- No chart dependency required.
- Add a utility that groups hourly records by local time in `America/New_York`.

## 4. Commuter And School-Morning Panel

Add a compact panel focused on morning travel: current condition, wind, precipitation chance, alert status, TDOT SmartWay link, TN 511 link, and a plain-language caution if rain/wind/winter terms are present.

Why it matters:

- Sullivan County residents rely heavily on I-81, I-26, local highways, and school travel.
- This gives the weather page a county-government reason to exist beyond a consumer forecast.

Implementation notes:

- Keep it link-based for roads. Do not scrape TDOT.
- Consider showing only before noon or always as "Travel planning."

## 5. Air Quality Card From AirNow

Add AQI for wildfire smoke, ozone, and particle pollution if AirNow API use is acceptable. This is relevant for older residents, outdoor workers, school athletics, and smoke events.

Why it matters:

- Normal weather apps often bury air quality.
- A public-health-adjacent county page benefits from a clear AQI card.

Risks:

- Requires API registration and environment variable management.
- Must verify terms, quota, and attribution.

Implementation notes:

- Add only through server-side fetch and KV cache.
- Never expose an API key client-side.
- Use a conservative fallback when unavailable.

## 6. Radar Link Or Static Radar Embed

Add an official radar CTA to NWS or a stable weather.gov radar page. Consider an embed only if it is accessible, reliable, and does not degrade mobile performance.

Why it matters:

- During storms, people expect radar.
- The county site can route residents to official radar without owning map complexity.

Recommendation:

- Link first.
- Avoid heavy third-party map/radar embeds on the main weather page until tested for accessibility, privacy, and performance.

## 7. Better Charts With A Chart Library

The custom SVG temperature trend is simple and dependency-free. A library such as Recharts could improve axes, tooltips, responsive behavior, and multi-series data if the page later stores humidity, wind, or river trends.

Why it is ranked lower:

- It improves polish more than citizen decisions.
- It adds dependency weight.
- Current data volume is small.

Implementation notes:

- Defer until there are at least two or three useful series.
- If added, prefer one shared chart component for weather and river trend charts.

## Recommended Next Build

Options 1 and 2 are implemented. The next highest-value build is option 3, the weather timeline by daypart:

- Group the existing NWS hourly periods into morning, afternoon, evening, and overnight.
- Show temperature range, rain chance, wind, and one planning note per daypart.
- Keep the current horizontal 12-hour strip if it remains useful on desktop, but make dayparts the mobile-first planning view.

This would improve mobile planning without new APIs, new dependencies, scraping, or Cloudflare deployment risk.
