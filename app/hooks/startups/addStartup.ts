import { TStartups } from "@/app/types/startup";

interface StartupPayload {
  name: string;
  legal_status: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  sector: string | null;
  website_url: string | null;
  social_media_url: string | null;
  project_status: string | null;
  needs: string | null;
  description: string | null;
  maturity: string | null;
  engagement_rate: number;
  project_view: number;
  legacy_id: number | null;
}

export async function addStartup(
  startupData: TStartups,
): Promise<TStartups | null> {
  try {
    const payload: StartupPayload = {
      name: startupData.name,
      description: startupData.description,
      legal_status: startupData.legal_status,
      address: startupData.address,
      email: startupData.email,
      phone: startupData.phone,
      website_url: startupData.website_url,
      social_media_url: startupData.social_media_url,
      project_status: startupData.project_status,
      needs: startupData.needs,
      maturity: startupData.maturity,
      sector: startupData.sector,
      engagement_rate: 0,
      project_view: 0,
      legacy_id: null,
    };

    const res = await fetch("/api/startups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`POST /api/startups -> ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    const created: TStartups = Array.isArray(data) ? data[0] : data;
    return created;
  } catch (error) {
    console.error("Error adding startup: ", error);
    return null;
  }
}
