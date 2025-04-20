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
  terms: boolean;
}

export async function POST(req: Request) {
  try {
    const { username, email, password, terms }: RegisterRequest =
      await req.json();

    if (!terms) {
      return NextResponse.json(
        {
          error: t("server.errors.terms"),
        },
        { status: 400 }
      );
    }

    const userVal = new User({
      username,
      password,
      email,
    });
    await userVal.validate();

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
    userVal.password = hashedPassword;
    const newUser = await userVal.save();
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let errorMessage: string;

    if (error.name === "ValidationError") {
      errorMessage = error.errors[Object.keys(error.errors)[0]].message;
    } else {
      errorMessage = (error as Error).message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
