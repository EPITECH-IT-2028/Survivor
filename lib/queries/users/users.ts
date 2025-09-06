import { NeonQueryFunction } from "@neondatabase/serverless"

export const getUsersQuery = async (db: NeonQueryFunction<false, false>) => {
  return await db`SELECT * FROM users ORDER BY id ASC`;
}

export const getUserByIdQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  const response = await db`SELECT * FROM users WHERE id = ${id}`;
  return response[0];
}

export const getUserByEmailQuery = async (db: NeonQueryFunction<false, false>, email: string) => {
  return await db`SELECT * FROM users WHERE email = ${email}`;
}

export const insertUserQuery = async (
  db: NeonQueryFunction<false, false>,
  name: string,
  role: string,
  email: string,
  founder_id: string | null,
  investor_id: string | null,
  password?: string,
) => {
  return await db`INSERT INTO users (name, role, email, founder_id, investor_id, password)
      VALUES (${name}, ${role}, ${email}, ${founder_id}, ${investor_id}, ${password}) RETURNING *`;
}


export const deleteUserQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  return await db`DELETE FROM users WHERE id = ${id} RETURNING *`;
}

export const updateUserQuery = async (db: NeonQueryFunction<false, false>,
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
