import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { relations } from './relations';
import { getDatabaseUrl } from './getDatabaseUrl';

const pool = new Pool({
  connectionString: getDatabaseUrl(),
});

export const db = drizzle({ client: pool, relations });
