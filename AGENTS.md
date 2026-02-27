# AGENTS.md

## Build & Test
- Install: `npm ci`
- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npm test`
- Lint: `npx biome check .`
- Format: `npx biome format --write .`
- Deploy: `npm run deploy`
- CF Types: `npm run cf-typegen`

## Package Manager
npm (use package-lock.json, NOT pnpm-lock.yaml)

## Deploy
Cloudflare Workers (TanStack Start SSR). Config in wrangler.jsonc.

## Tech Stack
- TanStack Start + Router + Query + Form
- Cloudflare Workers + Vite Plugin
- Tailwind CSS v4
- Biome (lint + format)
- shadcn/ui + Radix UI
- TypeScript strict mode
- Drizzle ORM (D1-ready)
- Vitest (testing)

## Conventions
- Biome for linting and formatting (NOT eslint/prettier)
- Tab indentation, 100 char line width
- File-based routing via TanStack Router
- Money as integer cents (avoid floating point)
- IDs as UUIDs
- Dates as ISO 8601 strings

## Do NOT
- Generate pnpm-lock.yaml (this project uses npm)
- Use eslint or prettier (this project uses Biome)
- Modify wrangler.jsonc deploy config without asking
- Use `any` type without justification
- Skip TypeScript strict checks
- Install packages without checking if equivalent exists


## Project
Holston Partners — Government relations and political consulting platform for East Tennessee. Joyce for State Senate campaign infrastructure.

## Additional Tech
- Drizzle ORM (D1-ready)
- Cloudflare D1 (planned database)

## Deploy
- Deploy: `npm run deploy`
- Live: https://holston-partners.codyboring.workers.dev

## Key Features
- Constituent management
- Campaign analytics dashboard
- Donor tracking
- Event scheduling
- Policy position library

## Design
- Slate color scheme (professional/authoritative)
- Blue accent (trust/authority)
- Clean, government-appropriate aesthetic
