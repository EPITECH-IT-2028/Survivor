import postgres from 'postgres';

export const getNewsQuery = async (db: postgres.Sql) => {
  return await db`SELECT * FROM news ORDER BY news_date DESC`;
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
  id: number,
  title: string,
  category: string,
  description: string,
  location: string,
  news_date: string,
  startup: string,
  startup_id: number
) => {
  return await db`UPDATE news SET 
      title = ${title},
      category = ${category},
      description = ${description},
      news_date = ${news_date},
      startup = ${startup},
      startup_id = ${startup_id},
      location = ${location}
    WHERE id = ${id} RETURNING *`;
}
