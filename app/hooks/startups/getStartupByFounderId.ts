import { TStartups } from '@/app/types/startup';

export async function getStartupByFounderId(founderId: number): Promise<TStartups[]> {
  try {
    const res = await fetch(`/api/founders/${founderId}/startups`, { method: "GET" });
    if (!res.ok) {
      throw new Error(`GET /api/founders/${founderId}/startups -> ${res.status} ${res.statusText}`);
    }
    const data: TStartups[] = await res.json();
    return data
  } catch (error) {
    console.error("Error fetching startups: ", error)
    return []
  }
}
