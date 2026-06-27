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
  // In production (Vercel serverless) each Lambda holds exactly 1 connection.
  // Warm instances reuse it; cold starts each get one — keeps total well under
  // Supabase's max_connections limit without needing a connection pooler.
  max: process.env.NODE_ENV === 'production' ? 1 : 5,
  idle_timeout: 20,
})

if (process.env.NODE_ENV !== 'production') g._pgClient = client

export const db = drizzle(client, { schema })