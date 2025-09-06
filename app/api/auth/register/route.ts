import { getSql } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import generateToken from "@/lib/auth-utils";
import { getUserByEmailQuery, insertUserQuery } from "@/lib/queries/users/users";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();
    if (!name || !email || !password || !role)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );

    const sql = getSql();

    const foundUsers = await getUserByEmailQuery(sql, email);
    if (foundUsers.length > 0)
      return NextResponse.json(
        { error: "This email is already used" },
        { status: 409 },
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await insertUserQuery(
      sql,
      name,
      role,
      email,
      null,
      null,
      hashedPassword,
    );
    const token = generateToken([{ id: newUser[0].id, name: newUser[0].name }]);
    return NextResponse.json({
      message: "Registered successfully",
      token: token,
    });
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
