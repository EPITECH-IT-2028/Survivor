import { TEvent } from "@/app/types/event";

export interface EventPayload {
  name: string;
  dates: Date | null;
  location: string | null;
  description: string | null;
  event_type: string | null;
  target_audience: string | null;
}


export async function setEventById(eventId: number, eventData: TEvent): Promise<TEvent | null> {
  try {
    if (!eventData || !eventData.name || !eventData.dates || !eventData.location || !eventData.target_audience)
      throw new Error("eventData has at least one information null.");
    const payload: EventPayload = {
      name: eventData.name,
      description: eventData.description,
      event_type: eventData.event_type,
      dates: eventData.dates,
      location: eventData.location,
      target_audience: eventData.target_audience
    };
    const res = await fetch(`/api/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`PUT /api/events/${eventId} -> ${res.status} ${res.statusText}`);
    }
    const data: TEvent = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating event: ", error)
    return null
  }
}
