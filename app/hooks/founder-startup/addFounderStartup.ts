import { TStartups } from "@/app/types/startup";

interface FounderStartupPayload {
  startup_id: number;
  founder_id: number;
}

export async function addFounderStartup(founderId: number, startupId: number): Promise<TStartups | null> {
  try {
    const payload: FounderStartupPayload = {
      founder_id: founderId,
      startup_id: startupId,
    };
    const res = await fetch(`/api/founders/${founderId}/startups/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`POST /api/founders/${founderId} -> ${res.status} ${res.statusText}`);
    }
    const data = (await res.json()) as TStartups[];
    return data[0] ?? null;
  } catch (error) {
    console.error("Error adding founder: ", error)
    return null
  }
}
