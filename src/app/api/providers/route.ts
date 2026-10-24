import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { getProviders } from "@/utils/Models/users";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const providers = await getProviders();
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
