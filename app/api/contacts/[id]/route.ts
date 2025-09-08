import sql from "@/lib/db";
import { getContactsQuery } from "@/lib/queries/contacts/contacts";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const userId = params.id;

  const db = sql
  if (!db) {
    return NextResponse.json({ error: "Database connection not available" }, { status: 500 });
  }

  if (!userId) {
    return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  try {
    const contacts = await getContactsQuery(db, userId);
    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

