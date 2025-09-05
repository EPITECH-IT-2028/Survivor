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
    const response = await db`SELECT * FROM startups ORDER BY id ASC`;
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch startups' }), {
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
    const { name, description, legal_status, address, email, phone, created_at, website_url, social_media_url,
      project_status, needs, maturity, sector } = await request.json();


    const response = await db`INSERT INTO startups (name, description, legal_status, address, email, phone, created_at,
      website_url, social_media_url, project_status, needs, maturity, sector)
      VALUES (${name}, ${description}, ${legal_status}, ${address}, ${email}, ${phone}, ${created_at}, ${website_url},
      ${social_media_url}, ${project_status}, ${needs}, ${maturity}, ${sector}) RETURNING *`;
    return new Response(JSON.stringify(response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: `Failed to create startup ${error}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
