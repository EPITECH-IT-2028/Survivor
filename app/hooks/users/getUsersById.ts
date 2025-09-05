import { TUser } from '@/app/types/users';

export async function getUsersById(userId: number): Promise<TUser | null> {
  try {
    const res = await fetch(`/api/users/${userId}`, { method: "GET" });
    if (!res.ok) {
      throw new Error(`GET /api/users/${userId} -> ${res.status} ${res.statusText}`);
    }
    const data: TUser = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}: `,
      error
    );
    return null;
  }
}
