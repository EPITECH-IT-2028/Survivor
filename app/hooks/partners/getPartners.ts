import 'server-only';
import { getSql } from '@/lib/db';

export default async function getPartners() {
  const sql = getSql();

  const result = await sql`SELECT * FROM Partner`;
  return result;
}
