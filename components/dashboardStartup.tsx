"use client";
import { useAuth } from "@/lib/auth-context";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import CountUp from "./ui/countUp";

export function DashboardStartup() {
  const { startups } = useAuth();

  return (
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
                to={652}
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
                to={19}
                direction="up"
                duration={0.5}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
