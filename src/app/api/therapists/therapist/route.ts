'use server';

import { createTherapist } from "@/utils/Models/therapists";
import { Therapist } from "@/utils/Types";

export async function POST(req: Request) {
  try {
    const body: Therapist = await req.json();
    

    // Simple validation
    if (!body.name || !body.email || !body.password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const addTherapist = await createTherapist(body);

    return new Response(
      JSON.stringify({ message: "Therapist added", therapist: addTherapist }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
}};
