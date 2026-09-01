import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/utils/client";

export async function POST(req: Request) {

  const session = await getServerSession();

  if( !session || !session.user?.email ){
    return NextResponse.json({ error: "unauthorized"}, { status: 401 });
  }

  try {
    const { phone, optIn } = await req.json();

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        phoneNumber: phone,
        twilioOptedIn: optIn
      },
    });

    return NextResponse.json({ success: true}, { status: 201 });
  } catch (error) {
    console.error("SMS Setup Error:", error);
    return NextResponse.json({ error: "Internal Server Error"}, { status: 500 });
  }

}