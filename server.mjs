import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.mjs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (THIS FIXES Cannot GET /)
app.get("/", (req, res) => {
  res.status(200).send("🚀 KSEM Backend is running");
});

// Routes
app.use("/api/auth", authRoutes);

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
