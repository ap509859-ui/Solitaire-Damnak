
import { GoogleGenAI } from "@google/genai";

// Always initialize with the named parameter and process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIConciergeResponse = async (prompt: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are a professional, helpful hotel concierge at "LuxeStay Resort". 
        Use the following context to answer guest questions politely. 
        Context: ${context}. 
        Keep answers concise and luxurious. 
        If you don't know the answer, politely suggest they visit the front desk.`,
        temperature: 0.7,
      },
    });
    // Property .text returns the string output directly.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, I'm having trouble connecting to my service. Please visit the reception for assistance.";
  }
};
