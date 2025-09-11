"use server";

import sql from "@/lib/db";
import { getUserImageByIdQuery } from "@/lib/queries/users/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = sql;

  if (db === null) {
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { id } = await params;

  try {
    const result = await getUserImageByIdQuery(db, id);

    if (!result || result.length === 0) {
      console.log(`No user found with ID: ${id}`);
      return NextResponse.json({ error: "User not found" }, { status: 200 });
    }

    const imageBuffer = result[0].image;

    if (!imageBuffer) {
      return NextResponse.json(
        { error: "No image found for this user" },
        { status: 404 },
      );
    }

    let buffer: Buffer;
    let contentType = "image/jpeg";

    if (
      typeof imageBuffer === "string" &&
      imageBuffer.startsWith("data:image/")
    ) {
      try {
        const base64Data = imageBuffer.split(",")[1];
        buffer = Buffer.from(base64Data, "base64");

        const mimeMatch = imageBuffer.match(/data:([^;]+)/);
        if (mimeMatch) {
          contentType = mimeMatch[1];
        }
      } catch (error) {
        console.error("Error processing base64 image:", error);
        return NextResponse.json(
          { error: "Invalid image format" },
          { status: 500 },
        );
      }
    } else {
      buffer = Buffer.from(imageBuffer);
    }

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error fetching user image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
