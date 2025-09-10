import postgres from "postgres";

export async function getMetricsQuery(db: postgres.Sql) {
  const result = await db`SELECT SUM(project_view) AS total_project_views,
  SUM(engagement_rate) AS total_engagement_rate FROM startups`;
  return result;
}
