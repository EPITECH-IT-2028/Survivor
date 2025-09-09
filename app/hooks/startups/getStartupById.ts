import { TStartups } from '@/app/types/startup';

export async function getStartupById(startupId: number): Promise<TStartups | null> {
  try {
    const res = await fetch(`/api/startups/${startupId}`, { method: "GET" });
    if (!res.ok) {
      throw new Error(`GET /api/startups/${startupId} -> ${res.status} ${res.statusText}`);
    }
    const data: TStartups = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching startup with ID ${startupId}: `,
      error
    );
    return null;
  }
}
