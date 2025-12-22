import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roll: { type: String },
  branch: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  picture: { type: String },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;
