import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import User from "@/models/User";
import { connectDB } from "./mongodb";

export async function getUserFromToken() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    if (typeof decoded === "string") return null;

    if (decoded && typeof decoded !== "string" && decoded.id) {
      await connectDB();
      const user = await User.findById(decoded.id);

      if (!user) return null;

      return user;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}
