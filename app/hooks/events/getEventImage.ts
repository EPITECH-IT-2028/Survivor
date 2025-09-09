export async function getEventImage(id : number) : Promise<Buffer | null> {
  try {
    const res = await fetch(`/api/events/${id}/image`, {method: "GET"});
    if (!res.ok) {
      return null
    }
    const data: ArrayBuffer = await res.arrayBuffer()
    return Buffer.from(data)
  } catch (error) {
    console.error("Error fetching event image: ", error)
    return null
  }
}