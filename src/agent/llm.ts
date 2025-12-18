import { GenerateContentResponse, GoogleGenAI } from "@google/genai";

const apiKey: string = process.env.GEMINI_API_KEY!;

if (!apiKey) {
  throw new Error(
    "❌ GEMINI_API_KEY not set.\n" +
      "Set it once using:\n" +
      '  setx GEMINI_API_KEY "your_api_key_here"'
  );
}

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

export async function callLLM(
  prompt: string
): Promise<GenerateContentResponse> {
  const response = ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      role: "user",
      parts: [{ text: prompt }],
    },
    config: {
      temperature: 0.3,
      maxOutputTokens: 4000,
    },
  });

  return response;
}
