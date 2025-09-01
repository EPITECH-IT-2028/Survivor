import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export default async function useGetEventImageById(event_id: number) {
  const database_url = process.env.DATABASE_URL;
  const sql = neon(database_url!);

  async () => {
    const result = await sql`SELECT image FROM Event WHERE id = ${event_id}`;
    return NextResponse.json(result);
  };
}
