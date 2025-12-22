import Student from "../models/Student.mjs";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register student (manual)
export const registerStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Google OAuth Login/Register
export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "Google credential is required" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if student exists
    let student = await Student.findOne({ email });

    if (!student) {
      // Create new student
      student = new Student({
        name,
        email,
        googleId,
        picture,
        verified: true,
      });
      await student.save();
    } else if (!student.googleId) {
      // Link Google account to existing student
      student.googleId = googleId;
      student.picture = picture;
      student.verified = true;
      await student.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: student._id, 
        email: student.email,
        name: student.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        roll: student.roll,
        branch: student.branch,
        picture: student.picture,
      },
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ 
      error: "Authentication failed",
      details: error.message 
    });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-googleId");
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
