import { NeonQueryFunction } from "@neondatabase/serverless"

/**
 * Get contacts for a user along with the last message exchanged with each contact.
 * Orders contacts by the time of the last message exchanged, most recent first.
 * If no messages have been exchanged, orders by the time the contact was added.
 */
export const getContactsQuery = async (db: NeonQueryFunction<false, false>, userId: string) => {
  return await db`
    SELECT 
      c.id,
      c.contact_id,
      u.name,
      u.email,
      u.image,
      c.created_at
    FROM contacts c
    JOIN users u ON c.contact_id = u.id
    WHERE c.user_id = ${userId}
    ORDER BY c.created_at DESC
  `;
}

export const addContactQuery = async (db: NeonQueryFunction<false, false>, userId: string, contactId: string) => {
  return await db`
    INSERT INTO contacts (user_id, contact_id) 
    VALUES (${userId}, ${contactId})
    ON CONFLICT (user_id, contact_id) DO NOTHING
    RETURNING *
  `;
}

export const removeContactQuery = async (db: NeonQueryFunction<false, false>, userId: string, contactId: string) => {
  return await db`
    DELETE FROM contacts 
    WHERE user_id = ${userId} AND contact_id = ${contactId}
    RETURNING *
  `;
}

