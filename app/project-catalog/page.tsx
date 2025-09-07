"use client"

import { TStartups, sectorFilters, maturityFilters } from '@/app/types/startup';
import { use, useEffect, useState } from "react"
import { Input } from '@/components/ui/input';
import { getStartups } from '../hooks/startups/getStartups';
import Modal from '@/components/Modal';
import { FiltersComboBoxResponsive } from '@/components/filter';
import { X } from 'lucide-react';

export default function Catalog() {

  const [sectorFilter, setSectorFilter] = useState('')
  const [maturityFilter, setMaturityFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  
  const [startupsInfo, setStartupsInfo] = useState<TStartups[]>([])
  const [startupDisp, setStartupDisp] = useState<TStartups[]>([])

  useEffect(() => {
    const fetchStartups = async () => {
      const startups = await getStartups();
      setStartupsInfo(startups);
      setStartupDisp(startups)
    };
    fetchStartups();
  }, []);

useEffect(() => {
    const s = sectorFilter.trim().toLowerCase();
    const m = maturityFilter.trim().toLowerCase();
    const l = locationFilter.trim().toLowerCase();

    const filtered = startupsInfo.filter((startup) => {
      const sector = (startup.sector ?? '').toLowerCase();
      const maturity = (startup.maturity ?? '').toLowerCase();
      const location = (startup.address ?? '').toLowerCase();
      if (s && !sector.includes(s))
        return false;
      if (m && !maturity.includes(m))
        return false;
      if (l && !location.includes(l))
        return false;
      return true;
    });

    setStartupDisp(filtered);
  }, [sectorFilter, maturityFilter, locationFilter, startupsInfo]);

  return (
  <div className="flex min-h-screen">
    <div className="w-80 bg-gray-50 border-r p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Filters</h1>
      <h2>Sector
      <FiltersComboBoxResponsive
            key={`sector-${sectorFilter}`}
            filtersList={sectorFilters.filter(s => s.value !== '-')}
            placeHolder={sectorFilter ? { label: sectorFilter, value: sectorFilter } : { label: "Select filters", value: "" }}
            onSelection={(value) => {
              setSectorFilter(value);
            }}
          />
        <button onClick={() => setSectorFilter("")} className="rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
          <X className="h-4 w-4" />
        </button>
      </h2>
      <h2>Maturity
      <FiltersComboBoxResponsive
            key={`maturity-${maturityFilter}`}
            filtersList={maturityFilters.filter(s => s.value !== '-')}
            placeHolder={maturityFilter ? { label: maturityFilter, value: maturityFilter } : { label: "Select filters", value: "" }}
            onSelection={(value) => {
              setMaturityFilter(value);
            }}
          />
        <button onClick={() => setMaturityFilter("")} className="rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
          <X className="h-4 w-4" />
        </button>
      </h2>
      <h2>Location
        <Input type="text" placeholder="Location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}/>
      </h2>
    </div>
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {
        startupDisp.map((value) => (
          <Modal key={value.id} startup={value} image="image" />
        ))
      }
    </div>
  </div>
  );
}
