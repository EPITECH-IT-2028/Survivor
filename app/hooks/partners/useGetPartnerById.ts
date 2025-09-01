import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export default async function useGetPartners(partner_id: number) {
  const database_url = process.env.DATABASE_URL;
  const sql = neon(database_url!);

  async () => {
    const result = await sql`SELECT * FROM Partner WHERE id = ${partner_id}`;
    return NextResponse.json(result);
  };
}
