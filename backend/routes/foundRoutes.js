import express from "express";
import FoundItem from "../models/FoundItem.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Get all found items (public)
router.get("/", async (req, res) => {
  try {
    const items = await FoundItem.find().populate("user", "name email");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching found items" });
  }
});

// @desc Get logged-in user’s found items (private)
router.get("/my-items", protect, async (req, res) => {
  try {
    const items = await FoundItem.find({ user: req.user._id }).populate("user", "name email");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your found items" });
  }
});

// @desc Create found item (private)
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, location, date } = req.body;

    const newItem = new FoundItem({
      title,
      description,
      location,
      date,
      user: req.user._id,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Error creating found item" });
  }
});

// @desc Delete found item (private, owner only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    await item.deleteOne();
    res.json({ message: "Found item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting found item" });
  }
});

export default router;
