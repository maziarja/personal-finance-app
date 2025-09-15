import connectDB from "@/config/database";
import Budget from "@/models/Budget";
import Finance from "@/models/Finance";
import Pot from "@/models/Pot";
import Transaction from "@/models/Transaction";
import { ObjectId } from "mongoose";

export async function createInitialFinance(userId: ObjectId) {
  await connectDB();
  const initialFinance = await Finance.findOne({ isInitial: true });
  const initialBudgets = await Budget.find({ isInitial: true });
  const newFinance = new Finance({
    userId,
    balance: initialFinance?.balance,
  });
  await newFinance.save();
  initialBudgets.map(async (bud) => {
    await Budget.create({
      userId,
      financeId: newFinance._id,
      category: bud.category,
      maximum: bud.maximum,
      theme: bud.theme,
    });
  });
  const initialPots = await Pot.find({ isInitial: true });
  initialPots.map(async (pot) => {
    await Pot.create({
      userId,
      financeId: newFinance._id,
      name: pot.name,
      target: pot.target,
      total: pot.total,
      theme: pot.theme,
    });
  });
  const initialTransactions = await Transaction.find({ isInitial: true });
  initialTransactions.map(async (tran) => {
    await Transaction.create({
      userId,
      financeId: newFinance._id,
      avatar: tran.avatar,
      name: tran.name,
      category: tran.category,
      date: tran.date,
      amount: tran.amount,
      recurring: tran.recurring,
    });
  });
}
