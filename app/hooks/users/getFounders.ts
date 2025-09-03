import { getSql } from '@/lib/db';
import { TFounder } from '@/app/types/founder';

export default async function getFounders(): Promise<TFounder[]> {
  const sql = getSql();

  const result = await sql`SELECT * FROM users ORDER BY id`;
  return result as TFounder[];
}
