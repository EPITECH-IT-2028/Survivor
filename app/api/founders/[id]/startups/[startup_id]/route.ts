'use server';

import { getSql } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string, startup_id: string } },
) {
  const db = getSql();

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id, startup_id } = params;

  try {
    const startups = await db`
      SELECT s.*
      FROM startups s
      JOIN founder_startup fs ON fs.startup_id = s.id
      WHERE fs.founder_id = ${id} AND fs.startup_id = ${startup_id}
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
