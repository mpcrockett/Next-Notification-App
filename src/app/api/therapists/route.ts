'use server';

import { getTherapists } from "@/utils/Models/therapists";
import { createMessage } from "@/utils/twilio";

export async function GET() {
  try {
    const therapists = await getTherapists();
    await createMessage();  

    return new Response(JSON.stringify({ therapists }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {

    console.log(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  
};
