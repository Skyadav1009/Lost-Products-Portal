import LostItem from "../models/LostItem.js";

// @desc Report a lost item
export const createLostItem = async (req, res) => {
  try {
    const item = await LostItem.create({
      ...req.body,
      user: req.user?._id || null, // if logged in
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all lost items
export const getLostItems = async (req, res) => {
  try {
    const items = await LostItem.find().populate("user", "name email");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single lost item
export const getLostItemById = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id).populate("user", "name email");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
