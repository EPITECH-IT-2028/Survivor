import 'server-only';
import { neon } from '@neondatabase/serverless';

export default async function useGetEventById(event_id: number) {
  const database_url = process.env.DATABASE_URL;

  if (!database_url) throw new Error('DATABASE_URL null')

  const sql = neon(database_url);

  const result = await sql`SELECT * FROM Event WHERE id = ${event_id} LIMIT 1`;
  return result.at(0) ?? null;
}
