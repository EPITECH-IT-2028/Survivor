import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

async function fetchDataFromExternalAPI(endpoint: string) {

  const response = await Promise.all([
    fetch(`https://api.jeb-incubator.com/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ``,
      },
    }
    ).then(res => res.json()),
  ]);

  return response
};

export async function POST(req: Request, res: NextResponse) {
  try {
    const db = neon(process.env.DATABASE_URL!);

    const response = await fetchDataFromExternalAPI('users');

    if (!response) {
      return NextResponse.json({ error: 'Failed to fetch data from external API' }, {
        status: 500,
      });
    }
    const users = response[0];

    for (const user of users) {
      await db.query(
        `INSERT INTO users (name, email, role, founder_id, investor_id) VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name,
         role = EXCLUDED.role, founder_id = EXCLUDED.founder_id, investor_id = EXCLUDED.investor_id`,
        [user.name, user.email, user.role, user.founder_id, user.investor_id]
      );
    }

    return NextResponse.json({ message: 'Data synchronized successfully' });
  } catch (error) {
    console.error('Error syncing data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
