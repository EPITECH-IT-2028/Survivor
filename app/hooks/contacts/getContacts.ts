import { TContact } from "@/app/types/contacts";

export async function getContacts(id: number): Promise<TContact[]> {
  try {
    const response = await fetch(`/api/contacts/${id}`);
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
