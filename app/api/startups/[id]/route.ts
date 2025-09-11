"use server";

import sql from "@/lib/db";
import {
  deleteStartupByIdQuery,
  getStartupByIdQuery,
  updateStartupByIdQuery,
} from "@/lib/queries/startups/startups";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = sql;

  if (db === null) {
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { id } = await params;

  try {
    const response = await getStartupByIdQuery(db, id);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch startup" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = sql;

  if (db === null) {
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { id } = await params;

  try {
    const response = await deleteStartupByIdQuery(db, id);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete startup" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = sql;

  if (db === null) {
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { id } = await params;

  try {
    const {
      name,
      description,
      phone,
      created_at,
      website_url,
      social_media_url,
      project_status,
      needs,
      maturity,
      sector,
      legal_status,
      address,
      email,
      engagement_rate,
      project_view,
      legacy_id,
    } = await request.json();

    let formattedDate: string;
    if (created_at) {
      const date = new Date(created_at);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format for created_at");
      }
      formattedDate = date.toISOString();
    } else {
      formattedDate = new Date().toISOString();
    }

    const response = await updateStartupByIdQuery(
      db,
      id,
      name,
      description,
      legal_status,
      address,
      email,
      phone,
      website_url,
      formattedDate,
      social_media_url,
      project_status,
      needs,
      maturity,
      sector,
      engagement_rate,
      project_view,
      legacy_id,
    );

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to update startup ${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
