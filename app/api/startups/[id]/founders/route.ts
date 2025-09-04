'use server';

import { getSql } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, founder_id: string }> },
) {
  const db = getSql();

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id, founder_id } = await params;

  try {
    const response = await db`SELECT founder_id FROM founder_startup WHERE founder_id = ${founder_id} AND startup_id = ${id}`;

    const responseWithDetails = await Promise.all(response.map(async (item) => {
      const founderDetails = await db`SELECT * FROM founders WHERE id = ${item.founder_id}`;
      return founderDetails;
    }));

    return new Response(JSON.stringify(responseWithDetails), {
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
  { params }: { params: Promise<{ id: string }> },
) {
  const db = getSql();

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id } = await params;

  try {
    const { founder_id } = await request.json();

    const response = await db`INSERT INTO founder_startup (founder_id, startup_id)
      VALUES (${founder_id}, ${id}) RETURNING *`;
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