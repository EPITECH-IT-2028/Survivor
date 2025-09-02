import 'server-only';
import { getSql } from '@/lib/db';

export default async function getEventById(event_id: number) {
  const sql = getSql(); 

  const result = await sql`SELECT * FROM Event WHERE id = ${event_id} LIMIT 1`;
  return result.at(0) ?? null;
}
