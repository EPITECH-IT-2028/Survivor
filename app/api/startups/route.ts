"use server";
import sql from "@/lib/db";
import {
  getStartupsQuery,
  insertStartupQuery,
} from "@/lib/queries/startups/startups";

export async function GET() {
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

  try {
    const response = await getStartupsQuery(db);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching startups:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch startups" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
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

  try {
    const {
      name,
      description,
      legal_status,
      address,
      email,
      phone,
      website_url,
      social_media_url,
      project_status,
      needs,
      maturity,
      sector,
      engagement_rate,
      project_view,
      legacy_id,
    } = await request.json();

    const response = await insertStartupQuery(
      db,
      name,
      description,
      legal_status,
      address,
      email,
      phone,
      website_url,
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
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to create startup ${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
