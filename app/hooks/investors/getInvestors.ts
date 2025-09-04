import { TInvestor } from '@/app/types/investor';

export async function getInvestors(): Promise<TInvestor[]> {
  try {
    const res = await fetch("/api/investors", { method: "GET" });
    if (!res.ok) {
      throw new Error(`GET /api/investors -> ${res.status} ${res.statusText}`);
    }
    const data: TInvestor[] = await res.json();
    return data
  } catch (error) {
    console.error("Error fetching investors: ", error)
    return []
  }
}
