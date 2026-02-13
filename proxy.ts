import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  // getToken attend un secret non-undefined (string)
  const secret = process.env.NEXTAUTH_SECRET ?? "";

  const token = await getToken({
    req: req as any,
    secret,
  } as any);

  // Pas connecté => login
  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Connecté mais pas ADMIN => /me
  if ((token as any).role !== "ADMIN") {
    return NextResponse.redirect(new URL("/me", req.url));
  }

  // ADMIN => ok
  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:path*", "/admin/:path*"],
};
