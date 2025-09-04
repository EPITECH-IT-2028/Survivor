
import { TStartups } from '@/app/types/startup';

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
	founder: number | null;
	news: number | null;
}

export async function addStartup(startupData: TStartups): Promise<TStartups | null> {
	try {
		const payload: StartupPayload = {
			name: startupData.name,
			legal_status: startupData.legal_status,
			address: startupData.address,
			email: startupData.email,
			phone: startupData.phone,
			sector: startupData.sector,
			website_url: startupData.website_url,
			social_media_url: startupData.social_media_url,
			project_status: startupData.project_status,
			needs: startupData.needs,
			description: startupData.description,
			maturity: startupData.maturity,
			founder: startupData.founder,
			news: startupData.news
		};

		console.log("Adding startup with data:", payload);
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
		const data: TStartups = await res.json();
		return data
	} catch (error) {
		console.error("Error adding startup: ", error)
		return null
	}
}