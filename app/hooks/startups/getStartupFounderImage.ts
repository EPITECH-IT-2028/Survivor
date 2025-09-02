import { neon } from '@neondatabase/serverless';
import 'server-only';

export default async function getStartupFounderImage(startup_id: number, founder_id: number) {
  const database_url = process.env.DATABASE_URL;

  if (!database_url) throw new Error('DATABASE_URL null')

  const sql = neon(database_url);

  const result = await sql`SELECT image FROM Startup WHERE startup_id = ${startup_id} AND founder_id = ${founder_id}`;
  return result.at(0) ?? null;
}
