"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "../hooks/users/getUsers";
import { TUser } from "../types/users";
import { TStartups } from "../types/startup";
import { TEvent } from "../types/event";
import { getStartups } from "../hooks/startups/getStartups";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { getEvents } from "../hooks/events/getEvents";
import { getNews } from "../hooks/news/getNews";
import UpdateEvent from "@/components/updateEvents";
import CreateEvent from "@/components/createEvent";
import { format } from "date-fns";
import { getMetrics } from "../hooks/admin/metrics/getMetrics";
import { TNews } from "../types/news";
import UpdateNews from "@/components/updateNews";
import CreateNews from "@/components/createNews";
import PulseLoader from "react-spinners/PulseLoader";
import CreateUser from "@/components/createUser";
import CreateStartup from "@/components/createStartup";
import UpdateStartup from "@/components/updateStartup";
import UpdateUser from "@/components/updateUser";

export default function Dashboard() {
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isUpdateStartupOpen, setIsUpdateStartupOpen] = useState(false);
  const [isCreateStartupOpen, setIsCreateStartupOpen] = useState(false);
  const [idClicked, setIdClicked] = useState<number | null>(null);
  const [isEventCreateOpen, setIsEventCreateOpen] = useState(false);
  const [isEventUpdateOpen, setIsEventUpdateOpen] = useState(false);
  const [isNewsCreateOpen, setIsNewsCreateOpen] = useState(false);
  const [isNewsUpdateOpen, setIsNewsUpdateOpen] = useState(false);

  const [usersData, setUsersData] = useState<TUser[] | undefined>();
  const [startupsData, setStartupsData] = useState<TStartups[] | undefined>();
  const [eventsData, setEventsData] = useState<TEvent[] | undefined>();
  const [newsData, setNewsData] = useState<TNews[] | undefined>();

  const [pageStartup, setPageStartup] = useState<number>(0);
  const [pageUser, setPageUser] = useState<number>(0);
  const [pageEvent, setPageEvent] = useState<number>(0);
  const [metrics, setMetrics] = useState<{ total_project_views: number; total_engagement_rate: number }>({
    total_project_views: 0,
    total_engagement_rate: 0
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsersData(users);
    };
    const fetchStartups = async () => {
      const startups = await getStartups();
      setStartupsData(startups);
    };
    const fetchEvents = async () => {
      const events = await getEvents();
      setEventsData(events);
    };
    const fetchMetrics = async () => {
      const metricsData = await getMetrics();
      setMetrics(metricsData[0]);
    }
    const fetchNews = async () => {
      const news = await getNews();
      setNewsData(news);
    };
    fetchMetrics();
    fetchUsers();
    fetchStartups();
    fetchEvents();
    fetchNews();
  }, []);

  const refreshUserData = async () => {
    const users = await getUsers();
    setUsersData(users);
  };

  const refreshStartupsData = async () => {
    const startups = await getStartups();
    setStartupsData(startups);
  };

  const refreshNewsData = async () => {
    const news = await getNews();
    setNewsData(news);
  };

  const refreshEventsData = async () => {
    const events = await getEvents();
    setEventsData(events);
  };

  const handleUserClickRow = (id: number) => {
    setIdClicked(id);
    setIsUpdateUserOpen(true);
  };

  const handleStartupClickRow = (id: number) => {
    setIdClicked(id);
    setIsUpdateStartupOpen(true);
  };

  const handleEventClickRow = (id: number) => {
    setIdClicked(id);
    setIsEventUpdateOpen(true);
  };

  const handleNewsClickRow = (id: number) => {
    setIdClicked(id);
    setIsNewsUpdateOpen(true);
  };

  const handleCreateUserButton = () => {
    setIsCreateUserOpen(true);
  };

  const handleCreateStartupButton = () => {
    setIsCreateStartupOpen(true);
  };

  const handleEventCreateButton = () => {
    setIsEventCreateOpen(true);
  };

  const handleNewsCreateButton = () => {
    setIsNewsCreateOpen(true);
  };

  if (!usersData || !startupsData || !eventsData || !newsData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PulseLoader size={30} color="#F18585" />
      </div>
    );
  }

  return isUpdateUserOpen ? (
    <UpdateUser
      data={usersData.find((u) => u.id === idClicked) || usersData[0]}
      isOpen={isUpdateUserOpen}
      onClose={() => {
        setIsUpdateUserOpen(false);
      }}
      onDataChanged={refreshUserData}
    />
  ) : isCreateUserOpen ? (
    <CreateUser
      isOpen={isCreateUserOpen}
      onClose={() => setIsCreateUserOpen(false)}
      onDataChanged={refreshUserData}
    />
  ) : isCreateStartupOpen ? (
    <CreateStartup
      isOpen={isCreateStartupOpen}
      onClose={() => setIsCreateStartupOpen(false)}
      onDataChanged={refreshStartupsData}
    />
  ) : isUpdateStartupOpen ? (
    <UpdateStartup
      data={startupsData.find((s) => s.id === idClicked) || startupsData[0]}
      isOpen={isUpdateStartupOpen}
      onClose={() => setIsUpdateStartupOpen(false)}
      onDataChanged={refreshStartupsData}
    />
  ) : isEventUpdateOpen ? (
    <UpdateEvent
      data={eventsData.find((e) => e.id === idClicked) || eventsData[0]}
      isOpen={isEventUpdateOpen}
      onClose={() => setIsEventUpdateOpen(false)}
      onDataChanged={refreshEventsData}
    />
  ) : isEventCreateOpen ? (
    <CreateEvent
      isOpen={isEventCreateOpen}
      onClose={() => setIsEventCreateOpen(false)}
      onDataChanged={refreshEventsData}
    />
  ) : isNewsUpdateOpen ? (
    <UpdateNews
      data={newsData.find((n) => n.id === idClicked) || newsData[0]}
      isOpen={isNewsUpdateOpen}
      onClose={() => setIsNewsUpdateOpen(false)}
      onDataChanged={refreshNewsData}
    />
  ) : isNewsCreateOpen ? (
    <CreateNews
      isOpen={isNewsCreateOpen}
      onClose={() => setIsNewsCreateOpen(false)}
      onDataChanged={refreshNewsData}
    />
  ) : (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="m-8 size-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Number of startups
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{`${startupsData.length}`}</CardContent>
        </Card>
        <Card className="m-8 size-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Project views
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{metrics.total_project_views}</CardContent>
        </Card>
        <Card className="m-8 size-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Engagement rate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{metrics.total_engagement_rate}</CardContent>
        </Card>
      </div>
      <div className="space-y-8 p-4">
        <Card className="w-auto">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-xl font-semibold">Startups</CardTitle>
              <Plus
                className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1"
                onClick={() => handleCreateStartupButton()}
              />
            </div>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Legal status</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Maturity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {startupsData
                .slice(pageStartup * 5, pageStartup * 5 + 5)
                .map((startup) => (
                  <TableRow
                    key={startup.id}
                    onClick={() => handleStartupClickRow(startup.id)}
                    className="cursor-pointer"
                  >
                    <TableCell>{startup.id}</TableCell>
                    <TableCell>{startup.name}</TableCell>
                    <TableCell>{startup.legal_status}</TableCell>
                    <TableCell>{startup.address}</TableCell>
                    <TableCell>{startup.email}</TableCell>
                    <TableCell>{startup.phone}</TableCell>
                    <TableCell>{startup.sector}</TableCell>
                    <TableCell>{startup.maturity}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className="flex px-4">
            <ChevronLeft
              onClick={() =>
                setPageStartup(pageStartup - 1 > 0 ? pageStartup - 1 : 0)
              }
              className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
            />
            <ChevronRight
              onClick={() =>
                setPageStartup(
                  (pageStartup + 1) * 5 > startupsData.length
                    ? pageStartup
                    : pageStartup + 1,
                )
              }
              className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
            />
          </div>
        </Card>
        {/* Table user */}
        <Card className="w-auto">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-xl font-semibold">Users</CardTitle>
              <Plus
                className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1"
                onClick={() => handleCreateUserButton()}
              />
            </div>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Founder Id</TableHead>
                <TableHead>Investor Id</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.slice(pageUser * 5, pageUser * 5 + 5).map((user) => (
                <TableRow
                  key={user.id}
                  onClick={() => handleUserClickRow(user.id)}
                  className="cursor-pointer"
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.founder_id ? user.founder_id : "-"}
                  </TableCell>
                  <TableCell>
                    {user.investor_id ? user.investor_id : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex px-4">
            <ChevronLeft
              onClick={() => setPageUser(pageUser - 1 > 0 ? pageUser - 1 : 0)}
              className="cursor-pointer justify-end rounded-full p-1 hover:bg-gray-100"
            />
            <ChevronRight
              onClick={() =>
                setPageUser(
                  (pageUser + 1) * 5 >= usersData.length
                    ? pageUser
                    : pageUser + 1,
                )
              }
              className="cursor-pointer justify-end rounded-full p-1 hover:bg-gray-100"
            />
          </div>
        </Card>
        <Card className="w-auto">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-xl font-semibold">Events</CardTitle>
              <Plus
                className="cursor-pointer justify-end rounded-full p-1 hover:bg-gray-100"
                onClick={() => handleEventCreateButton()}
              />
            </div>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Target Audience</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventsData
                .slice(pageEvent * 5, pageEvent * 5 + 5)
                .map((event) => (
                  <TableRow
                    key={event.id}
                    onClick={() => handleEventClickRow(event.id)}
                    className="cursor-pointer"
                  >
                    <TableCell>{event.id}</TableCell>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.event_type}</TableCell>
                    <TableCell>
                      {event.dates ? format(event.dates, "do MMMM yyyy") : "-"}
                    </TableCell>
                    <TableCell>{event.location ?? "-"}</TableCell>
                    <TableCell>{event.target_audience ?? "-"}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className="flex px-4">
            <ChevronLeft
              onClick={() =>
                setPageEvent(pageEvent - 1 > 0 ? pageEvent - 1 : 0)
              }
              className="cursor-pointer justify-end rounded-full p-1 hover:bg-gray-100"
            />
            <ChevronRight
              onClick={() =>
                setPageEvent(
                  (pageEvent + 1) * 5 >= eventsData.length
                    ? pageEvent
                    : pageEvent + 1,
                )
              }
              className="cursor-pointer justify-end rounded-full p-1 hover:bg-gray-100"
            />
          </div>
        </Card>
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
  );
}
