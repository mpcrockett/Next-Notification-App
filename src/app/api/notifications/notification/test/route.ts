export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.userId) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ntfyRes = await fetch(`https://ntfy.sh/${body.userId}`, {
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
