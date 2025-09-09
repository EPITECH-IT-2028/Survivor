import postgres from "postgres";


export const insertMessageQuery = async (db: postgres.Sql,
  senderId: string, receiverId: string, content: string) => {

  return await db`
    INSERT INTO messages (sender_id, receiver_id, content) 
    VALUES (${senderId}, ${receiverId}, ${content})
    RETURNING *
  `;
}

export const getMessagesQuery = async (db: postgres.Sql,
  senderId: string, receiverId: string) => {
  return await db`
    SELECT 
      m.*,
      sender.name as sender_name,
      receiver.name as receiver_name
    FROM messages m
    JOIN users sender ON m.sender_id = sender.id
    JOIN users receiver ON m.receiver_id = receiver.id
    WHERE (m.sender_id = ${senderId} AND m.receiver_id = ${receiverId})
       OR (m.sender_id = ${receiverId} AND m.receiver_id = ${senderId})
    ORDER BY m.created_at ASC
  `;
}
