# AGENTS.md — apps/web (Next.js Frontend)

Applies to all code under `./apps/web/`. Read `../../AGENTS.md` first for
monorepo-wide context.

## Stack

- **Next.js**: 16.2.10
- **Router**: App Router (not Pages Router)
- **React**: 19.2.4
- **Styling**: Tailwind CSS version 4.x
- **Language**: TypeScript

> ⚠️ Keep the version numbers above updated whenever you upgrade dependencies. Do not rely on training-data assumptions about Next.js/React APIs — versions 14/15/19 have introduced breaking changes (e.g. async `params`/`searchParams`, caching defaults, Server Actions behavior). Verify against `package.json` and `nextjs_docs` MCP tool before writing code that depends on version-specific behavior.

## Conventions

- **Server vs. Client Components**: default to Server Components. Add `"use client"` only when necessary (interactivity, browser APIs, hooks). Keep client components as leaves in the tree where possible.
- **Data fetching**: prefer fetching on the server. Avoid client-side fetching for data that could be fetched server-side.
- **Images**: use `next/image`, not raw `<img>`, unless explicitly justified.
- **Links**: use `next/link`, not raw `<a>`, for internal navigation.
- **Styling**: use Tailwind theme tokens (`text-primary`, `w-4`, etc.) rather than arbitrary values (`w-[15px]`, `text-[#123456]`) unless there's no equivalent token.
- **Dynamic classes**: use `clsx` / `tailwind-merge` rather than long manual ternary strings in `className`.

## Auth

- JWT is stored in an **httpOnly cookie**, never in localStorage/sessionStorage.
- Route protection and redirects are handled via Next.js **middleware** (`proxy.ts` at the app root). Сheck there before adding auth logic elsewhere.

## File & Naming Conventions

- Reserved Next.js filenames (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`) follow Next.js conventions — do not rename them.
- Components: `PascalCase` file names for components outside routing (e.g. `UserCard.tsx`).
- Hooks: must start with `use` (e.g. `useUser.ts`).
- Folders/utilities: `camelCase`.

## Before Writing or Modifying Code

1. Check `./apps/web/package.json` for the exact Next.js/React version.
2. Before using ANY Next.js API, always attempt to query the `nextjs_docs` MCP tool first to verify the correct signature or behavior for the installed version — regardless of how confident you are. Do not pre-filter which features "need" checking; query first, then write code.
3. Only fall back to internal/training knowledge if the `nextjs_docs` tool call fails or is unavailable in this session. In that case, explicitly state in your response: "nextjs_docs unavailable — proceeding from internal knowledge, verify manually against package.json/docs." Never silently fall back without flagging it.
4. Don't assume version-specific defaults (e.g. fetch caching behavior) without checking — these have changed between major Next.js versions.
