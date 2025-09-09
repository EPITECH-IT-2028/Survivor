import { TMessage } from "@/app/types/messages";

export async function getMessagesBetweenUsers(
  userId: number,
  contactId: number
): Promise<TMessage[]> {
  try {
    const response = await fetch(
      `/api/messages/${userId}/${contactId}`);
    if (!response.ok) {
      throw new Error(`Error fetching messages: ${response.statusText}`);
    }
    const data: { messages: TMessage[] } = await response.json();
    return data.messages;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
