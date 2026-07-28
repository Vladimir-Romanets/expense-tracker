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

## Environment Variables

Create a `.env.local` file in the root of the `apps/web/` directory to configure the frontend application:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
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

| Rule | Value | Description |
|------|-------|-------------|
| Semicolons | **off** | No `;` at the end of lines |
| Quotes | **single** | Use `'` instead of `"` in JS/TS |
| Print width | **80** | Soft line length limit |
| Trailing commas | **es5** | Trailing commas where valid in ES5 |
| JSX props | **one per line** | Each prop on its own line when there are multiple |
| Tailwind class order | **recommended** | `position → layout → spacing → visual → typography` |

VS Code auto-format on save is pre-configured in `.vscode/settings.json`.

[nextjs-badge]: https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white
[nextjs-url]: https://nextjs.org
[react-badge]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[react-url]: https://react.dev
[tailwind-badge]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com
[typescript-badge]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org
