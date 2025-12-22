console.log("🔥 Starting KSEM backend...");

// Load environment variables FIRST
import "dotenv/config";

import express from "express";
import cors from "cors";

// 🔗 Database connection
import connectDB from "./config/db.mjs";

// 🔗 Routes
import authRoutes from "./routes/authRoutes.mjs";
import pyqRoutes from "./routes/pyqRoutes.mjs";
import aiRoutes from "./routes/aiRoutes.mjs";

// Initialize Express app
const app = express();

// 🔌 Connect to MongoDB
connectDB();

// 🔧 Middlewares
app.use(cors());
app.use(express.json()); // REQUIRED for AI & POST requests

// 🧪 Health Check Routes
app.get("/test", (req, res) => {
  res.send("TEST ROUTE OK ✅");
});

app.get("/", (req, res) => {
  res.send("KSEM Backend Running ✅");
});

app.get("/api", (req, res) => {
  res.json({
    status: "API working ✅",
    message: "KSEM backend is running"
  });
});

// 🚀 API Routes
app.use("/api/auth", authRoutes); // login / signup
app.use("/api/pyqs", pyqRoutes);  // PYQ metadata + Drive links
app.use("/api/ai", aiRoutes);     // Gemini AI explanations

// 🌐 Server Start
const PORT = process.env.PORT || 5000;
app.get("/api", (req, res) => {
  res.json({
    status: "OK",
    message: "KSEM backend API is running 🚀"
  });
});
app.listen(PORT, () => {
  console.log(`🚀 KSEM Server running on port ${PORT}`);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
});
