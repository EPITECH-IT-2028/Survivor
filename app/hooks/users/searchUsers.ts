import { TUserMessage } from "@/app/types/users";

export async function searchUsersFromQuery(userId: number, query: string): Promise<TUserMessage[]> {
  try {
    const res = await fetch(`/api/users/${userId}/search/?search=${query}`);
    if (!res.ok) {
      throw new Error(`Error fetching users: ${res.statusText}`);
    }

    const data: { users: TUserMessage[] } = await res.json();
    return data.users;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}
