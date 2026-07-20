# Expense Tracker Monorepo

[![PNPM][pnpm-badge]][pnpm-url]
[![Node.js][node-badge]][node-url]
[![TypeScript][typescript-badge]][typescript-url]

An application for detailed purchase tracking, price dynamics analysis, and budget planning.

This repository is structured as a monorepo using pnpm workspaces. It contains both the backend API and the frontend web client.

## Repository Structure

- `apps/api` - Node.js & Express REST API with PostgreSQL & Drizzle ORM.
- `apps/web` - React & Next.js frontend web application styled with Tailwind CSS v4.

---

## Tech Stack Overview

- **Monorepo Manager**: [pnpm](https://pnpm.io) Workspaces
- **Backend API**: [Express.js](https://expressjs.com), [TypeScript](https://www.typescriptlang.org), [PostgreSQL](https://www.postgresql.org), [Drizzle ORM](https://orm.drizzle.team)
- **Frontend Client**: [Next.js](https://nextjs.org) (App Router), [React](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com), [TypeScript](https://www.typescriptlang.org)

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (version >= 24.18.0)
- **PNPM** (version >= 8.15.9)
- **Docker & Docker Compose** (for running the PostgreSQL database and Adminer locally)

### Installation

Clone the repository and install the dependencies from the root directory:

```bash
pnpm install
```

### Running the Application

1. Spin up the PostgreSQL database and Adminer using Docker Compose:

```bash
docker compose -f apps/api/docker-compose.yml up -d
```

2. Run the frontend and backend concurrently from the root directory:

```bash
# Start both Web and API in development mode
pnpm dev

# Start only the Backend API
pnpm dev:api

# Start only the Web client
pnpm dev:web
```

### Building the Project

To build all apps inside the monorepo:

```bash
# Build both Web and API
pnpm build

# Build only the Backend API
pnpm build:api

# Build only the Web client
pnpm build:web
```

---

## Scripts Reference

The following scripts are available in the root `package.json`:

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `pnpm -r dev` | Run all applications concurrently in development mode |
| `dev:api` | `pnpm --filter api dev` | Run the Express backend API in development mode |
| `dev:web` | `pnpm --filter web dev` | Run the Next.js web client in development mode |
| `build` | `pnpm -r build` | Build all applications for production |
| `build:api` | `pnpm --filter api build` | Build the backend API |
| `build:web` | `pnpm --filter web build` | Build the web client |
| `lint` | `eslint .` | Run ESLint across all applications |
| `lint:fix` | `eslint . --fix` | Run ESLint across all applications and auto-fix issues |
| `format` | `prettier --write .` | Format all files in the repository using Prettier |
| `format:check` | `prettier --check .` | Check formatting of all files in the repository |

---

## License

This project is private and proprietary.

[pnpm-badge]: https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220
[pnpm-url]: https://pnpm.io
[node-badge]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org
[typescript-badge]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org
