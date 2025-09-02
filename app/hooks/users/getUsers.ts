import 'server-only';
import { getSql } from '@/lib/db';

export default async function getUsers() {
  const sql = getSql();

  const result = await sql`SELECT * FROM users`;
  return result;
}
