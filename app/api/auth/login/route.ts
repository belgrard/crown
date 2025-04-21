import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import { t } from "@/lib/texts";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface LoginRequest {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { username, password }: LoginRequest = await req.json();
    await connectDB();

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: t("server.errors.usernameorpassword") },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: t("server.errors.usernameorpassword") },
        { status: 401 }
      );
    }

    const token = generateToken(user._id.toString());

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
