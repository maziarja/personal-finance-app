"use server";

import { auth } from "@/config/auth";
import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Finance, { FinanceType } from "@/models/Finance";

export async function getFinance() {
  await connectDB();
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const financeDoc = await Finance.findOne({
    userId: session?.user?.id,
  }).lean();
  return convertToObject(financeDoc) as FinanceType;
}
