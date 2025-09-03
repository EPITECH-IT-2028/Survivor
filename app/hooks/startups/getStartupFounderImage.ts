import 'server-only';
import { getSql } from '@/lib/db';

export default async function getStartupFounderImage(startup_id: number, founder_id: number) {
  const sql = getSql();

  const result = await sql`SELECT image FROM Startup WHERE startup_id = ${startup_id} AND founder_id = ${founder_id}`;
  return result.at(0) ?? null;
}
