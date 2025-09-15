"use server";

import { auth } from "@/config/auth";
import connectDB from "@/config/database";
import Budget from "@/models/Budget";
import { Error } from "mongoose";
import { revalidatePath } from "next/cache";

type UpdatedBudget = {
  maximum: string;
  theme: string | undefined;
  category:
    | "All Transactions"
    | "Entertainment"
    | "General"
    | "Bills"
    | "Groceries"
    | "Dining Out"
    | "Transportation"
    | "Education"
    | "Lifestyle"
    | "Shopping"
    | "Personal Care";
  id: string;
};

export async function updateBudget(updatedBudget: UpdatedBudget) {
  await connectDB();
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const currentUserId = session?.user?.id;

  const budgets = await Budget.find({ userId: currentUserId });
  if (budgets.every((bu) => bu._id.toString() !== updatedBudget.id))
    throw new Error("Access Denied");

  //   Validation
  if (
    updatedBudget.maximum.trim() === "" ||
    Number(updatedBudget.maximum) === 0
  )
    return { error: { maximum: "Can't be empty" } };

  try {
    await Budget.findByIdAndUpdate(updatedBudget.id, {
      category: updatedBudget.category,
      maximum: updatedBudget.maximum,
      theme: updatedBudget.theme,
    });
  } catch (error) {
    // if maximum input isn't number
    if (error instanceof Error && error.name === "CastError") {
    }
    return { error: { maximum: "Please enter a number" } };
  }

  revalidatePath("/budgets");

  return { success: true };
}
