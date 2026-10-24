import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import prisma from "@/utils/client";
import { setIsProvider } from "@/utils/Models/users";

export async function POST(req: Request) {

  const body = await req.json();

  const session = await getServerSession(authOptions);

  if( !session?.user?.id ){
    return NextResponse.json({ error: "unauthorized"}, { status: 401 });
  }

  try {
    if(body.isProvider) await setIsProvider(session.user.id);
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        onboarded: true
      },
    });
    return NextResponse.json({ success: true}, { status: 201 });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json({ error: "Internal Server Error"}, { status: 500 });
  }

}
