import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askAI = async (req, res) => {
  try {
    const { question, subject } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are an AI tutor for KIIT students.

Subject: ${subject || "General"}

Explain the following PYQ clearly and step-by-step
using simple, exam-oriented language:

${question}
`;

    const result = await model.generateContent(prompt);

    res.json({
      success: true,
      answer: result.response.text()
    });

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ error: "AI failed to respond" });
  }
};
