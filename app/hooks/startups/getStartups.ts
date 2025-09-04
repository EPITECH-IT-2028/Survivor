
import { TStartups } from '@/app/types/startup';

export async function getStartups(): Promise<TStartups[]> {
  try {
    const res = await fetch("/api/startups", { method: "GET" });
    if (!res.ok) {
      throw new Error(`GET /api/startups -> ${res.status} ${res.statusText}`);
    }
    const data: TStartups[] = await res.json();
    return data
  } catch (error) {
    console.error("Error fetching startups: ", error)
    return []
  }
}
