import mongoose from "mongoose";

const pyqSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  driveLink: {
    type: String,
    required: true
  }
});

const Pyq = mongoose.model("Pyq", pyqSchema);

export default Pyq;
