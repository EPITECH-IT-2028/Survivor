import { TEvent } from "@/app/types/event";

interface EventPayload  {
  id: number;
}

export async function deleteEventById(eventId: number): Promise<TEvent | null> {
  try {
    const payload: EventPayload = {
      id: eventId
    };
    const res = await fetch(`/api/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`DELETE /api/events/${eventId} -> ${res.status} ${res.statusText}`);
    }
    const data: TEvent = await res.json();
    return data
  } catch (error) {
    console.error("Error deleting event: ", error)
    return null
  }
}
