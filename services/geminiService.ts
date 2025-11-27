import { GoogleGenAI } from "@google/genai";

export const generateBirthdayWish = async (name: string, age: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key not found. Returning default message.");
      return `Wishing you a fantastic year ahead, ${name}! Happy ${age}th Birthday! 🎉`;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using flash for speed
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      Write a short, enthusiastic, rhyming birthday wish for someone named ${name} turning ${age} years old.
      Include 2-3 emojis.
      Keep it under 30 words.
      Do not include quotes.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails
    return `Happy ${age}th Birthday, ${name}! Hope your day is filled with joy and laughter! 🎂✨`;
  }
};