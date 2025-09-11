import { getStartups } from "@/app/hooks/startups/getStartups";
import { TStartups } from "@/app/types/startup";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import Link from "next/link";

export default function Opportunities() {
  const [startups, setStartups] = useState<TStartups[]>([]);

  useEffect(() => {
    const fetchStartups = async () => {
      const response = await getStartups();
      setStartups(response.filter((s) => s.needs === "Funding"));
    }
    fetchStartups();
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Opportunities</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {startups.map((startup) => (
          <Card key={startup.id} className="p-4 shadow-md">
            <h2 className="mb-2 text-xl font-semibold">{startup.name}</h2>
            <p className="mb-1"><strong>Sector:</strong> {startup.sector || 'N/A'}</p>
            <p className="mb-1"><strong>Maturity:</strong> {startup.maturity || 'N/A'}</p>
            <p className="mb-1"><strong>Project Status:</strong> {startup.project_status || 'N/A'}</p>
            <p className="mb-1"><strong>Needs:</strong> {startup.needs || 'N/A'}</p>
            <p className="mb-1"><strong>Description:</strong> {startup.description || 'N/A'}</p>
            <p className="mb-1"><strong>Email: </strong>
              <Link href={`mailto:${startup.email}`} className="text-primary hover:underline">{startup.email}
              </Link>
            </p>
            <p className="mb-1"><strong>Phone:</strong>{startup.phone || 'N/A'}</p>
            {startup.website_url && (
              <Link href={startup.website_url} target="_blank" className="mt-2 text-primary hover:underline">
                Visit Website
              </Link>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
