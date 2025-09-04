'use server';
import { getSql } from "@/lib/db";

export async function GET() {
  const db = getSql();

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await db`SELECT * FROM users`;
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: Request) {
  const db = getSql();

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, role, email, founder_it, investor_id } = await request.json();

    const response = await db`INSERT INTO users (name, role, email, founder_id, investor_id)
      VALUES (${name}, ${role}, ${email}, ${founder_it}, ${investor_id}) RETURNING *`;
    return new Response(JSON.stringify(response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: `Failed to create user ${error}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
