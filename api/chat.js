import { GoogleGenAI } from "@google/genai";
import { ABOUT_ME, OTHER_INFO } from "./info/aboutme.js";
import { Certificates } from "./info/certificates.js";

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
    const ai = new GoogleGenAI({ apiKey });
    const { messages } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    let chatHistory = [...messages];
    if (chatHistory.length > 0 && chatHistory[0].role === "model") {
      chatHistory.shift();
    }
    const contents = chatHistory.map((msg) => ({
      role: msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: `You are Jauie Cañon, answering visitor questions directly on your developer portfolio website. Speak in the first person ("I", "me", "my"). Answer politely, concisely, and strictly based on the information below. If asked something not covered in your profile, politely explain that you haven't included that detail here.

        --- ABOUT ME ---
        ${ABOUT_ME}
        --- Certificates ---
        ${Certificates}
        --- Other Info ---
        ${OTHER_INFO}
        --- END ---`,
      },
    });

    return new Response(JSON.stringify({ text: response.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to generate response" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
