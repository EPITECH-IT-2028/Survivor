import { neon } from '@neondatabase/serverless';
import 'server-only';

export default async function getUserByEmail(email: string) {
  const database_url = process.env.DATABASE_URL;

  if (!database_url) throw new Error('DATABASE_URL null')

  const sql = neon(database_url);

  const result = await sql`SELECT * FROM users WHERE email = ${email}`;
  return result.at(0) ?? null;
}
