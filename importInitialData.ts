"use server";

import connectDB from "./config/database";
import Budget from "./models/Budget";
import Finance from "./models/Finance";
import InitialFinance from "./models/InitialFinance";
import Pot from "./models/Pot";
import Transaction from "./models/Transaction";

export async function importInitialData() {
  await connectDB();
  const initialFinance = await InitialFinance.find({ isInitial: true });
  initialFinance.map(async (initialF) => {
    const newFinance = new Finance({
      balance: initialF.balance,
      isInitial: true,
    });
    await newFinance.save();
    initialF.transactions.map(async (tran) => {
      await Transaction.create({
        financeId: newFinance._id,
        avatar: tran.avatar,
        name: tran.name,
        category: tran.category,
        date: tran.date,
        amount: tran.amount,
        recurring: tran.recurring,
        isInitial: true,
      });
    });
    initialF.pots.map(async (pot) => {
      await Pot.create({
        financeId: newFinance._id,
        name: pot.name,
        target: pot.target,
        total: pot.total,
        theme: pot.theme,
        isInitial: true,
      });
    });
    initialF.budgets.map(async (bud) => {
      await Budget.create({
        financeId: newFinance._id,
        category: bud.category,
        maximum: bud.maximum,
        theme: bud.theme,
        isInitial: true,
      });
    });
  });
}
