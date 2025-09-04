import { TUser } from '@/app/types/users';

export async function getUsers(): Promise<TUser[]> {
  try {
    const res = await fetch("/api/users", { method: "GET" });
    if (!res.ok) {
      throw new Error(`GET /api/users -> ${res.status} ${res.statusText}`);
    }
    const data: TUser[] = await res.json();
    return data
  } catch (error) {
    console.error("Error fetching users: ", error)
    return []
  }
}
