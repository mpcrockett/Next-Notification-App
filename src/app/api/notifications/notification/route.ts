'use server';

import { createNotification } from "@/utils/Models/notification";
import { getProviderById } from "@/utils/Models/users";
import { iNotification } from "@/utils/Types";
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const { RestException } = twilio;

export async function POST(req: Request) {
  try {
    const body: iNotification = await req.json();

    console.log(body);

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

    if (!provider.twilioOptedIn || !provider.phoneNumber) {
      return new Response(JSON.stringify({ error: "Provider not opted in or missing phone number" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    await client.messages.create({
      body: `Your ${body.apptTime} patient is in room ${body.roomNumber}.`,
      from: process.env.TWILIO_TEST_NUMBER!,
      to: provider.phoneNumber,
    });

    const notification = await createNotification(body);

    return new Response(JSON.stringify({ notification }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {

    console.log(error);

    if (error instanceof RestException) {
    console.log(`Twilio Error ${error.code}: ${error.message}`);
    console.log(`Status: ${error.status}`);
    console.log(`More info: ${error.moreInfo}`);
    }
    
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

