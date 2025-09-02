import { getSql } from '@/lib/db';
import 'server-only';

export default async function getEvents() {
  const sql = getSql(); 

  const result = await sql`SELECT * FROM Event`;
  return result;
}
