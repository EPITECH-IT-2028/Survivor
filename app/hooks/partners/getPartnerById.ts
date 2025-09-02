import 'server-only';
import { getSql } from '@/lib/db';

export default async function getPartnerById(partner_id: number) {
  const sql = getSql();

  const result = await sql`SELECT * FROM Partner WHERE id = ${partner_id}`;
  return result.at(0) ?? null;
}
