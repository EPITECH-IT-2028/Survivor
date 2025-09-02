import { getSql } from '@/lib/db';
import 'server-only';

export default async function getInvestors() {
  const sql = getSql(); 

  const result = await sql`SELECT * FROM Investor`;
  return result;
}
