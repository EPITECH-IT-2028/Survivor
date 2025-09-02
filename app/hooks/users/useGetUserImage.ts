import { neon } from '@neondatabase/serverless';

export default async function useGetUserImage(user_id: string) {
  const database_url = process.env.DATABASE_URL;

  if (!database_url) throw new Error('DATABASE_URL null')

  const sql = neon(database_url);

  async () => {
    const result = await sql`SELECT image FROM users WHERE user_id = ${user_id}`;
    return result.at(0) ?? null;
  };
}
