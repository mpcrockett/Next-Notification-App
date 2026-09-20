import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/utils/client";
import { setIsProvider } from "@/utils/Models/users";

export async function POST(req: Request) {

  const body = await req.json();

  const session = await getServerSession();

  if( !session || !session.user?.email ){
    return NextResponse.json({ error: "unauthorized"}, { status: 401 });
  }

  try {
    if(body.isProvider) await setIsProvider(body.userId);
    await prisma.user.update({
      where: { email: session.user.email },
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