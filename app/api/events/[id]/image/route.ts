'use server';

import sql from "@/lib/db";
import { getEventImageByIdQuery } from "@/lib/queries/events/events";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = sql;

  if (db === null) {
    return new Response(JSON.stringify({ error: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id } = await params

  try {
    const result = await getEventImageByIdQuery(db, id);

    if (!result || result.length === 0) {
      console.log(`No event found with ID: ${id}`);
      return NextResponse.json({ error: 'Event not found' }, { status: 200 });
    }

    const imageBuffer = result[0].image
    
    if (!imageBuffer) {
      return NextResponse.json({ error: 'No image found for this event' }, { status: 200 });
    }

    const contentType = "image/jpeg";
    const buffer = Buffer.from(imageBuffer)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {

    console.error('Error fetching event image:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}