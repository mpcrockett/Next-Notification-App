import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const ntfyRes = await fetch(`https://ntfy.sh/${session.user.id}`, {
      method: 'POST',
      body: 'Hi, New User!',
      headers: {
        'Title': 'Test Notification',
        'Priority': 'urgent',
      },
    });

    if (!ntfyRes.ok) {
      return new Response(JSON.stringify({ error: "Failed to send notification" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
