import mongoose, { Model, models, ObjectId, Schema } from "mongoose";

export type TransactionType = {
  _id: string;
  isInitial?: boolean;
  financeId: ObjectId;
  userId: ObjectId;
  avatar: string;
  name: string;
  category:
    | "All Transactions"
    | "Entertainment"
    | "General"
    | "Bills"
    | "Groceries"
    | "Dining Out"
    | "Transportation"
    | "Education"
    | "Lifestyle"
    | "Shopping"
    | "Personal Care";
  date: Date;
  amount: number;
  recurring: boolean;
};

const transactionSchema = new Schema<TransactionType & Document>({
  financeId: {
    type: Schema.Types.ObjectId,
    ref: "Finance",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  avatar: String,
  name: String,
  category: String,
  date: Date,
  amount: Number,
  recurring: Boolean,
  isInitial: Boolean,
});

const Transaction: Model<TransactionType & Document> =
  models.Transaction ||
  mongoose.model<TransactionType & Document>("Transaction", transactionSchema);

export default Transaction;
