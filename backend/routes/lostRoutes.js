import express from "express";
import LostItem from "../models/LostItem.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Get all lost items (public)
router.get("/", async (req, res) => {
  try {
    const items = await LostItem.find().populate("user", "name email");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lost items" });
  }
});

// @desc Get logged-in user’s lost items (private)
router.get("/my-items", protect, async (req, res) => {
  try {
    const items = await LostItem.find({ user: req.user._id }).populate("user", "name email");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your lost items" });
  }
});

// @desc Create lost item (private)
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, location, date } = req.body;

    const newItem = new LostItem({
      title,
      description,
      location,
      date,
      user: req.user._id,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Error creating lost item" });
  }
});

// @desc Delete lost item (private, owner only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    await item.deleteOne();
    res.json({ message: "Lost item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting lost item" });
  }
});

export default router;
