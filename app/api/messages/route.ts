import { getSql } from "@/lib/db";
import { getMessagesQuery, insertMessageQuery } from "@/lib/queries/messages/messages";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const senderId = searchParams.get("senderId");
  const receiverId = searchParams.get("receiverId");
  const db = getSql();

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

export async function POST(req: Request) {
  try {
    const { senderId, receiverId, content } = await req.json();

    if (!senderId || !receiverId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = getSql();

    if (!db) {
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 });
    }

    const result = await insertMessageQuery(db, senderId, receiverId, content);

    return NextResponse.json({ message: "Message sent successfully", data: result[0] }, { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
