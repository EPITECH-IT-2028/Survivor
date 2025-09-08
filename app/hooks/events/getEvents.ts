import { TEvent } from '@/app/types/event';

export async function getEvents(): Promise<TEvent[]> {
  try {
    const res = await fetch("/api/events", { method: "GET" });
    if (!res.ok) {
      throw new Error(`GET /api/events -> ${res.status} ${res.statusText}`);
    }
    const data: TEvent[] = await res.json();
    return data
  } catch (error) {
    console.error("Error fetching events: ", error)
    return []
  }
}
