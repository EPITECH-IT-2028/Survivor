import { TStartups } from "@/app/types/startup";

interface StartupPayload {
	name: string;
	address: string | null;
	email: string | null;
	legal_status: string | null;
	description: string | null;
	phone: string | null;
	created_at: Date | string | null;
	website_url: string | null;
	social_media_url: string | null;
	needs: string | null;
	maturity: string | null;
	sector: string | null;
}

export async function setStartupById(startupId: number, startupData: TStartups): Promise<TStartups | null> {
	try {
    if (!startupData || !startupData.name || !startupData.legal_status || !startupData.address)
      throw new Error("userData has at least one information null.");
		const payload: StartupPayload = {
			name: startupData.name,
      description: startupData.description,
      phone: startupData.phone,
      created_at: startupData.created_at,
      website_url: startupData.website_url,
      social_media_url: startupData.social_media_url,
      needs: startupData.needs,
      maturity: startupData.maturity,
      sector: startupData.sector,
			legal_status: startupData.legal_status,
			address: startupData.address,
      email: startupData.email
		};
		const res = await fetch(`/api/startups/${startupId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		if (!res.ok) {
			throw new Error(`PUT /api/startups/${startupId} -> ${res.status} ${res.statusText}`);
		}
		const data: TStartups = await res.json();
		return data
	} catch (error) {
		console.error("Error updating startup: ", error)
		return null
	}
}
