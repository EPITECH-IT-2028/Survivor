"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import getUsers from "../hooks/users/getUsers";
import { TUser } from "../types/users";
import { TStartups } from "../types/startup";
import UpdateProfile from "@/components/updateProfile";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [idClicked, setIdClicked] = useState<number | null>(null);
  const [isStartup, setIsStartup] = useState(true);
  // const usersData: TUser[] = getUsers();
  // const startupsData: TStartups[] = getStartups();

  const handleClickRow = (id: number, isStartup: boolean) => {
    setIdClicked(id);
    setIsStartup(isStartup);
    setIsOpen(true);
  };

  const startupsData: TStartups[] = [
    {
      id: 1,
      name: "Startup One",
      legal_status: "LLC",
      address: "123 Main St",
      email: "contact@startupone.com",
      phone: "123-456-7890",
      sector: "Tech",
      maturity: "Seed",
    },
    {
      id: 2,
      name: "Startup Two",
      legal_status: "Inc",
      address: "456 Elm St",
      email: "contact@startuptwo.com",
      phone: "987-654-3210",
      sector: "Finance",
      maturity: "Series A",
    },
  ];

  const usersData: TUser[] = [
    {
      id: 1,
      email: "a@a.com",
      name: "Arthur",
      role: "admin",
      founder_id: null,
      investor_id: null,
    },
    {
      id: 2,
      email: "b@b.com",
      name: "Bob",
      role: "founder",
      founder_id: 1,
      investor_id: null,
    },
  ];

  return isOpen ? (
      <UpdateProfile
        data={
          isStartup 
            ? startupsData.find(s => s.id === idClicked) || startupsData[0]
            : usersData.find(u => u.id === idClicked) || usersData[0]
        }
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isStartup={isStartup}
      />
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
          <CardContent className="text-3xl font-bold">52</CardContent>
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
              {startupsData.map((startup) => (
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
        </Card>
        {/* Table user */}
        <Card>
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
              {usersData.map((user) => (
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
        </Card>
      </div>
    </div>
  );
}
