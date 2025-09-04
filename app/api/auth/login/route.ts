import { getSql } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import generateToken from "@/lib/auth-utils";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );

    const sql = getSql();

    const foundUsers =
      await sql`SELECT * FROM public.users WHERE email = ${email}`;
    if (foundUsers.length == 0)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );

    const isValidPassword = await bcrypt.compare(
      password,
      foundUsers[0].password,
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const token = generateToken([{ id: foundUsers[0].id, name: foundUsers[0].name }]);
    return NextResponse.json({ message: "Login successful", token: token });
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
