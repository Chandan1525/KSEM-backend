import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

console.log("🚨 KSEM BACKEND EXECUTING");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  try {
    // UPDATED: Using the stable 2.5 model from your list
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = "Explain the Stack data structure in simple words for a KIIT student.";

    console.log("⏳ Sending request to Gemini 2.5...");
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ GEMINI RESPONSE:");
    console.log(text);

  } catch (err) {
    console.error("❌ SDK ERROR:", err.message);
  }
}

run();