import express from "express";
import { createFoundItem, getFoundItems, getFoundItemById } from "../controllers/foundController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createFoundItem);
router.get("/", getFoundItems);
router.get("/:id", getFoundItemById);

export default router;
