"use server";

import { auth } from "@/config/auth";
import connectDB from "@/config/database";
import Budget from "@/models/Budget";
import { revalidatePath } from "next/cache";

export async function deleteBudget(_id: string) {
  await connectDB();
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const currentUserId = session?.user?.id;

  const budgets = await Budget.find({ userId: currentUserId });
  if (budgets.every((bu) => bu._id.toString() !== _id))
    throw new Error("Access Denied");

  try {
    await Budget.findByIdAndDelete(_id);
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/pots");
  return { success: true };
}
