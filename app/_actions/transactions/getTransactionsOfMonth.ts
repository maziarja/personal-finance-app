"use server";

import { auth } from "@/config/auth";
import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Transaction, { TransactionType } from "@/models/Transaction";

export async function getTransactionsOfMonth(year: number, month: number) {
  await connectDB();

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const transactionsDoc = await Transaction.find({
    userId: session?.user?.id,
    date: { $gte: startDate, $lt: endDate },
  }).lean();

  const transactions = convertToObject(transactionsDoc) as TransactionType[];
  return transactions;
}
