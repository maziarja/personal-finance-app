"use server";

import { auth } from "@/config/auth";
import { CHALLENGE_DATE, DUE_SOON_RANGE } from "@/config/constants";
import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Transaction, { TransactionType } from "@/models/Transaction";

export async function getRecurringBills(query: string) {
  await connectDB();

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const [alreadyPaidBillsDoc, dueSoonBillDoc, upcomingBillsDoc] =
    await Promise.all([
      Transaction.find({
        userId: session?.user?.id,
        recurring: true,
        name: { $regex: query, $options: "i" },
        date: {
          $lte: new Date(
            CHALLENGE_DATE.year,
            CHALLENGE_DATE.month - 1,
            CHALLENGE_DATE.day,
            CHALLENGE_DATE.hours,
            CHALLENGE_DATE.min,
            CHALLENGE_DATE.sec,
          ),
          $gte: new Date(
            CHALLENGE_DATE.year,
            CHALLENGE_DATE.month - 1,
            0,
            CHALLENGE_DATE.hours,
            CHALLENGE_DATE.min,
            CHALLENGE_DATE.sec,
          ),
        },
      }).lean(),
      Transaction.find({
        userId: session?.user?.id,
        recurring: true,
        name: { $regex: query, $options: "i" },
        date: {
          $lte: new Date(
            CHALLENGE_DATE.year,
            CHALLENGE_DATE.month - 2,
            CHALLENGE_DATE.day + DUE_SOON_RANGE,
            CHALLENGE_DATE.hours,
            CHALLENGE_DATE.min,
            CHALLENGE_DATE.sec,
          ),
          $gte: new Date(
            CHALLENGE_DATE.year,
            CHALLENGE_DATE.month - 2,
            CHALLENGE_DATE.day,
            CHALLENGE_DATE.hours,
            CHALLENGE_DATE.min,
            CHALLENGE_DATE.sec,
          ),
        },
      }).lean(),
      Transaction.find({
        userId: session?.user?.id,
        recurring: true,
        name: { $regex: query, $options: "i" },
        date: {
          $lte: new Date(
            CHALLENGE_DATE.year,
            CHALLENGE_DATE.month - 2,
            30,
            CHALLENGE_DATE.hours,
            CHALLENGE_DATE.min,
            CHALLENGE_DATE.sec,
          ),
          $gte: new Date(
            CHALLENGE_DATE.year,
            CHALLENGE_DATE.month - 2,
            CHALLENGE_DATE.day,
            CHALLENGE_DATE.hours,
            CHALLENGE_DATE.min,
            CHALLENGE_DATE.sec,
          ),
        },
      }).lean(),
    ]);

  const alreadyPaidBills = convertToObject(
    alreadyPaidBillsDoc,
  ) as TransactionType[];
  const dueSoonBills = convertToObject(dueSoonBillDoc) as TransactionType[];
  const upcomingBills = convertToObject(upcomingBillsDoc) as TransactionType[];
  return { alreadyPaidBills, dueSoonBills, upcomingBills };
}
