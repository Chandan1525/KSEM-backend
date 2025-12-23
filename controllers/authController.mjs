import Student from "../models/Student.mjs";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  console.log("🔥 /api/auth/google HIT");
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        error: "Google credential missing"
      });
    }

    // 🔐 Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // 🚫 KIIT-only restriction (optional but recommended)
    if (!email.endsWith("@kiit.ac.in")) {
      return res.status(403).json({
        success: false,
        error: "Only KIIT email IDs are allowed"
      });
    }

    // 🔍 CHECK USER (THIS IS THE CODE YOU ASKED ABOUT)
    let student = await Student.findOne({ email });

    if (!student) {
      // 🆕 SIGN UP (new user)
      student = await Student.create({
        name,
        email,
        googleId,
        picture,
        verified: true,
      });
    }
    // else → existing user → LOGIN automatically

    // 🔑 Generate JWT
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Send response
    res.json({
      success: true,
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        branch: student.branch,
        roll: student.roll,
        picture: student.picture,
      },
    });

  } catch (err) {
    console.error("Google Auth Error:", err.message);
    res.status(401).json({
      success: false,
      error: "Authentication failed"
    });
  }
};
