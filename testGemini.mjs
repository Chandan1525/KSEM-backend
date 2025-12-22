import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

console.log("🚨 KSEM BACKEND EXECUTING");

// Initialize the SDK with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  try {
    // 1. Get the model (using the most stable name)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Explain the Stack data structure in simple words for a KIIT student.";

    console.log("⏳ Sending request to Gemini...");
    
    // 2. Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ GEMINI RESPONSE:");
    console.log(text);

  } catch (err) {
    console.error("❌ SDK ERROR:", err.message);
    console.log("💡 Tip: Double-check your API Key in the .env file.");
  }
}

run();