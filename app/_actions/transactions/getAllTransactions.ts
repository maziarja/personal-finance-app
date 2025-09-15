"use server";

import { auth } from "@/config/auth";
import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Transaction, { TransactionType } from "@/models/Transaction";

export async function getAllTransactions() {
  await connectDB();

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const transactionsDoc = await Transaction.find({
    userId: session?.user?.id,
  }).lean();

  const transactions = convertToObject(transactionsDoc) as TransactionType[];
  return transactions;
}
