import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export default async function useGetUserImage(email: string) {
  const database_url = process.env.DATABASE_URL;
  const sql = neon(database_url!);

  async () => {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    return NextResponse.json(result);
  };
}
