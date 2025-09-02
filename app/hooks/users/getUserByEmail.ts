import 'server-only';
import { getSql } from '@/lib/db';

export default async function getUserByEmail(email: string) {
  const sql = getSql();

  const result = await sql`SELECT * FROM users WHERE email = ${email}`;
  return result.at(0) ?? null;
}
