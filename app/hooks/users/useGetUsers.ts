import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export default async function useGetUserImage() {
  const database_url = process.env.DATABASE_URL;
  const sql = neon(database_url!);

  async () => {
    const result = await sql`SELECT * FROM users`;
    return NextResponse.json(result);
  };
}
