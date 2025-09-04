import { TFounder } from '@/app/types/founder';

export default async function getFounders(): Promise<TFounder[]> {
  try {
    const res = await fetch("/api/founders", { method: "GET" });
    if (!res.ok) {
      throw new Error(`GET /api/founders -> ${res.status} ${res.statusText}`);
    }
    const data: TFounder[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching founders: ", error);
    return [];
  }
}
