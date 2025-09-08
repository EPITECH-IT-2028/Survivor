import { TContact } from "@/app/types/contacts";
import { TUserMessage } from "@/app/types/users";

export async function getContacts(id: number): Promise<TContact[]> {
  try {
    const response = await fetch(`/api/contacts?userId=${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching contacts: ${response.statusText}`);
    }
    const data: { contacts: TContact[] } = await response.json();
    return data.contacts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
