# Expense Tracker Web Client

[![Next.js][nextjs-badge]][nextjs-url]
[![React][react-badge]][react-url]
[![Tailwind CSS][tailwind-badge]][tailwind-url]
[![TypeScript][typescript-badge]][typescript-url]

This is the frontend client for the Expense Tracker application. Built on Next.js, it provides a dashboard for detailed purchase entry, price dynamics visualization, and budget limit monitoring.

## Tech Stack

- **Framework**: Next.js (v16.2.10) (App Router)
- **Library**: React 19 (v19.2.4)
- **Styling**: Tailwind CSS (v4)
- **Language**: TypeScript
- **Linter**: ESLint 9 (Flat Config) + `eslint-plugin-tailwindcss`
- **Formatter**: Prettier

---

## Features

- **Dashboard Overview**: Quick stats of current budget utilization, recent purchases, and quick action buttons.
- **Purchase Tracker**: Interface to log purchases, including items, categories, prices, and merchants.
- **Price Dynamics**: Graphic charts illustrating price changes for selected products.
- **Budget Planner**: Configuration panel to set up and manage spending categories and target limits.

---

## Architecture & Folder Structure

The client application follows a **Modular Feature-Driven Architecture (FSD-Light)** optimized for Next.js App Router. Code is organized around business domains to ensure high cohesion, low coupling, and easy scalability.

```text
src/
├── app/                  # Next.js App Router (Routes, Page Views & Layouts)
│   ├── (auth)/           # Route group for auth pages (/login, /register)
│   ├── error.tsx
│   ├── layout.tsx
│   └── page.tsx          # Landing / Home page
├── features/             # Self-contained domain modules
│   ├── auth/             # Auth domain
│   │   ├── actions/      # Server Actions (login, register)
│   │   ├── components/   # Auth forms and auth-specific inputs
│   │   ├── schemas/      # Zod validation schemas
│   │   └── index.ts      # Public feature exports
│   ├── overview/         # Dashboard / Overview feature (planned)
│   ├── receipt/          # Receipts CRUD feature (planned)
│   ├── categories/       # Categories CRUD feature (planned)
│   └── profile/          # User profile feature (planned)
├── ui/                   # Shared design system components (Button, Hero, Typography, Link)
└── lib/                  # Shared infrastructure & utilities
    ├── utils/            # Shared error formatters and helpers
    ├── apiClient.ts      # Typed API client wrapper
    └── cn.ts             # Tailwind class merging utility
```

### Core Architectural Rules

1. **App Router Boundary (`src/app/`)**: `src/app/` handles routing, layouts, and page entry points. Pages delegate UI rendering and business logic to `features/` or `ui/`.
2. **Feature Co-location (`src/features/`)**: Everything specific to a business feature (components, server actions, Zod schemas, types) lives inside `features/<feature-name>/`.
3. **Feature Isolation**: Feature-specific UI controls (e.g. Auth pill inputs) reside inside their respective feature folder rather than global `ui/`.
4. **Global Design System (`src/ui/`)**: `src/ui/` contains reusable, domain-agnostic UI primitives used across multiple features.

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
