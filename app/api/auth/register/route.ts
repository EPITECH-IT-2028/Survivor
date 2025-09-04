import { getSql } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import generateToken from "@/lib/auth-utils";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );

    const sql = getSql();

    const foundUsers =
      await sql`SELECT * FROM public.users WHERE email = ${email}`;
    if (foundUsers.length > 0)
      return NextResponse.json(
        { error: "This email is already used" },
        { status: 409 },
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser =
      await sql`INSERT INTO public.users (name, role, email, password) VALUES (${name}, 'user', ${email}, ${hashedPassword}) RETURNING id, name`;
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
