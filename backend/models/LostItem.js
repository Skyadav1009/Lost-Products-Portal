import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String }, // optional: image upload
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who reported
  },
  { timestamps: true }
);

export default mongoose.model("LostItem", lostItemSchema);
