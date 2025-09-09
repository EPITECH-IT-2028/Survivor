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
import UpdateProfile from "@/components/updateProfile";
import { getStartups } from "../hooks/startups/getStartups";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import CreateUserOrStartup from "@/components/createUserOrStartup";
import { getEvents } from "../hooks/events/getEvents";
import { getNews } from "../hooks/news/getNews";
import UpdateEvent from "@/components/updateEvents";
import CreateEvent from "@/components/createEvent";
import { format } from "date-fns";
import { TNews } from "../types/news";
import UpdateNews from "@/components/updateNews";
import CreateNews from "@/components/createNews";

export default function Dashboard() {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [idClicked, setIdClicked] = useState<number | null>(null);
  const [isStartup, setIsStartup] = useState(true);
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
  const [pageNews, setPageNews] = useState<number>(0);

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
    const fetchNews = async () => {
      const news = await getNews();
      setNewsData(news);
    }
    fetchUsers();
    fetchStartups();
    fetchEvents();
    fetchNews();
  }, [isUpdateOpen, isCreateOpen, isEventUpdateOpen, isEventCreateOpen, isNewsCreateOpen, isNewsUpdateOpen]);

  const refreshData = async () => {
    const users = await getUsers();
    setUsersData(users);
    const startups = await getStartups();
    setStartupsData(startups);
    const events = await getEvents();
    setEventsData(events);
    const news = await getNews();
    setNewsData(news);
  };

  const handleClickRow = (id: number, isStartup: boolean) => {
    setIdClicked(id);
    setIsStartup(isStartup);
    setIsUpdateOpen(true);
  };

  const handleEventClickRow = (id: number) => {
    setIdClicked(id);
    setIsEventUpdateOpen(true);
  };

  const handleNewsClickRow = (id: number) => {
    setIdClicked(id);
    setIsNewsUpdateOpen(true);
  };

  const handleCreateButton = (isStartup: boolean) => {
    setIsStartup(isStartup);
    setIsCreateOpen(true);
  };


  const handleEventCreateButton = () => {
    setIsEventCreateOpen(true);
  };

  const handleNewsCreateButton = () => {
    setIsNewsCreateOpen(true);
  };

  if (!usersData || !startupsData || !eventsData || !newsData) {
    return <div>Loading...</div>;
  }
  return isUpdateOpen ? (
    <UpdateProfile
      data={
        isStartup
          ? startupsData.find(s => s.id === idClicked) || startupsData[0]
          : usersData.find(u => u.id === idClicked) || usersData[0]
      }
      isOpen={isUpdateOpen}
      onClose={() => setIsUpdateOpen(false)}
      isStartup={isStartup}
      onDataChanged={refreshData}
    />
  ) : isEventUpdateOpen ? (
    <UpdateEvent
      data={eventsData.find(e => e.id === idClicked) || eventsData[0]}
      isOpen={isEventUpdateOpen}
      onClose={() => setIsEventUpdateOpen(false)}
      onDataChanged={refreshData}
    />
  ) : isNewsUpdateOpen ? (
    <UpdateNews
      data={newsData.find(n => n.id === idClicked) || newsData[0]}
      isOpen={isNewsUpdateOpen}
      onClose={() => setIsNewsUpdateOpen(false)}
      onDataChanged={refreshData}
    />
  ) : isCreateOpen ? (
    <CreateUserOrStartup isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} isStartup={isStartup} onDataChanged={refreshData} />
  ) : isEventCreateOpen ? (
    <CreateEvent isOpen={isEventCreateOpen} onClose={() => setIsEventCreateOpen(false)} onDataChanged={refreshData} />
    ) : isNewsCreateOpen ? (
      <CreateNews isOpen={isNewsCreateOpen} onClose={() => setIsNewsCreateOpen(false)} onDataChanged={refreshData} />
  ) : (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="size-auto m-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Number of startups
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{`${startupsData.length}`}</CardContent>
        </Card>
        <Card className="size-auto m-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Project views
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">652</CardContent>
        </Card>
        <Card className="size-auto m-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Engagement rate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">4</CardContent>
        </Card>
      </div>
      <div className="space-y-8 p-4">
        {/* Table projects */}
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-xl font-semibold">
                Startups
              </CardTitle>
              <Plus className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1" onClick={() => handleCreateButton(true)} />
            </div>
          </CardHeader>
          <Table className="size-fit">
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
              {startupsData.slice(pageStartup * 5, pageStartup * 5 + 5).map((startup) => (
                <TableRow
                  key={startup.id}
                  onClick={() => handleClickRow(startup.id, true)}
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
            <ChevronLeft onClick={() => setPageStartup(pageStartup - 1 > 0 ? pageStartup - 1 : 0)} className="cursor-pointer hover:bg-gray-100 rounded-full p-1" />
            <ChevronRight onClick={() => setPageStartup((pageStartup + 1) * 5 > startupsData.length ? pageStartup : pageStartup + 1)} className="cursor-pointer hover:bg-gray-100 rounded-full p-1" />
          </div>
        </Card>
        {/* Table user */}
        <Card className="w-auto">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-xl font-semibold">
                Users
              </CardTitle>
              <Plus className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1" onClick={() => handleCreateButton(false)} />
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
                  onClick={() => handleClickRow(user.id, false)}
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
            <ChevronLeft onClick={() => setPageUser(pageUser - 1 > 0 ? pageUser - 1 : 0)} className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1" />
            <ChevronRight onClick={() => setPageUser((pageUser + 1) * 5 >= usersData.length ? pageUser : pageUser + 1)} className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1" />
          </div>
        </Card>
        <Card className="w-auto">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-xl font-semibold">
                Events
              </CardTitle>
              <Plus className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1" onClick={() => handleEventCreateButton()} />
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
              {eventsData.slice(pageEvent * 5, pageEvent * 5 + 5).map((event) => (
                <TableRow
                  key={event.id}
                  onClick={() => handleEventClickRow(event.id)}
                  className="cursor-pointer"
                >
                  <TableCell>{event.id}</TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.event_type}</TableCell>
                  <TableCell>{event.dates ? format(event.dates, "MMMM do, yyyy") : "-"}</TableCell>
                  <TableCell>{event.location ?? "-"}</TableCell>
                  <TableCell>{event.target_audience ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex px-4">
            <ChevronLeft onClick={() => setPageEvent(pageEvent - 1 > 0 ? pageEvent - 1 : 0)} className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1" />
            <ChevronRight onClick={() => setPageEvent((pageEvent + 1) * 5 >= eventsData.length ? pageEvent : pageEvent + 1)} className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1" />
          </div>
        </Card>
        <Card className="w-auto">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-xl font-semibold">
                News
              </CardTitle>
              <Plus className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1" onClick={() => handleNewsCreateButton()} />
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
                  <TableCell>{news.title ? (news.title.length > 20 ? news.title.substring(0, 20) + "..." : news.title) : "-"}</TableCell>
                  <TableCell>{news.category}</TableCell>
                  <TableCell>{news.news_date ? format(news.news_date, "do MMMM yyyy") : "-"}</TableCell>
                  <TableCell>{news.description ? (news.description.length > 20 ? news.description.substring(0, 20) + "..." : news.description) : "-"}</TableCell>
                  <TableCell>{news.startup_id ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex px-4">
            <ChevronLeft onClick={() => setPageNews(pageNews - 1 > 0 ? pageNews - 1 : 0)} className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1" />
            <ChevronRight onClick={() => setPageNews((pageNews + 1) * 5 >= newsData.length ? pageNews : pageNews + 1)} className="justify-end cursor-pointer hover:bg-gray-100 rounded-full p-1" />
          </div>
        </Card>
      </div>
    </div>
  );
}
