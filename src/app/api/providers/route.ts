'use server';

import { getProviders } from "@/utils/Models/users";

export async function GET() {
  try {
    const providers = await getProviders();
    console.log(providers)
    return new Response(JSON.stringify({ providers }), {
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
