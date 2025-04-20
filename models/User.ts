import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  _id: ObjectId;
}

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;
