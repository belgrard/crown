import { MONGODB_URI } from "@/config/crown";
import mongoose, { Mongoose } from "mongoose";

interface CachedType {
  conn?: Mongoose;
  promise?: Promise<Mongoose>;
}

const cached: CachedType = {};

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
