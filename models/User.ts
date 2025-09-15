import mongoose, { Model, models, ObjectId, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";

export type UserType = {
  name: string;
  email: string;
  password?: string;
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<UserType & Document>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [isEmail, "Please provide a valid email"],
    },
    password: String,
  },
  {
    timestamps: true,
  },
);

const User: Model<UserType & Document> =
  models.User || mongoose.model<UserType & Document>("User", userSchema);

export default User;
