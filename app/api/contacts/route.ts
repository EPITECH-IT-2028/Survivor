import { getSql } from "@/lib/db";
import { getContactsQuery, addContactQuery, removeContactQuery } from "@/lib/queries/contacts/contacts";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const db = getSql();
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

export async function POST(req: Request) {
  try {
    const { userId, contactId } = await req.json();

    if (!userId || !contactId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = getSql();
    if (!db) {
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 });
    }

    // Add contact in both directions
    await addContactQuery(db, userId, contactId);
    await addContactQuery(db, contactId, userId);

    return NextResponse.json({ message: "Contact added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding contact:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId, contactId } = await req.json();

    if (!userId || !contactId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = getSql();
    if (!db) {
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 });
    }

    await removeContactQuery(db, userId, contactId);
    await removeContactQuery(db, contactId, userId);

    return NextResponse.json({ message: "Contact removed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error removing contact:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
