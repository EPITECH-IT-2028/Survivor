import { CategoryNews, TNews } from "@/app/types/news";

export interface NewsPayload {
  title: string;
  category: CategoryNews;
  news_date?: Date;
  description?: string;
  startup?: string;
  location?: string;
  startup_id?: number;
  image?: string;
}


export async function setNewsById(newsId: number, newsData: TNews): Promise<TNews | null> {
  try {
    if (!newsData || 
      !newsData.title ||
       !newsData.news_date || 
       !newsData.startup_id || 
       !newsData.description || 
       !newsData.category || 
       !newsData.startup || 
       !newsData.location
      )
      throw new Error("newsData has at least one information null.");

    const payload: NewsPayload = {
      category: newsData.category,
      description: newsData.description,
      location: newsData.location,
      news_date: newsData.news_date,
      startup: newsData.startup,
      startup_id: newsData.startup_id,
      title: newsData.title,
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
