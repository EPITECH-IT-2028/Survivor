export async function setStartupView(startupId: number, projectView: number): Promise<boolean> {
  try {
    const res = await fetch(`/api/startups/${startupId}/view`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project_view: projectView }),
    });
    if (!res.ok) {
      throw new Error(`PUT /api/startups/${startupId}/view -> ${res.status} ${res.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error setting startup engagement:", error);
    return false;
  }
}
