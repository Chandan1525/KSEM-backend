import Student from "../models/Student.mjs";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 🔐 GOOGLE LOGIN / SIGNUP
export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ success: false, error: "Credential missing" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // KIIT restriction
    if (!email.endsWith("@kiit.ac.in")) {
      return res.status(403).json({
        success: false,
        error: "Only KIIT email IDs allowed",
      });
    }

    let student = await Student.findOne({ email });

    if (!student) {
      student = await Student.create({
        name,
        email,
        googleId,
        picture,
        verified: true,
      });
    }

    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      student,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, error: "Google Auth Failed" });
  }
};

// 👤 PROFILE
export const getProfile = async (req, res) => {
  res.json({
    success: true,
    student: req.student,
  });
};
