import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { checkUser } from "@/utils/Models/users";

export async function GET(req: Request, { params }: { params: Promise<{email: string}>}){
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if ((await params).email !== session.user.email) {
    return new Response(JSON.stringify({ error: "forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {

    const user = await checkUser(session.user.email);

    if(!user) {
      return new Response(JSON.stringify({ error: "Authentication Error" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "User found", user }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
