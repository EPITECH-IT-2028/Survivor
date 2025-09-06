export async function getStartupEngagement(startupId: number): Promise<number | null> {
  try {
    const res = await fetch(`/api/startups/${startupId}/engagement`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`GET /api/startups/${startupId}/engagement -> ${res.status} ${res.statusText}`);
    }
    const data: { engagement_rate: number } = await res.json();
    return data.engagement_rate;
  } catch (error) {
    console.error("Error fetching startup engagement:", error);
    return null;
  }
}
