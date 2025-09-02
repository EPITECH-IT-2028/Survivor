import { getSql } from '@/lib/db';
import 'server-only';

export default async function getEventImageById(event_id: number) {
  const sql = getSql(); 

  const result = await sql`SELECT image FROM Event WHERE id = ${event_id}`;
  return result.at(0) ?? null;
}
