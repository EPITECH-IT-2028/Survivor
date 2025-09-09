import sql from "@/lib/db";
import { getUserByEmailQuery, updateUserPasswordQuery } from "@/lib/queries/users/users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function PUT(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 },
      );
    }

    const db = sql;

    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 },
      );
    }

    const userResponse = await getUserByEmailQuery(db, email);

    const userResponseArray = Array.isArray(userResponse) ? userResponse : [];

    if (userResponseArray.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    const userId = userResponseArray[0].id;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await updateUserPasswordQuery(
      db,
      userId,
      hashedPassword,
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update password" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 },
    );

  } catch (error) {
    return NextResponse.json(
      {
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
