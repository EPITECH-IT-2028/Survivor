"use server";

import sql from "@/lib/db";
import {
  deleteUserQuery,
  getUserByIdQuery,
  updateUserQuery,
} from "@/lib/queries/users/users";
import { NextRequest } from "next/server";

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
    const response = await getUserByIdQuery(db, id);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to fetch user ${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function DELETE(
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
    const response = await deleteUserQuery(db, id);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to delete user ${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function PUT(
  request: NextRequest,
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
    const { name, role, email, founder_id, investor_id, image } =
      await request.json();

    let processedImage = image;

    if (image && typeof image === "string" && image.startsWith("data:image/")) {
      try {
        const base64Data = image.split(",")[1];
        processedImage = Buffer.from(base64Data, "base64");
      } catch (conversionError) {
        console.error("Error converting base64 image:", conversionError);
        return new Response(JSON.stringify({ error: "Invalid image format" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const response = await updateUserQuery(
      db,
      id,
      name,
      role,
      email,
      founder_id,
      investor_id,
      processedImage,
    );
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to update users ${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
