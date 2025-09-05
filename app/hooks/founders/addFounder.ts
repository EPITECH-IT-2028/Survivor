
import { TFounder } from '@/app/types/founder';

interface FounderPayload {
  name: string;
}

export async function addFounder(founderData: FounderPayload): Promise<TFounder | null> {
  try {
    const payload: FounderPayload = {
      name: founderData.name,
    };
    console.log("Founder payload:", payload);
    const res = await fetch("/api/founders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`POST /api/founders -> ${res.status} ${res.statusText}`);
    }
    const data = (await res.json()) as TFounder[];
    return data[0] ?? null;
  } catch (error) {
    console.error("Error adding founder: ", error)
    return null
  }
}
