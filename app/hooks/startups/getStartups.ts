import 'server-only';
import { getSql } from '@/lib/db';

export default async function getStartups() {
  const sql = getSql();

  const result = await sql`SELECT * FROM startups`;
  return result;
}
