import express from "express";
import { registerStudent, googleAuth, getProfile } from "../controllers/authController.mjs";
import { authMiddleware } from "../middleware/auth.mjs";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/google", googleAuth);
router.get("/profile", authMiddleware, getProfile);

export default router;
