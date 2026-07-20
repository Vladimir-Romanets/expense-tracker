import { defineConfig } from 'drizzle-kit';
import { getDatabaseUrl } from './src/db/getDatabaseUrl';
import 'dotenv/config';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
