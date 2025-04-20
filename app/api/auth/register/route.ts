import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import { t } from "@/lib/texts";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { username, email, password }: RegisterRequest = await req.json();
    await connectDB();

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        {
          error:
            existingUser.email === email
              ? t("server.errors.emailinuse")
              : t("server.errors.usernameinuse"),
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    const token = generateToken(newUser._id.toString());

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
