export async function setStartupEngagement(startupId: number, engagementRate: number): Promise<boolean> {
  try {
    const res = await fetch(`/api/startups/${startupId}/engagement`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ engagement_rate: engagementRate }),
    });
    if (!res.ok) {
      throw new Error(`POST /api/startups/${startupId}/engagement -> ${res.status} ${res.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error setting startup engagement:", error);
    return false;
  }
}
