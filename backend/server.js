import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import lostRoutes from "./routes/lostRoutes.js";
import foundRoutes from "./routes/foundRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
