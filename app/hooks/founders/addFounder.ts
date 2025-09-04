
import { TFounder } from '@/app/types/founder';
import { TStartups } from '@/app/types/startup';
import { TUser } from '@/app/types/users';

interface FounderPayload {
    name: string;
    users: number | null;
}

export async function addFounder(founderData: FounderPayload): Promise<TFounder | null> {
    try {
        const payload: FounderPayload = {
            name: founderData.name,
            users: founderData.users,
        };
        console.log("Founder payload:", payload);
        const res = await fetch("/api/founders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            throw new Error(`POST /api/founders -> ${res.status} ${res.statusText}`);
        }
        const data: TFounder = await res.json();
        return data
    } catch (error) {
        console.error("Error adding founder: ", error)
        return null
    }
}