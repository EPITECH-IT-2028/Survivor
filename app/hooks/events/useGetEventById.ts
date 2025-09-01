import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export default async function useGetEventById(event_id: number) {
  const database_url = process.env.DATABASE_URL;
  const sql = neon(database_url!);

  async () => {
    const result = await sql`SELECT * FROM Event WHERE id = ${event_id}`;
    return NextResponse.json(result);
  };
}
