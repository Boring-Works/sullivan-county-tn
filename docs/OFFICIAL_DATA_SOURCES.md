# Official Data Sources

Last updated: 2026-05-21

## Implemented

| Data | Source | App Use | Notes |
| --- | --- | --- | --- |
| Weather forecast | National Weather Service API | Homepage weather badge, `/weather` | Cached in KV via `weather:current`. Respect upstream caching and avoid uncached client polling. |
| Weather alerts | National Weather Service API | Homepage alert banner, `/weather` active alerts | Homepage banner appears only when an active alert exists in the cached weather snapshot. |
| River gauges | USGS Water Services | `/weather` river conditions | Uses official USGS instantaneous values with edge caching. |
| Road conditions | TDOT SmartWay and TN 511 | Homepage emergency strip, `/weather`, `/transportation` | Homepage links TDOT SmartWay; `/weather` and `/transportation` link both TDOT SmartWay and TN 511 rather than duplicating road data. |
| Lake levels | TVA lake-level pages | `/weather`, `/visit` | Linked to TVA for Boone, South Holston, and Fort Patrick Henry. Do not scrape unless terms and stability are verified. |
| County map | Census TIGER/Line-derived SVG | Homepage community map | Static committed SVG path. No runtime map tile dependency. |
| Community stats | Static data seeded from public records and Census-style references | Community pages and homepage | Prefer audited static data over live API calls. |
| Historical photos | Wikimedia Commons, U.S. National Archives, public-domain/CC sources | Community and history pages | Keep attribution visible where required. |

## Good Next Candidates

- Census API cleanup for missing community population fields and consistent population years.
- AirNow AQI card on `/weather` for wildfire smoke and ozone events.
- Static lodging JSON for visitor/tourism pages, maintained from an annual audit.
- Leaflet map on a deeper visitor/lodging page if a real interactive map is needed.

## Intentional Skips

- Live hotel booking/pricing: outside county-site scope.
- Live Google Places calls on page load: pricing and quota risk. Use only as a cache/seed workflow if needed.
- Social media feed aggregation: maintenance and moderation risk.
- TVA scraping by default: link first; scrape only with confirmed permission and stable source shape.
- Production use of public OpenStreetMap tiles at scale: use a provider or self-host if map traffic grows.
