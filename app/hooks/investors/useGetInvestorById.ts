import { neon } from '@neondatabase/serverless';
import 'server-only';

export default async function useGetInvestorById(investor_id: number) {
  const database_url = process.env.DATABASE_URL;

  if (!database_url) throw new Error('DATABASE_URL null')

  const sql = neon(database_url);

  const result = await sql`SELECT * FROM Partner WHERE id = ${investor_id}`;
  return result.at(0) ?? null;
}
