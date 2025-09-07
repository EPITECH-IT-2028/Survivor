import { getSql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { senderId, receiverId, content } = await req.json();

  if (!senderId || !receiverId || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const db = getSql();
}
