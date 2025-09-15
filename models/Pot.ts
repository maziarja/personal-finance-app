import mongoose, { Model, models, ObjectId, Schema } from "mongoose";

export type PotType = {
  _id: string;
  isInitial?: boolean;
  financeId: ObjectId;
  userId: ObjectId;
  name: string;
  target: number;
  total: number;
  theme: string;
};

const potSchema = new Schema<PotType & Document>({
  financeId: {
    type: Schema.Types.ObjectId,
    ref: "Finance",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
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
  isInitial: Boolean,
});

const Pot: Model<PotType & Document> =
  models.Pot || mongoose.model<PotType & Document>("Pot", potSchema);

export default Pot;
