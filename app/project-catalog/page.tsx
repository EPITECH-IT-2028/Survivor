"use client"

import StartupCard from '@/components/startupCard';
import { TStartups } from '../types/startup';
import { useEffect, useState } from "react"
import { Input } from '@/components/ui/input';
import { getStartups } from '../hooks/startups/getStartups';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerFooter} from '@/components/ui/drawer';
import { Dialog, DialogTitle } from '@/components/ui/dialog';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Button } from '@/components/ui/button';
import Modal from '@/components/Modal';

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
          <Modal key={value.id} startup={value} image="image" />
        ))
      }
    </div>
  </div>
  );
}
