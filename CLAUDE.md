# Sullivan County TN Government Website

Citizen services portal for Sullivan County, Tennessee.

## Tech Stack
- TanStack Start (full-stack React framework)
- TanStack Router (file-based routing)
- Cloudflare Workers (edge deployment)
- Tailwind CSS v4
- shadcn/ui + Radix primitives
- Biome (lint + format)
- TypeScript (strict)
- Vite + Cloudflare Vite Plugin

## Key Commands
- `npm run dev` — Start dev server (local Cloudflare Workers runtime)
- `npm run build` — Production build
- `npm run preview` — Preview production build locally
- `npm run deploy` — Build + deploy to Cloudflare Workers
- `npm run lint` — Run Biome linter
- `npm run format` — Format with Biome
- `npm run test` — Run tests

## Project Structure
```
src/
├── routes/              # File-based routes
├── components/
│   ├── layout/          # Header, Footer, Navigation
│   ├── home/            # Homepage sections
│   ├── departments/     # Department page components
│   ├── commissioners/   # Commissioner components
│   ├── shared/          # Reusable components
│   └── ui/              # shadcn/ui primitives
├── data/                # Static data files (departments, commissioners, etc.)
├── lib/                 # Utilities (cn helper, etc.)
└── styles/
    └── app.css          # Tailwind + shadcn theme + brand tokens
```

## Decision Log
| Decision | Rationale | Date |
|----------|-----------|------|
| Converted from Holston Partners template | Reuse proven TanStack Start + CF Workers scaffold | 2026-02-27 |
| Multi-page with file-based routing | Departments, commissioners, services each get own routes | 2026-02-27 |
| Static data files, no database | County info is relatively static, no D1 needed | 2026-02-27 |
| Blue/orange/green brand system | Blue=trust/government, orange=Tennessee energy, green=Appalachian heritage | 2026-02-27 |
