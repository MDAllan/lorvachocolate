import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL!

// Singleton: reuse the pool across Next.js hot reloads in development.
// Without this, every module reload creates a fresh 10-connection pool until
// Postgres hits max_connections and starts refusing non-superuser connections.
const g = globalThis as typeof globalThis & { _pgClient?: ReturnType<typeof postgres> }

const client = g._pgClient ?? postgres(connectionString, {
  prepare: false,
  max: 5,           // keep the pool small; tune up if you add heavy concurrency
  idle_timeout: 20, // release idle connections after 20 s
})

if (process.env.NODE_ENV !== 'production') g._pgClient = client

export const db = drizzle(client, { schema })