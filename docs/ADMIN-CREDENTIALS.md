# Sullivan County TN -- Admin Access

**Site:** https://sullivan-county-tn.codyboring.workers.dev  
**Admin URL:** https://sullivan-county-tn.codyboring.workers.dev/admin/login
**Prepared with AI assistance.**

## Production Password

Do not store production admin passwords in this repository.

The prior committed password has been removed from source and deployed E2E tests now read `E2E_ADMIN_PASSWORD` from the environment. Ask the project owner to rotate or set `ADMIN_PASSWORD` through Cloudflare when admin access is needed.

Set or rotate via: `pnpm exec wrangler secret put ADMIN_PASSWORD`

## Local Development

Copy `.dev.vars.example` to `.dev.vars`:

```bash
cp .dev.vars.example .dev.vars
```

Then run:

```bash
pnpm run dev
```

Local dev password is set in `.dev.vars` (gitignored).

## Changing Password

```bash
pnpm exec wrangler secret put ADMIN_PASSWORD
```

## Login Flow

1. Navigate to `/admin/login`
2. Enter the password
3. You get a 24-hour session (ULID-based, stored in D1)
4. Session is `httpOnly`, `secure`, `SameSite=strict` cookie

## Security Notes

- Password is never stored in source code, `wrangler.jsonc`, or committed to git
- Deployed admin E2E tests skip unless `E2E_ADMIN_PASSWORD` is set in the runner environment
- Password comparison uses `crypto.subtle.timingSafeEqual()` with SHA-256 hashing
- Sessions are ULID-based (time-sortable, unique)
- Login is rate-limited: 5 attempts per 60 seconds
- All admin endpoints require session validation via `requireAdmin()` guard
- D1 unavailable = blocked access (no auth bypass)
