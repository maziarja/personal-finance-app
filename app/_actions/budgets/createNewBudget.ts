"use server";

import { auth } from "@/config/auth";
import connectDB from "@/config/database";
import Budget from "@/models/Budget";
import Finance from "@/models/Finance";
import { TransactionType } from "@/models/Transaction";
import { Error } from "mongoose";
import { revalidatePath } from "next/cache";

type Category = TransactionType["category"];
type NewBudget = {
  maximum: string;
  theme: string | undefined;
  category: Category;
};

export async function createNewBudget(newBudget: NewBudget) {
  await connectDB();
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const finance = await Finance.findOne({ userId: session?.user?.id });

  if (newBudget.maximum.trim() === "" || Number(newBudget.maximum) === 0)
    return { error: { maximum: "Can't be empty" } };

  try {
    await Budget.create({
      financeId: finance?._id,
      userId: session?.user?.id,
      category: newBudget.category,
      maximum: newBudget.maximum,
      theme: newBudget.theme,
    });
  } catch (error) {
    // if maximum input isn't number
    if (error instanceof Error.ValidationError)
      return { error: { maximum: "Please enter a number" } };
  }

  revalidatePath("/budget");
  return { success: true };
}
