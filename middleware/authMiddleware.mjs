import jwt from "jsonwebtoken";
import Student from "../models/Student.mjs";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student = await Student.findById(decoded.id).select("-__v");
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
