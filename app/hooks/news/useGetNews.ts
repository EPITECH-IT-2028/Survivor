import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export default async function useGetNews() {
  const database_url = process.env.DATABASE_URL;
  const sql = neon(database_url!);

  async () => {
    const result = await sql`SELECT * FROM News`;
    return NextResponse.json(result);
  };
}
