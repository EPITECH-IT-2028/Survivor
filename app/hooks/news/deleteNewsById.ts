import { TNews } from "@/app/types/news";

interface EventPayload  {
  id: number;
}

export async function deleteNewsById(newsId: number): Promise<TNews | null> {
  try {
    const payload: EventPayload = {
      id: newsId
    };
    const res = await fetch(`/api/news/${newsId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`DELETE /api/news/${newsId} -> ${res.status} ${res.statusText}`);
    }
    const data: TNews = await res.json();
    return data
  } catch (error) {
    console.error("Error deleting news: ", error)
    return null
  }
}
