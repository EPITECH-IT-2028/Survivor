import 'server-only';
import { getSql } from '@/lib/db';

export default async function getUserImage(user_id: string) {
  const sql = getSql();

  const result = await sql`SELECT image FROM users WHERE user_id = ${user_id}`;
  return result.at(0) ?? null;
}
