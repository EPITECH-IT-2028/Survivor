'use server';

import sql from "@/lib/db";
import { getStartupByFounderAndStartupIdQuery } from "@/lib/queries/startups/startups";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string, startup_id: string }> },
) {
  const db = sql;

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id, startup_id } = await params;

  try {
    const startups = await getStartupByFounderAndStartupIdQuery(db, id, startup_id);

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
