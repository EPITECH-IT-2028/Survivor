'use server';

import { getSql } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string, founder_id: string } },
) {
  const db = getSql();

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id } = params;

  try {
    const founders = await db`
      SELECT f.*
      FROM founders f
      JOIN founder_startup fs ON fs.founder_id = f.id
      WHERE fs.startup_id = ${id}
    `;

    return new Response(JSON.stringify(founders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch founder_startups' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const db = getSql();

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id } = params;

  try {
    const { founder_id } = await request.json();

    const response = await db`
      INSERT INTO founder_startup (founder_id, startup_id)
      VALUES (${founder_id}, ${id})
      ON CONFLICT (founder_id, startup_id) DO NOTHING
      RETURNING *
    `;
    if (response.length === 0) {
      return new Response(JSON.stringify({ message: 'Association already exists' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: `Failed to create founder_startup ${error}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}