"use server";

import { auth } from "@/config/auth";
import connectDB from "@/config/database";
import Finance from "@/models/Finance";
import Pot from "@/models/Pot";
import { ObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

export async function deletePot(_id: string, financeId: ObjectId) {
  await connectDB();
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const currentUserId = session?.user?.id;
  const pots = await Pot.find({ userId: currentUserId });
  if (pots.every((pot) => pot._id.toString() !== _id))
    throw new Error("Access Denied");

  try {
    const pot = await Pot.findByIdAndDelete(_id);
    await Finance.findByIdAndUpdate(financeId, {
      $inc: { "balance.current": pot?.total },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/pots");
  return { success: true };
}
