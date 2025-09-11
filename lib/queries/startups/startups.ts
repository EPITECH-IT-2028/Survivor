import postgres from "postgres";

export const getStartupsQuery = async (db: postgres.Sql) => {
  return await db`SELECT id, name, description, legal_status, address, email, phone, website_url, social_media_url, project_status, needs, maturity, sector, engagement_rate, project_view FROM startups ORDER BY id ASC`;
};

export const getStartupEngagementsQuery = async (
  db: postgres.Sql,
  startup_id: string,
) => {
  return await db`SELECT engagement_rate FROM startups WHERE id = ${startup_id}`;
};

export const updateStartupEngagementQuery = async (
  db: postgres.Sql,
  startup_id: string,
  engagement_rate: number,
) => {
  return await db`UPDATE startups SET engagement_rate = ${engagement_rate} WHERE id = ${startup_id} RETURNING *`;
};

export const insertStartupQuery = async (
  db: postgres.Sql,
  name: string,
  description: string,
  legal_status: string,
  address: string,
  email: string,
  phone: string,
  website_url: string,
  social_media_url: string,
  project_status: string,
  needs: string,
  maturity: string,
  sector: string,
  engagement_rate: number,
  project_view: number,
  legacy_id: number | null,
) => {
  return await db`INSERT INTO startups(name, description, legal_status, address, email, phone,
    website_url, social_media_url, project_status, needs, maturity, sector, engagement_rate, project_view, legacy_id)
  VALUES(${name}, ${description}, ${legal_status}, ${address}, ${email}, ${phone}, ${website_url},
    ${social_media_url}, ${project_status}, ${needs}, ${maturity}, ${sector}, ${engagement_rate}, ${project_view}, ${legacy_id}) RETURNING * `;
};

export const getStartupByIdQuery = async (db: postgres.Sql, id: string) => {
  return await db`SELECT * FROM startups WHERE id = ${id} `;
};

export const deleteStartupByIdQuery = async (db: postgres.Sql, id: string) => {
  return await db`DELETE FROM startups WHERE id = ${id} RETURNING * `;
};

export const updateStartupByIdQuery = async (
  db: postgres.Sql,
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
  sector: string,
) => {
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
      WHERE id = ${id} RETURNING * `;
};

export const getStartupsByFounderIdQuery = async (
  db: postgres.Sql,
  id: string,
) => {
  return await db`
    SELECT s.*
    FROM founder_startup AS fs
    JOIN startups AS s ON s.id = fs.startup_id
    WHERE fs.founder_id = ${id}
  `;
};

export const getStartupByFounderAndStartupIdQuery = async (
  db: postgres.Sql,
  founder_id: string,
  startup_id: string,
) => {
  return await db`
    SELECT s.*
    FROM startups s
    JOIN founder_startup fs ON fs.startup_id = s.id
    WHERE fs.founder_id = ${founder_id} AND fs.startup_id = ${startup_id}
  `;
};
