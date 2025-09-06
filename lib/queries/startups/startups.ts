import { NeonQueryFunction } from "@neondatabase/serverless"

export const getStartupsQuery = async (db: NeonQueryFunction<false, false>) => {
  return await db`SELECT * FROM startups ORDER BY id ASC`;
}

export const insertStartupQuery = async (db: NeonQueryFunction<false, false>,
  name: string,
  description: string,
  legal_status: string,
  address: string,
  email: string,
  phone: string,
  created_at: string,
  website_url: string,
  social_media_url: string,
  project_status: string,
  needs: string,
  maturity: string,
  sector: string) => {
  return await db`INSERT INTO startups (name, description, legal_status, address, email, phone, created_at,
      website_url, social_media_url, project_status, needs, maturity, sector)
      VALUES (${name}, ${description}, ${legal_status}, ${address}, ${email}, ${phone}, ${created_at}, ${website_url},
      ${social_media_url}, ${project_status}, ${needs}, ${maturity}, ${sector}) RETURNING *`;
}

export const getStartupByIdQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  return await db`SELECT * FROM startups WHERE id = ${id}`;
}

export const deleteStartupByIdQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  return await db`DELETE FROM startups WHERE id = ${id} RETURNING *`;
}

export const updateStartupByIdQuery = async (db: NeonQueryFunction<false, false>,
  id: string,
  name: string,
  description: string,
  legal_status: string,
  address: string,
  email: string,
  phone: string,
  created_at: string,
  website_url: string,
  social_media_url: string,
  project_status: string,
  needs: string,
  maturity: string,
  sector: string) => {
  return await db`UPDATE startups SET 
      name = ${name},
      description = ${description},
      legal_status = ${legal_status},
      address = ${address},
      email = ${email},
      phone = ${phone},
      created_at = ${created_at},
      website_url = ${website_url},
      social_media_url = ${social_media_url},
      project_status = ${project_status},
      needs = ${needs},
      maturity = ${maturity},
      sector = ${sector}
      WHERE id = ${id} RETURNING *`;
}

export const getStartupsByFounderIdQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  return await db`
    SELECT s.*
    FROM founder_startup AS fs
    JOIN startups AS s ON s.id = fs.startup_id
    WHERE fs.founder_id = ${id}
  `;
}

export const getStartupByFounderAndStartupIdQuery = async (db: NeonQueryFunction<false, false>, founder_id: string, startup_id: string) => {
  return await db`
    SELECT s.*
    FROM startups s
    JOIN founder_startup fs ON fs.startup_id = s.id
    WHERE fs.founder_id = ${founder_id} AND fs.startup_id = ${startup_id}
  `;
}
