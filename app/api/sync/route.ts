import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

async function fetchDataFromExternalAPI(endpoint: string) {

  const response = await Promise.all([
    fetch(`https://api.jeb-incubator.com/${endpoint}`).then(res => res.json()),
  ]);

  return response
};

export async function POST(req: Request, res: NextResponse) {
  try {
    const db = neon(process.env.DATABASE_URL!);

    const response = await fetchDataFromExternalAPI('users');

    console.log('Fetched data:', response);

    return NextResponse.json({ message: 'Data synchronized successfully' });
  } catch (error) {
    console.error('Error syncing data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
