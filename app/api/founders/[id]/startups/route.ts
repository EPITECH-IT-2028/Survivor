'use server';

import { getSql } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
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
    const startups = await db`
      SELECT s.*
      FROM founder_startup AS fs
      JOIN startups AS s ON s.id = fs.startup_id
      WHERE fs.founder_id = ${id}
    `;

    return new Response(JSON.stringify(startups), {
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
    const { startup_id } = await request.json();

    const [inserted] = await db`INSERT INTO founder_startup (founder_id, startup_id)
      VALUES (${id}, ${startup_id}) RETURNING *`;
    return new Response(JSON.stringify(inserted), {
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
