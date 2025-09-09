export async function insertMessage(
  senderId: number,
  receiverId: number,
  content: string,
): Promise<boolean> {
  try {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: senderId,
        receiverId: receiverId,
        content: content,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to insert message: ${res.statusText}`);
    }

    return res.ok;
  } catch (error) {
    console.error('Error inserting message:', error);
    throw error;
  }
}
