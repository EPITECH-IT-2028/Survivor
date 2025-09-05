import { TUser, UserRole } from "@/app/types/users";

interface UserPayload {
  name: string;
  email: string | null;
  role: UserRole | null;
  founder_id?: number;
  investor_id?: number;
}

export async function setUserById(userId: number, userData: TUser): Promise<TUser | null> {
  try {
    if (!userData || !userData.name || !userData.email || !userData.role)
      throw new Error("userData has at least one information null.");
    const payload: UserPayload = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      founder_id: userData.founder_id,
      investor_id: userData.investor_id
    };
    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`PUT /api/users/${userId} -> ${res.status} ${res.statusText}`);
    }
    const data: TUser = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating user: ", error)
    return null
  }
}
