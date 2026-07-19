# Expense Tracker API

[![Express][express-badge]][express-url]
[![TypeScript][typescript-badge]][typescript-url]
[![PostgreSQL][postgres-badge]][postgres-url]
[![Drizzle ORM][drizzle-badge]][drizzle-url]

This is the backend REST API for the Expense Tracker application. It handles user authentication, purchase records, price history/dynamics, and budget definitions.

## Tech Stack

- **Framework**: Express.js (v5.2.1)
- **Language**: TypeScript (v5.5.2)
- **Database**: PostgreSQL (using `pg` driver)
- **ORM**: Drizzle ORM (v1.0.0-rc.4) with Drizzle Kit
- **Security & Utilities**:
  - `helmet` - HTTP headers security
  - `cors` - Cross-Origin Resource Sharing
  - `express-rate-limit` - Rate limiting requests
  - `joi` - Request schema validation
- **Dev Tools**: `ts-node-dev` for live reload, `typescript` for compiling

---

## Project Structure

```
apps/api/
├── dist/               # Compiled production JavaScript files
├── drizzle/            # Auto-generated SQL migration files
├── src/
│   ├── controllers/    # HTTP layer: parse req, call service, send res
│   ├── db/             # Drizzle instance, schema & table relations
│   ├── middleware/     # Cross-cutting Express middlewares (e.g. validation)
│   ├── models/         # Data-access layer: raw Drizzle ORM queries
│   ├── routes/         # Express Router definitions
│   ├── services/       # Business logic layer
│   ├── validators/     # Joi schemas for request body validation
│   └── index.ts        # Express entrypoint (app bootstrap)
├── .env.example        # Example environment variables template
├── docker-compose.yml  # Docker Compose config for PG Database & Adminer
├── Dockerfile          # Dockerfile for the API service
├── drizzle.config.ts   # Drizzle Kit configuration
├── package.json
└── tsconfig.json
```

---

## Architecture Overview

The API follows a layered **MVC-style** architecture. Each incoming HTTP request passes through the following layers:

```
HTTP Request
    │
    ▼
routes/          — Express Router: maps URL + method → controller + middleware
    │
    ▼
middleware/      — Cross-cutting concerns (validation, auth, error handling)
    │
    ▼
controllers/     — HTTP layer: extracts data from req, delegates to service, writes res
    │
    ▼
services/        — Business logic: orchestrates model calls, applies rules
    │
    ▼
models/          — Data-access layer: raw Drizzle ORM queries against the DB
    │
    ▼
db/              — Drizzle instance, schema & relations
```

### Path Aliases (tsconfig.json)

Absolute imports are used throughout to avoid deep relative paths:

| Alias | Resolved path |
|---|---|
| `@db` | `src/db/index` |
| `@db/*` | `src/db/*` |
| `@routes` | `src/routes/index` |
| `@controllers` | `src/controllers/index` |
| `@services` | `src/services/index` |
| `@models` | `src/models/index` |
| `@middleware/*` | `src/middleware/*` |
| `@validators/*` | `src/validators/*` |

---

## Environment Variables

