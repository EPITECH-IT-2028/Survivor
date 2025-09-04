import { neon } from '@neondatabase/serverless';

export function getSql() {
  return neon("postgresql://neondb_owner:npg_SZ6hLacupOr4@ep-wild-frog-a2c4xoo1-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")
}
