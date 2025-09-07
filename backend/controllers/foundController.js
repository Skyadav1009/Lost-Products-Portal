import FoundItem from "../models/FoundItem.js";

// @desc Report a found item
export const createFoundItem = async (req, res) => {
  try {
    const item = await FoundItem.create({
      ...req.body,
      user: req.user?._id || null,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all found items
export const getFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find().populate("user", "name email");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single found item
export const getFoundItemById = async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id).populate("user", "name email");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