Copy [.env.example](file:///Users/vladimirromanets/Projects/expense-tracker/apps/api/.env.example) to `.env` in the root of the `apps/api/` directory:

```bash
cp .env.example .env
```

The file contains the following configuration variables:

- `API_HOST`: Host address for the API server (e.g. `127.0.0.1` or `0.0.0.0`).
- `API_PORT`: Port number for the API server (e.g. `3001`).
- `DB_USERNAME`: Username for PostgreSQL connection.
- `DB_PASSWORD`: Password for PostgreSQL connection.
- `DB_HOST`: Hostname of the database for **local dev scripts only** (always `localhost`). Docker hardcodes `pgdb` internally.
- `DB_PORT`: Database port (default `5432`).
- `DB_NAME`: Database name.
- `DB_DIALECT`: Database dialect (`postgres`).
- `DATABASE_URL` (optional override): Full connection string (e.g. `postgresql://user:pass@host:port/dbname`).

---

## Docker Support

Spin up the PostgreSQL database and Adminer (database management web interface) using Docker Compose:

```bash
docker compose up -d
```

This starts:
- **PostgreSQL** container (`pgdb`) on port `5432`
- **Adminer** container on port `8080` (accessible at `http://127.0.0.1:8080`)
- **API** container on port `3001` (accessible at `http://127.0.0.1:3001`)

---

## API Endpoints

### Health Check

- **GET `/api/health`**
  - **Description**: Verifies that the API service is running and healthy.
  - **Response**:
    ```json
    {
      "status": "ok",
      "message": "API is running"
    }
    ```

### Users

- **POST `/api/users`**
  - **Description**: Creates a new user record.
  - **Body**:
    ```json
    {
      "email": "user@example.com",      // required
      "passwordHash": "hashed_string",  // required
      "firstName": "John",              // optional, max 50 chars
      "lastName": "Doe"                 // optional, max 50 chars
    }
    ```
  - **Response** `201 Created`:
    ```json
    {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2026-07-19T13:51:53.000Z",
      "updatedAt": "2026-07-19T13:51:53.000Z"
    }
    ```
  - **Response** `400 Bad Request` (validation failure):
    ```json
    {
      "status": "error",
      "message": "Validation failed",
      "details": [
        "\"email\" is required"
      ]
    }
    ```

### Planned Endpoints

The API will be expanded with the following endpoints:

- **Purchases** (`/api/purchases`): CRUD for purchase records.
- **Price Dynamics** (`/api/prices/dynamics`): Price fluctuation analysis over time.
- **Budgets** (`/api/budgets`): Budget definitions and category limits.

---

## Database Migrations

Migrations are managed via [Drizzle Kit](https://orm.drizzle.team/docs/kit-overview). All SQL files are generated from the schema defined in [`src/db/schema.ts`](./src/db/schema.ts) and stored in the `drizzle/` directory.

### Scripts

| Script | Command | Description |
|---|---|---|
| `db:generate` | `drizzle-kit generate` | Generates SQL migration files based on schema changes |
| `db:migrate:docker` | `docker compose exec api pnpm drizzle-kit migrate` | Applies migrations inside the running `api` container |
| `db:check` | `drizzle-kit check` | Validates migration consistency (no conflicts, correct order) |
| `db:studio` | `drizzle-kit studio` | Opens a browser-based GUI for viewing and editing database data |

### Typical Workflow

1. Modify the schema in `src/db/schema.ts`
2. Generate a migration:
   ```bash
   pnpm db:generate
   ```
3. Verify migration consistency:
   ```bash
   pnpm db:check
   ```
4. Apply migrations inside Docker (requires `docker compose up`):
   ```bash
   pnpm db:migrate:docker
   ```

> **Important:** Before running `db:migrate:docker`, make sure the stack is running (`docker compose up`).

### Drizzle Studio

To visually browse and edit database data:

```bash
pnpm db:studio
```

Opens the interface at `https://local.drizzle.studio`.

---

## Getting Started

### Development Mode (Local)

1. Make sure you have a running Postgres database instance (e.g., using `docker compose up -d pgdb adminer`).
2. Run the server with live reloading when source files change:

```bash
pnpm dev
```

The API will be available at `http://localhost:3001`.

### Production Build

Compile the TypeScript source files to JavaScript:

```bash
pnpm build
```

The output will be written to the `dist/` directory.

### Start Production Server

Start the compiled JavaScript application:

```bash
pnpm start
```

[express-badge]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[express-url]: https://expressjs.com
[typescript-badge]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org
[postgres-badge]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[postgres-url]: https://www.postgresql.org
[drizzle-badge]: https://img.shields.io/badge/drizzle--orm-%23C5F82A.svg?style=for-the-badge&logo=drizzle&logoColor=black
[drizzle-url]: https://orm.drizzle.team
