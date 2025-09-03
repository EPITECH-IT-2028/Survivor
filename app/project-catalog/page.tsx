"use client"

import StartupCard from '@/components/startupCard';
import { TStartups } from '../types/startup';
import { useEffect, useState } from "react"
import { Input } from '@/components/ui/input';
import getStartups from '../hooks/startups/getStartups';

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
    if (sectorFilter === '' && maturityFilter === '' && locationFilter === '') {
      setStartupDisp(startupsInfo)
    }
    if (sectorFilter != '' && sectorFilter != null) {
      setStartupDisp([...startupsInfo.filter((startup) => 
        startup.sector?.toLowerCase().includes(sectorFilter)
      )])
    } 
    if (maturityFilter != '' && maturityFilter != null) {
      if (sectorFilter != '' && sectorFilter != null) {
        setStartupDisp([...startupDisp.filter((startup) => 
          startup.maturity?.toLowerCase().includes(maturityFilter)
        )])
      } else {
        setStartupDisp([...startupsInfo.filter((startup) => 
          startup.maturity?.toLowerCase().includes(maturityFilter)
        )])
      }
    }
    if (locationFilter != '' && locationFilter != null) {
      if ((sectorFilter != '' && sectorFilter != null) || (maturityFilter != '' && maturityFilter != null)) {
        setStartupDisp([...startupDisp.filter((startup) => 
          startup.address?.toLowerCase().includes(locationFilter)
        )])
      } else {
        setStartupDisp([...startupsInfo.filter((startup) => 
          startup.address?.toLowerCase().includes(locationFilter)
        )])
      }
    }
  }, [sectorFilter, maturityFilter, locationFilter])

  return (
  <div>
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <h2>Sector
        <Input type="text" placeholder="Sector" value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)}/>
      </h2>
      <h2>Maturity
        <Input type="text" placeholder="Maturity" value={maturityFilter} onChange={(e) => setMaturityFilter(e.target.value)}/>
      </h2>
      <h2>Location
        <Input type="text" placeholder="Location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}/>
      </h2>
      {
        startupDisp.map((value) => (
          <StartupCard key={value.id} startup={value} image='image' />
        ))
      }
    </div>
  </div>
  );
}
