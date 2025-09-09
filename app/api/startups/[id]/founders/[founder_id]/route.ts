'use server';

import sql from "@/lib/db";
import { getFounderByStartupAndFounderIdQuery } from "@/lib/queries/founders/founders";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string, founder_id: string }> }
) {
  const db = sql;

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id, founder_id } = await params;

  try {
    const founders = await getFounderByStartupAndFounderIdQuery(db, id, founder_id);

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
