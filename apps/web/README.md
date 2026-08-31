# Expense Tracker Web Client

[![Next.js][nextjs-badge]][nextjs-url]
[![React][react-badge]][react-url]
[![Tailwind CSS][tailwind-badge]][tailwind-url]
[![TypeScript][typescript-badge]][typescript-url]
[![Zustand][zustand-badge]][zustand-url]
[![Storybook][storybook-badge]][storybook-url]

This is the frontend client for the Expense Tracker application. Built on Next.js, it provides a dashboard for detailed purchase entry, price dynamics visualization, and budget limit monitoring.

## Tech Stack

- **Framework**: Next.js (v16.2.10) (App Router)
- **Library**: React 19 (v19.2.4)
- **Styling**: Tailwind CSS (v4)
- **Language**: TypeScript
- **State Management**: Zustand
- **Linter**: ESLint 9 (Flat Config) + `eslint-plugin-tailwindcss`
- **Formatter**: Prettier
- **UI Explorer**: Storybook

---

## Features

- **Dashboard Overview**: Quick stats of current budget utilization, recent purchases, and quick action buttons.
- **Purchase Tracker**: Interface to log purchases, including items, categories, prices, and merchants.
- **Price Dynamics**: Graphic charts illustrating price changes for selected products.
- **Budget Planner**: Configuration panel to set up and manage spending categories and target limits.

---

## Architecture & Folder Structure

The client application follows a **layered, feature-driven architecture (FSD-Light)** optimized for Next.js App Router. Code is organized into four layers — `shared`, `features`, `widgets`, `app` — with a strict, lint-enforced dependency direction between them.

```text
src/
├── app/                  # Next.js App Router (Routes, Page Views & Layouts)
│   ├── (auth)/           # Route group for auth pages (/login, /register)
│   ├── (protected)/      # Route group for authenticated app pages
│   ├── error.tsx
│   ├── layout.tsx
│   └── page.tsx          # Landing / Home page
├── widgets/              # Composite, page-level UI blocks
│   └── [widget-name]/    # e.g. appShell, receiptsList, dashboard
│       └── index.ts      # Strict Public API
├── features/             # Self-contained domain modules
│   ├── [feature-name]/   # Example feature module (auth, receipts, categories)
│   │   ├── actions/      # Server Actions (e.g., fetch, mutate)
│   │   ├── components/   # UI layer
│   │   │   ├── forms/    # Smart forms (e.g., LoginForm)
│   │   │   ├── modals/   # Feature-specific modals
│   │   │   └── ui/       # Dumb/presentational feature-specific components
│   │   ├── context/      # React Context providers for the feature
│   │   ├── hooks/        # Custom hooks containing business logic
│   │   ├── schemas.ts    # Zod validation schemas
│   │   ├── types.ts      # TypeScript interfaces and types
│   │   └── index.ts      # Strict Public API (exports only what is needed outside)
└── shared/               # Shared infrastructure, design system & utilities
    ├── ui/               # Design system components (Button, Hero, Typography, Link...)
    ├── api/              # Typed API client wrappers (apiClient.ts, apiClient.server.ts)
    ├── lib/              # Cross-cutting helpers (cn, auth.server, token, fileUploader...)
    ├── config/           # App-wide constants
    ├── types/            # Cross-cutting TypeScript types
    └── hooks/            # Generic, domain-agnostic hooks
```

### Core Architectural Rules

1. **Layer hierarchy (`shared < features < widgets < app`)**: a layer may only import from layers below it. `shared` depends on nothing else in the app; `features` depend only on `shared`; `widgets` compose `shared` + `features` into page-level blocks (e.g. a list, its delete flow, and pagination together); `app` composes everything. This is enforced automatically by `eslint-plugin-boundaries` (see `eslint.config.mjs`) — a disallowed import fails `pnpm lint`.
2. **App Router Boundary (`src/app/`)**: `src/app/` handles routing, layouts, and page entry points only. Pages delegate rendering and business logic to `widgets/` or `features/`.
3. **Feature Co-location (`src/features/`)**: Everything specific to a single business capability (components, server actions, Zod schemas, types) lives inside `features/<feature-name>/`. A feature never imports from another feature — shared types/logic belong in `shared/` instead.
4. **Strict Public API**: Every feature and widget exposes its interface strictly through `index.ts`. Deep imports into a slice's internal files from outside that slice are forbidden and fail lint.
5. **Client components importing server actions**: a feature's `index.ts` barrel may re-export both server actions and client-safe pieces (hooks, components). A `'use client'` file that only needs the client-safe part should import it directly (bypassing the barrel) rather than through `index.ts`, to avoid pulling server-only code (e.g. anything touching `next/headers`) into the browser bundle.

---

## Environment Variables

Create a `.env` file in the root of the `apps/web/` directory (you can copy `.env.example`) to configure the frontend application:

```bash
cp .env.example .env
```

The `.env` file should contain:

```env
API_URL="http://localhost:3001"

# JWT Authentication
JWT_SECRET="your_jwt_secret_key_here"  # Must match the JWT_SECRET value used on the API server
```

---

## Getting Started

First, make sure the dependencies are installed and the API backend is running.

### Development Server

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build and Start for Production

Build the application for production deployment:

```bash
pnpm build
```

Start the Next.js production server:

```bash
pnpm start
```

### Code Quality

Run ESLint checking:

```bash
pnpm lint
```

Run ESLint and auto-fix issues:

```bash
pnpm lint:fix
```

Format code using Prettier:

```bash
pnpm format
```

Check code formatting:

```bash
pnpm format:check
```

Sort Tailwind CSS class names in the recommended order:

```bash
pnpm lint:sort
```

> Automatically reorders Tailwind classes across all files following the official recommended order:
> `positioning → layout → spacing → visual → typography`.
> Runs automatically on save if you use the VS Code Prettier + ESLint extensions.

### Storybook (UI Component Explorer)

Storybook is set up to develop and test UI components in isolation. It includes global styles and automatically discovers stories matching `*.stories.tsx` across the application.

Start the Storybook development server:

```bash
pnpm storybook
```

This will launch Storybook locally, accessible at [http://localhost:6006](http://localhost:6006).

---

## Code Conventions

These rules are enforced automatically on file save (VS Code) or via the scripts above.

| Rule                 | Value            | Description                                         |
| -------------------- | ---------------- | --------------------------------------------------- |
| Semicolons           | **off**          | No `;` at the end of lines                          |
| Quotes               | **single**       | Use `'` instead of `"` in JS/TS                     |
| Print width          | **80**           | Soft line length limit                              |
| Trailing commas      | **es5**          | Trailing commas where valid in ES5                  |
| JSX props            | **one per line** | Each prop on its own line when there are multiple   |
| Tailwind class order | **recommended**  | `position → layout → spacing → visual → typography` |

VS Code auto-format on save is pre-configured in `.vscode/settings.json`.

[nextjs-badge]: https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white
[nextjs-url]: https://nextjs.org
[react-badge]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[react-url]: https://react.dev
[tailwind-badge]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com
[typescript-badge]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org
[zustand-badge]: https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logoColor=white
[zustand-url]: https://zustand-demo.pmnd.rs
[storybook-badge]: https://img.shields.io/badge/storybook-%23FF4785.svg?style=for-the-badge&logo=storybook&logoColor=white
[storybook-url]: https://storybook.js.org
