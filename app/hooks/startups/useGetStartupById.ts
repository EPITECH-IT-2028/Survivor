import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export default async function useGetStartupById(startup_id: number) {
  const database_url = process.env.DATABASE_URL;
  const sql = neon(database_url!);

  async () => {
    const result = await sql`SELECT * FROM Startup WHERE startup_id = ${startup_id}`;
    return NextResponse.json(result);
  };
}
