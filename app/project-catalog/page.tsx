"use client";

import { TStartups, sectorFilters, maturityFilters } from "@/app/types/startup";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getStartups } from "../hooks/startups/getStartups";
import Modal from "@/components/Modal";
import { FiltersComboBoxResponsive } from "@/components/filter";
import { X } from "lucide-react";

export default function Catalog() {
  const [sectorFilter, setSectorFilter] = useState("");
  const [maturityFilter, setMaturityFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [startupsInfo, setStartupsInfo] = useState<TStartups[]>([]);
  const [startupDisp, setStartupDisp] = useState<TStartups[]>([]);

  useEffect(() => {
    const fetchStartups = async () => {
      const startups = await getStartups();
      setStartupsInfo(startups);
      setStartupDisp(startups);
    };
    fetchStartups();
  }, []);

  useEffect(() => {
    const s = sectorFilter.trim().toLowerCase();
    const m = maturityFilter.trim().toLowerCase();
    const l = locationFilter.trim().toLowerCase();

    const filtered = startupsInfo.filter((startup) => {
      const sector = (startup.sector ?? "").toLowerCase();
      const maturity = (startup.maturity ?? "").toLowerCase();
      const location = (startup.address ?? "").toLowerCase();
      if (s && !sector.includes(s)) return false;
      if (m && !maturity.includes(m)) return false;
      if (l && !location.includes(l)) return false;
      return true;
    });

    setStartupDisp(filtered);
  }, [sectorFilter, maturityFilter, locationFilter, startupsInfo]);

  return (
    <div className="relative left-1/2 mt-12 flex min-h-screen -translate-x-1/2 justify-center gap-4 md:w-4xl lg:w-6xl">
      <div className="flex min-w-full space-y-8 rounded-xl bg-muted/75 p-6">
        <div className="mr-6 flex flex-col gap-8">
          <h1 className="text-2xl font-bold">Filters</h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="mb-2 font-bold">Sector</p>
              <FiltersComboBoxResponsive
                key={`sector-${sectorFilter}`}
                filtersList={sectorFilters.filter((s) => s.value !== "-")}
                placeHolder={
                  sectorFilter
                    ? { label: sectorFilter, value: sectorFilter }
                    : { label: "Select filters", value: "" }
                }
                onSelection={(value) => {
                  setSectorFilter(value);
                }}
              />
              <Button
                onClick={() => setSectorFilter("")}
                className="relative cursor-pointer self-end rounded-md p-0 text-xs text-foreground/25 transition-colors hover:text-foreground/50"
                variant="link"
              >
                Clear
              </Button>
            </div>

            <div className="flex flex-col">
              <p className="mb-2 font-bold">Maturity</p>
              <FiltersComboBoxResponsive
                key={`maturity-${maturityFilter}`}
                filtersList={maturityFilters.filter((s) => s.value !== "-")}
                placeHolder={
                  maturityFilter
                    ? { label: maturityFilter, value: maturityFilter }
                    : { label: "Select filters", value: "" }
                }
                onSelection={(value) => {
                  setMaturityFilter(value);
                }}
              />
              <Button
                onClick={() => setMaturityFilter("")}
                className="relative cursor-pointer self-end rounded-md p-0 text-xs text-foreground/25 transition-colors hover:text-foreground/50"
                variant="link"
              >
                Clear
              </Button>
            </div>

            <div className="flex flex-col">
              <p className="mb-2 font-bold">Location</p>
              <Input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mr-4 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {startupDisp.map((value) => (
            <Modal key={value.id} startup={value} image="image" />
          ))}
        </div>
      </div>
    </div>
  );
}
