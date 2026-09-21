'use server';

import { createNotification } from "@/utils/Models/notification";
import { getProviderById } from "@/utils/Models/users";
import { iNotification } from "@/utils/Types";
import logger from '../../../../utils/logger';

export async function POST(req: Request) {
  try {
    const body: iNotification = await req.json();

    if (!body.userId || !body.apptTime || !body.roomNumber) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const provider = await getProviderById(body.userId);

     if (!provider) {
      return new Response(JSON.stringify({ error: "Provider not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await fetch(`https://ntfy.sh/${body.userId}`, {
      method: 'POST',
      body: body.message || '..',
       headers: {
        'Title': `Your ${body.apptTime} patient is in room ${body.roomNumber}.`,
        'Priority': 'urgent',
        'Tags': ''
    }
    })

    const notification = await createNotification(body);

    return new Response(JSON.stringify({ notification }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {

    logger.error(error);

    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

