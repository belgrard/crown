import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).set("token", "", {
    maxAge: 0,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
