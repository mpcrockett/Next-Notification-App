'use server';

import { getNotifications } from "@/utils/Models/notification";

export async function GET(req: Request) {
  try {
    const sinceParam = new URL(req.url).searchParams.get("since");
    const since = sinceParam ? new Date(sinceParam) : null;

    if (!since || isNaN(since.getTime())) {
      return new Response(JSON.stringify({ error: "Missing or invalid 'since' parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const notifications = await getNotifications(since);

    if (!Array.isArray(notifications)) {
      return new Response(JSON.stringify(notifications), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ notifications }), {
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
}
