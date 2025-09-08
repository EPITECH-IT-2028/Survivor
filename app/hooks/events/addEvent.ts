import { TEvent } from "@/app/types/event";

export interface EventPayload {
  name: string;
  dates?: Date;
  location: string | null;
  description: string | null;
  event_type: string | null;
  target_audience: string | null;
}


export async function addEvent(event: EventPayload): Promise<TEvent | null> {
	try {
		const payload: EventPayload = {
			name: event.name,
			dates: event.dates,
			location: event.location,
			description: event.description,
			event_type: event.event_type,
			target_audience: event.target_audience,
		};
		const res = await fetch("/api/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		if (!res.ok) {
			throw new Error(`POST /api/events -> ${res.status} ${res.statusText}`);
		}
		const data = await res.json();
		return Array.isArray(data) ? data[0] : data;
	} catch (error) {
		console.error("Error adding events: ", error)
		return null
	}
}
