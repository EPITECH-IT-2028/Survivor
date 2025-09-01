import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export default async function useGetStartupFounderImage(startup_id: number, founder_id: number) {
  const database_url = process.env.DATABASE_URL;
  const sql = neon(database_url!);

  async () => {
    const result = await sql`SELECT image FROM Startup WHERE startup_id = ${startup_id} AND founder_id = ${founder_id}`;
    return NextResponse.json(result);
  };
}
