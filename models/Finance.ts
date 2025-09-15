import mongoose, { Model, models, ObjectId, Schema } from "mongoose";

export type FinanceType = {
  isInitial?: boolean;
  userId: ObjectId;
  balance: {
    current: number;
    income: number;
    expenses: number;
  };
};

const financeSchema = new Schema<FinanceType & Document>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  balance: {
    current: Number,
    income: Number,
    expenses: Number,
  },
  isInitial: Boolean,
});

const Finance: Model<FinanceType & Document> =
  models.Finance ||
  mongoose.model<FinanceType & Document>("Finance", financeSchema);

export default Finance;
