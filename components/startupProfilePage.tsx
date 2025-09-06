"use client"
import { setStartupById } from "@/app/hooks/startups/setStartupById";
import { TStartups, sectorFilters, projectStatusFilters, needsFilters, maturityFilters } from "@/app/types/startup";
import { useAuth } from "@/lib/auth-context";
import { useState, useEffect } from "react";
import { FiltersComboBoxResponsive } from "./filter";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";


export function UpdateStartup() {
  const { startups } = useAuth();
  const [startupsData, setStartupsData] = useState<TStartups[] | null>();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    if (startups) {
      setStartupsData(startups);
    }
  }, [startups]);

  useEffect(() => {
    if (isUpdate === false) {
      setIsUpdate(true);
    }
  })

  const handleUpdateStartup = async (startupId: number) => {
    const startupData: TStartups | undefined = startupsData?.find((s) => s.id === startupId);
    if (startupData) {
      if (!startupData.name || !startupData.legal_status || !startupData.address) {
        setMessage({
          type: "error",
          title: "Error updating startup",
          description: "Name, Legal status and Address are required fields.",
        });
        return;
      }
      try {
        await setStartupById(startupId, startupData);
        setMessage({
          type: "success",
          title: "Startup updated successfully!",
          description: "",
        });
        setIsUpdate(false);
      } catch (error) {
        console.error("Error updating startup:", error);
        setMessage({
          type: "error",
          title: "Error updating startup",
          description: error instanceof Error ? error.message : "An unknown error occurred",
        });
      }
    }
  }

  useEffect(() => {
    if (message) {
      toast[message.type](message.title, {
        description: message.description,
      });
    }
  }, [message]);

  const handleChangeInputValue = (updatedString: string, startupId: number, typeToUpdate: string) => {
    const startups = startupsData?.map((s) => {
      if (s.id === startupId) {
        return { ...s, [typeToUpdate]: updatedString };
      }
      return s;
    });
    setStartupsData(startups);
  }

  return (
    <div className="flex flex-col w-full">
      <div className=" items-center text-center gap-8">
        {startupsData?.map((startup, key) => (
          <Card key={key} className="size-auto m-8 p-6 w-auto">
            <CardHeader
              onClick={() => setIsCardOpen(!isCardOpen)}
            >
              <div className="flex items-center justify-between h-12">
                <CardTitle className="text-xl font-semibold">{startup.name}</CardTitle>
                {isCardOpen ?
                  <ChevronDown className="cursor-pointer" onClick={() => setIsCardOpen(false)} />
                  :
                  <ChevronUp className="cursor-pointer" onClick={() => setIsCardOpen(true)} />
                }
              </div>
            </CardHeader>
            {isCardOpen && (
              <CardContent>
                <div className="p-2 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-sm font-medium">Name :</h1>
                    <Input
                      value={startup.name}
                      onChange={(e) => handleChangeInputValue(e.target.value, startup.id, "name")}
                      className="flex-1 px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-sm font-medium">Email :</h1>
                    <Input
                      value={startup.email}
                      onChange={(e) => handleChangeInputValue(e.target.value, startup.id, "email")}
                      className="flex-1 px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-sm font-medium">Address :</h1>
                    <Input
                      value={startup?.address || ""}
                      onChange={(e) => handleChangeInputValue(e.target.value, startup.id, "address")}
                      className="flex-1 px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-sm font-medium">Sector :</h1>
                    <FiltersComboBoxResponsive
                      filtersList={sectorFilters.filter(m => m.value !== '-')}
                      placeHolder={startup.sector ? { label: startup.sector, value: startup.sector } : sectorFilters[0]}
                      onSelection={(value: string) => {
                        handleChangeInputValue(value, startup.id, "sector");
                      }}
                      className="flex-1 px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-sm font-medium">Website URL :</h1>
                    <Input
                      value={startup?.website_url || ""}
                      onChange={(e) => (handleChangeInputValue(e.target.value, startup.id, "website_url"))}
                      className="flex-1 px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-sm font-medium">Social media URL :</h1>
                    <Input
                      value={startup?.social_media_url || ""}
                      onChange={(e) => (handleChangeInputValue(e.target.value, startup.id, "social_media_url"))}
                      className="flex-1 px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-sm font-medium">Project status :</h1>
                    <FiltersComboBoxResponsive
                      filtersList={projectStatusFilters.filter(m => m.value !== '-')}
                      placeHolder={startup.project_status ? { label: startup.project_status, value: startup.project_status } : projectStatusFilters[0]}
                      onSelection={(value: string) => {
                        handleChangeInputValue(value, startup.id, "project_status");
                      }}
                      className="flex-1 px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-sm font-medium">Needs :</h1>
                    <FiltersComboBoxResponsive
                      filtersList={needsFilters.filter(m => m.value !== '-')}
                      placeHolder={startup.needs ? { label: startup.needs, value: startup.needs } : needsFilters[0]}
                      onSelection={(value: string) => {
                        handleChangeInputValue(value, startup.id, "needs");
                      }}
                      className="flex-1 px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-sm font-medium">Description :</h1>
                    <Textarea
                      value={startup?.description || ""}
                      onChange={(e) => (handleChangeInputValue(e.target.value, startup.id, "description"))}
                      className="flex-1 px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="text-sm font-medium">Maturity :</h1>
                    <FiltersComboBoxResponsive
                      filtersList={maturityFilters.filter(m => m.value !== '-')}
                      placeHolder={startup.maturity ? { label: startup.maturity, value: startup.maturity } : maturityFilters[0]}
                      onSelection={(value: string) => {
                        handleChangeInputValue(value, startup.id, "maturity");
                      }}
                      className="flex-1 px-3 py-2 border rounded"
                    />
                  </div>
                </div>
                {
                  isUpdate && (
                    <Button onClick={() => handleUpdateStartup(startup.id)}>
                      Update all data
                    </Button>
                  )
                }
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

