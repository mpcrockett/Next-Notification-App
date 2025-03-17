'use server';

import { createUser } from "@/utils/Models/therapists";
import { iUser } from "@/utils/Types";

export async function POST(req: Request) {
  try {
    const body: iUser = await req.json();
    

    // Simple validation
    if (!body.name || !body.email || !body.password ||!body.phoneNumber) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const addUser = await createUser(body);

    return new Response(
      JSON.stringify({ message: "User added", user: addUser }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
}};
