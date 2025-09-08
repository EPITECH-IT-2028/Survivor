import postgres from "postgres";

export const insertFounderStartupQuery = async (db: postgres.Sql, founder_id: string, startup_id: string) => {
  return await db`
    INSERT INTO founder_startup (founder_id, startup_id)
    VALUES (${founder_id}, ${startup_id})
    ON CONFLICT (founder_id, startup_id) DO NOTHING
    RETURNING *
  `;
}
