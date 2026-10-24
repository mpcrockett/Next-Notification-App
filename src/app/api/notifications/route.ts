import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import prisma from "@/utils/client";
import { getNotifications } from "@/utils/Models/notification";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (user?.role !== "ADMIN" && user?.role !== "PROVIDER") {
      return new Response(JSON.stringify({ error: "forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userId = user.role === "PROVIDER" ? session.user.id : undefined;

    const sinceParam = new URL(req.url).searchParams.get("since");
    const since = sinceParam ? new Date(sinceParam) : null;

    if (!since || isNaN(since.getTime())) {
      return new Response(JSON.stringify({ error: "Missing or invalid 'since' parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const notifications = await getNotifications(since, userId);

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
