import connectDB from "@/config/database";
import Budget from "@/models/Budget";
import Finance from "@/models/Finance";
import Pot from "@/models/Pot";
import Transaction from "@/models/Transaction";
import User from "@/models/User";

export async function deleteAllData() {
  await connectDB();
  await Finance.deleteMany();
  await Budget.deleteMany();
  await Transaction.deleteMany();
  await Pot.deleteMany();
  await User.deleteMany();
}
