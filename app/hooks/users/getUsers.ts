import { getSql } from '@/lib/db';
import { type TUser } from '@/app/types/users';

export default async function getUsers(): Promise<TUser[]> {
  const sql = getSql();

  const result = await sql`SELECT * FROM users ORDER BY id`;
  return result as TUser[];
}
