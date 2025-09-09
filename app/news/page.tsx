"use client"

import { useState, useEffect} from "react"
import { TNews } from "../types/news"
import NewsCard from "@/components/NewsCard"
import { getNews } from "../hooks/news/getNews"

export default function News() {

  const [newsInfo, setNewsInfo] = useState<TNews[]>([])
  const [selectedNews, setSelectedNews] = useState<TNews | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      const news = await getNews();
      setNewsInfo(news);
    };
    fetchEvent();
  }, []);

  return (
    <div className="space-y-8 p-6 w-dvw -translate-x-1/2 left-1/2 relative flex justify-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">News</h2>
          <div className="grid w-full max-w-6xl grid-cols-2 gap-6 md:grid-cols-1 lg:grid-cols-2">
            {newsInfo.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
          </div>
      </div>
    </div>
  )}