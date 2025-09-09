import { TNews } from "@/app/types/news"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import { DialogTitle, Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import NewsImage from "./NewsImage";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

  const [isOpen, setIsOpen] = useState(false);
  
  const onClick = () => {
      setIsOpen(!isOpen);
    };

  return (
    <>
    <Card className='h-112 w-full transform rounded-xl border border-gray-200 p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white' onClick={onClick}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
          {news.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-center">
          <NewsImage id={news.id} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-md font-medium text-gray-500 w-16">Date:</span>
            <span className="text-lg text-gray-700">
            {news.news_date ? formatDate(news.news_date) : 'N/A'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-md font-medium text-gray-500 w-16">Location:</span>
            <span className="text-lg text-gray-700 truncate">
              {news.location || 'N/A'}
            </span>
          </div>
        </div>
      </CardContent>
      <Dialog open={isOpen}>
        <DialogContent className="w-full max-h-[80vh] overflow-y-auto">
          {news && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {news.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Published:</span>
                    <span>{news.created_at ? formatDate(news.created_at) : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Category:</span>
                    <span>{news.category || 'N/A'}</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {news.description}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t">
                <Button onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  </>
  
  )
}