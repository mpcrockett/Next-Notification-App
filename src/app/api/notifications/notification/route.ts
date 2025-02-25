'use server';

import { createNotification } from "@/utils/Models/notification";
import { iNotification } from "@/utils/Types";

export async function POST(req: Request) {
  try {
    const body: iNotification = await req.json();

    if (!body.therapistId || !body.apptTime || !body.roomNumber) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const notification = await createNotification(body);

    return new Response(JSON.stringify({ notification }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {

    console.log(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

