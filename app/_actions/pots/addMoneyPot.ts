"use server";

import { auth } from "@/config/auth";
import connectDB from "@/config/database";
import Finance from "@/models/Finance";
import Pot from "@/models/Pot";
import { ObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

type PotNewAddMoney = {
  potId: string;
  addMoneyAmount: number;
  total: number;
  financeId: ObjectId;
  target: number;
};

export async function addMoneyPot(potNewAddMoney: PotNewAddMoney) {
  const { potId, addMoneyAmount, target, total, financeId } = potNewAddMoney;
  await connectDB();
  const session = await auth();

  if (!session) throw new Error("You must be logged in");
  const currentUserId = session?.user?.id;
  const pots = await Pot.find({ userId: currentUserId });
  if (pots.every((pot) => pot._id.toString() !== potNewAddMoney.potId))
    throw new Error("Access Denied");

  if (addMoneyAmount < 0 || addMoneyAmount > target - total) {
    return { error: "Enter Valid amount" };
  }
  if (addMoneyAmount === 0) {
    return { error: "Can't be empty" };
  }

  const finance = await Finance.findById(financeId);
  if (finance && finance?.balance.current < addMoneyAmount)
    return { error: "Balance too low" };

  try {
    await Promise.all([
      Pot.findByIdAndUpdate(potId, {
        total: total + addMoneyAmount,
      }),
      Finance.findByIdAndUpdate(financeId, {
        $inc: { "balance.current": -addMoneyAmount },
      }),
    ]);
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/pots");
  return { success: true };
}
