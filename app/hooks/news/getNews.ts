import { TNews } from '@/app/types/news';

export async function getNews(): Promise<TNews[]> {
  try {
    const res = await fetch("/api/news", { method: "GET" });
    if (!res.ok) {
      throw new Error(`GET /api/news -> ${res.status} ${res.statusText}`);
    }
    const data: TNews[] = await res.json();
    return data
  } catch (error) {
    console.error("Error fetching news: ", error)
    return []
  }
}
