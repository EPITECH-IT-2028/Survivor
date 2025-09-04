import { TUser } from "@/app/types/users";

interface UserPayload  {
  id: number;
}

export async function deleteUser(userId: number): Promise<TUser | null> {
	try {
		const payload: UserPayload = {
      id: userId
		};
		const res = await fetch(`/api/users/${userId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		if (!res.ok) {
			throw new Error(`DELETE /api/users/${userId} -> ${res.status} ${res.statusText}`);
		}
		const data: TUser = await res.json();
		return data
	} catch (error) {
		console.error("Error deleting user: ", error)
		return null
	}
}
