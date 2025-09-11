export async function getStartupView(startupId: number): Promise<number | null> {
  try {
    const res = await fetch(`/api/startups/${startupId}/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`GET /api/startups/${startupId}/view -> ${res.status} ${res.statusText}`);
    }
    const data: { project_view: number } = await res.json();
    return data.project_view;
  } catch (error) {
    console.error("Error fetching startup engagement:", error);
    return null;
  }
}
