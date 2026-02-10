import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(
    { error: "Auth disabled temporarily (NextAuth not configured yet)" },
    { status: 503 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: "Auth disabled temporarily (NextAuth not configured yet)" },
    { status: 503 }
  );
}
