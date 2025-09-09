import sql from "@/lib/db";
import { insertMessageQuery } from "@/lib/queries/messages/messages";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { senderId, receiverId, content } = await req.json();

    if (!senderId || !receiverId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = sql

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
