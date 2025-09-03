"use client"

import StartupCard from '@/components/startupCard';
import { FiltersComboBoxResponsive } from '@/components/filter';
import { TStartups } from '../types/startup';
import { useEffect, useState } from "react"
import { Input } from '@/components/ui/input';

export default function Catalog() {
  
  // const stratup_info = GetStartup();
  // const startup_image = useGetStartupImage();

  const startup : TStartups =
  {
    id: 1,
    name: "ffff",
    legal_status:null,
    address:"azerty",
    email: "ffff@gmail.com",
    phone:null,
    sector:"b",
    maturity:"mmmm",
  }
  
  const startupe : TStartups =
  {
    id: 2,
    name: "gggg",
    legal_status:null,
    address:"aaaaaaa",
    email: "ggggg@gmail.com",
    phone:null,
    sector:"a",
    maturity:"mmml",
  }

  const startups = [startup, startupe]
  
  const [sectorFilter, setSectorFilter] = useState('')
  const [maturityFilter, setMaturityFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')

  const [startupDisp, setStartupDisp] = useState<TStartups[]>(() => startups)
  const [filteredStartups, setFilteredStartups] = useState<TStartups[]>(() => startups)

  useEffect(() => {
    let tmp : TStartups[]= []

    if (sectorFilter === '' && maturityFilter === '' && locationFilter === '') {
      setStartupDisp(startups)
    } else if (sectorFilter != '' && sectorFilter != null) {
      tmp = [...startups.filter((startup) => (
        startup.sector?.includes(sectorFilter)
      ))]
      setStartupDisp(tmp)
    } else if (maturityFilter != '' && maturityFilter != null) {
      tmp = [...startups.filter((startup) => (
        startup.maturity?.includes(maturityFilter)
      ))]
      setStartupDisp(tmp)
    } else if (locationFilter != '' && locationFilter != null) {
      tmp = [...startups.filter((startup) => (
        startup.address?.includes(locationFilter)
      ))]
      setStartupDisp(tmp)
    }
    setStartupDisp(tmp)
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
