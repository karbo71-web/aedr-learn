import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: { signIn: "/login" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(
        credentials: { email?: string; password?: string } | undefined
      ) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.toLowerCase().trim();
        const password = credentials.password;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
          },
        });

        if (!user) return null;

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role,
        } as any;
      },
    }),
  ],

  callbacks: {
    async jwt(params: any) {
      const { token, user } = params ?? {};
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session(params: any) {
      const { session, token } = params ?? {};
      if (session?.user) {
        session.user.id = token?.id;
        session.user.role = token?.role;
      }
      return session;
    },
  },
};
