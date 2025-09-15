"use server";

import { auth } from "@/config/auth";
import { convertToObject } from "@/config/convertToObject";
import connectDB from "@/config/database";
import Pot, { PotType } from "@/models/Pot";

export async function getPots() {
  await connectDB();

  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const potsDoc = await Pot.find({ userId: session?.user?.id }).lean();
  const pot = convertToObject(potsDoc) as PotType[];
  return pot;
}
