"use server";

import { auth } from "@/config/auth";
import connectDB from "@/config/database";
import Finance from "@/models/Finance";
import Pot from "@/models/Pot";
import { Error } from "mongoose";
import { revalidatePath } from "next/cache";

type newPotType = {
  target: string;
  potName: string;
  color: string | undefined;
};

export async function createNewPot(newPot: newPotType) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const userId = session?.user?.id;
  await connectDB();
  const finance = await Finance.findOne({ userId });

  // Validation here
  if (newPot.target === "" && newPot.potName === "")
    return { error: { name: "Can't be empty", target: "Can't be empty" } };
  if (newPot.potName === "") return { error: { name: "Can't be empty" } };
  if (newPot.target === "" || Number(newPot.target) === 0)
    return { error: { target: "Can't be empty" } };

  try {
    await Pot.create({
      userId,
      financeId: finance?._id,
      target: Number(newPot.target),
      name: newPot.potName,
      total: 0,
      theme: newPot.color,
    });
  } catch (error) {
    // if target input isn't number
    if (error instanceof Error.ValidationError)
      return { error: { target: "Please enter a number" } };
  }

  revalidatePath("/pots");

  return { success: true };
}
