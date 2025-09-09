import { TUser, UserRole } from "@/app/types/users";


interface UserPayload {
  name: string;
  email: string | null;
  role: UserRole | null;
  founder_id: number | null;
  investor_id: number | null;
  password: string | null;
  image: string | null;
  legacy_id: number | null;
}

export async function addUser(userData: UserPayload): Promise<TUser | null> {
  try {
    const payload: UserPayload = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      founder_id: null,
      investor_id: null,
      password: null,
      image: null,
      legacy_id: null
    };
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`POST /api/users -> ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Error adding user: ", error)
    return null
  }
}
