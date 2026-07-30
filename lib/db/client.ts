import { Pool, QueryResultRow } from "pg";

/**
 * Postgres connection pool, targeting Neon (see Technical Architecture
 * Section 3/11 and README "Connecting Postgres" for setup).
 *
 * Reads DATABASE_URL from the environment — this is the connection
 * string Neon gives you when you create a project. Neon requires SSL,
 * which its connection strings include by default (?sslmode=require).
 *
 * In serverless environments (Vercel functions), a new Pool per cold
 * start is normal and expected — pg's Pool handles connection reuse
 * within a single warm invocation efficiently.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
) {
  const client = await pool.connect();
  try {
    return await client.query<T>(text, params);
  } finally {
    client.release();
  }
}
