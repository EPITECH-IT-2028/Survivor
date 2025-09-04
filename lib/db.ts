import 'server-only';
import { neon } from '@neondatabase/serverless';

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('Missing env: DATABASE_URL');
  return neon(url);
}
