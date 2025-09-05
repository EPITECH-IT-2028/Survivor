import { TStartups } from "@/app/types/startup";

interface StartupPayload  {
  id: number;
}

export async function deleteStartup(startupId: number): Promise<TStartups | null> {
	try {
		const payload: StartupPayload = {
      id: startupId 
		};
		const res = await fetch(`/api/startups/${startupId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		if (!res.ok) {
			throw new Error(`DELETE /api/startups/${startupId} -> ${res.status} ${res.statusText}`);
		}
		const data: TStartups = await res.json();
		return data
	} catch (error) {
		console.error("Error deleting startup:", error)
		return null
	}
}
