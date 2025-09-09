import postgres from 'postgres';

export const getNewsQuery = async (db: postgres.Sql) => {
  return await db`SELECT * FROM news`;
}

export const getNewsByIdQuery = async (db: postgres.Sql, id: string) => {
  return await db`SELECT * FROM news WHERE id = ${id}`;
}

export const insertNewsQuery = async (
  db: postgres.Sql,
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

export const deleteNewsByIdQuery = async (db: postgres.Sql, id: string) => {
  return await db`DELETE FROM news WHERE id = ${id} RETURNING *`;
}

export const updateNewsByIdQuery = async (
  db: postgres.Sql,
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
