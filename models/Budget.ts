import mongoose, { Model, models, ObjectId, Schema } from "mongoose";

export type BudgetType = {
  isInitial?: boolean;
  financeId: ObjectId;
  userId: ObjectId;
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
  maximum: number;
  theme: string;
  _id: string;
};

const budgetSchema = new Schema<BudgetType & Document>({
  financeId: {
    type: Schema.Types.ObjectId,
    ref: "Finance",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  maximum: {
    type: Number,
    required: [true, "maximum amount is required"],
  },
  theme: {
    type: String,
    required: [true, "Category is required"],
  },
  isInitial: Boolean,
});

const Budget: Model<BudgetType & Document> =
  models.Budget ||
  mongoose.model<BudgetType & Document>("Budget", budgetSchema);

export default Budget;
