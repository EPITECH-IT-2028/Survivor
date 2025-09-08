import { getSql } from "@/lib/db";
import { searchUsersQuery } from "@/lib/queries/users/users";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  const { id: userId } = await params;

  const db = getSql();

  if (!db) {
    return NextResponse.json({ error: "Database connection not available" }, { status: 500 });
  }

  if (!userId) {
    return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  if (!search) {
    return NextResponse.json({ error: "Missing search parameter" }, { status: 400 });
  }

  try {
    const users = await searchUsersQuery(db, search, userId);
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
