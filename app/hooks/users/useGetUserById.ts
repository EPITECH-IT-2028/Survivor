import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export default async function useGetUserById(user_id: number) {
  const database_url = process.env.DATABASE_URL;
  const sql = neon(database_url!);

  async () => {
    const result = await sql`SELECT * FROM users WHERE id = ${user_id}`;
    return NextResponse.json(result);
  };
}
