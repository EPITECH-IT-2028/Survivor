import postgres from "postgres";

export const getNewsQuery = async (db: postgres.Sql) => {
  return await db`SELECT id, location, title, category, startup_id, news_date, description, image FROM news ORDER BY news_date DESC`;
};

export const getNewsByIdQuery = async (db: postgres.Sql, id: string) => {
  return await db`SELECT id, location, title, category, startup_id, news_date, description, image FROM news WHERE id = ${id}`;
};

export const getNewsImageByIdQuery = async (db: postgres.Sql, id: string) => {
  return await db`SELECT id, legacy_id, image FROM news WHERE id = ${id} OR legacy_id = ${id}`;
};

export const insertNewsQuery = async (
  db: postgres.Sql,
  title: string,
  location: string,
  category: string,
  startup_id: number,
  description: string,
  news_date: string,
  startup: string,
  image: string,
) => {
  return await db`INSERT INTO news (title, location, category, startup_id, description, news_date, startup, image)
      VALUES (${title}, ${location}, ${category}, ${startup_id}, ${description}, ${news_date}, ${startup}, ${image}) RETURNING *`;
};

export const deleteNewsByIdQuery = async (db: postgres.Sql, id: string) => {
  return await db`DELETE FROM news WHERE id = ${id} RETURNING *`;
};

export const updateNewsByIdQuery = async (
  db: postgres.Sql,
  id: number,
  title: string,
  category: string,
  description: string,
  location: string,
  news_date: string,
  startup: string,
  startup_id: number,
  image: string,
) => {
  return await db`UPDATE news SET
      title = ${title},
      category = ${category},
      description = ${description},
      news_date = ${news_date},
      startup = ${startup},
      startup_id = ${startup_id},
      location = ${location},
      image = ${image}
    WHERE id = ${id} RETURNING *`;
};
