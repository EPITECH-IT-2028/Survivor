"use client"

import { useState, useEffect} from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { TNews } from "../types/news"
import NewsCard from "@/components/NewsCard"
import { getNews } from "../hooks/news/getNews"

export default function News() {

  const [newsInfo, setNewsInfo] = useState<TNews[]>([])

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
          <div className="grid w-full max-w-6xl grid-cols-4 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {newsInfo.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
          </div>
      </div>
    </div>
  )}