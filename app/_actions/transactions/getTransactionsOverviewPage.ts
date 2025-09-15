"use server";

import { auth } from "@/config/auth";
import { TRANSACTION_LIMIT_FOR_OVERVIEW } from "@/config/constants";
import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Transaction, { TransactionType } from "@/models/Transaction";

export async function getTransactionsOverviewPage() {
  await connectDB();

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const transactionsDoc = await Transaction.find({
    userId: session?.user?.id,
  })
    .sort({ date: -1 })
    .limit(TRANSACTION_LIMIT_FOR_OVERVIEW)
    .lean();

  const transactions = convertToObject(transactionsDoc) as TransactionType[];
  return transactions;
}
