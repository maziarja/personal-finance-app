"use server";

import { createInitialFinance } from "@/app/_lib/createInitialFinance";
import connectDB from "@/config/database";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function signUp(formData: FormData) {
  await connectDB();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const existingUser = await User.findOne({ email });
  // Validation
  if (email === "" || password === "")
    return {
      error: "Please enter email and password",
    };
  if (existingUser)
    return { error: "An account with this email already exists." };

  if (!emailRegex.test(email as string)) {
    return { error: "Please enter a valid email address." };
  }
  if (password.length < 8)
    return {
      error: "Passwords must be at least 8 characters",
    };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    console.log(newUser._id);
    await newUser.save();

    await createInitialFinance(newUser._id);
  } catch (error) {
    console.log(error);
  }
  return { success: true };
}
