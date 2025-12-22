console.log("🔥 Starting KSEM backend...");

import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

// ✅ Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ksem-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// ✅ Health check (IMPORTANT for Render)
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("KSEM Backend Running ✅");
});

// ✅ API test route
app.get("/api", (req, res) => {
  console.log("✅ /api route HIT");
  res.json({ message: "API WORKING 🚀" });
});

// ✅ CRITICAL: use Render PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
