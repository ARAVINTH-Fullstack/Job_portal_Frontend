// src/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
if (!API_KEY) {
  console.warn("No Gemini API key found in env. Set VITE_GEMINI_API_KEY or REACT_APP_GEMINI_API_KEY.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Choose a working Gemini model:
 * 1. Prefer gemini-2.5-flash (best price/perf today)
 * 2. Else prefer any model whose name contains "flash"
 * 3. Else fallback to the first available generative model
 */
async function chooseWorkingModel() {
  try {
    const modelsResp = await genAI.listModels();
    const models = Array.isArray(modelsResp?.models) ? modelsResp.models : modelsResp;

    // Normalize names into array of strings
    const names = models.map(m => (typeof m === "string" ? m : m.name)).filter(Boolean);

    // Preferred candidates (in order)
    const preferred = [
      "models/gemini-2.5-flash",
      "models/gemini-flash-latest",
      "gemini-2.5-flash",
      "gemini-flash-latest"
    ];

    // 1) explicit preference
    for (const p of preferred) {
      if (names.some(n => n.endsWith(p) || n === p)) return p.replace(/^models\//, "");
    }

    // 2) any flash model
    const flash = names.find(n => /flash/i.test(n));
    if (flash) return flash.replace(/^models\//, "");

    // 3) fallback: first model that supports generateContent (best-effort)
    if (names.length) return names[0].replace(/^models\//, "");

    throw new Error("No models returned from listModels()");
  } catch (err) {
    console.error("chooseWorkingModel error:", err);
    // Last-resort: try a modern model id commonly available
    return "gemini-2.5-flash";
  }
}

/**
 * Fetches AI-generated job market insights from Google Gemini.
 * Returns parsed JSON or null on failure.
 */
export async function getJobMarketInsights() {
  try {
    const modelName = await chooseWorkingModel();
    console.log("Using Gemini model:", modelName);

    const model = genAI.getGenerativeModel({ model: modelName });

    // Prompt asking for EXACT JSON only
    const prompt = `
      Respond ONLY with a single JSON object (no surrounding text). Use realistic but fictional numbers.
      Structure exactly as:
      {
        "active_jobs": <number>,
        "applications_today": <number>,
        "companies_hiring": <number>,
        "average_salary": <number>,
        "salary_growth_percent": <number>,
        "trending_change_percent": <number>,
        "skills_in_demand": [
          {"skill": "React/Next.js", "growth": "+8%", "demand": "94%"},
          {"skill": "Python/AI", "growth": "+15%", "demand": "89%"},
          {"skill": "Cloud/DevOps", "growth": "+12%", "demand": "87%"}
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const raw = result?.response?.text?.() ?? "";

    // Remove code fences, markup, etc.
    const cleaned = raw.replace(/```json|```/g, "").trim();

    try {
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (parseErr) {
      console.error("Failed to parse Gemini output as JSON. Raw output:\n", raw);
      return null;
    }
  } catch (error) {
    console.error("Error fetching Gemini insights:", error);
    return null;
  }
}
