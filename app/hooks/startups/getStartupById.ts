import 'server-only';
import { getSql } from '@/lib/db';

export default async function getStartupById(startup_id: number) {
  const sql = getSql();

  const result = await sql`SELECT * FROM Startup WHERE startup_id = ${startup_id}`;
  return result.at(0) ?? null;
}
