import express from "express";
import { getPyqs } from "../controllers/pyqController.mjs";

const router = express.Router();
router.get("/", getPyqs);

export default router;