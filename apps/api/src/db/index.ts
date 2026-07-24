import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { relations } from './relations'
import { getDatabaseUrl } from './getDatabaseUrl'

const pool = new Pool({
  connectionString: getDatabaseUrl(),
})

export const db = drizzle({ client: pool, relations })

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0]
export type Executor = typeof db | Transaction
