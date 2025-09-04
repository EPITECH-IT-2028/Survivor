'use server';

import { getSql } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, startup_id: string }> },
) {
  const db = getSql();

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id, startup_id } = await params;

  try {
    const response = await db`SELECT startup_id FROM founder_startup WHERE founder_id = ${id} AND startup_id = ${startup_id}`;

    const responseWithDetails = await Promise.all(response.map(async (item) => {
      const startupDetails = await db`SELECT * FROM startups WHERE id = ${item.startup_id}`;
      return startupDetails;
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
