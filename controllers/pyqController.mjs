import Pyq from "../models/Pyq.mjs";

export const getPyqs = async (req, res) => {
  try {
    const pyqs = await Pyq.find();
    res.json(pyqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
