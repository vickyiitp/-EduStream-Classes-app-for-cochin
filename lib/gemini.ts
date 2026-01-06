
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSmartSummary = async (batchTitle: string, description: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain student outcomes for this course in 3 bullet points: 
      Title: ${batchTitle}
      Info: ${description}`,
    });
    return response.text;
  } catch (error) {
    console.error("AI Smart Summary Error:", error);
    return null;
  }
};

export const generateAIQuiz = async (topic: string, subject: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 5 MCQs for Grade 10 on: ${topic} (${subject}).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("AI Quiz Generation Error:", error);
    return [];
  }
};

export const askAssistant = async (query: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "You are EduStream AI, a professional guide for Class 9/10 students in India. Be concise, supportive, and focused on CBSE/ICSE curriculum.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again in a moment!";
  }
};
