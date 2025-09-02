import 'server-only';
import { getSql } from '@/lib/db';

export default async function getNews() {
  const sql = getSql(); 

  const result = await sql`SELECT * FROM News`;
  return result;
}
