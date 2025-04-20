import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);

  if (decoded && typeof decoded !== "string" && decoded.id) {
    const user = await User.findById(decoded.id)
      .select("-password")
      .select("-__v");

    return NextResponse.json(JSON.stringify({ user }), { status: 200 });
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
