import 'server-only';
import { getSql } from '@/lib/db';

export default async function getUserById(user_id: number) {
  const sql = getSql();

  const result = await sql`SELECT * FROM users WHERE id = ${user_id}`;
  return result.at(0) ?? null;
}
