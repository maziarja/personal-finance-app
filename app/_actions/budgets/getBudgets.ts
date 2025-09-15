"use server";

import { auth } from "@/config/auth";
import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Budget, { BudgetType } from "@/models/Budget";

export async function getBudgets() {
  await connectDB();

  const session = await auth();

  if (!session) throw new Error("You must be logged in");
  const budgetsDoc = await Budget.find({ userId: session?.user?.id }).lean();
  const budgets = convertToObject(budgetsDoc) as BudgetType[];
  return budgets;
}
