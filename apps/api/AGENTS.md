# AGENTS.md — apps/api (Express Backend)

Applies to all code under `./apps/api/`. Read `../../AGENTS.md` first for monorepo-wide context.

## Stack

- **Runtime**: Node.js
- **Framework**: Express — 5.2.x
- **ORM**: Drizzle ORM — 1.x
- **Database**: PostgreSQL (Neon)
- **Storage**: Cloudflare R2 (images)
- **Language**: TypeScript

> ⚠️ Keep the version numbers above updated whenever you upgrade dependencies. Drizzle ORM v1.x introduced breaking changes from v0.x — most notably `defineRelations` and an updated `drizzle()` initialization syntax. Do not apply v0.x patterns (old `relations()` helper, old client setup) without first checking `package.json`.

## Database Schema

- Schema lives in `./apps/api/src/db/schema.ts` (adjust path if different).
- This schema is the **single source of truth** — check it before writing or modifying any query, model, or relation.
- Design decisions already made (don't relitigate without explicit request):
  - Strict normalization — **no JSONB** for structured data.
  - Shared global catalogs (e.g. `stores`, `categories`) rather than per-user duplicated tables.
  - `categoryId` on `products` is nullable by design.
  - Case-insensitive uniqueness is enforced via `lower()` in unique indexes, not via application-level checks.

## Migrations

- Workflow is **`generate` + `migrate`** (drizzle-kit). Never use `push` in this project, even for quick local testing.
- When running migrations inside Docker Compose, use Docker networking (service name or `host.docker.internal`) — not `localhost`.

## Auth

- JWT is verified via Express middleware, matching the httpOnly-cookie strategy used on the frontend. Don't introduce a second token storage mechanism (e.g. Authorization header + localStorage) without discussion.

## File Storage

- Images go to **Cloudflare R2**. Don't suggest S3/Cloudinary/other providers unless explicitly asked to compare alternatives.

## Before Writing or Modifying Code

1. Check `./apps/api/package.json` for exact Express and Drizzle ORM versions.
2. Cross-check any query or relation against the current `schema.ts` — don't assume table/column names or relations from memory.
3. If unsure whether a Drizzle API belongs to v0.x or v1.x, verify against `package.json` and the installed version's docs before writing code.
