export async function getNewsImage(id: number): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(`/api/news/${id}/image`, { method: "GET" });
    if (!res.ok) {
      return null
    }
    const data: ArrayBuffer = await res.arrayBuffer()
    return data;
  } catch (error) {
    console.error("Error fetching news image: ", error)
    return null
  }
}
