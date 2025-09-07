import express from "express";
import { createLostItem, getLostItems, getLostItemById } from "../controllers/lostController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createLostItem); // logged-in users can report
router.get("/", getLostItems); // anyone can view
router.get("/:id", getLostItemById);

export default router;
