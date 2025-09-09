import postgres from 'postgres';

export const getPartnersQuery = async (db: postgres.Sql) => {
  return await db`SELECT * FROM partners ORDER BY id ASC`;
}

export const insertPartnerQuery = async (
  db: postgres.Sql,
  name: string,
  legal_status: string,
  address: string,
  email: string,
  phone: string,
  description: string,
  partnership_type: string
) => {
  return await db`INSERT INTO partners (name, legal_status, address, email, phone, description, partnership_type)
      VALUES (${name}, ${legal_status}, ${address}, ${email}, ${phone}, ${description}, ${partnership_type}) RETURNING *`;
}

export const getPartnerByIdQuery = async (db: postgres.Sql, id: string) => {
  return await db`SELECT * FROM partners WHERE id = ${id}`;
}

export const deletePartnerByIdQuery = async (db: postgres.Sql, id: string) => {
  return await db`DELETE FROM partners WHERE id = ${id} RETURNING *`;
}

export const updatePartnerByIdQuery = async (
  db: postgres.Sql,
  id: string,
  name: string,
  legal_status: string,
  address: string,
  email: string,
  phone: string,
  description: string,
  partnership_type: string
) => {
  return await db`UPDATE partners SET 
      name = ${name},
      legal_status = ${legal_status},
      address = ${address},
      email = ${email},
      phone = ${phone},
      description = ${description},
      partnership_type = ${partnership_type}
      WHERE id = ${id} RETURNING *`;
} 
