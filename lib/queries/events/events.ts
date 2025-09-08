import { NeonQueryFunction } from "@neondatabase/serverless"

export const getEventsQuery = async (db: NeonQueryFunction<false, false>) => {
  return await db`SELECT * FROM events`;
}

export const getEventByIdQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  return await db`SELECT * FROM events WHERE id = ${id}`;
}

export const getEventImageByIdQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  console.log(`Searching for event with ID: ${id}`);
  const result = await db`SELECT id, legacy_id, image FROM events WHERE id = ${id} OR legacy_id = ${id}`;
  console.log(`Found ${result.length} events with ID ${id}`);
  if (result.length > 0) {
    console.log(`Event found:`, { id: result[0].id, legacy_id: result[0].legacy_id, hasImage: !!result[0].image });
  }
  return result;
}

export const insertEventQuery = async (
  db: NeonQueryFunction<false, false>,
  dates: string,
  location: string,
  description: string,
  event_type: string,
  target_audience: string,
  name: string
) => {
  return await db`INSERT INTO events (dates, location, description, event_type, target_audience, name)
      VALUES (${dates}, ${location}, ${description}, ${event_type}, ${target_audience}, ${name}) RETURNING *`;
}

export const deleteEventQuery = async (db: NeonQueryFunction<false, false>, id: string) => {
  return await db`DELETE FROM events WHERE id = ${id} RETURNING *`;
}

export const updateEventQuery = async (
  db: NeonQueryFunction<false, false>,
  id: string,
  name: string,
  dates: string,
  location: string,
  description: string,
  event_type: string,
  target_audience: string
) => {
  return await db`UPDATE events SET 
      name = ${name},
      dates = ${dates},
      location = ${location},
      description = ${description},
      event_type = ${event_type},
      target_audience = ${target_audience}
      WHERE id = ${id} RETURNING *`;
}
