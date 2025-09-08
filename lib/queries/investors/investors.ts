import postgres from 'postgres';

export const getInvestorsQuery = async (db: postgres.Sql) => {
  return await db`SELECT * FROM investors`;
}

export const getInvestorByIdQuery = async (db: postgres.Sql, id: string) => {
  return await db`SELECT * FROM investors WHERE id = ${id}`;
}

export const insertInvestorQuery = async (
  db: postgres.Sql,
  name: string,
  legal_status: string,
  address: string,
  email: string,
  phone: string,
  description: string,
  investor_type: string,
  investment_focus: string
) => {
  return await db`INSERT INTO investors (name, legal_status, address, email, phone, description, investor_type, investment_focus)
      VALUES (${name}, ${legal_status}, ${address}, ${email}, ${phone}, ${description}, ${investor_type}, ${investment_focus}) RETURNING *`;
}

export const deleteInvestorByIdQuery = async (db: postgres.Sql, id: string) => {
  return await db`DELETE FROM investors WHERE id = ${id} RETURNING *`;
}

export const updateInvestorByIdQuery = async (
  db: postgres.Sql,
  id: string,
  name: string,
  legal_status: string,
  address: string,
  email: string,
  phone: string,
  description: string,
  investor_type: string,
  investment_focus: string
) => {
  return await db`UPDATE investors SET 
      name = ${name},
      legal_status = ${legal_status},
      address = ${address},
      email = ${email},
      phone = ${phone},
      description = ${description},
      investor_type = ${investor_type},
      investment_focus = ${investment_focus}
      WHERE id = ${id} RETURNING *`;
}
