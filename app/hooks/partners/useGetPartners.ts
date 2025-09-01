import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export default async function useGetPartners() {
  const database_url = process.env.DATABASE_URL;
  const sql = neon(database_url!);

  async () => {
    const result = await sql`SELECT * FROM Partner`;
    return NextResponse.json(result);
  };
}
