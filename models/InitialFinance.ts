import mongoose, { Model, models, Schema } from "mongoose";

export type InitialFinanceType = {
  isInitial: boolean;
  balance: {
    current: number;
    income: number;
    expenses: number;
  };
  transactions: {
    avatar: string;
    name: string;
    category: string;
    date: Date;
    amount: number;
    recurring: boolean;
  }[];

  budgets: {
    category: string;
    maximum: number;
    theme: string;
  }[];

  pots: {
    name: string;
    target: number;
    total: number;
    theme: string;
  }[];
};

const initialFinanceSchema = new Schema<InitialFinanceType & Document>({
  balance: {
    current: Number,
    income: Number,
    expenses: Number,
  },

  transactions: [
    {
      avatar: String,
      name: String,
      category: String,
      date: Date,
      amount: Number,
      recurring: Boolean,
    },
  ],

  budgets: [
    {
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
    },
  ],

  pots: [
    {
      name: {
        type: String,
        required: [true, "Pots name is required"],
      },
      target: {
        type: Number,
        required: [true, "Target is required"],
      },
      total: {
        type: Number,
        required: [true, "Total is required"],
      },
      theme: {
        type: String,
        required: [true, "Theme is required"],
      },
    },
  ],
  isInitial: Boolean,
});

const InitialFinance: Model<InitialFinanceType & Document> =
  models.InitialFinance ||
  mongoose.model<InitialFinanceType & Document>(
    "InitialFinance",
    initialFinanceSchema,
  );

export default InitialFinance;
