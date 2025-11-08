
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we assume the key is present.
  console.warn("API_KEY environment variable not set for Gemini.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const geminiService = {
  generateGunDescription: async (manufacturer: string, model: string): Promise<string> => {
    if (!API_KEY) {
      return Promise.resolve(`Mock description for ${manufacturer} ${model}. This is a reliable firearm known for its accuracy and durability. (API key not configured)`);
    }

    try {
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Provide a brief, factual, and neutral description for a firearm with the following details. Manufacturer: "${manufacturer}", Model: "${model}". Focus on its type, caliber, and common usage. Avoid any promotional or controversial language.`,
      });
      return result.text;
    } catch (error) {
      console.error("Error generating description with Gemini:", error);
      throw new Error("Failed to generate description. Please try again or enter manually.");
    }
  },
};
