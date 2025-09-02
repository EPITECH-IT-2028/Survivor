import { getSql } from '@/lib/db';
import 'server-only';

export default async function getInvestorById(investor_id: number) {
  const sql = getSql(); 

  const result = await sql`SELECT * FROM Partner WHERE id = ${investor_id}`;
  return result.at(0) ?? null;
}
