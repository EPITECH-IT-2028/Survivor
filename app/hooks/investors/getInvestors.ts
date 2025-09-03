import { getSql } from '@/lib/db';

export default async function getInvestors() {
  const sql = getSql(); 

  const result = await sql`SELECT * FROM investors ORDER BY id`;
  return result;
}
