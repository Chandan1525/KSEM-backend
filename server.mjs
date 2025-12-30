import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.mjs";
import pyqRoutes from "./routes/pyqRoutes.mjs";
import aiRoutes from "./routes/aiRoutes.mjs";

dotenv.config();

const app = express();

/* =======================
   ✅ CORS CONFIG (IMPORTANT)
   ======================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",               // local frontend
      "http://localhost:3000",
      "https://ksem-frontend.vercel.app",             // 👉 REPLACE with your Vercel URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* =======================
   ✅ ROUTES
   ======================= */
app.use("/api/auth", authRoutes);
app.use("/api/pyq", pyqRoutes);
app.use("/api/ai", aiRoutes);

/* =======================
   ✅ HEALTH CHECK (Render)
   ======================= */
app.get("/", (req, res) => {
  res.send("🚀 KSEM Backend is running");
});

/* =======================
   ✅ DATABASE
   ======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* =======================
   ✅ SERVER
   ======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
