import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Drawer, DrawerContent, DrawerFooter } from '@/components/ui/drawer';
import { DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TStartups } from '@/app/types/startup';
import Link from "next/link";
import { getStartupEngagement } from "@/app/hooks/startups/getStartupEngagement";
import { setStartupEngagement } from "@/app/hooks/startups/setStartupEngagement";
import { generateStartupPDF } from "@/app/project-catalog/generatePDF";

export default function StartupModal({ startup, image }: { startup: TStartups; image: string }) {

  const [isOpen, setIsOpen] = useState(false)

  const onClick = () => {
    setIsOpen(!isOpen)
    getStartupEngagement(startup.id).then(rate => {
      if (rate === null) {
        return;
      }
      setStartupEngagement(startup.id, rate + 1);
    }
    ).catch(err => {
      console.error('Failed to fetch engagement rate:', err);
    });
  }

  return (
    <div>
      <Card
        key={startup.id}
        onClick={onClick}
        className='h-64 w-full transform rounded-xl border border-gray-200 p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white'
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 h-14">
            {startup.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-32">
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-500 w-20">Sector:</span>
              <span className="text-sm text-gray-700 truncate">
                {startup.sector || 'N/A'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-500 w-20">Maturity:</span>
              <span className="text-sm text-gray-700 truncate">
                {startup.maturity || 'N/A'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-500 w-20 mr-2">Address:</span>
              <span className="text-sm text-gray-700 truncate">
                {startup.address || 'N/A'}
              </span>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <svg className="h-4 w-4 text-indigo-500 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Drawer direction='right' open={isOpen}>
        <DrawerContent>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b relative">
              <button onClick={() => setIsOpen(false)} className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2 ml-12">
                {startup.name}
              </DialogTitle>
              <p className="text-sm text-gray-500 ml-12">Startup Profile</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Legal Status:</span>
                    <span className="text-sm text-gray-900">{startup.legal_status || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Sector:</span>
                    <span className="text-sm text-gray-900">{startup.sector || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Maturity:</span>
                    <span className="text-sm text-gray-900">{startup.maturity || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Email:</span>
                    <span className="text-sm text-gray-900">{startup.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Phone:</span>
                    <span className="text-sm text-gray-900">{startup.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Address:</span>
                    <span className="text-sm text-gray-900 text-right max-w-64">
                      {startup.address || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Website:</span>
                    {startup.website_url ? (
                      <Link
                        href={startup.website_url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        Visit Website
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-900">N/A</span>
                    )}
                  </div>
                </div>
              </div>
              {startup.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {startup.description}
                  </p>
                </div>
              )}
            </div>
            <DrawerFooter className="border-t bg-gray-50">
              <Button onClick={() => generateStartupPDF(startup)} className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                Download PDF
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
