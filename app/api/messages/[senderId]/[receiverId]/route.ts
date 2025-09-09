import sql from "@/lib/db";
import { getMessagesQuery } from "@/lib/queries/messages/messages";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ senderId: string; receiverId: string }> }) {
  const db = sql;
  const { senderId, receiverId } = await params;

  if (!db) {
    return NextResponse.json({ error: "Database connection not available" }, { status: 500 });
  }

  if (!senderId || !receiverId) {
    return NextResponse.json({ error: "Missing required query parameters" }, { status: 400 });
  }

  try {
    const messages = await getMessagesQuery(db, senderId, receiverId);

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

