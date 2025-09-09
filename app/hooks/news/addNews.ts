import { TNews, CategoryNews } from "@/app/types/news";

export interface NewsPayload {
	title: string;
	category: CategoryNews;
	startup_id: number;
	news_date?: Date;
	description?: string;
	startup: string;
	location?: string;
}

export async function addNews(news: NewsPayload): Promise<TNews | null> {
	try {
		const payload: NewsPayload = {
			title: news.title,
			category: news.category,
			news_date: news.news_date,
			startup: news.startup,
			startup_id: news.startup_id,
			description: news.description,
			location: news.location
		};

		const res = await fetch("/api/news", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		if (!res.ok) {
			throw new Error(`POST /api/news -> ${res.status} ${res.statusText}`);
		}
		const data = await res.json();
		return Array.isArray(data) ? data[0] : data;
	} catch (error) {
		console.error("Error adding news: ", error)
		return null
	}
}
