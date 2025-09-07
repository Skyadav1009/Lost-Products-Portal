import mongoose from "mongoose";

const foundItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("FoundItem", foundItemSchema);
