"use client";

import { useState, useEffect} from "react"
import { TNews } from "../types/news"
import NewsCard from "@/components/NewsCard"
import { getNews } from "../hooks/news/getNews"
import { PulseLoader } from "react-spinners"

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
    <div className="relative left-1/2 flex w-dvw -translate-x-1/2 justify-center space-y-8 p-6">
      {newsInfo.length === 0 && (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <PulseLoader size={30} color="#F18585" />
        </div>
      )}
      <div>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsInfo.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
        </div>
      </div>
    </div>
  );
}
