"use server";
import sql from "@/lib/db";
import { getUsersQuery, insertUserQuery } from "@/lib/queries/users/users";

export async function GET() {
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

  try {
    const response = await getUsersQuery(db);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to fetch users ${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(request: Request) {
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

    const response = await insertUserQuery(
      db,
      name,
      role,
      email,
      founder_id,
      investor_id,
      processedImage,
    );
    return new Response(JSON.stringify(response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to create user ${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
