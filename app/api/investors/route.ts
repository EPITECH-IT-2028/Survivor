'use server';
import sql from "@/lib/db";
import { getInvestorsQuery, insertInvestorQuery } from "@/lib/queries/investors/investors";

export async function GET() {
  const db = sql;

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const investors = await getInvestorsQuery(db);
    return new Response(JSON.stringify(investors), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch investors' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: Request) {
  const db = sql;

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, legal_status, address, email, phone, description, investor_type, investment_focus } = await request.json();

    const response = await insertInvestorQuery(db, name, legal_status, address, email, phone, description, investor_type, investment_focus);
    return new Response(JSON.stringify(response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: `Failed to create founder ${error}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
