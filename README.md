# Sullivan County, Tennessee

Official government website for Sullivan County, Tennessee. A modern citizen services portal featuring live NWS weather integration, robust forms, and progressive web app capabilities.

## Current State
Active — Deployed on Cloudflare Workers. Features 40 live routes including property tax lookup, county departments, contact/forms workflows, and a live NWS weather subsystem.

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
pnpm exec biome check . && pnpm exec tsc --noEmit && pnpm run build && pnpm test -- --run
```

## GitHub Deploys

Cloudflare deploys run through `.github/workflows/deploy.yml`. Set `CLOUDFLARE_API_TOKEN`
as a GitHub Actions secret with Workers Scripts write access. Without that secret, CI still builds
and tests, but the deploy job is skipped so main does not show a false deploy failure.

## Recent Navigation & Share UX Updates (May 2026)
- Verb-navigation active state now evaluates both pathname and search params (notably `/departments?category=...`).
- FIND → Departments links now include category filters via route search params.
- Mobile drawer includes an explicit Home action and active-state semantics (`aria-current`).
- Search dialog supports prefilled initial queries when opened programmatically.
- Contact cards include two paths:
  - **Save contact** (vCard download)
  - **Share details** (Web Share API with clipboard fallback)
- vCard payload no longer embeds a hardcoded deployment URL.
