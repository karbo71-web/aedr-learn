import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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

      async authorize(credentials: { email?: string; password?: string } | undefined) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const email = credentials.email.toLowerCase().trim();
          const password = credentials.password;

          // ✅ Prisma seulement quand on a vraiment besoin (évite 500 sur /providers et /session)
          const { prisma } = await import("./prisma");

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

          if (!user?.password) return null;

          const ok = await bcrypt.compare(password, user.password);
          if (!ok) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name ?? undefined,
            role: user.role,
          } as any;
        } catch (e) {
          console.error("NextAuth authorize error:", e);
          return null; // ✅ on évite le 500
        }
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
