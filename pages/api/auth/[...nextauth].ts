import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth";

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  // NextAuth v4 handler (cast any pour éviter les conflits de types)
  return (NextAuth(authOptions) as any)(req, res);
}
