# Expense Tracker API

[![Express][express-badge]][express-url]
[![TypeScript][typescript-badge]][typescript-url]
[![PostgreSQL][postgres-badge]][postgres-url]

This is the backend REST API for the Expense Tracker application. It handles user authentication, purchase records, price history/dynamics, and budget definitions.

## Tech Stack

- **Framework**: Express.js (v5.2.1)
- **Language**: TypeScript (v5.5.2)
- **Database**: PostgreSQL (using `pg` driver)
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
├── dist/             # Compiled production JavaScript files
├── src/
│   └── index.ts      # Server entrypoint and express initialization
├── package.json
└── tsconfig.json
```

---

## Environment Variables

Create a `.env` file in the root of `apps/api/` directory (or define them in your environment):

```env
PORT=3001
# PostgreSQL Connection details (standard env variables read by pg client)
PGUSER=postgres
PGPASSWORD=your_secure_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=expense_tracker
```

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

### Planned Endpoints

The API will be expanded with the following endpoints:

- **Purchases** (`/api/purchases`): Create, read, update, and delete purchase records, detailing items, stores, dates, and prices.
- **Price Dynamics** (`/api/prices/dynamics`): Analyze price fluctuations of specific items over time.
- **Budgets** (`/api/budgets`): Set, view, and adjust budgets and tracks category limits.

---

## Getting Started

### Development Mode

Runs the server with live reloading when source files change:

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
