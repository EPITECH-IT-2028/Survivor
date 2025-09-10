import sql from "@/lib/db";
import { getMetricsQuery } from "@/lib/queries/admin/metrics/metrics";

export async function GET() {
  const db = sql;

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await getMetricsQuery(db);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching startups:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch startups' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
