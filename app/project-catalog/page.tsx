"use client";

import { TStartups, sectorFilters, maturityFilters } from "@/app/types/startup";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
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
      <div className="space-y-8 rounded-xl bg-muted/75 p-6">
        <h1 className="text-2xl font-bold">Filters</h1>
        <h2>
          Sector
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
          <button
            onClick={() => setSectorFilter("")}
            className="cursor-pointer rounded-full transition-colors hover:bg-gray-100"
          >
            <X className="size-4" />
          </button>
        </h2>
        <h2>
          Maturity
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
          <button
            onClick={() => setMaturityFilter("")}
            className="cursor-pointer rounded-full transition-colors hover:bg-gray-100"
          >
            <X className="size-4" />
          </button>
        </h2>
        <h2>
          Location
          <Input
            type="text"
            placeholder="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </h2>
      </div>
      <div className="mr-4 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {startupDisp.map((value) => (
          <Modal key={value.id} startup={value} image="image" />
        ))}
      </div>
    </div>
  );
}
