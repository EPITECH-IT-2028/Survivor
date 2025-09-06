import { NeonQueryFunction } from "@neondatabase/serverless"

export const getNewsQuery = async (db: NeonQueryFunction<false, false>) => {
  return await db`SELECT * FROM news`;
}

export const getNewsByIdQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  return await db`SELECT * FROM news WHERE id = ${id}`;
}

export const insertNewsQuery = async (
  db: NeonQueryFunction<false, false>,
  title: string,
  location: string,
  category: string,
  startup_id: number,
  description: string,
  news_date: string,
  startup: string
) => {
  return await db`INSERT INTO news (title, location, category, startup_id, description, news_date, startup)
      VALUES (${title}, ${location}, ${category}, ${startup_id}, ${description}, ${news_date}, ${startup}) RETURNING *`;
}

export const deleteNewsByIdQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  return await db`DELETE FROM news WHERE id = ${id} RETURNING *`;
}

export const updateNewsByIdQuery = async (
  db: NeonQueryFunction<false, false>,
  id: string,
  title: string,
  location: string,
  category: string,
  startup_id: number,
  description: string,
  news_date: string,
  startup: string
) => {
  return await db`UPDATE news SET 
      title = ${title},
      location = ${location},
      category = ${category},
      startup_id = ${startup_id},
      description = ${description},
      news_date = ${news_date},
      startup = ${startup}
      WHERE id = ${id} RETURNING *`;
}
