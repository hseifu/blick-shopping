// backend/src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import itemsRouter from "./routes/items";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/shopping-list";

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Vite default dev server to be used later on by the frontend
  })
);
app.use(express.json());

// Routes
app.use("/items", itemsRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Shopping List API is running" });
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
