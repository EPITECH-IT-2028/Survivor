"use client"

import { TStartups, sectorFilters, maturityFilters } from '@/app/types/startup';
import { use, useEffect, useState } from "react"
import { Input } from '@/components/ui/input';
import { getStartups } from '../hooks/startups/getStartups';
import Modal from '@/components/Modal';
import { FiltersComboBoxResponsive } from '@/components/filter';

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

  const [isOpen, setIsOpen] = useState(false)

  return (
  <div>
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <h2>Sector
        <FiltersComboBoxResponsive
          filtersList={sectorFilters.filter(s => s.value !== '-')}
          placeHolder={sectorFilters[0]}
          onSelection={(value) => {
            setSectorFilter(value);
          }}
        />
        <button onClick={() => setSectorFilter("")} className="rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </h2>
      <h2>Maturity
        <FiltersComboBoxResponsive
          filtersList={maturityFilters.filter(s => s.value !== '-')}
          placeHolder={maturityFilters[0]}
          onSelection={(value) => {
            setMaturityFilter(value);
          }}
        />
        <button onClick={() => setMaturityFilter("")} className="rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </h2>
      <h2>Location
        <Input type="text" placeholder="Location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}/>
      </h2>
      {
        startupDisp.map((value) => (
          <Modal key={value.id} startup={value} image="image" />
        ))
      }
    </div>
  </div>
  );
}
