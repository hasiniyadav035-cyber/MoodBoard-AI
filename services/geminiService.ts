
import { GoogleGenAI, Type } from "@google/genai";
import { BoardItem, Emotion, SmartInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartInsights = async (items: BoardItem[], currentEmotion: Emotion): Promise<SmartInsight[]> => {
  const prompt = `
    I am currently feeling: ${currentEmotion}.
    My current board has the following items:
    ${items.map(i => `- [${i.emotion}] ${i.type}: ${i.title}`).join('\n')}
    
    As an AI emotion-based content organizer, provide 3 unique "Smart Insights" or suggestions for my board.
    Keep them creative and helpful. For example, if I'm feeling SAD but saving a lot of MOTIVATED content, suggest I might be trying to cheer myself up.
    If I'm feeling FOCUS but saving many IMAGES, suggest creating a visual reference board.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              suggestedAction: { type: Type.STRING }
            },
            required: ["title", "description", "suggestedAction"]
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [{
      title: "Connection Issue",
      description: "Couldn't reach the vibe check servers right now.",
      suggestedAction: "Try again in a bit."
    }];
  }
};
