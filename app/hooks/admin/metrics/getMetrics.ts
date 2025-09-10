export async function getMetrics() {
  try {
    const response = await fetch(`/api/admin/metrics`);
    if (!response.ok) {
      throw new Error(`Error fetching metrics: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
