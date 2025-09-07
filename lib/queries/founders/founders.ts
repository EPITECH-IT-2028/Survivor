import { NeonQueryFunction } from "@neondatabase/serverless"

export const getFoundersByStartupIdQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  return await db`
    SELECT f.*
    FROM founders f
    JOIN founder_startup fs ON fs.founder_id = f.id
    WHERE fs.startup_id = ${id}
  `;
}

export const getFounderByStartupAndFounderIdQuery = async (db: NeonQueryFunction<false, false>, startup_id: string, founder_id: string) => {
  return await db`
    SELECT f.*
    FROM founders f
    JOIN founder_startup fs ON fs.founder_id = f.id
    WHERE fs.startup_id = ${startup_id} AND fs.founder_id = ${founder_id}
  `;
}

export const getFoundersQuery = async (db: NeonQueryFunction<false, false>) => {
  return await db`SELECT * FROM founders`;
}

export const getFounderByIdQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  return await db`SELECT * FROM founders WHERE id = ${id}`;
}

export const insertFounderQuery = async (db: NeonQueryFunction<false, false>, name: string) => {
  return await db`INSERT INTO founders (name)
    VALUES (${name}) RETURNING *`;
}

export const deleteFounderByIdQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  return await db`DELETE FROM founders WHERE id = ${id} RETURNING *`;
}

export const updateFounderByIdQuery = async (db: NeonQueryFunction<false, false>, id: string,
  name: string, external_id: string | null, startup_id: string | null) => {
  return await db`UPDATE founders SET 
      name = ${name},
      startup_id = ${startup_id},
      external_id = ${external_id}
      WHERE id = ${id} RETURNING *`;
}
