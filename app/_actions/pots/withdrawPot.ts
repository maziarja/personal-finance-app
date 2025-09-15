"use server";

import { auth } from "@/config/auth";
import connectDB from "@/config/database";
import Finance from "@/models/Finance";
import Pot from "@/models/Pot";
import { ObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

type PotNewWithdraw = {
  potId: string;

  withdrawAmount: number;
  total: number;
  financeId: ObjectId;
};

export async function withdrawPot(potNewWithdraw: PotNewWithdraw) {
  const { potId, withdrawAmount, total, financeId } = potNewWithdraw;
  await connectDB();
  const session = await auth();

  if (!session) throw new Error("You must be logged in");
  const currentUserId = session?.user?.id;
  const pots = await Pot.find({ userId: currentUserId });
  if (pots.every((pot) => pot._id.toString() !== potNewWithdraw.potId))
    throw new Error("Access Denied");

  if (withdrawAmount < 0 || withdrawAmount > total) {
    return { error: "Enter Valid amount" };
  }
  if (withdrawAmount === 0) {
    return { error: "Can't be empty" };
  }

  try {
    await Promise.all([
      Pot.findByIdAndUpdate(potId, {
        total: total - withdrawAmount,
      }),
      Finance.findByIdAndUpdate(financeId, {
        $inc: { "balance.current": +withdrawAmount },
      }),
    ]);
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/pots");
  return { success: true };
}
