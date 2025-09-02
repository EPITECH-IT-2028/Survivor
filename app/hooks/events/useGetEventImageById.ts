import { neon } from '@neondatabase/serverless';

export default async function useGetEventImageById(event_id: number) {
  const database_url = process.env.DATABASE_URL;

  if (!database_url) throw new Error('DATABASE_URL null')

  const sql = neon(database_url);

  async () => {
    const result = await sql`SELECT image FROM Event WHERE id = ${event_id}`;
    return result.at(0) ?? null;
  };
}
