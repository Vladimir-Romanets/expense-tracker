# AGENTS.md — Monorepo Root

This file provides baseline context for any AI agent working in this repository. More specific rules live in `./apps/web/AGENTS.md` and `./apps/api/AGENTS.md` — those take precedence over this file when working inside their respective app.

## Project Structure

This is a monorepo containing two applications:

- `./apps/web/` — Next.js frontend, deployed on Vercel
- `./apps/api/` — Express backend, deployed on Railway

## Package Manager

- This project uses **pnpm**. Never use `npm install` or `yarn` — always `pnpm install`.
- Workspace-level dependencies may be hoisted to the root `node_modules/`. If a per-app `node_modules/<package>` path doesn't exist, check the root instead.

## Local Development

- Local environment runs via **Docker Compose**.
- When containers need to reach each other (e.g. migrations, API calls between services), use Docker service names or `host.docker.internal` — never `localhost`, which resolves differently inside containers.

## Cross-Cutting Architecture

- **Auth flow**: JWT stored in httpOnly cookies. Verified via Next.js middleware on the frontend (`./apps/web/`) and corresponding middleware on the backend (`./apps/api/`). Never suggest localStorage/sessionStorage for tokens — this is a deliberate security decision, not an oversight.
- **Image storage**: Cloudflare R2. Don't suggest S3, Cloudinary, or other alternatives unless explicitly asked to compare options.

## Before Making Changes

1. Identify which app you're working in (`apps/web` or `apps/api`) and read that app's `AGENTS.md` first.
2. Check that app's `package.json` for exact dependency versions before relying on training knowledge — especially for Next.js and Drizzle ORM,
   which have had breaking changes across major versions.
3. If a change spans both apps (e.g. a shared type, an API contract change), state explicitly which parts belong to which app and apply each app's
   conventions separately.

## Out of Scope for This File

Do not add app-specific implementation details here (specific Next.js version, specific Drizzle syntax, specific route structure). Those belong in the nested `AGENTS.md` files and should be kept in sync with the actual `package.json` of each app.
