import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/utils/client";

export async function POST() {

  const session = await getServerSession();

  if( !session || !session.user?.email ){
    return NextResponse.json({ error: "unauthorized"}, { status: 401 });
  }

  try {
      await prisma.user.update({
      where: { email: session.user.email },
      data: {
        onboarded: true
      },
    });

    return NextResponse.json({ success: true}, { status: 201 });
  } catch (error) {
    console.error("SMS Setup Error:", error);
    return NextResponse.json({ error: "Internal Server Error"}, { status: 500 });
  }

}