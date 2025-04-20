import { defaultCurrencies, defaultMotto } from "@/config/crown";
import { t } from "@/lib/texts";
import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  motto: string;
  lastLogin: Date;
  createdAt: Date;
  _id: ObjectId;
  currencies: {
    credits: number;
    duckets: number;
    diamonds: number;
  };
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, t("server.errors.email.required")],
    match: [/\S+@\S+\.\S+/, t("server.errors.email.match")],
  },
  password: {
    type: String,
    required: [true, t("server.errors.password.required")],
    minlength: [8, t("server.errors.password.length")],
  },
  username: {
    type: String,
    unique: true,
    required: [true, t("server.errors.username.required")],
    minlength: [1, t("server.errors.username.length")],
    match: [/^[a-zA-Z0-9_]+$/, t("server.errors.username.match")],
  },
  motto: { type: String, default: defaultMotto },
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  currencies: {
    credits: { type: Number, default: defaultCurrencies.credits },
    duckets: { type: Number, default: defaultCurrencies.duckets },
    diamonds: { type: Number, default: defaultCurrencies.diamonds },
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;
