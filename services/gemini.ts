
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateSmartSummary = async (batchTitle: string, description: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an expert academic advisor, summarize the following course in exactly 3 powerful bullet points focusing on student outcomes: 
    Title: ${batchTitle}
    Description: ${description}`,
  });
  return response.text;
};

export const generateAIQuiz = async (topic: string, subject: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 5 multiple choice questions for Class 10 students on the topic: ${topic} in the subject of ${subject}. Ensure 1 correct answer and 3 plausible distractors per question.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswerIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswerIndex", "explanation"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse AI Quiz", e);
    return [];
  }
};

export const askAssistant = async (query: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      systemInstruction: "You are EduStream AI, a friendly and professional academic assistant for Class 9 and 10 students in India. You help with navigation, academic doubts, and motivation.",
    }
  });
  return response.text;
};
