import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import User from "@/models/User";

export async function getUserFromToken() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    if (typeof decoded === "string") return null;

    if (decoded && typeof decoded !== "string" && decoded.id) {
      const user = await User.findById(decoded.id);

      if (!user) return null;

      return user;
    }

    return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return null;
  }
}
