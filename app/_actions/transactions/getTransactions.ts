"use server";

import { auth } from "@/config/auth";
import { PAGE_SIZE } from "@/config/constants";
import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Finance from "@/models/Finance";
import Transaction, { TransactionType } from "@/models/Transaction";

export async function getTransactions(
  page: number,
  category: string,
  sortBy: string,
  query: string,
) {
  await connectDB();
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const userFinance = await Finance.findOne({ userId: session?.user?.id });

  const skip = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  const filter = {
    financeId: userFinance?._id,
    ...(query.trim() !== "" && { name: { $regex: query, $options: "i" } }),
    ...(category !== "All Transactions" && { category }),
  };

  const sort: Record<string, 1 | -1> = {
    ...(sortBy === "Latest" && { date: -1 }),
    ...(sortBy === "Oldest" && { date: 1 }),
    ...(sortBy === "A to Z" && { name: 1 }),
    ...(sortBy === "Z to A" && { name: -1 }),
    ...(sortBy === "Highest" && { amount: -1 }),
    ...(sortBy === "Lowest" && { amount: 1 }),
  };

  const [transactionsDoc, numOfTransactions] = await Promise.all([
    Transaction.find(filter).skip(skip).limit(limit).sort(sort).lean(),
    Transaction.countDocuments(filter),
  ]);

  const transactions = convertToObject(transactionsDoc) as TransactionType[];

  return { transactions, numOfTransactions };
}
