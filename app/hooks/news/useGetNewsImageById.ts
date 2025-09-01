import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export default async function useGetNewsById(news_id: number) {
  const database_url = process.env.DATABASE_URL;
  const sql = neon(database_url!);

  async () => {
    const result = await sql`SELECT image FROM News WHERE id = ${news_id}`;
    return NextResponse.json(result);
  };
}
