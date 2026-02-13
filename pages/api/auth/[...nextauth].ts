import type { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth";

const handler: NextApiHandler = (req, res) => {
  return (NextAuth(authOptions) as any)(req, res);
};

export default handler;
