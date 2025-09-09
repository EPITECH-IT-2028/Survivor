import { CategoryNews, TNews } from "@/app/types/news";

export interface NewsPayload {
  title: string;
  category: CategoryNews;
  news_date?: Date;
  description?: string;
  startup?: string;
  image?: string;
}


export async function setNewsById(newsId: number, newsData: TNews): Promise<TNews | null> {
  try {
    if (!newsData || !newsData.title || !newsData.news_date || !newsData.startup_id || !newsData.description || !newsData.category)
      throw new Error("newsData has at least one information null.");

    const payload: NewsPayload = {
      title: newsData.title,
      category: newsData.category,
      news_date: newsData.news_date,
      description: newsData.description,
    };

    console.log("PUT /api/news/:id payload: ", payload);
    console.log("id: ", newsId);

    const res = await fetch(`/api/news/${newsId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`PUT /api/news/${newsId} -> ${res.status} ${res.statusText}`);
    }

    const data: TNews = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating news: ", error)
    return null
  }
}
