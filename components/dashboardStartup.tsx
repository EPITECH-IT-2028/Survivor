"use client";
import { useAuth } from "@/lib/auth-context";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import CountUp from "./ui/countUp";
import { useEffect, useState } from "react";
import { getStartupEngagement } from "@/app/hooks/startups/getStartupEngagement";
import { getStartupView } from "@/app/hooks/startups/getStartupView";
import CreateNews from '@/components/createNews';
import { TNews } from "@/app/types/news";
import { getNews } from "@/app/hooks/news/getNews";
import UpdateNews from "./updateNews";
import { PulseLoader } from "react-spinners";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format } from "date-fns";

export function DashboardStartup() {
  const { startups } = useAuth();
  const [engagementRate, setEngagementRate] = useState<number | null>(null);
  const [projectViews, setProjectViews] = useState<number | null>(null);

  const [isNewsCreateOpen, setIsNewsCreateOpen] = useState(false);
  const [isNewsUpdateOpen, setIsNewsUpdateOpen] = useState(false);
  const [newsData, setNewsData] = useState<TNews[] | undefined>();
  const [idClicked, setIdClicked] = useState<number | null>(null);
  const [pageNews, setPageNews] = useState<number>(0);

  const handleNewsClickRow = (id: number) => {
    setIdClicked(id);
    setIsNewsUpdateOpen(true);
  };

  const handleNewsCreateButton = () => {
    setIsNewsCreateOpen(true);
  };

  const refreshNewsData = async (id: number | null) => {
    const news = await getNews();
    setNewsData(news.filter((newsInfo) => (newsInfo.startup_id === startups?.[0].id)));
  };

  useEffect(() => {
    const fetchNews = async () => {
      const news = await getNews();
      setNewsData(news.filter((newsInfo) => newsInfo.startup_id === startups?.[0].id));
    };

    async function fetchMetrics() {
      const engagementResponse = await getStartupEngagement(startups?.[0]?.id || 0);
      const projectViewsResponse = await getStartupView(startups?.[0]?.id || 0);
      if (engagementResponse && projectViewsResponse) {
        setEngagementRate(engagementResponse);
        setProjectViews(projectViewsResponse);
      }
    }
    if (startups && startups.length > 0) {
      fetchMetrics();
    }
    fetchNews();

  }, [startups]);

  if (!newsData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PulseLoader size={30} color="#F18585" />
      </div>
    );
  }

  return (
    isNewsUpdateOpen ? (
        <UpdateNews
          data={newsData.find((n) => n.id === idClicked) || newsData[0]}
          isOpen={isNewsUpdateOpen}
          onClose={() => setIsNewsUpdateOpen(false)}
          onDataChanged={() => refreshNewsData(idClicked)}
        />
      ) : isNewsCreateOpen ? (
        <CreateNews
          isOpen={isNewsCreateOpen}
          onClose={() => setIsNewsCreateOpen(false)}
          onDataChanged={() => refreshNewsData(idClicked)}
        />
      ) : (
    <div className="flex w-full flex-col">
      <div className="items-center gap-8 text-center">
        <h1 className="p-8 pt-2 text-4xl">
          {startups?.length === 0 ? "Please create a startup" :
            startups?.length === 1 ? startups[0].name : startups?.map(startup => startup.name).join(", ")}
        </h1>
        <div className="grid grid-cols-2">
          <Card className="m-8 size-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Project views
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              <CountUp
                from={0}
                to={projectViews || 0}
                direction="up"
                duration={0.5}
                className="count-up-text"
              />
            </CardContent>
          </Card>
          <Card className="m-8 size-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Engagement rate
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              <CountUp
                from={0}
                to={engagementRate || 0}
                direction="up"
                duration={0.5}
              />
            </CardContent>
          </Card>
        </div>
        <Card className="w-auto">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-xl font-semibold">News</CardTitle>
              <Plus
                className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1"
                onClick={() => handleNewsCreateButton()}
              />
            </div>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Startup Id</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsData.slice(pageNews * 5, pageNews * 5 + 5).map((news) => (
                <TableRow
                  key={news.id}
                  onClick={() => handleNewsClickRow(news.id)}
                  className="cursor-pointer"
                >
                  <TableCell>{news.id}</TableCell>
                  <TableCell>
                    {news.title
                      ? news.title.length > 20
                        ? news.title.substring(0, 20) + "..."
                        : news.title
                      : "-"}
                  </TableCell>
                  <TableCell>{news.category}</TableCell>
                  <TableCell>
                    {news.news_date
                      ? format(news.news_date, "do MMMM yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {news.description
                      ? news.description.length > 20
                        ? news.description.substring(0, 20) + "..."
                        : news.description
                      : "-"}
                  </TableCell>
                  <TableCell>{news.startup_id ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex px-4">
            <ChevronLeft
              onClick={() => setPageNews(pageNews - 1 > 0 ? pageNews - 1 : 0)}
              className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1"
            />
            <ChevronRight
              onClick={() =>
                setPageNews(
                  (pageNews + 1) * 5 >= newsData.length
                    ? pageNews
                    : pageNews + 1,
                )
              }
              className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1"
            />
          </div>
        </Card>
      </div>
    </div>
  ))
}
