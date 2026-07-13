import { checkUser } from "@/utils/Models/users";

export async function GET(req: Request, { params }: { params: Promise<{email: string}>}){
  try {

    const user = await checkUser((await params).email);

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