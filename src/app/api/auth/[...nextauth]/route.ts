import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/utils/client";
import { checkUser } from "@/utils/Models/users";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user }) {
			const check = await checkUser(user.id);
      if(!check) console.log("User not in DB");
      return true;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
