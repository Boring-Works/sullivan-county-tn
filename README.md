# Sullivan County, Tennessee

Official government website for Sullivan County, Tennessee. A modern citizen services portal featuring property tax lookup, live NWS weather, USGS river conditions, robust forms, and progressive web app capabilities.

## Current State
Active — Deployed on Cloudflare Workers. Features 41 live routes including property tax lookup, county departments, contact/forms workflows, admin tools, and a live weather plus river-conditions subsystem.

## Tech Stack
TypeScript, TanStack Start, Cloudflare D1, Cloudflare Workers

## Key Dependencies
@tanstack/react-start, @tanstack/react-router, drizzle-orm, react-hook-form, zod, radix-ui, tailwind-merge

## Commands
```bash
pnpm install --frozen-lockfile
pnpm run dev
pnpm run build
pnpm run deploy
```

## Release Sanity Check
```bash
pnpm exec biome check . && pnpm exec tsc --noEmit && pnpm exec vitest run && pnpm run build
```

## GitHub Deploys

Cloudflare production deploys run through `.github/workflows/deploy.yml` when `CLOUDFLARE_API_TOKEN`
is configured with Workers Scripts write access. Without that secret, CI still builds and tests, but
the deploy step is skipped so main does not show a false deploy failure.

Preview deploys are intentionally disabled until preview-specific D1/KV bindings exist. This prevents
pull-request Workers from sharing production data.

## Recent Weather & River Updates (May 2026)
- `/weather` is now **Weather & River Conditions**, not just a forecast page.
- NWS data powers current conditions, alerts, hourly outlook, day/night forecast, and the temperature trend.
- USGS stream gauges power river/creek cards for Beaver Creek, South Fork Holston, and North Fork Holston.
- River cards show flow (`cfs`), gauge height (`ft`), trend, last observation time, and official USGS links.
- Wind/compass handling now supports calm/variable wind and 16-point compass labels.

## Recent Navigation & Share UX Updates (May 2026)
- Verb-navigation active state now evaluates both pathname and search params (notably `/departments?category=...`).
- FIND → Departments links now include category filters via route search params.
- Mobile drawer includes an explicit Home action and active-state semantics (`aria-current`).
- Search dialog supports prefilled initial queries when opened programmatically.
- Contact cards include two paths:
  - **Save contact** (vCard download)
  - **Share details** (Web Share API with clipboard fallback)
- vCard payload no longer embeds a hardcoded deployment URL.
