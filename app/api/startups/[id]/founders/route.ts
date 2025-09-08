'use server';

import sql from "@/lib/db";
import { insertFounderStartupQuery } from "@/lib/queries/founder_startup/fs";
import { getFoundersByStartupIdQuery } from "@/lib/queries/founders/founders";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = sql;

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id } = await params;

  try {
    const founders = await getFoundersByStartupIdQuery(db, id);

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
  { params }: { params: Promise<{ id: string }> },
) {
  const db = sql;

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id } = await params;

  try {
    const { founder_id } = await request.json();

    const response = await insertFounderStartupQuery(db, founder_id, id);
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
