import express from "express";
import { googleAuth, getProfile } from "../controllers/authController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/google", googleAuth);
router.get("/profile", protect, getProfile);

export default router;
