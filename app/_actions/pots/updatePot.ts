"use server";

import { auth } from "@/config/auth";
import connectDB from "@/config/database";
import Pot from "@/models/Pot";
import { revalidatePath } from "next/cache";

type Pot = {
  name: string;
  target: string;
  theme: string | undefined;
  _id: string;
};

export async function updatePot(pot: Pot) {
  await connectDB();
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const currentUserId = session?.user?.id;

  const pots = await Pot.find({ userId: currentUserId });
  if (pots.every((pot) => pot._id.toString() !== pot._id.toString()))
    throw new Error("Access Denied");

  // Validation here
  if (pot.target === "" && pot.name === "")
    return { error: { name: "Can't be empty", target: "Can't be empty" } };
  if (pot.name === "") return { error: { name: "Can't be empty" } };
  if (pot.target === "" || Number(pot.target) === 0)
    return { error: { target: "Can't be empty" } };

  try {
    await Pot.findByIdAndUpdate(pot._id, {
      name: pot.name,
      target: pot.target,
      theme: pot.theme,
    });
  } catch (error) {
    // if target input isn't number
    if (error instanceof Error && error.name === "CastError") {
    }
    return { error: { target: "Please enter a number" } };
  }

  revalidatePath("/pots");

  return { success: true };
}
