import { TNews } from "@/app/types/news"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import NewsImage from "./NewsImage";

export default function NewsCard({ news }: { news: TNews }) {

  const formatDate = (date: string | Date) => {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return dateObject.toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
  <Card className='h-80 w-full transform rounded-xl border border-gray-200 p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white'>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 h-14">
        {news.title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center">
          <span className="text-xs font-medium text-gray-500 w-16">Date:</span>
          <span className="text-sm text-gray-700">
          {news.news_date ? formatDate(news.news_date) : 'N/A'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-xs font-medium text-gray-500 w-16">Location:</span>
          <span className="text-sm text-gray-700 truncate">
            {news.location || 'N/A'}
          </span>
        </div>
      </div>
      {news.description && (
        <div className="mt-3">
          <p className="text-xs text-gray-600 line-clamp-3">
            {news.description}
          </p>
        </div>
      )}
      <div className="mt-3">
          <NewsImage id={news.id} />
        </div>
    </CardContent>
  </Card>
  )
}