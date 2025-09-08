import postgres from "postgres";

export const getUsersQuery = async (db: postgres.Sql) => {
  return await db`SELECT * FROM users ORDER BY id ASC`;
}

export const getUserByIdQuery = async (db: postgres.Sql, id: string) => {
  const response = await db`SELECT * FROM users WHERE id = ${id}`;
  return response[0];
}

export const getUserByEmailQuery = async (db: postgres.Sql, email: string) => {
  return await db`SELECT * FROM users WHERE email = ${email}`;
}

export const insertUserQuery = async (
  db: postgres.Sql,
  name: string,
  role: string,
  email: string,
  founder_id: string | null,
  investor_id: string | null,
  password?: string,
) => {
  return await db`INSERT INTO users (name, role, email, founder_id, investor_id, password)
      VALUES (${name}, ${role}, ${email}, ${founder_id}, ${investor_id}, ${password ?? null}) RETURNING *`;
}


export const deleteUserQuery = async (db: postgres.Sql, id: string) => {
  return await db`DELETE FROM users WHERE id = ${id} RETURNING *`;
}

export const updateUserQuery = async (db: postgres.Sql,
  id: string,
  name: string,
  role: string,
  email: string,
  founder_id: string | null,
  investor_id: string | null,
) => {
  return await db`UPDATE users SET 
      name = ${name},
      role = ${role},
      email = ${email},
      founder_id = ${founder_id},
      investor_id = ${investor_id}
      WHERE id = ${id} RETURNING *`;
}

export const updateUserPasswordQuery = async (db: postgres.Sql,
  id: string,
  password: string,
) => {
  return await db`UPDATE users SET 
      password = ${password}
      WHERE id = ${id} RETURNING *`;
}
