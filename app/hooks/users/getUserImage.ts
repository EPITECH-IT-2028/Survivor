export async function getUserImage(id: number): Promise<ArrayBuffer | null> {
  try {
    const timestamp = new Date().getTime();
    const res = await fetch(`/api/users/${id}/image?t=${timestamp}`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const data: ArrayBuffer = await res.arrayBuffer();
    return data;
  } catch (error) {
    console.error("Error fetching user image: ", error);
    return null;
  }
}
