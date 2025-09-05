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
import UpdateProfile from "@/components/updateProfile";
import { getStartups } from "../hooks/startups/getStartups";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import CreateUserOrStartup from "@/components/createUserOrStartup";
import CountUp from "@/components/countUp";

export default function Dashboard() {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [idClicked, setIdClicked] = useState<number | null>(null);
  const [isStartup, setIsStartup] = useState(true);
  const [usersData, setUsersData] = useState<TUser[]>([]);
  const [startupsData, setStartupsData] = useState<TStartups[]>([]);
  const [pageStartup, setPageStartup] = useState<number>(0);
  const [pageUser, setPageUser] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsersData(users);
    };
    const fetchStartups = async () => {
      const startups = await getStartups();
      setStartupsData(startups);
    };
    fetchUsers();
    fetchStartups();
  }, [isUpdateOpen, isCreateOpen]);

  const refreshData = async () => {
    const users = await getUsers();
    setUsersData(users);
    const startups = await getStartups();
    setStartupsData(startups);
  };

  const handleClickRow = (id: number, isStartup: boolean) => {
    setIdClicked(id);
    setIsStartup(isStartup);
    setIsUpdateOpen(true);
  };

  const handleCreateButton = (isStartup: boolean) => {
    setIsStartup(isStartup);
    setIsCreateOpen(true);
  };

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
  ) : isCreateOpen ?
    <CreateUserOrStartup isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} isStartup={isStartup} onDataChanged={refreshData} />

    : (
      <div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="size-auto m-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Number of startups
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              <CountUp
                from={0}
                to={startupsData.length}
                direction="up"
                duration={1}
                className="count-up-text"
              />
            </CardContent>
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
            <div className="flex justify-end px-4">
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
        </div>
      </div>
    );
}
