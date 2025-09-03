import { getSql } from '@/lib/db';
import { TStartups } from '@/app/types/startup';

export default async function getUsers(): Promise<TStartups[]> {
  const sql = getSql();

  const result = await sql`SELECT * FROM startups ORDER BY id`;
  return result as TStartups[];
}
