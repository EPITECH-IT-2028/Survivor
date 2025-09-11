import { TNews } from "@/app/types/news";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NewsImage from "./NewsImage";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NewsCard({ news }: { news: TNews }) {
  const formatDate = (date: string | Date) => {
    const dateObject = typeof date === "string" ? new Date(date) : date;
    return dateObject.toLocaleDateString("en-UK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Card onClick={onClick} className="cursor-pointer">
        <CardContent className="flex h-full flex-col">
          <div className="mx-auto flex justify-start">
            <NewsImage id={news.id} />
          </div>
          <p className="mx-auto mt-4 line-clamp-2 flex-grow text-lg font-bold text-gray-900">
            {news.title}
          </p>
          <div className="mx-auto mt-auto grid grid-cols-2 space-x-4 pt-4">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">Date:</span>
              <span className="truncate text-gray-700">
                {news.news_date ? formatDate(news.news_date) : "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">Location:</span>
              <span className="truncate text-gray-700">
                {news.location || "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
        <Dialog open={isOpen}>
          <DialogContent className="max-h-[80vh] w-full overflow-y-auto">
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
                      <span>
                        {news.news_date ? formatDate(news.news_date) : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Category:</span>
                      <span>{news.category || "N/A"}</span>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <div className="leading-relaxed whitespace-pre-wrap text-gray-700">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {news.description}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end border-t pt-4">
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
