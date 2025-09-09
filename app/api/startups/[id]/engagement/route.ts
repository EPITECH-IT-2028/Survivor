'use server';

import sql from "@/lib/db";
import { getStartupEngagementsQuery, updateStartupEngagementQuery } from "@/lib/queries/startups/startups";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    const response = await getStartupEngagementsQuery(db, id);

    if (response.length === 0) {
      return new Response(JSON.stringify({ error: 'Startup not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(response[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch engagement rate' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    const { engagement_rate } = await request.json();

    if (typeof engagement_rate !== 'number') {
      return new Response(JSON.stringify({ error: 'engagement_rate must be a number' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await updateStartupEngagementQuery(db, id, engagement_rate);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update engagement rate' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

