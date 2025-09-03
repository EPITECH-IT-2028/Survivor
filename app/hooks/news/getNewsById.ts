import 'server-only';
import { getSql } from '@/lib/db';

export default async function getNewsById(news_id: number) {
  const sql = getSql(); 

  const result = await sql`SELECT * FROM News WHERE id = ${news_id}`;
  return result.at(0) ?? null;
}
