import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import { getDatabaseUrl } from "./src/db/getDatabaseUrl";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
