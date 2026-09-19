import { GoogleGenAI, ThinkingLevel, Modality, Type } from "@google/genai";

const GEMINI_KEY = process.env.GEMINI_API_KEY;
export const ai = GEMINI_KEY ? new GoogleGenAI({ apiKey: GEMINI_KEY }) : null;

export const MODELS = {
  FLASH: "gemini-3-flash-preview",
  PRO: "gemini-3.1-pro-preview",
  LITE: "gemini-3.1-flash-lite-preview",
  LIVE: "gemini-3.1-flash-live-preview",
};

export { ThinkingLevel, Modality, Type };
