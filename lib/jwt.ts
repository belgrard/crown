import { JWT_SECRET } from "@/config/crown";
import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return null;
  }
}
